"use client";
// Floating "+" (bottom-right, desktop + mobile). Taps animate open a sheet to add
// a custom question or pick from the bank — always scoped to the CURRENT node +
// active scope. Renders nothing until there's a place to add to.

import { useState } from "react";
import { Plus } from "lucide-react";
import ModalSheet from "@/src/components/ui/ModalSheet";
import AddQuestionsBar from "./AddQuestionsBar";
import type { CustomQuestionBody, Domain } from "@/src/lib/survey-api";

interface Props {
  domain: string;                 // active scope pill
  domainMeta: Record<string, Domain>;
  facilityType: string;
  areaId: string | null;          // current node (null = facility-level)
  addedTexts: Set<string>;
  onAddFromBank: (areaId: string | null, questionIds: string[]) => Promise<void>;
  onAddCustom: (body: CustomQuestionBody) => Promise<void>;
}

export default function AddQuestionFab({
  domain, domainMeta, facilityType, areaId, addedTexts, onAddFromBank, onAddCustom,
}: Props) {
  const [open, setOpen] = useState(false);
  if (!domain) return null;
  const label = domainMeta[domain]?.name ?? domain;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Add a question"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg
                   transition-transform duration-150 hover:scale-105 active:scale-95
                   pb-[env(safe-area-inset-bottom)]"
      >
        <Plus className="h-6 w-6" />
      </button>

      <ModalSheet open={open} title={`Add to ${label}`} onClose={() => setOpen(false)}>
        <AddQuestionsBar
          domain={domain}
          domainLabel={label}
          facilityType={facilityType}
          areaId={areaId}
          addedTexts={addedTexts}
          onAddFromBank={onAddFromBank}
          onAddCustom={onAddCustom}
          onAdded={() => setOpen(false)}
        />
      </ModalSheet>
    </>
  );
}
