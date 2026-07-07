"use client";
// Staff Profile: manager-entered deployment grids (Estate / HK / Technical / Security).
// Stored on the survey as `deployment_plan`. Number cells auto-sum row + grand totals.
//
// plan shape: { [gridKey]: { [rowName]: { [col]: number, remark?: string } } }

import { useCallback, useEffect, useRef, useState } from "react";
import { HelpCircle } from "lucide-react";
import { saveDeployment } from "@/src/lib/survey-api";

const SAVE_MS = 1200;

const CODE_HELP: { code: string; meaning: string }[] = [
  { code: "A / B / C", meaning: "The three rotating 8-hour shifts (A ≈ morning, B ≈ afternoon, C ≈ night)" },
  { code: "G", meaning: "General shift (~9–6), for office/admin roles like managers and accountants" },
  { code: "R / Rel", meaning: "Reliever — relief staff covering weekly-offs and leave" },
  { code: "Sup", meaning: "Supervisor" },
  { code: "HB", meaning: "House Boy (housekeeping helper)" },
  { code: "HK Operative", meaning: "Housekeeping Operative / cleaner" },
  { code: "Day-Sup / Night-Sup", meaning: "Day or Night shift Supervisor (Security)" },
  { code: "Day-LG", meaning: "Day shift Lady Guard (Security)" },
  { code: "Day-G / Night-G", meaning: "Day or Night shift Guard (Security)" },
];

interface Grid {
  key: string;
  title: string;
  cols: string[];
  rows: string[];
}

// Rows/columns from the Skytech deployment plan. Editable here later.
const GRIDS: Grid[] = [
  {
    key: "estate",
    title: "Estate Management Team",
    cols: ["A", "B", "C", "G", "R"],
    rows: ["Estate Manager", "Facility Manager", "Accountant", "Accountant Executive", "Help Desk"],
  },
  {
    key: "housekeeping",
    title: "Housekeeping Deployment",
    cols: ["Sup", "HB", "HK Operative", "Rel"],
    rows: ["Supervision", "Towers (G+14)", "Towers (G+16)", "Machine Operator", "Courtyard/Road", "Basement", "Commercial", "Reliever"],
  },
  {
    key: "technical",
    title: "Technical Manpower",
    cols: ["A", "B", "G", "R"],
    rows: ["Supervisor", "Electrician", "Plumber", "Asst. Technician", "Fire Technician", "Lift Technician", "Carpenter", "Painter"],
  },
  {
    key: "security",
    title: "Security Deployment",
    cols: ["Day-Sup", "Day-LG", "Day-G", "Night-Sup", "Night-G"],
    rows: ["Main Gate (IN)", "Gate No 2", "Club", "Tower Lobbies", "Patrolling", "Basement"],
  },
];

type Cell = Record<string, number | string>;
type Plan = Record<string, Record<string, Cell>>;

function rowTotal(cell: Cell | undefined, cols: string[]): number {
  if (!cell) return 0;
  return cols.reduce((n, c) => n + (Number(cell[c]) || 0), 0);
}

export default function StaffProfile({
  surveyId,
  initial,
}: {
  surveyId: string;
  initial?: Record<string, unknown>;
}) {
  const [plan, setPlan] = useState<Plan>((initial as Plan) || {});
  const [saving, setSaving] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleSave = useCallback(
    (next: Plan) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(async () => {
        setSaving(true);
        try {
          await saveDeployment(surveyId, next);
        } catch {
          /* surfaced on next save attempt */
        } finally {
          setSaving(false);
        }
      }, SAVE_MS);
    },
    [surveyId]
  );

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const setCell = useCallback(
    (gridKey: string, row: string, col: string, raw: string) => {
      setPlan((prev) => {
        const grid = { ...(prev[gridKey] || {}) };
        const cell = { ...(grid[row] || {}) };
        if (col === "remark") cell.remark = raw;
        else cell[col] = raw === "" ? 0 : Number(raw);
        grid[row] = cell;
        const next = { ...prev, [gridKey]: grid };
        scheduleSave(next);
        return next;
      });
    },
    [scheduleSave]
  );

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
        const grand = g.rows.reduce((n, r) => n + rowTotal(gridData[r], g.cols), 0);
        return (
          <div key={g.key}>
            <h3 className="mb-2 text-sm font-semibold text-slate-900">{g.title}</h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 text-xs text-slate-500">
                    <th className="px-3 py-2 text-left font-semibold">Role / Location</th>
                    {g.cols.map((c) => (
                      <th key={c} className="px-2 py-2 text-center font-semibold">{c}</th>
                    ))}
                    <th className="px-2 py-2 text-center font-semibold">Total</th>
                    <th className="px-3 py-2 text-left font-semibold">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {g.rows.map((r) => {
                    const cell = gridData[r] || {};
                    return (
                      <tr key={r} className="border-t border-slate-100">
                        <td className="px-3 py-1.5 text-slate-800">{r}</td>
                        {g.cols.map((c) => (
                          <td key={c} className="px-1 py-1 text-center">
                            <input
                              type="number"
                              min={0}
                              value={(cell[c] as number) || ""}
                              onChange={(e) => setCell(g.key, r, c, e.target.value)}
                              className="w-12 rounded border border-slate-300 px-1 py-1 text-center text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                            />
                          </td>
                        ))}
                        <td className="px-2 py-1.5 text-center font-medium text-slate-700">
                          {rowTotal(cell, g.cols)}
                        </td>
                        <td className="px-1 py-1">
                          <input
                            type="text"
                            value={(cell.remark as string) || ""}
                            onChange={(e) => setCell(g.key, r, "remark", e.target.value)}
                            className="w-full min-w-[8rem] rounded border border-slate-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                          />
                        </td>
                      </tr>
                    );
                  })}
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
          </div>
        );
      })}
    </div>
  );
}
