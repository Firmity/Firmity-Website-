import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { isTrustedOrigin, FORBIDDEN_BODY } from "@/src/lib/request-guard"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  // Bot guard — see src/lib/request-guard.ts. Applied 2026-09-01 across all
  // three public lead-capture routes (contact/brochure/how-heard) after the
  // brochure route was found being hit directly by bots.
  if (!isTrustedOrigin(req)) {
    return NextResponse.json(FORBIDDEN_BODY, { status: 403 })
  }

  try {
    const { fullName, email, phone, companyName, manpower, message, requestType, website } = await req.json()

    // Honeypot — see how-did-you-hear-form.tsx / brochure-download-form.tsx
    // comment for the same field. Silently "succeed" so a bot can't tell.
    if (typeof website === "string" && website.trim().length > 0) {
      return NextResponse.json({ success: true })
    }

    if (
      typeof fullName !== "string" || fullName.trim().length === 0 ||
      typeof email !== "string" || !EMAIL_RE.test(email.trim())
    ) {
      return NextResponse.json({ success: false, error: "Missing or invalid fields" }, { status: 400 })
    }

    // companyName is required-in-practice for the homepage/Contact page
    // forms (both always send one) but the new blog CTA form
    // (blog-cta-form.tsx, 2026-09-23) has no company field at all, so this
    // is optional here rather than gated behind a caller flag — every
    // existing caller still always sends a non-empty value, so this is
    // purely additive, not a loosening of validation for them.
    const safeCompanyName = typeof companyName === "string" && companyName.trim() ? companyName.trim() : "(not provided)"

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.RECEIVER_EMAIL,
      subject: `New ${requestType} Request from ${fullName}`,
      text: `
New contact request received:

Name: ${fullName}
Email: ${email}
Phone: ${phone}
Company: ${safeCompanyName}
Team Size: ${manpower}
Request Type: ${requestType}
Message: ${message}
      `,
    })

    if (process.env.GOOGLE_SHEET_WEBHOOK_URLS) {
      await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URLS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          companyName: safeCompanyName,
          manpower,
          message,
          requestType,
          timestamp: new Date().toISOString(),
        }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    const err = error as Error
    console.error("Contact request error:", err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
