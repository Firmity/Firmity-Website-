// ─── Public-form request guard ──────────────────────────────────────────────
// Shared by every unauthenticated lead-capture POST route (brochure, contact,
// how-heard). These endpoints have no auth and no CAPTCHA — the cheapest,
// zero-infra defense against scripted bots that POST to them directly
// (curl/requests-style, never actually loading the page) is checking that
// the request carries an Origin/Referer this site itself would have sent.
//
// Real browsers ALWAYS send an Origin header on same-origin fetch()/XHR POSTs
// (per the Fetch spec) — a bot hitting the endpoint straight from a script
// almost never sets one, or sets one that doesn't match. This is not a
// substitute for a real CAPTCHA against a bot that renders the page with a
// headless browser and copies the Origin header — it specifically targets
// the "direct API flood" pattern (many near-identical submissions within
// seconds/minutes, zero real page views), which is what was observed here.

const PRODUCTION_ORIGINS = ["https://firmity.in", "https://www.firmity.in"]
const DEV_ORIGINS = ["http://localhost:3000", "http://localhost:3001"]

function allowedOrigins(): string[] {
  // CORS_ORIGINS (.env) is already reserved for this purpose — extend it
  // rather than introducing a second env var for the same concept.
  const fromEnv = (process.env.CORS_ORIGINS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
  return Array.from(new Set([...PRODUCTION_ORIGINS, ...DEV_ORIGINS, ...fromEnv]))
}

/** True if `req` carries an Origin (or, failing that, Referer) that matches
 *  one of this site's own origins. Reject anything else — including
 *  requests with neither header, which a genuine browser fetch() from our
 *  own pages will never produce. */
export function isTrustedOrigin(req: Request): boolean {
  const allowed = allowedOrigins()

  const origin = req.headers.get("origin")
  if (origin) return allowed.includes(origin)

  const referer = req.headers.get("referer")
  if (referer) {
    try {
      return allowed.includes(new URL(referer).origin)
    } catch {
      return false
    }
  }

  return false
}

/** Standard 403 body for a rejected request — kept identical across routes
 *  so nothing downstream (client error handling, logs) has to special-case
 *  which endpoint blocked it. */
export const FORBIDDEN_BODY = { success: false, error: "Forbidden" } as const
