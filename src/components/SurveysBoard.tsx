"use client";
// Admin surveys board: list <-> calendar toggle, per-survey assignment + visit
// scheduling (custom picker), and the client's preferred slots as clean chips.
//
// Calendar model (Google-Calendar style): each survey becomes one or more events.
//   - scheduled_at set  -> a single "scheduled" event on that date, at that time
//   - not scheduled yet -> one "requested" event per client preferred slot date
// Days with events show a badge; clicking a day opens a modal listing that day's
// surveys with their times.

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle, CalendarDays, CalendarClock, ChevronLeft, ChevronRight, Clock, List, MapPin, UserRound, X,
} from "lucide-react";
import StatusBadge from "@/src/components/StatusBadge";
import DeleteSurveyButton from "@/src/components/DeleteSurveyButton";
import DateTimePicker from "@/src/components/ui/DateTimePicker";

export interface Staff {
  id: string;
  full_name: string | null;
  email: string | null;
}
export interface Slot {
  date?: string;
  window?: string;
}
export interface VisitInfo {
  surveyor_name: string | null;
  lat: number;
  lng: number;
  captured_at: string;
}

export interface BoardRow {
  id: string;
  facility_name: string | null;
  facility_type: string;
  status: string;
  domain_slugs: string[];
  created_at: string;
  assigned_to: string | null;
  scheduled_at: string | null;
  preferred_dates: Slot[];
  survey_code?: string | null;    // on-site code to share with the client
  visit?: VisitInfo | null;       // latest surveyor GPS check-in (internal audit)
}

interface CalEvent {
  surveyId: string;
  name: string;
  day: Date;               // local midnight of the event day
  time: string;            // display time / window label
  kind: "scheduled" | "requested";
  status: string;
}

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Parse a date-only "YYYY-MM-DD" as a LOCAL day (avoids UTC off-by-one).
function parseDateOnly(s?: string): Date | null {
  if (!s) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
  if (!m) {
    const d = new Date(s);
    return Number.isNaN(d.getTime()) ? null : new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const sameYMD = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });

// A pretty chip label for a client preferred slot: "Thu, 3 Jul · 4:00–6:00 PM".
function slotChip(s: Slot): { date: string; window: string } | null {
  const d = parseDateOnly(s.date);
  if (!d) return null;
  return {
    date: d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }),
    window: (s.window ?? "").replace(/\s*[–-]\s*/g, "–").trim(),
  };
}

// ---- conflict detection ----
interface Conflict {
  hard: boolean; // hard conflicts block the change; soft ones warn + confirm
  message: string;
}
type ChangeTarget = { assigned_to: string | null; scheduled_at: string | null; facility_name: string | null };

const minuteInstant = (iso: string) => Math.floor(new Date(iso).getTime() / 60000);
const sameInstant = (a: string, b: string) => minuteInstant(a) === minuteInstant(b);
const sameFacility = (a?: string | null, b?: string | null) =>
  !!a && !!b && a.trim().toLowerCase() === b.trim().toLowerCase();

// Check a prospective change against every OTHER survey.
//   HARD  one surveyor booked at two places at the SAME date+time (can't be in
//         two places at once); one place double-booked at the same date+time.
//   SOFT  the same facility assigned to a different surveyor (coordination clash).
// Same date + different time is allowed by design.
function detectConflicts(
  others: BoardRow[],
  next: ChangeTarget,
  staffName: (id: string | null) => string | null
): Conflict[] {
  const out: Conflict[] = [];
  for (const o of others) {
    const oName = o.facility_name || "another facility";
    if (
      next.assigned_to && next.scheduled_at && o.assigned_to === next.assigned_to &&
      o.scheduled_at && sameInstant(o.scheduled_at, next.scheduled_at)
    ) {
      out.push({ hard: true, message: `${staffName(next.assigned_to)} is already booked at "${oName}" at this exact date & time.` });
    }
    if (
      next.scheduled_at && o.scheduled_at && sameInstant(o.scheduled_at, next.scheduled_at) &&
      sameFacility(o.facility_name, next.facility_name)
    ) {
      out.push({ hard: true, message: `"${next.facility_name}" already has a visit booked at this exact date & time.` });
    }
    if (
      next.assigned_to && o.assigned_to && o.assigned_to !== next.assigned_to &&
      sameFacility(o.facility_name, next.facility_name)
    ) {
      out.push({ hard: false, message: `"${next.facility_name}" is also assigned to ${staffName(o.assigned_to)} on another booking.` });
    }
  }
  return out.filter((c, i) => out.findIndex((x) => x.message === c.message) === i); // dedupe
}

