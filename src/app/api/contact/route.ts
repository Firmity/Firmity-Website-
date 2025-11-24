import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { fullName, email, phone, companyName, manpower, message, requestType } = await req.json()

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
Company: ${companyName}
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
          companyName,
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
