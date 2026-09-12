import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { isTrustedOrigin, FORBIDDEN_BODY } from "@/src/lib/request-guard"

// ─── Newsletter signup — added 2026-09-04 ─────────────────────────────────────
// Wires up the two previously UI-only "Sign up now" forms (KeepInTouchSection,
// src/components/home-sections.tsx, and the footer's own newsletter box,
// src/components/footer.tsx) per request: "make sure that the Subscribe to
// our newsletter and Keep in touch sign up cta are both connected to
// firmity9@gmail.com like the rest" — same transport pattern as
// /api/contact, /api/brochure, /api/how-heard: nodemailer via
// EMAIL_USER/EMAIL_PASS, delivered to RECEIVER_EMAIL (whatever address
// that env var resolves to in production — this route doesn't hardcode an
// address, it just reuses the SAME env var every other lead-capture route
// already sends to, so it lands in the same inbox by construction).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  // Bot guard — see src/lib/request-guard.ts, shared by every public
  // lead-capture route.
  if (!isTrustedOrigin(req)) {
    return NextResponse.json(FORBIDDEN_BODY, { status: 403 })
  }

  try {
    const { email, source, website } = await req.json()

    // Honeypot — same pattern as brochure-download-form.tsx / contact/page.tsx.
    if (typeof website === "string" && website.trim().length > 0) {
      return NextResponse.json({ success: true })
    }

    if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json({ success: false, error: "Please enter a valid email address" }, { status: 400 })
    }

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
      subject: "New Newsletter Signup",
      text: `
New newsletter signup received:

Email: ${email}
Source: ${source ?? "unknown"}
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    const err = error as Error
    console.error("Newsletter signup error:", err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
