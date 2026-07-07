"use client";
// Surveyor screen: sidebar sections + domain sub-tabs, per-tab completion with
// auto-advance, badges/celebration, explicit Save, and a leave-guard modal.

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Activity, AlertTriangle, Award, Check, CheckCircle2, ChevronDown, ChevronLeft, RotateCcw, Save } from "lucide-react";
import { useSurveyAnswers, STAFF_AREA } from "@/src/hooks/useSurveyAnswers";
import FacilityDetails from "@/src/components/survey/FacilityDetails";
import SurveyTabs from "@/src/components/survey/SurveyTabs";
import SurveySidebar from "@/src/components/survey/SurveySidebar";
import StaffProfile from "@/src/components/survey/StaffProfile";
import Celebration from "@/src/components/survey/Celebration";
import ProfileMenu from "@/src/components/survey/ProfileMenu";
import ReportModal from "@/src/components/survey/ReportModal";
import SurveyGate from "@/src/components/survey/SurveyGate";
import SurveyCodeCard from "@/src/components/survey/SurveyCodeCard";
import OfflineBanner from "@/src/components/survey/OfflineBanner";
import HealthPanel from "@/src/components/survey/HealthPanel";
import { recordAward } from "@/src/lib/awards";
import { getSupabaseBrowser } from "@/src/lib/supabase-browser";
import { cacheGet, cacheSet } from "@/src/lib/offline";
import { saveProgress, saveNaSections, setStatus, type ReportResult, type ReportView } from "@/src/lib/survey-api";

const FACILITY = "Facility Details";
const FACILITY_LEVEL = new Set(["Site Profile", "Staff Profile", "Client Pain Areas", "UREST Suggestion"]);
const VIEW_OPTIONS: { value: ReportView; label: string }[] = [
  { value: "domain", label: "Domain-wise report" },
  { value: "area", label: "Area-wise report" },
  { value: "both", label: "Both (domain + area)" },
];

type Progress = Record<string, Record<string, boolean>>;

