// Admin-only: assign/reassign a survey to a surveyor and/or set its visit date.
// Either field may be provided independently; null clears it.

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/src/lib/supabase-admin";
import { getAdminId } from "@/src/lib/admin-guard";

export async function POST(req: NextRequest) {
  if (!(await getAdminId(req))) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const surveyId = body.survey_id as string | undefined;
  if (!surveyId) return NextResponse.json({ error: "survey_id required" }, { status: 400 });

  // Build a partial update from only the fields the caller sent.
  const patch: Record<string, string | null> = {};
  if ("assigned_to" in body) patch.assigned_to = body.assigned_to || null;
  if ("scheduled_at" in body) patch.scheduled_at = body.scheduled_at || null;
  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: "nothing to update" }, { status: 400 });
  }

  const { error } = await getSupabaseAdmin().from("surveys").update(patch).eq("id", surveyId);
  if (error) {
    console.error("[ASSIGN_SURVEY_ERR]", error);
    return NextResponse.json({ error: error.message }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
