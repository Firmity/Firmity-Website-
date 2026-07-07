// Public: resolve a shared report by its share token (no auth). Returns the
// (signed) download URLs. Note: signed URLs expire ~7 days after generation.

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/src/lib/supabase-admin";

export async function GET(_req: NextRequest, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;
  const db = getSupabaseAdmin();

  const { data: rep } = await db
    .from("reports")
    .select("survey_id,pdf_url,docx_url,generated_at")
    .eq("share_token", token)
    .single();
  if (!rep) return NextResponse.json({ error: "not found" }, { status: 404 });

  const { data: survey } = await db
    .from("surveys")
    .select("facility_name")
    .eq("id", rep.survey_id)
    .single();

  return NextResponse.json({
    facility_name: survey?.facility_name ?? null,
    pdf_url: rep.pdf_url,
    docx_url: rep.docx_url,
    generated_at: rep.generated_at,
  });
}