export default function SurveyPage() {
  const params = useParams();
  const id = String(params?.id ?? "");
  const {
    survey, areas, domainsByArea, questionsByDomain, domainMeta,
    answers, photos, loading, saving, error, hasUnsaved,
    answeredCount, totalCount, online, pending, fromCache,
    keyFor, setField, addPhoto, submitReport, flush, discard,
  } = useSurveyAnswers(id);

  const [active, setActive] = useState(FACILITY);
  const [activeDomain, setActiveDomain] = useState("");
  const [progress, setProgress] = useState<Progress>({});
  const [naSections, setNaSections] = useState<Set<string>>(new Set());
  const [marked, setMarked] = useState(false);
  const [celebrating, setCelebrating] = useState<string | null>(null);
  const [reporting, setReporting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHealth, setShowHealth] = useState(false);
  const [report, setReport] = useState<ReportResult | null>(null);
  const [reportErr, setReportErr] = useState<string | null>(null);
  const lastViewRef = useRef<ReportView>("domain"); // remember the view for "Regenerate with AI"
  const [showLeave, setShowLeave] = useState(false);
  const [leaveTo, setLeaveTo] = useState("/surveys");
  const [savedToast, setSavedToast] = useState(false);
  const [saveMsg, setSaveMsg] = useState("Progress saved");
  const topRef = useRef<HTMLDivElement | null>(null);
  const leavingRef = useRef(false);
  // Two-phase on-site gate for SURVEYORS (admins skip both):
  //   locOk   — GPS verified -> Facility Details page becomes visible.
  //   started — survey code verified (on the Facility Details page) -> rest unlocks.
  // Remembered per-session so a refresh mid-survey doesn't re-prompt.
  const [locOk, setLocOk] = useState(false);
  const [started, setStarted] = useState(false);
  const [gateReady, setGateReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // admins see the on-site map; surveyors don't
  useEffect(() => {
    (async () => {
      try {
        if (sessionStorage.getItem(`survey_started_${id}`) === "1") {
          setLocOk(true); setStarted(true); setGateReady(true); return;
        }
        if (sessionStorage.getItem(`survey_loc_${id}`) === "1") setLocOk(true);
      } catch { /* sessionStorage unavailable */ }
      try {
        const sb = getSupabaseBrowser();
        const { data: { user } } = await sb.auth.getUser();
        if (user) {
          const { data: prof } = await sb.from("profiles").select("role").eq("id", user.id).single();
          if (prof?.role === "admin") { setIsAdmin(true); setLocOk(true); setStarted(true); } // admins skip the gate
        }
      } catch { /* default to gated for surveyors */ }
      setGateReady(true);
    })();
  }, [id]);

  // While a surveyor is located-but-not-started, keep them on Facility Details.
  useEffect(() => {
    if (locOk && !started) setActive(FACILITY);
  }, [locOk, started]);

  const touched = hasUnsaved || marked;

  useEffect(() => {
    if (survey) {
      setProgress((survey.progress as Progress) || {});
      setNaSections(new Set(survey.na_sections ?? []));
    }
  }, [survey?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Toggle a section not-applicable: update local set, persist the full list,
  // and mark the section touched so the leave-guard prompts to save.
  function toggleNa(area: string, domain: string, next: boolean) {
    const key = `${area}||${domain}`;
    setNaSections((prev) => {
      const s = new Set(prev);
      if (next) s.add(key);
      else s.delete(key);
      saveNaSections(id, [...s]).catch(() => {});
      return s;
    });
    setMarked(true);
  }

  useEffect(() => {
    setActiveDomain((domainsByArea[active] ?? [])[0] ?? "");
  }, [active, domainsByArea]);

  // guard leaving with unsaved work (browser back / refresh / close)
  useEffect(() => {
    if (!touched) return;
    const onBefore = (e: BeforeUnloadEvent) => {
      if (leavingRef.current) return;
      e.preventDefault();
      e.returnValue = "";
    };
    const onPop = () => {
      if (leavingRef.current) return;
      setLeaveTo("/surveys");
      setShowLeave(true);
      window.history.pushState(null, "", window.location.href);
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("beforeunload", onBefore);
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("beforeunload", onBefore);
      window.removeEventListener("popstate", onPop);
    };
  }, [touched]);

  const sections = useMemo(() => [FACILITY, ...areas], [areas]);
  const buildingSet = useMemo(
    () => new Set(areas.filter((a) => a !== STAFF_AREA && !FACILITY_LEVEL.has(a))),
    [areas]
  );

  const sectionComplete = (area: string, prog: Progress): boolean => {
    if (area === FACILITY) return false;
    const ds = domainsByArea[area] ?? [];
    if (ds.length === 0) return !!prog[area]?.__self;
    // A domain counts as done when explicitly completed OR marked not-applicable.
    return ds.every((d) => prog[area]?.[d] || naSections.has(`${area}||${d}`));
  };
  const completedSections = useMemo(
    () => new Set(sections.filter((s) => sectionComplete(s, progress))),
    [sections, progress, domainsByArea, naSections]
  );

  // When every non-facility section is complete, flip status to 'ready' (report pending)
  // exactly once, so the dashboard reflects it. Guarded by a ref to avoid re-fires.
  const surveySections = sections.filter((s) => s !== FACILITY);
  const allSectionsComplete =
    surveySections.length > 0 && surveySections.every((s) => completedSections.has(s));
  const readyRef = useRef(false);
  useEffect(() => {
    if (!allSectionsComplete || !survey || readyRef.current) return;
    if (survey.status === "reported" || survey.status === "ready") return;
    readyRef.current = true;
    setStatus(survey.id, "ready").catch(() => {});
  }, [allSectionsComplete, survey]);

  // On reconnect, push any completion map that was saved offline, then clear it.
  useEffect(() => {
    if (!online) return;
    const pending = cacheGet<Progress>(id, "progress-pending");
    if (!pending) return;
    saveProgress(id, pending)
      .then(() => cacheSet(id, "progress-pending", null))
      .catch(() => {});
  }, [online, id]);

  const currentDone = (() => {
    const ds = domainsByArea[active] ?? [];
    const dk = ds.length === 0 ? "__self" : activeDomain;
    if (activeDomain && naSections.has(`${active}||${activeDomain}`)) return true;
    return !!progress[active]?.[dk];
  })();

  function scrollTop() {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function goToNextSection(area: string) {
    const next = sections[sections.indexOf(area) + 1];
    if (next) { setActive(next); scrollTop(); }
  }

  function completeCurrent() {
    if (active === FACILITY) return;
    const ds = domainsByArea[active] ?? [];
    const dk = ds.length === 0 ? "__self" : activeDomain;
    const areaProg = { ...(progress[active] || {}), [dk]: true };
    const next = { ...progress, [active]: areaProg };
    setProgress(next);
    setMarked(true);
    persistProgress(next);

    const nowComplete = ds.length === 0 ? true : ds.every((d) => areaProg[d]);
    if (nowComplete) {
      recordAward(id, active, survey?.facility_name ?? null).catch(() => {});
      setCelebrating(active);
    } else {
      const idx = ds.indexOf(activeDomain);
      const nextTab = ds.slice(idx + 1).find((d) => !areaProg[d]) ?? ds.find((d) => !areaProg[d]);
      if (nextTab) { setActiveDomain(nextTab); scrollTop(); }
    }
  }

  // Undo an accidental mark-complete: clears the completion flag for the active
  // domain (or the section's __self) and re-persists. NA sections are untouched
  // here — they have their own checkbox.
  function uncompleteCurrent() {
    if (active === FACILITY) return;
    const ds = domainsByArea[active] ?? [];
    const dk = ds.length === 0 ? "__self" : activeDomain;
    const areaProg = { ...(progress[active] || {}) };
    delete areaProg[dk];
    const next = { ...progress, [active]: areaProg };
    setProgress(next);
    setMarked(true);
    readyRef.current = false; // allow status to re-evaluate if it had flipped to ready
    persistProgress(next);
  }

  async function handleGenerate(view: ReportView) {
    lastViewRef.current = view; // remember for "Regenerate with AI"
    setMenuOpen(false);
    setReporting(true);
    setReportErr(null);
    setReport(null);
    try {
      setReport(await submitReport(view));
    } catch (e) {
      setReportErr((e as Error).message);
    } finally {
      setReporting(false);
    }
  }

  // Persist section-completion. When the network is unavailable (offline OR the
  // server is unreachable), the map is cached on the device and re-sent on
  // reconnect — the surveyor never sees a hard error for a transient outage.
  async function persistProgress(next: Progress): Promise<boolean> {
    if (!online) {
      cacheSet(id, "progress-pending", next);
      return false;
    }
    try {
      await saveProgress(id, next);
      return true;
    } catch {
      cacheSet(id, "progress-pending", next);
      return false;
    }
  }

  async function handleSave() {
    await flush(); // answers -> outbox (+ server if online)
    setMarked(false);
    const ok = await persistProgress(progress);
    setSaveMsg(ok ? "Progress saved" : "Saved on this device — will sync when you're back online");
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), ok ? 1600 : 2600);
  }

  function requestLeave(dest: string) {
    if (touched) { setLeaveTo(dest); setShowLeave(true); }
    else window.location.assign(dest);
  }
  function doLeave() {
    leavingRef.current = true;
    window.location.assign(leaveTo || "/surveys");
  }
  async function saveAndLeave() {
    await flush();
    await persistProgress(progress);
    doLeave();
  }
  function discardAndLeave() {
    discard();
    doLeave();
  }

  if (loading) return <Centered>Loading survey…</Centered>;
  if (error && !survey) return <Centered tone="error">Could not load survey: {error}</Centered>;
  if (!survey) return <Centered tone="error">Survey not found.</Centered>;

  const isFacility = active === FACILITY;

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      {gateReady && !locOk && (
        <SurveyGate
          surveyId={id}
          facilityName={survey?.facility_name}
          onLocated={() => {
            try { sessionStorage.setItem(`survey_loc_${id}`, "1"); } catch { /* ignore */ }
            setLocOk(true);
            setActive(FACILITY); // land on Facility Details to read contacts + enter the code
          }}
        />
      )}
      <header className="sticky top-0 z-20 -mx-4 mb-6 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur">
        <button
          type="button"
          onClick={() => requestLeave("/surveys")}
          className="mb-2 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800"
        >
          <ChevronLeft className="h-4 w-4" /> Surveys
        </button>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">{survey.facility_name || "Facility Survey"}</h1>
            <p className="text-xs text-slate-500">
              {survey.facility_type} · {answeredCount}/{totalCount} answered · {completedSections.size} section
              {completedSections.size === 1 ? "" : "s"} complete{saving && " · saving…"}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={async () => { await flush(); setShowHealth(true); }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                <Activity className="h-4 w-4" /> Health
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                <Save className="h-4 w-4" /> Save
              </button>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen((o) => !o)}
                  disabled={reporting}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                >
                  {reporting ? "Generating…" : <>Generate Report <ChevronDown className="h-4 w-4" /></>}
                </button>
                {menuOpen && !reporting && (
                  <div className="absolute right-0 z-30 mt-1 w-56 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
                    {VIEW_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleGenerate(opt.value)}
                        className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <ProfileMenu />
            </div>
            {completedSections.size > 0 && (
              <div className="flex max-w-xs flex-wrap justify-end gap-1.5">
                {[...completedSections].map((s) => (
                  <span key={s} title={s} className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100">
                    <Award className="h-3.5 w-3.5 text-amber-600" />
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <OfflineBanner online={online} pending={pending} fromCache={fromCache} />

      <ReportModal
        generating={reporting}
        report={report}
        error={reportErr}
        onClose={() => { setReport(null); setReportErr(null); }}
        onRegenerate={() => handleGenerate(lastViewRef.current)}
      />

      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        <SurveySidebar
          sections={sections}
          active={active}
          completed={completedSections}
          buildings={buildingSet}
          onSelect={(s: string) => { if (started || s === FACILITY) setActive(s); }} // locked until code verified
        />

        <div ref={topRef} className="min-w-0 flex-1 scroll-mt-24">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">{active}</h2>

          {isFacility ? (
            <>
              {!started && (
                <SurveyCodeCard
                  surveyId={id}
                  onVerified={() => {
                    try { sessionStorage.setItem(`survey_started_${id}`, "1"); } catch { /* ignore */ }
                    setStarted(true);
                  }}
                />
              )}
              <FacilityDetails survey={survey} domainMeta={domainMeta} showMap={isAdmin} />
            </>
          ) : (
            <SurveyTabs
              activeArea={active}
              activeDomain={activeDomain}
              onDomainChange={setActiveDomain}
              domainsByArea={domainsByArea}
              questionsByDomain={questionsByDomain}
              domainMeta={domainMeta}
              answers={answers}
              photos={photos}
              completedDomains={progress[active] || {}}
              keyFor={keyFor}
              onField={setField}
              onPhoto={addPhoto}
              staffArea={STAFF_AREA}
              staffNode={<StaffProfile surveyId={id} initial={survey.deployment_plan} />}
              naKeys={naSections}
              onToggleNa={toggleNa}
            />
          )}

          {!isFacility && (
            <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-4">
              <button
                type="button"
                onClick={completeCurrent}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  currentDone
                    ? "border border-green-300 bg-green-50 text-green-700 hover:bg-green-100"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {currentDone ? <Check className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                {currentDone ? "Completed — continue" : "Mark complete & continue"}
              </button>
              {/* Undo appears only for explicit completion (not NA sections). */}
              {(() => {
                const ds = domainsByArea[active] ?? [];
                const dk = ds.length === 0 ? "__self" : activeDomain;
                return !!progress[active]?.[dk];
              })() && (
                <button
                  type="button"
                  onClick={uncompleteCurrent}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                >
                  <RotateCcw className="h-4 w-4" /> Undo
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {celebrating && (
        <Celebration
          name={celebrating}
          onDone={() => {
            const area = celebrating;
            setCelebrating(null);
            if (area) goToNextSection(area);
          }}
        />
      )}

      {showLeave && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <span className="font-semibold text-slate-900">Leave this survey?</span>
            </div>
            <p className="mb-5 text-sm text-slate-600">Do you want to save your changes before leaving?</p>
            <div className="flex flex-wrap justify-end gap-2">
              <button type="button" onClick={() => setShowLeave(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                Cancel
              </button>
              <button type="button" onClick={discardAndLeave} className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
                Discard &amp; leave
              </button>
              <button type="button" onClick={saveAndLeave} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
                Save &amp; leave
              </button>
            </div>
          </div>
        </div>
      )}

      {savedToast && (
        <div className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm text-white shadow-lg">
          <Check className="h-4 w-4 text-green-400" /> {saveMsg}
        </div>
      )}

      {showHealth && (
        <HealthPanel
          surveyId={id}
          domainLabel={(slug) => domainMeta[slug]?.name ?? slug}
          onClose={() => setShowHealth(false)}
        />
      )}
    </main>
  );
}

function Centered({ children, tone }: { children: React.ReactNode; tone?: "error" }) {
  return (
    <div
      className={`flex min-h-[60vh] items-center justify-center px-4 text-sm ${
        tone === "error" ? "text-red-600" : "text-slate-500"
      }`}
    >
      {children}
    </div>
  );
}
