"use client";
// Surveyor home: the surveys assigned to the signed-in user, soonest visit first.
// Any authenticated staff can view this (middleware protects it, not admin-only).

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, ChevronRight } from "lucide-react";
import StatusBadge from "@/src/components/StatusBadge";
import SignOutButton from "@/src/components/SignOutButton";

interface MySurvey {
  id: string;
  facility_name: string | null;
  facility_type: string;
  status: string;
  scheduled_at: string | null;
  preferred_dates: { date?: string; window?: string }[];
  created_at: string;
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

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Surveys</h1>
          <p className="text-sm text-slate-500">Assigned to you</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/profile" className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100">
            Profile
          </Link>
          <SignOutButton />
        </div>
      </div>

      {err && <p className="mb-4 text-sm text-red-600">{err}</p>}
      {!rows && !err && <p className="text-sm text-slate-500">Loading…</p>}
      {rows && rows.length === 0 && (
        <p className="text-sm text-slate-500">Nothing assigned to you yet. Check back later.</p>
      )}

      <div className="flex flex-col gap-2">
        {rows?.map((s) => (
          <Link
            key={s.id}
            href={`/survey/${s.id}`}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-400"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-800">{s.facility_name || "Unnamed facility"}</p>
              <p className="truncate text-xs text-slate-500">{s.facility_type}</p>
              <p className="mt-1 inline-flex items-center gap-1 text-xs text-slate-500">
                <CalendarDays className="h-3.5 w-3.5" /> {fmtVisit(s.scheduled_at)}
              </p>
            </div>
            <div className="ml-3 flex shrink-0 items-center gap-2">
              <StatusBadge status={s.status} />
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
