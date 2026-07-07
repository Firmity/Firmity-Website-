"use client";
// Custom date + time picker (no native <input type="datetime-local">).
// Trigger button -> popover with a month calendar for the date and a scrollable
// 30-minute time list. Emits an ISO string (or null when cleared).

import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, Clock, X } from "lucide-react";

const DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const pad = (n: number) => String(n).padStart(2, "0");

function fmtTrigger(d: Date | null): string {
  return d ? d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "";
}
function timeLabel(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const ap = h < 12 ? "AM" : "PM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${pad(m)} ${ap}`;
}
const SLOTS = Array.from({ length: 48 }, (_, i) => `${pad(Math.floor(i / 2))}:${i % 2 ? "30" : "00"}`);

function monthCells(month: Date): Date[] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}
const sameYMD = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export default function DateTimePicker({
  value,
  onChange,
  placeholder = "Set date & time",
}: {
  value: string | null;
  onChange: (iso: string | null) => void;
  placeholder?: string;
}) {
  const init = value ? new Date(value) : null;
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(() =>
    init ? new Date(init.getFullYear(), init.getMonth(), 1) : new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [date, setDate] = useState<Date | null>(init);
  const [time, setTime] = useState(init ? `${pad(init.getHours())}:${pad(init.getMinutes())}` : "10:00");
  const ref = useRef<HTMLDivElement>(null);

  // keep local state in sync if the parent value changes externally
  useEffect(() => {
    const d = value ? new Date(value) : null;
    setDate(d);
    if (d) setTime(`${pad(d.getHours())}:${pad(d.getMinutes())}`);
  }, [value]);

  // close on outside click
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const cells = useMemo(() => monthCells(month), [month]);

  function emit(d: Date | null, t: string) {
    if (!d) {
      onChange(null);
      return;
    }
    const [hh, mm] = t.split(":").map(Number);
    onChange(new Date(d.getFullYear(), d.getMonth(), d.getDate(), hh, mm).toISOString());
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-sm transition ${
          date ? "border-slate-300 text-slate-700" : "border-slate-300 text-slate-400"
        } hover:border-slate-400`}
      >
        <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
        {date ? fmtTrigger(date) : placeholder}
      </button>

      {open && (
        <div className="absolute right-0 z-40 mt-1 w-72 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
          {/* month nav */}
          <div className="mb-2 flex items-center justify-between">
            <button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="rounded-md px-2 py-0.5 text-slate-500 hover:bg-slate-100">‹</button>
            <span className="text-sm font-semibold text-slate-800">
              {month.toLocaleString("en-IN", { month: "long", year: "numeric" })}
            </span>
            <button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="rounded-md px-2 py-0.5 text-slate-500 hover:bg-slate-100">›</button>
          </div>

          <div className="grid grid-cols-7 text-center text-[11px] text-slate-400">
            {DOW.map((d) => (
              <div key={d} className="py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0.5">
            {cells.map((d, i) => {
              const inMonth = d.getMonth() === month.getMonth();
              const sel = date && sameYMD(d, date);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setDate(d);
                    emit(d, time);
                  }}
                  className={`h-8 rounded-md text-sm transition ${
                    sel ? "bg-slate-900 text-white"
                    : inMonth ? "text-slate-700 hover:bg-slate-100" : "text-slate-300"
                  }`}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>

          {/* time list */}
          <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <Clock className="h-3.5 w-3.5" /> Time
          </div>
          <div className="mt-1 grid max-h-28 grid-cols-3 gap-1 overflow-y-auto pr-1">
            {SLOTS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setTime(s);
                  if (date) emit(date, s);
                }}
                className={`rounded-md px-1 py-1 text-xs transition ${
                  time === s ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {timeLabel(s)}
              </button>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setDate(null);
                emit(null, time);
                setOpen(false);
              }}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-red-600"
            >
              <X className="h-3.5 w-3.5" /> Clear
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-medium text-white hover:bg-slate-800"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
