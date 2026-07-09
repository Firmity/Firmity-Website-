"use client";
// Theme picker (Profile > Settings). Sets --brand app-wide by writing a
// [data-theme] attribute on <html> and persisting the choice to localStorage.
// A blocking init script in layout.tsx re-applies it on every load (no flash).

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

type Theme = { id: string; label: string; swatch: string };

// swatch is the hex mirror of --brand for each theme (for the preview dot).
const THEMES: Theme[] = [
  { id: "lime", label: "Lime", swatch: "#a3e635" },
  { id: "emerald", label: "Emerald", swatch: "#059669" },
  { id: "ocean", label: "Ocean", swatch: "#0284c7" },
  { id: "violet", label: "Violet", swatch: "#7c3aed" },
  { id: "rose", label: "Rose", swatch: "#e11d48" },
  { id: "slate", label: "Slate", swatch: "#334155" },
];

const STORAGE_KEY = "firmity_theme";
// "lime" is the :root default (no data-theme attribute needed).
const DEFAULT = "lime";

function applyTheme(id: string) {
  const el = document.documentElement;
  if (id === DEFAULT) el.removeAttribute("data-theme");
  else el.setAttribute("data-theme", id);
}

export default function ThemePicker() {
  const [active, setActive] = useState<string>(DEFAULT);

  // Hydrate from storage (client-only) so the selected swatch shows a tick.
  useEffect(() => {
    try {
      setActive(localStorage.getItem(STORAGE_KEY) || DEFAULT);
    } catch {
      /* storage unavailable — keep default */
    }
  }, []);

  function pick(id: string) {
    setActive(id);
    applyTheme(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
      {THEMES.map((t) => {
        const on = active === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => pick(t.id)}
            aria-pressed={on}
            className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 transition active:scale-95 ${
              on ? "border-slate-800 bg-slate-50" : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <span
              className="relative flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-white"
              style={{ backgroundColor: t.swatch }}
            >
              {on && <Check className="h-4 w-4 text-white" strokeWidth={3} />}
            </span>
            <span className="text-xs font-medium text-slate-700">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
