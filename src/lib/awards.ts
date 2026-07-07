// Awards are earned per completed section and stored against the staff user's
// profile (RLS: a user can read/insert only their own). Read via the browser client.

import { getSupabaseBrowser } from "./supabase-browser";

export interface Award {
  id: string;
  survey_id: string;
  section: string;
  facility_name: string | null;
  earned_at: string;
}

export async function recordAward(surveyId: string, section: string, facilityName: string | null) {
  const sb = getSupabaseBrowser();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return;
  await sb
    .from("awards")
    .upsert(
      { user_id: user.id, survey_id: surveyId, section, facility_name: facilityName },
      { onConflict: "user_id,survey_id,section" }
    );
}

export async function myAwards(): Promise<Award[]> {
  const sb = getSupabaseBrowser();
  const { data } = await sb
    .from("awards")
    .select("id,survey_id,section,facility_name,earned_at")
    .order("earned_at", { ascending: false });
  return (data as Award[]) ?? [];
}
