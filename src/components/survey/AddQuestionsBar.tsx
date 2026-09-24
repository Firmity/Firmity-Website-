"use client";
// v2: per-area question authoring for the surveyor. "Add from bank" opens a
// picker of recommended questions (filtered by this survey's facility type +
// the active domain), multi-select and add. "Add custom" adds a one-off question
// that lives only on this survey. Both write to survey_questions via the hook.

import { useCallback, useEffect, useState } from "react";
import { Check, Loader2, Plus, Trash2, X } from "lucide-react";
import { getQuestions, type ChecklistItem, type CustomQuestionBody, type Question } from "@/src/lib/survey-api";
import { uuid } from "@/src/lib/uuid";

const norm = (t: string) => t.trim().toLowerCase().replace(/\s+/g, " ");

const CUSTOM_TYPES: { value: CustomQuestionBody["answer_type"]; label: string }[] = [
  { value: "rating", label: "Rating (Good / Satisfactory / Unsatisfactory)" },
  { value: "yes_no", label: "Yes / No" },
  { value: "choice", label: "Choice (Yes / No / N/A)" },
  { value: "number", label: "Number" },
  { value: "text", label: "Free text" },
  { value: "remarks", label: "Remarks only" },
  { value: "checklist", label: "Checklist (sub-questions)" },
];

// Sub-questions reuse the simple types (no nested checklists).
const SUB_TYPES: { value: ChecklistItem["answer_type"]; label: string }[] = [
  { value: "yes_no", label: "Yes / No" }, { value: "rating", label: "Rating" },
  { value: "number", label: "Number" }, { value: "text", label: "Free text" },
];

// Compact "which answer is compliant" toggle for a yes/no question or sub-question.
function GoodToggle({ value, onChange }: { value?: string | null; onChange: (v: string) => void }) {
  const cur = value === "no" ? "no" : "yes";
  return (
    <span className="inline-flex items-center gap-1" title="Which answer passes (is compliant)?">
      <span className="text-[10px] uppercase text-slate-400">OK</span>
      {(["yes", "no"] as const).map((v) => (
        <button key={v} type="button" onClick={() => onChange(v)}
          className={`rounded px-1.5 py-0.5 text-xs font-medium ${cur === v ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
          {v === "yes" ? "Yes" : "No"}
        </button>
      ))}
    </span>
  );
}

interface Props {
  domain: string;
  domainLabel: string;
  facilityType: string;
  areaId: string | null;                 // null => facility-level section
  addedTexts: Set<string>;               // normalized texts already present here (hide them)
  onAddFromBank: (areaId: string | null, questionIds: string[]) => Promise<void>;
  onAddCustom: (body: CustomQuestionBody) => Promise<void>;
  onAdded?: () => void;   // fired after a successful add (e.g. to close a sheet)
}

export default function AddQuestionsBar({
  domain, domainLabel, facilityType, areaId, addedTexts, onAddFromBank, onAddCustom, onAdded,
}: Props) {
  const [mode, setMode] = useState<null | "bank" | "custom">(null);
  const [busy, setBusy] = useState(false);

  return (
    <div className="mb-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-2">
      {mode === null && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-1 text-xs text-slate-500">Add to {domainLabel}:</span>
          <button type="button" onClick={() => setMode("bank")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100">
            <Plus className="h-3.5 w-3.5" /> Add from bank
          </button>
          <button type="button" onClick={() => setMode("custom")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100">
            <Plus className="h-3.5 w-3.5" /> Add custom question
          </button>
        </div>
      )}

      {mode === "bank" && (
        <BankPicker
          domain={domain} domainLabel={domainLabel} facilityType={facilityType}
          addedTexts={addedTexts} busy={busy}
          onCancel={() => setMode(null)}
          onAdd={async (ids) => {
            setBusy(true);
            try { await onAddFromBank(areaId, ids); setMode(null); onAdded?.(); }
            finally { setBusy(false); }
          }}
        />
      )}

      {mode === "custom" && (
        <CustomForm
          domainLabel={domainLabel} busy={busy}
          onCancel={() => setMode(null)}
          onAdd={async (draft) => {
            setBusy(true);
            try {
              await onAddCustom({
                area_id: areaId, domain_slug: domain, needs_photo: false,
                text: draft.text, answer_type: draft.answer_type,
                good_answer: draft.good_answer ?? null, checklist: draft.checklist ?? [],
              });
              setMode(null);
              onAdded?.();
            } finally { setBusy(false); }
          }}
        />
      )}
    </div>
  );
}

function BankPicker({
  domain, domainLabel, facilityType, addedTexts, busy, onCancel, onAdd,
}: {
  domain: string; domainLabel: string; facilityType: string;
  addedTexts: Set<string>; busy: boolean;
  onCancel: () => void; onAdd: (ids: string[]) => Promise<void>;
}) {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Question[]>([]);
  const [sel, setSel] = useState<Set<string>>(new Set());
  const [err, setErr] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Fetch depends ONLY on domain/facilityType — never on addedTexts (a fresh Set
  // each parent render), which would otherwise refetch on every re-render.
  const load = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      setRows(await getQuestions(domain, facilityType));
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [domain, facilityType]);
  useEffect(() => { load(); }, [load]);

  // Hide already-added (by text) + apply the search filter, at render time.
  const q = search.trim().toLowerCase();
  const visible = rows.filter((r) => !addedTexts.has(norm(r.text)) && (!q || r.text.toLowerCase().includes(q)));

  const toggle = (id: string) =>
    setSel((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-600">Recommended {domainLabel} questions</span>
        <button type="button" onClick={onCancel} className="rounded p-1 text-slate-400 hover:bg-slate-200"><X className="h-4 w-4" /></button>
      </div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search questions…"
        className="mb-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
      />
      {loading ? (
        <div className="flex justify-center py-6 text-slate-400"><Loader2 className="h-5 w-5 animate-spin" /></div>
      ) : err ? (
        <p className="px-1 py-2 text-xs text-red-600">{err}</p>
      ) : visible.length === 0 ? (
        <p className="px-1 py-2 text-xs text-slate-500">No more bank questions for this domain and facility type.</p>
      ) : (
        <div className="max-h-64 overflow-y-auto rounded-lg border border-slate-200 bg-white">
          {visible.map((q) => {
            const on = sel.has(q.id);
            return (
              <button key={q.id} type="button" onClick={() => toggle(q.id)}
                className={`flex w-full items-start gap-2 border-b border-slate-100 px-3 py-2 text-left text-sm last:border-0 ${on ? "bg-sky-50" : "hover:bg-slate-50"}`}>
                <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${on ? "border-sky-600 bg-sky-600" : "border-slate-300"}`}>
                  {on && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                </span>
                <span className="min-w-0 flex-1">
                  {q.section && <span className="mr-1 rounded bg-slate-100 px-1 text-[10px] uppercase tracking-wide text-slate-500">{q.section}</span>}
                  {q.text}
                </span>
              </button>
            );
          })}
        </div>
      )}
      <div className="mt-2 flex items-center justify-end gap-2">
        <button type="button" onClick={onCancel} className="rounded-lg px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200">Cancel</button>
        <button type="button" disabled={busy || sel.size === 0} onClick={() => onAdd([...sel])}
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50">
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
          Add {sel.size > 0 ? `(${sel.size})` : ""}
        </button>
      </div>
    </div>
  );
}

