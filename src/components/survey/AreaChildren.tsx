"use client";
// Container view for a tree node that holds sub-areas (a Building holds Floors, a
// Floor holds Rooms). Shows the children as cards + an "Add <child>" card, so the
// surveyor navigates structure here and only answers questions on leaf nodes —
// no more "does not apply" clicks on container levels.

import { useState } from "react";
import { Building2, Check, ChevronRight, DoorOpen, Layers, Plus } from "lucide-react";
import type { SectionNode } from "@/src/hooks/useSurveyAnswers";
import { areaDepthColor } from "@/src/lib/survey-api";
import ModalSheet from "@/src/components/ui/ModalSheet";

interface Props {
  node: SectionNode;
  children: SectionNode[];
  completed: Set<string>;
  childLabel: string;                 // "floor" | "room" | "area"
  canEdit?: boolean;
  compact?: boolean;                  // leaf node: render only the "Add <child>" button
  onNoRooms?: () => void;             // floor: "this floor has no rooms" -> answer directly
  onOpen: (id: string) => void;
  onAddChild: (parentId: string, name: string) => void;
}

// Icon per child depth: floors get Layers, rooms get a door, else a building.
function childIcon(depth: number) {
  if (depth === 1) return Layers;
  if (depth >= 2) return DoorOpen;
  return Building2;
}

export default function AreaChildren({ node, children, completed, childLabel, canEdit, compact, onNoRooms, onOpen, onAddChild }: Props) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const Icon = childIcon(node.depth + 1);
  const cap = childLabel.charAt(0).toUpperCase() + childLabel.slice(1);

  const submit = () => {
    const n = text.trim();
    if (!n) return;
    onAddChild(node.id, n);
    setText("");
    setOpen(false);
  };

  const addDialog = (
    <ModalSheet
      open={open}
      title={`Add ${childLabel} inside "${node.name}"`}
      onClose={() => { setOpen(false); setText(""); }}
      footer={
        <>
          <button type="button" onClick={() => { setOpen(false); setText(""); }} className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Cancel</button>
          <button type="button" disabled={!text.trim()} onClick={submit} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50">Add {cap}</button>
        </>
      }
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
        placeholder={childLabel === "floor" ? "e.g. Ground Floor, Basement, 1st Floor" : childLabel === "room" ? "e.g. Common Area, Cabin 1, Cafeteria, Bathroom" : "Area name"}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
      />
    </ModalSheet>
  );

  // Leaf node: just an "Add <child>" affordance above its questions.
  if (compact) {
    return (
      <div className="mb-4">
        {canEdit && (
          <button type="button" onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs font-medium text-slate-500 hover:border-sky-400 hover:text-sky-600">
            <Plus className="h-3.5 w-3.5" /> Add {childLabel} (if this {node.depth === 0 ? "building" : "space"} has sub-areas)
          </button>
        )}
        {addDialog}
      </div>
    );
  }

  return (
    <div>
      <p className="mb-3 text-sm text-slate-500">
        {children.length === 0
          ? `No ${childLabel}s yet. Add the ${childLabel}s inside ${node.name}.`
          : `Open a ${childLabel} to survey it, or add another.`}
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {children.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onOpen(c.id)}
            className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-sky-300 hover:shadow-md"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              {/* Icon tile colour-coded by depth (navy=building, teal=floor, amber=room) — matches the PDF tree. */}
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white"
                style={{ backgroundColor: areaDepthColor(c.depth) }}
              >
                <Icon className="h-4.5 w-4.5" />
              </span>
              <span className="line-clamp-2 break-words text-sm font-medium leading-snug text-slate-800">{c.name}</span>
            </span>
            <span className="flex shrink-0 items-center gap-1">
              {completed.has(c.id) && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </span>
              )}
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </span>
          </button>
        ))}

        {canEdit && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex min-h-[68px] items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 p-4 text-sm font-medium text-slate-500 transition hover:border-sky-400 hover:text-sky-600"
          >
            <Plus className="h-4 w-4" /> Add {childLabel}
          </button>
        )}
      </div>

      {onNoRooms && children.length === 0 && canEdit && (
        <div className="mt-4 border-t border-slate-100 pt-4 text-center">
          <button
            type="button"
            onClick={onNoRooms}
            className="text-sm font-medium text-sky-600 hover:text-sky-700 hover:underline"
          >
            This {node.depth === 1 ? "floor" : "space"} has no {childLabel}s — survey it directly →
          </button>
        </div>
      )}

      {addDialog}
    </div>
  );
}
