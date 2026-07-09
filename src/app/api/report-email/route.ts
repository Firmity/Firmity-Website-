// Email a finished report link to a recipient (e.g. the facility client).
// Reuses the site's existing Gmail/nodemailer setup (EMAIL_USER / EMAIL_PASS).
// Auth-gated: only a signed-in staff user can send.

import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  // 1) auth
  const auth = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => req.cookies.getAll(), setAll: () => {} } }
  );
  const { data: { user } } = await auth.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  // 2) validate input
  let body: { to?: string; facilityName?: string; shareUrl?: string; pdfUrl?: string; docxUrl?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  const to = (body.to || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return NextResponse.json({ error: "invalid recipient email" }, { status: 400 });
  }
  const facility = body.facilityName?.trim() || "your facility";
  const link = body.shareUrl || body.pdfUrl || body.docxUrl;
  if (!link) return NextResponse.json({ error: "no report link" }, { status: 400 });

  // 3) send
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: `Facility Health Report — ${facility}`,
      text:
        `Hello,\n\nThe facility health report for ${facility} is ready.\n\n` +
        `View / download it here: ${link}\n\n` +
        (body.pdfUrl ? `Direct PDF: ${body.pdfUrl}\n` : "") +
        (body.docxUrl ? `Direct Word: ${body.docxUrl}\n` : "") +
        `\nRegards,\nFirmity`,
      html:
        `<p>Hello,</p>` +
        `<p>The facility health report for <strong>${facility}</strong> is ready.</p>` +
        `<p><a href="${link}">View / download the report</a></p>` +
        (body.pdfUrl ? `<p><a href="${body.pdfUrl}">Direct PDF</a></p>` : "") +
        (body.docxUrl ? `<p><a href="${body.docxUrl}">Direct Word</a></p>` : "") +
        `<p>Regards,<br/>Firmity</p>`,
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[REPORT_EMAIL_ERR]", (e as Error).message);
    return NextResponse.json({ error: "send failed" }, { status: 502 });
  }
}
