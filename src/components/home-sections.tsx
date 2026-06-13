"use client"

// ─── Home sections — Problems board · Benefits timeline · Pillars · Modules ───
// Layout contract (matches the hero in src/app/page.tsx):
// - Horizontal alignment: px-6 sm:px-10 lg:px-14 (NOT a centered max-w container)
// - Vertical scale: lg:min-h-[88vh] with flex column centering
// - Type: DM Sans everywhere (no mono); serif (Playfair) for display lines only
//
// Radius scale (site-wide convention): 12px (rounded-xl) for buttons/fields/
// chips/rows, 20px (rounded-[20px]) for cards/panels.
//
// Color rhythm: dark surfaces are reserved for product moments (hero, risk
// board, pillar panels, module showcase); narrative sections sit on white.

import Link from "next/link"
import { useEffect, useRef, useState, type FC } from "react"
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
  type LucideProps,
} from "lucide-react"

// ─── Shared layout tokens ─────────────────────────────────────────────────────

const HERO_PX = "px-6 sm:px-10 lg:px-14"
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
  { id: "01", slug: "facility-records",       title: "Cloud-based Facility Records",          desc: "Centralised, always-accessible records for every asset, vendor, and compliance document across your estate.", Icon: HomeIcon },
  { id: "02", slug: "preventive-maintenance", title: "Planned Preventive Maintenance",        desc: "Schedule and auto-trigger PPM cycles. Extend asset lifespan through intelligent, timely interventions.",       Icon: Radio },
  { id: "03", slug: "complaint-management",   title: "Complaint Management System",           desc: "QR-based ticket raising from any location. Assigned, tracked, and closed with a full audit trail.",              Icon: ClipboardList },
  { id: "04", slug: "asset-management",       title: "Asset Management & Alerts",             desc: "Live asset registry with lifecycle alerts, AMC tracking, and warranty expiry notifications.",                     Icon: ShieldCheck },
  { id: "05", slug: "inventory-management",   title: "Inventory Purchase & Stock",            desc: "Stock tracking, auto-reorder triggers, vendor management, and purchase approval workflows.",                      Icon: Package },
  { id: "06", slug: "staff-attendance",       title: "Staff Attendance & Visitor Management", desc: "Face-recognition attendance, shift management, digital check-in, and full visitor records in one system.",       Icon: Users },
]

// Timeline benefits — each paired with a photo for the cycling panel.
const BENEFITS = [
  {
    num: "01",
    tag: "Single source of truth",
    title: "Centralized records enable faster decision-making",
    desc: "Every asset, vendor contract, compliance log, and work order lives in one place — accessible instantly, across every team and every site. No spreadsheets, no email chains, no lost documents.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&fit=crop",
    imgAlt: "Modern office interior with organised workspaces",
  },
  {
    num: "02",
    tag: "Zero missed deadlines",
    title: "Automated task alerts ensure nothing is missed",
    desc: "PPM schedules, AMC renewals, and compliance deadlines trigger automatic alerts to the right person at the right time — no manual chasing, no missed obligations.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80&fit=crop",
    imgAlt: "Engineer inspecting building infrastructure",
  },
  {
    num: "03",
    tag: "One shared data layer",
    title: "Integrated modules boost team coordination and speed",
    desc: "Maintenance, assets, attendance, and visitor management share a single data layer — eliminating silos, reducing operational friction, and keeping every team aligned.",
    img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=80&fit=crop",
    imgAlt: "Facility team coordinating around shared plans",
  },
]

// Pillars — colors map to topic: blue = operational flow, amber = time/endurance,
// green = environment. Same darkness so the band reads as one family.
interface PillarItem {
  numeral: string
  title: string
  line: string
  chips: string[]
  /** Panel surface */
  bg: string
  /** Accent for column art, title, chips */
  accent: string
  /** Dimmed accent for body copy */
  accentSoft: string
}

const PILLARS: PillarItem[] = [
  { numeral: "I",   title: "Productivity",   line: "Work flows without follow-up.",              chips: ["Auto-run PPM", "Digital logs", "Less rework"],             bg: "#16263f", accent: "#63b3ed", accentSoft: "rgba(99,179,237,0.55)" },
  { numeral: "II",  title: "Longevity",      line: "Planned maintenance. Longer-living assets.",  chips: ["Preventive cycles", "Live monitoring", "Early alerts"],    bg: "#2b2113", accent: "#f6ad55", accentSoft: "rgba(246,173,85,0.55)" },
  { numeral: "III", title: "Sustainability", line: "Less waste. Less paper. Less energy.",        chips: ["Paperless workflows", "Usage visibility", "Smart access"], bg: "#132a21", accent: "#68d391", accentSoft: "rgba(104,211,145,0.55)" },
]

