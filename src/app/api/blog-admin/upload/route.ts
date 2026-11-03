import { NextResponse } from "next/server";
import sharp from "sharp";
import { isBlogAuthed } from "@/src/lib/blog-guard";
import { getSupabaseAdmin } from "@/src/lib/supabase-admin";

const BUCKET = "blog-media";
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const MAX_WIDTH = 1600;
const OK_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif"];

export async function POST(req: Request) {
  if (!(await isBlogAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "no file" }, { status: 400 });
    if (!OK_TYPES.includes(file.type)) return NextResponse.json({ error: "unsupported image type" }, { status: 400 });
    if (file.size > MAX_BYTES) return NextResponse.json({ error: "image too large (max 8MB)" }, { status: 400 });

    const original = Buffer.from(await file.arrayBuffer());

    // Resize + re-encode to WebP so a 3 MB screenshot doesn't ship at full
    // size. GIFs are passed through untouched (re-encoding would drop the
    // animation). Filenames are unique per upload, so a long cache is safe.
    let buffer: Buffer = original;
    let ext = (file.name.split(".").pop() || "png").toLowerCase().replace(/[^a-z0-9]/g, "");
    let contentType = file.type;
    if (file.type !== "image/gif") {
      // limitInputPixels guards against decompression bombs (a tiny file that
      // decodes to a gigapixel bitmap); 40 MP covers any real photo/screenshot.
      // quality 78 matches scripts/optimize-images.mjs so uploads and the
      // backfill produce the same output.
      const encoded = await sharp(original, { limitInputPixels: 40_000_000 })
        .rotate()
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: 78, effort: 5 })
        .toBuffer();
      // Never make an already-small file bigger (e.g. a tiny optimized logo).
      const keepOriginalBytes = encoded.length >= original.length && file.type === "image/webp";
      buffer = keepOriginalBytes ? original : encoded;
      ext = "webp";
      contentType = "image/webp";
      console.info(`[BLOG_UPLOAD] ${file.name}: ${original.length} -> ${buffer.length} bytes`);
    }
    const path = `posts/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const db = getSupabaseAdmin();
    const { error } = await db.storage.from(BUCKET).upload(path, buffer, {
      contentType,
      cacheControl: "31536000",
      upsert: false,
    });
    if (error) throw error;

    const { data } = db.storage.from(BUCKET).getPublicUrl(path);
    return NextResponse.json({ url: data.publicUrl });
  } catch (e) {
    console.error("[BLOG_UPLOAD_ERR]", e);
    return NextResponse.json({ error: "upload failed" }, { status: 502 });
  }
}
