import { NextResponse } from "next/server"
import { isTrustedOrigin, FORBIDDEN_BODY } from "@/src/lib/request-guard"
import {
  MAX_BODY,
  describeClient,
  hashIp,
  insertConsent,
  validateConsentPayload,
  type ConsentRow,
} from "@/src/lib/cookie-consent-store"

// POST /api/cookie-consent — records one Accept/Reject click.
// Pipeline: origin guard → size cap → parse → validate → derive coarse client
// fields server-side → rate limit → insert. Response shape matches the other
// public routes: { success: boolean, error?: string }.
//
// Best-effort in-memory rate limit (per hashed IP). On serverless each
// instance has its own counter, so this only blunts a single-origin flood; the
// origin guard and strict validation are the primary controls.

export const runtime = "nodejs"

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 20
const hits = new Map<string, { n: number; reset: number }>()

function limited(key: string | null): boolean {
  if (!key) return false
  const now = Date.now()
  const cur = hits.get(key)
  if (!cur || cur.reset < now) {
    hits.set(key, { n: 1, reset: now + WINDOW_MS })
    if (hits.size > 5000) for (const [k, v] of hits) if (v.reset < now) hits.delete(k)
    return false
  }
  cur.n += 1
  return cur.n > MAX_PER_WINDOW
}

function clientIp(req: Request): string | null {
  const fwd = req.headers.get("x-forwarded-for")
  return (fwd ? fwd.split(",")[0].trim() : req.headers.get("x-real-ip")) || null
}

export async function POST(req: Request) {
  if (!isTrustedOrigin(req)) return NextResponse.json(FORBIDDEN_BODY, { status: 403 })

  let text: string
  try {
    text = await req.text()
  } catch {
    return NextResponse.json({ success: false, error: "[INVALID_INPUT] unreadable body" }, { status: 400 })
  }
  if (text.length > MAX_BODY) {
    return NextResponse.json({ success: false, error: "[INVALID_INPUT] body too large" }, { status: 413 })
  }

  let json: unknown
  try {
    json = JSON.parse(text)
  } catch {
    return NextResponse.json({ success: false, error: "[INVALID_INPUT] not json" }, { status: 400 })
  }

  const parsed = validateConsentPayload(json)
  if (!parsed.ok) return NextResponse.json({ success: false, error: parsed.error }, { status: 400 })

  const client = describeClient(req.headers.get("user-agent"))
  // Bots get a quiet success so they learn nothing, and pollute nothing.
  if (client.isBot) return NextResponse.json({ success: true })

  const ipHash = hashIp(clientIp(req))
  if (limited(ipHash ?? clientIp(req))) {
    return NextResponse.json({ success: false, error: "Too many requests" }, { status: 429 })
  }

  const country = (req.headers.get("x-vercel-ip-country") ?? req.headers.get("cf-ipcountry") ?? "").slice(0, 2).toUpperCase()
  const row: ConsentRow = {
    ...parsed.value,
    device_class: client.device_class,
    browser: client.browser,
    country: /^[A-Z]{2}$/.test(country) ? country : null,
    ip_hash: ipHash,
  }

  try {
    await insertConsent(row)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[CONSENT_DB_ERR]", (error as Error).message)
    return NextResponse.json({ success: false, error: "Could not record consent" }, { status: 500 })
  }
}
