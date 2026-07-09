// Internal surveys dashboard: lists all bookings with assignment + scheduling.
// Server Component -> queries Supabase with the service key (server-side).
// Admin-gated by middleware (/surveys).

import { getSupabaseAdmin } from "@/src/lib/supabase-admin";
import AdminNav from "@/src/components/AdminNav";
import SurveysBoard, { type BoardRow, type Staff } from "@/src/components/SurveysBoard";

export const dynamic = "force-dynamic"; // always fresh; never statically cached

async function fetchData(): Promise<{ rows: BoardRow[]; staff: Staff[]; error: string | null }> {
  try {
    const db = getSupabaseAdmin();
    const [{ data: surveys, error: e1 }, { data: staff, error: e2 }, { data: visits }] = await Promise.all([
      db
        .from("surveys")
        .select("id,facility_name,facility_type,status,domain_slugs,created_at,assigned_to,scheduled_at,preferred_dates,survey_code")
        .order("created_at", { ascending: false })
        .limit(200),
      db.from("profiles").select("id,full_name,email").order("email"),
      db
        .from("survey_visits")
        .select("survey_id,surveyor_name,lat,lng,captured_at")
        .order("captured_at", { ascending: false })
        .limit(1000),
    ]);
    if (e1) throw e1;
    if (e2) throw e2;
    // latest visit per survey (rows arrive newest-first, so the first seen is latest)
    const latest = new Map<string, { surveyor_name: string | null; lat: number; lng: number; captured_at: string }>();
    for (const v of (visits as { survey_id: string; surveyor_name: string | null; lat: number; lng: number; captured_at: string }[]) ?? []) {
      if (!latest.has(v.survey_id)) latest.set(v.survey_id, v);
    }
    const rows = ((surveys as BoardRow[]) ?? []).map((r) => ({ ...r, visit: latest.get(r.id) ?? null }));
    return { rows, staff: (staff as Staff[]) ?? [], error: null };
  } catch (e) {
    return { rows: [], staff: [], error: (e as Error).message };
  }
}

export default async function SurveysDashboard() {
  const { rows, staff, error } = await fetchData();

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Surveys</h1>
          <p className="text-sm text-slate-500">{rows.length} booking(s)</p>
        </div>
        <AdminNav />
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Could not load surveys: {error}
        </div>
      )}

      {!error && <SurveysBoard rows={rows} staff={staff} />}
    </main>
  );
}
