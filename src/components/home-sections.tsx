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
import { useEffect, useRef, useState, type CSSProperties, type FC } from "react"
import { Reveal } from "@/src/components/reveal"
import { ModuleVignette } from "@/src/components/module-vignette"
import {
  ArrowRight,
  Home as HomeIcon,
  Radio,
  ClipboardList,
  ShieldCheck,
  Package,
  Users,
  Eye,
  type LucideProps,
} from "lucide-react"

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

interface ModuleItem {
  id: string
  /** Anchor slug — must match section ids on /features. */
  slug: string
  title: string
  desc: string
  Icon: FC<LucideProps>
}

const MODULES: ModuleItem[] = [
  { id: "01", slug: "facility-records",       title: "Cloud-based Records",          desc: "Centralised, always-accessible records for every asset, vendor, and compliance document across your estate.", Icon: HomeIcon },
  { id: "02", slug: "preventive-maintenance", title: "Planned Preventive Maintenance",        desc: "Schedule and auto-trigger PPM cycles. Extend asset lifespan through intelligent, timely interventions.",       Icon: Radio },
  { id: "03", slug: "complaint-management",   title: "Complaint Management System",           desc: "QR-based ticket raising from any location. Assigned, tracked, and closed with a full audit trail.",              Icon: ClipboardList },
  { id: "04", slug: "asset-management",       title: "Asset Management & Alerts",             desc: "Live asset registry with lifecycle alerts, AMC tracking, and warranty expiry notifications.",                     Icon: ShieldCheck },
  { id: "05", slug: "inventory-management",   title: "Inventory Purchase & Stock",            desc: "Stock tracking, auto-reorder triggers, vendor management, and purchase approval workflows.",                      Icon: Package },
  { id: "06", slug: "staff-attendance",       title: "Staff Attendance Management",           desc: "Face-recognition attendance, shift scheduling, and real-time presence tracking across all sites.",               Icon: Users },
  { id: "07", slug: "visitor-management",     title: "Visitor Management",                    desc: "Digital gate entries, host approvals, badge printing, and full visitor logs — contactless and audit-ready.",      Icon: Eye },
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
          <h2 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-[1.15] tracking-tight text-[#1a202c] mb-4">
            Small gaps in daily operations.<br />
            <em className="not-italic text-[#2b6cb0]">Big costs</em> in time, money,<br />
            and compliance.
          </h2>
          <p className="text-[13.5px] font-light leading-[1.8] text-[#4a5568] max-w-[400px]">
            A missed AMC renewal. An overlooked water tank cleaning. An untracked vendor payment.
            None of these feel urgent on the day — all of them compound into downtime, penalties,
            and audit failures. Watch how Firmity closes each one.
          </p>
        </Reveal>
      </div>

      {/* Right — live risk board */}
      <div className="hidden lg:flex items-center justify-center p-6 sm:p-10 lg:p-14 bg-[#111d35]">
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
      <div ref={trackRef} className={`${HERO_PX} py-10 lg:py-14 w-full`}>
        <Reveal>
          <div className="mb-8 lg:mb-12">
            <SectionKicker text="Why Choose Firmity" />
            <h2 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-[1.15] tracking-tight text-[#1a202c] mb-3">
              Built for <em className="not-italic text-[#2b6cb0]">operational clarity</em>
            </h2>
            <p className="text-[13.5px] font-light leading-[1.8] text-[#4a5568] max-w-[460px]">
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
                  className="relative flex w-full gap-4 text-left"
                >
                  <span className={`relative z-10 flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full border text-[12px] font-medium transition-all duration-300 ${activePhoto === i ? "border-[#2b6cb0] bg-[#2b6cb0] text-white" : "border-[#2b6cb0]/40 bg-white text-[#2b6cb0]"}`}>{num}</span>
                  <div>
                    <span className={`mb-1 inline-block rounded-lg border px-2 py-[3px] text-[9px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${activePhoto === i ? "border-[#2b6cb0]/40 text-[#2b6cb0]" : "border-[#2b6cb0]/20 text-[#2b6cb0]/55"}`}>{tag}</span>
                    <h3 className={`mb-1 font-serif text-[15px] font-normal leading-snug transition-colors ${activePhoto === i ? "text-[#1a202c]" : "text-[#4a5568]"}`}>{title}</h3>
                    <p className="text-[12.5px] font-light leading-[1.65] text-[#718096]">{desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right — cycling photo panel */}
          <div className="relative h-[420px] overflow-hidden rounded-[24px] bg-[#111d35]">
            {BENEFITS.map(({ img, imgAlt, tag }, i) => (
              <div key={img} className="absolute inset-0 transition-opacity duration-700 ease-out" style={{ opacity: activePhoto === i ? 1 : 0 }} aria-hidden={activePhoto !== i}>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform ease-out"
                  style={{ backgroundImage: `url('${img}')`, transform: activePhoto === i ? "scale(1.06)" : "scale(1)", transitionDuration: "6000ms" }}
                  role="img" aria-label={imgAlt}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111d35]/85 via-[#111d35]/15 to-transparent" />
                <span className="absolute bottom-5 left-6 rounded-lg bg-[#111d35]/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">{tag}</span>
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
                  <h3 className="mb-1 font-serif text-[1rem] font-normal leading-snug text-[#1a202c]">{title}</h3>
                  <p className="text-[12.5px] font-light leading-[1.65] text-[#4a5568]">{desc}</p>
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
      <div className={`${HERO_PX} py-14 lg:py-20 w-full`}>
        <Reveal className="text-center mb-10 lg:mb-14">
          <div className="flex items-center gap-3 mb-3 justify-center">
            <div className="w-6 h-px bg-[#2b6cb0]/40" />
            <span className="text-[#2b6cb0] text-[10px] font-semibold tracking-[0.2em] uppercase">Built on Three Pillars</span>
            <div className="w-6 h-px bg-[#2b6cb0]/40" />
          </div>
          <h2 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-[1.15] tracking-tight text-[#1a202c] max-w-2xl mx-auto mb-3">
            The foundations of <em className="not-italic text-[#2b6cb0]">smarter facility management</em>
          </h2>
          <p className="text-[13.5px] font-light leading-[1.8] text-[#4a5568] max-w-[460px] mx-auto">
            Every module in Firmity is built around three principles — get more done, protect what you own, and waste less doing it.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {PILLARS.map(({ numeral, title, headline, desc, accent, icon }) => (
              <div
                key={numeral}
                className="rounded-[20px] border border-[#eef3f9] bg-white/70 p-7 lg:p-8 flex flex-col items-center text-center transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(17,29,53,0.07)]"
              >
                <img src={icon} alt="" className="w-[150px] h-auto mb-5 select-none" draggable={false} />
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: accent }}>
                  {title}
                </span>
                <h3 className="font-serif text-[1.15rem] font-normal leading-snug text-[#1a202c] mb-2">
                  {headline}
                </h3>
                <p className="text-[12.5px] font-light leading-[1.7] text-[#718096]">
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

const MODULE_ACCENTS = [
  { bg: "#0c1a32", accent: "#63b3ed" },  // 01 — Facility Records — blue
  { bg: "#0b2018", accent: "#4ade80" },  // 02 — Preventive Maintenance — green
  { bg: "#1a0e2e", accent: "#a78bfa" },  // 03 — Complaint Management — violet
  { bg: "#1c1a08", accent: "#fbbf24" },  // 04 — Asset Management — amber
  { bg: "#1c100c", accent: "#fb923c" },  // 05 — Inventory — orange
  { bg: "#0a1620", accent: "#38bdf8" },  // 06 — Staff Attendance — sky
  { bg: "#0f1c2e", accent: "#f472b6" },  // 07 — Visitor Management — pink
]

const MODULE_PAGES: Record<string, string> = {
  "facility-records":       "/facility-records",
  "preventive-maintenance": "/preventive-maintenance",
  "complaint-management":   "/complaint-management",
  "asset-management":       "/asset-management",
  "inventory-management":   "/inventory-management",
  "staff-attendance":       "/staff-attendance",
  "visitor-management":     "/visitor-management",
}

const MOD_ADVANCE_MS = 5500

// ─── 4a) HERO MODULES SLIDESHOW — fills the hero left column ──────────────────
// Slide 0 = original hero ("Powered by UFirm Technologies" / full h1 / Book a Demo)
// Slides 1–6 = the 6 product modules with per-module accent colors
// Unified template; slide 0 detected by index to render the branded headline variant.

type SlideEntry = {
  key: string
  indicatorId: string
  indicatorLabel: string
  kicker: string
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
    kicker: "Powered by UFirm Technologies",
    bg: "#111d35",
    accent: "#63b3ed",
    ctaPrimary:   { label: "Book a Demo",      href: "/contact"  },
    ctaSecondary: { label: "Explore Features", href: "/features" },
    desc: "Firmity is a smart, integrated facility management software built to simplify operations, enhance visibility, and empower teams with real-time control over maintenance, assets, workforce, and compliance.",
    image:    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85&fit=crop&crop=top",
    imageAlt: "Modern commercial facility exterior",
  },
  {
    key: MODULES[0].id, indicatorId: MODULES[0].id, indicatorLabel: "Cloud Records",
    kicker: `Module ${MODULES[0].id}`, bg: MODULE_ACCENTS[0].bg, accent: MODULE_ACCENTS[0].accent,
    ctaPrimary: { label: "Explore Module", href: MODULE_PAGES[MODULES[0].slug] ?? `/features#${MODULES[0].slug}` },
    ctaSecondary: { label: "Explore Features", href: "/features" },
    desc: MODULES[0].desc, title: MODULES[0].title,
    image:    "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=900&q=80&fit=crop",
    imageAlt: "Digital records and server room",
  },
  {
    key: MODULES[1].id, indicatorId: MODULES[1].id, indicatorLabel: "PPM",
    kicker: `Module ${MODULES[1].id}`, bg: MODULE_ACCENTS[1].bg, accent: MODULE_ACCENTS[1].accent,
    ctaPrimary: { label: "Explore Module", href: MODULE_PAGES[MODULES[1].slug] ?? `/features#${MODULES[1].slug}` },
    ctaSecondary: { label: "Explore Features", href: "/features" },
    desc: MODULES[1].desc, title: MODULES[1].title,
    image:    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80&fit=crop",
    imageAlt: "Engineer performing preventive maintenance",
  },
  {
    key: MODULES[2].id, indicatorId: MODULES[2].id, indicatorLabel: "Complaints",
    kicker: `Module ${MODULES[2].id}`, bg: MODULE_ACCENTS[2].bg, accent: MODULE_ACCENTS[2].accent,
    ctaPrimary: { label: "Explore Module", href: MODULE_PAGES[MODULES[2].slug] ?? `/features#${MODULES[2].slug}` },
    ctaSecondary: { label: "Explore Features", href: "/features" },
    desc: MODULES[2].desc, title: MODULES[2].title,
    image:    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80&fit=crop",
    imageAlt: "Helpdesk team collaboration",
  },
  {
    key: MODULES[3].id, indicatorId: MODULES[3].id, indicatorLabel: "Assets",
    kicker: `Module ${MODULES[3].id}`, bg: MODULE_ACCENTS[3].bg, accent: MODULE_ACCENTS[3].accent,
    ctaPrimary: { label: "Explore Module", href: MODULE_PAGES[MODULES[3].slug] ?? `/features#${MODULES[3].slug}` },
    ctaSecondary: { label: "Explore Features", href: "/features" },
    desc: MODULES[3].desc, title: MODULES[3].title,
    image:    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80&fit=crop",
    imageAlt: "Industrial machinery asset management",
  },
  {
    key: MODULES[4].id, indicatorId: MODULES[4].id, indicatorLabel: "Inventory",
    kicker: `Module ${MODULES[4].id}`, bg: MODULE_ACCENTS[4].bg, accent: MODULE_ACCENTS[4].accent,
    ctaPrimary: { label: "Explore Module", href: MODULE_PAGES[MODULES[4].slug] ?? `/features#${MODULES[4].slug}` },
    ctaSecondary: { label: "Explore Features", href: "/features" },
    desc: MODULES[4].desc, title: MODULES[4].title,
    image:    "https://images.unsplash.com/photo-1553413077-190dd305871c?w=900&q=80&fit=crop",
    imageAlt: "Warehouse inventory shelves",
  },
  {
    key: MODULES[5].id, indicatorId: MODULES[5].id, indicatorLabel: "Attendance",
    kicker: `Module ${MODULES[5].id}`, bg: MODULE_ACCENTS[5].bg, accent: MODULE_ACCENTS[5].accent,
    ctaPrimary: { label: "Explore Module", href: MODULE_PAGES[MODULES[5].slug] ?? `/features#${MODULES[5].slug}` },
    ctaSecondary: { label: "Explore Features", href: "/features" },
    desc: MODULES[5].desc, title: MODULES[5].title,
    image:    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80&fit=crop",
    imageAlt: "Staff team attendance management",
  },
  {
    key: MODULES[6].id, indicatorId: MODULES[6].id, indicatorLabel: "Visitor",
    kicker: `Module ${MODULES[6].id}`, bg: MODULE_ACCENTS[6].bg, accent: MODULE_ACCENTS[6].accent,
    ctaPrimary: { label: "Explore Module", href: MODULE_PAGES[MODULES[6].slug] ?? `/features#${MODULES[6].slug}` },
    ctaSecondary: { label: "Explore Features", href: "/features" },
    desc: MODULES[6].desc, title: MODULES[6].title,
    image:    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80&fit=crop",
    imageAlt: "Reception desk and visitor check-in",
  },
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
      // isHero: translucent white (not flat #fff) so the page's fixed beige
      // page-wash gradient shows through underneath — same treatment as the
      // "Real Challenges, Real Solutions" (Problems) section's bg-white/60.
      style={{ background: isHero ? "rgba(255,255,255,0.6)" : slide.bg, transition: "background 600ms ease", ["--ink" as string]: inkAccent(slide.accent) } as CSSProperties}
    >
      {/* Phone only: a clean light gradient tinted to the active slide's colour
          replaces the photo (photos hurt text legibility on small screens). The
          desktop panel below keeps its flat `slide.bg`. Inked text sits on top. */}
      <div
        className="lg:hidden absolute inset-0 z-0 transition-[background] duration-700"
        aria-hidden
        style={{
          background: isHero
            ? "linear-gradient(160deg, #ffffff 0%, #f7f1e6 62%, #f1e8d7 100%)"
            : slide.bg,
        }}
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
          {/* Kicker */}
          <div style={{ animation: "hsModUp 0.5s cubic-bezier(0.22,1,0.36,1) both" }}>
            <div className="flex items-center gap-3 mb-5">
              {/* isHero: fixed to the "Big costs" blue (#2b6cb0), same as the
                  Problems section accent — was the lighter slide.accent
                  (#63b3ed). Module slides (isHero false) keep their own
                  per-module accent, unaffected. */}
              <div className="w-5 h-px" style={{ background: isHero ? "#2b6cb0" : slide.accent, transition: "background 600ms ease" }} />
              <span className="text-[10px] font-semibold tracking-[0.22em] uppercase" style={{ color: isHero ? "#2b6cb0" : slide.accent, transition: "color 600ms ease" }}>
                {slide.kicker}
              </span>
            </div>
          </div>

          {/* Headline */}
          <div style={{ animation: "hsModUp2 0.65s cubic-bezier(0.22,1,0.36,1) both" }}>
            {isHero ? (
              <h1 className="font-serif font-light text-[#111d35] leading-[1.1] tracking-tight mb-4" style={{ fontSize: "clamp(1.75rem,3.5vw,2.75rem)" }}>
                The Complete<br />
                <em className="not-italic" style={{ color: "#2b6cb0" }}>Facility Automation</em><br />
                Software Suite
              </h1>
            ) : (
              <h1 className="font-serif font-light text-[#f0f4f8] leading-[1.08] tracking-tight mb-4" style={{ fontSize: "clamp(1.75rem,3.5vw,2.75rem)" }}>
                {slide.title}
              </h1>
            )}
          </div>

          {/* Description */}
          <div style={{ animation: "hsModUp3 0.8s cubic-bezier(0.22,1,0.36,1) both" }}>
            <p className={"text-[13.5px] font-light leading-[1.75] mb-7 max-w-[380px] " + (isHero ? "text-[#4a5568]" : "text-[#8ba5be]")}>{slide.desc}</p>
          </div>

          {/* CTAs */}
          <div className="flex flex-row flex-wrap items-center gap-3" style={{ animation: "hsModUp4 0.95s cubic-bezier(0.22,1,0.36,1) both" }}>
            <Link href={slide.ctaPrimary.href} className={"group inline-flex items-center justify-center gap-2 text-[13px] font-semibold px-7 py-3 transition-colors whitespace-nowrap " + (isHero ? "bg-[#111d35] text-white hover:bg-[#1a2744]" : "bg-white text-[#1a2744] hover:bg-[#e8f0fb]")}>
              {slide.ctaPrimary.label}
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href={slide.ctaSecondary.href}
              className="inline-flex items-center justify-center text-[13px] font-light px-7 py-3 border transition-all duration-200 whitespace-nowrap"
              style={isHero ? { borderColor: "rgba(17,29,53,0.18)", color: "rgba(17,29,53,0.5)" } : { borderColor: `${slide.accent}28`, color: `${slide.accent}80` }}
            >
              {slide.ctaSecondary.label}
            </Link>
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
                className="flex-shrink-0 flex flex-col items-start gap-1.5 focus:outline-none"
                aria-label={`Go to slide: ${s.indicatorLabel}`}
              >
                {/* Number or hero dot — wrapped in a fixed-height span so all indicators are same height */}
                <span className="flex items-center" style={{ minHeight: "14px" }}>
                  {s.indicatorId ? (
                    <span
                      className="text-[10px] font-semibold tracking-[0.15em] leading-none transition-colors duration-300"
                      style={{ color: isActive ? slide.accent : (isHero ? "rgba(17,29,53,0.2)" : "rgba(255,255,255,0.22)") }}
                    >
                      {s.indicatorId}
                    </span>
                  ) : (
                    <span
                      className="block w-[5px] h-[5px] rounded-full transition-colors duration-300"
                      style={{ background: isActive ? slide.accent : (isHero ? "rgba(17,29,53,0.2)" : "rgba(255,255,255,0.22)") }}
                    />
                  )}
                </span>
                {/* Label — whitespace-nowrap prevents wrapping */}
                <span
                  className="text-[9.5px] font-light transition-colors duration-300 hidden xl:block leading-tight whitespace-nowrap"
                  style={{ color: isActive ? (isHero ? "rgba(17,29,53,0.7)" : "rgba(255,255,255,0.78)") : (isHero ? "rgba(17,29,53,0.2)" : "rgba(255,255,255,0.22)") }}
                >
                  {s.indicatorLabel}
                </span>
                {/* Progress track */}
                <div
                  className="h-[2px] rounded-full overflow-hidden"
                  style={{ width: i === 0 ? "20px" : "16px", background: isHero ? "rgba(17,29,53,0.08)" : "rgba(255,255,255,0.08)" }}
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

  const isHeroSlide = activeIndex === 0

  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-2 min-h-[100svh] lg:min-h-[88vh]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden order-1 min-h-[360px] lg:min-h-0">
        <SlideshowLeft activeIndex={activeIndex} animKey={animKey} paused={paused} goTo={goTo} />
      </div>

      <div ref={panelRef} className="hidden lg:block relative overflow-hidden bg-[#f5eddd]">

        <div
          className="absolute inset-0 transition-opacity duration-700 ease-out"
          style={{ opacity: isHeroSlide ? 1 : 0 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85&fit=crop&crop=top')" }}
          />
          {/* EXPERIMENT (2026-09-01, user asked to preview a light treatment
              here instead of the flat navy/85 overlay) — same beige-gradient
              family as .page-wash / the mobile hero gradient above, just
              opaque enough to keep the stat cards legible over the photo.
              Easy to revert: swap this div back to `bg-[#111d35]/85` and
              restore the card/text colors below to their white/[0.NN] values. */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(160deg, rgba(253,251,247,0.94) 0%, rgba(245,237,221,0.92) 55%, rgba(239,228,210,0.94) 100%)" }}
          />
          <div className="relative z-10 p-4 sm:p-6 lg:p-7 flex flex-col gap-2.5 h-full">
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-white/70 border border-[#e2e8f0] rounded-xl p-3 sm:p-3.5 backdrop-blur-sm">
                <div className="text-[8.5px] text-[#718096] uppercase tracking-[0.14em] mb-1.5">Assets Tracked</div>
                <div className="font-sans text-[20px] sm:text-[22px] font-light text-[#2b6cb0] leading-none">{c1.display}</div>
                <div className="text-[8px] text-[#38a169] mt-1">All active</div>
              </div>
              <div className="bg-white/70 border border-[#e2e8f0] rounded-xl p-3 sm:p-3.5 backdrop-blur-sm">
                <div className="text-[8.5px] text-[#718096] uppercase tracking-[0.14em] mb-1.5">PPM Due</div>
                <div className="font-sans text-[20px] sm:text-[22px] font-light text-[#c53030] leading-none">{c2.display}</div>
                <div className="text-[8px] text-[#c53030]/75 mt-1">This week</div>
              </div>
            </div>

            <div className="bg-white/70 border border-[#e2e8f0] rounded-xl p-3 sm:p-3.5 backdrop-blur-sm">
              <div className="text-[8.5px] text-[#718096] uppercase tracking-[0.14em] mb-2">Staff Attendance Today</div>
              <div className="bg-[#e2e8f0] h-[2px] w-full rounded-full">
                <div
                  className="h-[2px] rounded-full bg-[#2b6cb0] transition-all duration-[1800ms]"
                  style={{ width: bar.width + "%" }}
                />
              </div>
              <div className="text-[8.5px] text-[#a0aec0] mt-1.5">{bar.count} of 40 staff present</div>
            </div>

            <div className="bg-white/70 border border-[#e2e8f0] rounded-xl p-3 sm:p-3.5 backdrop-blur-sm grid grid-cols-2 gap-3">
              <div>
                <div className="text-[8.5px] text-[#718096] uppercase tracking-[0.14em] mb-1.5">Open Tickets</div>
                <div className="font-sans text-[20px] sm:text-[22px] font-light text-[#b7791f] leading-none">{c3.display}</div>
                <div className="text-[8px] text-[#b7791f]/75 mt-1">Awaiting action</div>
              </div>
              <div>
                <div className="text-[8.5px] text-[#718096] uppercase tracking-[0.14em] mb-1.5">Compliance</div>
                <div className="font-sans text-[20px] sm:text-[22px] font-light text-[#2b6cb0] leading-none">{c4.display}</div>
                <div className="text-[8px] text-[#3182ce]/75 mt-1">On track</div>
              </div>
            </div>

            <div className="bg-white/70 border border-[#e2e8f0] rounded-xl p-3 sm:p-3.5 backdrop-blur-sm flex-1">
              <div className="text-[8.5px] text-[#718096] uppercase tracking-[0.14em] mb-2">Recent Activity</div>
              <div className="divide-y divide-[#e2e8f0]">
                <div className="flex items-center gap-2 py-[5px]">
                  <div className="w-[5px] h-[5px] rounded-full flex-shrink-0 bg-[#38a169]" />
                  <span className="text-[9px] sm:text-[9.5px] text-[#4a5568] font-light">PPM — HVAC Unit B2 completed</span>
                </div>
                <div className="flex items-center gap-2 py-[5px]">
                  <div className="w-[5px] h-[5px] rounded-full flex-shrink-0 bg-[#d69e2e]" />
                  <span className="text-[9px] sm:text-[9.5px] text-[#4a5568] font-light">AMC renewal due in 7 days — Block A</span>
                </div>
                <div className="flex items-center gap-2 py-[5px]">
                  <div className="w-[5px] h-[5px] rounded-full flex-shrink-0 bg-[#3182ce]" />
                  <span className="text-[9px] sm:text-[9.5px] text-[#4a5568] font-light">Visitor: Mr. Muhammad Ali checked in — Gate 2</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {ALL_SLIDES.slice(1).map((s, idx) => {
          const i = idx + 1
          const visible = i === activeIndex
          return (
            <div
              key={s.key}
              className="absolute inset-0 transition-opacity duration-700 ease-out"
              style={{ opacity: visible ? 1 : 0 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform ease-out"
                style={{
                  backgroundImage: "url('" + s.image + "')",
                  transform: visible ? "scale(1.06)" : "scale(1)",
                  transitionDuration: "6000ms",
                }}
                role="img"
                aria-label={s.imageAlt}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(17,29,53,0.70) 0%, rgba(17,29,53,0.40) 50%, transparent 100%)" }} />
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

// ─── 4b) MODULES SECTION ─────────────────────────────────────────────────────

const MODULE_ADVANCE_MS = 5000

export function ModulesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const userLocked = useRef(false)

  useEffect(() => {
    if (paused || userLocked.current) return
    const t = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % MODULES.length)
    }, MODULE_ADVANCE_MS)
    return () => clearTimeout(t)
  }, [activeIndex, paused])

  const active = MODULES[activeIndex]

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

      <div className={"bg-[#111d35] " + HERO_PX + " py-16 lg:py-0 flex flex-col justify-center"}>
        <span className="inline-block px-3 py-5 text-xs font-semibold text-[#63b3ed] rounded-full mb-4">
          FIRMITY UNIFIED PLATFORM
        </span>
        <Reveal>
          <h2 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-[1.15] tracking-tight text-[#f0f4f8] mb-8 lg:mb-10">
            Seven integrated modules.<br />
            <em className="not-italic text-[#63b3ed]">One command centre.</em>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div role="tablist" aria-label="Platform modules" className="space-y-1 max-w-[460px]">
            {MODULES.map(({ id, title, Icon }, i) => {
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

      <div className="hidden lg:flex bg-white/60 border-l border-[#dbe5f0] items-center justify-center p-6 sm:p-10 lg:p-14">
        <div className="w-full max-w-[520px]">
          <div key={active.slug} style={{ animation: "hsModuleFade 450ms cubic-bezier(0.22,1,0.36,1)" }}>
            <div className="min-h-[250px]">
              <ModuleVignette id={active.slug} />
            </div>
            <div className="mt-5">
              <p className="text-[12.5px] font-light text-[#718096] leading-[1.8] mb-3">{active.desc}</p>
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
