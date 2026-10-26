// ─── Cookie consent: server-side validation, storage and reporting ───────────
// Layers (kept separate on purpose, each testable alone):
//   1. validateConsentPayload  – pure; untrusted JSON in, typed row out
//   2. describeClient / hashIp – pure; derive coarse, non-identifying fields
//   3. insertConsent           – the only write to the database
//   4. summarise               – pure; rows in, dashboard numbers out
//   5. fetchConsents           – the only read from the database
// Server-only: uses the service-role Supabase client.
import "server-only"
import { createHmac } from "crypto"
import { getSupabaseAdmin } from "./supabase-admin"

export interface ConsentRow {
  consent_id: string
  decision: "accepted" | "rejected"
  analytics: boolean
  marketing: boolean
  event: "given" | "changed"
  policy_version: string
  landing_path: string | null
  referrer_host: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_term: string | null
  utm_content: string | null
  device_class: string | null
  browser: string | null
  country: string | null
  ip_hash: string | null
  created_at?: string
}

export type ClientRow = Pick<ConsentRow, "device_class" | "browser" | "country" | "ip_hash">

export type ValidationResult = { ok: true; value: Omit<ConsentRow, keyof ClientRow | "created_at"> } | { ok: false; error: string }

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const VERSION_RE = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
const HOST_RE = /^[a-z0-9.-]{1,100}$/i
const MAX_BODY_BYTES = 4096

export const MAX_BODY = MAX_BODY_BYTES

function optText(v: unknown, max: number): string | null {
  if (v === null || v === undefined) return null
  if (typeof v !== "string") return null
  // Strip control characters; collapse to a bounded, printable string.
  const t = v.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, max)
  return t.length ? t : null
}

/** 1. Validates an untrusted body. Never throws. */
export function validateConsentPayload(raw: unknown): ValidationResult {
  if (!raw || typeof raw !== "object") return { ok: false, error: "[INVALID_INPUT] body" }
  const r = raw as Record<string, unknown>

  if (typeof r.consent_id !== "string" || !UUID_RE.test(r.consent_id)) return { ok: false, error: "[INVALID_INPUT] consent_id" }
  if (r.decision !== "accepted" && r.decision !== "rejected") return { ok: false, error: "[INVALID_INPUT] decision" }
  if (r.event !== "given" && r.event !== "changed") return { ok: false, error: "[INVALID_INPUT] event" }
  if (typeof r.policy_version !== "string" || !VERSION_RE.test(r.policy_version)) {
    return { ok: false, error: "[INVALID_INPUT] policy_version" }
  }
  const accepted = r.decision === "accepted"
  // The two options are all-or-nothing; reject payloads that disagree with themselves.
  if (r.analytics !== accepted || r.marketing !== accepted) return { ok: false, error: "[INVALID_INPUT] categories" }

  const landing = optText(r.landing_path, 200)
  if (landing && !landing.startsWith("/")) return { ok: false, error: "[INVALID_INPUT] landing_path" }
  const host = optText(r.referrer_host, 100)
  if (host && !HOST_RE.test(host)) return { ok: false, error: "[INVALID_INPUT] referrer_host" }

  return {
    ok: true,
    value: {
      consent_id: r.consent_id.toLowerCase(),
      decision: r.decision,
      analytics: accepted,
      marketing: accepted,
      event: r.event,
      policy_version: r.policy_version,
      landing_path: landing,
      // Attribution is only kept for an Accept — a reject records the choice and nothing else.
      referrer_host: accepted ? host : null,
      utm_source: accepted ? optText(r.utm_source, 100) : null,
      utm_medium: accepted ? optText(r.utm_medium, 100) : null,
      utm_campaign: accepted ? optText(r.utm_campaign, 100) : null,
      utm_term: accepted ? optText(r.utm_term, 100) : null,
      utm_content: accepted ? optText(r.utm_content, 100) : null,
    },
  }
}

/** 2a. Coarse device/browser family from a User-Agent. The UA itself is never stored. */
export function describeClient(ua: string | null): { device_class: string; browser: string; isBot: boolean } {
  const s = (ua ?? "").slice(0, 400)
  if (!s) return { device_class: "unknown", browser: "Unknown", isBot: false }
  if (/bot|crawl|spider|slurp|headless|lighthouse|preview|curl|wget|python-requests|axios|node-fetch/i.test(s)) {
    return { device_class: "unknown", browser: "Bot", isBot: true }
  }
  const device_class = /ipad|tablet|(android(?!.*mobile))/i.test(s)
    ? "tablet"
    : /mobi|iphone|ipod|android/i.test(s)
      ? "mobile"
      : "desktop"
  const browser = /edg\//i.test(s)
    ? "Edge"
    : /opr\/|opera/i.test(s)
      ? "Opera"
      : /samsungbrowser/i.test(s)
        ? "Samsung Internet"
        : /chrome|crios/i.test(s)
          ? "Chrome"
          : /firefox|fxios/i.test(s)
            ? "Firefox"
            : /safari/i.test(s)
              ? "Safari"
              : "Other"
  return { device_class, browser, isBot: false }
}

/** 2b. Keyed one-way hash of the IP. Returns null when no salt is configured (fail safe: store nothing). */
export function hashIp(ip: string | null): string | null {
  const salt = process.env.CONSENT_HASH_SALT
  if (!ip || !salt) return null
  return createHmac("sha256", salt).update(ip).digest("hex").slice(0, 32)
}

