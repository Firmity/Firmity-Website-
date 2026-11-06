// Small helpers shared by the public DPDP routes (withdraw, data-rights).
// Same posture as /api/cookie-consent: origin guard first (request-guard.ts),
// bounded body, best-effort in-memory rate limit per client.
import "server-only"

export type JsonBody = { ok: true; value: Record<string, unknown> } | { ok: false; status: number; error: string }

export async function readJsonBody(req: Request, maxBytes: number): Promise<JsonBody> {
  let text: string
  try {
    text = await req.text()
  } catch {
    return { ok: false, status: 400, error: "Unreadable request" }
  }
  if (text.length > maxBytes) return { ok: false, status: 413, error: "Request too large" }
  try {
    const value = JSON.parse(text)
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return { ok: false, status: 400, error: "Invalid request" }
    }
    return { ok: true, value: value as Record<string, unknown> }
  } catch {
    return { ok: false, status: 400, error: "Invalid request" }
  }
}

export function clientIp(req: Request): string | null {
  const fwd = req.headers.get("x-forwarded-for")
  return (fwd ? fwd.split(",")[0].trim() : req.headers.get("x-real-ip")) || null
}

/** Returns a function that answers "is this key over the limit?". One counter per call site. */
export function makeRateLimiter(windowMs: number, maxPerWindow: number): (key: string | null) => boolean {
  const hits = new Map<string, { n: number; reset: number }>()
  return (key) => {
    if (!key) return false
    const now = Date.now()
    const cur = hits.get(key)
    if (!cur || cur.reset < now) {
      hits.set(key, { n: 1, reset: now + windowMs })
      if (hits.size > 5000) for (const [k, v] of hits) if (v.reset < now) hits.delete(k)
      return false
    }
    cur.n += 1
    return cur.n > maxPerWindow
  }
}
