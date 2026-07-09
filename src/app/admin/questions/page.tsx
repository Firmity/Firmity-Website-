"use client";
// Admin question bank: category sidebar + add category, add/edit/move/delete
// questions (single + bulk), activate/deactivate, search. Custom dropdowns.

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, GripVertical, HelpCircle, Plus, Power, Trash2 } from "lucide-react";
import { getSupabaseBrowser } from "@/src/lib/supabase-browser";
import Dropdown from "@/src/components/ui/Dropdown";

interface Domain { slug: string; name: string; is_key: boolean; is_active: boolean; sort_order: number }
interface Q {
  id: string; domain_slug: string; section: string | null; text: string;
  answer_type: string; is_active: boolean; sort_order: number;
  checklist?: SubItem[];
}
const TYPES = ["choice", "rating", "text", "remarks", "number", "yes_no", "checklist"];
const TYPE_LABELS: Record<string, string> = {
  choice: "Choice (Yes / No / Numbered / N/A)", rating: "Rating (Good / Satisfactory / Unsatisfactory)",
  text: "Free text", remarks: "Remarks only", number: "Numbered", yes_no: "Yes / No",
  checklist: "Checklist (sub-questions)",
};
const typeOpts = TYPES.map((t) => ({ value: t, label: TYPE_LABELS[t] ?? t }));

// Sub-questions use the standard input set (no nested checklists).
const SUB_TYPES = ["yes_no", "rating", "number", "text"];
const SUB_TYPE_LABELS: Record<string, string> = {
  yes_no: "Yes / No", rating: "Rating", number: "Numbered", text: "Free text",
};
const subTypeOpts = SUB_TYPES.map((t) => ({ value: t, label: SUB_TYPE_LABELS[t] ?? t }));

interface SubItem { id: string; text: string; answer_type: string }

