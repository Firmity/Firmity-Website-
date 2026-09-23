"use client";
// SEO Optimisation tab. Edit per-page title/description/keywords/OG image/noindex/
// sitemap + optional JSON-LD for the fixed route registry, plus site-wide
// Organization data + robots. Marketers cannot add new pages (registry is fixed).

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Loader2, Save, RotateCcw, ImagePlus, X, Check, RefreshCw } from "lucide-react";
import { SEO_ROUTES, PAGE_SEO } from "@/src/lib/seo";

interface Override {
  path: string;
  title: string | null;
  description: string | null;
  keywords: string[] | null;
  og_image_url: string | null;
  noindex: boolean;
  sitemap_priority: number | null;
  sitemap_changefreq: string | null;
  json_ld: Record<string, unknown> | null;
}
interface Site {
  org_name: string | null;
  org_logo_url: string | null;
  social_links: string[] | null;
  robots_disallow: string[] | null;
}

const FREQ = ["", "daily", "weekly", "monthly", "yearly"];
const blankForm = (path: string): Override => ({
  path, title: "", description: "", keywords: [], og_image_url: null,
  noindex: false, sitemap_priority: null, sitemap_changefreq: "", json_ld: null,
});

export function SeoManager() {
  const [overrides, setOverrides] = useState<Record<string, Override>>({});
  const [site, setSite] = useState<Site>({ org_name: "", org_logo_url: "", social_links: [], robots_disallow: [] });
  const [selected, setSelected] = useState<string>(SEO_ROUTES[0].path);
  const [form, setForm] = useState<Override>(blankForm(SEO_ROUTES[0].path));
  const [jsonText, setJsonText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedTick, setSavedTick] = useState(false);
  const [err, setErr] = useState("");
  const ogRef = useRef<HTMLInputElement | null>(null);

  // "Refresh from code" (2026-09-23) — see runRefresh below.
  const [refreshOpen, setRefreshOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshMsg, setRefreshMsg] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/blog-admin/seo");
    if (!res.ok) return;
    const { overrides: rows, site: s } = await res.json();
    const map: Record<string, Override> = {};
    for (const r of rows as Override[]) map[r.path] = r;
    setOverrides(map);
    setSite(s || {});
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  // Populate the form when the selected page (or its saved override) changes.
  useEffect(() => {
    const o = overrides[selected];
    const d = PAGE_SEO[selected] ?? {}; // code defaults from seo.ts
    // Prefill with the saved override where present, otherwise the current
    // default — so the fields always show the live values.
    setForm({
      ...blankForm(selected),
      title: o?.title ?? d.title ?? "",
      description: o?.description ?? d.description ?? "",
      keywords: o?.keywords ?? d.keywords ?? [],
      og_image_url: o?.og_image_url ?? null,
      noindex: o?.noindex ?? false,
      sitemap_priority: o?.sitemap_priority ?? null,
      sitemap_changefreq: o?.sitemap_changefreq ?? "",
      json_ld: o?.json_ld ?? null,
    });
    setJsonText(o?.json_ld ? JSON.stringify(o.json_ld, null, 2) : "");
    setErr("");
  }, [selected, overrides]);

  const set = <K extends keyof Override>(k: K, v: Override[K]) => setForm((f) => ({ ...f, [k]: v }));

  async function uploadOg(file: File) {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/blog-admin/upload", { method: "POST", body: fd });
    const d = await res.json().catch(() => ({}));
    if (res.ok && d.url) set("og_image_url", d.url);
    else alert(d.error || "Upload failed");
  }

  async function save() {
    setErr("");
    let json_ld: Record<string, unknown> | null = null;
    if (jsonText.trim()) {
      try { json_ld = JSON.parse(jsonText); } catch { setErr("JSON-LD is not valid JSON."); return; }
    }
    // Diff against code defaults: null = "stay linked to default"; a value (incl.
    // "" or []) = an explicit override. So an untouched page never freezes the
    // default, and a deliberately-cleared field stays empty.
    const d = PAGE_SEO[form.path] ?? {};
    const sameArr = (a?: string[] | null, b?: string[]) => JSON.stringify(a ?? []) === JSON.stringify(b ?? []);
    const title = form.title && form.title !== d.title ? form.title : null;
    const description = form.description && form.description !== d.description ? form.description : null;
    const keywords = form.keywords?.length && !sameArr(form.keywords, d.keywords) ? form.keywords : null;
    const body = {
      path: form.path, title, description, keywords,
      og_image_url: form.og_image_url || null,
      noindex: !!form.noindex,
      sitemap_priority: form.sitemap_priority,
      sitemap_changefreq: form.sitemap_changefreq || null,
      json_ld,
    };
    // Nothing actually overridden → delete the row so the page tracks defaults.
    const isEmpty =
      title === null && description === null && keywords === null && !body.og_image_url &&
      !body.noindex && body.sitemap_priority == null && !body.sitemap_changefreq && !json_ld;

    setSaving(true);
    let res: Response;
    if (isEmpty) {
      res = await fetch(`/api/blog-admin/seo?path=${encodeURIComponent(form.path)}`, { method: "DELETE" });
      if (res.ok) setOverrides((m) => { const n = { ...m }; delete n[form.path]; return n; });
    } else {
      res = await fetch("/api/blog-admin/seo", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
      });
      if (res.ok) setOverrides((m) => ({ ...m, [form.path]: body as Override }));
    }
    setSaving(false);
    if (res.ok) { setSavedTick(true); setTimeout(() => setSavedTick(false), 1500); }
    else { const e = await res.json().catch(() => ({})); setErr(e.error || "Save failed"); }
  }

  async function reset() {
    if (!confirm("Reset this page to its built-in default SEO?")) return;
    await fetch(`/api/blog-admin/seo?path=${encodeURIComponent(form.path)}`, { method: "DELETE" });
    setOverrides((m) => { const n = { ...m }; delete n[form.path]; return n; });
  }

  // Regenerates Structured Data (JSON-LD) from the current page copy in
  // code — see seo-store.ts::refreshPageSeo for exactly what this does and
  // doesn't touch (title/description/keywords already always track code
  // changes live and are never part of this).
  async function runRefresh(mode: "merge" | "overwrite") {
    setRefreshOpen(false);
    setRefreshing(true);
    setRefreshMsg("");
    try {
      const res = await fetch("/api/blog-admin/seo/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(d.error || "Refresh failed");
        return;
      }
      await load();
      const parts: string[] = [];
      if (d.updated?.length) parts.push(`${d.updated.length} page${d.updated.length === 1 ? "" : "s"} refreshed`);
      if (d.removedOrphans?.length) parts.push(`${d.removedOrphans.length} stale entr${d.removedOrphans.length === 1 ? "y" : "ies"} removed`);
      setRefreshMsg(parts.length ? parts.join(", ") : "Already up to date.");
      setTimeout(() => setRefreshMsg(""), 5000);
    } finally {
      setRefreshing(false);
    }
  }

  async function saveSite() {
    setSaving(true);
    await fetch("/api/blog-admin/seo/site", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(site),
    });
    setSaving(false);
    setSavedTick(true); setTimeout(() => setSavedTick(false), 1500);
  }

  const label = useMemo(() => SEO_ROUTES.find((r) => r.path === selected)?.label ?? selected, [selected]);

  if (loading) return <div className="flex justify-center py-24 text-[#a0aec0]"><Loader2 className="h-6 w-6 animate-spin" /></div>;

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="mb-1 text-[22px] font-bold text-[#111d35]">SEO Optimisation</h1>
          <p className="text-[13px] text-[#718096]">Edit search metadata for each page. Changes go live within ~60s.</p>
        </div>
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <button
            onClick={() => setRefreshOpen(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#dbe5f0] bg-white px-3 py-2 text-[12.5px] font-medium text-[#4a5568] hover:bg-[#f8fafc] disabled:opacity-60"
          >
            {refreshing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw size={14} />} Refresh from code
          </button>
          {refreshMsg && <p className="text-[11.5px] text-[#2b6cb0] text-right">{refreshMsg}</p>}
        </div>
      </div>

      {refreshOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-xl border border-[#dbe5f0] bg-white p-5 shadow-xl">
            <p className="mb-1 text-[14px] font-semibold text-[#111d35]">Refresh structured data</p>
            <p className="mb-4 text-[12.5px] text-[#718096]">
              Regenerates each page&apos;s Structured Data (JSON-LD) from its current title/description in code. Titles,
              descriptions and keywords already always track code changes automatically and aren&apos;t touched by this.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => runRefresh("merge")}
                className="w-full rounded-lg bg-[#2b6cb0] px-4 py-2.5 text-left text-[12.5px] font-medium text-white hover:bg-[#1a56a0]"
              >
                Merge — only fill in pages with no structured data yet
              </button>
              <button
                onClick={() => runRefresh("overwrite")}
                className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-left text-[12.5px] font-medium text-red-600 hover:bg-red-100"
              >
                Full overwrite — replace every page&apos;s structured data, discarding manual edits
              </button>
              <button
                onClick={() => setRefreshOpen(false)}
                className="w-full rounded-lg border border-[#dbe5f0] px-4 py-2.5 text-[12.5px] font-medium text-[#4a5568] hover:bg-[#f8fafc]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
        {/* Page list */}
        <div className="rounded-xl border border-[#dbe5f0] bg-white p-2 h-fit">
          {SEO_ROUTES.map((r) => {
            const active = r.path === selected;
            const custom = !!overrides[r.path];
            return (
              <button
                key={r.path}
                onClick={() => setSelected(r.path)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[12.5px] ${active ? "bg-[#eef3f9] text-[#2b6cb0] font-medium" : "text-[#4a5568] hover:bg-[#f8fafc]"}`}
              >
                <span className="truncate">{r.label}</span>
                {custom && <span className="ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2b6cb0]" title="Customised" />}
              </button>
            );
          })}
        </div>

        {/* Editor */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[15px] font-semibold text-[#111d35]">{label}</p>
              <p className="text-[11.5px] text-[#a0aec0]">{form.path}{overrides[form.path] ? " · customised" : " · default"}</p>
            </div>
            <div className="flex items-center gap-2">
              {overrides[form.path] && (
                <button onClick={reset} className="inline-flex items-center gap-1.5 rounded-lg border border-[#dbe5f0] px-3 py-2 text-[12.5px] text-[#4a5568] hover:bg-[#f8fafc]">
                  <RotateCcw size={13} /> Reset
                </button>
              )}
              <button onClick={save} disabled={saving} className="inline-flex items-center gap-1.5 rounded-lg bg-[#2b6cb0] px-4 py-2 text-[12.5px] font-medium text-white hover:bg-[#1a56a0] disabled:opacity-60">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : savedTick ? <Check size={14} /> : <Save size={14} />} Save
              </button>
            </div>
          </div>

          {err && <p className="rounded-lg bg-red-50 px-3 py-2 text-[12.5px] text-red-600">{err}</p>}

          <Field label="Title (leave blank to use default)">
            <input value={form.title ?? ""} onChange={(e) => set("title", e.target.value)} className={inputCls} placeholder="Page title" />
          </Field>
          <Field label="Meta description">
            <textarea value={form.description ?? ""} onChange={(e) => set("description", e.target.value)} rows={2} className={inputCls} placeholder="70–165 chars for search results" />
          </Field>
          <Field label="Keywords (comma-separated)">
            <input value={(form.keywords ?? []).join(", ")} onChange={(e) => set("keywords", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} className={inputCls} placeholder="facility management, CMMS, ..." />
          </Field>

          <Field label="Open Graph image (social share)">
            {form.og_image_url ? (
              <div className="relative w-fit">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.og_image_url} alt="OG" className="h-28 rounded-lg object-cover" />
                <button onClick={() => set("og_image_url", null)} className="absolute -right-2 -top-2 rounded-full bg-black/60 p-1 text-white"><X size={12} /></button>
              </div>
            ) : (
              <button onClick={() => ogRef.current?.click()} className="inline-flex items-center gap-2 rounded-lg border border-dashed border-[#cbd5e0] px-4 py-2 text-[12.5px] text-[#718096] hover:border-[#2b6cb0]"><ImagePlus size={15} /> Upload image</button>
            )}
            <input ref={ogRef} type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadOg(f); e.target.value = ""; }} />
          </Field>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Field label="Sitemap priority" hint="How important this page is versus your other pages, from 0.0 to 1.0. It's a hint to Google about what to prioritise crawling — not a ranking guarantee. Rough guide: Home ~1.0, key marketing pages ~0.8, legal pages ~0.3. Leave blank to use the default.">
              <input type="number" step="0.1" min="0" max="1" value={form.sitemap_priority ?? ""} onChange={(e) => set("sitemap_priority", e.target.value === "" ? null : Number(e.target.value))} className={inputCls} placeholder="e.g. 0.8" />
            </Field>
            <Field label="Change frequency" hint="How often this page's content typically changes (daily/weekly/monthly/yearly). Tells search engines how often to re-check it. Like priority, it's only a hint. Use 'weekly' for the blog/home, 'monthly' for most pages, 'yearly' for legal.">
              <select value={form.sitemap_changefreq ?? ""} onChange={(e) => set("sitemap_changefreq", e.target.value)} className={inputCls}>
                {FREQ.map((f) => <option key={f} value={f}>{f || "default"}</option>)}
              </select>
            </Field>
            <Field label="Hide from Google">
              <label className="flex h-[38px] items-center gap-2 text-[12.5px] text-[#4a5568]">
                <input type="checkbox" checked={form.noindex} onChange={(e) => set("noindex", e.target.checked)} /> noindex
              </label>
            </Field>
          </div>

          <Field label="Structured data (JSON-LD, optional)" hint="Optional schema.org data (as JSON-LD) that can earn 'rich results' in Google — e.g. FAQPage for FAQ snippets, Article for blog posts, Service for a service page, BreadcrumbList for breadcrumbs. Paste valid JSON from schema.org. Leave blank if unsure — the site already has Organization + WebSite data globally.">
            <textarea value={jsonText} onChange={(e) => setJsonText(e.target.value)} rows={5} className={`${inputCls} font-mono text-[12px]`} placeholder='{"@context":"https://schema.org","@type":"FAQPage", ...}' />
          </Field>

          {/* Site-wide */}
          <div className="mt-8 rounded-xl border border-[#dbe5f0] bg-white p-5">
            <p className="mb-3 flex items-center gap-1.5 text-[13px] font-semibold text-[#111d35]">
              Site-wide (Organization &amp; robots)
              <span
                title="Applies across the whole site, not one page. Organization name/logo/social links power your Google 'knowledge panel' and structured data. Social links are your public profile URLs (LinkedIn, X, etc.). Robots Disallow lists paths you never want Google to crawl (added to the built-in blocked admin paths)."
                className="flex h-4 w-4 cursor-help items-center justify-center rounded-full bg-[#cbd5e0] text-[10px] text-white"
              >?</span>
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input value={site.org_name ?? ""} onChange={(e) => setSite((s) => ({ ...s, org_name: e.target.value }))} className={inputCls} placeholder="Organization name" />
              <input value={site.org_logo_url ?? ""} onChange={(e) => setSite((s) => ({ ...s, org_logo_url: e.target.value }))} className={inputCls} placeholder="Logo URL" />
              <input value={(site.social_links ?? []).join(", ")} onChange={(e) => setSite((s) => ({ ...s, social_links: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) }))} className={`${inputCls} sm:col-span-2`} placeholder="Social profile URLs (comma-separated)" />
              <input value={(site.robots_disallow ?? []).join(", ")} onChange={(e) => setSite((s) => ({ ...s, robots_disallow: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) }))} className={`${inputCls} sm:col-span-2`} placeholder="Extra robots Disallow paths (comma-separated)" />
            </div>
            <button onClick={saveSite} disabled={saving} className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-[#dbe5f0] px-4 py-2 text-[12.5px] font-medium text-[#4a5568] hover:bg-[#f8fafc] disabled:opacity-60">
              <Save size={13} /> Save site-wide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputCls = "w-full rounded-lg border border-[#cbd5e0] px-3 py-2 text-[13px] focus:border-[#2b6cb0] focus:outline-none";
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#718096]">
        {label}
        {hint && (
          <span title={hint} className="flex h-3.5 w-3.5 cursor-help items-center justify-center rounded-full bg-[#cbd5e0] text-[9px] normal-case text-white">?</span>
        )}
      </span>
      {children}
    </label>
  );
}
