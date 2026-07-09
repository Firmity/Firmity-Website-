"use client";
// One question. Input by answer_type with semantic pastel colors:
//   Good/Yes -> green · Satisfactory -> amber · Unsatisfactory/No -> red
//   N/A -> slate · Numbered -> sky.
// Cards have a tinted (non-white) background so they stand out from the page.
//
// A "checklist" question renders a parent header + typed sub-questions, each with
// its own control, remark, and photo. Sub-answers are serialised into the answer
// row as JSON maps: value = {subId: value}, remark = {subId: remark}.

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Camera, Image as ImageIcon, Languages, Loader2, RotateCcw } from "lucide-react";
import type { Question, SubAnswerType } from "@/src/lib/survey-api";
import { PHOTO_SUB_SEP } from "@/src/hooks/useSurveyAnswers";
import { translateNow, useTranslator } from "@/src/lib/i18n";
import { useSurveyLang } from "@/src/components/survey/SurveyLangContext";

// identity translator default so sub-components work without i18n wiring.
type TFn = (s: string) => string;
const IDENT: TFn = (s) => s;

interface AnswerState {
  value: string;
  remark: string;
}

const CHOICES = ["Yes", "No", "N/A"] as const;
const RATINGS = ["Good", "Satisfactory", "Unsatisfactory"] as const;
// Reserved key in a checklist's value map holding the parent gate answer.
// Must match GATE_KEY in the backend scoring service.
const GATE_KEY = "__gate";

type PaletteKey = "green" | "amber" | "red" | "slate" | "sky";
const PALETTE: Record<PaletteKey, [string, string]> = {
  green: ["bg-green-500 text-white border-green-500", "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"],
  amber: ["bg-amber-400 text-white border-amber-400", "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"],
  red: ["bg-red-500 text-white border-red-500", "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"],
  slate: ["bg-slate-700 text-white border-slate-700", "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"],
  sky: ["bg-sky-500 text-white border-sky-500", "bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100"],
};
function btn(color: PaletteKey, selected: boolean) {
  const [on, off] = PALETTE[color];
  return `px-3 py-1.5 rounded-lg border text-sm font-medium transition ${selected ? on : off}`;
}
const RATING_COLOR: Record<string, PaletteKey> = { Good: "green", Satisfactory: "amber", Unsatisfactory: "red" };
const CHOICE_COLOR: Record<string, PaletteKey> = { Yes: "green", No: "red", "N/A": "slate" };

const CARD = "rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm";
const FIELD = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400";

interface Props {
  question: Question;
  area: string;
  answer?: AnswerState;
  photos: Record<string, string[]>; // whole photos map (keyed by base + optional sub)
  photoBaseKey: string;             // keyFor(area, question.id)
  onField: (area: string, questionId: string, field: "value" | "remark", val: string) => void;
  onPhoto: (area: string, questionId: string, file: File, subId?: string) => void;
}

function isNumberValue(v: string) {
  return v !== "" && !CHOICES.includes(v as (typeof CHOICES)[number]);
}
function parseMap(raw: string): Record<string, string> {
  if (!raw) return {};
  try {
    const v = JSON.parse(raw);
    return v && typeof v === "object" && !Array.isArray(v) ? v : {};
  } catch {
    return {};
  }
}

function ChoiceInput({ value, setValue, t = IDENT }: { value: string; setValue: (v: string) => void; t?: TFn }) {
  const [numActive, setNumActive] = useState(() => isNumberValue(value));
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {CHOICES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => { setNumActive(false); setValue(value === c ? "" : c); }}
            className={btn(CHOICE_COLOR[c], !numActive && value === c)}
          >
            {c === "N/A" ? t("Not Applicable") : t(c)}
          </button>
        ))}
        <button
          type="button"
          onClick={() => { setNumActive(true); if (CHOICES.includes(value as (typeof CHOICES)[number])) setValue(""); }}
          className={btn("sky", numActive)}
        >
          {t("Numbered")}
        </button>
      </div>
      {numActive && (
        <input
          type="number"
          inputMode="decimal"
          value={isNumberValue(value) ? value : ""}
          onChange={(e) => setValue(e.target.value)}
          placeholder={t("Enter a number")}
          className={FIELD}
        />
      )}
    </>
  );
}

