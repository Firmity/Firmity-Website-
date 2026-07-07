"use client";
// Admin PDF editor — a Canva-style editor for the Facility Health Report template.
// Left: controls (theme presets, palette, fonts, branding, section copy, category
// labels, add/drag/edit overlay elements). Right: a live SVG canvas (mm = PDF units)
// with an optional "exact PDF" pane that renders the real fpdf2 output.
//
// The template is a single JSON object (see lib/template-api.ts) saved to Supabase;
// the backend renderer applies it to every generated report. Overlay coordinates are
// PDF millimetres, so what you drag here lands in the same spot in the PDF.

import { createElement, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Link from "next/link";
import {
  ChevronLeft, Type, Square, Minus, Image as ImageIcon, Star, Shield, CheckCircle,
  Building2, Leaf, Zap, Droplet, Phone, Trash2, Plus, RefreshCw, Save, Layers,
  Undo2, Redo2, Copy,
} from "lucide-react";
import {
  ReportTemplate, Overlay, OverlayPage, Palette, SectionStyle, PAGE_W_MM, PAGE_H_MM,
  DEFAULT_CATEGORY_LABELS, defaultTemplate, fallbackPresets, getPresets, previewPdfUrl,
  loadDefaultTemplate, saveDefaultTemplate,
} from "@/src/lib/template-api";

// ---- palette metadata (label + which roles are "status" colours) ----
const PALETTE_ROLES: { key: keyof ReportTemplate["palette"]; label: string }[] = [
  { key: "ink", label: "Ink / text" }, { key: "blue", label: "Primary accent" },
  { key: "lime", label: "Secondary accent" }, { key: "cream", label: "Page background" },
  { key: "card", label: "Cards" }, { key: "line", label: "Lines" }, { key: "muted", label: "Muted text" },
  { key: "green", label: "Good" }, { key: "lime_g", label: "Good-ish" }, { key: "amber", label: "Satisfactory" },
  { key: "red", label: "Unsatisfactory" }, { key: "slate", label: "N/A" },
];

// Icon set = real lucide components (stroke outlines, not filled). Rendering them to
// PNG keeps their outline look in the PDF instead of a solid colour blob.
type LucideCmp = typeof Star;
const ICON_LIST: { name: string; Icon: LucideCmp }[] = [
  { name: "star", Icon: Star }, { name: "shield", Icon: Shield }, { name: "check", Icon: CheckCircle },
  { name: "building", Icon: Building2 }, { name: "leaf", Icon: Leaf }, { name: "bolt", Icon: Zap },
  { name: "drop", Icon: Droplet }, { name: "phone", Icon: Phone },
];
const ICON_MAP: Record<string, LucideCmp> = Object.fromEntries(ICON_LIST.map((i) => [i.name, i.Icon]));

const FALLBACK_FONTS = ["Work Sans", "Inter", "Roboto", "Montserrat", "Poppins", "Merriweather",
  "Playfair Display", "Archivo", "DM Sans", "Space Grotesk"];

const uid = () => Math.random().toString(36).slice(2, 9);

// ---- section registry: every editable page of the report ----
type SectionKind = "cover" | "content" | "divider" | "back";
const SECTION_NAV: { key: OverlayPage; label: string; kind: SectionKind }[] = [
  { key: "cover", label: "Cover", kind: "cover" },
  { key: "overview", label: "Overview", kind: "content" },
  { key: "exec_summary", label: "Exec Summary", kind: "content" },
  { key: "buildings", label: "Buildings Divider", kind: "divider" },
  { key: "facility_overview", label: "Facility Overview", kind: "divider" },
  { key: "building", label: "Building Page", kind: "divider" },
  { key: "corrective", label: "Corrective Plan", kind: "divider" },
  { key: "key_recs", label: "Key Recommendations", kind: "divider" },
  { key: "back", label: "Back Cover", kind: "back" },
  { key: "all", label: "All Pages", kind: "content" },
];
const SECTION_KIND: Record<string, SectionKind> =
  Object.fromEntries(SECTION_NAV.map((s) => [s.key, s.kind]));
// which sections have editable intro copy (map to tpl.sections keys)
const SECTION_TEXT_KEY: Record<string, "buildings" | "corrective" | "key_recs"> = {
  buildings: "buildings", corrective: "corrective", key_recs: "key_recs",
};

// Resolve a section's effective colours (per-section override -> sensible default).
function resolveSection(key: string, palette: Palette, styles: Record<string, SectionStyle>) {
  const kind = SECTION_KIND[key] || "content";
  const ov = styles[key] || {};
  const bgDef = kind === "cover" || kind === "content" ? palette.cream
    : kind === "back" ? palette.blue
      : key === "key_recs" ? palette.blue : palette.ink;
  const accentDef = kind === "divider" || kind === "back" ? palette.lime : palette.blue;
  const textDef = kind === "divider" || kind === "back" ? "#ffffff" : palette.ink;
  return { kind, bg: ov.bg || bgDef, accent: ov.accent || accentDef, text: ov.text || textDef };
}

// Rasterise any SVG markup to a transparent PNG data URL (browser only).
function svgMarkupToPng(markup: string, px = 160): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = c.height = px;
      const ctx = c.getContext("2d");
      if (!ctx) return reject(new Error("no ctx"));
      ctx.drawImage(img, 0, 0, px, px);
      resolve(c.toDataURL("image/png"));
    };
    img.onerror = reject;
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(markup)));
  });
}