export interface CustomDraft {
  text: string;
  answer_type: CustomQuestionBody["answer_type"];
  good_answer?: string | null;
  checklist?: ChecklistItem[];
}

function CustomForm({
  domainLabel, busy, onCancel, onAdd,
}: {
  domainLabel: string; busy: boolean;
  onCancel: () => void; onAdd: (draft: CustomDraft) => Promise<void>;
}) {
  const [text, setText] = useState("");
  const [type, setType] = useState<CustomQuestionBody["answer_type"]>("rating");
  const [good, setGood] = useState<string>("yes");
  const [subs, setSubs] = useState<ChecklistItem[]>([]);

  const isChecklist = type === "checklist";
  const addSub = () => setSubs((s) => [...s, { id: uuid(), text: "", answer_type: "yes_no", good_answer: "yes" }]);
  const updSub = (id: string, patch: Partial<ChecklistItem>) =>
    setSubs((s) => s.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const rmSub = (id: string) => setSubs((s) => s.filter((x) => x.id !== id));

  const canAdd = !!text.trim() && (!isChecklist || subs.some((s) => s.text.trim()));

  const submit = () => {
    const draft: CustomDraft = { text: text.trim(), answer_type: type };
    if (type === "yes_no") draft.good_answer = good;
    if (isChecklist) {
      draft.checklist = subs
        .filter((s) => s.text.trim())
        .map((s) => ({
          id: s.id, text: s.text.trim(), answer_type: s.answer_type,
          good_answer: s.answer_type === "yes_no" ? (s.good_answer ?? "yes") : null,
        }));
    }
    return onAdd(draft);
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-600">Custom {domainLabel} question</span>
        <button type="button" onClick={onCancel} className="rounded p-1 text-slate-400 hover:bg-slate-200"><X className="h-4 w-4" /></button>
      </div>
      <input
        value={text} onChange={(e) => setText(e.target.value)} autoFocus
        placeholder={isChecklist ? "Checklist title (e.g. Pool cleaning)" : "Question text"}
        className="mb-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
      />

      {isChecklist && (
        <div className="mb-2 rounded-lg border border-slate-200 bg-white p-2">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Sub-questions</span>
            <button type="button" onClick={addSub} className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-100">
              <Plus className="h-3 w-3" /> Add sub-question
            </button>
          </div>
          {subs.length === 0 && <p className="text-[11px] text-slate-400">No sub-questions yet.</p>}
          <div className="flex flex-col gap-1.5">
            {subs.map((s, i) => (
              <div key={s.id} className="flex items-center gap-1.5">
                <span className="w-4 shrink-0 text-[11px] text-slate-400">{i + 1}.</span>
                <input value={s.text} onChange={(e) => updSub(s.id, { text: e.target.value })}
                  placeholder="Sub-question" className="min-w-0 flex-1 rounded-lg border border-slate-300 px-2 py-1 text-xs" />
                <select value={s.answer_type} onChange={(e) => updSub(s.id, { answer_type: e.target.value as ChecklistItem["answer_type"] })}
                  className="shrink-0 rounded-lg border border-slate-300 px-1.5 py-1 text-xs">
                  {SUB_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
                {s.answer_type === "yes_no" && <GoodToggle value={s.good_answer} onChange={(v) => updSub(s.id, { good_answer: v })} />}
                <button type="button" onClick={() => rmSub(s.id)} aria-label="Remove" className="shrink-0 rounded border border-red-200 p-1 text-red-500 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-end gap-2">
        {type === "yes_no" && <GoodToggle value={good} onChange={setGood} />}
        <select value={type} onChange={(e) => setType(e.target.value as CustomQuestionBody["answer_type"])}
          className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs">
          {CUSTOM_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        <button type="button" disabled={busy || !canAdd} onClick={submit}
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50">
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />} Add
        </button>
      </div>
    </div>
  );
}