// Renders the right control for a given answer type (used for sub-questions and
// the yes_no/rating/text/number top-level cases).
function TypedControl({ type, value, setValue, t = IDENT }: { type: SubAnswerType | "choice"; value: string; setValue: (v: string) => void; t?: TFn }) {
  if (type === "rating") {
    return (
      <div className="flex flex-wrap gap-2">
        {RATINGS.map((r) => (
          <button key={r} type="button" onClick={() => setValue(value === r ? "" : r)} className={btn(RATING_COLOR[r], value === r)}>
            {t(r)}
          </button>
        ))}
        {/* Not Applicable — excluded from the health score and AI report */}
        <button type="button" onClick={() => setValue(value === "N/A" ? "" : "N/A")} className={btn("slate", value === "N/A")}>
          {t("Not Applicable")}
        </button>
      </div>
    );
  }
  if (type === "text") {
    return <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder={t("Enter details")} className={FIELD} />;
  }
  if (type === "number") {
    return <input type="number" inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} placeholder={t("Enter a number")} className={FIELD} />;
  }
  return <ChoiceInput value={value} setValue={setValue} t={t} />; // yes_no | choice
}

function PhotoButton({ photos, onFile }: { photos: string[]; onFile: (f: File) => void }) {
  const camRef = useRef<HTMLInputElement | null>(null);
  const galRef = useRef<HTMLInputElement | null>(null);
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) onFile(f);
    e.target.value = "";
  };
  return (
    <>
      {photos.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {photos.map((url) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={url} src={url} alt="survey" className="h-16 w-16 rounded-lg border border-slate-200 object-cover" />
          ))}
        </div>
      )}
      {/* Camera: `capture=environment` opens the rear camera directly on phones/tablets. */}
      <input ref={camRef} type="file" accept="image/*" capture="environment" onChange={handle} className="hidden" />
      {/* Gallery: no `capture` -> the normal file/photo picker. */}
      <input ref={galRef} type="file" accept="image/*" onChange={handle} className="hidden" />
      <div className="flex flex-wrap gap-2 self-start">
        <button
          type="button"
          onClick={() => camRef.current?.click()}
          className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          <Camera className="h-4 w-4" /> Take photo
        </button>
        <button
          type="button"
          onClick={() => galRef.current?.click()}
          className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-600 hover:border-slate-400"
        >
          <ImageIcon className="h-4 w-4" /> Gallery
        </button>
      </div>
    </>
  );
}

