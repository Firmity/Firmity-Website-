"use client";
// My Profile + Awards. Shows the staff user's details and every award they've
// earned, each next to the survey (facility) it was earned for.

import { useEffect, useState } from "react";
import Link from "next/link";
import { Award as AwardIcon, ChevronLeft } from "lucide-react";
import { getSupabaseBrowser } from "@/src/lib/supabase-browser";
import { myAwards, type Award } from "@/src/lib/awards";

export default function ProfilePage() {
  const [info, setInfo] = useState<{ email?: string; name?: string; role?: string }>({});
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const sb = getSupabaseBrowser();
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return;
      const { data: prof } = await sb
        .from("profiles")
        .select("full_name,role,email")
        .eq("id", user.id)
        .single();
      setInfo({ email: user.email ?? prof?.email, name: prof?.full_name, role: prof?.role });
      setAwards(await myAwards());
      setLoading(false);
    })();
  }, []);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/my-surveys" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:underline">
        <ChevronLeft className="h-4 w-4" /> My Surveys
      </Link>

      <h1 className="mt-3 text-2xl font-bold text-slate-900">{info.name || "My Profile"}</h1>
      <p className="text-sm text-slate-500">
        {info.email}
        {info.role && <> · <span className="capitalize">{info.role}</span></>}
      </p>

      <h2 className="mb-3 mt-8 text-lg font-semibold text-slate-900">My Awards ({awards.length})</h2>
      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : awards.length === 0 ? (
        <p className="text-sm text-slate-500">No awards yet. Complete survey sections to earn them.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {awards.map((a) => (
            <li key={a.id} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100">
                <AwardIcon className="h-4 w-4 text-amber-600" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-800">{a.section}</p>
                <p className="truncate text-xs text-slate-500">{a.facility_name || a.survey_id}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
