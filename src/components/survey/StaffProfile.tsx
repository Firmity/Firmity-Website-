"use client";
// Staff Profile: manager-entered deployment grids (Estate / HK / Technical / Security).
// Stored on the survey as `deployment_plan`. Number cells auto-sum row + grand totals.
//
// plan shape: { [gridKey]: { __rows?: string[], [rowName]: { [colCode]: number, remark?, na? } } }
//
// Rows are NOT hardcoded per project. Each grid has generic base rows; zone/post grids
// (Housekeeping, Security) also auto-populate the facility's ACTUAL buildings. Surveyors
// can ADD and DELETE any row, and mark any row N/A. The explicit `__rows` list (a plain
// array the report backend skips) makes deletions of base/building rows stick.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HelpCircle, Plus, X } from "lucide-react";
import { saveDeployment } from "@/src/lib/survey-api";

const SAVE_MS = 1200;
const ROWS_KEY = "__rows"; // reserved metadata key inside a grid (array; backend ignores it)

const CODE_HELP: { code: string; meaning: string }[] = [
  { code: "Morning / Afternoon / Night (A / B / C)", meaning: "The three rotating 8-hour shifts." },
  { code: "General (G)", meaning: "General shift (~9–6), for office/admin roles like managers and accountants." },
  { code: "Reliever (R)", meaning: "Relief staff covering weekly-offs and leave." },
  { code: "N/A", meaning: "Mark a role/location that doesn't exist here — it's excluded from totals and the report." },
];

interface Col {
  code: string;   // stable data key
  label: string;  // descriptive header shown to the surveyor
}
interface Grid {
  key: string;
  title: string;
  cols: Col[];
  baseRows: string[];       // generic starter rows (deletable)
  useBuildings?: boolean;   // also seed the facility's actual buildings as rows
  addLabel: string;         // e.g. "Add zone" / "Add role" / "Add post"
}

const GRIDS: Grid[] = [
  {
    key: "estate",
    title: "Estate Management Team",
    addLabel: "Add role",
    cols: [
      { code: "A", label: "Morning (A)" },
      { code: "B", label: "Afternoon (B)" },
      { code: "C", label: "Night (C)" },
      { code: "G", label: "General (G)" },
      { code: "R", label: "Reliever (R)" },
    ],
    baseRows: ["Estate Manager", "Facility Manager", "Accountant", "Accountant Executive", "Help Desk"],
  },
  {
    key: "housekeeping",
    title: "Housekeeping Deployment",
    addLabel: "Add zone",
    useBuildings: true,
    cols: [
      { code: "Sup", label: "Supervisor" },
      { code: "HB", label: "House Boy (HB)" },
      { code: "HK Operative", label: "HK Operative" },
      { code: "R", label: "Reliever (R)" },
    ],
    baseRows: ["Supervision", "Machine Operator", "Common Areas", "Basement / Parking", "External / Landscape"],
  },
  {
    key: "technical",
    title: "Technical Manpower",
    addLabel: "Add role",
    cols: [
      { code: "A", label: "Morning (A)" },
      { code: "B", label: "Afternoon (B)" },
      { code: "G", label: "General (G)" },
      { code: "R", label: "Reliever (R)" },
    ],
    baseRows: ["Supervisor", "Electrician", "Plumber", "Asst. Technician", "Fire Technician", "Lift Technician", "Carpenter", "Painter"],
  },
  {
    key: "security",
    title: "Security Deployment",
    addLabel: "Add post",
    useBuildings: true,
    cols: [
      { code: "Day-Sup", label: "Day Supervisor" },
      { code: "Day-LG", label: "Day Lady Guard" },
      { code: "Day-G", label: "Day Guard" },
      { code: "Night-Sup", label: "Night Supervisor" },
      { code: "Night-G", label: "Night Guard" },
    ],
    baseRows: ["Main Gate", "Patrolling", "Basement / Parking"],
  },
];

const GRID_BY_KEY: Record<string, Grid> = Object.fromEntries(GRIDS.map((g) => [g.key, g]));

type Cell = Record<string, number | string | boolean>;
type GridData = Record<string, Cell | string[]>; // ROWS_KEY -> string[]; every other key -> Cell
type Plan = Record<string, GridData>;

function isNa(cell: Cell | undefined): boolean {
  return Boolean(cell?.na);
}
function rowTotal(cell: Cell | undefined, cols: Col[]): number {
  if (!cell || isNa(cell)) return 0;
  return cols.reduce((n, c) => n + (Number(cell[c.code]) || 0), 0);
}

