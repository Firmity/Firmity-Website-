"use client";
// Shown when a building/area has NO questions yet: pick a category, then add
// questions from the bank or a custom one. Gives empty sections (new or old
// surveys) a first-question entry point that the per-domain bar can't.

import { useState } from "react";
import AddQuestionsBar from "./AddQuestionsBar";
import type { CustomQuestionBody, Domain } from "@/src/lib/survey-api";

// Facility-level domains live in their own sections, not inside a building.
const FACILITY_ONLY = new Set(["general", "client_pain_areas", "urest_suggestion"]);

interface Props {
  domainMeta: Record<string, Domain>;
  facilityType: string;
  areaId: string | null;
  onAddFromBank: (areaId: string | null, questionIds: string[]) => Promise<void>;
  onAddCustom: (body: CustomQuestionBody) => Promise<void>;
}

export default function EmptySectionAdd({ domainMeta, facilityType, areaId, onAddFromBank, onAddCustom }: Props) {
  const options = Object.values(domainMeta)
    .filter((d) => !FACILITY_ONLY.has(d.slug) && d.is_active !== false)
    .sort((a, b) => (a.sort_order ?? 999) - (b.sort_order ?? 999));
  const [domain, setDomain] = useState("");

  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
      <p className="mb-3 text-sm text-slate-500">No questions here yet. Pick a category to add questions to this section.</p>
      <select
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        className="mb-3 w-full max-w-xs rounded-lg border border-slate-300 px-3 py-2 text-sm"
      >
        <option value="">Choose a category…</option>
        {options.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}
      </select>

      {domain && (
        <AddQuestionsBar
          domain={domain}
          domainLabel={domainMeta[domain]?.name ?? domain}
          facilityType={facilityType}
          areaId={areaId}
          addedTexts={new Set()}
          onAddFromBank={onAddFromBank}
          onAddCustom={onAddCustom}
        />
      )}
    </div>
  );
}
