// Photo upload for a survey answer. Multipart: survey_id, question_id, file.
// Runs server-side so the Supabase service key never reaches the browser.
// Flow: ensure an answer row exists (upsert) -> upload to Storage -> insert photos row.

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/src/lib/supabase-admin";

const BUCKET = "survey-photos";
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB guard

function extFor(name: string, type: string): string {
  const fromName = name.includes(".") ? name.split(".").pop()! : "";
  if (fromName) return fromName.toLowerCase();
  return type.split("/")[1] || "jpg";
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const surveyId = String(form.get("survey_id") || "");
    const questionId = String(form.get("question_id") || "");
    const area = String(form.get("area") || "Common Areas");
    const subId = String(form.get("sub_id") || ""); // checklist sub-question, if any
    const file = form.get("file");

    if (!surveyId || !questionId || !(file instanceof File)) {
      return NextResponse.json(
        { error: "[INVALID_INPUT] survey_id, question_id and file are required" },
        { status: 400 }
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "[FILE_TOO_LARGE] max 8MB" }, { status: 413 });
    }

    const db = getSupabaseAdmin();

    // 1. Ensure the answer row exists (so the photo has a parent). Upsert only the
    //    keys -> never overwrites an existing value/remark.
    const { data: ans, error: ansErr } = await db
      .from("answers")
      .upsert(
        { survey_id: surveyId, question_id: questionId, area },
        { onConflict: "survey_id,area,question_id" }
      )
      .select("id")
      .single();
    if (ansErr || !ans) {
      console.error("[ANSWER_UPSERT_ERR]", ansErr);
      return NextResponse.json({ error: "[ANSWER_UPSERT_ERR]" }, { status: 502 });
    }

    // 2. Upload to Storage.
    const ext = extFor(file.name, file.type);
    const subSeg = subId ? `${subId}/` : "";
    const path = `${surveyId}/${questionId}/${subSeg}${crypto.randomUUID()}.${ext}`;
    const bytes = Buffer.from(await file.arrayBuffer());
    const { error: upErr } = await db.storage
      .from(BUCKET)
      .upload(path, bytes, { contentType: file.type || "image/jpeg", upsert: true });
    if (upErr) {
      console.error("[STORAGE_ERR]", upErr);
      return NextResponse.json({ error: "[STORAGE_ERR]" }, { status: 502 });
    }
    // 3. Record the photo — store the object PATH (the bucket is private now).
    const { error: insErr } = await db
      .from("photos")
      .insert({ answer_id: ans.id, storage_url: path, sub_id: subId || null });
    if (insErr) {
      console.error("[PHOTO_INSERT_ERR]", insErr);
      return NextResponse.json({ error: "[PHOTO_INSERT_ERR]" }, { status: 502 });
    }

    // 4. Short-lived signed URL so the surveyor UI can display it immediately.
    const { data: signed } = await db.storage.from(BUCKET).createSignedUrl(path, 60 * 60);
    return NextResponse.json({ url: signed?.signedUrl });
  } catch (err) {
    console.error("[PHOTO_ERR]", err);
    return NextResponse.json(
      { error: `[PHOTO_ERR] ${err instanceof Error ? err.message : "Unknown"}` },
      { status: 500 }
    );
  }
}
