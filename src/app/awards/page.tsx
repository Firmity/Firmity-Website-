"use client";
// Surveyor Awards screen (bottom-nav / top-nav "Awards" tab). Its own route so the
// tab lands somewhere real instead of scrolling another page.

import { useEffect, useState } from "react";
import { Award as AwardIcon } from "lucide-react";
import BottomNav from "@/src/components/BottomNav";
import SurveyorTopNav from "@/src/components/SurveyorTopNav";
import LoadingScreen from "@/src/components/LoadingScreen";
import { myAwards, type Award } from "@/src/lib/awards";

export default function AwardsPage() {
  const [awards, setAwards] = useState<Award[] | null>(null);

  useEffect(() => {
    myAwards().then(setAwards).catch(() => setAwards([]));
  }, []);

  if (awards === null) return <LoadingScreen label="Loading awards…" />;

  return (
    <>
      <SurveyorTopNav />
      <main className="mx-auto w-full max-w-md px-5 pb-28 pt-8 md:max-w-3xl md:pb-12 md:pt-8">
        <h1 className="text-2xl font-bold text-slate-900">My Awards</h1>
        <p className="text-sm text-slate-500">
          {awards === null ? "Loading…" : `${awards.length} earned`}
        </p>

        {awards && awards.length === 0 && (
          <div className="mt-6 rounded-3xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">
            No awards yet. Complete survey sections to earn them.
          </div>
        )}

        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {(awards ?? []).map((a) => (
            <li key={a.id} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
                <AwardIcon className="h-5 w-5 text-amber-600" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">{a.section}</p>
                <p className="truncate text-xs text-slate-500">{a.facility_name || a.survey_id}</p>
              </div>
            </li>
          ))}
        </ul>

        <BottomNav />
      </main>
    </>
  );
}
