import { NextResponse } from "next/server"
import { isTrustedOrigin, FORBIDDEN_BODY } from "@/src/lib/request-guard"
import { cleanEmail } from "@/src/lib/dpdp-constants"
import { withdrawMarketing } from "@/src/lib/dpdp-store"
import { notifyDpo } from "@/src/lib/dpo-mail"
import { clientIp, makeRateLimiter, readJsonBody } from "@/src/lib/public-route"
import { hashIp } from "@/src/lib/cookie-consent-store"

// POST /api/withdraw-consent — "Withdraw consent" / Unsubscribe form.
// Suppresses the email in Supabase at once, stamps earlier marketing consents as
// withdrawn, and emails the DPO so the team's own email and WhatsApp sending stops within
// the 48-hour limit. The answer never reveals whether the address was known to us.

export const runtime = "nodejs"

const limited = makeRateLimiter(10 * 60 * 1000, 10)

export async function POST(req: Request) {
  if (!isTrustedOrigin(req)) return NextResponse.json(FORBIDDEN_BODY, { status: 403 })

  const body = await readJsonBody(req, 2048)
  if (!body.ok) return NextResponse.json({ success: false, error: body.error }, { status: body.status })

  // Honeypot — quiet success so a bot learns nothing.
  if (typeof body.value.website === "string" && body.value.website.trim()) {
    return NextResponse.json({ success: true })
  }

  const email = cleanEmail(body.value.email)
  if (!email) return NextResponse.json({ success: false, error: "Please enter a valid email address." }, { status: 400 })

  if (limited(hashIp(clientIp(req)) ?? clientIp(req))) {
    return NextResponse.json({ success: false, error: "Too many requests. Please try again later." }, { status: 429 })
  }

  try {
    await withdrawMarketing(email, "unsubscribe-page")
  } catch (err) {
    console.error("[DPDP_WITHDRAW_FAILED]", (err as Error).message)
    return NextResponse.json(
      { success: false, error: "We could not record this right now. Please email dpo@ufirm.in and we will act within 48 hours." },
      { status: 500 },
    )
  }

  // The suppression is already stored; a failed notice must not turn into an error for the person.
  try {
    await notifyDpo(
      "Marketing consent withdrawn",
      `Marketing consent was withdrawn on the website.\n\nEmail: ${email}\nTime: ${new Date().toISOString()}\n\n` +
        `Action (within 48 hours): stop sending marketing email and WhatsApp messages to this address / number. ` +
        `The address is now on the website suppression list (Supabase table marketing_suppressions): check it before every send. ` +
        `If this person is a lead in Zoho CRM, note the withdrawal on the lead.`,
      // Withdrawals go to the same inbox as the website's leads (RECEIVER_EMAIL, the firmity9 inbox),
      // where the team that sends the marketing will see them.
      process.env.RECEIVER_EMAIL,
    )
  } catch (err) {
    console.error("[DPDP_WITHDRAW_NOTIFY_FAILED]", (err as Error).message)
  }

  return NextResponse.json({ success: true })
}
