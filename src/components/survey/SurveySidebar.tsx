"use client";
// Left sidebar: facility sections + the building/area TREE (arbitrary depth).
// Editing (when the survey is started): inline rename, modal-sheet add, and a
// delete confirmation that states concrete consequences. No browser popups.

import { useState } from "react";
import { Building2, Check, Menu, Pencil, Plus, Trash2, X } from "lucide-react";
import type { SectionNode } from "@/src/hooks/useSurveyAnswers";
import { areaDepthColor } from "@/src/lib/survey-api";
import ModalSheet from "@/src/components/ui/ModalSheet";

interface Props {
  sections: SectionNode[];
  active: string;
  completed: Set<string>;
  onSelect: (id: string) => void;
  canEdit?: boolean;
  onAddBuilding?: (name: string) => void | Promise<void>;
  onAddSubArea?: (parentId: string, name: string) => void | Promise<void>;
  onRename?: (id: string, name: string) => void | Promise<void>;
  onDelete?: (id: string) => void | Promise<void>;
  countsFor?: (areaId: string) => { areas: number; answered: number };
}

type Dialog =
  | { kind: "addBuilding" }
  | { kind: "addSub"; parentId: string; parentName: string }
  | { kind: "delete"; id: string; name: string }
  | null;

function Row({
  node, active, done, canEdit, editing, onSelect,
  onStartRename, onCommitRename, onCancelRename, onAddSub, onDelete,
}: {
  node: SectionNode;
  active: boolean;
  done: boolean;
  canEdit?: boolean;
  editing: boolean;
  onSelect: (id: string) => void;
  onStartRename: (id: string) => void;
  onCommitRename: (id: string, name: string) => void;
  onCancelRename: () => void;
  onAddSub: (id: string, name: string) => void;
  onDelete: (id: string, name: string) => void;
}) {
  const isBuilding = node.kind === "building";
  const isTreeNode = node.kind === "building" || node.kind === "area";
  const editable = canEdit && isTreeNode;
  const tone = active
    ? isBuilding ? "bg-sky-600 text-white" : "bg-slate-900 text-white"
    : isBuilding ? "bg-sky-50 text-sky-800 hover:bg-sky-100" : "text-slate-700 hover:bg-slate-100";
  // Tighter indent step (was 14) so deep nodes keep more room for their name.
  const pad = 10 + node.depth * 12;

  if (editing) {
    return (
      <div className="flex items-center gap-1 rounded-lg bg-slate-100 pr-1" style={{ paddingLeft: pad }}>
        <input
          autoFocus
          defaultValue={node.name}
          onKeyDown={(e) => {
            if (e.key === "Enter") onCommitRename(node.id, (e.target as HTMLInputElement).value);
            if (e.key === "Escape") onCancelRename();
          }}
          onBlur={(e) => onCommitRename(node.id, e.target.value)}
          className="my-1 min-w-0 flex-1 rounded-md border border-slate-300 px-2 py-1.5 text-sm"
        />
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={onCancelRename}
          aria-label="Cancel rename" className="rounded p-1.5 text-slate-400 hover:bg-slate-200">
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className={`group relative flex items-stretch gap-1 rounded-lg text-left text-sm transition ${tone}`}>
      <button
        type="button"
        onClick={() => onSelect(node.id)}
        className="flex min-w-0 flex-1 items-start gap-2 py-2.5 pr-1"
        style={{ paddingLeft: pad }}
      >
        {isBuilding && <Building2 className="mt-0.5 h-4 w-4 shrink-0" />}
        {/* Depth colour dot (navy=building, teal=floor, amber=room) — matches the PDF tree. */}
        {isTreeNode && (
          <span
            className={`mt-[5px] h-2 w-2 shrink-0 rounded-full ${active ? "ring-1 ring-white/70" : ""}`}
            style={{ backgroundColor: areaDepthColor(node.depth) }}
          />
        )}
        {/* Name wraps to two lines instead of truncating, so nested names stay readable. */}
        <span className="min-w-0 break-words leading-snug line-clamp-2">{node.name}</span>
        {done && (
          <span className={`mt-0.5 ml-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${active ? "bg-white" : "bg-green-500"}`}>
            <Check className={`h-3 w-3 ${active ? "text-green-600" : "text-white"}`} strokeWidth={3} />
          </span>
        )}
      </button>
      {editable && (
        // Actions: always shown on mobile (the drawer is full-width); on desktop they're
        // hidden until row-hover so they never steal width from the name in the narrow rail.
        <span className="flex shrink-0 items-center gap-0.5 self-center pr-1 md:hidden md:group-hover:flex">
          <button type="button" title="Add area inside" onClick={() => onAddSub(node.id, node.name)}
            className={`rounded p-1.5 ${active ? "hover:bg-white/20" : "hover:bg-black/10"}`}><Plus className="h-4 w-4" /></button>
          <button type="button" title="Rename" onClick={() => onStartRename(node.id)}
            className={`rounded p-1.5 ${active ? "hover:bg-white/20" : "hover:bg-black/10"}`}><Pencil className="h-4 w-4" /></button>
          <button type="button" title="Delete" onClick={() => onDelete(node.id, node.name)}
            className={`rounded p-1.5 ${active ? "hover:bg-white/20" : "hover:bg-red-100 hover:text-red-600"}`}><Trash2 className="h-4 w-4" /></button>
        </span>
      )}
    </div>
  );
}

export default function SurveySidebar(props: Props) {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState<Dialog>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const done = props.completed.size;
  const total = props.sections.length;
  const activeName = props.sections.find((s) => s.id === props.active)?.name ?? "";

  const closeDialog = () => { setDialog(null); setText(""); };
  const commitRename = (id: string, name: string) => {
    const n = name.trim();
    setEditingId(null);
    if (n) props.onRename?.(id, n);
  };

  const list = (onNavigate?: () => void) => (
    <nav className="flex flex-col gap-0.5">
      {props.sections.map((n) => (
        <Row
          key={n.id}
          node={n}
          active={n.id === props.active}
          done={props.completed.has(n.id)}
          canEdit={props.canEdit}
          editing={editingId === n.id}
          onSelect={(id) => { props.onSelect(id); onNavigate?.(); }}
          onStartRename={setEditingId}
          onCommitRename={commitRename}
          onCancelRename={() => setEditingId(null)}
          onAddSub={(parentId, parentName) => setDialog({ kind: "addSub", parentId, parentName })}
          onDelete={(id, name) => setDialog({ kind: "delete", id, name })}
        />
      ))}
    </nav>
  );

  const addBtn = props.canEdit && props.onAddBuilding && (
    <button type="button" onClick={() => setDialog({ kind: "addBuilding" })}
      className="mt-1 flex w-full items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-2.5 text-xs font-medium text-slate-500 hover:border-sky-400 hover:text-sky-600">
      <Plus className="h-3.5 w-3.5" /> Add building
    </button>
  );

  const counts = dialog?.kind === "delete" ? props.countsFor?.(dialog.id) : undefined;

  return (
    <>
      <aside className="hidden md:block md:w-64 md:shrink-0 lg:w-72">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-1">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Sections · {done}/{total}</p>
          {list()}
          {addBtn}
        </div>
      </aside>

      <div className="md:hidden">
        {/* Prominent current-location bar (tap to open the full tree) */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mb-4 flex w-full items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
        >
          <span className="flex min-w-0 items-center gap-2.5 font-semibold text-slate-800">
            <Menu className="h-4 w-4 shrink-0 text-slate-400" />
            <span className="truncate">{activeName || "Sections"}</span>
          </span>
          <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">{done}/{total}</span>
        </button>

        {/* Full-screen tree drawer */}
        {open && (
          <div className="fixed inset-0 z-50 flex flex-col bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3.5">
              <span className="text-base font-semibold text-slate-900">Survey sections</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {list(() => setOpen(false))}
              {addBtn}
            </div>
          </div>
        )}
      </div>

      {/* Add building / add sub-area */}
      <ModalSheet
        open={dialog?.kind === "addBuilding" || dialog?.kind === "addSub"}
        title={dialog?.kind === "addSub" ? `Add area inside "${dialog.parentName}"` : "Add building"}
        onClose={closeDialog}
        footer={
          <>
            <button type="button" onClick={closeDialog} className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Cancel</button>
            <button type="button" disabled={!text.trim()}
              onClick={() => {
                const n = text.trim();
                if (!n) return;
                if (dialog?.kind === "addSub") props.onAddSubArea?.(dialog.parentId, n);
                else props.onAddBuilding?.(n);
                closeDialog();
              }}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50">Add</button>
          </>
        }
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && text.trim()) { const n = text.trim(); if (dialog?.kind === "addSub") props.onAddSubArea?.(dialog.parentId, n); else props.onAddBuilding?.(n); closeDialog(); } }}
          placeholder={dialog?.kind === "addSub" ? "e.g. Cabin 1, Cafeteria, Bathroom" : "e.g. Main Building, Warehouse"}
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
        />
      </ModalSheet>

      {/* Delete confirmation with concrete consequences */}
      <ModalSheet
        open={dialog?.kind === "delete"}
        title={dialog?.kind === "delete" ? `Delete "${dialog.name}"?` : ""}
        onClose={closeDialog}
        footer={
          <>
            <button type="button" onClick={closeDialog} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">Keep it</button>
            <button type="button"
              onClick={() => { if (dialog?.kind === "delete") props.onDelete?.(dialog.id); closeDialog(); }}
              className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50">Delete</button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          This permanently deletes {counts && counts.areas > 0 ? <><strong>{counts.areas}</strong> area(s) inside it and </> : null}
          {counts ? <><strong>{counts.answered}</strong> answered question(s)</> : "everything inside it"}. This cannot be undone.
        </p>
      </ModalSheet>
    </>
  );
}
