"use client";
// Renders one domain's questions for a specific area, sub-grouped by section.

import { memo, useMemo } from "react";
import QuestionCard from "./QuestionCard";
import type { Question } from "@/src/lib/survey-api";

interface AnswerState {
  value: string;
  remark: string;
}

interface Props {
  area: string;
  questions: Question[];
  answers: Record<string, AnswerState>;
  photos: Record<string, string[]>;
  keyFor: (area: string, qid: string) => string;
  onField: (area: string, questionId: string, field: "value" | "remark", val: string) => void;
  onPhoto: (area: string, questionId: string, file: File, subId?: string) => void;
}

function DomainGroup({ area, questions, answers, photos, keyFor, onField, onPhoto }: Props) {
  const sections = useMemo(() => {
    const map = new Map<string, Question[]>();
    for (const q of questions) {
      const k = q.section || "General";
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(q);
    }
    return [...map.entries()];
  }, [questions]);

  if (!questions?.length) return <p className="text-sm text-slate-500">No questions in this domain.</p>;

  return (
    <div>
      {sections.map(([section, qs]) => (
        <div key={section} className="mb-4">
          {section !== "General" && (
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{section}</h3>
          )}
          <div className="flex flex-col gap-3">
            {qs.map((q) => {
              const k = keyFor(area, q.id);
              return (
                <QuestionCard
                  key={k}
                  question={q}
                  area={area}
                  answer={answers[k]}
                  photos={photos}
                  photoBaseKey={k}
                  onField={onField}
                  onPhoto={onPhoto}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(DomainGroup);
