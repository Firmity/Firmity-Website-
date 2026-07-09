// Any signed-in staff: list surveys assigned to the caller. Uses the service key
// (server-side) after verifying the session, so no per-row RLS policy is needed.

import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseAdmin } from "@/src/lib/supabase-admin";

export async function GET(req: NextRequest) {
  const auth = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => req.cookies.getAll(), setAll: () => {} } }
  );
  const {
    data: { user },
  } = await auth.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const db = getSupabaseAdmin();
  const { data, error } = await db
    .from("surveys")
    .select("id,facility_name,facility_type,status,scheduled_at,preferred_dates,created_at")
    .eq("assigned_to", user.id)
    .order("scheduled_at", { ascending: true, nullsFirst: false });

  if (error) {
    console.error("[MY_SURVEYS_ERR]", error);
    return NextResponse.json({ error: error.message }, { status: 502 });
  }

  // Mark which surveys this user has already opened (blue "new" badge otherwise).
  // Best-effort: if the survey_views table isn't migrated yet, treat all as viewed.
  const rows = data ?? [];
  const { data: views, error: viewsErr } = await db
    .from("survey_views")
    .select("survey_id")
    .eq("user_id", user.id);
  // If the table isn't migrated yet, don't flag everything as new — treat as viewed.
  const viewedIds = viewsErr
    ? new Set(rows.map((r) => r.id))
    : new Set((views ?? []).map((v: { survey_id: string }) => v.survey_id));
  const surveys = rows.map((r) => ({ ...r, viewed: viewedIds.has(r.id) }));
  return NextResponse.json({ surveys });
}
