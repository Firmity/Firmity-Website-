"use client";
// On-demand health snapshot for the surveyor: a live deterministic score plus
// the auto-generated corrective-action list. Fetches when opened so it always
// reflects the latest saved answers.

import { useEffect, useState } from "react";
import { AlertTriangle, Loader2, X } from "lucide-react";
import { getActions, getHealth, type CorrectiveAction, type Health } from "@/src/lib/survey-api";

function scoreColor(n: number | null): string {
  if (n === null) return "text-slate-400";
  if (n >= 85) return "text-green-600";
  if (n >= 70) return "text-lime-600";
  if (n >= 50) return "text-amber-600";
  return "text-red-600";
}

const SEV_STYLE: Record<string, string> = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
};

export default function HealthPanel({
  surveyId,
  domainLabel,
  onClose,
}: {
  surveyId: string;
  domainLabel: (slug: string) => string;
  onClose: () => void;
}) {
  const [health, setHealth] = useState<Health | null>(null);
  const [actions, setActions] = useState<CorrectiveAction[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    Promise.all([getHealth(surveyId), getActions(surveyId)])
      .then(([h, a]) => {
        if (!alive) return;
        setHealth(h);
        setActions(a.actions);
      })
      .catch((e) => alive && setErr((e as Error).message));
    return () => {
      alive = false;
    };
  }, [surveyId]);

  const loading = !health && !err;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="relative flex max-h-[85vh] w-full max-w-lg flex-col rounded-2xl bg-white p-6 shadow-xl">
        <button type="button" onClick={onClose} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600">
          <X className="h-5 w-5" />
        </button>
        <h2 className="mb-4 text-lg font-bold text-slate-900">Facility Health Snapshot</h2>

        {loading ? (
          <p className="flex items-center gap-2 py-6 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Scoring current answers…
          </p>
        ) : err ? (
          <p className="py-4 text-sm text-red-600">{err}</p>
        ) : (
          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="mb-5 flex items-end gap-2">
              <span className={`text-4xl font-bold ${scoreColor(health!.overall)}`}>
                {health!.overall ?? "—"}
              </span>
              <span className="pb-1 text-sm text-slate-500">
                /100 · {health!.grade} · {health!.graded} graded
              </span>
            </div>

            {health!.domains.length > 0 && (
              <div className="mb-5 space-y-1.5">
                {health!.domains.map((d) => (
                  <div key={d.domain} className="flex items-center gap-2">
                    <span className="w-40 shrink-0 truncate text-sm text-slate-600">{domainLabel(d.domain)}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${d.score >= 70 ? "bg-green-400" : d.score >= 50 ? "bg-amber-400" : "bg-red-400"}`}
                        style={{ width: `${d.score}%` }}
                      />
                    </div>
                    <span className="w-10 shrink-0 text-right text-xs text-slate-500">{d.score}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-800">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Corrective Actions ({actions?.length ?? 0})
            </div>
            {actions && actions.length > 0 ? (
              <ul className="space-y-2">
                {actions.map((a, i) => (
                  <li key={i} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <div className="mb-1 flex items-center gap-2">
                      <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${SEV_STYLE[a.severity] ?? ""}`}>
                        {a.severity}
                      </span>
                      <span className="text-xs text-slate-500">
                        {domainLabel(a.domain)} · {a.area}
                      </span>
                    </div>
                    <p className="text-sm text-slate-800">{a.question}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{a.action}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500">No corrective actions — nothing flagged as unsatisfactory.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
