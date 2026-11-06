import { randomUUID } from "crypto"
import { NextResponse } from "next/server"
import { isTrustedOrigin, FORBIDDEN_BODY } from "@/src/lib/request-guard"
import {
  cleanEmail,
  cleanText,
  isRightsIdentifierType,
  isRightsRequestType,
  RIGHTS_IDENTIFIER_LABELS,
  RIGHTS_TYPE_LABELS,
} from "@/src/lib/dpdp-constants"
import { createRightsRequest, type NominationInput, type StoredFileRef } from "@/src/lib/dpdp-store"
import { checkUpload, removeUploads, storeUpload } from "@/src/lib/rights-files"
import { notifyDpo } from "@/src/lib/dpo-mail"
import { clientIp, makeRateLimiter } from "@/src/lib/public-route"
import { hashIp } from "@/src/lib/cookie-consent-store"

// POST /api/data-rights (multipart/form-data) — "Your Data Rights" form: access, correction,
// deletion, name a nominee, complaint. Optional supporting file; a nomination also needs the
// nominee's details, the nominee's ID document and the person's typed signature.
// Stores the request with a 30-day due date and emails the DPO. The DPO verifies identity by
// replying to the contact email before acting, and checks a nominee's identity before acting.

export const runtime = "nodejs"

const MAX_REQUEST_BYTES = 5 * 1024 * 1024
const PHONE_RE = /^\+?\d{7,15}$/
const limited = makeRateLimiter(10 * 60 * 1000, 5)

const fail = (error: string, status = 400) => NextResponse.json({ success: false, error }, { status })

export async function POST(req: Request) {
  if (!isTrustedOrigin(req)) return NextResponse.json(FORBIDDEN_BODY, { status: 403 })

  const declared = Number(req.headers.get("content-length") ?? 0)
  if (declared > MAX_REQUEST_BYTES) return fail("Your files are too large. The limit is 2 MB per file.", 413)

  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return fail("Invalid request")
  }
  const text = (key: string, max: number) => cleanText(form.get(key), max)

  // Honeypot — quiet success so a bot learns nothing.
  if (text("website", 200)) return NextResponse.json({ success: true })

  const requestType = text("requestType", 40)
  const identifierType = text("identifierType", 40)
  const fullName = text("fullName", 200)
  const contactEmail = cleanEmail(form.get("contactEmail"))
  const identifier = text("identifier", 200)
  const details = text("details", 3000)

  if (!isRightsRequestType(requestType)) return fail("Please choose what you would like to do.")
  if (!isRightsIdentifierType(identifierType)) return fail("Please choose how we can identify you.")
  if (!fullName) return fail("Please enter your name.")
  if (!contactEmail) return fail("Please enter a valid email address we can reply to.")
  if (!identifier) return fail("Please enter your identifier.")

  const supporting = await checkUpload(form.get("attachment"), "The supporting file")
  if (!supporting.ok) return fail(supporting.error)

  // Nomination: every field is required.
  let nominee: Omit<NominationInput, "idFile"> | null = null
  let nomineeIdFile = null as Awaited<ReturnType<typeof checkUpload>> | null
  if (requestType === "nomination") {
    const nomineeEmail = cleanEmail(form.get("nomineeEmail"))
    const nomineePhone = text("nomineePhone", 30).replace(/[\s\-.()]/g, "")
    const nomineeName = text("nomineeName", 200)
    const relationship = text("nomineeRelationship", 100)
    const signedName = text("signedName", 200)
    if (!nomineeName) return fail("Please enter the nominee's name.")
    if (!relationship) return fail("Please enter the nominee's relationship to you.")
    if (!nomineeEmail) return fail("Please enter a valid email address for the nominee.")
    if (!PHONE_RE.test(nomineePhone)) return fail("Please enter a valid phone number for the nominee.")
    if (!signedName) return fail("Please type your full name as your signature.")
    nomineeIdFile = await checkUpload(form.get("nomineeId"), "The nominee's ID document")
    if (!nomineeIdFile.ok) return fail(nomineeIdFile.error)
    if (!nomineeIdFile.file) return fail("Please attach the nominee's ID document.")
    nominee = {
      nomineeName,
      relationship,
      email: nomineeEmail,
      phone: nomineePhone,
      signedName,
      signedOn: new Date().toISOString().slice(0, 10),
    }
  }

  if (limited(hashIp(clientIp(req)) ?? clientIp(req))) return fail("Too many requests. Please try again later.", 429)

  const id = randomUUID()
  const uploaded: string[] = []
  try {
    let attachment: StoredFileRef | null = null
    if (supporting.file) {
      const path = await storeUpload(id, "supporting", supporting.file)
      uploaded.push(path)
      attachment = { path, name: supporting.file.displayName }
    }
    let nomination: NominationInput | null = null
    if (nominee && nomineeIdFile?.ok && nomineeIdFile.file) {
      const path = await storeUpload(id, "nominee-id", nomineeIdFile.file)
      uploaded.push(path)
      nomination = { ...nominee, idFile: { path, name: nomineeIdFile.file.displayName } }
    }

    const ref = await createRightsRequest({
      id,
      requestType,
      identifierType,
      identifier,
      fullName,
      contactEmail,
      details,
      attachment,
      nomination,
    })

    const reference = ref.id.slice(0, 8).toUpperCase()
    const lines = [
      `New data rights request.`,
      ``,
      `Reference: ${reference}`,
      `Type: ${RIGHTS_TYPE_LABELS[requestType]}`,
      `Name: ${fullName}`,
      `Reply to: ${contactEmail}`,
      `${RIGHTS_IDENTIFIER_LABELS[identifierType]}: ${identifier}`,
      `Respond by: ${ref.dueBy}`,
      ``,
      `Details:`,
      details || "(none)",
    ]
    if (attachment) lines.push(``, `Supporting file: ${attachment.name} (Supabase Storage > data-rights-files > ${attachment.path})`)
    if (nomination) {
      lines.push(
        ``,
        `NOMINATION`,
        `Nominee: ${nomination.nomineeName} (${nomination.relationship})`,
        `Nominee email: ${nomination.email}`,
        `Nominee phone: ${nomination.phone}`,
        `Nominee ID document: ${nomination.idFile.name} (Supabase Storage > data-rights-files > ${nomination.idFile.path})`,
        `Signed (typed): ${nomination.signedName} on ${nomination.signedOn}`,
        `Check the nominee's identity before acting. A nominee may use these rights only if the person has died or cannot act.`,
      )
    }
    lines.push(``, `Next: acknowledge within 7 days, verify identity by replying to the contact email, respond within 30 days.`)

    // The request is saved; a failed alert must not turn into an error for the person.
    try {
      await notifyDpo(`Data rights request ${reference}: ${RIGHTS_TYPE_LABELS[requestType]}`, lines.join("\n"))
    } catch (err) {
      console.error("[DPDP_RIGHTS_NOTIFY_FAILED]", (err as Error).message)
    }
    return NextResponse.json({ success: true, reference })
  } catch (err) {
    console.error("[DPDP_RIGHTS_FAILED]", (err as Error).message)
    await removeUploads(uploaded)
    return fail("We could not record your request right now. Please email dpo@ufirm.in.", 500)
  }
}
