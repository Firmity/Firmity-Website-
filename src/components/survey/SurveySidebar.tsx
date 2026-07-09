"use client";
// Left sidebar of survey sections. Buildings are tinted pastel blue to stand out
// from facility-level sections. Green check = the whole section is complete.

import { useState } from "react";
import { Building2, Check, Menu, X } from "lucide-react";

interface Props {
  sections: string[];
  active: string;
  completed: Set<string>;       // sections that are fully complete
  buildings: Set<string>;       // which sections are client buildings
  onSelect: (s: string) => void;
}

function Item({
  s,
  active,
  done,
  isBuilding,
  onSelect,
}: {
  s: string;
  active: boolean;
  done: boolean;
  isBuilding: boolean;
  onSelect: (s: string) => void;
}) {
  const base = "flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition";
  const tone = active
    ? isBuilding
      ? "bg-sky-600 text-white"
      : "bg-slate-900 text-white"
    : isBuilding
      ? "bg-sky-50 text-sky-800 hover:bg-sky-100"
      : "text-slate-700 hover:bg-slate-100";
  return (
    <button type="button" onClick={() => onSelect(s)} className={`${base} ${tone}`}>
      <span className="flex min-w-0 items-center gap-2">
        {isBuilding && <Building2 className="h-4 w-4 shrink-0" />}
        <span className="truncate">{s}</span>
      </span>
      {done && (
        <span
          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
            active ? "bg-white" : "bg-green-500"
          }`}
        >
          <Check className={`h-3 w-3 ${active ? "text-green-600" : "text-white"}`} strokeWidth={3} />
        </span>
      )}
    </button>
  );
}

function List(props: Props) {
  return (
    <nav className="flex flex-col gap-0.5">
      {props.sections.map((s) => (
        <Item
          key={s}
          s={s}
          active={s === props.active}
          done={props.completed.has(s)}
          isBuilding={props.buildings.has(s)}
          onSelect={props.onSelect}
        />
      ))}
    </nav>
  );
}

export default function SurveySidebar(props: Props) {
  const [open, setOpen] = useState(false);
  const done = props.completed.size;
  const total = props.sections.length;

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:block md:w-60 md:shrink-0">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-1">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Sections · {done}/{total}
          </p>
          <List {...props} />
        </div>
      </aside>

      {/* Mobile */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mb-4 flex w-full items-center justify-between rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <span className="flex items-center gap-2 font-medium text-slate-800">
            <Menu className="h-4 w-4" /> {props.active}
          </span>
          <span className="text-xs text-slate-500">{done}/{total} done</span>
        </button>
        {open && (
          <div className="fixed inset-0 z-40 flex">
            <div className="w-72 max-w-[80%] animate-[drawer-in-left_0.2s_ease-out] overflow-y-auto bg-white p-4 shadow-xl">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold">Sections · {done}/{total}</span>
                <button type="button" onClick={() => setOpen(false)} className="text-slate-500">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <List {...props} onSelect={(s) => { props.onSelect(s); setOpen(false); }} />
            </div>
            <div className="flex-1 bg-black/30" onClick={() => setOpen(false)} />
          </div>
        )}
      </div>
    </>
  );
}
