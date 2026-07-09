"use client";
// Custom language dropdown (Tailwind-styled, NOT the native <select>). Shows each
// language in its own script. Closes on outside-click / Escape. Used for the
// global default (Settings) and the per-survey switcher (survey header).

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Languages } from "lucide-react";
import { LANGUAGES, langLabel } from "@/src/lib/i18n";

export default function LanguageSelect({
  value,
  onChange,
  compact = false,
}: {
  value: string;
  onChange: (code: string) => void;
  /** compact = icon + short pill (for the survey header); false = full-width button. */
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={
          compact
            ? "inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            : "flex w-full items-center justify-between rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
        }
      >
        <span className="inline-flex items-center gap-1.5">
          <Languages className="h-4 w-4 text-slate-400" />
          {langLabel(value)}
          <span className="rounded bg-amber-100 px-1 py-0.5 text-[9px] font-bold uppercase leading-none tracking-wide text-amber-700">
            Beta
          </span>
        </span>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className={`absolute z-50 mt-1 max-h-72 overflow-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg ${
            compact ? "right-0 w-44" : "w-full"
          }`}
        >
          {LANGUAGES.map((l) => {
            const on = l.code === value;
            return (
              <li key={l.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={on}
                  onClick={() => {
                    onChange(l.code);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-slate-50 ${
                    on ? "font-semibold text-slate-900" : "text-slate-700"
                  }`}
                >
                  <span>
                    {l.native}
                    {l.code !== "en" && <span className="ml-2 text-xs text-slate-400">{l.label}</span>}
                  </span>
                  {on && <Check className="h-4 w-4 text-slate-700" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
