// Surveyor API client. Talks to the FastAPI backend for questions/answers/report,
// and to the same-origin Next route for photo uploads.

import { getSupabaseBrowser } from "./supabase-browser";

// API base resolution (in priority order):
//  1) NEXT_PUBLIC_API_BASE if set (production / explicit override).
//  2) In the browser with no override: derive from the current page host so LAN
//     testing works — on a phone at http://192.168.1.30:3000 this becomes
//     http://192.168.1.30:8000 (NOT localhost, which would be the phone itself).
//  3) SSR fallback.
function resolveApiBase(): string {
  const env = process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, "");
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    const onLan = host !== "localhost" && host !== "127.0.0.1";
    const envIsLocal = !env || /\/\/(localhost|127\.0\.0\.1)\b/.test(env);
    // Page served over the LAN (phone/tablet) but the configured base points at
    // localhost -> that host is THIS device, unreachable. Derive from the page host.
    if (onLan && envIsLocal) return `${window.location.protocol}//${host}:8000`;
    if (env) return env;
    return `${window.location.protocol}//${host}:8000`;
  }
  return env || "http://localhost:8000";
}
const API = resolveApiBase();

// Attach the signed-in staff user's Supabase token so FastAPI can verify it.
async function authHeader(): Promise<Record<string, string>> {
  try {
    const { data } = await getSupabaseBrowser().auth.getSession();
    const token = data.session?.access_token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

/**
 * Translate a batch of strings to `lang` via the backend (Gemini + DB cache).
 * English / unknown languages return identity. Never throws — on error the caller
 * keeps the English source.
 */
// Combine an optional caller signal with a hard timeout so a slow/hung provider
// (e.g. Google rate-limiting deep-translator) can never leave the UI "Translating…"
// forever. Falls back to a manual combiner where AbortSignal.any is unavailable.
function combineSignals(signals: AbortSignal[]): AbortSignal {
  const anyFn = (AbortSignal as unknown as { any?: (s: AbortSignal[]) => AbortSignal }).any;
  if (typeof anyFn === "function") return anyFn(signals);
  const ctrl = new AbortController();
  for (const s of signals) {
    if (s.aborted) {
      ctrl.abort();
      break;
    }
    s.addEventListener("abort", () => ctrl.abort(), { once: true });
  }
  return ctrl.signal;
}

const TRANSLATE_TIMEOUT_MS = 20000;

export async function apiTranslate(
  texts: string[],
  lang: string,
  signal?: AbortSignal
): Promise<Record<string, string>> {
  if (lang === "en" || texts.length === 0) return Object.fromEntries(texts.map((t) => [t, t]));
  const signals: AbortSignal[] = [AbortSignal.timeout(TRANSLATE_TIMEOUT_MS)];
  if (signal) signals.push(signal);
  const res = await fetch(`${API}/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(await authHeader()) },
    body: JSON.stringify({ texts, lang }),
    signal: combineSignals(signals),
  });
  if (!res.ok) throw new Error(`[TRANSLATE_HTTP_${res.status}]`);
  const data = (await res.json()) as { translations: Record<string, string> };
  return data.translations ?? {};
}

export type AnswerType = "choice" | "text" | "number" | "yes_no" | "rating" | "remarks" | "checklist";

// Sub-question answer types are the standard input set (no nested checklists).
export type SubAnswerType = "yes_no" | "rating" | "number" | "text";

export interface ChecklistItem {
  id: string;
  text: string;
  answer_type: SubAnswerType;
}

export interface Question {
  id: string;
  domain_slug: string;
  section: string | null;
  text: string;
  answer_type: AnswerType;
  needs_photo: boolean;
  facility_types: string[];
  sort_order: number;
  source?: "bank" | "custom"; // survey-scoped questions carry this so the UI can allow delete
  checklist?: ChecklistItem[]; // only when answer_type === "checklist"
}

export interface Domain {
  slug: string;
  name: string;
  is_per_building: boolean;
  is_key?: boolean;
  is_active?: boolean;
  sort_order: number;
}

export interface Block {
  name: string;
}

export interface Survey {
  id: string;
  facility_type: string;
  domain_slugs: string[];
  facility_name: string | null;
  facility_address: string | null;
  total_area: number | null;
  area_unit: string | null;
  blocks: Block[];
  preferred_dates: { date: string; window?: string }[];
  contact: Record<string, unknown>;
  deployment_plan: Record<string, unknown>;
  progress: Record<string, boolean>;
  na_sections: string[]; // ['<area>||<domain>'] sections marked not-applicable
  gate_located_at?: string | null;  // on-site GPS confirmed (server-persisted, cross-device)
  gate_verified_at?: string | null; // survey code confirmed (server-persisted, cross-device)
  assigned_to?: string | null;      // surveyor user id (admin-assigned)
  first_answer_at?: string | null;  // survey timer start (set on first answer sync)
  status: string;
  created_at: string;
}

// Area hierarchy colours — MUST mirror backend report_theme.py (AREA_BUILDING /
// AREA_FLOOR / AREA_ROOM) so the tree reads identically on screen and in the PDF.
// depth 0 = building (navy), 1 = floor (teal), 2+ = room/area (amber).
export const AREA_DEPTH_COLORS = ["#1E3A5F", "#0F766E", "#B45309"] as const;

export function areaDepthColor(depth: number): string {
  const i = Math.min(Math.max(depth, 0), AREA_DEPTH_COLORS.length - 1);
  return AREA_DEPTH_COLORS[i];
}

// ---- Area tree (arbitrary depth) ----
export interface SurveyArea {
  id: string;
  survey_id: string;
  parent_id: string | null; // null => top-level building
  name: string;
  kind: "building" | "area";
  sort_order: number;
}

// ---- Per-survey question instances (snapshots + custom) ----
export interface SurveyQuestion {
  id: string;
  survey_id: string;
  area_id: string | null;
  domain_slug: string;
  section: string | null;
  text: string;
  answer_type: AnswerType;
  needs_photo: boolean;
  checklist: ChecklistItem[];
  sort_order: number;
  source: "bank" | "custom";
  origin_question_id: string | null;
}

export interface ReportResult {
  id: string;
  survey_id: string;
  pdf_url: string | null;
  docx_url: string | null;
  share_token: string | null;
  generated_at: string;
  ai_generated?: boolean; // false => AI narrative was unavailable; deterministic fallback used
  duration_seconds?: number | null; // first_answer_at -> generated_at
  retry_after_seconds?: number | null; // set on LLM quota (429): seconds to wait before AI retry
}

export interface SavedAnswer {
  question_id: string;
  area: string;
  value: string | null;
  remark: string | null;
}

export interface AnswerPayload {
  question_id: string;
  area: string;
  value: string | null;
  remark: string | null;
  client_uuid: string;
}

async function http<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    "Content-Type": "application/json",
    ...(await authHeader()),
    ...((options.headers as Record<string, string>) || {}),
  };
  const res = await fetch(`${API}${path}`, { ...options, headers });
  if (!res.ok) {
    let detail = res.statusText;
    try {
      detail = (await res.json())?.detail ?? detail;
    } catch {
      /* non-JSON error body */
    }
    throw new Error(`${options.method || "GET"} ${path} -> ${res.status}: ${detail}`);
  }
  return res.status === 204 ? (null as T) : ((await res.json()) as T);
}

// --- Surveys ---
export const getSurvey = (surveyId: string) => http<Survey>(`/surveys/${surveyId}`);

export const getSavedAnswers = (surveyId: string) =>
  http<{ answers: SavedAnswer[] }>(`/surveys/${surveyId}/answers`);

export const syncAnswers = (surveyId: string, answers: AnswerPayload[]) =>
  http<{ synced: number }>(`/surveys/${surveyId}/answers`, {
    method: "POST",
    body: JSON.stringify({ answers }),
  });

export type ReportView = "domain" | "area" | "both";

export const generateReport = (surveyId: string, view: ReportView = "domain") =>
  http<ReportResult>(`/surveys/${surveyId}/report?view=${view}`, { method: "POST" });

// ---- on-site gating: GPS capture + survey-code verification ----
export const verifyCode = (surveyId: string, code: string) =>
  http<{ ok: boolean }>(`/surveys/${surveyId}/verify-code`, {
    method: "POST",
    body: JSON.stringify({ code }),
  });

export const recordVisit = (
  surveyId: string,
  loc: { lat: number; lng: number; accuracy?: number },
) =>
  http<{ ok: boolean; id?: string }>(`/surveys/${surveyId}/visit`, {
    method: "POST",
    body: JSON.stringify(loc),
  });

export const saveDeployment = (surveyId: string, plan: Record<string, unknown>) =>
  http<{ ok: boolean }>(`/surveys/${surveyId}/deployment`, {
    method: "PUT",
    body: JSON.stringify(plan),
  });

// Progress is a nested map (section -> { domain|flag: boolean }); the backend just
// stores the JSON, so accept any serialisable shape.
export const saveProgress = (surveyId: string, progress: Record<string, unknown>) =>
  http<{ ok: boolean }>(`/surveys/${surveyId}/progress`, {
    method: "PUT",
    body: JSON.stringify(progress),
  });

export const setStatus = (surveyId: string, status: string) =>
  http<{ ok: boolean }>(`/surveys/${surveyId}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });

// Replace the full not-applicable section list (keys: '<area>||<domain>').
export const saveNaSections = (surveyId: string, naSections: string[]) =>
  http<{ ok: boolean }>(`/surveys/${surveyId}/na`, {
    method: "PUT",
    body: JSON.stringify({ na_sections: naSections }),
  });

// --- Scoring (deterministic, computed server-side) ---
export interface DomainScore {
  domain: string;
  score: number;
  graded: number;
}
export interface Health {
  overall: number | null;
  grade: string;
  graded: number;
  domains: DomainScore[];
}
export interface CorrectiveAction {
  area: string;
  domain: string;
  question: string;
  finding: string | null;
  severity: "high" | "medium";
  remark: string;
  action: string;
}

export const getHealth = (surveyId: string) => http<Health>(`/surveys/${surveyId}/health`);

export const getActions = (surveyId: string) =>
  http<{ actions: CorrectiveAction[] }>(`/surveys/${surveyId}/actions`);

// --- Domains & Questions ---
export const getDomains = () => http<Domain[]>(`/domains`);

export const getQuestions = (domain: string, facilityType: string) =>
  http<Question[]>(
    `/questions?domain=${encodeURIComponent(domain)}&facility_type=${encodeURIComponent(facilityType)}`
  );

// All questions for several domains in ONE request (much faster survey load).
export const getQuestionsBatch = (domains: string[], facilityType: string) =>
  http<Question[]>(
    `/questions/batch?domains=${encodeURIComponent(domains.join(","))}&facility_type=${encodeURIComponent(facilityType)}`
  );

// --- Area tree (per-survey) ---
export const getAreas = (surveyId: string) =>
  http<SurveyArea[]>(`/surveys/${surveyId}/areas`);

// id is client-generated (UUID) so offline answers can reference the node immediately.
export const createArea = (
  surveyId: string,
  body: { id?: string; parent_id?: string | null; name: string; kind?: "building" | "area"; sort_order?: number }
) => http<SurveyArea>(`/surveys/${surveyId}/areas`, { method: "POST", body: JSON.stringify(body) });

export const updateArea = (
  surveyId: string,
  areaId: string,
  body: { name: string; parent_id?: string | null; kind?: "building" | "area"; sort_order?: number }
) => http<SurveyArea>(`/surveys/${surveyId}/areas/${areaId}`, { method: "PATCH", body: JSON.stringify(body) });

export const deleteArea = (surveyId: string, areaId: string) =>
  http<{ ok: boolean; deleted_areas: number }>(`/surveys/${surveyId}/areas/${areaId}`, { method: "DELETE" });

export const reorderAreas = (surveyId: string, orderedIds: string[]) =>
  http<{ ok: boolean }>(`/surveys/${surveyId}/areas/reorder`, {
    method: "PUT",
    body: JSON.stringify({ ordered_ids: orderedIds }),
  });

// --- Survey questions (per-survey instances) ---
export const getSurveyQuestions = (surveyId: string) =>
  http<SurveyQuestion[]>(`/surveys/${surveyId}/questions`);

export const addQuestionsFromBank = (surveyId: string, areaId: string | null, questionIds: string[]) =>
  http<SurveyQuestion[]>(`/surveys/${surveyId}/questions/from-bank`, {
    method: "POST",
    body: JSON.stringify({ area_id: areaId, question_ids: questionIds }),
  });

export interface CustomQuestionBody {
  id?: string;
  area_id?: string | null;
  domain_slug: string;
  section?: string | null;
  text: string;
  answer_type: AnswerType;
  needs_photo?: boolean;
  checklist?: ChecklistItem[];
}

export const addCustomQuestion = (surveyId: string, body: CustomQuestionBody) =>
  http<SurveyQuestion>(`/surveys/${surveyId}/questions/custom`, { method: "POST", body: JSON.stringify(body) });

export const updateSurveyQuestion = (surveyId: string, sqId: string, body: CustomQuestionBody) =>
  http<SurveyQuestion>(`/surveys/${surveyId}/questions/${sqId}`, { method: "PATCH", body: JSON.stringify(body) });

export const deleteSurveyQuestion = (surveyId: string, sqId: string) =>
  http<{ ok: boolean }>(`/surveys/${surveyId}/questions/${sqId}`, { method: "DELETE" });

export const reorderSurveyQuestions = (surveyId: string, orderedIds: string[]) =>
  http<{ ok: boolean }>(`/surveys/${surveyId}/questions/reorder`, {
    method: "PUT",
    body: JSON.stringify({ ordered_ids: orderedIds }),
  });

// --- Admin: create a survey directly (role-gated server-side) ---
export interface AdminSurveyBody {
  facility_type: string;
  domain_slugs: string[];
  facility_name?: string | null;
  facility_address?: string | null;
  total_area?: number | null;
  area_unit?: "sqft" | "acres" | null;
  blocks?: { name: string; notes?: string | null }[];
  preferred_dates?: { date: string; window?: string }[];
  contact?: Record<string, unknown> | null;
  form_payload?: Record<string, unknown>;
  assigned_to?: string | null;
}

export const adminCreateSurvey = (body: AdminSurveyBody) =>
  http<Survey>(`/surveys/admin`, { method: "POST", body: JSON.stringify(body) });

// --- Photos (same-origin Next route; keeps the Supabase service key server-side) ---
export async function uploadPhoto(
  surveyId: string,
  questionId: string,
  area: string,
  file: File,
  subId?: string
): Promise<{ url: string }> {
  const fd = new FormData();
  fd.append("survey_id", surveyId);
  fd.append("question_id", questionId);
  fd.append("area", area);
  if (subId) fd.append("sub_id", subId);
  fd.append("file", file);
  const res = await fetch("/api/survey-photo", { method: "POST", body: fd });
  if (!res.ok) {
    const msg = (await res.json().catch(() => ({})))?.error ?? res.statusText;
    throw new Error(`uploadPhoto -> ${res.status}: ${msg}`);
  }
  return res.json();
}

/** Remove a previously uploaded photo (deletes the DB row + the Storage object). */
export async function deletePhoto(surveyId: string, url: string): Promise<void> {
  const res = await fetch("/api/survey-photo", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ survey_id: surveyId, url }),
  });
  if (!res.ok) {
    const msg = (await res.json().catch(() => ({})))?.error ?? res.statusText;
    throw new Error(`deletePhoto -> ${res.status}: ${msg}`);
  }
}
