"use client"

// ─── Home sections — Problems board · Benefits timeline · Pillars · Modules ───
// Layout contract (matches the hero in src/app/page.tsx):
// - Horizontal alignment: px-6 sm:px-10 lg:px-16 (NOT a centered max-w
//   container — these are edge-to-edge two-column grids, so the left text
//   column's own padding IS its left inset). This must match the navbar/
//   footer's container padding scale exactly (max-w-7xl mx-auto px-6
//   sm:px-10 lg:px-16, see navigation.tsx/footer.tsx) — that's what keeps
//   every section's heading left-aligned with the navbar logo. Was
//   `lg:px-14` until 2026-09-01 (8px short of the navbar/footer's `lg:px-16`,
//   user-reported as a visible left-alignment mismatch across Modules/
//   WhyFirmity/Problems) — don't drift this back out of sync.
// - Vertical scale: lg:min-h-[88vh] with flex column centering
// - Type: DM Sans everywhere (no mono); serif (Playfair) for display lines only
//
// Radius scale (site-wide convention): 12px (rounded-xl) for buttons/fields/
// chips/rows, 20px (rounded-[20px]) for cards/panels.
//
// Color rhythm: dark surfaces are reserved for product moments (hero, risk
// board, pillar panels, module showcase); narrative sections sit on white.

import Link from "next/link"
import { useEffect, useRef, useState, type CSSProperties, type FC, type FormEvent } from "react"
import { Reveal } from "@/src/components/reveal"
import { ModuleVignette } from "@/src/components/module-vignette"
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Cog,
  Package,
  Users,
  Eye,
  ListChecks,
  IndianRupee,
  Receipt,
  Instagram,
  Linkedin,
  Youtube,
  Loader2,
  CheckCircle2,
  AlertCircle,
  type LucideProps,
} from "lucide-react"

// Minimal inline X (formerly Twitter) mark — not sourced from lucide-react
// because the package's "Twitter"/"X" export has changed across versions;
// a static inline SVG avoids coupling this to whatever version is installed.
function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-7.5 8.6L23.3 22H16.9l-5-6.6L6.1 22H3l8-9.1L2.9 2h6.6l4.5 6L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />
    </svg>
  )
}

// ─── Shared layout tokens ─────────────────────────────────────────────────────

const HERO_PX = "px-6 sm:px-10 lg:px-16"
const HERO_MINH = "lg:min-h-[88vh]"

