"use client";
// Surveyor screen: sidebar sections + domain sub-tabs, per-tab completion with
// auto-advance, badges/celebration, explicit Save, and a leave-guard modal.

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Activity, AlertTriangle, Award, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, RotateCcw, Save } from "lucide-react";
import { useSurveyAnswers, STAFF_AREA, type SectionNode } from "@/src/hooks/useSurveyAnswers";
import FacilityDetails from "@/src/components/survey/FacilityDetails";
import SurveyTabs from "@/src/components/survey/SurveyTabs";
import SurveySidebar from "@/src/components/survey/SurveySidebar";
import AddQuestionFab from "@/src/components/survey/AddQuestionFab";
import AreaChildren from "@/src/components/survey/AreaChildren";
import ElapsedTimer from "@/src/components/survey/ElapsedTimer";
import StaffProfile from "@/src/components/survey/StaffProfile";
import Celebration from "@/src/components/survey/Celebration";
import ProfileMenu from "@/src/components/survey/ProfileMenu";
import ReportModal from "@/src/components/survey/ReportModal";
import SurveyGate from "@/src/components/survey/SurveyGate";
import SurveyCodeCard from "@/src/components/survey/SurveyCodeCard";
import OfflineBanner from "@/src/components/survey/OfflineBanner";
import HealthPanel from "@/src/components/survey/HealthPanel";
import LoadingScreen from "@/src/components/LoadingScreen";
import LanguageSelect from "@/src/components/LanguageSelect";
import TranslatingBar from "@/src/components/TranslatingBar";
import { getLang } from "@/src/lib/i18n";
import { SurveyLangContext } from "@/src/components/survey/SurveyLangContext";
import { recordAward } from "@/src/lib/awards";
import { getSupabaseBrowser } from "@/src/lib/supabase-browser";
import { cacheGet, cacheSet } from "@/src/lib/offline";
import { saveProgress, saveNaSections, setStatus, type ReportResult, type ReportView } from "@/src/lib/survey-api";

