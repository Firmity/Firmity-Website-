// Notifies the DPO by email when a withdrawal or data-rights request arrives, so
// a human acts within the policy's time limits (48 hours for marketing withdrawal,
// 30 days for rights requests). Uses the same Gmail transport as /api/contact.
import "server-only"
import nodemailer from "nodemailer"
import { DPO_EMAIL } from "./dpdp-constants"

/** `to` overrides the default recipient (DPO_NOTIFICATION_EMAIL, else dpo@ufirm.in). */
export async function notifyDpo(subject: string, text: string, to?: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  })
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: to || process.env.DPO_NOTIFICATION_EMAIL || DPO_EMAIL,
    subject: subject.replace(/[\r\n]+/g, " ").slice(0, 200),
    text,
  })
}
