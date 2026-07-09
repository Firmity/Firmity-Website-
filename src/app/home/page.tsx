"use client";
// Surveyor home — the default landing after a surveyor signs in.
// A "Good morning" dashboard: rewards, the next survey to run, at-a-glance stats.
// Mobile = single phone-width column + bottom nav. Desktop = full-width top nav +
// two-column grid (no dead space on the sides). Appearance/sign-out live in /settings.
//
// Data: /api/my-surveys (assigned surveys) + myAwards() (earned sections).

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BottomNav from "@/src/components/BottomNav";
import SurveyorTopNav from "@/src/components/SurveyorTopNav";
import LoadingScreen from "@/src/components/LoadingScreen";
import TranslatingBar from "@/src/components/TranslatingBar";
import { getSupabaseBrowser } from "@/src/lib/supabase-browser";
import { myAwards } from "@/src/lib/awards";
import { useI18n, useEnsure } from "@/src/lib/i18n";

interface MySurvey {
  id: string;
  facility_name: string | null;
  facility_type: string;
  status: string;
  scheduled_at: string | null;
}

const DONE = new Set(["reported", "completed"]);

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function initials(name: string, email: string): string {
  const base = name.trim() || email;
  const parts = base.split(/[\s@.]+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "U";
}

function fmtVisit(iso: string | null): string {
  if (!iso) return "Not scheduled yet";
  return new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl bg-slate-100 py-4">
      <span className="text-2xl font-bold text-slate-900">{value}</span>
      <span className="mt-0.5 text-[11px] font-medium text-slate-500">{label}</span>
    </div>
  );
}

export default function SurveyorHome() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [surveys, setSurveys] = useState<MySurvey[] | null>(null);
  const [awardCount, setAwardCount] = useState(0);

  useEffect(() => {
    (async () => {
      const sb = getSupabaseBrowser();
      const { data: { user } } = await sb.auth.getUser();
      if (user) {
        setEmail(user.email ?? "");
        const { data: prof } = await sb.from("profiles").select("full_name").eq("id", user.id).single();
        setName(prof?.full_name ?? "");
      }
      try {
        const r = await fetch("/api/my-surveys");
        const j = await r.json();
        setSurveys(j.surveys ?? []);
      } catch {
        setSurveys([]);
      }
      try {
        setAwardCount((await myAwards()).length);
      } catch {
        /* awards optional */
      }
    })();
  }, []);

  const stats = useMemo(() => {
    const rows = surveys ?? [];
    return {
      done: rows.filter((s) => DONE.has(s.status)).length,
      active: rows.filter((s) => s.status === "in_progress").length,
      pending: rows.filter((s) => s.status === "submitted").length,
    };
  }, [surveys]);

  const next = useMemo(() => {
    const rows = (surveys ?? []).filter((s) => !DONE.has(s.status));
    return rows.find((s) => s.status === "in_progress") ?? rows[0] ?? null;
  }, [surveys]);

  const points = awardCount * 20;
  const toNext = points % 100;

  // i18n: translate greeting + dashboard labels in the chosen language.
  const { t } = useI18n();
  useEnsure([
    "Good morning", "Good afternoon", "Good evening", "Here's your day at a glance.",
    "Your rewards", "My awards →", "Today's suggestion", "Start survey", "Continue survey",
    "Completed", "In progress", "New", "View all surveys", "My awards",
    "Nothing assigned right now. Enjoy the break!", "Loading…",
  ]);

  // Show the Lottie loader while the primary data loads (covers slow tab switches).
  if (surveys === null) return <LoadingScreen label="Loading…" />;

  return (
    <>
      <SurveyorTopNav />
      <TranslatingBar />
      <main className="mx-auto w-full max-w-md px-5 pb-28 pt-8 md:max-w-5xl md:px-6 md:pb-12 md:pt-10">
        {/* Greeting + avatar */}
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 md:text-5xl">
            {t(greeting())},<br />
            {name.split(" ")[0] || "there"}
          </h1>
          <Link
            href="/settings"
            aria-label="Settings"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white"
          >
            {initials(name, email)}
          </Link>
        </div>
        <p className="mt-2 text-sm text-slate-400">{t("Here's your day at a glance.")}</p>

        {/* Desktop: two columns; mobile: single stack */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:items-start md:gap-6">
          {/* Left column */}
          <div className="flex flex-col gap-4">
            {/* Rewards */}
            <div className="rounded-3xl bg-slate-900 p-5 text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">{t("Your rewards")}</span>
                <Link href="/awards" className="rounded-full bg-brand px-3 py-1 text-xs font-semibold">
                  {t("My awards →")}
                </Link>
              </div>
              <p className="mt-2 text-4xl font-bold">
                {points} <span className="text-base font-medium text-slate-400">pts</span>
              </p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-700">
                <div className="h-full rounded-full bg-brand" style={{ width: `${toNext}%` }} />
              </div>
              <p className="mt-2 text-xs text-slate-400">
                {awardCount} section{awardCount === 1 ? "" : "s"} awarded · {100 - toNext} pts to next reward
              </p>
            </div>

            {/* Next survey suggestion */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{t("Today's suggestion")}</p>
              {next ? (
                <div className="rounded-3xl border border-slate-200 p-5">
                  <p className="text-lg font-semibold text-slate-900">{next.facility_name || "Unnamed facility"}</p>
                  <p className="text-xs text-slate-500">
                    {next.facility_type} · {fmtVisit(next.scheduled_at)}
                  </p>
                  <Link
                    href={`/survey/${next.id}`}
                    className="mt-4 flex items-center justify-between rounded-2xl bg-brand px-5 py-3.5 text-base font-semibold"
                  >
                    {t(next.status === "in_progress" ? "Continue survey" : "Start survey")}
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </Link>
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-400">
                  {surveys === null ? t("Loading…") : t("Nothing assigned right now. Enjoy the break!")}
                </div>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-3">
              <Stat value={stats.done} label={t("Completed")} />
              <Stat value={stats.active} label={t("In progress")} />
              <Stat value={stats.pending} label={t("New")} />
            </div>

            <Link
              href="/my-surveys"
              className="flex items-center justify-between rounded-3xl bg-slate-100 px-5 py-4 text-sm font-semibold text-slate-800 active:scale-[0.99]"
            >
              {t("View all surveys")}
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </Link>

            <Link
              href="/awards"
              className="flex items-center justify-between rounded-3xl bg-slate-100 px-5 py-4 text-sm font-semibold text-slate-800 active:scale-[0.99]"
            >
              {t("My awards")}
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </Link>
          </div>
        </div>

        <BottomNav />
      </main>
    </>
  );
}