function SectionKicker({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-6 h-px bg-[#2b6cb0] flex-shrink-0" />
      <span className={`text-[10px] font-semibold tracking-[0.2em] uppercase ${light ? "text-[#63b3ed]" : "text-[#2b6cb0]"}`}>
        {text}
      </span>
    </div>
  )
}

// ─── Problem icons (custom SVG paths) ─────────────────────────────────────────

type ProblemIconName =
  | "file-x"
  | "clock-x"
  | "receipt-off"
  | "tool"
  | "eye-off"
  | "shield-x"
  | "clipboard-x"

const PROBLEM_ICON_PATHS: Record<ProblemIconName, React.ReactNode> = {
  "file-x":      <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="10" y1="13" x2="16" y2="13"/><line x1="10" y1="17" x2="16" y2="17"/></>,
  "clock-x":     <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/><line x1="18" y1="6" x2="22" y2="10"/><line x1="22" y1="6" x2="18" y2="10"/></>,
  "receipt-off": <><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="14" y2="13"/><line x1="2" y1="2" x2="22" y2="22"/></>,
  "tool":        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>,
  "eye-off":     <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>,
  "shield-x":    <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></>,
  "clipboard-x": <><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/><line x1="10" y1="13" x2="14" y2="13"/><line x1="10" y1="17" x2="14" y2="17"/><line x1="2" y1="2" x2="22" y2="22"/></>,
}

function ProblemIcon({ name }: { name: ProblemIconName }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      {PROBLEM_ICON_PATHS[name]}
    </svg>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROBLEMS: { icon: ProblemIconName; label: string }[] = [
  { icon: "file-x",      label: "Missing AMC Renewals" },
  { icon: "clock-x",     label: "Overdue Cleaning Schedules" },
  { icon: "receipt-off", label: "Lost Vendor Payments" },
  { icon: "tool",        label: "Asset Downtime" },
  { icon: "eye-off",     label: "No Operational Oversight" },
  { icon: "shield-x",    label: "Compliance Gaps" },
  { icon: "clipboard-x", label: "Untracked Work Orders" },
]

export interface ModuleListItem {
  id: string
  /** Anchor slug — must match section ids on /features. */
  slug: string
  title: string
  desc: string
  /** Full-length marketing copy for this module's Hero-slideshow slide
      (SlideshowLeft has room for it — no fixed-height card to overflow).
      `desc` above stays short/condensed for the ExploreSection cards,
      which DO have a fixed card height across the grid row (2026-09-06,
      per request: condensed copy in the cards "so that the cards do not
      expand unnecessarily and all stay the same height and width", full
      copy "in the respective slides as well"). */
  slideDesc: string
  Icon: FC<LucideProps>
}

// Exported (2026-09-08) so src/app/features/page.tsx can import this exact
// data instead of hand-maintaining a second, drifting copy of the same 8
// modules — the features page's module-detail sections, sidebar nav, real
// photography (MODULE_IMAGES) and "VIEW MODULE FEATURES" links (MODULE_PAGES)
// all read from here now.
// Single source of truth for "the 8 modules" — feeds ExploreSection's cards,
// ModulesSection (unused, kept for backward compat), AND the Hero slideshow
// (ALL_SLIDES below). Used to be THREE separately-hand-maintained lists that
// drifted out of sync with each other (titles, ordering, module count) —
// consolidated 2026-09-05 per request ("add [these 8 modules] to the
// slideshow ... followed by Assets, Complaint, Inventory, Visitor, Employee,
// Payroll, Facility Expense"), which is this exact order. Titles are the
// 2026-09-05 ERP-suffixed rename (Inventory & Vendor Automation ERP, Payroll
// Automation ERP, Facility Expense Automation ERP) — keep footer.tsx's own
// SOLUTIONS const (a separate array, by necessity: it doesn't need the full
// desc/Icon shape) in sync by hand if titles change again.
export const MODULES_LIST: ModuleListItem[] = [
  {
    id: "01", slug: "preventive-maintenance", title: "Facility Task Automation", Icon: ListChecks,
    desc: "Schedule, assign, and track work orders with automated triggers and real-time updates — zero manual follow-ups.",
    slideDesc: "Streamline preventative maintenance and facility task management in one intelligent platform. Effortlessly schedule, assign, and track work orders with custom task frequencies, automated triggers, and real-time status updates. Firmity eliminates manual follow-ups and drives technician accountability.",
  },
  {
    id: "02", slug: "asset-management", title: "Assets & Spares Automation", Icon: Cog,
    desc: "QR-tagged assets give technicians instant access to history, AMC contracts, and spares — maximizing uptime.",
    slideDesc: "Get access to end-to-end asset lifecycle & spare parts management. Track, schedule, and optimize enterprise equipment uptime. QR tagging of equipment gives field technicians immediate access to asset history, maintenance logs, warranty cards, AMC contracts. Automatically trigger maintenance schedules, monitor lifecycle metrics, manage asset spares, and transfers maximizing uptime and lowering total cost of ownership.",
  },
  {
    id: "03", slug: "complaint-management", title: "Complaint & Helpdesk Automation", Icon: ClipboardList,
    desc: "Scan-to-raise QR tickets auto-route to technicians, with live status boards and a full SLA audit trail.",
    slideDesc: "Smart QR-Powered Helpdesk & Ticketing allows you to resolve facility issues faster with instant, location-based ticket creation. Building occupants simply scan a local QR code to submit detailed complaints complete with photos. Tickets are automatically routed to the concerned technician, while live status boards provide full operational visibility. Every action's audit trail ensures strict SLA compliance, and zero dropped issues from reporting to resolution.",
  },
  {
    id: "04", slug: "inventory-management", title: "Inventory & Vendor Automation ERP", Icon: Package,
    desc: "Automated PO generation and GRN tracking keep stock and vendors aligned with your general ledger.",
    slideDesc: "Unify shop-floor maintenance with back-office ERP financial workflows through real-time visibility across your entire supply chain. Firmity automates inventory and vendor management, purchase order generation, Goods Receipt Notes, keeping stock levels, materials fully aligned with your general ledger. With a modern desktop and mobile interface, Firmity streamlines procurement and distribution with complete financial accuracy.",
  },
  {
    id: "05", slug: "visitor-management", title: "Visitor Management Automation", Icon: Eye,
    desc: "Contactless QR check-ins and pre-approved gate passes, with instant host alerts and occupancy tracking.",
    slideDesc: "Streamline perimeter security with contactless QR check-ins and automated digital gate passes. Pre-approve guests, contractors, and deliveries to eliminate gate queues, or scan on-site for instant photo verification and automated host notifications. Issue temporary guest passes or permanent vendor credentials with real-time occupancy tracking, overstay alerts, and digital logbooks for total facility security.",
  },
  {
    id: "06", slug: "staff-attendance", title: "Employee Management Automation", Icon: Users,
    desc: "Touchless, geo-fenced facial-recognition attendance with digital leave and payroll-ready exports.",
    slideDesc: "Unify workforce operations with touchless, geo-fenced based facial-recognition attendance and real-time site presence tracking. Firmity integrates digital leave requests, automated working hour calculations, and seamless digital employee onboarding to instant, payroll-ready attendance exports across all locations.",
  },
  {
    id: "07", slug: "payroll-management", title: "Payroll Automation ERP", Icon: IndianRupee,
    desc: "1-click payroll with automated TDS/PF/ESI deductions, maker-checker validation, and bank file generation.",
    slideDesc: "Run multi-tier payroll in minutes with error-free, 1-click execution. Firmity automates complex gross-to-net calculations, tax deductions (TDS, PF, ESI, PT), overtime, and customizable allowance structures. With built-in maker-checker validations, automated full-and-final (F&F) settlements, direct bank file generation, and real-time ledger auto-posting directly into your core ERP general ledger, Firmity ensures 100% statutory compliance, auto-generated Form 16s, and zero financial leakage.",
  },
  {
    id: "08", slug: "facility-expense-management", title: "Facility Expense Automation ERP", Icon: Receipt,
    desc: "Policy-driven budget caps and maker-checker approvals, with audit-ready journals auto-posted to your ledger.",
    slideDesc: "Master operational spending with policy-driven expense controls, and category-wise budget caps. Firmity automates vendor claims, travel advances while enforcing policy rules to automatically catch budget breaches before they occur.",
  },
]

// Timeline benefits — each paired with a photo for the cycling panel.
const BENEFITS = [
  {
    num: "01",
    tag: "Single source of truth",
    title: "Centralized records enable faster decision-making",
    desc: "Assets, work orders, vendor contracts, and compliance records — all on one unified platform, eliminating fragmented systems.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&fit=crop",
    imgAlt: "Modern office interior with organised workspaces",
  },
  {
    num: "02",
    tag: "Zero missed deadlines",
    title: "Automated task alerts ensure nothing is missed",
    desc: "Preventive maintenance, AMC renewals, and compliance deadlines — Firmity notifies the right people at the right time, automatically.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80&fit=crop",
    imgAlt: "Engineer inspecting building infrastructure",
  },
  {
    num: "03",
    tag: "One shared data layer",
    title: "Connected Teams. Connected Operations.",
    desc: "Assets, maintenance, inventory, visitors, attendance, and compliance — every module shares one data layer, one shared source of visibility.",
    img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=80&fit=crop",
    imgAlt: "Facility team coordinating around shared plans",
  },
]

// Pillars — colors map to topic: blue = operational flow, amber = time/endurance,
// green = environment. icon points at a pre-recolored PNG (public/images/pillar-*.png,
// generated from the original public/images/pillar.png via a hue-shift so all three
// share one consistent illustration style — regenerate the same way if pillar.png changes).
interface PillarItem {
  numeral: string
  title: string
  headline: string
  desc: string
  accent: string
  icon: string
}

const PILLARS: PillarItem[] = [
  {
    numeral: "I",
    title: "Productivity",
    headline: "Make every operation work smarter.",
    desc: "Digitise workflows, automate routine tasks, and give teams the tools to get more done.",
    accent: "#118AB2",
    icon: "/images/pillar-productivity.png",
  },
  {
    numeral: "II",
    title: "Longevity",
    headline: "Protect the life of your assets.",
    desc: "Proactive maintenance, better visibility, and data-driven decisions keep facilities performing longer.",
    accent: "#94621d",
    icon: "/images/pillar-longevity.png",
  },
  {
    numeral: "III",
    title: "Sustainability",
    headline: "Build efficiency into every operation.",
    desc: "Reduce waste, optimise resources, and create more sustainable facility operations.",
    accent: "#6a9e10",
    icon: "/images/pillar-sustainability.png",
  },
]

// ─── 1) PROBLEMS — hero-scale, live "risk board" ──────────────────────────────

const RESOLVE_INTERVAL_MS = 1300
const RESOLVED_HOLD_MS = 2600

export function ProblemsSection() {
  const [resolved, setResolved] = useState(0)
  const sectionRef = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true)
      return
    }
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const delay = resolved >= PROBLEMS.length ? RESOLVED_HOLD_MS : RESOLVE_INTERVAL_MS
    const t = setTimeout(() => {
      setResolved((r) => (r >= PROBLEMS.length ? 0 : r + 1))
    }, delay)
    return () => clearTimeout(t)
  }, [resolved, inView])

  const allDone = resolved >= PROBLEMS.length

  return (
    <section ref={sectionRef} className={`bg-transparent sm:bg-white/60 grid grid-cols-1 lg:grid-cols-2 ${HERO_MINH}`}>
      {/* Left — copy, aligned with hero left column */}
      <div className={`${HERO_PX} py-16 lg:py-0 flex flex-col justify-center`}>
        <Reveal direction="right">
          <SectionKicker text="Real Challenges, Real Solutions" />
          <h2 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-[1.15] tracking-tight text-[#114dac] mb-4">
            Small gaps in daily operations.<br />
            <em className="not-italic text-[#2b6cb0]">Big costs</em> in time, money,<br />
            and compliance.
          </h2>
          <p className="text-[13.5px] font-light leading-[1.8] text-[#000000] max-w-[400px]">
            A missed AMC renewal. An overlooked water tank cleaning. An untracked vendor payment.
            None of these feel urgent on the day — all of them compound into downtime, penalties,
            and audit failures. Watch how Firmity closes each one.
          </p>
        </Reveal>
      </div>

      {/* Right — live risk board */}
      <div className="hidden lg:flex items-center justify-center p-6 sm:p-10 lg:p-14 bg-[#114dac]">
        <Reveal direction="left" delay={120} className="w-full max-w-[480px]">
          <div className="border border-white/[0.1] rounded-[20px] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-white/[0.03]">
              <span className="text-[9px] font-semibold tracking-[0.18em] uppercase text-white/[0.45]">
                Operations Risk Board
              </span>
              <span className="flex items-center gap-1.5 text-[9px] font-medium text-[#68d391]">
                <span className="w-[5px] h-[5px] rounded-full bg-[#68d391] animate-pulse" />
                LIVE
              </span>
            </div>

            {PROBLEMS.map(({ icon, label }, i) => {
              const done = i < resolved
              const active = i === resolved && !allDone
              return (
                <div
                  key={label}
                  className={`flex items-center gap-3 px-4 py-[10px] border-b border-white/[0.05] transition-colors duration-500 ${
                    active ? "bg-[#2b6cb0]/[0.14]" : "bg-transparent"
                  }`}
                >
                  <span className={`flex-shrink-0 transition-colors duration-500 ${done ? "text-[#68d391]/70" : active ? "text-[#63b3ed]" : "text-white/[0.35]"}`}>
                    <ProblemIcon name={icon} />
                  </span>
                  <span
                    className={`text-[12px] font-light flex-1 transition-all duration-500 ${
                      done ? "text-white/[0.35] line-through decoration-[#68d391]/50" : "text-white/[0.75]"
                    }`}
                  >
                    {label}
                  </span>
                  <span
                    className={`text-[8.5px] font-medium tracking-[0.1em] uppercase px-2 py-[3px] rounded-lg border transition-all duration-500 flex-shrink-0 ${
                      done
                        ? "text-[#68d391] border-[#68d391]/30 bg-[#68d391]/[0.08]"
                        : active
                          ? "text-[#63b3ed] border-[#63b3ed]/40 bg-[#63b3ed]/[0.08]"
                          : "text-[#fbd38d]/80 border-[#fbd38d]/25"
                    }`}
                  >
                    {done ? "✓ Automated" : active ? "Resolving…" : "Untracked"}
                  </span>
                </div>
              )
            })}

            <div className="px-4 py-3 bg-white/[0.03]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-medium text-white/[0.4]">
                  {Math.min(resolved, PROBLEMS.length)} / {PROBLEMS.length} gaps automated
                </span>
                {allDone && (
                  <span className="text-[9px] font-medium text-[#68d391] transition-opacity duration-500">
                    All gaps closed
                  </span>
                )}
              </div>
              <div className="h-[3px] rounded-full bg-white/[0.07] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#2b6cb0] to-[#68d391] transition-all duration-700 ease-out"
                  style={{ width: `${(Math.min(resolved, PROBLEMS.length) / PROBLEMS.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── 2) WHY CHOOSE FIRMITY — timeline + cycling photo panel ───────────────────

export function WhyFirmitySection() {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [drawn, setDrawn] = useState(false)
  const [activePhoto, setActivePhoto] = useState(0)

  // Reveal the block once it scrolls into view.
  useEffect(() => {
    const el = trackRef.current
    if (!el || typeof IntersectionObserver === "undefined") { setDrawn(true); return }
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setDrawn(true); obs.disconnect() } }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="bg-transparent sm:bg-white/60">
      {/* py-10 lg:py-14 → py-8 lg:py-10 (2026-09-04, inter-section spacing pass) */}
      <div ref={trackRef} className={`${HERO_PX} py-8 lg:py-10 w-full`}>
        <Reveal>
          <div className="mb-8 lg:mb-12">
            {/* "Why Choose Firmity" kicker removed 2026-09-04 per request */}
            <h2 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-[1.15] tracking-tight text-[#114dac] mb-3">
              Built for <em className="not-italic text-[#2b6cb0]">operational clarity</em>
            </h2>
            <p className="text-[13.5px] font-light leading-[1.8] text-[#000000] max-w-[460px]">
              One platform that replaces scattered spreadsheets, WhatsApp threads, and paper logs — so every team works off the same live data.
            </p>
          </div>
        </Reveal>

        {/* ── DESKTOP: left = numbered list (text, left-aligned), right = cycling photo ── */}
        <div
          className="hidden lg:grid grid-cols-2 gap-14 items-center"
          style={{ opacity: drawn ? 1 : 0, transform: drawn ? "none" : "translateY(14px)", transition: "opacity 700ms ease, transform 700ms ease" }}
        >
          {/* Left — numbered timeline, left-aligned text */}
          <div className="relative">
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-[#e2e8f0]" aria-hidden />
            <div className="space-y-6">
              {BENEFITS.map(({ num, tag, title, desc }, i) => (
                <button
                  key={num}
                  onMouseEnter={() => setActivePhoto(i)}
                  onFocus={() => setActivePhoto(i)}
                  onClick={() => setActivePhoto(i)}
                  className="cursor-pointer relative flex w-full gap-4 text-left"
                >
                  <span className={`relative z-10 flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full border text-[12px] font-medium transition-all duration-300 ${activePhoto === i ? "border-[#2b6cb0] bg-[#2b6cb0] text-white" : "border-[#2b6cb0]/40 bg-white text-[#2b6cb0]"}`}>{num}</span>
                  <div>
                    <span className={`mb-1 inline-block rounded-lg border px-2 py-[3px] text-[9px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${activePhoto === i ? "border-[#2b6cb0]/40 text-[#2b6cb0]" : "border-[#2b6cb0]/20 text-[#2b6cb0]/55"}`}>{tag}</span>
                    <h3 className={`mb-1 font-serif text-[15px] font-normal leading-snug transition-colors ${activePhoto === i ? "text-[#114dac]" : "text-[#000000]"}`}>{title}</h3>
                    <p className="text-[12.5px] font-light leading-[1.65] text-[#000000]">{desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right — cycling photo panel */}
          <div className="relative h-[420px] overflow-hidden rounded-[24px] bg-[#114dac]">
            {BENEFITS.map(({ img, imgAlt, tag }, i) => (
              <div key={img} className="absolute inset-0 transition-opacity duration-700 ease-out" style={{ opacity: activePhoto === i ? 1 : 0 }} aria-hidden={activePhoto !== i}>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform ease-out"
                  style={{ backgroundImage: `url('${img}')`, transform: activePhoto === i ? "scale(1.06)" : "scale(1)", transitionDuration: "6000ms" }}
                  role="img" aria-label={imgAlt}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#114dac]/85 via-[#114dac]/15 to-transparent" />
                <span className="absolute bottom-5 left-6 rounded-lg bg-[#114dac]/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">{tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── MOBILE: clean vertical list (no photos) ── */}
        <div className="relative lg:hidden">
          <div className="absolute bottom-2 left-[15px] top-2 w-px bg-[#e2e8f0]" aria-hidden />
          <div className="space-y-5">
            {BENEFITS.map(({ num, tag, title, desc }) => (
              <div key={num} className="relative flex gap-4">
                <span className="relative z-10 flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full border border-[#2b6cb0]/40 bg-white text-[12px] font-medium text-[#2b6cb0]">{num}</span>
                <div>
                  <span className="mb-1 inline-block rounded-lg border border-[#2b6cb0]/25 px-2 py-[3px] text-[9px] font-medium uppercase tracking-[0.14em] text-[#2b6cb0]">{tag}</span>
                  <h3 className="mb-1 font-serif text-[1rem] font-normal leading-snug text-[#114dac]">{title}</h3>
                  <p className="text-[12.5px] font-light leading-[1.65] text-[#000000]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 3) THREE PILLARS — static 3-up cards, pillar.png recolored per pillar ────

export function PillarsSection() {
  return (
    <section className="bg-transparent sm:bg-white/60">
      {/* py-14 lg:py-20 → py-10 lg:py-14 (2026-09-04, inter-section spacing pass).
          Header block changed from centered to left-aligned (2026-09-04, per
          request: "align left and make the gaps and spacing consistent") —
          text-center/mx-auto/max-w-2xl dropped, mb-10 lg:mb-14 → mb-8 lg:mb-10
          (more compact, matches the mb-8 lg:mb-12 scale WhyFirmitySection
          uses for the same kind of header). Card radius rounded-[20px] →
          rounded-[4px] (2026-09-04, per request: "roundness too" — matches
          the blog-card / ExploreSection-card radius used sitewide now). */}
      <div className={`${HERO_PX} py-10 lg:py-14 w-full`}>
        <Reveal className="mb-8 lg:mb-10">
          {/* "Built on Three Pillars" kicker removed 2026-09-04 per request */}
          <h2 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-[1.15] tracking-tight text-[#114dac] mb-3">
            The foundations of <em className="not-italic text-[#2b6cb0]">smarter facility management</em>
          </h2>
          <p className="text-[13.5px] font-light leading-[1.8] text-[#000000] max-w-[460px]">
            Every module in Firmity is built around three principles — get more done, protect what you own, and waste less doing it.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {PILLARS.map(({ numeral, title, headline, desc, accent, icon }) => (
              <div
                key={numeral}
                className="rounded-[4px] border border-[#eef3f9] bg-white/70 p-7 lg:p-8 flex flex-col items-center text-center transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(17,29,53,0.07)]"
              >
                <img src={icon} alt="" className="w-[150px] h-auto mb-5 select-none" draggable={false} />
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: accent }}>
                  {title}
                </span>
                <h3 className="font-serif text-[1.15rem] font-normal leading-snug text-[#114dac] mb-2">
                  {headline}
                </h3>
                <p className="text-[12.5px] font-light leading-[1.7] text-[#000000]">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── 4) MODULES — shared constants ────────────────────────────────────────────

// Single shared colour for every module slide (2026-09-05 per request — the
// previous per-module rainbow (green/amber/violet/orange/pink/sky/teal) read
// as arbitrary and clashed with the site's blue identity: "why is it
// green? ... look exactly like the first slide"). One consistent dark-navy
// bg + the hero slide's own accent (#63b3ed) for all 8, so every module
// slide reads as the same family as the hero rather than each having its
// own colour theme.
const MODULE_ACCENTS = Array.from({ length: 8 }, () => ({ bg: "#0c1a32", accent: "#63b3ed" }))

// Short captions for the slideshow's bottom indicator row — index-aligned to
// MODULES_LIST, NOT copied from its (longer) titles.
const MODULE_INDICATOR_LABELS = [
  "Facility Tasks", "Assets", "Complaints", "Inventory", "Visitor", "Employee", "Payroll", "Expense",
]

export const MODULE_PAGES: Record<string, string> = {
  "facility-records":       "/facility-records",
  "preventive-maintenance": "/preventive-maintenance",
  "complaint-management":   "/complaint-management",
  "asset-management":       "/asset-management",
  "inventory-management":   "/inventory-management",
  "staff-attendance":       "/staff-attendance",
  "visitor-management":     "/visitor-management",
  // payroll-management / facility-expense-management intentionally absent —
  // no dedicated page exists yet, so these fall through to the `??
  // /features#${slug}` default below, which now resolves (see FEATURES on
  // src/app/features/page.tsx, 2026-09-05).
}

// Real per-module photography, keyed by MODULES_LIST slug — added as it
// becomes available (2026-09-05: Facility Task Automation is the first).
// Any slug absent from this map falls back to MODULE_PLACEHOLDER_IMAGE below.
export const MODULE_IMAGES: Record<string, string> = {
  "preventive-maintenance":      "/images/task_slide.png",    // Facility Task Automation
  "asset-management":            "/images/assets_spares.png", // Assets & Spares Automation
  "complaint-management":        "/images/helpdesk.png",      // Complaint & Helpdesk Automation
  "inventory-management":        "/images/inventory.png",     // Inventory & Vendor Automation ERP
  "visitor-management":          "/images/visitor.png",       // Visitor Management Automation
  "staff-attendance":            "/images/employee.png",      // Employee Management Automation
  "payroll-management":          "/images/payroll.png",       // Payroll Automation ERP
  "facility-expense-management": "/images/expense.png",       // Facility Expense Automation ERP
}

// Neutral placeholder — used for any module slide NOT yet in MODULE_IMAGES
// above, in the Hero's right-panel crossfade (the only place a module image
// renders; the old SlideshowLeft thumbnail was removed 2026-09-05 — see
// SlideshowLeft below). Inline SVG data URI (not an Unsplash stock photo) so
// it reads as "deliberately temporary", not a broken img.
const MODULE_PLACEHOLDER_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='900' height='700'>" +
      "<rect width='900' height='700' fill='#11294a'/>" +
      "<defs><pattern id='g' width='56' height='56' patternUnits='userSpaceOnUse'>" +
      "<path d='M56 0H0V56' fill='none' stroke='#ffffff' stroke-opacity='0.05'/>" +
      "</pattern></defs>" +
      "<rect width='900' height='700' fill='url(#g)'/>" +
      "<g transform='translate(450,350)' fill='none' stroke='#ffffff' stroke-opacity='0.22' stroke-width='2.5'>" +
      "<rect x='-80' y='-60' width='160' height='120' rx='10'/>" +
      "<circle cx='-40' cy='-24' r='14'/>" +
      "<path d='M-80 40 L-20 -10 L20 20 L80 -30 L80 40 Z' fill='#ffffff' fill-opacity='0.08' stroke='none'/>" +
      "</g>" +
      "</svg>",
  )

const MOD_ADVANCE_MS = 5500

// ─── 4a) HERO MODULES SLIDESHOW — fills the hero left column ──────────────────
// Slide 0 = original hero ("Powered by UFirm Technologies" / full h1 / Book a Demo)
// Slides 1–8 = the 8 MODULES_LIST modules, in that array's order (Facility
// Task Automation first, ending Facility Expense Automation ERP) — REBUILT
// 2026-09-05 from the old hand-written 7-slide set (which read off a
// separate, differently-ordered/differently-named `MODULES` array — see
// MODULES_LIST's own comment for why that's now unified). Unified template;
// slide 0 detected by index to render the branded headline variant.

type SlideEntry = {
  key: string
  indicatorId: string
  indicatorLabel: string
  kicker?: string
  bg: string
  accent: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
  desc: string
  title?: string       // undefined on hero → branded h1 block
  image: string
  imageAlt: string
}

const ALL_SLIDES: SlideEntry[] = [
  {
    key: "hero",
    indicatorId: "",
    indicatorLabel: "Home",
    // kicker: "Powered by UFirm Technologies",
    bg: "#114dac",
    accent: "#63b3ed",
    ctaPrimary:   { label: "Book a Demo",      href: "/contact"  },
    ctaSecondary: { label: "Explore Features", href: "/features" },
    desc: "Scale faster and simplify maintenance operations with Firmity Facility Automation. Our CMMS and ERP solutions automate administrative overhead and deliver predictive insights, letting your team skip the busywork and focus on high-value tasks with real-time operational visibility across all your facilities.",
    // Was a stale Unsplash exterior-building photo (2026-09-05 fix) — the
    // actual hero image was previously hardcoded separately as
    // "/images/heroImage.png" (the laptop+phone dashboard mockup) and this
    // field was dead/unused data until the panel render was unified to read
    // `s.image` for every slide, which surfaced the stale value. Corrected
    // to the real asset so the hero slide is unchanged from before.
    image:    "/images/heroImage.png",
    imageAlt: "Firmity dashboard shown on a laptop, next to the Firmity mobile app login screen on a phone",
  },
  ...MODULES_LIST.map((m, i) => ({
    key: m.id,
    indicatorId: m.id,
    indicatorLabel: MODULE_INDICATOR_LABELS[i],
    // No "Module 0X" kicker on these slides (2026-09-05 per request) — kept
    // as "" rather than removed from the type so SlideshowLeft can keep a
    // single `slide.kicker &&` guard instead of an isHero-only branch.
    kicker: "",
    bg: MODULE_ACCENTS[i].bg,
    accent: MODULE_ACCENTS[i].accent,
    ctaPrimary: { label: "Explore the module", href: MODULE_PAGES[m.slug] ?? `/features#${m.slug}` },
    ctaSecondary: { label: "Explore Features", href: "/features" },
    desc: m.slideDesc,
    title: m.title,
    image: MODULE_IMAGES[m.slug] ?? MODULE_PLACEHOLDER_IMAGE,
    imageAlt: MODULE_IMAGES[m.slug] ? `${m.title} module` : `${m.title} — module illustration placeholder`,
  })),
]

// ─── Shared slideshow logic ─────────────────────────────────────────────────

/**
 * Darken a module accent toward near-black navy so the vivid light accents
 * (amber, sky, green…) stay legible as TEXT on the light frosted phone hero.
 * Keeps enough hue that each slide reads as "its colour" (pink, orange, blue).
 * Desktop uses the flat dark panel, so this only drives the mobile `--ink` var.
 */
function inkAccent(hex: string): string {
  const m = hex.replace("#", "")
  if (m.length !== 6) return "#132339"
  const r = parseInt(m.slice(0, 2), 16)
  const g = parseInt(m.slice(2, 4), 16)
  const b = parseInt(m.slice(4, 6), 16)
  const mix = (c: number) => Math.round(c * 0.5 + 18 * 0.5) // 50% toward #121212
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`
}

function SlideshowLeft({
  activeIndex,
  animKey,
  paused,
  goTo,
}: {
  activeIndex: number
  animKey: number
  paused: boolean
  goTo: (i: number) => void
}) {
  const slide = ALL_SLIDES[activeIndex]
  const isHero = activeIndex === 0

  return (
    <div
      className="relative overflow-hidden h-full flex flex-col"
      // Every slide now uses the SAME light panel as the hero (2026-09-05 per
      // request — module slides previously had their own dark per-module
      // `slide.bg`, which read as inconsistent with "look exactly like the
      // first slide"). Translucent white (not flat #fff) so the page's fixed
      // beige page-wash gradient shows through underneath — same treatment
      // as the "Real Challenges, Real Solutions" (Problems) section's
      // bg-white/60. `slide.bg` is kept on the data model (harmless) but no
      // longer read here.
      style={{ background: "rgba(255,255,255,0.6)", transition: "background 600ms ease", ["--ink" as string]: inkAccent(slide.accent) } as CSSProperties}
    >
      {/* Phone only: same light gradient for every slide, matching the
          desktop panel above. isHero stops were beige (#f7f1e6/#f1e8d7) —
          swapped to gray 2026-09-04 to match the sitewide beige→gray change
          (same #f7f7f7 family used for the Hero desktop panel and
          HomeBlogSection). */}
      <div
        className="lg:hidden absolute inset-0 z-0 transition-[background] duration-700"
        aria-hidden
        style={{ background: "linear-gradient(160deg, #ffffff 0%, #f2f2f2 62%, #ececec 100%)" }}
      />
      <style>{`
        @keyframes hsModUp  { from { opacity:0; transform:translateY(36px); } to { opacity:1; transform:translateY(0); } }
        @keyframes hsModUp2 { 0%{opacity:0;transform:translateY(36px);} 18%{opacity:0;transform:translateY(36px);} 100%{opacity:1;transform:translateY(0);} }
        @keyframes hsModUp3 { 0%{opacity:0;transform:translateY(36px);} 32%{opacity:0;transform:translateY(36px);} 100%{opacity:1;transform:translateY(0);} }
        @keyframes hsModUp4 { 0%{opacity:0;transform:translateY(36px);} 46%{opacity:0;transform:translateY(36px);} 100%{opacity:1;transform:translateY(0);} }
        @keyframes hsModProg { from { width:0; } to { width:100%; } }
      `}</style>

      {/* Ghost watermark */}
      <div className="absolute right-0 top-0 bottom-0 flex items-end pb-16 pr-4 select-none pointer-events-none" aria-hidden>
        <span
          className="font-serif font-light leading-none"
          style={{
            fontSize: isHero ? "clamp(42px,6vw,80px)" : "clamp(90px,11vw,170px)",
            color: `${slide.accent}08`,
            transition: "color 600ms ease, font-size 600ms ease",
            letterSpacing: isHero ? "0.18em" : undefined,
          }}
        >
          {isHero ? "FIRMITY" : slide.key}
        </span>
      </div>

      {/* Main content */}
      <div className={`${HERO_PX} flex-1 flex flex-col justify-center py-20 lg:py-0 relative z-10`}>
        <div key={animKey} className="flex flex-col">
          {/* No per-slide thumbnail in this column (removed 2026-09-05 — it
              read as "a weird empty image" wedged above the heading). The
              module's photo/placeholder now lives ONLY in the desktop
              crossfade panel (ALL_SLIDES.slice(1) below), same as the hero
              slide's own image — so module slides match the hero's layout
              exactly, just with their own photo + dark navy panel colour. */}

          {/* Kicker — hero only now; module slides carry no "Module 0X"
              label (2026-09-05 per request), so this whole row is skipped
              rather than rendered with empty text. */}
          {slide.kicker && (
            <div style={{ animation: "hsModUp 0.5s cubic-bezier(0.22,1,0.36,1) both" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-5 h-px" style={{ background: "#2b6cb0" }} />
                <span className="text-[10px] font-semibold tracking-[0.22em] uppercase" style={{ color: "#2b6cb0" }}>
                  {slide.kicker}
                </span>
              </div>
            </div>
          )}

          {/* Headline */}
          <div style={{ animation: "hsModUp2 0.65s cubic-bezier(0.22,1,0.36,1) both" }}>
            {isHero ? (
              <h1 className="font-serif font-light text-[#114dac] leading-[1.1] tracking-tight mb-4" style={{ fontSize: "clamp(1.75rem,3.5vw,2.75rem)" }}>
                The Complete<br />
                <em className="not-italic" style={{ color: "#2b6cb0" }}>Facility Automation</em><br />
                Software Suite
              </h1>
            ) : (
              <h1 className="font-serif font-light text-[#114dac] leading-[1.08] tracking-tight mb-4" style={{ fontSize: "clamp(1.75rem,3.5vw,2.75rem)" }}>
                {slide.title}
              </h1>
            )}
          </div>

          {/* Description — same colour on every slide now (was a lighter
              blue-grey on module slides, tuned for their old dark bg; that
              bg is gone, so this just matches the hero's black). */}
          <div style={{ animation: "hsModUp3 0.8s cubic-bezier(0.22,1,0.36,1) both" }}>
            <p className="text-[13.5px] font-light leading-[1.75] mb-7 max-w-[380px] text-[#000000]">{slide.desc}</p>
          </div>

          {/* CTAs */}
          <div className="flex flex-row flex-wrap items-center gap-3" style={{ animation: "hsModUp4 0.95s cubic-bezier(0.22,1,0.36,1) both" }}>
            {/* Module slides: solid black "Explore the module" (per request). */}
            <Link href={slide.ctaPrimary.href} className={"group inline-flex items-center justify-center gap-2 text-[13px] font-semibold px-7 py-3 rounded-[4px] transition-colors whitespace-nowrap " + (isHero ? "bg-[#114dac] text-white hover:bg-[#0e3e8a]" : "bg-black hover:bg-[#1a1a1a] text-white")}>
              {slide.ctaPrimary.label}
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            {/* "Explore Features" — hero only (2026-09-05 per request: remove
                it from every module slide, keep it on the first slide). */}
            {isHero && (
              <Link
                href={slide.ctaSecondary.href}
                className="inline-flex items-center justify-center text-[13px] font-light px-7 py-3 rounded-[4px] border transition-all duration-200 whitespace-nowrap bg-black hover:bg-[#1a1a1a] text-white border-black"
              >
                {slide.ctaSecondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Bottom indicators */}
      <div className={`${HERO_PX} pb-7 relative z-10`}>
        <div className="flex items-end gap-2 lg:gap-2.5 overflow-x-auto pb-1 no-scrollbar">
          {ALL_SLIDES.map((s, i) => {
            const isActive = i === activeIndex
            return (
              <button
                key={s.key}
                onClick={() => goTo(i)}
                className="cursor-pointer flex-shrink-0 flex flex-col items-start gap-1.5 focus:outline-none"
                aria-label={`Go to slide: ${s.indicatorLabel}`}
              >
                {/* Number or hero dot — wrapped in a fixed-height span so all indicators are same height */}
                <span className="flex items-center" style={{ minHeight: "14px" }}>
                  {s.indicatorId ? (
                    <span
                      className="text-[10px] font-semibold tracking-[0.15em] leading-none transition-colors duration-300"
                      style={{ color: isActive ? slide.accent : "rgba(17,29,53,0.2)" }}
                    >
                      {s.indicatorId}
                    </span>
                  ) : (
                    <span
                      className="block w-[5px] h-[5px] rounded-full transition-colors duration-300"
                      style={{ background: isActive ? slide.accent : "rgba(17,29,53,0.2)" }}
                    />
                  )}
                </span>
                {/* Label — whitespace-nowrap prevents wrapping */}
                <span
                  className="text-[9.5px] font-light transition-colors duration-300 hidden xl:block leading-tight whitespace-nowrap"
                  style={{ color: isActive ? "rgba(17,29,53,0.7)" : "rgba(17,29,53,0.2)" }}
                >
                  {s.indicatorLabel}
                </span>
                {/* Progress track */}
                <div
                  className="h-[2px] rounded-full overflow-hidden"
                  style={{ width: i === 0 ? "20px" : "16px", background: "rgba(17,29,53,0.08)" }}
                >
                  {isActive && (
                    <div
                      key={`bar-${animKey}`}
                      className="h-full rounded-full"
                      style={{
                        background: slide.accent,
                        animation: paused ? "none" : `hsModProg ${MOD_ADVANCE_MS}ms linear forwards`,
                        width: paused ? "100%" : undefined,
                        transition: "background 600ms ease",
                      }}
                    />
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Counter hooks (used by HeroSection right panel) ─────────────────────────

function useCountUp(target: number, duration = 2000, suffix = "") {
  const [display, setDisplay] = useState(`0${suffix}`)
  const start = (go: boolean) => {
    if (!go) return
    const t0 = Date.now()
    const tick = () => {
      const p = Math.min((Date.now() - t0) / duration, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setDisplay(`${Math.round(e * target)}${suffix}`)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }
  return { display, start }
}

function useBarUp(target: number, total: number, duration = 1800) {
  const [width, setWidth] = useState(0)
  const [count, setCount] = useState(0)
  const start = (go: boolean) => {
    if (!go) return
    const t0 = Date.now()
    const tick = () => {
      const p = Math.min((Date.now() - t0) / duration, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setWidth(Math.round(e * (target / total) * 100))
      setCount(Math.round(e * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }
  return { width, count, start }
}

// ─── HERO SECTION — full 2-col layout (left slideshow + right crossfading image) ─
// Slide 0 (Firmity): right = data cards + building photo
// Slides 1-7 (modules): right = per-slide stock image crossfade

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [animKey, setAnimKey] = useState(0)

  const c1 = useCountUp(247, 2000)
  const c2 = useCountUp(14, 1400)
  const c3 = useCountUp(8, 1200)
  const c4 = useCountUp(94, 1800, "%")
  const bar = useBarUp(32, 40, 1800)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const firedRef = useRef(false)

  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true
          c1.start(true); c2.start(true); c3.start(true); c4.start(true); bar.start(true)
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % ALL_SLIDES.length)
      setAnimKey((k) => k + 1)
    }, MOD_ADVANCE_MS)
    return () => clearTimeout(t)
  }, [activeIndex, paused])

  function goTo(i: number) {
    setActiveIndex(i)
    setAnimKey((k) => k + 1)
  }

  // Wrap in both directions with plain modulo arithmetic — no edge cases to
  // get wrong (first slide's "previous" is the last slide, and vice versa).
  // Reuses `goTo`, the exact same path the bottom indicator dots already use
  // and rely on to reset the auto-advance timer (the `[activeIndex, paused]`
  // effect above re-runs whenever activeIndex changes) — no new state, no
  // new failure mode.
  function goToPrev() {
    goTo((activeIndex - 1 + ALL_SLIDES.length) % ALL_SLIDES.length)
  }
  function goToNext() {
    goTo((activeIndex + 1) % ALL_SLIDES.length)
  }

  return (
    <section
      className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[100svh] lg:min-h-[88vh]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Prev/next arrows — bare chevrons (no circle/box, per reference).
          On mobile (below lg) SlideshowLeft's content is vertically CENTERED
          in a min-h-[100svh] panel, so a true vertical-center position for
          the arrows landed them directly on top of the description text —
          and pinning them near the bottom instead (tried, reverted) put
          them right on top of the site-wide fixed WhatsApp button / survey
          widget in the bottom-right corner. The one zone that's reliably
          empty on every slide, on any phone height, is well below the
          sticky navbar and well above the centered text block (there's a
          large gap there specifically because the panel is forced to a
          full viewport tall) — so mobile pins to `top` instead. At lg+, the
          2-column layout has real breathing room on both edges (the left
          arrow sits in the text column's own gutter, the right arrow over
          the image panel), so vertical-center is restored there — verified
          clean against the actual desktop layout. z-20 keeps them above
          every slide's own content (which tops out at z-10) but below the
          sticky navbar (z-50). */}
      <button
        type="button"
        onClick={goToPrev}
        aria-label="Previous slide"
        className="cursor-pointer absolute left-2 sm:left-4 top-20 lg:top-1/2 lg:-translate-y-1/2 z-20 p-1.5 text-[#114dac] opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus-visible:opacity-100"
      >
        <ChevronLeft size={44} strokeWidth={2} />
      </button>
      <button
        type="button"
        onClick={goToNext}
        aria-label="Next slide"
        className="cursor-pointer absolute right-2 sm:right-4 top-20 lg:top-1/2 lg:-translate-y-1/2 z-20 p-1.5 text-[#114dac] opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus-visible:opacity-100"
      >
        <ChevronRight size={44} strokeWidth={2} />
      </button>

      <div className="relative overflow-hidden order-1 min-h-[360px] lg:min-h-0">
        <SlideshowLeft activeIndex={activeIndex} animKey={animKey} paused={paused} goTo={goTo} />
      </div>

      <div ref={panelRef} className="hidden lg:block relative overflow-hidden bg-[#f7f7f7]">
        {/* Panel background — flat gray (RGB 247/247/247), same swatch used
            for the fallback bg above and HomeBlogSection's card background.
            Sits under every slide's image below. */}
        <div className="absolute inset-0" style={{ background: "#f7f7f7" }} />

        {/* One unified treatment for EVERY slide (2026-09-05 per request —
            module slides previously used a full-bleed bg-cover image under a
            dark gradient; "get rid of all the nonsense gradient... make it
            look like the first slide and the image should be at the center
            like in the first slide"). Centered, capped-width <img>,
            crossfaded by opacity. The slow zoom-on-active module slides
            used to have here was removed (2026-09-06 per request — "remove
            the pan zoom from every slide") without touching the hero slide
            (i === 0), which never had it in the first place. Only the hero
            slide gets the "Also available on Android & iOS" caption
            underneath — that's hero-specific copy. */}
        {ALL_SLIDES.map((s, i) => {
          const visible = i === activeIndex
          return (
            <div
              key={s.key}
              className="absolute inset-0 transition-opacity duration-700 ease-out"
              style={{ opacity: visible ? 1 : 0 }}
            >
              <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 lg:px-10 py-10">
                <img
                  src={s.image}
                  alt={s.imageAlt}
                  className="w-full max-w-[560px] h-auto select-none drop-shadow-[0_24px_48px_rgba(17,29,53,0.18)]"
                  draggable={false}
                />
                {i === 0 && (
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-center max-w-[420px]">
                    <span className="text-[11px] font-semibold text-[#2b6cb0] tracking-[0.04em]">
                      Also available on Android &amp; iOS
                    </span>
                    <span className="text-[#c0ccd8]">·</span>
                    <span className="text-[11px] font-light text-[#000000]">
                      same live data on web, desktop, and mobile
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// Kept for backwards compat
export function HeroModulesSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % ALL_SLIDES.length)
      setAnimKey((k) => k + 1)
    }, MOD_ADVANCE_MS)
    return () => clearTimeout(t)
  }, [activeIndex, paused])

  function goTo(i: number) {
    setActiveIndex(i)
    setAnimKey((k) => k + 1)
  }

  return (
    <div
      className="h-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <SlideshowLeft activeIndex={activeIndex} animKey={animKey} paused={paused} goTo={goTo} />
    </div>
  )
}

// (MODULES_LIST used to be redeclared here as a section-local array —
// consolidated 2026-09-05 into the single copy up in §4 "shared constants",
// which now also drives ALL_SLIDES. See the comment there for the
// slug/vignette mapping notes and the ERP title rename.)

// ─── 4b) MODULES SECTION ─────────────────────────────────────────────────────
// UNUSED as of 2026-09-04 — its usage in src/app/page.tsx was commented out
// (not this function; kept intact here in case the tab/vignette layout is
// wanted back) in favor of ExploreSection below, which copies Planon's
// 2-column card-grid layout instead. Same pattern as ProblemsSection: the
// component stays defined and exported, only the JSX call site is disabled.
// (MODULES_LIST itself now lives up in §4 "shared constants", above
// ALL_SLIDES — moved 2026-09-05 so the Hero slideshow can consume it too;
// see the comment on that array.)

const MODULE_ADVANCE_MS = 5000

export function ModulesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const userLocked = useRef(false)

  useEffect(() => {
    if (paused || userLocked.current) return
    const t = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % MODULES_LIST.length)
    }, MODULE_ADVANCE_MS)
    return () => clearTimeout(t)
  }, [activeIndex, paused])

  const active = MODULES_LIST[activeIndex]

  return (
    <section
      className={"grid grid-cols-1 lg:grid-cols-2 " + HERO_MINH}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{`
        @keyframes hsModuleFade {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hsProgress { from { width: 0; } to { width: 100%; } }
      `}</style>

      <div className={"bg-[#114dac] " + HERO_PX + " py-16 lg:py-0 flex flex-col justify-center"}>
        {/* "FIRMITY UNIFIED PLATFORM" kicker removed 2026-09-04 per request */}
        <Reveal>
          {/* Heading changed 2026-09-04 (was "Seven integrated modules. One
              command centre.") — single line now, no <em> accent span needed. */}
          <h2 className="font-serif text-[clamp(1.4rem,3.4vw,2.2rem)] font-light leading-[1.25] tracking-tight text-[#f0f4f8] mb-8 lg:mb-10">
            Explore our cloud-based solutions for preventive planned maintenance
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div role="tablist" aria-label="Platform modules" className="space-y-1 max-w-[460px]">
            {MODULES_LIST.map(({ id, title, Icon }, i) => {
              const isActive = i === activeIndex
              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    userLocked.current = true
                    setActiveIndex(i)
                  }}
                  className={"relative w-full flex items-center gap-3.5 px-4 py-3 text-left rounded-xl overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#63b3ed] " + (isActive ? "bg-white/[0.06]" : "hover:bg-white/[0.03]")}
                >
                  <span
                    className={"absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-[#63b3ed] origin-top transition-transform duration-300 " + (isActive ? "scale-y-100" : "scale-y-0")}
                  />
                  <span className={"text-[10px] font-medium transition-colors duration-300 " + (isActive ? "text-[#63b3ed]" : "text-white/[0.25]")}>
                    {id}
                  </span>
                  <span className={"transition-colors duration-300 " + (isActive ? "text-[#63b3ed]" : "text-white/[0.35]")}>
                    <Icon size={15} strokeWidth={1.5} />
                  </span>
                  <span className={"text-[12px] font-medium flex-1 transition-colors duration-300 " + (isActive ? "text-[#f0f4f8]" : "text-white/[0.45]")}>
                    {title}
                  </span>
                  <ArrowRight
                    size={13}
                    className={"transition-all duration-300 " + (isActive ? "opacity-100 translate-x-0 text-[#63b3ed]" : "opacity-0 -translate-x-1 text-white/[0.3]")}
                  />
                  {isActive && !paused && !userLocked.current && (
                    <span
                      className="absolute bottom-0 left-0 h-[1.5px] bg-[#63b3ed]/40"
                      style={{ animation: "hsProgress " + MODULE_ADVANCE_MS + "ms linear forwards" }}
                    />
                  )}
                </button>
              )
            })}
          </div>
          <Link
            href="/features"
            className="inline-flex items-center gap-1.5 text-[#63b3ed] text-[12px] font-medium hover:gap-2.5 transition-all mt-6"
          >
            See all features <ArrowRight size={13} />
          </Link>
        </Reveal>
      </div>

      {/* bg-white/60 → solid bg-[#f7f7f7] (2026-09-04, per request) — matches
          the gray used elsewhere on the page (Hero right panel, "Browse our
          latest resources"), not the translucent-over-page-wash pattern. */}
      <div className="hidden lg:flex bg-[#f7f7f7] border-l border-[#dbe5f0] items-center justify-center p-6 sm:p-10 lg:p-14">
        <div className="w-full max-w-[520px]">
          <div key={active.slug} style={{ animation: "hsModuleFade 450ms cubic-bezier(0.22,1,0.36,1)" }}>
            <div className="min-h-[250px]">
              <ModuleVignette id={active.slug} />
            </div>
            <div className="mt-5">
              <p className="text-[12.5px] font-light text-[#000000] leading-[1.8] mb-3">{active.desc}</p>
              <Link
                href={"/features#" + active.slug}
                className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#2b6cb0] hover:gap-3.5 transition-all"
              >
                Explore {active.title} <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
        </div>
    </section>
  )
}

// ─── EXPLORE SECTION — Planon-style 2-col solutions grid (2026-09-04) ────────
// New homepage section, replaces ModulesSection above (see its unused-note).
// Layout copied from planonsoftware.com/us's "Explore our solutions" block:
// intro paragraph, then a 2-column grid of bordered white cards — title +
// description + "Learn more" on the left, a solid-blue icon square on the
// right — on a light-gray section background (#f7f7f7, matches the gray
// used elsewhere on this page). Content is Firmity's own 8 modules
// (MODULES_LIST above), not Planon's copy.
export function ExploreSection() {
  return (
    // py-14 lg:py-20 → flat py-10 (2026-09-04, per request: "the top gap
    // between Explore our solutions should be the same as the top gap in
    // Browse our latest resources" — HomeBlogSection above uses a flat
    // py-10 with no lg: bump, so this now matches it exactly instead of
    // guessing a proportionally-scaled value).
    // id="explore-solutions" (2026-09-05) — target of the navbar's new "Our
    // Solutions" link (/#explore-solutions, src/components/navigation.tsx).
    // NOTE (2026-09-05 fix): this used to also carry `scroll-mt-16`
    // (scroll-margin-top: 64px) — but globals.css's `html{scroll-padding-top:
    // 64px}` ALREADY reserves that same 64px sitewide. scroll-margin (on the
    // target) and scroll-padding (on the scroll container) are additive per
    // spec, so having both stacked to a 128px reserved gap — exactly why the
    // landing consistently stopped one nav-height short with the previous
    // section's tail still showing. Removed here; the single sitewide
    // scroll-padding-top is enough and keeps every anchor consistent — kept
    // in sync with navigation.tsx's NAV_HEIGHT constant (was scroll-mt-24
    // when the navbar was briefly h-24; reverted together 2026-09-05). The
    // actual scroll (both same-page and cross-page) is now driven by
    // src/hooks/use-hash-scroll.ts's scrollIntoView, not a bare CSS
    // scroll-behavior jump — see that file for why.
    <section id="explore-solutions" className="bg-[#f7f7f7] py-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* mb-10 lg:mb-14 → mb-6 lg:mb-8 (2026-09-04, per request: "reduce
            the gap between the cards and [this paragraph]") */}
        <Reveal>
          <h2 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-[1.15] text-[#114dac] tracking-tight mb-4">
            Explore our cloud-based solutions
          </h2>
          <p className="text-[13.5px] font-light leading-[1.8] text-[#000000] max-w-[720px] mb-6 lg:mb-8">
            Firmity brings every facility operation onto one secure, cloud-based platform and automates task management,
            asset management, inventory management, visitor management, staff management, payroll, and expense
            management. Elevate your facility operations beyond spreadsheets with Firmity.
          </p>
        </Reveal>

        {/* rounded-xl → rounded-[4px] (2026-09-04, per request: "the
            roundness of all these should be the same as the blog" —
            matches HomeBlogSection's card radius exactly, on both the card
            and the icon square). Whole card is a <Link>, per request "the
            entire card should be clickable", with `cursor-pointer` explicit
            and `group` driving the "Learn more" hover state.
            2-col → 3-col (2026-09-04, per request: "let's also try to fit 3
            instead of 2... if i dont like it, i will ask you to revert" —
            this is the ONE line to change back: `lg:grid-cols-2`, gap-6).
            Card padding p-6/p-8 → p-5/p-6 and gap-6/gap-8 → gap-4/gap-6
            (2026-09-04, per request: "make the cards more compact... reduce
            the gap between the cards"). Icon square 84–104px → 64–76px to
            fit 3-up without crowding.
            Icon composition changed to a building motif (2026-09-04, per
            request: "use the buildings in iconography for the explore our
            solutions" — matches Planon's own icon style, a building
            silhouette with a small circular badge in the corner carrying
            each module's own glyph, rather than one bespoke icon per card. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {MODULES_LIST.map(({ id, slug, title, desc, Icon }, i) => (
            <Reveal key={id} delay={i * 40}>
              <Link
                href={"/features#" + slug}
                className="group h-full flex items-start justify-between gap-4 bg-white border border-[#e2e8f0] rounded-[4px] p-5 sm:p-6 cursor-pointer hover:border-[#114dac]/40 hover:shadow-[0_10px_30px_rgba(17,77,172,0.08)] transition-all"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#114dac] mb-2 leading-snug">
                    {title}
                  </h3>
                  <p className="text-[12px] font-light text-[#000000] leading-relaxed mb-4">
                    {desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[#114dac] text-[12px] font-semibold group-hover:gap-2.5 transition-all">
                    Learn more <ArrowRight size={12} />
                  </span>
                </div>
                <div className="flex-shrink-0 w-[64px] h-[64px] sm:w-[76px] sm:h-[76px] rounded-[4px] bg-[#114dac] flex items-center justify-center">
                  {/* Small Building2 corner badge removed 2026-09-04 per
                      request ("remove the tiny buildings icons from the
                      explore our solutions") — each module's own
                      differentiating icon is the square's only icon now.
                      `relative`/`overflow-visible` on this div were only
                      needed to let that badge straddle the corner, so both
                      dropped along with it. */}
                  <Icon size={30} className="text-white" strokeWidth={1.5} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── KEEP IN TOUCH SECTION (2026-09-04) ───────────────────────────────────────
// New section, placed directly after ExploreSection per request. Layout
// copied from planonsoftware.com/us's "Keep in touch" block: dark panel,
// newsletter email capture on the left, "Or connect with us on" + social
// icons on the right.
// No photo asset for this exists in the repo (public/images only has the
// dashboard/phone mockup and the pillar illustration) — used the same dark
// gradient treatment as the "See Firmity in Action" video panel elsewhere on
// this page instead of lifting Planon's own photo. Swap in a real photo via
// a background-image style on the outer div once one is supplied.
// Newsletter form wired to /api/newsletter (2026-09-04, per request: "make
// sure that the Subscribe to our newsletter and Keep in touch sign up cta
// are both connected to firmity9@gmail.com like the rest" — was UI-only
// before, no backend to submit to). Same honeypot + min-submit-time bot
// resistance as the other lead-capture forms (brochure-download-form.tsx
// etc.), duplicated inline here rather than factored out since this form's
// visual treatment (dark banner, glass-adjacent styling) is specific to
// this section and not shared with any other form.
// Social links confirmed by user (2026-09-04): Instagram, LinkedIn, YouTube,
// X (handle "firmityglobal" — URL constructed as https://x.com/firmityglobal,
// not literally supplied). Facebook intentionally omitted — user said "i
// think is connected" with no URL given; add it once confirmed rather than
// guessing a link that may be wrong.
const NEWSLETTER_MIN_SUBMIT_MS = 1500

// bannerImage (2026-09-08): optional override so a page other than the
// homepage can reuse this exact component/layout with its own banner
// photo instead of contact_banner.png — added for /features, which uses
// features_banner.png here ("same size as the banner on the homepage" —
// literally the same component, so size/treatment can't drift, only the
// photo changes). Defaults preserve the homepage's existing behavior
// exactly (same file, same prop-less call site in src/app/page.tsx).
export function KeepInTouchSection({
  bannerImage = "/images/contact_banner.png",
  // bannerPosition (2026-09-09): optional CSS background-position override,
  // independent from bannerImage — added because /features' banner photo
  // (features_banner.png) has its subject's face high in the frame; the
  // previous fixed center-crop was clipping the top of her head there.
  // "center top" shows the full top of the image (no crop from the top
  // edge) so a face positioned high in a photo is never cut off. The
  // homepage's contact_banner.png keeps its existing default ("center")
  // untouched.
  bannerPosition = "center",
}: { bannerImage?: string; bannerPosition?: string } = {}) {
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("") // honeypot — must stay empty
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const mountedAt = useRef(Date.now())

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (website.trim().length > 0 || Date.now() - mountedAt.current < NEWSLETTER_MIN_SUBMIT_MS) {
      return
    }
    setSubmitting(true)
    setError("")
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "keep-in-touch", website }),
      })
      if (!res.ok) throw new Error("Failed to sign up")
      setSubmitted(true)
      setEmail("")
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }

  const socialLinks = [
    { label: "Instagram", href: "https://www.instagram.com/_firmity_?igsi=dGt2d2hjOW4wbnJo", Icon: Instagram },
    { label: "LinkedIn", href: "https://www.linkedin.com/showcase/firmity-software-real-estate/", Icon: Linkedin },
    { label: "YouTube", href: "https://www.youtube.com/@Firmity", Icon: Youtube },
    { label: "X", href: "https://x.com/firmityglobal", Icon: XIcon },
  ]

  return (
    <section className="relative overflow-hidden">
      {/* Banner photo, per request. public/images/contact_banner.png already
          existed in the repo (user placed it there) — a wide 2120×742
          office photo with a deliberate empty dark panel on its left third,
          clearly composed for text to sit over that side. Overlay tint
          changed from a dark-navy gradient to Planon blue (2026-09-04, per
          follow-up: "i dont want the dark blue gradient on the banner, i
          want the blue which planon has which we have used everywhere" —
          rgba(17,77,172,*) is #114dac, the same primary token used
          everywhere else on the site). Still a left→right gradient
          (strongest over the text, fading toward the photo's people on the
          right) so the photo isn't fully obscured. Opacity stops lowered
          0.88/0.62/0.28/0.16 → 0.60/0.40/0.18/0.08 (2026-09-04 follow-up,
          per "reduce the opacity of the blue gradient on the banner
          image") — photo now reads through more clearly under the text. */}
      <div
        className="absolute inset-0 bg-cover"
        style={{ backgroundImage: `url(${bannerImage})`, backgroundPosition: bannerPosition }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(90deg, rgba(17,77,172,0.60) 0%, rgba(17,77,172,0.40) 45%, rgba(17,77,172,0.18) 75%, rgba(17,77,172,0.08) 100%)" }}
      />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 lg:py-16">
        <h2 className="font-serif text-[clamp(1.6rem,3.6vw,2.2rem)] font-light text-white mb-2.5">
          Keep in touch
        </h2>
        <p className="text-[13px] font-light text-white/60 leading-relaxed mb-8 max-w-[480px]">
          Register for our newsletter to receive free resources and industry news.
        </p>

        {/* Form and social icons share ONE row now (2026-09-04, per request
            "align the social icons with the Keep in touch form") — was two
            independently-centered blocks (heading+subtext+form vs.
            label+icons), which let the icon row drift out of line with the
            input row whenever the two blocks' heights differed. Now only
            this row is centered, so the input and the icons sit on the
            same baseline regardless of block height. */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10">
          <div className="max-w-[480px] w-full lg:w-auto">
            {submitted ? (
              <div className="flex items-center gap-2 text-[13px] text-white font-medium">
                <CheckCircle2 size={16} className="flex-shrink-0" />
                Thanks for signing up!
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                {/* Honeypot — hidden off-screen, same pattern as brochure-download-form.tsx */}
                <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="keepintouch-website">Website</label>
                  <input
                    id="keepintouch-website"
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your e-mail address"
                  className="flex-1 min-w-0 text-[13px] px-4 py-3 rounded-[4px] border border-[#cbd5e0] bg-white text-[#114dac] placeholder:text-[#000000] focus:outline-none focus:border-[#114dac] focus:ring-1 focus:ring-[#114dac] transition-colors"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="cursor-pointer bg-[#114dac] hover:bg-[#0e3e8a] text-white text-[13px] font-semibold px-6 py-3 rounded-[4px] transition-colors flex-shrink-0 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? <Loader2 size={15} className="animate-spin" /> : "Sign up now"}
                </button>
              </form>
            )}
            {error && (
              <div className="mt-2 flex items-center gap-1.5 text-[12px] text-red-200">
                <AlertCircle size={13} className="flex-shrink-0" />
                {error}
              </div>
            )}
          </div>

          <div className="flex-shrink-0">
            <p className="text-[12px] font-semibold text-white uppercase tracking-[0.14em] mb-3 lg:text-right">
              Or connect with us on
            </p>
            {/* Filled Planon blue + white (2026-09-04, per request: "fill
                the social media icons with planon blue and white" — was a
                translucent outline that only filled solid blue on hover). */}
            <div className="flex items-center gap-3 lg:justify-end">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="cursor-pointer w-10 h-10 rounded-full bg-[#114dac] hover:bg-[#0e3e8a] border border-[#114dac] hover:border-[#0e3e8a] flex items-center justify-center text-white transition-colors"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
