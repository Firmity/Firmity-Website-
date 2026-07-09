import { NextRequest, NextResponse } from "next/server"
import { writeFile, readFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"
import nodemailer from "nodemailer"
import { getSupabaseAdmin } from "@/src/lib/supabase-admin"
import { mapFacilityType, mapDomains } from "@/src/lib/survey-mapping"

// ─── ID generators ────────────────────────────────────────────────────────────

function genBookingId(): string {
  const now  = new Date()
  const yy   = String(now.getFullYear()).slice(2)
  const mm   = String(now.getMonth() + 1).padStart(2, "0")
  const dd   = String(now.getDate()).padStart(2, "0")
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `FSS-${yy}${mm}${dd}-${rand}`
}

function genSurveyCode(): string {
  return "FS-" + Math.random().toString(36).slice(2, 8).toUpperCase()
}

// ─── Mailer ───────────────────────────────────────────────────────────────────

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContactFull {
  firstName: string; lastName: string; designation: string
  email: string; phone: string; altPhone: string
  facilityName: string; facilityAddress: string
}
interface Building { name: string }
interface Slot     { date: string; time: string }

interface SurveyRecord {
  bookingId: string; surveyCode: string; submittedAt: string
  facilityType: string; surveyTypes: string[]
  facilityArea: string; facilityAreaUnit: string
  buildings: Building[]; preferredSlots: Slot[]
  contact: ContactFull
  surveyId?: string   // Supabase surveys.id (UUID) — the key the surveyor app uses
}

// ─── Supabase persistence ───────────────────────────────────────────────────
// Writes the booking to the shared `surveys` table and returns its UUID.
// Best-effort: a DB failure is logged loudly but never blocks the booking/email.
async function persistSurvey(record: SurveyRecord): Promise<string | null> {
  try {
    const area = Number(record.facilityArea)
    const row = {
      facility_type: mapFacilityType(record.facilityType),
      domain_slugs: mapDomains(record.surveyTypes),
      facility_name: record.contact.facilityName || null,
      facility_address: record.contact.facilityAddress || null,
      total_area: Number.isFinite(area) ? area : null,
      area_unit: record.facilityAreaUnit, // 'sqft' | 'acres'
      // Persist the on-site code to its own column (not just form_payload) so the
      // admin board shows it and the surveyor verify-code check has something to
      // match. Without this, every website booking had survey_code = null → "—".
      survey_code: record.surveyCode,
      blocks: record.buildings ?? [],
      preferred_dates: (record.preferredSlots ?? []).map((s) => ({ date: s.date, window: s.time })),
      contact: {
        first_name: record.contact.firstName,
        last_name: record.contact.lastName,
        designation: record.contact.designation || null,
        email: record.contact.email,
        phone: record.contact.phone,
        alternate_phone: record.contact.altPhone || null,
      },
      form_payload: { ...record }, // full original for cross-reference (bookingId, surveyCode)
      status: "submitted",
    }
    const { data, error } = await getSupabaseAdmin()
      .from("surveys")
      .insert(row)
      .select("id")
      .single()
    if (error) throw error
    return data?.id ?? null
  } catch (e) {
    console.error("[SUPABASE_SAVE_ERR]", e)
    return null
  }
}

// ─── Email HTML ───────────────────────────────────────────────────────────────

function clientEmailHtml(r: SurveyRecord): string {
  const slotRows = r.preferredSlots.map(s => {
    const dateLabel = new Date(s.date + "T00:00:00").toLocaleDateString("en-IN", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    })
    return `<tr>
      <td style="padding:7px 12px;border-bottom:1px solid #eef3f9;">${dateLabel}</td>
      <td style="padding:7px 12px;border-bottom:1px solid #eef3f9;">${s.time} IST</td>
    </tr>`
  }).join("")

  const row = (label: string, val: string) => val ? `
    <tr>
      <td style="padding:7px 12px;border-top:1px solid #eef3f9;color:#718096;width:38%;font-size:12px;">${label}</td>
      <td style="padding:7px 12px;border-top:1px solid #eef3f9;color:#1a202c;font-weight:500;font-size:13px;">${val}</td>
    </tr>` : ""

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Survey Booking Confirmed</title></head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#f8fafc;">
  <div style="max-width:580px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #dbe5f0;">

    <div style="background:#111d35;padding:26px 32px;text-align:center;">
      <p style="color:#63b3ed;font-size:10.5px;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 6px;">Firmity · AI Facility Intelligence</p>
      <h1 style="color:#fff;font-size:21px;font-weight:300;margin:0;">Your Survey is Booked</h1>
    </div>

    <div style="background:#eef3f9;padding:18px 32px;text-align:center;border-bottom:1px solid #dbe5f0;">
      <p style="color:#4a5568;font-size:10.5px;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 5px;">Booking ID</p>
      <p style="color:#111d35;font-size:22px;font-weight:700;font-family:monospace;letter-spacing:0.12em;margin:0;">${r.bookingId}</p>
      <p style="color:#718096;font-size:11px;margin:5px 0 0;">Survey Code: <strong style="color:#2b6cb0;">${r.surveyCode}</strong></p>
    </div>

    <div style="padding:26px 32px;">
      <p style="color:#2d3748;font-size:13.5px;line-height:1.65;margin:0 0 20px;">
        Dear <strong>${r.contact.firstName} ${r.contact.lastName}</strong>,<br><br>
        Thank you for booking your <strong style="color:#2b6cb0;">Free AI Facility Health Survey</strong> with Firmity.
        Our team will contact you within <strong>24 hours</strong> to confirm your appointment.
      </p>

      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #dbe5f0;border-radius:12px;border-collapse:collapse;margin-bottom:18px;">
        <thead><tr style="background:#f8fafc;"><th colspan="2" style="padding:9px 12px;text-align:left;color:#4a5568;font-size:10.5px;letter-spacing:0.1em;text-transform:uppercase;">Facility Summary</th></tr></thead>
        <tbody>
          ${row("Facility Type",    r.facilityType)}
          ${row("Facility Name",    r.contact.facilityName)}
          ${row("Total Area",       `${r.facilityArea} ${r.facilityAreaUnit}`)}
          ${row("Survey Domains",   r.surveyTypes.join(", "))}
          ${r.buildings.length ? row("Buildings", r.buildings.map(b => b.name).join(", ")) : ""}
          ${row("Address",          r.contact.facilityAddress)}
        </tbody>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #dbe5f0;border-radius:12px;border-collapse:collapse;margin-bottom:18px;">
        <thead><tr style="background:#f8fafc;">
          <th style="padding:9px 12px;text-align:left;color:#4a5568;font-size:10.5px;letter-spacing:0.1em;text-transform:uppercase;">Preferred Date</th>
          <th style="padding:9px 12px;text-align:left;color:#4a5568;font-size:10.5px;letter-spacing:0.1em;text-transform:uppercase;">Time Slot</th>
        </tr></thead>
        <tbody>${slotRows || `<tr><td colspan="2" style="padding:8px 12px;color:#a0aec0;font-size:12px;">—</td></tr>`}</tbody>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #dbe5f0;border-radius:12px;border-collapse:collapse;margin-bottom:24px;">
        <thead><tr style="background:#f8fafc;"><th colspan="2" style="padding:9px 12px;text-align:left;color:#4a5568;font-size:10.5px;letter-spacing:0.1em;text-transform:uppercase;">Contact Details</th></tr></thead>
        <tbody>
          ${row("Name", `${r.contact.firstName} ${r.contact.lastName}${r.contact.designation ? ` · ${r.contact.designation}` : ""}`)}
          ${row("Email",   r.contact.email)}
          ${row("Phone",   `${r.contact.phone}${r.contact.altPhone ? ` / ${r.contact.altPhone}` : ""}`)}
        </tbody>
      </table>

      <p style="color:#718096;font-size:12.5px;line-height:1.6;margin:0;">
        If you have any questions, reply to this email or reach out to us at <strong>firmity9@gmail.com</strong>.<br>
        We look forward to helping you optimise your facility.
      </p>
    </div>

    <div style="background:#f8fafc;border-top:1px solid #eef3f9;padding:14px 32px;text-align:center;">
      <p style="color:#a0aec0;font-size:11px;margin:0;">Firmity · AI Facility Management · firmity.in</p>
    </div>
  </div>
</body></html>`
}

function teamEmailHtml(r: SurveyRecord): string {
  const slots = r.preferredSlots.map(s => `${s.date} · ${s.time} IST`).join("<br>") || "—"
  return `<pre style="font-family:monospace;font-size:13px;line-height:1.7;color:#1a202c;">
NEW SURVEY BOOKING
══════════════════════════════════════════
BOOKING ID  : ${r.bookingId}
SURVEY CODE : ${r.surveyCode}
SURVEY ID   : ${r.surveyId || "[NOT SAVED — check [SUPABASE_SAVE_ERR] logs]"}
SUBMITTED   : ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST

─── FACILITY ─────────────────────────────
Type      : ${r.facilityType}
Name      : ${r.contact.facilityName || "—"}
Area      : ${r.facilityArea} ${r.facilityAreaUnit}
Buildings : ${r.buildings.map(b => b.name).join(", ") || "—"}
Domains   : ${r.surveyTypes.join(", ")}
Address   : ${r.contact.facilityAddress || "—"}

─── PREFERRED DATES ──────────────────────
${slots}

─── CONTACT ──────────────────────────────
Name      : ${r.contact.firstName} ${r.contact.lastName}${r.contact.designation ? ` (${r.contact.designation})` : ""}
Email     : ${r.contact.email}
Phone     : ${r.contact.phone}${r.contact.altPhone ? ` / ${r.contact.altPhone}` : ""}
══════════════════════════════════════════</pre>`
}

// ─── POST ─────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { facilityType, surveyTypes, facilityArea, facilityAreaUnit, buildings, preferredSlots, contact } = body

    if (!facilityType || !surveyTypes?.length || !facilityArea || !contact?.firstName || !contact?.email || !contact?.phone) {
      return NextResponse.json(
        { success: false, error: "[INVALID_INPUT] Missing required fields" },
        { status: 400 }
      )
    }

    const bookingId  = genBookingId()
    const surveyCode = genSurveyCode()

    const record: SurveyRecord = {
      bookingId, surveyCode,
      submittedAt:    new Date().toISOString(),
      facilityType,   surveyTypes,
      facilityArea,   facilityAreaUnit,
      buildings:      buildings      ?? [],
      preferredSlots: preferredSlots ?? [],
      contact,
    }

    // 0. Persist to Supabase (shared DB the surveyor app reads) ─────────────────
    record.surveyId = (await persistSurvey(record)) ?? undefined

    // 1. Local JSON ────────────────────────────────────────────────────────────
    try {
      const dataDir  = path.join(process.cwd(), "data")
      const filePath = path.join(dataDir, "facility-surveys.json")
      if (!existsSync(dataDir)) await mkdir(dataDir, { recursive: true })
      let existing: unknown[] = []
      if (existsSync(filePath)) {
        try { existing = JSON.parse(await readFile(filePath, "utf-8")) } catch { existing = [] }
      }
      existing.push(record)
      await writeFile(filePath, JSON.stringify(existing, null, 2), "utf-8")
    } catch (e) {
      // [SAVE_ERR] non-fatal — email still goes out
      console.error("[SURVEY_SAVE]", e)
    }

    // 2. Emails (nodemailer / Gmail) ───────────────────────────────────────────
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const from = `"Firmity Surveys" <${process.env.EMAIL_USER}>`
      const team = process.env.RECEIVER_EMAIL || process.env.EMAIL_USER!

      await Promise.allSettled([
        transporter.sendMail({
          from,
          to:      contact.email,
          subject: `[${bookingId}] Free AI Facility Health Survey — Booking Confirmed`,
          html:    clientEmailHtml(record),
        }),
        transporter.sendMail({
          from,
          to:      team,
          subject: `[NEW] ${bookingId} — ${contact.firstName} ${contact.lastName} · ${facilityType}`,
          html:    teamEmailHtml(record),
        }),
      ])
    }

    return NextResponse.json({ success: true, bookingId, surveyCode, surveyId: record.surveyId })

  } catch (err) {
    console.error("[SURVEY_ERR]", err)
    return NextResponse.json(
      { success: false, error: `[SURVEY_ERR] ${err instanceof Error ? err.message : "Unknown"}` },
      { status: 500 }
    )
  }
}
