import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { isTrustedOrigin, FORBIDDEN_BODY } from "@/src/lib/request-guard"

// Backend for the "How did you hear about Firmity?" widget (homepage section +
// post-contact-form/post-overview-form/post-brochure-download re-asks — see
// how-did-you-hear-form.tsx for the full list of call sites). Mirrors
// /api/contact's transporter setup exactly: same EMAIL_USER/EMAIL_PASS gmail
// account, same RECEIVER_EMAIL inbox (firmity9@gmail.com today), so there's
// one place to change delivery config for both forms.

// Keep in sync with HowDidYouHearFormProps["source"] in how-did-you-hear-form.tsx.
// Unrecognized values (shouldn't happen from our own call sites, but this is a
// public route) fall back to "Homepage" rather than throwing.
const SOURCE_LABELS: Record<string, string> = {
  homepage: "Homepage",
  "contact-form": "Post-Contact-Form",
  "overview-form": "Post-Homepage-Contact-Form",
  "brochure-form": "Post-Brochure-Download",
}

export async function POST(req: Request) {
  // Bot guard — see src/lib/request-guard.ts. This route has no PII fields
  // for a bot to harvest, but it can still be flooded to spam the inbox, so
  // it gets the same check as /api/contact and /api/brochure.
  if (!isTrustedOrigin(req)) {
    return NextResponse.json(FORBIDDEN_BODY, { status: 403 })
  }

  try {
    const { source, howHeard, detail } = await req.json()

    if (typeof howHeard !== "string" || howHeard.trim().length === 0) {
      return NextResponse.json({ success: false, error: "Missing answer" }, { status: 400 })
    }
    if (howHeard === "Other (please specify)" && (typeof detail !== "string" || detail.trim().length === 0)) {
      return NextResponse.json({ success: false, error: "Missing detail for 'Other'" }, { status: 400 })
    }

    const sourceLabel = SOURCE_LABELS[typeof source === "string" ? source : ""] ?? "Homepage"

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: `How did you hear about Firmity? (${sourceLabel})`,
      text: `
Source: ${sourceLabel}
Answer: ${howHeard}${detail ? `\nDetails: ${detail}` : ""}
Submitted: ${new Date().toISOString()}
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    const err = error as Error
    console.error("[how-heard] submit error:", err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