/** 3. The only write. Throws a tagged error so the route can log and answer 500. */
export async function insertConsent(row: ConsentRow): Promise<void> {
  const { error } = await getSupabaseAdmin().from("cookie_consents").insert(row)
  if (error) throw new Error(`[CONSENT_DB_ERR] insert: ${error.message}`)
}

// ─── Reporting ───────────────────────────────────────────────────────────────

export interface CountItem {
  key: string
  count: number
}

export interface ConsentSummary {
  range_days: number
  total_events: number
  unique_visitors: number
  accepted: number
  rejected: number
  accept_rate: number | null
  changed_after_first_choice: number
  daily: Array<{ date: string; accepted: number; rejected: number }>
  by_device: CountItem[]
  by_browser: CountItem[]
  by_country: CountItem[]
  accepted_by_referrer: CountItem[]
  accepted_by_utm_source: CountItem[]
  accepted_by_utm_campaign: CountItem[]
  top_landing_paths: Array<{ path: string; accepted: number; rejected: number; accept_rate: number | null }>
}

function tally(values: Array<string | null | undefined>, limit = 10): CountItem[] {
  const m = new Map<string, number>()
  for (const v of values) m.set(v || "(none)", (m.get(v || "(none)") ?? 0) + 1)
  return Array.from(m, ([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

/** 4. Pure aggregation, so it can be unit-tested with a literal array. */
export function summarise(rows: ConsentRow[], rangeDays: number): ConsentSummary {
  const accepted = rows.filter((r) => r.decision === "accepted")
  const rejected = rows.length - accepted.length
  const day = (r: ConsentRow) => (r.created_at ?? "").slice(0, 10)

  const dailyMap = new Map<string, { accepted: number; rejected: number }>()
  for (const r of rows) {
    const d = day(r)
    if (!d) continue
    const cur = dailyMap.get(d) ?? { accepted: 0, rejected: 0 }
    cur[r.decision === "accepted" ? "accepted" : "rejected"] += 1
    dailyMap.set(d, cur)
  }

  const pathMap = new Map<string, { accepted: number; rejected: number }>()
  for (const r of rows) {
    const p = r.landing_path || "(unknown)"
    const cur = pathMap.get(p) ?? { accepted: 0, rejected: 0 }
    cur[r.decision === "accepted" ? "accepted" : "rejected"] += 1
    pathMap.set(p, cur)
  }

  return {
    range_days: rangeDays,
    total_events: rows.length,
    unique_visitors: new Set(rows.map((r) => r.consent_id)).size,
    accepted: accepted.length,
    rejected,
    accept_rate: rows.length ? Math.round((accepted.length / rows.length) * 1000) / 10 : null,
    changed_after_first_choice: rows.filter((r) => r.event === "changed").length,
    daily: Array.from(dailyMap, ([date, v]) => ({ date, ...v })).sort((a, b) => a.date.localeCompare(b.date)),
    by_device: tally(rows.map((r) => r.device_class)),
    by_browser: tally(rows.map((r) => r.browser)),
    by_country: tally(rows.map((r) => r.country)),
    accepted_by_referrer: tally(accepted.map((r) => r.referrer_host)),
    accepted_by_utm_source: tally(accepted.map((r) => r.utm_source)),
    accepted_by_utm_campaign: tally(accepted.map((r) => r.utm_campaign)),
    top_landing_paths: Array.from(pathMap, ([path, v]) => ({
      path,
      ...v,
      accept_rate: v.accepted + v.rejected ? Math.round((v.accepted / (v.accepted + v.rejected)) * 1000) / 10 : null,
    }))
      .sort((a, b) => b.accepted + b.rejected - (a.accepted + a.rejected))
      .slice(0, 10),
  }
}

const PAGE = 1000
const HARD_CAP = 50000

/** 5. The only read. Pages through results (the API returns at most 1000 rows per call). */
export async function fetchConsents(sinceIso: string): Promise<ConsentRow[]> {
  const db = getSupabaseAdmin()
  const out: ConsentRow[] = []
  for (let from = 0; from < HARD_CAP; from += PAGE) {
    const { data, error } = await db
      .from("cookie_consents")
      .select(
        "consent_id,decision,analytics,marketing,event,policy_version,landing_path,referrer_host,utm_source,utm_medium,utm_campaign,utm_term,utm_content,device_class,browser,country,created_at",
      )
      .gte("created_at", sinceIso)
      .order("created_at", { ascending: true })
      .range(from, from + PAGE - 1)
    if (error) throw new Error(`[CONSENT_DB_ERR] select: ${error.message}`)
    const batch = (data ?? []) as ConsentRow[]
    out.push(...batch)
    if (batch.length < PAGE) break
  }
  return out
}

const CSV_COLUMNS: Array<keyof ConsentRow> = [
  "created_at",
  "consent_id",
  "decision",
  "event",
  "policy_version",
  "landing_path",
  "referrer_host",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "device_class",
  "browser",
  "country",
]

/** CSV export (no ip_hash). Cells starting with = + - @ are prefixed to block spreadsheet formula injection. */
export function toCsv(rows: ConsentRow[]): string {
  const cell = (v: unknown): string => {
    let s = v === null || v === undefined ? "" : String(v)
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  return [CSV_COLUMNS.join(","), ...rows.map((r) => CSV_COLUMNS.map((c) => cell(r[c])).join(","))].join("\n")
}