function initials(name?: string | null): string {
  if (!name) return "S";
  return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("") || "S";
}

export default function SurveysBoard({ rows, staff }: { rows: BoardRow[]; staff: Staff[] }) {
  const [data, setData] = useState<BoardRow[]>(rows);
  const [view, setView] = useState<"list" | "calendar">("list");
  const [month, setMonth] = useState(() => {
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), 1);
  });
  const [modalDay, setModalDay] = useState<Date | null>(null);
  const [conflict, setConflict] = useState<{ surveyId: string; body: Record<string, string | null>; items: Conflict[] } | null>(null);
  const [resetKey, setResetKey] = useState(0); // bump to force pickers back to their committed value

  // Close the conflict modal WITHOUT committing, and revert any picker display.
  const dismissConflict = () => {
    setConflict(null);
    setResetKey((k) => k + 1);
  };

  const staffName = (id: string | null) => {
    if (!id) return null;
    const s = staff.find((x) => x.id === id);
    return s ? s.full_name || s.email : null;
  };

  // Persist a change (optimistic; reverts on failure).
  async function commit(surveyId: string, body: Record<string, string | null>) {
    setConflict(null);
    setData((prev) => prev.map((r) => (r.id === surveyId ? { ...r, ...body } : r)));
    try {
      const res = await fetch("/api/admin/assign-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ survey_id: surveyId, ...body }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setData((prev) => prev.map((r) => (r.id === surveyId ? rows.find((o) => o.id === surveyId) ?? r : r)));
    }
  }

  // Gate a change through conflict detection first. Hard conflicts block; soft
  // conflicts open a confirm modal; clean changes commit immediately.
  function attempt(surveyId: string, body: Record<string, string | null>) {
    const cur = data.find((r) => r.id === surveyId);
    if (!cur) return;
    const next: ChangeTarget = {
      assigned_to: "assigned_to" in body ? body.assigned_to : cur.assigned_to,
      scheduled_at: "scheduled_at" in body ? body.scheduled_at : cur.scheduled_at,
      facility_name: cur.facility_name,
    };
    const items = detectConflicts(data.filter((r) => r.id !== surveyId), next, staffName);
    if (items.length === 0) { commit(surveyId, body); return; }
    setConflict({ surveyId, body, items }); // modal decides (blocked if any hard)
  }

  const onAssign = (id: string, v: string) => attempt(id, { assigned_to: v || null });
  const onSchedule = (id: string, iso: string | null) => attempt(id, { scheduled_at: iso });

  // Derive calendar events from the current data.
  const events = useMemo<CalEvent[]>(() => {
    const out: CalEvent[] = [];
    for (const r of data) {
      const name = r.facility_name || "Unnamed facility";
      if (r.scheduled_at) {
        out.push({ surveyId: r.id, name, day: startOfDay(new Date(r.scheduled_at)), time: fmtTime(r.scheduled_at), kind: "scheduled", status: r.status });
      } else {
        for (const s of r.preferred_dates ?? []) {
          const d = parseDateOnly(s.date);
          if (d) out.push({ surveyId: r.id, name, day: d, time: s.window || "Requested", kind: "requested", status: r.status });
        }
      }
    }
    return out;
  }, [data]);

  const grid = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const start = new Date(first);
    start.setDate(first.getDate() - first.getDay());
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [month]);

  const eventsOn = (d: Date) => events.filter((e) => sameYMD(e.day, d));
  const today = new Date();

  return (
    <div>
      <div className="mb-4 inline-flex overflow-hidden rounded-lg border border-slate-200">
        <button type="button" onClick={() => setView("list")} className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm ${view === "list" ? "bg-slate-900 text-white" : "bg-white text-slate-600 hover:bg-slate-50"}`}>
          <List className="h-4 w-4" /> List
        </button>
        <button type="button" onClick={() => setView("calendar")} className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm ${view === "calendar" ? "bg-slate-900 text-white" : "bg-white text-slate-600 hover:bg-slate-50"}`}>
          <CalendarDays className="h-4 w-4" /> Calendar
        </button>
      </div>

      {view === "calendar" ? (
        <div className="rounded-xl border border-slate-200 p-4">
          <div className="mb-3 flex items-center justify-between">
            <button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="rounded-md p-1.5 hover:bg-slate-100">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-base font-semibold text-slate-800">
              {month.toLocaleString("en-IN", { month: "long", year: "numeric" })}
            </span>
            <button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="rounded-md p-1.5 hover:bg-slate-100">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-400">
            {DOW.map((d) => <div key={d} className="py-1">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {grid.map((d, i) => {
              const inMonth = d.getMonth() === month.getMonth();
              const evs = eventsOn(d);
              const isToday = sameYMD(d, today);
              return (
                <button
                  key={i}
                  type="button"
                  disabled={evs.length === 0}
                  onClick={() => setModalDay(d)}
                  className={`flex min-h-[76px] flex-col items-start gap-1 rounded-lg border p-1.5 text-left transition ${
                    inMonth ? "border-slate-200 bg-white" : "border-transparent bg-slate-50/50"
                  } ${evs.length ? "hover:border-slate-400 hover:shadow-sm" : "cursor-default"}`}
                >
                  <span className={`text-xs ${isToday ? "flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white" : inMonth ? "text-slate-600" : "text-slate-300"}`}>
                    {d.getDate()}
                  </span>
                  {evs.slice(0, 2).map((e, j) => (
                    <span
                      key={j}
                      className={`w-full truncate rounded px-1 py-0.5 text-[10px] font-medium ${
                        e.kind === "scheduled" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {e.kind === "scheduled" ? e.time : "•"} {e.name}
                    </span>
                  ))}
                  {evs.length > 2 && <span className="text-[10px] text-slate-400">+{evs.length - 2} more</span>}
                </button>
              );
            })}
          </div>
          <div className="mt-3 flex gap-4 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-blue-100 ring-1 ring-blue-300" /> Scheduled visit</span>
            <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-amber-100 ring-1 ring-amber-300" /> Client-requested slot</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {data.length === 0 && <p className="text-sm text-slate-500">No surveys yet.</p>}
          {data.map((s) => (
            <div key={s.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-start gap-2">
                <Link href={`/survey/${s.id}`} className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-800">{s.facility_name || "Unnamed facility"}</p>
                  <p className="truncate text-xs text-slate-500">{s.facility_type} · {s.domain_slugs?.join(", ")}</p>
                </Link>
                <div className="flex shrink-0 items-center gap-2">
                  <StatusBadge status={s.status} />
                  <DeleteSurveyButton surveyId={s.id} name={s.facility_name || "Unnamed facility"} />
                </div>
              </div>

              {/* client preferred slots as chips */}
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-medium text-slate-500">Client prefers:</span>
                {(s.preferred_dates ?? []).map(slotChip).filter(Boolean).length === 0 ? (
                  <span className="text-xs text-slate-400">No preference given</span>
                ) : (
                  (s.preferred_dates ?? []).map((slot, i) => {
                    const c = slotChip(slot);
                    if (!c) return null;
                    return (
                      <span key={i} className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-600">
                        <CalendarClock className="h-3 w-3 text-slate-400" />
                        <span className="font-medium text-slate-700">{c.date}</span>
                        {c.window && <span className="text-slate-500">· {c.window}</span>}
                      </span>
                    );
                  })
                )}
              </div>

              {/* on-site verification (internal only — never in the AI report) */}
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2">
                {s.visit ? (
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                      {initials(s.visit.surveyor_name)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-slate-800">
                        {s.visit.surveyor_name || "Surveyor"}
                        <span className="font-normal text-green-600"> · verified on-site</span>
                      </p>
                      <p className="truncate text-[11px] text-slate-500">
                        {new Date(s.visit.captured_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin className="h-3.5 w-3.5" /> No on-site check-in yet
                  </span>
                )}
                <div className="flex items-center gap-2">
                  <span
                    title="On-site code to share with the client"
                    className="rounded-md bg-white px-2 py-1 font-mono text-[11px] font-semibold tracking-wider text-slate-700 ring-1 ring-slate-200"
                  >
                    {s.survey_code ?? "—"}
                  </span>
                  {s.visit && (
                    <a
                      href={`https://www.google.com/maps?q=${s.visit.lat},${s.visit.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-2.5 py-1 text-[11px] font-medium text-white hover:bg-green-700"
                    >
                      <MapPin className="h-3 w-3" /> View on map
                    </a>
                  )}
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-3">
                <label className="flex items-center gap-1.5 text-xs text-slate-500">
                  <UserRound className="h-3.5 w-3.5" /> Assigned
                  <select value={s.assigned_to ?? ""} onChange={(e) => onAssign(s.id, e.target.value)} className="rounded-lg border border-slate-300 px-2 py-1 text-sm text-slate-700">
                    <option value="">Unassigned</option>
                    {staff.map((st) => <option key={st.id} value={st.id}>{st.full_name || st.email}</option>)}
                  </select>
                </label>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <CalendarDays className="h-3.5 w-3.5" /> Visit
                  <DateTimePicker key={`${s.id}-${resetKey}`} value={s.scheduled_at} onChange={(iso) => onSchedule(s.id, iso)} />
                </div>
                {s.assigned_to && <span className="text-xs text-green-700">→ {staffName(s.assigned_to)}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Conflict modal: hard conflicts block; soft ones offer "Assign anyway". */}
      {conflict && (() => {
        const hasHard = conflict.items.some((c) => c.hard);
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4" onClick={dismissConflict}>
            <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={dismissConflict} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle className={`h-5 w-5 ${hasHard ? "text-red-500" : "text-amber-500"}`} />
                <h2 className="text-lg font-bold text-slate-900">
                  {hasHard ? "Scheduling conflict" : "Possible conflict"}
                </h2>
              </div>
              <ul className="mb-5 space-y-2">
                {conflict.items.map((c, i) => (
                  <li key={i} className={`rounded-lg border p-3 text-sm ${c.hard ? "border-red-200 bg-red-50 text-red-700" : "border-amber-200 bg-amber-50 text-amber-800"}`}>
                    {c.message}
                  </li>
                ))}
              </ul>
              <p className="mb-4 text-xs text-slate-500">
                {hasHard
                  ? "This can't be booked — pick a different time or surveyor."
                  : "You can proceed, but please make sure this is intended."}
              </p>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={dismissConflict} className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                  {hasHard ? "OK" : "Cancel"}
                </button>
                {!hasHard && (
                  <button type="button" onClick={() => commit(conflict.surveyId, conflict.body)} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
                    Assign anyway
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Day modal (Google-Calendar style) */}
      {modalDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4" onClick={() => setModalDay(null)}>
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setModalDay(null)} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600">
              <X className="h-5 w-5" />
            </button>
            <h2 className="mb-1 text-lg font-bold text-slate-900">
              {modalDay.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </h2>
            <p className="mb-4 text-sm text-slate-500">{eventsOn(modalDay).length} survey(s)</p>
            <ul className="flex flex-col gap-2">
              {eventsOn(modalDay).map((e, i) => (
                <li key={i}>
                  <Link href={`/survey/${e.surveyId}`} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 hover:border-slate-400">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${e.kind === "scheduled" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>
                      <Clock className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-800">{e.name}</p>
                      <p className="text-xs text-slate-500">
                        {e.kind === "scheduled" ? `Visit at ${e.time}` : `Requested: ${e.time}`}
                      </p>
                    </div>
                    <StatusBadge status={e.status} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
