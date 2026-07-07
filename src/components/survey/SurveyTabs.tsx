"use client";
// Renders ONE area's content. activeArea + activeDomain are controlled by the page
// (so the page can drive completion/auto-advance). Completed domain tabs go green.

import { type ReactNode } from "react";
import { Ban, Check } from "lucide-react";
import DomainGroup from "./DomainGroup";
import type { Domain, Question } from "@/src/lib/survey-api";

interface AnswerState {
  value: string;
  remark: string;
}

interface Props {
  activeArea: string;
  activeDomain: string;
  onDomainChange: (d: string) => void;
  domainsByArea: Record<string, string[]>;
  questionsByDomain: Record<string, Question[]>;
  domainMeta: Record<string, Domain>;
  answers: Record<string, AnswerState>;
  photos: Record<string, string[]>;
  completedDomains: Record<string, boolean>;   // green tab when true
  keyFor: (area: string, qid: string) => string;
  onField: (area: string, questionId: string, field: "value" | "remark", val: string) => void;
  onPhoto: (area: string, questionId: string, file: File) => void;
  staffArea?: string;
  staffNode?: ReactNode;
  naKeys: Set<string>;                                   // '<area>||<domain>' marked not-applicable
  onToggleNa: (area: string, domain: string, next: boolean) => void;
}

function Tab({ active, done, label, onClick }: { active: boolean; done: boolean; label: string; onClick: () => void }) {
  const tone = active
    ? "bg-slate-900 text-white"
    : done
      ? "bg-green-100 text-green-700"
      : "bg-slate-100 text-slate-600 hover:bg-slate-200";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition ${tone}`}
    >
      {done && !active && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
      {label}
    </button>
  );
}

export default function SurveyTabs(props: Props) {
  const {
    activeArea, activeDomain, onDomainChange, domainsByArea, questionsByDomain,
    domainMeta, answers, photos, completedDomains, keyFor, onField, onPhoto, staffArea, staffNode,
    naKeys, onToggleNa,
  } = props;

  const domains = domainsByArea[activeArea] ?? [];
  const label = (slug: string) =>
    slug === "general" ? "Site Details" : domainMeta[slug]?.name ?? slug;

  const isStaff = !!staffArea && activeArea === staffArea;
  const naKey = `${activeArea}||${activeDomain}`;
  const isNa = !!activeDomain && naKeys.has(naKey);

  return (
    <section>
      {domains.length > 1 && (
        <div className="mb-4 flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          {domains.map((d) => (
            <Tab
              key={d}
              active={d === activeDomain}
              done={!!completedDomains[d] || naKeys.has(`${activeArea}||${d}`)}
              label={label(d)}
              onClick={() => onDomainChange(d)}
            />
          ))}
        </div>
      )}

      {/* Not-applicable toggle: hides this section from the AI + the generated report. */}
      {!isStaff && activeDomain && (
        <label className="mb-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={isNa}
            onChange={(e) => onToggleNa(activeArea, activeDomain, e.target.checked)}
            className="h-4 w-4 rounded border-slate-300"
          />
          <Ban className="h-4 w-4 text-slate-400" />
          This section does not apply to this building
        </label>
      )}

      {isStaff ? (
        staffNode
      ) : activeDomain ? (
        isNa ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
            Marked not applicable — these questions are disabled and won&apos;t appear in the report.
          </div>
        ) : (
          <DomainGroup
            area={activeArea}
            questions={questionsByDomain[activeDomain] ?? []}
            answers={answers}
            photos={photos}
            keyFor={keyFor}
            onField={onField}
            onPhoto={onPhoto}
          />
        )
      ) : null}
    </section>
  );
}
