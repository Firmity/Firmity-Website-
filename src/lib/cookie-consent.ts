// ─── Cookie consent: shared, client-safe helpers ─────────────────────────────
// One place that knows how the visitor's choice is stored and announced.
// Think of it as the "consent ledger" on the visitor's own device: the banner
// writes to it, the script gate and the settings link read from it, and
// nothing else touches the cookie directly.
//
// Choice model (matches the Privacy Policy, clause 5): two options only.
//   accepted → analytics + marketing allowed
//   rejected → essential only
// Essential storage never needs consent and is not tracked here.

export const CONSENT_COOKIE = "firmity_consent"
/** Bump when the Cookie/Privacy Policy changes in a way that needs fresh consent. */
export const CONSENT_POLICY_VERSION = "2026-06-10"
export const CONSENT_MAX_AGE_DAYS = 365
/** Fired on window whenever the stored choice changes. detail = ConsentRecord. */
export const CONSENT_EVENT = "firmity:consent-changed"
/** Fire this to re-open the banner (e.g. from a "Cookie settings" link). */
export const OPEN_SETTINGS_EVENT = "firmity:open-cookie-settings"

export type ConsentDecision = "accepted" | "rejected"

export interface ConsentRecord {
  /** Policy version the visitor answered. */
  v: string
  /** Random anonymous identifier — links this visitor's consent events only. */
  id: string
  d: ConsentDecision
  /** Epoch ms of the decision. */
  ts: number
  /** Analytics allowed. */
  a: boolean
  /** Marketing allowed. */
  m: boolean
}

export interface ConsentContext {
  landing_path: string
  referrer_host: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_term: string | null
  utm_content: string | null
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined"
}

function newId(): string {
  if (isBrowser() && typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }
  // Fallback for very old browsers: RFC 4122 v4 from getRandomValues / Math.random.
  const b = new Uint8Array(16)
  if (isBrowser() && typeof crypto !== "undefined" && crypto.getRandomValues) crypto.getRandomValues(b)
  else for (let i = 0; i < 16; i++) b[i] = Math.floor(Math.random() * 256)
  b[6] = (b[6] & 0x0f) | 0x40
  b[8] = (b[8] & 0x3f) | 0x80
  const h = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("")
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`
}

/** Validates an untrusted parsed value into a ConsentRecord, or null. */
function toRecord(raw: unknown): ConsentRecord | null {
  if (!raw || typeof raw !== "object") return null
  const r = raw as Record<string, unknown>
  if (typeof r.v !== "string" || typeof r.id !== "string" || !UUID_RE.test(r.id)) return null
  if (r.d !== "accepted" && r.d !== "rejected") return null
  if (typeof r.ts !== "number" || !Number.isFinite(r.ts)) return null
  const accepted = r.d === "accepted"
  // Derive a/m from the decision so a tampered cookie can't grant more than a click would.
  return { v: r.v, id: r.id, d: r.d, ts: r.ts, a: accepted, m: accepted }
}

/** Reads the stored choice. Returns null if none, malformed, or from an older policy version. */
export function readConsent(): ConsentRecord | null {
  if (!isBrowser()) return null
  try {
    const hit = document.cookie.split("; ").find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
    if (!hit) return null
    const rec = toRecord(JSON.parse(decodeURIComponent(hit.slice(CONSENT_COOKIE.length + 1))))
    if (!rec || rec.v !== CONSENT_POLICY_VERSION) return null
    return rec
  } catch {
    return null
  }
}

/** Reads the anonymous id even from an older-version record, so a re-ask stays linked. */
function readExistingId(): string | null {
  if (!isBrowser()) return null
  try {
    const hit = document.cookie.split("; ").find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
    if (!hit) return null
    const rec = toRecord(JSON.parse(decodeURIComponent(hit.slice(CONSENT_COOKIE.length + 1))))
    return rec?.id ?? null
  } catch {
    return null
  }
}

function writeCookie(rec: ConsentRecord): void {
  const secure = window.location.protocol === "https:" ? "; Secure" : ""
  const maxAge = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(rec))}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`
}

