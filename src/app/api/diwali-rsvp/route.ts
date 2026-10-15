// TEMPORARY — backs the one-off /diwali-reception RSVP page. Delete this
// route together with src/app/diwali-reception/ once the event is over.
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { isTrustedOrigin, FORBIDDEN_BODY } from "@/src/lib/request-guard"

// Deliberately hard-coded rather than RECEIVER_EMAIL: RSVPs for this event go
// to a dedicated inbox, separate from the site's normal lead notifications.
const RSVP_RECIPIENT = "firmity9@gmail.com"

const RSVP_LABEL = {
  attending: "Attending",
  not_attending: "Not attending",
} as const

type Rsvp = keyof typeof RSVP_LABEL

// Digits with an optional leading "+"; spaces, dashes, dots and brackets are
// stripped first so "+91 98765-43210" and "(022) 1234 5678" both pass.
const PHONE_RE = /^\+?\d{7,15}$/
// Newlines would let a name inject extra mail headers into the subject line.
const CONTROL_CHARS_RE = /[\u0000-\u001f\u007f]/g

export async function POST(req: Request) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json(FORBIDDEN_BODY, { status: 403 })
  }

  try {
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 })
    }
    const { fullName, phone, rsvp, website } = body as Record<string, unknown>

    // Honeypot — a hidden field real guests never fill. Silently "succeed".
    if (typeof website === "string" && website.trim().length > 0) {
      return NextResponse.json({ success: true })
    }

    const name = typeof fullName === "string" ? fullName.replace(CONTROL_CHARS_RE, " ").trim() : ""
    const phoneDigits = typeof phone === "string" ? phone.replace(/[\s\-.()]/g, "") : ""

    if (name.length < 2 || name.length > 100) {
      return NextResponse.json({ success: false, error: "Please enter your full name." }, { status: 400 })
    }
    if (!PHONE_RE.test(phoneDigits)) {
      return NextResponse.json({ success: false, error: "Please enter a valid phone number." }, { status: 400 })
    }
    if (typeof rsvp !== "string" || !(rsvp in RSVP_LABEL)) {
      return NextResponse.json({ success: false, error: "Please choose attending or not attending." }, { status: 400 })
    }
    const status = RSVP_LABEL[rsvp as Rsvp]

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("[diwali-rsvp] EMAIL_USER / EMAIL_PASS are not configured")
      return NextResponse.json({ success: false, error: "Something went wrong. Please try again." }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: RSVP_RECIPIENT,
      subject: `Diwali RSVP: ${name} — ${status}`,
      text: `New Diwali reception RSVP:

Name: ${name}
WhatsApp / phone: ${phone}
RSVP: ${status}
`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[diwali-rsvp] failed to send RSVP email:", error)
    return NextResponse.json({ success: false, error: "Something went wrong. Please try again." }, { status: 500 })
  }
}
