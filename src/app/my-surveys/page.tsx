"use client";
// Surveyor "Surveys" tab: the surveys assigned to the signed-in user (soonest
// visit first). Awards live on their own /awards route. Mobile = column + bottom
// nav; desktop = full-width top nav + responsive grid.

import { useEffect, useState } from "react";
import SurveyCard from "@/src/components/SurveyCard";
import BottomNav from "@/src/components/BottomNav";
import SurveyorTopNav from "@/src/components/SurveyorTopNav";
import LoadingScreen from "@/src/components/LoadingScreen";

interface MySurvey {
  id: string;
  facility_name: string | null;
  facility_type: string;
  status: string;
  scheduled_at: string | null;
  preferred_dates: { date?: string; window?: string }[];
  created_at: string;
  viewed?: boolean; // false -> show "new / not opened" badge
}

function fmtVisit(iso: string | null): string {
  if (!iso) return "Not scheduled yet";
  const d = new Date(iso);
  return d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

export default function MySurveys() {
  const [rows, setRows] = useState<MySurvey[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/my-surveys")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Could not load your surveys"))))
      .then((j) => setRows(j.surveys ?? []))
      .catch((e) => setErr((e as Error).message));
  }, []);

  // Lottie loader while surveys load (covers slow tab switches).
  if (rows === null && !err) return <LoadingScreen label="Loading surveys…" />;

  return (
    <>
      <SurveyorTopNav />
      <main className="mx-auto w-full max-w-md px-5 pb-28 pt-8 md:max-w-4xl md:px-6 md:pb-12 md:pt-10">
        <h1 className="text-2xl font-bold text-slate-900">My Surveys</h1>
        <p className="text-sm text-slate-500">Assigned to you</p>

        {err && <p className="mt-4 text-sm text-red-600">{err}</p>}
        {rows && rows.length === 0 && (
          <p className="mt-4 text-sm text-slate-500">Nothing assigned to you yet. Check back later.</p>
        )}

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          {rows?.map((s) => (
            <SurveyCard
              key={s.id}
              id={s.id}
              href={`/survey/${s.id}`}
              name={s.facility_name || "Unnamed facility"}
              type={s.facility_type}
              status={s.status}
              visitLabel={fmtVisit(s.scheduled_at)}
              unread={s.viewed === false}
            />
          ))}
        </div>

        <BottomNav />
      </main>
    </>
  );
}
