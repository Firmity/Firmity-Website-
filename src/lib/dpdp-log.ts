// One call for every public form route: derive the coarse client fields and
// write the consent evidence. Logging must never lose a real submission, so a
// failure is reported in the server log and swallowed.
import "server-only"
import { cleanEmail, cleanText, type LeadForm } from "./dpdp-constants"
import { recordLeadConsent } from "./dpdp-store"
import { describeClient, hashIp } from "./cookie-consent-store"
import { clientIp } from "./public-route"

export interface LeadConsentLog {
  email: unknown
  fullName?: unknown
  form: LeadForm
  marketingOptIn: boolean
  enquiry?: boolean
}

export async function logLeadConsent(req: Request, log: LeadConsentLog): Promise<void> {
  const email = cleanEmail(log.email)
  if (!email) return
  try {
    await recordLeadConsent({
      email,
      fullName: cleanText(log.fullName, 200),
      form: log.form,
      marketingOptIn: log.marketingOptIn,
      enquiry: log.enquiry,
      ipHash: hashIp(clientIp(req)),
      deviceClass: describeClient(req.headers.get("user-agent")).device_class,
    })
  } catch (err) {
    console.error("[DPDP_CONSENT_LOG_FAILED]", (err as Error).message)
  }
}
