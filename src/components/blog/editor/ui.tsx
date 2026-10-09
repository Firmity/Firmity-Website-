"use client";
// Small shared controls for the editor toolbar, bubble menu and context bars.

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Swatch } from "./palette";

export function ToolbarButton({
  onClick, active, title, disabled, children,
}: {
  onClick: () => void; active?: boolean; title: string; disabled?: boolean; children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`h-8 w-8 flex items-center justify-center rounded-md transition-colors disabled:opacity-40 ${
        active ? "bg-[#eef3f9] text-[#2b6cb0]" : "text-[#4a5568] hover:bg-[#f1f5f9]"
      }`}
    >
      {children}
    </button>
  );
}

export function BarButton({
  onClick, title, danger, disabled, children,
}: {
  onClick: () => void; title: string; danger?: boolean; disabled?: boolean; children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`rounded-md px-2 py-1 text-[12px] font-medium transition-colors disabled:opacity-40 ${
        danger ? "text-red-600 hover:bg-red-50" : "text-[#4a5568] hover:bg-white"
      }`}
    >
      {children}
    </button>
  );
}

export function Divider() {
  return <span className="mx-1 h-5 w-px bg-[#e2e8f0]" aria-hidden="true" />;
}

/** Icon button that opens a small swatch grid. `null` swatch values clear. */
export function ColorMenu({
  title, icon, swatches, onPick, active,
}: {
  title: string; icon: ReactNode; swatches: Swatch[]; onPick: (value: string | null) => void; active?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <ToolbarButton title={title} active={active || open} onClick={() => setOpen((v) => !v)}>
        {icon}
      </ToolbarButton>
      {open && (
        <div className="absolute left-0 top-9 z-30 flex w-44 flex-wrap gap-1.5 rounded-lg border border-[#dbe5f0] bg-white p-2 shadow-lg">
          {swatches.map((s) => (
            <button
              key={s.label}
              type="button"
              title={s.label}
              aria-label={s.label}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onPick(s.value);
                setOpen(false);
              }}
              style={s.value ? { backgroundColor: s.value } : undefined}
              className="flex h-6 w-6 items-center justify-center rounded-full border border-[#cbd5e0] text-[10px] text-[#718096] hover:scale-110"
            >
              {s.value ? "" : "✕"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Native <select> for fonts / sizes — keeps the editor selection intact. */
export function ChoiceSelect({
  title, options, value, onPick,
}: {
  title: string; options: Swatch[]; value: string | null; onPick: (value: string | null) => void;
}) {
  return (
    <select
      title={title}
      aria-label={title}
      value={value ?? ""}
      onChange={(e) => onPick(e.target.value || null)}
      className="h-8 max-w-[7.5rem] rounded-md border border-transparent bg-transparent px-1 text-[12px] text-[#4a5568] hover:bg-[#f1f5f9] focus:border-[#2b6cb0] focus:outline-none"
    >
      {options.map((o) => (
        <option key={o.label} value={o.value ?? ""}>{o.label}</option>
      ))}
    </select>
  );
}