const FACILITY = "Facility Details";
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
    survey, sections: contentSections, domainsBySection, questionsByArea, areaNames, domainMeta,
    answers, photos, loading, saving, error, hasUnsaved,
    answeredCount, totalCount, online, pending, fromCache,
    keyFor, setField, addPhoto, removePhoto, submitReport, flush, discard,
    addBuilding, addSubArea, renameSection, deleteSection,
    addQuestionsFromBankTo, addCustom, editChecklist, removeQuestion,
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
  const [reportFreezeAt, setReportFreezeAt] = useState<string | null>(null); // freezes the elapsed timer
  const lastViewRef = useRef<ReportView>("domain"); // remember the view for "Regenerate with AI"
  const [showLeave, setShowLeave] = useState(false);
  const [leaveTo, setLeaveTo] = useState("/surveys");
  const [savedToast, setSavedToast] = useState(false);
  const [saveMsg, setSaveMsg] = useState("Progress saved");
  // Staff-profile deployment plan lifted to the page: StaffProfile re-mounts when you
  // switch sections, so the page must hold the latest data or edits appear to vanish.
  const [deployPlan, setDeployPlan] = useState<Record<string, unknown>>({});
  const deployInitRef = useRef(false);
  // Keep the loading animation on screen for at least ~1.4s so it doesn't flash.
  const [minLoadDone, setMinLoadDone] = useState(false);
  // Survey-scoped language: seeded from the saved default but LOCAL to this survey,
  // so changing it here never leaks to the home screen, other surveys, or roles.
  const [lang, setLang] = useState<string>(() => getLang());
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
  // Minimum on-screen time for the loading animation (~1.4s) so it never flashes.
  useEffect(() => {
    const t = setTimeout(() => setMinLoadDone(true), 1400);
    return () => clearTimeout(t);
  }, []);

  // Seed the lifted deployment plan once the survey loads.
  useEffect(() => {
    if (survey && !deployInitRef.current) {
      deployInitRef.current = true;
      setDeployPlan((survey.deployment_plan as Record<string, unknown>) || {});
    }
  }, [survey]);

  // While a report is generating, trap the user on this screen (block back button,
  // reload, and tab close) so the request isn't interrupted mid-flight.
  useEffect(() => {
    if (!reporting) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    const onPop = () => window.history.pushState(null, "", window.location.href);
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", onPop);
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [reporting]);

  // Record that this user has opened the survey (clears the "new" badge). Fire-and-forget.
  useEffect(() => {
    (async () => {
      try {
        const sb = getSupabaseBrowser();
        const { data: { user } } = await sb.auth.getUser();
        if (!user) return;
        await sb.from("survey_views").upsert(
          { survey_id: id, user_id: user.id },
          { onConflict: "survey_id,user_id", ignoreDuplicates: true }
        );
      } catch {
        /* survey_views not migrated yet — badge simply won't clear */
      }
    })();
  }, [id]);

  // Admins skip the gate entirely. Surveyors are gated purely by the SERVER-side
  // survey flags (handled on survey load below) — never by device localStorage —
  // so re-authenticating on a new device never re-triggers location/code capture.
  useEffect(() => {
    (async () => {
      try {
        const sb = getSupabaseBrowser();
        const { data: { user } } = await sb.auth.getUser();
        if (user) {
          const { data: prof } = await sb.from("profiles").select("role").eq("id", user.id).single();
          if (prof?.role === "admin") { setIsAdmin(true); setLocOk(true); setStarted(true); setGateReady(true); }
        }
      } catch { /* default to gated for surveyors */ }
    })();
  }, [id]);

  // While a surveyor is located-but-not-started, keep them on Facility Details.
  useEffect(() => {
    if (locOk && !started) setActive(FACILITY);
  }, [locOk, started]);

  const touched = hasUnsaved || marked;

  useEffect(() => {
    if (survey) {
      // Legacy surveys stored progress/na keyed by building NAME; v2 keys by node
      // id. Remap on load so a mid-flight survey's completion + NA flags survive.
      const idByName: Record<string, string> = {};
      for (const [aid, name] of Object.entries(areaNames)) idByName[name] = aid;
      const remap = (area: string) => idByName[area] ?? area;

      const rawProg = (survey.progress as unknown as Progress) || {};
      const prog: Progress = {};
      for (const [area, v] of Object.entries(rawProg)) prog[remap(area)] = v;
      setProgress(prog);

      const na = new Set(
        (survey.na_sections ?? []).map((k) => {
          const i = k.indexOf("||");
          return i < 0 ? k : `${remap(k.slice(0, i))}||${k.slice(i + 2)}`;
        })
      );
      setNaSections(na);
      // Cross-device gate: the SERVER flags are the single source of truth. A second
      // device (phone after laptop) reads these and is never re-prompted. We decide
      // whether to show the gate ONLY after the survey has loaded, so a slow load
      // can't briefly flash the gate and re-capture location on a new device.
      if (survey.gate_located_at) setLocOk(true);
      if (survey.gate_verified_at) { setLocOk(true); setStarted(true); }
      setGateReady(true);
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
    // Keep the current scope pill selected if it's still valid; only reset when the
    // section changes or the pill no longer exists (prevents snapping back to the
    // first domain when questions update, e.g. adding a checklist sub-question).
    const ds = domainsBySection[active] ?? [];
    setActiveDomain((prev) => (prev && ds.includes(prev) ? prev : ds[0] ?? ""));
  }, [active, domainsBySection]);

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

  // Sidebar list = the Facility Details gate/details screen (synthetic) + the
  // survey's content sections (facility-level + the building/area tree).
  const sidebarSections = useMemo<SectionNode[]>(
    () => [{ id: FACILITY, name: "Facility Details", kind: "facility", parentId: null, depth: 0 }, ...contentSections],
    [contentSections]
  );
  const sectionIds = useMemo(() => sidebarSections.map((s) => s.id), [sidebarSections]);
  const buildingNames = useMemo(
    () => contentSections.filter((s) => s.kind === "building").map((s) => s.name),
    [contentSections]
  );
  const activeNode = sidebarSections.find((s) => s.id === active);
  // Where new questions attach: the tree node id, or null for facility-level sections.
  const activeAreaId = activeNode && (activeNode.kind === "building" || activeNode.kind === "area") ? active : null;

  // Container vs leaf: a Building always contains Floors (add floors, no questions);
  // a node with children is a container; only a leaf (a floor with no rooms, or a
  // room) answers scope questions. Child labels derive from depth (no schema change).
  const activeChildren = contentSections.filter((s) => s.parentId === active);
  const isTreeNode = !!activeNode && (activeNode.kind === "building" || activeNode.kind === "area");
  const childLabel = !activeNode ? "area" : activeNode.depth === 0 ? "floor" : activeNode.depth === 1 ? "room" : "area";
  // A floor the surveyor marked "no rooms" answers its scope questions directly.
  const noRooms = !!progress[active]?.["__noRooms"];
  // Container = a Building (always add floors), OR any node with children, OR a
  // floor that hasn't been marked "no rooms" (floors default to the add-rooms view).
  const isContainer = isTreeNode && (
    activeNode!.kind === "building" ||
    activeChildren.length > 0 ||
    (activeNode!.depth === 1 && !noRooms)
  );
  const showQuestions = isTreeNode && !isContainer;
  // Breadcrumb trail (you-are-here): the active node's ancestor chain.
  const breadcrumb: SectionNode[] = (() => {
    if (!isTreeNode) return [];
    const byId = new Map(sidebarSections.map((s) => [s.id, s]));
    const trail: SectionNode[] = [];
    const seen = new Set<string>();
    let cur: SectionNode | undefined = activeNode;
    while (cur && !seen.has(cur.id)) {
      seen.add(cur.id);
      trail.push(cur);
      cur = cur.parentId ? byId.get(cur.parentId) : undefined;
    }
    return trail.reverse();
  })();
  const markNoRooms = () => {
    const next: Progress = { ...progress, [active]: { ...(progress[active] || {}), __noRooms: true } };
    setProgress(next);
    setMarked(true);
    persistProgress(next);
  };

  // Concrete delete consequences for the confirm dialog: areas + answered questions
  // in the node's subtree.
  const countsFor = (areaId: string) => {
    const childrenOf = new Map<string, string[]>();
    for (const s of contentSections) {
      const arr = childrenOf.get(s.parentId ?? "") ?? [];
      arr.push(s.id);
      childrenOf.set(s.parentId ?? "", arr);
    }
    const sub = new Set<string>();
    const stack = [areaId];
    while (stack.length) {
      const c = stack.pop()!;
      if (sub.has(c)) continue;
      sub.add(c);
      stack.push(...(childrenOf.get(c) ?? []));
    }
    let answered = 0;
    for (const [k, v] of Object.entries(answers)) {
      const i = k.lastIndexOf(" ");
      if (sub.has(k.slice(0, i)) && (v.value || v.remark)) answered++;
    }
    return { areas: Math.max(0, sub.size - 1), answered };
  };


  const sectionComplete = (area: string, prog: Progress): boolean => {
    if (area === FACILITY) return false;
    // Container node (a Building, or any node with children): complete when it has
    // children and ALL of them are complete (rolls up floors -> building).
    const node = sidebarSections.find((s) => s.id === area);
    const kids = contentSections.filter((s) => s.parentId === area);
    const container = !!node && (node.kind === "building" || node.kind === "area") && (node.kind === "building" || kids.length > 0);
    if (container) return kids.length > 0 && kids.every((k) => sectionComplete(k.id, prog));
    const ds = domainsBySection[area] ?? [];
    // Zero-domain sections (e.g. Staff Profile): done when explicitly completed OR
    // marked not-applicable.
    if (ds.length === 0) return !!prog[area]?.__self || naSections.has(`${area}||__self`);
    // A domain counts as done when explicitly completed OR marked not-applicable.
    return ds.every((d) => prog[area]?.[d] || naSections.has(`${area}||${d}`));
  };
  const completedSections = useMemo(
    () => new Set(sectionIds.filter((s) => sectionComplete(s, progress))),
    [sectionIds, progress, domainsBySection, naSections]
  );

  // When every non-facility section is complete, flip status to 'ready' (report pending)
  // exactly once, so the dashboard reflects it. Guarded by a ref to avoid re-fires.
  const surveySections = sectionIds.filter((s) => s !== FACILITY);
  const allSectionsComplete =
    surveySections.length > 0 && surveySections.every((s) => completedSections.has(s));

  // Header progress bar: count only answerable LEAF sections (containers roll up),
  // so the bar advances smoothly as rooms/floors are completed.
  const leafSectionIds = surveySections.filter((sid) => {
    const node = sidebarSections.find((s) => s.id === sid);
    if (!node) return false;
    if (node.kind === "facility" || node.kind === "staff") return true;
    const kids = contentSections.filter((s) => s.parentId === sid);
    return !(node.kind === "building" || kids.length > 0); // leaf only
  });
  const progressPct = leafSectionIds.length
    ? Math.round((leafSectionIds.filter((sid) => completedSections.has(sid)).length / leafSectionIds.length) * 100)
    : 0;
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
    const ds = domainsBySection[active] ?? [];
    const dk = ds.length === 0 ? "__self" : activeDomain;
    if (activeDomain && naSections.has(`${active}||${activeDomain}`)) return true;
    return !!progress[active]?.[dk];
  })();

  function scrollTop() {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function goToNextSection(area: string) {
    const next = sectionIds[sectionIds.indexOf(area) + 1];
    if (next) { setActive(next); scrollTop(); }
  }

  async function completeCurrent() {
    if (active === FACILITY) return;
    await flush(); // persist any pending answer edits before marking the section complete
    const ds = domainsBySection[active] ?? [];
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
    const ds = domainsBySection[active] ?? [];
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
    setReportFreezeAt(new Date().toISOString()); // stop the survey timer at report time
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

  if (loading || !minLoadDone) return <LoadingScreen label="Loading survey…" />;
  if (error && !survey) return <Centered tone="error">Could not load survey: {error}</Centered>;
  if (!survey) return <Centered tone="error">Survey not found.</Centered>;

  const isFacility = active === FACILITY;

  return (
    <SurveyLangContext.Provider value={{ lang, setLang }}>
    <main className="mx-auto max-w-6xl px-4 py-6">
      <TranslatingBar />
      {gateReady && !locOk && (
        <SurveyGate
          surveyId={id}
          facilityName={survey?.facility_name}
          onLocated={() => {
            try { localStorage.setItem(`survey_loc_${id}`, "1"); } catch { /* ignore */ }
            setLocOk(true);
            setActive(FACILITY); // land on Facility Details to read contacts + enter the code
          }}
        />
      )}
      <header className="sticky top-0 z-20 -mx-4 mb-5 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
        {/* Row 1: back (left) + profile (top-right). Save/Health live in the profile
            menu on mobile; on desktop they stay as inline buttons below. */}
        <div className="mb-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() => requestLeave("/surveys")}
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800"
          >
            <ChevronLeft className="h-4 w-4" /> Surveys
          </button>
          <ProfileMenu onSave={handleSave} onHealth={async () => { await flush(); setShowHealth(true); }} />
        </div>

        <h1 className="text-lg font-bold leading-tight text-slate-900 sm:text-xl">{survey.facility_name || "Facility Survey"}</h1>
        <p className="mt-0.5 text-xs text-slate-500">
          <span className="capitalize">{survey.facility_type}</span>
          <span className="mx-1">·</span>{completedSections.size}/{surveySections.length} sections{saving && " · saving…"}
          {survey.first_answer_at && survey.status !== "reported" && (
            <> <span className="mx-1">·</span><ElapsedTimer startIso={survey.first_answer_at} endIso={report?.generated_at ?? reportFreezeAt} /></>
          )}
        </p>

        {/* Survey progress bar */}
        <div className="mt-2.5">
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-slate-900 transition-all duration-500" style={{ width: `${progressPct}%` }} />
          </div>
          <div className="mt-1 text-right text-[11px] font-medium text-slate-400">{progressPct}% complete</div>
        </div>

        {/* Actions: Generate Report always; Health/Save inline on desktop only. */}
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={async () => { await flush(); setShowHealth(true); }}
            className="hidden items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 sm:inline-flex"
          >
            <Activity className="h-4 w-4" /> Health
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="hidden items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 sm:inline-flex"
          >
            <Save className="h-4 w-4" /> Save
          </button>
          <div className="relative flex-1 sm:flex-none">
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              disabled={reporting}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50 sm:w-auto sm:py-2"
            >
              {reporting ? "Generating…" : <>Generate Report <ChevronDown className="h-4 w-4" /></>}
            </button>
            {menuOpen && !reporting && (
              <div className="absolute left-0 right-0 z-30 mt-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg sm:left-auto sm:w-56">
                {VIEW_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleGenerate(opt.value)}
                    className="block w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-100"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <LanguageSelect value={lang} onChange={setLang} compact />
        </div>
      </header>

      <OfflineBanner online={online} pending={pending} fromCache={fromCache} />

      <ReportModal
        generating={reporting}
        report={report}
        error={reportErr}
        onClose={() => { setReport(null); setReportErr(null); }}
        onRegenerate={() => handleGenerate(lastViewRef.current)}
        recipientEmail={typeof survey?.contact?.email === "string" ? survey.contact.email : undefined}
        facilityName={survey?.facility_name ?? undefined}
      />

      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        <SurveySidebar
          sections={sidebarSections}
          active={active}
          completed={completedSections}
          onSelect={(s: string) => { if (started || s === FACILITY) setActive(s); }} // locked until code verified
          canEdit={started}
          onAddBuilding={addBuilding}
          onAddSubArea={addSubArea}
          onRename={renameSection}
          onDelete={(delId) => { deleteSection(delId); if (delId === active) setActive(FACILITY); }}
          countsFor={countsFor}
        />

        <div ref={topRef} className="min-w-0 flex-1 scroll-mt-24">
          {breadcrumb.length > 1 && (
            <nav className="mb-1 flex flex-wrap items-center gap-1 text-xs text-slate-400">
              {breadcrumb.slice(0, -1).map((n) => (
                <span key={n.id} className="flex items-center gap-1">
                  <button type="button" onClick={() => { setActive(n.id); scrollTop(); }} className="hover:text-slate-600 hover:underline">{n.name}</button>
                  <ChevronRight className="h-3 w-3" />
                </span>
              ))}
            </nav>
          )}
          <h2 className="mb-4 text-lg font-semibold text-slate-900">{activeNode?.name ?? active}</h2>

          {isFacility ? (
            <>
              {!started && (
                <SurveyCodeCard
                  surveyId={id}
                  onVerified={() => {
                    try { localStorage.setItem(`survey_started_${id}`, "1"); } catch { /* ignore */ }
                    setStarted(true);
                  }}
                />
              )}
              <FacilityDetails survey={survey} domainMeta={domainMeta} showMap={isAdmin} />
            </>
          ) : isContainer ? (
            <AreaChildren
              node={activeNode!}
              children={activeChildren}
              completed={completedSections}
              childLabel={childLabel}
              canEdit={started}
              onNoRooms={activeNode!.depth === 1 ? markNoRooms : undefined}
              onOpen={(cid) => { setActive(cid); scrollTop(); }}
              onAddChild={(pid, name) => addSubArea(pid, name)}
            />
          ) : (
            <>
              {showQuestions && started && (
                <AreaChildren
                  compact
                  node={activeNode!}
                  children={activeChildren}
                  completed={completedSections}
                  childLabel={childLabel}
                  canEdit={started}
                  onOpen={(cid) => { setActive(cid); scrollTop(); }}
                  onAddChild={(pid, name) => addSubArea(pid, name)}
                />
              )}
              <SurveyTabs
                activeArea={active}
                activeDomain={activeDomain}
                onDomainChange={setActiveDomain}
                domainsBySection={domainsBySection}
                questionsByArea={questionsByArea}
                domainMeta={domainMeta}
                answers={answers}
                photos={photos}
                completedDomains={progress[active] || {}}
                keyFor={keyFor}
                onField={setField}
                onPhoto={addPhoto}
                onRemovePhoto={removePhoto}
                staffArea={STAFF_AREA}
                staffNode={<StaffProfile surveyId={id} initial={deployPlan} buildings={buildingNames} onChange={setDeployPlan} />}
                naKeys={naSections}
                onToggleNa={toggleNa}
                onEditChecklist={editChecklist}
                onRemoveQuestion={removeQuestion}
              />
            </>
          )}

          {!isFacility && !isContainer && (
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
                const ds = domainsBySection[active] ?? [];
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

      {started && activeDomain && !isFacility && !isContainer && (
        <AddQuestionFab
          domain={activeDomain}
          domainMeta={domainMeta}
          facilityType={survey.facility_type}
          areaId={activeAreaId}
          addedTexts={new Set((questionsByArea[active]?.[activeDomain] ?? []).map((q) => q.text.trim().toLowerCase().replace(/\s+/g, " ")))}
          onAddFromBank={addQuestionsFromBankTo}
          onAddCustom={addCustom}
        />
      )}

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
    </SurveyLangContext.Provider>
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
