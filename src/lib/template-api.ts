// Report-template client for the admin PDF editor.
// - Template load/save go DIRECTLY to Supabase (RLS `is_admin()`), same pattern
//   as the questions editor.
// - Presets + exact-PDF preview come from the FastAPI backend (service-role render).

import { getSupabaseBrowser } from "./supabase-browser";

const API = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

async function authHeader(): Promise<Record<string, string>> {
  try {
    const { data } = await getSupabaseBrowser().auth.getSession();
    const token = data.session?.access_token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

// ---- shared shape (mirrors backend app/services/report_template.py) ----
export interface Palette {
  ink: string; blue: string; lime: string; cream: string; card: string; line: string;
  muted: string; green: string; lime_g: string; amber: string; red: string; slate: string;
}
export interface Fonts { heading: string; body: string }
export interface Branding { brand: string; report_title: string; back_cover_line: string }
export interface SectionText { eyebrow: string; title: string; description: string }
export interface Sections { buildings: SectionText; corrective: SectionText; key_recs: SectionText }

export type OverlayType = "text" | "rect" | "line" | "image";
export type OverlayPage =
  | "cover" | "overview" | "exec_summary" | "buildings" | "facility_overview"
  | "building" | "corrective" | "key_recs" | "back" | "all";

export interface SectionStyle { accent?: string; bg?: string; text?: string }
export interface Overlay {
  id: string;
  page: OverlayPage;
  type: OverlayType;
  x: number; y: number; w: number; h: number;      // millimetres (landscape A4 297x210)
  text?: string; font?: string; size: number; color: string;
  align: "left" | "center" | "right"; bold: boolean;
  fill?: string; stroke?: string; stroke_w: number; radius: number;
  src?: string;                                     // data URL or https URL
  opacity: number;                                  // 0..1
  iconName?: string;                                // lucide icon key, so icons can be re-coloured
}

// AI content controls — mirrors backend ContentConfig. Drives the report's system
// prompt + which graphs/sections appear. Absent -> backend Default (current output).
export interface ContentConfig {
  focus: string[];
  length: "concise" | "standard" | "detailed";
  tone: "formal" | "plain";
  audience: "client" | "internal" | "regulator";
  graphs: Record<string, boolean>;      // gauge|domain_bars|donut|heatmap|priority_matrix|cost_impact|trend
  sections_on: Record<string, boolean>; // exec_summary|buildings|corrective|key_recs|photos
  system_prompt?: string | null;        // free-form override; blank = assemble from the fields above
}

export interface ReportTemplate {
  name: string;
  palette: Palette;
  fonts: Fonts;
  branding: Branding;
  sections: Sections;
  section_styles: Record<string, SectionStyle>;   // per-section colour overrides
  spacing: number;                                 // 0.6..2.0 response spacing multiplier
  category_labels: Record<string, string>;
  overlays: Overlay[];
  content?: ContentConfig;                         // AI prompt + graph/section toggles (optional)
}

export const PAGE_W_MM = 297;
export const PAGE_H_MM = 210;

// Category slugs shown in the label editor (right side is what appears in the report).
export const DEFAULT_CATEGORY_LABELS: Record<string, string> = {
  general: "Site Details", security: "Security Assessment", fire_safety: "Fire Safety Audit",
  hvac: "HVAC & Mechanical", electrical: "Electrical Systems", plumbing: "Water Management",
  civil: "Civil & Structural", horticulture: "Horticulture / Landscaping",
  housekeeping: "Housekeeping & Sanitation", green_building: "Green Building Survey",
  sop_registers: "SOP, Logbook & Registers", inventory: "Inventory",
};

// Built-in presets so the Themes panel always works even if the backend is unreachable.
export function fallbackPresets(): ReportTemplate[] {
  const base = defaultTemplate();
  const mk = (name: string, palette: Partial<ReportTemplate["palette"]>, fonts: ReportTemplate["fonts"]): ReportTemplate =>
    ({ ...base, name, palette: { ...base.palette, ...palette }, fonts });
  return [
    mk("Modern Editorial", {}, { heading: "Work Sans", body: "Work Sans" }),
    mk("Corporate Professional",
      { ink: "#1a2332", blue: "#1e4e8c", lime: "#c8a15a", cream: "#ffffff", card: "#f5f7fa",
        line: "#d9dee7", muted: "#5a6472", green: "#2e7d47", amber: "#c98a1a", red: "#b03a3a" },
      { heading: "Merriweather", body: "Inter" }),
    mk("Minimal Mono",
      { ink: "#111111", blue: "#111111", lime: "#111111", cream: "#ffffff", card: "#fafafa",
        line: "#e5e5e5", muted: "#8a8a8a", green: "#111111", lime_g: "#444444", amber: "#7a7a7a", red: "#111111" },
      { heading: "Inter", body: "Inter" }),
    mk("Bold Vibrant",
      { ink: "#161032", blue: "#6c2bd9", lime: "#f5d90a", cream: "#fff9f0", line: "#efe0d8",
        muted: "#6b5f7a", green: "#0ca678", lime_g: "#37b24d", amber: "#f59f00", red: "#e8590c" },
      { heading: "Archivo", body: "DM Sans" }),
  ];
}

// A complete built-in default so the editor always has every field populated.
export function defaultTemplate(): ReportTemplate {
  return {
    name: "Modern Editorial",
    palette: {
      ink: "#0b0b0b", blue: "#2f5cff", lime: "#c3f53c", cream: "#faf8f0", card: "#ffffff",
      line: "#dfdbcd", muted: "#6b6b6b", green: "#16a34a", lime_g: "#65a30d", amber: "#f59e0b",
      red: "#dc2626", slate: "#94a3b8",
    },
    fonts: { heading: "Work Sans", body: "Work Sans" },
    branding: {
      brand: "Firmity", report_title: "Facility Health Report",
      back_cover_line: "This report was generated from an on-site facility survey.",
    },
    sections: {
      buildings: { eyebrow: "Section 01", title: "Assessment by Building",
        description: "A detailed walkthrough of every building and category surveyed." },
      corrective: { eyebrow: "Section 02", title: "Corrective Action Plan",
        description: "The prioritised remediation plan - what needs fixing and how urgently." },
      key_recs: { eyebrow: "Section 03", title: "Key Recommendations",
        description: "The highest-impact actions to improve this facility's health." },
    },
    section_styles: {},
    spacing: 1,
    category_labels: {},
    overlays: [],
  };
}

// ---- backend calls ----
export interface PresetsResponse { presets: ReportTemplate[]; fonts: string[] }

export async function getPresets(): Promise<PresetsResponse> {
  const res = await fetch(`${API}/templates/presets`, { headers: { ...(await authHeader()) } });
  if (!res.ok) throw new Error(`presets ${res.status}`);
  return res.json();
}

/** Render a sample report with the given template; returns an object URL for an <iframe>. */
export async function previewPdfUrl(config: ReportTemplate): Promise<string> {
  const res = await fetch(`${API}/templates/preview`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(await authHeader()) },
    body: JSON.stringify({ config }),
  });
  if (!res.ok) throw new Error(`preview ${res.status}`);
  const blob = await res.blob();
  return URL.createObjectURL(blob);
}

// ---- Supabase load/save (admin-gated by RLS) ----
export async function loadDefaultTemplate(): Promise<ReportTemplate> {
  const sb = getSupabaseBrowser();
  const { data } = await sb.from("report_templates").select("config").eq("is_default", true).limit(1).maybeSingle();
  const cfg = (data?.config ?? {}) as Partial<ReportTemplate>;
  return { ...defaultTemplate(), ...cfg } as ReportTemplate;
}

export async function saveDefaultTemplate(tpl: ReportTemplate): Promise<void> {
  const sb = getSupabaseBrowser();
  const { data } = await sb.from("report_templates").select("id").eq("is_default", true).limit(1).maybeSingle();
  if (data?.id) {
    const { error } = await sb.from("report_templates")
      .update({ name: tpl.name, config: tpl }).eq("id", data.id);
    if (error) throw error;
  } else {
    const { error } = await sb.from("report_templates")
      .insert({ name: tpl.name, is_default: true, config: tpl });
    if (error) throw error;
  }
}
