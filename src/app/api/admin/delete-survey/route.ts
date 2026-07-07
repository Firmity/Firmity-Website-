// Admin-only: delete a survey (cascades answers/photos/reports via FK).
// Verifies the caller is an admin from their session before using the service key.

import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseAdmin } from "@/src/lib/supabase-admin";

export async function POST(req: NextRequest) {
  const auth = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => req.cookies.getAll(), setAll: () => {} } }
  );

  const { data: { user } } = await auth.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { data: prof } = await auth.from("profiles").select("role").eq("id", user.id).single();
  if (prof?.role !== "admin") return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const { survey_id } = await req.json().catch(() => ({}));
  if (!survey_id) return NextResponse.json({ error: "survey_id required" }, { status: 400 });

  const { error } = await getSupabaseAdmin().from("surveys").delete().eq("id", survey_id);
  if (error) {
    console.error("[DELETE_SURVEY_ERR]", error);
    return NextResponse.json({ error: error.message }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