function QuestionCard({ question, area, answer, photos, photoBaseKey, onField, onPhoto }: Props) {
  const a = answer ?? { value: "", remark: "" };
  const setValue = useCallback((v: string) => onField(area, question.id, "value", v), [onField, area, question.id]);
  const setRemark = useCallback((v: string) => onField(area, question.id, "remark", v), [onField, area, question.id]);
  const reset = useCallback(() => { setValue(""); setRemark(""); }, [setValue, setRemark]);

  const ResetBtn = (
    <button type="button" onClick={reset} aria-label="Reset this question" title="Reset to none" className="shrink-0 text-slate-400 hover:text-slate-600">
      <RotateCcw className="h-4 w-4" />
    </button>
  );

  // Per-question Not Applicable: value "N/A" is excluded from the health score AND the
  // AI report. A universal toggle so rating/text/number questions get N/A too.
  const isNaSelf = a.value === "N/A";
  const toggleNaSelf = useCallback(() => setValue(isNaSelf ? "" : "N/A"), [isNaSelf, setValue]);
  const NaBtn = (
    <button
      type="button"
      onClick={toggleNaSelf}
      title={isNaSelf ? "Mark applicable" : "Not applicable (excluded from score & report)"}
      className={`shrink-0 rounded-md border px-1.5 py-1 text-[10px] font-semibold transition ${
        isNaSelf ? "border-slate-700 bg-slate-700 text-white" : "border-slate-200 bg-slate-100 text-slate-500 hover:bg-slate-200"
      }`}
    >
      N/A
    </button>
  );
  const NaNote = (
    <p className="rounded-lg border border-dashed border-slate-300 bg-white p-3 text-sm text-slate-500">
      Marked Not Applicable — excluded from the health score and report.
    </p>
  );

  const t = question.answer_type;

  // ---- i18n: PER-QUESTION, on-demand translation (with cancel) ----
  // Nothing is translated until the surveyor taps this card's translate icon; the
  // request covers only this question + its sub-questions + option labels, and can
  // be cancelled (or is auto-cancelled when the survey language changes).
  const { lang } = useSurveyLang();
  const tx = useTranslator(lang);
  const [translated, setTranslated] = useState(false);
  const [translating, setTranslating] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const cardStrings = useMemo(
    () => [
      question.text,
      ...(question.checklist ?? []).map((s) => s.text),
      "Yes", "No", "Not Applicable", "Numbered",
      "Good", "Satisfactory", "Unsatisfactory",
      "Enter details", "Enter a number",
    ],
    [question]
  );

  // Show translations only after the user opts in for THIS card.
  const T = useCallback((s: string) => (translated ? tx(s) : s), [translated, tx]);

  const onTranslate = useCallback(async () => {
    if (translating) {                 // running -> cancel
      abortRef.current?.abort();
      abortRef.current = null;
      setTranslating(false);
      return;
    }
    if (translated) {                  // already translated -> revert to original
      setTranslated(false);
      return;
    }
    if (lang === "en") return;
    const ac = new AbortController();
    abortRef.current = ac;
    setTranslating(true);
    await translateNow(cardStrings, lang, ac.signal);
    if (abortRef.current === ac) {
      abortRef.current = null;
      setTranslating(false);
      if (!ac.signal.aborted) setTranslated(true);
    }
  }, [translating, translated, lang, cardStrings]);

  // Switching the survey language cancels any in-flight translation and drops this
  // card back to the original until the surveyor translates again.
  useEffect(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setTranslating(false);
    setTranslated(false);
  }, [lang]);

  const TranslateBtn =
    lang === "en" ? null : (
      <button
        type="button"
        onClick={onTranslate}
        title={translating ? "Cancel translation" : translated ? "Show original" : "Translate this question"}
        aria-label="Translate this question"
        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition ${
          translating
            ? "border-amber-200 bg-amber-50 text-amber-700"
            : translated
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-slate-200 bg-slate-100 text-slate-500 hover:bg-slate-200"
        }`}
      >
        {translating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Languages className="h-4 w-4" />}
      </button>
    );

  // ---- Checklist: a Yes/No/N-A gate + typed sub-questions ----
  // The parent acts as a gate ("is this present / applicable?"). Only a "Yes"
  // reveals the sub-questions; No / Not-Applicable hides them and excludes the
  // whole checklist from the AI, scoring, and the report.
  if (t === "checklist") {
    const items = question.checklist ?? [];
    const valueMap = parseMap(a.value);
    const remarkMap = parseMap(a.remark);
    const gate = valueMap[GATE_KEY] ?? "";
    const setGate = (v: string) => onField(area, question.id, "value", JSON.stringify({ ...valueMap, [GATE_KEY]: v }));
    const setParentRemark = (v: string) => onField(area, question.id, "remark", JSON.stringify({ ...remarkMap, [GATE_KEY]: v }));
    const setSub = (field: "value" | "remark", subId: string, v: string) => {
      const map = field === "value" ? { ...valueMap, [subId]: v } : { ...remarkMap, [subId]: v };
      onField(area, question.id, field, JSON.stringify(map));
    };
    const open = gate === "Yes";
    const absent = gate === "No";  // item not present -> a finding (kept in report/scoring)
    const na = gate === "N/A";     // not applicable -> skipped entirely
    return (
      <div className={CARD}>
        <div className="mb-2 flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-slate-800">{T(question.text)}</p>
          {TranslateBtn}
        </div>

        {/* Gate */}
        <div className="flex flex-wrap gap-2">
          {CHOICES.map((c) => (
            <button key={c} type="button" onClick={() => setGate(gate === c ? "" : c)} className={btn(CHOICE_COLOR[c], gate === c)}>
              {c === "N/A" ? T("Not Applicable") : T(c)}
            </button>
          ))}
        </div>

        {!gate && <p className="mt-2 text-xs text-slate-400">Answer above to continue.</p>}

        {absent && (
          <div className="mt-3 flex flex-col gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-700">Recorded as <strong>not present at the site</strong> — this is flagged in the report.</p>
            <textarea
              value={remarkMap[GATE_KEY] ?? ""}
              onChange={(e) => setParentRemark(e.target.value)}
              placeholder="Add context (optional) — e.g. why it's missing or where it should be"
              rows={2}
              className={FIELD}
            />
          </div>
        )}

        {na && (
          <p className="mt-3 rounded-lg border border-dashed border-slate-300 bg-white p-3 text-sm text-slate-500">
            Marked Not Applicable — the checklist is skipped and won&apos;t appear in the report.
          </p>
        )}

        {open && (
          <div className="mt-3 flex flex-col gap-3">
            {items.length === 0 && <p className="text-xs text-slate-400">No sub-questions configured.</p>}
            {items.map((sub, i) => {
              const subPhotos = photos[`${photoBaseKey}${PHOTO_SUB_SEP}${sub.id}`] ?? [];
              return (
                <div key={sub.id} className="rounded-lg border border-slate-200 bg-white p-3">
                  <p className="mb-2 text-sm font-medium text-slate-700">{i + 1}. {T(sub.text)}</p>
                  <div className="flex flex-col gap-2">
                    <TypedControl type={sub.answer_type} value={valueMap[sub.id] ?? ""} setValue={(v) => setSub("value", sub.id, v)} t={T} />
                    <textarea
                      value={remarkMap[sub.id] ?? ""}
                      onChange={(e) => setSub("remark", sub.id, e.target.value)}
                      placeholder="Remarks (optional)"
                      rows={2}
                      className={FIELD}
                    />
                    <PhotoButton photos={subPhotos} onFile={(f) => onPhoto(area, question.id, f, sub.id)} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  const myPhotos = photos[photoBaseKey] ?? [];

  // ---- Remarks-only ----
  if (t === "remarks") {
    return (
      <div className={CARD}>
        <div className="mb-2 flex items-start justify-between gap-3">
          <p className="text-sm font-medium text-slate-800">{T(question.text)}</p>
          <div className="flex shrink-0 items-center gap-2.5">
            {TranslateBtn}
            {NaBtn}
            <span className="h-6 w-px bg-slate-200" />
            {ResetBtn}
          </div>
        </div>
        {isNaSelf ? NaNote : (
          <textarea
            value={a.remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Enter notes, observations, or suggestions for the AI report"
            rows={6}
            className={FIELD}
          />
        )}
      </div>
    );
  }

  // ---- Standard single-answer question ----
  return (
    <div className={CARD}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-slate-800">{T(question.text)}</p>
        <div className="flex shrink-0 items-center gap-2.5">
          {question.needs_photo && <span className="rounded-md bg-amber-100 px-2 py-0.5 text-xs text-amber-700">photo</span>}
          {TranslateBtn}
          {t === "text" && NaBtn}
          <span className="h-6 w-px bg-slate-200" />
          {ResetBtn}
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {isNaSelf && t === "text" ? NaNote : (
          <>
            <TypedControl type={t === "rating" ? "rating" : t === "text" ? "text" : "choice"} value={a.value} setValue={setValue} t={T} />
            <textarea value={a.remark} onChange={(e) => setRemark(e.target.value)} placeholder="Remarks (optional)" rows={2} className={FIELD} />
            <PhotoButton photos={myPhotos} onFile={(f) => onPhoto(area, question.id, f)} />
          </>
        )}
      </div>
    </div>
  );
}

export default memo(QuestionCard);
