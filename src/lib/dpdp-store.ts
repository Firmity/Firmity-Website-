// DPDP evidence store (Supabase). Server-only: uses the service-role client.
//   recordLeadConsent     – proof of notice / marketing consent for a form submission
//   withdrawMarketing     – suppress an email and stamp earlier marketing consents as withdrawn
//   createRightsRequest   – log a "Your Data Rights" request
import "server-only"
import { getSupabaseAdmin } from "./supabase-admin"
import {
  NOTICE_VERSION,
  type LeadForm,
  type RightsIdentifierType,
  type RightsRequestType,
} from "./dpdp-constants"

export interface LeadConsentInput {
  email: string // already cleaned/lower-cased by the caller
  fullName: string
  form: LeadForm
  marketingOptIn: boolean
  /** false for forms whose only purpose is marketing (newsletter): no 'enquiry' row is written. */
  enquiry?: boolean
  ipHash: string | null
  deviceClass: string | null
}

export async function recordLeadConsent(input: LeadConsentInput): Promise<void> {
  const db = getSupabaseAdmin()
  const base = {
    email: input.email,
    full_name: input.fullName || null,
    form: input.form,
    notice_version: NOTICE_VERSION,
    ip_hash: input.ipHash,
    device_class: input.deviceClass,
  }
  const rows: Array<typeof base & { purpose: string; basis: string }> = []
  if (input.enquiry !== false) rows.push({ ...base, purpose: "enquiry", basis: "notice" })
  if (input.marketingOptIn) rows.push({ ...base, purpose: "marketing", basis: "consent" })

  if (rows.length === 0) return
  const { error } = await db.from("consent_records").insert(rows)
  if (error) throw new Error(`[DPDP_DB_ERR] consent insert: ${error.message}`)

  // A fresh, explicit opt-in supersedes an earlier withdrawal; the new
  // 'marketing' row above is the proof. (Removing the suppression is what lets the team's sending resume.)
  if (input.marketingOptIn) {
    const { error: delErr } = await db.from("marketing_suppressions").delete().eq("email", input.email)
    if (delErr) throw new Error(`[DPDP_DB_ERR] suppression lift: ${delErr.message}`)
  }
}

export async function withdrawMarketing(email: string, source: string): Promise<void> {
  const db = getSupabaseAdmin()
  const now = new Date().toISOString()

  const { error } = await db
    .from("marketing_suppressions")
    .upsert({ email, source, created_at: now }, { onConflict: "email" })
  if (error) throw new Error(`[DPDP_DB_ERR] suppression upsert: ${error.message}`)

  const { error: updErr } = await db
    .from("consent_records")
    .update({ withdrawn_at: now, withdrawal_channel: source })
    .eq("email", email)
    .eq("purpose", "marketing")
    .is("withdrawn_at", null)
  if (updErr) throw new Error(`[DPDP_DB_ERR] consent withdraw: ${updErr.message}`)
}

export interface StoredFileRef {
  path: string
  name: string
}

export interface NominationInput {
  nomineeName: string
  relationship: string
  email: string
  phone: string
  idFile: StoredFileRef
  signedName: string
  /** ISO date (YYYY-MM-DD), set by the server, not the browser. */
  signedOn: string
}

export interface RightsRequestInput {
  /** Generated before the files are uploaded, so files and row share one id. */
  id: string
  requestType: RightsRequestType
  identifierType: RightsIdentifierType
  identifier: string
  fullName: string
  contactEmail: string
  details: string
  attachment?: StoredFileRef | null
  nomination?: NominationInput | null
}

export interface RightsRequestRef {
  id: string
  dueBy: string
}

export async function createRightsRequest(input: RightsRequestInput): Promise<RightsRequestRef> {
  const { data, error } = await getSupabaseAdmin()
    .from("data_rights_requests")
    .insert({
      id: input.id,
      request_type: input.requestType,
      identifier_type: input.identifierType,
      identifier: input.identifier,
      full_name: input.fullName,
      contact_email: input.contactEmail,
      details: input.details || null,
      attachment_path: input.attachment?.path ?? null,
      attachment_name: input.attachment?.name ?? null,
      nominee_name: input.nomination?.nomineeName ?? null,
      nominee_relationship: input.nomination?.relationship ?? null,
      nominee_email: input.nomination?.email ?? null,
      nominee_phone: input.nomination?.phone ?? null,
      nominee_id_path: input.nomination?.idFile.path ?? null,
      nominee_id_name: input.nomination?.idFile.name ?? null,
      signed_name: input.nomination?.signedName ?? null,
      signed_on: input.nomination?.signedOn ?? null,
    })
    .select("id, due_by")
    .single()
  if (error || !data) throw new Error(`[DPDP_DB_ERR] rights insert: ${error?.message ?? "no row"}`)
  return { id: String(data.id), dueBy: String(data.due_by) }
}