// Render a lucide icon component to an outline PNG (fill:none, stroke=color).
function lucidePng(Icon: LucideCmp, color: string, px = 160): Promise<string> {
  const markup = renderToStaticMarkup(createElement(Icon, { color, size: px, strokeWidth: 2 }));
  return svgMarkupToPng(markup, px);
}

export default function AdminPdfEditor() {
  const [tpl, setTpl] = useState<ReportTemplate>(defaultTemplate());
  const [presets, setPresets] = useState<ReportTemplate[]>(fallbackPresets());
  const [fonts, setFonts] = useState<string[]>(FALLBACK_FONTS);
  const [pageTab, setPageTab] = useState<OverlayPage>("cover");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [syncPdf, setSyncPdf] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState<"" | "loading" | "saving" | "preview">("loading");
  const [msg, setMsg] = useState<string | null>(null);
  const [, bump] = useState(0); // re-render undo/redo enabled state

  const svgRef = useRef<SVGSVGElement | null>(null);
  const history = useRef<{ past: ReportTemplate[]; future: ReportTemplate[] }>({ past: [], future: [] });

  // ---- load default template + presets/fonts on mount ----
  useEffect(() => {
    (async () => {
      try {
        const [t, p] = await Promise.allSettled([loadDefaultTemplate(), getPresets()]);
        if (t.status === "fulfilled") setTpl(t.value);
        if (p.status === "fulfilled" && p.value.presets?.length) {
          setPresets(p.value.presets);
          if (p.value.fonts?.length) setFonts(p.value.fonts);
        }
      } catch (e) { setMsg(String(e)); }
      finally { setBusy(""); }
    })();
  }, []);

  // ---- inject Google Fonts for on-canvas preview fidelity ----
  useEffect(() => {
    const families = Array.from(new Set([tpl.fonts.heading, tpl.fonts.body]))
      .map((f) => `family=${f.replace(/ /g, "+")}:wght@400;700`).join("&");
    const id = "pdf-editor-fonts";
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) { link = document.createElement("link"); link.id = id; link.rel = "stylesheet"; document.head.appendChild(link); }
    link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
  }, [tpl.fonts.heading, tpl.fonts.body]);

  // ---- debounced exact-PDF refresh when auto-sync is on ----
  useEffect(() => {
    if (!syncPdf) return;
    const h = setTimeout(() => { void refreshPdf(); }, 700);
    return () => clearTimeout(h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tpl, syncPdf]);

  const refreshPdf = useCallback(async () => {
    setBusy("preview");
    try {
      const url = await previewPdfUrl(tpl);
      setPdfUrl((old) => { if (old) URL.revokeObjectURL(old); return url; });
    } catch (e) { setMsg("PDF preview failed: " + String(e)); }
    finally { setBusy(""); }
  }, [tpl]);

  // ---- immutable update helpers (with undo history) ----
  const patch = useCallback((fn: (t: ReportTemplate) => ReportTemplate) => {
    setTpl((t) => {
      history.current.past.push(t);
      if (history.current.past.length > 60) history.current.past.shift();
      history.current.future = [];
      return fn(t);
    });
    bump((n) => n + 1);
  }, []);

  const undo = useCallback(() => {
    setTpl((t) => {
      const prev = history.current.past.pop();
      if (!prev) return t;
      history.current.future.unshift(t);
      return prev;
    });
    bump((n) => n + 1);
  }, []);
  const redo = useCallback(() => {
    setTpl((t) => {
      const next = history.current.future.shift();
      if (!next) return t;
      history.current.past.push(t);
      return next;
    });
    bump((n) => n + 1);
  }, []);

  // keyboard: Ctrl/Cmd+Z undo, Ctrl/Cmd+Shift+Z (or Ctrl+Y) redo, Delete removes selection
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement as HTMLElement | null;
      const typing = el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        if (typing) return;
        e.preventDefault();
        e.shiftKey ? redo() : undo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        if (typing) return;
        e.preventDefault(); redo();
      } else if ((e.key === "Delete" || e.key === "Backspace") && selectedId && !typing) {
        e.preventDefault();
        patch((t) => ({ ...t, overlays: t.overlays.filter((o) => o.id !== selectedId) }));
        setSelectedId(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [undo, redo, patch, selectedId]);
  const setPalette = (k: keyof ReportTemplate["palette"], v: string) =>
    patch((t) => ({ ...t, palette: { ...t.palette, [k]: v } }));
  const setBranding = (k: keyof ReportTemplate["branding"], v: string) =>
    patch((t) => ({ ...t, branding: { ...t.branding, [k]: v } }));
  const setFont = (k: keyof ReportTemplate["fonts"], v: string) =>
    patch((t) => ({ ...t, fonts: { ...t.fonts, [k]: v } }));
  const setSection = (sec: keyof ReportTemplate["sections"], k: "eyebrow" | "title" | "description", v: string) =>
    patch((t) => ({ ...t, sections: { ...t.sections, [sec]: { ...t.sections[sec], [k]: v } } }));
  const setLabel = (slug: string, v: string) =>
    patch((t) => {
      const labels = { ...t.category_labels };
      if (v) labels[slug] = v; else delete labels[slug];
      return { ...t, category_labels: labels };
    });
  const setSectionStyle = (key: string, field: keyof SectionStyle, v: string) =>
    patch((t) => {
      const cur: SectionStyle = { ...(t.section_styles[key] || {}) };
      if (v) cur[field] = v; else delete cur[field];
      const styles = { ...t.section_styles };
      if (Object.keys(cur).length) styles[key] = cur; else delete styles[key];
      return { ...t, section_styles: styles };
    });
  const clearSectionStyle = (key: string) =>
    patch((t) => {
      const styles = { ...t.section_styles };
      delete styles[key];
      return { ...t, section_styles: styles };
    });
  const setSpacing = (v: number) => patch((t) => ({ ...t, spacing: v }));
  const updateOverlay = (id: string, p: Partial<Overlay>) =>
    patch((t) => ({ ...t, overlays: t.overlays.map((o) => (o.id === id ? { ...o, ...p } : o)) }));
  const deleteOverlay = (id: string) =>
    patch((t) => ({ ...t, overlays: t.overlays.filter((o) => o.id !== id) }));

  const addOverlay = (o: Partial<Overlay>) => {
    const base: Overlay = {
      id: uid(), page: pageTab, type: "text", x: 30, y: 30, w: 80, h: 16,
      text: "New text", size: 18, color: tpl.palette.ink, align: "left", bold: false,
      stroke_w: 0.6, radius: 2, opacity: 1, ...o,
    };
    patch((t) => ({ ...t, overlays: [...t.overlays, base] }));
    setSelectedId(base.id);
  };

  const onAddIcon = async (name: string) => {
    try {
      const Icon = ICON_MAP[name];
      const color = tpl.palette.ink;
      const src = await lucidePng(Icon, color);
      addOverlay({ type: "image", src, iconName: name, color, w: 16, h: 16, x: 30, y: 30 });
    } catch { setMsg("icon add failed"); }
  };
  const onAddImage = (file: File) => {
    const r = new FileReader();
    r.onload = () => addOverlay({ type: "image", src: String(r.result), w: 40, h: 30, x: 30, y: 30 });
    r.readAsDataURL(file);
  };
  // Recolour an icon by re-rendering its lucide component at the new colour.
  const recolorIcon = async (o: Overlay, color: string) => {
    const Icon = o.iconName ? ICON_MAP[o.iconName] : null;
    if (!Icon) { updateOverlay(o.id, { color }); return; }
    try { const src = await lucidePng(Icon, color); updateOverlay(o.id, { color, src }); }
    catch { setMsg("recolour failed"); }
  };
  const duplicateSelected = () => {
    if (!selected) return;
    const copy: Overlay = { ...selected, id: uid(), x: selected.x + 6, y: selected.y + 6 };
    patch((t) => ({ ...t, overlays: [...t.overlays, copy] }));
    setSelectedId(copy.id);
  };

  // update an overlay WITHOUT recording history (used during a drag stream)
  const updateOverlaySilent = (id: string, p: Partial<Overlay>) =>
    setTpl((t) => ({ ...t, overlays: t.overlays.map((o) => (o.id === id ? { ...o, ...p } : o)) }));

  // ---- drag on canvas (pointer -> mm). One history entry per drag. ----
  const startDrag = (e: React.PointerEvent, o: Overlay) => {
    if (editingId) return;
    e.preventDefault();
    setSelectedId(o.id);
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const scale = rect.width / PAGE_W_MM;
    const sx = e.clientX, sy = e.clientY, ox = o.x, oy = o.y;
    // snapshot for undo once, at the start of the gesture
    history.current.past.push(tpl);
    if (history.current.past.length > 60) history.current.past.shift();
    history.current.future = [];
    let moved = false;
    const move = (ev: PointerEvent) => {
      moved = true;
      const nx = Math.max(0, Math.min(PAGE_W_MM, ox + (ev.clientX - sx) / scale));
      const ny = Math.max(0, Math.min(PAGE_H_MM, oy + (ev.clientY - sy) / scale));
      updateOverlaySilent(o.id, { x: Math.round(nx * 10) / 10, y: Math.round(ny * 10) / 10 });
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      if (!moved) history.current.past.pop(); // a click without drag: discard the snapshot
      else bump((n) => n + 1);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const applyPreset = (p: ReportTemplate) =>
    patch((t) => ({
      ...p, name: p.name, category_labels: t.category_labels, overlays: t.overlays,
      section_styles: t.section_styles, spacing: t.spacing,
    }));

  const onSave = async () => {
    setBusy("saving"); setMsg(null);
    try { await saveDefaultTemplate(tpl); setMsg("Saved. New reports will use this template."); }
    catch (e) { setMsg("Save failed: " + String(e)); }
    finally { setBusy(""); }
  };

  const visibleOverlays = useMemo(
    () => tpl.overlays.filter((o) => o.page === pageTab || o.page === "all"),
    [tpl.overlays, pageTab]);
  const selected = tpl.overlays.find((o) => o.id === selectedId) || null;

  return (
    <div className="flex h-screen flex-col bg-neutral-50 text-neutral-900">
      {/* top bar */}
      <div className="flex items-center justify-between border-b bg-white px-4 py-2.5">
        <div className="flex items-center gap-3">
          <Link href="/admin/users" className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-800">
            <ChevronLeft size={16} /> Staff &amp; Roles
          </Link>
          <span className="text-sm font-semibold">PDF Report Editor</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={undo} disabled={history.current.past.length === 0} title="Undo (Ctrl+Z)"
            className="rounded-lg border p-1.5 hover:bg-neutral-50 disabled:opacity-40"><Undo2 size={14} /></button>
          <button onClick={redo} disabled={history.current.future.length === 0} title="Redo (Ctrl+Shift+Z)"
            className="rounded-lg border p-1.5 hover:bg-neutral-50 disabled:opacity-40"><Redo2 size={14} /></button>
          <span className="mx-1 h-4 w-px bg-neutral-200" />
          <label className="flex items-center gap-1.5 text-xs text-neutral-600">
            <input type="checkbox" checked={syncPdf} onChange={(e) => setSyncPdf(e.target.checked)} />
            Auto-sync exact PDF
          </label>
          <button onClick={refreshPdf} disabled={busy === "preview"}
            className="flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs hover:bg-neutral-50 disabled:opacity-50">
            <RefreshCw size={14} className={busy === "preview" ? "animate-spin" : ""} /> Exact PDF
          </button>
          <button onClick={onSave} disabled={busy === "saving"}
            className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
            <Save size={14} /> Save template
          </button>
        </div>
      </div>

      {msg && <div className="border-b bg-amber-50 px-4 py-1.5 text-xs text-amber-800">{msg}</div>}

      <div className="flex min-h-0 flex-1">
        {/* ---------------- LEFT: controls ---------------- */}
        <div className="w-[360px] shrink-0 overflow-y-auto border-r bg-white p-3 text-sm">
          {/* presets */}
          <Section title="Themes" icon={<Layers size={14} />}>
            <div className="grid grid-cols-2 gap-2">
              {(presets.length ? presets : []).map((p) => (
                <button key={p.name} onClick={() => applyPreset(p)}
                  className="rounded-lg border p-2 text-left text-xs hover:border-blue-400"
                  style={{ background: p.palette.cream }}>
                  <div className="mb-1 flex gap-1">
                    {[p.palette.ink, p.palette.blue, p.palette.lime].map((c, i) => (
                      <span key={i} className="h-3 w-3 rounded-full" style={{ background: c }} />
                    ))}
                  </div>
                  <span style={{ color: p.palette.ink }}>{p.name}</span>
                </button>
              ))}
            </div>
          </Section>

          {/* add elements */}
          <Section title="Add to canvas" icon={<Plus size={14} />}>
            <div className="flex flex-wrap gap-1.5">
              <ToolBtn onClick={() => addOverlay({ type: "text" })}><Type size={14} /> Text</ToolBtn>
              <ToolBtn onClick={() => addOverlay({ type: "rect", fill: tpl.palette.blue, w: 60, h: 24 })}><Square size={14} /> Box</ToolBtn>
              <ToolBtn onClick={() => addOverlay({ type: "line", stroke: tpl.palette.ink, w: 80, h: 0 })}><Minus size={14} /> Line</ToolBtn>
              <label className="flex cursor-pointer items-center gap-1 rounded-lg border px-2 py-1 text-xs hover:bg-neutral-50">
                <ImageIcon size={14} /> Image
                <input type="file" accept="image/*" hidden
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) onAddImage(f); e.currentTarget.value = ""; }} />
              </label>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {ICON_LIST.map(({ name, Icon }) => (
                <button key={name} title={name} onClick={() => onAddIcon(name)}
                  className="rounded-lg border p-1.5 hover:bg-neutral-50"><Icon size={16} /></button>
              ))}
            </div>
          </Section>

          {/* selected element */}
          {selected && (
            <Section title="Selected element" icon={<Layers size={14} />}>
              <ElementEditor o={selected} palette={tpl.palette}
                onChange={(p) => updateOverlay(selected.id, p)}
                onRecolor={(c) => recolorIcon(selected, c)}
                onDuplicate={duplicateSelected}
                onDelete={() => { deleteOverlay(selected.id); setSelectedId(null); }} />
            </Section>
          )}

          {/* fonts */}
          <Section title="Fonts">
            <Row label="Headings">
              <select value={tpl.fonts.heading} onChange={(e) => setFont("heading", e.target.value)} className="w-full rounded border px-2 py-1">
                {fonts.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </Row>
            <Row label="Body">
              <select value={tpl.fonts.body} onChange={(e) => setFont("body", e.target.value)} className="w-full rounded border px-2 py-1">
                {fonts.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </Row>
            <p className="mt-1 text-[11px] text-neutral-400">Fonts preview on-canvas; embedding in the PDF requires the .ttf bundled server-side (Work Sans ships by default).</p>
          </Section>

          {/* palette */}
          <Section title="Colours">
            {PALETTE_ROLES.map(({ key, label }) => (
              <ColorRow key={key} label={label} value={tpl.palette[key]} onChange={(v) => setPalette(key, v)} />
            ))}
          </Section>

          {/* branding */}
          <Section title="Branding & titles">
            <TextRow label="Brand" value={tpl.branding.brand} onChange={(v) => setBranding("brand", v)} />
            <TextRow label="Report title" value={tpl.branding.report_title} onChange={(v) => setBranding("report_title", v)} />
            <TextRow label="Back-cover line" value={tpl.branding.back_cover_line} onChange={(v) => setBranding("back_cover_line", v)} />
          </Section>

          {/* current section (driven by the navigator) */}
          <Section title={`Section: ${SECTION_NAV.find((s) => s.key === pageTab)?.label ?? pageTab}`} icon={<Layers size={14} />}>
            {(() => {
              const rs = resolveSection(pageTab, tpl.palette, tpl.section_styles);
              const ov = tpl.section_styles[pageTab] || {};
              const textKey = SECTION_TEXT_KEY[pageTab];
              return (
                <>
                  <p className="mb-2 text-[11px] text-neutral-400">Colours apply to this page only. Leave blank to follow the theme.</p>
                  <SectionColorRow label="Accent" value={ov.accent} placeholder={rs.accent} onChange={(v) => setSectionStyle(pageTab, "accent", v)} />
                  <SectionColorRow label="Background" value={ov.bg} placeholder={rs.bg} onChange={(v) => setSectionStyle(pageTab, "bg", v)} />
                  <SectionColorRow label="Text" value={ov.text} placeholder={rs.text} onChange={(v) => setSectionStyle(pageTab, "text", v)} />
                  {Object.keys(ov).length > 0 && (
                    <button onClick={() => clearSectionStyle(pageTab)} className="mt-1 text-[11px] text-blue-600 hover:underline">
                      Reset section to theme
                    </button>
                  )}
                  {textKey && (
                    <div className="mt-3 border-t pt-2">
                      <div className="mb-1 text-[11px] font-semibold uppercase text-neutral-400">Section text</div>
                      <TextRow label="Eyebrow" value={tpl.sections[textKey].eyebrow} onChange={(v) => setSection(textKey, "eyebrow", v)} />
                      <TextRow label="Title" value={tpl.sections[textKey].title} onChange={(v) => setSection(textKey, "title", v)} />
                      <TextRow label="Description" value={tpl.sections[textKey].description} onChange={(v) => setSection(textKey, "description", v)} textarea />
                    </div>
                  )}
                </>
              );
            })()}
          </Section>

          {/* response spacing (global) */}
          <Section title="Response spacing">
            <Row label={`Spacing — ${Math.round((tpl.spacing ?? 1) * 100)}%`}>
              <input type="range" min={0.8} max={1.6} step={0.05} value={tpl.spacing ?? 1}
                onChange={(e) => setSpacing(parseFloat(e.target.value))} className="w-full" />
            </Row>
            <p className="text-[11px] text-neutral-400">Adds breathing room between each response in the report.</p>
          </Section>

          {/* category labels */}
          <Section title="Category names">
            {Object.entries(DEFAULT_CATEGORY_LABELS).map(([slug, def]) => (
              <TextRow key={slug} label={def} placeholder={def}
                value={tpl.category_labels[slug] ?? ""} onChange={(v) => setLabel(slug, v)} />
            ))}
          </Section>
        </div>

        {/* ---------------- RIGHT: canvas / pdf ---------------- */}
        <div className="flex min-w-0 flex-1 flex-col bg-neutral-100">
          <div className="flex items-center gap-1.5 overflow-x-auto border-b bg-white px-4 py-2">
            {SECTION_NAV.map((s) => (
              <button key={s.key} onClick={() => { setPageTab(s.key); setSelectedId(null); }}
                className={`shrink-0 rounded-lg px-3 py-1 text-xs font-medium ${pageTab === s.key ? "bg-neutral-900 text-white" : "border text-neutral-600 hover:bg-neutral-50"}`}>
                {s.label}
              </button>
            ))}
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-1 gap-0 overflow-auto p-6 xl:grid-cols-2">
            {/* live SVG canvas */}
            <div className="flex items-start justify-center">
              <div className="w-full max-w-3xl shadow-lg" style={{ aspectRatio: `${PAGE_W_MM}/${PAGE_H_MM}` }}>
                <Canvas ref={svgRef} tpl={tpl} pageTab={pageTab} overlays={visibleOverlays}
                  selectedId={selectedId} editingId={editingId}
                  onSelect={setSelectedId} onStartDrag={startDrag}
                  onEdit={setEditingId} onText={(id, v) => updateOverlay(id, { text: v })}
                  onBlankClick={() => setSelectedId(null)} />
              </div>
            </div>
            {/* exact PDF */}
            {syncPdf || pdfUrl ? (
              <div className="flex items-start justify-center">
                {pdfUrl
                  ? <iframe title="exact pdf" src={pdfUrl} className="h-[70vh] w-full max-w-3xl rounded bg-white shadow-lg" />
                  : <div className="flex h-40 items-center justify-center text-xs text-neutral-400">Rendering exact PDF…</div>}
              </div>
            ) : (
              <div className="hidden items-start justify-center text-xs text-neutral-400 xl:flex">
                Turn on “Auto-sync exact PDF” or click “Exact PDF” to see the true rendered report here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================ canvas ============================ */
interface CanvasProps {
  tpl: ReportTemplate; pageTab: OverlayPage; overlays: Overlay[];
  selectedId: string | null; editingId: string | null;
  onSelect: (id: string) => void; onStartDrag: (e: React.PointerEvent, o: Overlay) => void;
  onEdit: (id: string | null) => void; onText: (id: string, v: string) => void;
  onBlankClick: () => void;
}
const Canvas = forwardRef<SVGSVGElement, CanvasProps>((props, ref) => {
  const { tpl, pageTab, overlays, selectedId, editingId, onStartDrag, onEdit, onText, onBlankClick } = props;
  const P = tpl.palette;
  const rs = resolveSection(pageTab, P, tpl.section_styles);
  const yr = new Date().getFullYear();

  const dividerText = (() => {
    if (pageTab === "buildings" || pageTab === "corrective" || pageTab === "key_recs") {
      const s = tpl.sections[pageTab];
      return { eyebrow: s.eyebrow, title: s.title, description: s.description, score: null as string | null };
    }
    if (pageTab === "facility_overview") return { eyebrow: "BUILDING 01", title: "Facility Overview", description: "", score: "88" };
    if (pageTab === "building") return { eyebrow: "BUILDING 02", title: "Tower A", description: "", score: "72" };
    return { eyebrow: "", title: "", description: "", score: null as string | null };
  })();

  return (
    <svg ref={ref} viewBox={`0 0 ${PAGE_W_MM} ${PAGE_H_MM}`} className="h-full w-full rounded"
      style={{ fontFamily: tpl.fonts.body, touchAction: "none", userSelect: "none" }}
      onPointerDown={(e) => { if (e.target === e.currentTarget) onBlankClick(); }}>
      <rect x={0} y={0} width={PAGE_W_MM} height={PAGE_H_MM} fill={rs.bg} />

      {/* mock chrome per section kind */}
      {rs.kind === "cover" && (
        <g fontFamily={tpl.fonts.heading}>
          <text x={14} y={22} fontSize={5} fontWeight="700" fill={rs.text}>{tpl.branding.brand}</text>
          <text x={14} y={52} fontSize={20} fontWeight="700" fill={rs.text}>Facility Health</text>
          <text x={14} y={74} fontSize={20} fontWeight="700" fill={rs.text}>Report <tspan fill={rs.accent}>{yr}</tspan></text>
          <text x={14} y={92} fontSize={7} fill={P.muted}>Sample Facility</text>
          {[P.blue, P.lime, P.ink, P.blue, P.lime, P.ink, P.blue].map((c, i) => (
            <rect key={i} x={14 + i * ((269 - 6 * 5) / 7 + 5)} y={120} width={(269 - 6 * 5) / 7} height={72} rx={3} fill={c} />
          ))}
        </g>
      )}
      {rs.kind === "content" && (
        <g fontFamily={tpl.fonts.heading}>
          <text x={14} y={10} fontSize={4} fontWeight="700" fill={P.ink}>{tpl.branding.brand}</text>
          <text x={283} y={10} fontSize={4} textAnchor="end" fill={P.muted}>{tpl.branding.report_title}</text>
          <line x1={14} y1={14.5} x2={283} y2={14.5} stroke={P.line} strokeWidth={0.3} />
          <rect x={14} y={26} width={4} height={7} fill={rs.accent} />
          <text x={22} y={32} fontSize={9} fontWeight="700" fill={rs.text}>
            {pageTab === "overview" ? "At a glance" : pageTab === "exec_summary" ? "Executive Summary" : "Content page"}
          </text>
          <text x={14} y={46} fontSize={4} fill={P.muted}>Data pages auto-generate per survey. Overlays marked “All Pages” appear on every page.</text>
        </g>
      )}
      {rs.kind === "divider" && (
        <g fontFamily={tpl.fonts.heading}>
          <text x={14} y={54} fontSize={6} fontWeight="700" fill={rs.accent}>{(dividerText.eyebrow || "").toUpperCase()}</text>
          <text x={14} y={82} fontSize={20} fontWeight="700" fill={rs.text}>{dividerText.title}</text>
          {dividerText.description
            ? <text x={14} y={104} fontSize={6} fill="#d2d4da">{dividerText.description.slice(0, 92)}</text>
            : null}
          {dividerText.score
            ? <text x={283} y={96} fontSize={40} fontWeight="700" textAnchor="end" fill={rs.accent}>{dividerText.score}</text>
            : null}
        </g>
      )}
      {rs.kind === "back" && (
        <g fontFamily={tpl.fonts.heading}>
          <text x={14} y={86} fontSize={16} fontWeight="700" fill={rs.text}>Powered by {tpl.branding.brand} AI</text>
          <text x={14} y={122} fontSize={6} fill={rs.accent}>{tpl.branding.back_cover_line}</text>
        </g>
      )}

      {/* overlay elements */}
      {overlays.map((o: Overlay) => {
        const isSel = o.id === selectedId;
        const sel = isSel ? { stroke: "#2f5cff", strokeWidth: 0.4, strokeDasharray: "1.5 1" } : {};
        if (o.type === "text") {
          if (o.id === editingId) {
            return (
              <foreignObject key={o.id} x={o.x} y={o.y - o.size * 0.35} width={o.w} height={o.size * 0.6}>
                <input autoFocus defaultValue={o.text}
                  onBlur={(e) => { onText(o.id, e.target.value); onEdit(null); }}
                  onKeyDown={(e) => { if (e.key === "Enter") { onText(o.id, (e.target as HTMLInputElement).value); onEdit(null); } }}
                  style={{ width: "100%", font: `${o.bold ? 700 : 400} ${o.size}px ${tpl.fonts.heading}`, color: o.color, border: "1px solid #2f5cff", background: "#fff" }} />
              </foreignObject>
            );
          }
          const anchor = o.align === "center" ? "middle" : o.align === "right" ? "end" : "start";
          const tx = o.align === "center" ? o.x + o.w / 2 : o.align === "right" ? o.x + o.w : o.x;
          return (
            <g key={o.id} opacity={o.opacity ?? 1} onPointerDown={(e) => onStartDrag(e, o)} onDoubleClick={() => onEdit(o.id)} style={{ cursor: "move" }}>
              <rect x={o.x} y={o.y - o.size * 0.35} width={o.w} height={o.size * 0.55} fill="transparent" {...sel} />
              <text x={tx} y={o.y} fontSize={o.size} fontWeight={o.bold ? 700 : 400} fill={o.color}
                fontFamily={tpl.fonts.heading} textAnchor={anchor}>{o.text}</text>
            </g>
          );
        }
        if (o.type === "rect") {
          return <rect key={o.id} x={o.x} y={o.y} width={o.w} height={o.h} rx={o.radius} opacity={o.opacity ?? 1}
            fill={o.fill || "none"} stroke={o.stroke || (isSel ? "#2f5cff" : "none")} strokeWidth={o.stroke_w}
            onPointerDown={(e) => onStartDrag(e, o)} style={{ cursor: "move" }} {...(isSel ? { strokeDasharray: "1.5 1" } : {})} />;
        }
        if (o.type === "line") {
          return <line key={o.id} x1={o.x} y1={o.y} x2={o.x + o.w} y2={o.y + o.h} opacity={o.opacity ?? 1}
            stroke={o.stroke || P.ink} strokeWidth={Math.max(o.stroke_w, 0.4)} onPointerDown={(e) => onStartDrag(e, o)} style={{ cursor: "move" }} />;
        }
        // image / icon
        return (
          <g key={o.id} opacity={o.opacity ?? 1} onPointerDown={(e) => onStartDrag(e, o)} style={{ cursor: "move" }}>
            {o.src && <image href={o.src} x={o.x} y={o.y} width={o.w} height={o.h} preserveAspectRatio="xMidYMid meet" />}
            <rect x={o.x} y={o.y} width={o.w} height={o.h} fill="transparent" {...sel} />
          </g>
        );
      })}
    </svg>
  );
});
Canvas.displayName = "Canvas";

/* ============================ element editor ============================ */
function ElementEditor({ o, palette, onChange, onRecolor, onDuplicate, onDelete }: {
  o: Overlay; palette: ReportTemplate["palette"];
  onChange: (p: Partial<Overlay>) => void; onRecolor: (c: string) => void;
  onDuplicate: () => void; onDelete: () => void;
}) {
  const isIcon = o.type === "image" && !!o.iconName;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase text-neutral-400">{isIcon ? "icon" : o.type}</span>
        <div className="flex items-center gap-1.5">
          <PageSelect value={o.page} onChange={(v) => onChange({ page: v })} />
          <button onClick={onDuplicate} title="Duplicate" className="rounded p-1 text-neutral-500 hover:bg-neutral-100"><Copy size={14} /></button>
          <button onClick={onDelete} title="Delete" className="rounded p-1 text-red-500 hover:bg-red-50"><Trash2 size={14} /></button>
        </div>
      </div>

      {o.type === "text" && (
        <>
          <TextRow label="Text" value={o.text ?? ""} onChange={(v) => onChange({ text: v })} />
          <div className="flex items-end gap-2">
            <NumRow label="Size" value={o.size} onChange={(v) => onChange({ size: v })} />
            <label className="flex items-center gap-1 pb-1.5 text-xs"><input type="checkbox" checked={o.bold} onChange={(e) => onChange({ bold: e.target.checked })} /> Bold</label>
          </div>
          <Row label="Align">
            <div className="flex gap-1">
              {(["left", "center", "right"] as const).map((a) => (
                <button key={a} onClick={() => onChange({ align: a })}
                  className={`rounded border px-2 py-0.5 text-xs ${o.align === a ? "bg-neutral-900 text-white" : ""}`}>{a}</button>
              ))}
            </div>
          </Row>
          <ColorRow label="Colour" value={o.color} onChange={(v) => onChange({ color: v })} />
        </>
      )}
      {o.type === "rect" && (
        <>
          <label className="flex items-center gap-1.5 text-xs text-neutral-600">
            <input type="checkbox" checked={o.fill !== undefined} onChange={(e) => onChange({ fill: e.target.checked ? (o.fill ?? palette.blue) : undefined })} /> Fill
          </label>
          {o.fill !== undefined && <ColorRow label="Fill colour" value={o.fill} onChange={(v) => onChange({ fill: v })} />}
          <label className="flex items-center gap-1.5 text-xs text-neutral-600">
            <input type="checkbox" checked={o.stroke !== undefined} onChange={(e) => onChange({ stroke: e.target.checked ? (o.stroke ?? palette.ink) : undefined })} /> Border
          </label>
          {o.stroke !== undefined && (
            <>
              <ColorRow label="Border colour" value={o.stroke} onChange={(v) => onChange({ stroke: v })} />
              <NumRow label="Border width" value={o.stroke_w} step={0.1} onChange={(v) => onChange({ stroke_w: v })} />
            </>
          )}
          <NumRow label="Corner radius" value={o.radius} onChange={(v) => onChange({ radius: v })} />
        </>
      )}
      {o.type === "line" && (
        <>
          <ColorRow label="Colour" value={o.stroke ?? palette.ink} onChange={(v) => onChange({ stroke: v })} />
          <NumRow label="Thickness" value={o.stroke_w} step={0.1} onChange={(v) => onChange({ stroke_w: v })} />
        </>
      )}
      {isIcon && <ColorRow label="Icon colour" value={o.color} onChange={onRecolor} />}

      <Row label={`Opacity — ${Math.round((o.opacity ?? 1) * 100)}%`}>
        <input type="range" min={0} max={1} step={0.05} value={o.opacity ?? 1}
          onChange={(e) => onChange({ opacity: parseFloat(e.target.value) })} className="w-full" />
      </Row>
      <div className="flex gap-2">
        <NumRow label="X" value={o.x} onChange={(v) => onChange({ x: v })} />
        <NumRow label="Y" value={o.y} onChange={(v) => onChange({ y: v })} />
      </div>
      <div className="flex gap-2">
        <NumRow label="W" value={o.w} onChange={(v) => onChange({ w: v })} />
        <NumRow label="H" value={o.h} onChange={(v) => onChange({ h: v })} />
      </div>
    </div>
  );
}

/* ============================ small UI atoms ============================ */
function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <details open className="mb-2 rounded-lg border">
      <summary className="flex cursor-pointer items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
        {icon}{title}
      </summary>
      <div className="border-t p-3">{children}</div>
    </details>
  );
}
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="mb-1.5 block"><span className="mb-0.5 block text-[11px] text-neutral-500">{label}</span>{children}</label>;
}
function TextRow({ label, value, onChange, placeholder, textarea }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; textarea?: boolean;
}) {
  return (
    <Row label={label}>
      {textarea
        ? <textarea value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} rows={2} className="w-full rounded border px-2 py-1 text-xs" />
        : <input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full rounded border px-2 py-1 text-xs" />}
    </Row>
  );
}
function NumRow({ label, value, onChange, step = 1 }: { label: string; value: number; onChange: (v: number) => void; step?: number }) {
  return (
    <Row label={label}>
      <input type="number" step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value) || 0)} className="w-full rounded border px-2 py-1 text-xs" />
    </Row>
  );
}
function ColorRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mb-1.5 flex items-center justify-between gap-2">
      <span className="text-[11px] text-neutral-600">{label}</span>
      <div className="flex items-center gap-1">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-6 w-6 cursor-pointer rounded border p-0" />
        <input value={value} onChange={(e) => onChange(e.target.value)} className="w-20 rounded border px-1.5 py-0.5 text-[11px]" />
      </div>
    </div>
  );
}
// Color row that can be blank (= follow theme); swatch shows the resolved default.
function SectionColorRow({ label, value, placeholder, onChange }: {
  label: string; value?: string; placeholder: string; onChange: (v: string) => void;
}) {
  return (
    <div className="mb-1.5 flex items-center justify-between gap-2">
      <span className="text-[11px] text-neutral-600">{label}</span>
      <div className="flex items-center gap-1">
        <input type="color" value={value || placeholder} onChange={(e) => onChange(e.target.value)} className="h-6 w-6 cursor-pointer rounded border p-0" />
        <input value={value ?? ""} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-20 rounded border px-1.5 py-0.5 text-[11px]" />
        {value ? <button onClick={() => onChange("")} title="Follow theme" className="px-0.5 text-[11px] text-neutral-400 hover:text-neutral-700">✕</button> : null}
      </div>
    </div>
  );
}
function ToolBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return <button onClick={onClick} className="flex items-center gap-1 rounded-lg border px-2 py-1 text-xs hover:bg-neutral-50">{children}</button>;
}
function PageSelect({ value, onChange }: { value: OverlayPage; onChange: (v: OverlayPage) => void }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value as OverlayPage)} className="rounded border px-1 py-0.5 text-[11px]">
      {SECTION_NAV.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
    </select>
  );
}
