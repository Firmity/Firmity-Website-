import { NextResponse } from "next/server";
import { isBlogAuthed } from "@/src/lib/blog-guard";
import { getSupabaseAdmin } from "@/src/lib/supabase-admin";

const BUCKET = "blog-media";
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const OK_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif"];

export async function POST(req: Request) {
  if (!(await isBlogAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "no file" }, { status: 400 });
    if (!OK_TYPES.includes(file.type)) return NextResponse.json({ error: "unsupported image type" }, { status: 400 });
    if (file.size > MAX_BYTES) return NextResponse.json({ error: "image too large (max 8MB)" }, { status: 400 });

    const ext = (file.name.split(".").pop() || "png").toLowerCase().replace(/[^a-z0-9]/g, "");
    const path = `posts/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const db = getSupabaseAdmin();
    const { error } = await db.storage.from(BUCKET).upload(path, buffer, {
      contentType: file.type,
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
