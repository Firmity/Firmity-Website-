import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { isTrustedOrigin, FORBIDDEN_BODY } from "@/src/lib/request-guard"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  // Bot guard: reject requests that didn't come from a page load on this
  // site — see src/lib/request-guard.ts. Added 2026-09-01 after this route
  // was found being hit directly by bots submitting fake leads.
  if (!isTrustedOrigin(req)) {
    return NextResponse.json(FORBIDDEN_BODY, { status: 403 })
  }

  try {
    const { name, email, phone, city, website } = await req.json()

    // Honeypot: a real visitor never fills this (it's hidden off-screen in
    // brochure-download-form.tsx); a bot filling every field blindly does.
    // Report success without actually sending mail, so a bot sees nothing
    // different and doesn't adapt.
    if (typeof website === "string" && website.trim().length > 0) {
      return NextResponse.json({ success: true })
    }

    if (
      typeof name !== "string" || name.trim().length === 0 ||
      typeof email !== "string" || !EMAIL_RE.test(email.trim()) ||
      typeof phone !== "string" || phone.trim().length === 0 ||
      typeof city !== "string" || city.trim().length === 0
    ) {
      return NextResponse.json({ success: false, error: "Missing or invalid fields" }, { status: 400 })
    }

    // Create transporter (example using Gmail)
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
      subject: "New Brochure Request",
      text: `
New brochure request received:

Name: ${name}
Email: ${email}
Phone: ${phone}
City: ${city}
      `,
    })

    // Send data to Google Sheet
    if (process.env.GOOGLE_SHEET_WEBHOOK_URL) {
      await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, city, timestamp: new Date().toISOString() }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    const err = error as Error
    console.error("Brochure request error:", err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
