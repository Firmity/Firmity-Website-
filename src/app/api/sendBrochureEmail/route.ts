import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, city } = await req.json();

    // Create transporter (example using Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,// your email address
        pass: process.env.EMAIL_PASS, // your app password (not regular password)
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER, // your verified email
      replyTo: email,// reply to the user's email
      to: process.env.RECEIVER_EMAIL,// recipient email
      subject: "New Brochure Request",
      text: `
New brochure request received:

Name: ${name}
Email: ${email}
Phone: ${phone}
City: ${city}
      `,
    });

    // Send data to Google Sheet
    await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, city }),
    });

    return NextResponse.json({ success: true });

  } catch (error) {
  const err = error as Error;
  console.error("Email error:", err);
  return NextResponse.json(
    { success: false, error: err.message },
    { status: 500 }
  );
}
}