export default function AdminQuestions() {
  const sb = getSupabaseBrowser();
  const [domains, setDomains] = useState<Domain[]>([]);
  const [domain, setDomain] = useState("");
  const [qs, setQs] = useState<Q[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [addingQ, setAddingQ] = useState(false);
  const [draft, setDraft] = useState<{ text: string; section: string; answer_type: string; checklist: SubItem[] }>({ text: "", section: "", answer_type: "choice", checklist: [] });
  const [addingCat, setAddingCat] = useState(false);
  const [catDraft, setCatDraft] = useState({ name: "", isKey: true });
  const [rename, setRename] = useState("");
  const [search, setSearch] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  async function loadDomains(select?: string) {
    const { data } = await sb.from("domains").select("slug,name,is_key,is_active,sort_order").order("sort_order");
    const ds = (data as Domain[]) ?? [];
    setDomains(ds);
    const pick = select ?? domain ?? ds[0]?.slug ?? "";
    if (!select && domain && ds.some((d) => d.slug === domain)) return; // keep selection
    setDomain(pick);
    setRename(ds.find((d) => d.slug === pick)?.name ?? "");
  }
  useEffect(() => { loadDomains(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function loadQs(d: string) {
    const { data, error } = await sb
      .from("questions").select("id,domain_slug,section,text,answer_type,is_active,sort_order,checklist")
      .eq("domain_slug", d).order("sort_order"); // manual order (drag-and-drop) drives the admin list
    if (error) setErr(error.message);
    let rows = (data as Q[]) ?? [];

    // One-time cleanup: a section that exactly matches a CATEGORY name is always a
    // leftover from an old move (sections are sub-groups, never category names).
    // Clear it so the stale header disappears here and in the surveyor grouping.
    const catNames = new Set(domains.map((x) => x.name.trim().toLowerCase()));
    const staleIds = rows.filter((q) => q.section && catNames.has(q.section.trim().toLowerCase())).map((q) => q.id);
    if (staleIds.length) {
      await sb.from("questions").update({ section: null }).in("id", staleIds);
      rows = rows.map((q) => (staleIds.includes(q.id) ? { ...q, section: null } : q));
    }

    setQs(rows);
    setSelected(new Set());
  }
  useEffect(() => {
    if (domain) { loadQs(domain); setRename(domains.find((d) => d.slug === domain)?.name ?? ""); }
  }, [domain]); // eslint-disable-line react-hooks/exhaustive-deps

  async function update(idQ: string, patch: Partial<Q>) {
    setQs((prev) => prev.map((q) => (q.id === idQ ? { ...q, ...patch } : q)));
    const { error } = await sb.from("questions").update(patch).eq("id", idQ);
    if (error) setErr(error.message);
  }
  async function moveQuestion(idQ: string, toSlug: string) {
    // Clear the section on move: a section is a sub-group WITHIN a category, so
    // the old category's label is meaningless (and misleading) in the new one.
    const { error } = await sb.from("questions").update({ domain_slug: toSlug, section: null }).eq("id", idQ);
    if (error) { setErr(error.message); return; }
    setQs((prev) => prev.filter((q) => q.id !== idQ));
  }
  async function deleteQuestions(ids: string[]) {
    if (!ids.length) return;
    if (!confirm(`Delete ${ids.length} question(s)? This cannot be undone.`)) return;
    const { error } = await sb.from("questions").delete().in("id", ids);
    if (error) { setErr(error.message); return; }
    loadQs(domain);
  }
  // Bulk-remove section headers for the selected questions (keeps the questions).
  async function clearSections(ids: string[]) {
    if (!ids.length) return;
    const { error } = await sb.from("questions").update({ section: null }).in("id", ids);
    if (error) { setErr(error.message); return; }
    setQs((prev) => prev.map((q) => (ids.includes(q.id) ? { ...q, section: null } : q)));
    setSelected(new Set());
  }
  async function addQuestion() {
    if (!draft.text.trim()) return;
    const isChecklist = draft.answer_type === "checklist";
    const checklist = isChecklist
      ? draft.checklist.filter((s) => s.text.trim()).map((s) => ({ id: s.id, text: s.text.trim(), answer_type: s.answer_type }))
      : [];
    if (isChecklist && checklist.length === 0) { setErr("Add at least one sub-question to a checklist."); return; }
    const max = qs.reduce((m, q) => Math.max(m, q.sort_order), 0) + 1;
    const { error } = await sb.from("questions").insert({
      domain_slug: domain, section: draft.section || null, text: draft.text.trim(),
      answer_type: draft.answer_type, needs_photo: false, facility_types: [], sort_order: max, is_active: true,
      checklist,
    });
    if (error) { setErr(error.message); return; }
    setDraft({ text: "", section: "", answer_type: "choice", checklist: [] }); setAddingQ(false); loadQs(domain);
  }

  // Sub-question editor helpers (checklist drafts)
  const addSub = () =>
    setDraft((d) => ({ ...d, checklist: [...d.checklist, { id: crypto.randomUUID(), text: "", answer_type: "yes_no" }] }));
  const updateSub = (id: string, patch: Partial<SubItem>) =>
    setDraft((d) => ({ ...d, checklist: d.checklist.map((s) => (s.id === id ? { ...s, ...patch } : s)) }));
  const removeSub = (id: string) =>
    setDraft((d) => ({ ...d, checklist: d.checklist.filter((s) => s.id !== id) }));

  // ---- inline checklist editing for EXISTING questions ----
  // A working draft per question id; falls back to the saved checklist until edited.
  const [checkDrafts, setCheckDrafts] = useState<Record<string, SubItem[]>>({});
  const draftOf = (q: Q): SubItem[] => checkDrafts[q.id] ?? q.checklist ?? [];
  const setDraftFor = (qid: string, items: SubItem[]) =>
    setCheckDrafts((d) => ({ ...d, [qid]: items }));
  const addSubTo = (q: Q) =>
    setDraftFor(q.id, [...draftOf(q), { id: crypto.randomUUID(), text: "", answer_type: "yes_no" }]);
  const updSubIn = (q: Q, sid: string, patch: Partial<SubItem>) =>
    setDraftFor(q.id, draftOf(q).map((s) => (s.id === sid ? { ...s, ...patch } : s)));
  const rmSubIn = (q: Q, sid: string) =>
    setDraftFor(q.id, draftOf(q).filter((s) => s.id !== sid));
  // Transiently show a "Saved" confirmation after saving sub-questions.
  const [savedFlash, setSavedFlash] = useState<Set<string>>(new Set());
  async function saveChecklist(q: Q) {
    const items = draftOf(q)
      .filter((s) => s.text.trim())
      .map((s) => ({ id: s.id, text: s.text.trim(), answer_type: s.answer_type }));
    await update(q.id, { checklist: items }); // optimistic + persist (update() handles both)
    setCheckDrafts((d) => { const n = { ...d }; delete n[q.id]; return n; }); // re-sync from saved
    setSavedFlash((s) => new Set(s).add(q.id));
    setTimeout(() => setSavedFlash((s) => { const n = new Set(s); n.delete(q.id); return n; }), 2000);
  }

  // ---- drag-and-drop reordering (with edge auto-scroll) ----
  const [dragId, setDragId] = useState<string | null>(null);      // question being dragged
  const [overId, setOverId] = useState<string | null>(null);
  const [catDrag, setCatDrag] = useState<string | null>(null);    // category (domain slug) being dragged
  const [catOver, setCatOver] = useState<string | null>(null);
  const scrollDir = useRef(0); // -1 up, 1 down, 0 idle

  // While dragging (a question OR a category), scroll the window when the pointer
  // nears the top/bottom edge, like dragging a file in a file manager.
  useEffect(() => {
    if (!dragId && !catDrag) return;
    const EDGE = 90;
    const onOver = (e: DragEvent) => {
      const h = window.innerHeight;
      scrollDir.current = e.clientY < EDGE ? -1 : e.clientY > h - EDGE ? 1 : 0;
    };
    document.addEventListener("dragover", onOver);
    let raf = 0;
    const tick = () => {
      if (scrollDir.current) window.scrollBy(0, scrollDir.current * 14);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("dragover", onOver);
      cancelAnimationFrame(raf);
      scrollDir.current = 0;
    };
  }, [dragId, catDrag]);

  // Reorder categories in the sidebar; persist domains.sort_order.
  async function reorderCategory(targetSlug: string) {
    if (!catDrag || catDrag === targetSlug) { setCatDrag(null); setCatOver(null); return; }
    const moved = domains.find((x) => x.slug === catDrag);
    if (!moved) return;
    const rest = domains.filter((x) => x.slug !== catDrag);
    const to = rest.findIndex((x) => x.slug === targetSlug);
    rest.splice(to, 0, moved);
    const reordered = rest.map((x, i) => ({ ...x, sort_order: i + 1 }));
    const prev = domains;
    setDomains(reordered);
    setCatDrag(null);
    setCatOver(null);
    const ops = reordered
      .filter((x) => prev.find((o) => o.slug === x.slug)?.sort_order !== x.sort_order)
      .map((x) => sb.from("domains").update({ sort_order: x.sort_order }).eq("slug", x.slug));
    const results = await Promise.all(ops);
    if (results.some((r) => r?.error)) { setErr("Could not save category order."); loadDomains(domain); }
  }

  async function reorderDrop(targetId: string) {
    if (!dragId || dragId === targetId) { setDragId(null); setOverId(null); return; }
    const dragged = qs.find((x) => x.id === dragId);
    const target = qs.find((x) => x.id === targetId);
    if (!dragged || !target) return;
    // Rebuild order: drop dragged just before the target. The card adopts the
    // target's section so it visually lands (and persists) where it was dropped.
    const rest = qs.filter((x) => x.id !== dragId);
    const moved: Q = { ...dragged, section: target.section };
    const to = rest.findIndex((x) => x.id === targetId);
    rest.splice(to, 0, moved);
    const reordered = rest.map((x, i) => ({ ...x, sort_order: i + 1 }));
    setQs(reordered);
    setDragId(null);
    setOverId(null);
    // Persist only what changed: the moved row's section + every changed sort_order.
    const ops = reordered
      .map((x) => {
        const old = qs.find((o) => o.id === x.id);
        if (x.id === moved.id) return sb.from("questions").update({ sort_order: x.sort_order, section: x.section }).eq("id", x.id);
        if (old && old.sort_order !== x.sort_order) return sb.from("questions").update({ sort_order: x.sort_order }).eq("id", x.id);
        return null;
      })
      .filter(Boolean);
    const results = await Promise.all(ops as Promise<{ error: unknown }>[]);
    const failed = results.find((r) => r?.error);
    if (failed) { setErr("Could not save the new order."); loadQs(domain); }
  }
  async function addCategory() {
    const name = catDraft.name.trim();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
    if (!slug) { setErr("Enter a category name"); return; }
    const max = domains.reduce((m, d) => Math.max(m, d.sort_order ?? 0), 0) + 1;
    const { error } = await sb.from("domains").insert({
      slug, name, is_per_building: false, is_key: catDraft.isKey, sort_order: max,
    });
    if (error) { setErr(error.message); return; }
    setCatDraft({ name: "", isKey: true }); setAddingCat(false); loadDomains(slug);
  }
  async function renameCategory() {
    const name = rename.trim();
    if (!name) return;
    const { error } = await sb.from("domains").update({ name }).eq("slug", domain);
    if (error) { setErr(error.message); return; }
    loadDomains(domain);
  }
  async function deleteCategory() {
    if (qs.length > 0) { setErr("Move or delete this category's questions before deleting it."); return; }
    if (!confirm(`Delete category "${domains.find((d) => d.slug === domain)?.name}"?`)) return;
    const { error } = await sb.from("domains").delete().eq("slug", domain);
    if (error) { setErr(error.message); return; }
    setErr(null); loadDomains(domains[0]?.slug);
  }
  // Deactivate/reactivate the selected category. Inactive ones are hidden from the
  // surveyor but stay here so they can be turned back on.
  async function toggleCategoryActive() {
    const cur = domains.find((d) => d.slug === domain);
    if (!cur) return;
    const next = !cur.is_active;
    setDomains((prev) => prev.map((d) => (d.slug === domain ? { ...d, is_active: next } : d)));
    const { error } = await sb.from("domains").update({ is_active: next }).eq("slug", domain);
    if (error) { setErr(error.message); loadDomains(domain); }
  }
  // Toggle "show under every building" (is_key). Off = not mandatory; the category
  // only appears when a client selects it (or as a facility-level section).
  async function toggleCategoryKey() {
    const cur = domains.find((d) => d.slug === domain);
    if (!cur) return;
    const next = !cur.is_key;
    setDomains((prev) => prev.map((d) => (d.slug === domain ? { ...d, is_key: next } : d)));
    const { error } = await sb.from("domains").update({ is_key: next }).eq("slug", domain);
    if (error) { setErr(error.message); loadDomains(domain); }
  }

  const visible = useMemo(
    () => (search ? qs.filter((q) => q.text.toLowerCase().includes(search.toLowerCase())) : qs),
    [qs, search]
  );
  const allSel = visible.length > 0 && visible.every((q) => selected.has(q.id));
  function toggleAll() {
    setSelected(allSel ? new Set() : new Set(visible.map((q) => q.id)));
  }
  function toggleSel(idQ: string) {
    setSelected((prev) => { const n = new Set(prev); n.has(idQ) ? n.delete(idQ) : n.add(idQ); return n; });
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <Link href="/surveys" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:underline">
        <ChevronLeft className="h-4 w-4" /> Dashboard
      </Link>
      <div className="mb-4 mt-3 flex items-center gap-2">
        <h1 className="text-2xl font-bold text-slate-900">Question Bank</h1>
        <button type="button" onClick={() => setShowHelp((v) => !v)} aria-label="Answer type help" className="text-slate-400 hover:text-slate-600">
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>
      {showHelp && (
        <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
          <p className="mb-2 font-semibold text-slate-800">Answer types</p>
          <ul className="flex flex-col gap-1 text-slate-600">
            <li><b>Choice</b> — Yes / No / Numbered / Not Applicable (Yes &amp; No are scored)</li>
            <li><b>Rating</b> — Good / Satisfactory / Unsatisfactory (scored)</li>
            <li><b>Free text</b> — typed answer · <b>Remarks only</b> — notes box · <b>Numbered</b> — number · <b>Yes / No</b> — simple yes/no (scored)</li>
            <li><b>Checklist</b> — a parent gate (Yes / No / Not Applicable) with its own typed sub-questions. <b>Yes</b> reveals and scores each sub-question; <b>No</b> means the item is absent (scored as a finding); <b>Not Applicable</b> skips the whole checklist.</li>
          </ul>
        </div>
      )}
      {err && <p className="mb-4 text-sm text-red-600">{err}</p>}

      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        {/* Category sidebar — stacks above content on mobile */}
        <aside className="w-full shrink-0 md:w-56">
          <div className="max-h-64 overflow-y-auto pr-1 md:sticky md:top-4 md:max-h-[calc(100vh-6rem)]">
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Categories</span>
              <button type="button" onClick={() => setAddingCat((a) => !a)} aria-label="Add category" className="text-slate-500 hover:text-slate-800">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            {addingCat && (
              <div className="mb-2 flex flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2">
                <input value={catDraft.name} onChange={(e) => setCatDraft({ ...catDraft, name: e.target.value })} placeholder="Category name" className="rounded-lg border border-slate-300 px-2 py-1.5 text-sm" />
                <label className="flex items-center gap-2 text-xs text-slate-600">
                  <input type="checkbox" checked={catDraft.isKey} onChange={(e) => setCatDraft({ ...catDraft, isKey: e.target.checked })} />
                  Show under every building
                </label>
                <button type="button" onClick={addCategory} className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white">Create</button>
              </div>
            )}
            <nav className="flex flex-col gap-0.5">
              {domains.map((d) => (
                <div
                  key={d.slug}
                  draggable
                  onDragStart={(e) => { setCatDrag(d.slug); e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", d.slug); }}
                  onDragEnd={() => { setCatDrag(null); setCatOver(null); }}
                  onDragOver={(e) => { if (catDrag && catDrag !== d.slug) { e.preventDefault(); setCatOver(d.slug); } }}
                  onDrop={(e) => { e.preventDefault(); reorderCategory(d.slug); }}
                  title="Drag to reorder"
                  className={`flex items-center gap-1 rounded-lg transition ${
                    catDrag === d.slug ? "opacity-40" : ""
                  } ${catOver === d.slug && catDrag !== d.slug ? "ring-2 ring-slate-900" : ""}`}
                >
                  <GripVertical className="h-3.5 w-3.5 shrink-0 cursor-grab text-slate-300 hover:text-slate-500" />
                  <button type="button" onClick={() => setDomain(d.slug)}
                    className={`flex-1 rounded-lg px-2 py-2 text-left text-sm transition ${
                      d.slug === domain ? "bg-slate-900 text-white" : d.is_active === false ? "text-slate-400 hover:bg-slate-100" : "text-slate-700 hover:bg-slate-100"
                    }`}>
                    <span className="inline-flex items-center gap-1">
                      {d.name}
                      {d.is_active === false && <span className={`rounded px-1 text-[10px] ${d.slug === domain ? "bg-white/20 text-white" : "bg-slate-200 text-slate-500"}`}>off</span>}
                    </span>
                  </button>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Questions */}
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <input value={rename} onChange={(e) => setRename(e.target.value)} className="flex-1 rounded-lg border border-slate-300 px-3 py-1.5 text-sm" />
            <button type="button" onClick={renameCategory} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-white">Rename</button>
            <label className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600">
              <input type="checkbox" checked={domains.find((d) => d.slug === domain)?.is_key ?? false} onChange={toggleCategoryKey} />
              Show under every building
            </label>
            {(() => {
              const active = domains.find((d) => d.slug === domain)?.is_active !== false;
              return (
                <button type="button" onClick={toggleCategoryActive}
                  className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm ${active ? "border-green-300 text-green-700 hover:bg-green-50" : "border-slate-300 text-slate-500 hover:bg-white"}`}>
                  <Power className="h-4 w-4" /> {active ? "Deactivate" : "Activate"}
                </button>
              );
            })()}
            <button type="button" onClick={deleteCategory}
              className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm ${qs.length > 0 ? "cursor-not-allowed border-slate-200 text-slate-300" : "border-red-300 text-red-600 hover:bg-red-50"}`}>
              <Trash2 className="h-4 w-4" /> Delete category
            </button>
          </div>

          <div className="mb-3 flex flex-wrap items-center gap-2">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search questions…" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <button type="button" onClick={() => setAddingQ((a) => !a)} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white">
              <Plus className="h-4 w-4" /> Add question
            </button>
          </div>

          {addingQ && (
            <div className="mb-4 flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <input value={draft.text} onChange={(e) => setDraft({ ...draft, text: e.target.value })} placeholder="Question text" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <div className="flex flex-wrap gap-2">
                <input value={draft.section} onChange={(e) => setDraft({ ...draft, section: e.target.value })} placeholder="Section (optional)" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                <Dropdown value={draft.answer_type} options={typeOpts} onChange={(v) => setDraft({ ...draft, answer_type: v })} className="w-64" />
                <button type="button" onClick={addQuestion} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white">Save</button>
              </div>

              {/* Checklist sub-question editor */}
              {draft.answer_type === "checklist" && (
                <div className="mt-1 rounded-lg border border-slate-200 bg-white p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sub-questions</span>
                    <button type="button" onClick={addSub} className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100">
                      <Plus className="h-3.5 w-3.5" /> Add sub-question
                    </button>
                  </div>
                  {draft.checklist.length === 0 && <p className="text-xs text-slate-400">No sub-questions yet.</p>}
                  <div className="flex flex-col gap-2">
                    {draft.checklist.map((s, i) => (
                      <div key={s.id} className="flex items-center gap-2">
                        <span className="w-5 shrink-0 text-xs text-slate-400">{i + 1}.</span>
                        <input
                          value={s.text}
                          onChange={(e) => updateSub(s.id, { text: e.target.value })}
                          placeholder="Sub-question text"
                          className="flex-1 rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
                        />
                        <Dropdown value={s.answer_type} options={subTypeOpts} onChange={(v) => updateSub(s.id, { answer_type: v })} className="w-40" />
                        <button type="button" onClick={() => removeSub(s.id)} aria-label="Remove sub-question" className="shrink-0 rounded-lg border border-red-200 p-1.5 text-red-500 hover:bg-red-50">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* bulk bar */}
          <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={allSel} onChange={toggleAll} /> Select all ({visible.length})
            </label>
            {selected.size > 0 && (
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => clearSections([...selected])} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100">
                  Clear section ({selected.size})
                </button>
                <button type="button" onClick={() => deleteQuestions([...selected])} className="inline-flex items-center gap-1.5 rounded-lg bg-red-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-600">
                  <Trash2 className="h-4 w-4" /> Delete selected ({selected.size})
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {visible.map((q) => (
              <div
                key={q.id}
                onDragOver={(e) => { if (dragId && dragId !== q.id) { e.preventDefault(); setOverId(q.id); } }}
                onDrop={(e) => { e.preventDefault(); reorderDrop(q.id); }}
                className={`rounded-xl border p-3 transition ${
                  dragId === q.id ? "opacity-40" : ""
                } ${
                  overId === q.id && dragId !== q.id ? "border-slate-900 ring-2 ring-slate-900" :
                  q.is_active ? "border-slate-200 bg-slate-50" : "border-slate-200 bg-slate-100 opacity-60"
                }`}
              >
                {q.section && <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">{q.section}</p>}
                <div className="flex items-start gap-2">
                  {!search && (
                    <button
                      type="button"
                      draggable
                      onDragStart={(e) => { setDragId(q.id); e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", q.id); }}
                      onDragEnd={() => { setDragId(null); setOverId(null); }}
                      title="Drag to reorder"
                      aria-label="Drag to reorder"
                      className="mt-1.5 shrink-0 cursor-grab text-slate-400 hover:text-slate-600 active:cursor-grabbing"
                    >
                      <GripVertical className="h-4 w-4" />
                    </button>
                  )}
                  <input type="checkbox" checked={selected.has(q.id)} onChange={() => toggleSel(q.id)} className="mt-2.5" />
                  <textarea defaultValue={q.text} onBlur={(e) => e.target.value !== q.text && update(q.id, { text: e.target.value })} rows={2} className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
                  <button type="button" onClick={() => update(q.id, { is_active: !q.is_active })} title={q.is_active ? "Deactivate" : "Activate"} className={`shrink-0 rounded-lg border px-2 py-2 ${q.is_active ? "border-green-300 text-green-600" : "border-slate-300 text-slate-400"}`}>
                    <Power className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => deleteQuestions([q.id])} title="Delete" className="shrink-0 rounded-lg border border-slate-300 px-2 py-2 text-slate-400 hover:border-red-300 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Dropdown value={q.answer_type} options={typeOpts} onChange={(v) => update(q.id, { answer_type: v })} className="w-64" />
                  <Dropdown
                    value=""
                    placeholder="Move to…"
                    options={domains.filter((d) => d.slug !== domain).map((d) => ({ value: d.slug, label: d.name }))}
                    onChange={(v) => v && moveQuestion(q.id, v)}
                    className="w-48"
                  />
                  {/* Editable section label — blank clears the header. */}
                  <input
                    key={`sec-${q.id}-${q.section ?? ""}`}
                    defaultValue={q.section ?? ""}
                    onBlur={(e) => { const v = e.target.value.trim(); if (v !== (q.section ?? "")) update(q.id, { section: v || null }); }}
                    placeholder="Section (optional)"
                    className="w-52 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                  />
                </div>

                {/* Inline sub-question editor for existing checklist questions */}
                {q.answer_type === "checklist" && (
                  <div className="mt-2 rounded-lg border border-slate-200 bg-white p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sub-questions</span>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => addSubTo(q)} className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100">
                          <Plus className="h-3.5 w-3.5" /> Add
                        </button>
                        {q.id in checkDrafts ? (
                          <button type="button" onClick={() => saveChecklist(q)} className="rounded-lg bg-green-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-green-700">
                            Save sub-questions
                          </button>
                        ) : savedFlash.has(q.id) ? (
                          <span className="text-xs font-medium text-green-600">Saved ✓</span>
                        ) : null}
                      </div>
                    </div>
                    {draftOf(q).length === 0 && <p className="text-xs text-slate-400">No sub-questions yet.</p>}
                    <div className="flex flex-col gap-2">
                      {draftOf(q).map((s, i) => (
                        <div key={s.id} className="flex items-center gap-2">
                          <span className="w-5 shrink-0 text-xs text-slate-400">{i + 1}.</span>
                          <input
                            value={s.text}
                            onChange={(e) => updSubIn(q, s.id, { text: e.target.value })}
                            placeholder="Sub-question text"
                            className="flex-1 rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
                          />
                          <Dropdown value={s.answer_type} options={subTypeOpts} onChange={(v) => updSubIn(q, s.id, { answer_type: v })} className="w-40" />
                          <button type="button" onClick={() => rmSubIn(q, s.id)} aria-label="Remove sub-question" className="shrink-0 rounded-lg border border-red-200 p-1.5 text-red-500 hover:bg-red-50">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