/** Persists the choice, announces it, and returns the record. */
export function saveConsent(decision: ConsentDecision): ConsentRecord {
  const accepted = decision === "accepted"
  const rec: ConsentRecord = {
    v: CONSENT_POLICY_VERSION,
    id: readExistingId() ?? newId(),
    d: decision,
    ts: Date.now(),
    a: accepted,
    m: accepted,
  }
  writeCookie(rec)
  window.dispatchEvent(new CustomEvent<ConsentRecord>(CONSENT_EVENT, { detail: rec }))
  return rec
}

/** Re-opens the banner. Safe to call from any client component. */
export function openCookieSettings(): void {
  if (isBrowser()) window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))
}

// ─── Attribution context ─────────────────────────────────────────────────────
// Collected at the moment of the click, sent once to the consent log, and
// only when the visitor ACCEPTED (nothing beyond path/version for a reject).
// Nothing here is persisted on the device.

function clean(v: string | null, max = 100): string | null {
  if (!v) return null
  const t = v.trim().slice(0, max)
  return t.length ? t : null
}

export function collectContext(decision: ConsentDecision): ConsentContext {
  const ctx: ConsentContext = {
    landing_path: window.location.pathname.slice(0, 200) || "/",
    referrer_host: null,
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_term: null,
    utm_content: null,
  }
  if (decision !== "accepted") return ctx
  try {
    if (document.referrer) {
      const host = new URL(document.referrer).hostname
      // Same-site navigation is not a traffic source.
      if (host && host !== window.location.hostname) ctx.referrer_host = clean(host)
    }
  } catch {
    /* malformed referrer — ignore */
  }
  const q = new URLSearchParams(window.location.search)
  ctx.utm_source = clean(q.get("utm_source"))
  ctx.utm_medium = clean(q.get("utm_medium"))
  ctx.utm_campaign = clean(q.get("utm_campaign"))
  ctx.utm_term = clean(q.get("utm_term"))
  ctx.utm_content = clean(q.get("utm_content"))
  return ctx
}

/**
 * Sends the choice to the consent log. Fire-and-forget: a logging failure must
 * never block or break the visitor's experience. One retry after 4s.
 */
export function logConsent(rec: ConsentRecord, event: "given" | "changed"): void {
  const body = JSON.stringify({
    consent_id: rec.id,
    decision: rec.d,
    analytics: rec.a,
    marketing: rec.m,
    event,
    policy_version: rec.v,
    ...collectContext(rec.d),
  })
  const send = (): Promise<Response> =>
    fetch("/api/cookie-consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    })
  send()
    .then((res) => {
      if (!res.ok) throw new Error(`status ${res.status}`)
    })
    .catch(() => {
      window.setTimeout(() => {
        send().catch((err: unknown) => console.warn("[CONSENT_LOG_ERR]", err))
      }, 4000)
    })
}

// ─── Withdrawal clean-up ─────────────────────────────────────────────────────
// Best-effort removal of analytics/marketing cookies already on the device
// when the visitor rejects after having accepted. Cookies on other domains
// can only be cleared by the browser (the Cookie Policy says so).

const NON_ESSENTIAL_COOKIE_PREFIXES = ["_ga", "_gid", "_gat", "_gcl", "_fbp", "_fbc", "_clck", "_clsk"]

export function clearNonEssentialCookies(): void {
  if (!isBrowser()) return
  const host = window.location.hostname
  const parts = host.split(".")
  const domains = new Set<string | null>([null, host])
  for (let i = 1; i < parts.length - 1; i++) domains.add(`.${parts.slice(i).join(".")}`)
  document.cookie.split("; ").forEach((pair) => {
    const name = pair.split("=")[0]
    if (!NON_ESSENTIAL_COOKIE_PREFIXES.some((p) => name.startsWith(p))) return
    domains.forEach((d) => {
      document.cookie = `${name}=; Max-Age=0; Path=/${d ? `; Domain=${d}` : ""}`
    })
  })
}