// ─── Corinthian Column SVG (color parametrised per pillar) ────────────────────

function CorinthianColumn({ height = 170, shaftHeight = 84, stroke = "#63b3ed" }: { height?: number; shaftHeight?: number; stroke?: string }) {
  const baseY = 58
  const topY = baseY + shaftHeight
  const flutes: number[] = [35, 42, 49, 55, 61, 68, 75]

  return (
    <svg width="110" height={height} viewBox={`0 0 110 ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="5" y="8" width="100" height="6" fill={stroke} opacity="0.18" />
      <rect x="10" y="14" width="90" height="3" fill={stroke} opacity="0.12" />
      <rect x="12" y="17" width="86" height="5" stroke={stroke} strokeWidth="0.8" opacity="0.6" />
      <path d="M22 22 Q18 28 22 34 Q26 40 22 46" stroke={stroke} strokeWidth="0.7" opacity="0.55" />
      <path d="M88 22 Q92 28 88 34 Q84 40 88 46" stroke={stroke} strokeWidth="0.7" opacity="0.55" />
      <path d="M30 46 Q35 36 40 46 Q45 36 50 46 Q55 36 60 46 Q65 36 70 46 Q75 36 80 46" stroke={stroke} strokeWidth="0.8" opacity="0.5" />
      <path d="M26 50 Q31 42 36 50 Q41 42 46 50 Q51 42 56 50 Q61 42 66 50 Q71 42 76 50 Q81 42 86 50" stroke={stroke} strokeWidth="0.7" opacity="0.4" />
      <rect x="26" y="54" width="58" height="4" stroke={stroke} strokeWidth="0.7" opacity="0.5" />
      {flutes.map((x) => (
        <line key={x} x1={x} y1={baseY} x2={x} y2={topY} stroke={stroke} strokeWidth={x === 55 ? "0.6" : "0.5"} opacity={x === 55 ? "0.3" : "0.22"} />
      ))}
      <rect x="30" y={baseY} width="50" height={shaftHeight} stroke={stroke} strokeWidth="0.9" opacity="0.45" />
      <ellipse cx="55" cy={topY} rx="28" ry="4" stroke={stroke} strokeWidth="0.8" opacity="0.45" />
      <rect x="15" y={topY + 5} width="80" height="6" stroke={stroke} strokeWidth="0.8" opacity="0.5" />
      <rect x="8" y={topY + 11} width="94" height="5" stroke={stroke} strokeWidth="0.9" opacity="0.55" />
    </svg>
  )
}

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
    <section ref={sectionRef} className={`bg-white grid grid-cols-1 lg:grid-cols-2 ${HERO_MINH}`}>
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
      <div className="bg-[#111d35] flex items-center justify-center p-6 sm:p-10 lg:p-14">
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
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [drawn, setDrawn] = useState(false)
  const [activePhoto, setActivePhoto] = useState(0)

  // Draw the timeline spine once when it scrolls into view.
  useEffect(() => {
    const el = trackRef.current
    if (!el || typeof IntersectionObserver === "undefined") {
      setDrawn(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Track which timeline item is in the viewport's middle band — the photo
  // panel crossfades to match (scroll-linked, like the reference site).
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = itemRefs.current.findIndex((n) => n === entry.target)
            if (idx >= 0) setActivePhoto(idx)
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px" },
    )
    itemRefs.current.forEach((n) => n && obs.observe(n))
    return () => obs.disconnect()
  }, [])

  return (
    <section className={`bg-white ${HERO_MINH} flex flex-col justify-center`}>
      <div className={`${HERO_PX} py-16 lg:py-20 w-full`}>
        {/* Photos LEFT, heading + timeline RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Cycling photo panel — sticky on desktop, hidden on mobile */}
          <div className="hidden lg:block lg:sticky lg:top-28 order-1">
            <div className="relative h-[520px] rounded-[20px] overflow-hidden bg-[#111d35]">
              {BENEFITS.map(({ img, imgAlt, tag }, i) => (
                <div
                  key={img}
                  className="absolute inset-0 transition-opacity duration-700 ease-out"
                  style={{ opacity: activePhoto === i ? 1 : 0 }}
                  aria-hidden={activePhoto !== i}
                >
                  {/* Slow Ken Burns drift while active */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform ease-out"
                    style={{
                      backgroundImage: `url('${img}')`,
                      transform: activePhoto === i ? "scale(1.08)" : "scale(1)",
                      transitionDuration: "6000ms",
                    }}
                    role="img"
                    aria-label={imgAlt}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111d35]/85 via-[#111d35]/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                    <span className="text-[9.5px] font-semibold tracking-[0.16em] uppercase text-white/85 bg-[#111d35]/60 backdrop-blur-sm rounded-lg px-3 py-1.5">
                      {tag}
                    </span>
                    {/* Progress dots */}
                    <span className="flex gap-1.5">
                      {BENEFITS.map((_, d) => (
                        <span
                          key={d}
                          className={`h-[5px] rounded-full transition-all duration-500 ${d === activePhoto ? "w-5 bg-[#63b3ed]" : "w-[5px] bg-white/40"}`}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Heading + timeline */}
          <div className="order-2">
            <Reveal>
              <SectionKicker text="Why Choose Firmity" />
              <h2 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-[1.15] tracking-tight text-[#1a202c] mb-10 lg:mb-12">
                Built for <em className="not-italic text-[#2b6cb0]">operational clarity</em>
              </h2>
            </Reveal>

            {/* Timeline track */}
            <div ref={trackRef} className="relative">
            <div className="absolute left-[21px] top-2 bottom-2 w-px bg-[#e2e8f0]" aria-hidden="true" />
            <div
              className="absolute left-[21px] top-2 w-px bg-[#2b6cb0] origin-top transition-transform duration-[1600ms] ease-out"
              style={{ height: "calc(100% - 16px)", transform: drawn ? "scaleY(1)" : "scaleY(0)" }}
              aria-hidden="true"
            />

            <div className="space-y-12 lg:space-y-16">
              {BENEFITS.map(({ num, tag, title, desc }, i) => (
                <div
                  key={num}
                  ref={(node) => { itemRefs.current[i] = node }}
                  className="relative flex gap-6 group"
                  style={{
                    opacity: drawn ? 1 : 0,
                    transform: drawn ? "none" : "translateY(18px)",
                    transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${400 + i * 420}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${400 + i * 420}ms`,
                  }}
                >
                  {/* Node — fills when its photo is active */}
                  <div
                    className={`relative z-10 w-[44px] h-[44px] flex-shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      activePhoto === i ? "bg-[#2b6cb0] border-[#2b6cb0]" : "bg-white border-[#2b6cb0]/40"
                    }`}
                    style={{
                      transform: drawn ? "scale(1)" : "scale(0.4)",
                      transition: `transform 500ms cubic-bezier(0.34,1.56,0.64,1) ${400 + i * 420}ms, background-color 300ms, border-color 300ms`,
                    }}
                  >
                    <span className={`text-[12px] font-medium transition-colors duration-300 ${activePhoto === i ? "text-white" : "text-[#2b6cb0]"}`}>{num}</span>
                  </div>

                  <div className="pt-1">
                    <span className="inline-block text-[9px] font-medium tracking-[0.14em] uppercase text-[#2b6cb0] border border-[#2b6cb0]/25 rounded-lg px-2 py-[3px] mb-2.5">
                      {tag}
                    </span>
                    <h3 className="font-serif text-[clamp(1.05rem,1.8vw,1.3rem)] font-normal text-[#1a202c] leading-snug mb-2">
                      {title}
                    </h3>
                    <p className="text-[13px] font-light text-[#4a5568] leading-[1.8] max-w-[480px]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 3) THREE PILLARS — expanding color-coded panels (V3) ─────────────────────

export function PillarsSection() {
  return (
    <section className={`bg-white ${HERO_MINH} flex flex-col justify-center`}>
      <div className={`${HERO_PX} py-16 lg:py-20 w-full`}>
        <Reveal>
          <SectionKicker text="Built on Three Pillars" />
          <h2 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-[1.15] tracking-tight text-[#1a202c] mb-10 lg:mb-14">
            The foundations of <em className="not-italic text-[#2b6cb0]">smarter facility management</em>
          </h2>
        </Reveal>

        {/* Hover a panel and it widens to reveal its detail; siblings compress.
            Even spacing via equal flex-basis + identical gaps. */}
        <Reveal delay={140}>
          <div className="flex flex-col md:flex-row gap-4 lg:gap-5 md:h-[400px]">
            {PILLARS.map(({ numeral, title, line, chips, bg, accent, accentSoft }) => (
              <div
                key={numeral}
                className="group relative flex-1 md:hover:flex-[2.2] basis-0 grow transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-[20px] overflow-hidden cursor-default"
                style={{ background: bg }}
              >
                {/* Ghost numeral */}
                <span className="absolute top-5 right-6 font-serif text-[40px] leading-none pointer-events-none select-none" style={{ color: `${accent}22` }}>
                  {numeral}
                </span>

                <div className="h-full flex flex-col md:flex-row items-center justify-center gap-6 px-7 py-10 md:py-0">
                  {/* Column + title — always visible */}
                  <div className="flex flex-col items-center text-center flex-shrink-0">
                    <div className="transition-transform duration-500 group-hover:-translate-y-1.5">
                      <CorinthianColumn stroke={accent} />
                    </div>
                    <div className="text-[11px] font-semibold tracking-[0.2em] uppercase mt-3" style={{ color: accent }}>
                      {title}
                    </div>
                  </div>

                  {/* Detail — revealed on hover (always visible on mobile) */}
                  <div className="md:w-0 md:opacity-0 md:group-hover:w-[230px] md:group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden text-center md:text-left">
                    <div className="md:w-[230px]">
                      <p className="font-serif text-[17px] font-light text-[#f0f4f8] leading-snug mb-4">{line}</p>
                      <div className="flex flex-wrap justify-center md:justify-start gap-1.5">
                        {chips.map((chip) => (
                          <span
                            key={chip}
                            className="text-[9px] font-medium tracking-[0.08em] uppercase rounded-lg px-2.5 py-[5px] border"
                            style={{ color: accentSoft, borderColor: `${accent}33` }}
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom accent line sweeps on hover */}
                <div
                  className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: accent }}
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── 4) MODULES — product showcase (selector + live preview) ──────────────────

const AUTO_ADVANCE_MS = 5000

export function ModulesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const userLocked = useRef(false)

  useEffect(() => {
    if (paused || userLocked.current) return
    const t = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % MODULES.length)
    }, AUTO_ADVANCE_MS)
    return () => clearTimeout(t)
  }, [activeIndex, paused])

  const active = MODULES[activeIndex]

  return (
    <section
      className={`bg-[#111d35] grid grid-cols-1 lg:grid-cols-2 ${HERO_MINH}`}
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

      {/* Left — header + module selector, aligned with hero */}
      <div className={`${HERO_PX} py-16 lg:py-0 flex flex-col justify-center`}>
        <Reveal>
          <SectionKicker text="Platform" light />
          <h2 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-[1.15] tracking-tight text-[#f0f4f8] mb-8 lg:mb-10">
            Six integrated modules.<br />
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
                  className={`relative w-full flex items-center gap-3.5 px-4 py-3 text-left rounded-xl overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#63b3ed] ${
                    isActive ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
                  }`}
                >
                  <span
                    className={`absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-[#63b3ed] origin-top transition-transform duration-300 ${
                      isActive ? "scale-y-100" : "scale-y-0"
                    }`}
                  />
                  <span className={`text-[10px] font-medium transition-colors duration-300 ${isActive ? "text-[#63b3ed]" : "text-white/[0.25]"}`}>{id}</span>
                  <span className={`transition-colors duration-300 ${isActive ? "text-[#63b3ed]" : "text-white/[0.35]"}`}>
                    <Icon size={15} strokeWidth={1.5} />
                  </span>
                  <span
                    className={`text-[12px] font-medium flex-1 transition-colors duration-300 ${
                      isActive ? "text-[#f0f4f8]" : "text-white/[0.45]"
                    }`}
                  >
                    {title}
                  </span>
                  <ArrowRight
                    size={13}
                    className={`transition-all duration-300 ${isActive ? "opacity-100 translate-x-0 text-[#63b3ed]" : "opacity-0 -translate-x-1 text-white/[0.3]"}`}
                  />
                  {isActive && !paused && !userLocked.current && (
                    <span
                      className="absolute bottom-0 left-0 h-[1.5px] bg-[#63b3ed]/40"
                      style={{ animation: `hsProgress ${AUTO_ADVANCE_MS}ms linear forwards` }}
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

      {/* Right — live preview panel */}
      <div className="bg-[#0d1525] border-t lg:border-t-0 lg:border-l border-white/[0.06] flex items-center justify-center p-6 sm:p-10 lg:p-14">
        <div className="w-full max-w-[520px]">
          <div key={active.slug} style={{ animation: "hsModuleFade 450ms cubic-bezier(0.22,1,0.36,1)" }}>
            <div className="min-h-[250px]">
              <ModuleVignette id={active.slug} />
            </div>
            <div className="mt-5">
              <p className="text-[12.5px] font-light text-white/[0.5] leading-[1.8] mb-3">{active.desc}</p>
              <Link
                href={`/features#${active.slug}`}
                className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#63b3ed] hover:gap-3.5 transition-all"
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
