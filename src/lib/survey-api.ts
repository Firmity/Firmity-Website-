// Surveyor API client. Talks to the FastAPI backend for questions/answers/report,
// and to the same-origin Next route for photo uploads.

import { getSupabaseBrowser } from "./supabase-browser";

const API = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

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
  status: string;
  created_at: string;
}

export interface ReportResult {
  id: string;
  survey_id: string;
  pdf_url: string | null;
  docx_url: string | null;
  share_token: string | null;
  generated_at: string;
  ai_generated?: boolean; // false => AI narrative was unavailable; deterministic fallback used
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

export const saveProgress = (surveyId: string, progress: Record<string, boolean>) =>
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