/** The row list for a grid: explicit __rows if set, else base rows + buildings + any extra cells. */
function deriveRows(g: Grid, gd: GridData, buildings: string[]): string[] {
  const stored = gd[ROWS_KEY];
  if (Array.isArray(stored)) return stored;
  const seeded = [...g.baseRows, ...(g.useBuildings ? buildings : [])];
  const seededSet = new Set(seeded);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const n of seeded) {
    if (!seen.has(n)) { seen.add(n); out.push(n); }
  }
  for (const n of Object.keys(gd)) {
    if (n === ROWS_KEY || seededSet.has(n) || seen.has(n)) continue;
    seen.add(n);
    out.push(n);
  }
  return out;
}

export default function StaffProfile({
  surveyId,
  initial,
  buildings = [],
  onChange,
}: {
  surveyId: string;
  initial?: Record<string, unknown>;
  buildings?: string[]; // the facility's actual buildings/towers, for zone/post grids
  onChange?: (plan: Record<string, unknown>) => void; // keep parent in sync so re-mounts aren't stale
}) {
  const [plan, setPlan] = useState<Plan>((initial as Plan) || {});
  const [saving, setSaving] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [drafts, setDrafts] = useState<Record<string, string>>({}); // per-grid "add row" input
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef = useRef<Plan | null>(null);
  const onChangeRef = useRef(onChange);
  useEffect(() => { onChangeRef.current = onChange; }, [onChange]);

  // Immediately persist any pending edit. Called on debounce AND on unmount so a
  // recent number is never lost when the surveyor switches section.
  const flush = useCallback(async () => {
    if (timer.current) { clearTimeout(timer.current); timer.current = null; }
    const p = pendingRef.current;
    if (!p) return;
    pendingRef.current = null;
    setSaving(true);
    try {
      await saveDeployment(surveyId, p);
    } catch {
      /* retried on the next edit */
    } finally {
      setSaving(false);
    }
  }, [surveyId]);

  const flushRef = useRef(flush);
  useEffect(() => { flushRef.current = flush; }, [flush]);

  const scheduleSave = useCallback((next: Plan) => {
    pendingRef.current = next;
    onChangeRef.current?.(next); // parent holds the latest -> a re-mount restores it, not stale data
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => { flushRef.current(); }, SAVE_MS);
  }, []);

  // Flush on unmount (section switch / leaving) so the last edit is saved.
  useEffect(() => () => { flushRef.current(); }, []);

  const mutate = useCallback(
    (gridKey: string, row: string, apply: (cell: Cell) => void) => {
      setPlan((prev) => {
        const grid = { ...(prev[gridKey] || {}) };
        const cell = { ...((grid[row] as Cell) || {}) };
        apply(cell);
        grid[row] = cell;
        const next = { ...prev, [gridKey]: grid };
        scheduleSave(next);
        return next;
      });
    },
    [scheduleSave]
  );

  const setCell = useCallback(
    (gridKey: string, row: string, col: string, raw: string) =>
      mutate(gridKey, row, (cell) => {
        if (col === "remark") cell.remark = raw;
        else cell[col] = raw === "" ? 0 : Number(raw);
      }),
    [mutate]
  );

  const toggleNa = useCallback(
    (gridKey: string, row: string, na: boolean) => mutate(gridKey, row, (cell) => { cell.na = na; }),
    [mutate]
  );

  const addRow = useCallback(
    (gridKey: string, name: string) => {
      const nm = name.trim();
      if (!nm) return;
      setPlan((prev) => {
        const grid = { ...(prev[gridKey] || {}) };
        const cur = deriveRows(GRID_BY_KEY[gridKey], grid, buildings);
        if (cur.includes(nm)) return prev; // already present
        grid[ROWS_KEY] = [...cur, nm];
        if (!(nm in grid)) grid[nm] = {};
        const next = { ...prev, [gridKey]: grid };
        scheduleSave(next);
        return next;
      });
      setDrafts((d) => ({ ...d, [gridKey]: "" }));
    },
    [buildings, scheduleSave]
  );

  const removeRow = useCallback(
    (gridKey: string, name: string) => {
      setPlan((prev) => {
        const grid = { ...(prev[gridKey] || {}) };
        const cur = deriveRows(GRID_BY_KEY[gridKey], grid, buildings);
        grid[ROWS_KEY] = cur.filter((x) => x !== name);
        delete grid[name];
        const next = { ...prev, [gridKey]: grid };
        scheduleSave(next);
        return next;
      });
    },
    [buildings, scheduleSave]
  );

  const rowsByGrid = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const g of GRIDS) map[g.key] = deriveRows(g, plan[g.key] || {}, buildings);
    return map;
  }, [plan, buildings]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <p className="text-xs text-slate-500">
          Enter proposed staff counts per role and shift.{saving && " · saving…"}
        </p>
        <button
          type="button"
          onClick={() => setShowHelp((v) => !v)}
          aria-label="What do these codes mean?"
          className="text-slate-400 hover:text-slate-600"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      {showHelp && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="mb-2 text-sm font-semibold text-slate-800">Shift &amp; role codes</p>
          <dl className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {CODE_HELP.map((h) => (
              <div key={h.code} className="flex gap-2 text-sm">
                <dt className="shrink-0 font-semibold text-slate-700">{h.code}</dt>
                <dd className="text-slate-600">{h.meaning}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {GRIDS.map((g) => {
        const gridData = plan[g.key] || {};
        const rows = rowsByGrid[g.key] || [];
        const grand = rows.reduce((n, name) => n + rowTotal(gridData[name] as Cell, g.cols), 0);
        return (
          <div key={g.key}>
            <h3 className="mb-2 text-sm font-semibold text-slate-900">{g.title}</h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 text-xs text-slate-500">
                    <th className="px-3 py-2 text-left font-semibold">Role / Location</th>
                    {g.cols.map((c) => (
                      <th key={c.code} className="whitespace-nowrap px-2 py-2 text-center font-semibold">{c.label}</th>
                    ))}
                    <th className="px-2 py-2 text-center font-semibold">Total</th>
                    <th className="px-3 py-2 text-left font-semibold">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((name) => {
                    const cell = (gridData[name] as Cell) || {};
                    const na = isNa(cell);
                    return (
                      <tr key={name} className={`border-t border-slate-100 ${na ? "bg-slate-50/60" : ""}`}>
                        <td className="px-3 py-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className={na ? "text-slate-400 line-through" : "text-slate-800"}>{name}</span>
                            <div className="flex shrink-0 items-center gap-1">
                              <button
                                type="button"
                                onClick={() => toggleNa(g.key, name, !na)}
                                title={na ? "Mark applicable" : "Not applicable here"}
                                className={`rounded px-1.5 py-0.5 text-[10px] font-semibold transition ${
                                  na ? "bg-slate-700 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                }`}
                              >
                                N/A
                              </button>
                              <button
                                type="button"
                                onClick={() => removeRow(g.key, name)}
                                title="Delete this row"
                                className="rounded p-0.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </td>
                        {g.cols.map((c) => (
                          <td key={c.code} className="px-1 py-1 text-center">
                            <input
                              type="number"
                              min={0}
                              disabled={na}
                              value={na ? "" : (cell[c.code] as number) || ""}
                              onChange={(e) => setCell(g.key, name, c.code, e.target.value)}
                              className="w-14 rounded border border-slate-300 px-1 py-1 text-center text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 disabled:cursor-not-allowed disabled:bg-slate-100"
                            />
                          </td>
                        ))}
                        <td className="px-2 py-1.5 text-center font-medium text-slate-700">
                          {na ? "—" : rowTotal(cell, g.cols)}
                        </td>
                        <td className="px-1 py-1">
                          <input
                            type="text"
                            disabled={na}
                            value={(cell.remark as string) || ""}
                            onChange={(e) => setCell(g.key, name, "remark", e.target.value)}
                            className="w-full min-w-[8rem] rounded border border-slate-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 disabled:cursor-not-allowed disabled:bg-slate-100"
                          />
                        </td>
                      </tr>
                    );
                  })}
                  {rows.length === 0 && (
                    <tr className="border-t border-slate-100">
                      <td colSpan={g.cols.length + 3} className="px-3 py-3 text-center text-xs text-slate-400">
                        No rows — add one below.
                      </td>
                    </tr>
                  )}
                  <tr className="border-t border-slate-200 bg-slate-50">
                    <td className="px-3 py-1.5 text-xs font-semibold text-slate-500" colSpan={g.cols.length + 1}>
                      Grand Total
                    </td>
                    <td className="px-2 py-1.5 text-center font-bold text-slate-900">{grand}</td>
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Add a row */}
            <div className="mt-2 flex items-center gap-2">
              <input
                type="text"
                value={drafts[g.key] ?? ""}
                onChange={(e) => setDrafts((d) => ({ ...d, [g.key]: e.target.value }))}
                onKeyDown={(e) => { if (e.key === "Enter") addRow(g.key, drafts[g.key] ?? ""); }}
                placeholder={`${g.addLabel}…`}
                className="w-48 rounded-lg border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
              />
              <button
                type="button"
                onClick={() => addRow(g.key, drafts[g.key] ?? "")}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                <Plus className="h-4 w-4" /> {g.addLabel}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
