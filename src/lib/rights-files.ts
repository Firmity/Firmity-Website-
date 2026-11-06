// Upload handling for the "Your Data Rights" form: validate (size, real file type by
// content, not by the name the browser claims) and store in the private bucket.
import "server-only"
import { getSupabaseAdmin } from "./supabase-admin"

export const RIGHTS_BUCKET = "data-rights-files"
// Vercel limits a request body to about 4.5 MB; two files of 2 MB fit under it.
export const MAX_FILE_BYTES = 2 * 1024 * 1024

export type UploadKind = "supporting" | "nominee-id"

export interface CheckedFile {
  displayName: string
  bytes: Buffer
  contentType: string
  ext: string
}

export type FileCheck = { ok: true; file: CheckedFile | null } | { ok: false; error: string }

function sniff(b: Buffer): { contentType: string; ext: string } | null {
  if (b.length >= 4 && b.subarray(0, 4).toString("latin1") === "%PDF") return { contentType: "application/pdf", ext: "pdf" }
  if (b.length >= 8 && b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return { contentType: "image/png", ext: "png" }
  }
  if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return { contentType: "image/jpeg", ext: "jpg" }
  return null
}

/** An empty file input is "no file" (ok, null). Anything else must be a PDF, JPG or PNG within the size limit. */
export async function checkUpload(entry: FormDataEntryValue | null, label: string): Promise<FileCheck> {
  if (entry === null || entry === "") return { ok: true, file: null }
  if (typeof entry === "string") return { ok: false, error: `Please attach ${label} as a file.` }
  if (entry.size === 0) return { ok: true, file: null }
  if (entry.size > MAX_FILE_BYTES) return { ok: false, error: `${label} is too large. The limit is 2 MB per file.` }
  const bytes = Buffer.from(await entry.arrayBuffer())
  const kind = sniff(bytes)
  if (!kind) return { ok: false, error: `${label} must be a PDF, JPG or PNG file.` }
  const displayName = entry.name.replace(/[^A-Za-z0-9._ -]/g, "_").slice(0, 80) || `file.${kind.ext}`
  return { ok: true, file: { displayName, bytes, ...kind } }
}

/** Stores one checked file under <requestId>/<kind>.<ext> and returns its storage path. */
export async function storeUpload(requestId: string, kind: UploadKind, file: CheckedFile): Promise<string> {
  const path = `${requestId}/${kind}.${file.ext}`
  const { error } = await getSupabaseAdmin()
    .storage.from(RIGHTS_BUCKET)
    .upload(path, file.bytes, { contentType: file.contentType, upsert: false })
  if (error) throw new Error(`[DPDP_FILE_ERR] upload ${kind}: ${error.message}`)
  return path
}

/** Best-effort cleanup when a request could not be saved. */
export async function removeUploads(paths: string[]): Promise<void> {
  if (paths.length === 0) return
  const { error } = await getSupabaseAdmin().storage.from(RIGHTS_BUCKET).remove(paths)
  if (error) console.error("[DPDP_FILE_CLEANUP_FAILED]", error.message)
}
