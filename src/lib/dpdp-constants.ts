// Client-safe DPDP constants and pure validators. No server imports here, so the
// forms and the API routes can share one definition of "what the notice said".

/** Bump whenever a notice or the marketing-consent wording changes (and update NOTICE_DATE). */
export const NOTICE_VERSION = "1.0"
export const NOTICE_DATE = "5 November 2026"

export const DPO_EMAIL = "dpo@ufirm.in"

// consent_records.form values. Brochure requests are logged under purpose
// 'enquiry' (a request we reply to); newsletter sign-ups under purpose 'marketing'.
export const LEAD_FORMS = [
  "contact-page",
  "home-form",
  "blog-cta",
  "brochure",
  "newsletter-footer",
  "newsletter-home",
] as const
export type LeadForm = (typeof LEAD_FORMS)[number]

export const RIGHTS_REQUEST_TYPES = ["access", "correction", "erasure", "nomination", "complaint"] as const
export type RightsRequestType = (typeof RIGHTS_REQUEST_TYPES)[number]

export const RIGHTS_IDENTIFIER_TYPES = ["registered_email", "employee_id", "customer_account_id"] as const
export type RightsIdentifierType = (typeof RIGHTS_IDENTIFIER_TYPES)[number]

export const RIGHTS_TYPE_LABELS: Record<RightsRequestType, string> = {
  access: "Access my data",
  correction: "Correct my data",
  erasure: "Delete my data",
  nomination: "Name a nominee",
  complaint: "Make a complaint",
}

export const RIGHTS_IDENTIFIER_LABELS: Record<RightsIdentifierType, string> = {
  registered_email: "Registered email",
  employee_id: "Employee ID",
  customer_account_id: "Customer account ID",
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isLeadForm(v: unknown): v is LeadForm {
  return typeof v === "string" && (LEAD_FORMS as readonly string[]).includes(v)
}

export function isRightsRequestType(v: unknown): v is RightsRequestType {
  return typeof v === "string" && (RIGHTS_REQUEST_TYPES as readonly string[]).includes(v)
}

export function isRightsIdentifierType(v: unknown): v is RightsIdentifierType {
  return typeof v === "string" && (RIGHTS_IDENTIFIER_TYPES as readonly string[]).includes(v)
}

/** Lower-cased, trimmed email, or null when it is not a plausible address. */
export function cleanEmail(v: unknown): string | null {
  if (typeof v !== "string") return null
  const e = v.trim().toLowerCase()
  return e.length <= 254 && EMAIL_RE.test(e) ? e : null
}

/** Printable, length-bounded text with control characters removed. */
export function cleanText(v: unknown, max: number): string {
  if (typeof v !== "string") return ""
  return v.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim().slice(0, max)
}
