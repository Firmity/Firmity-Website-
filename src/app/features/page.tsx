"use client"

// ─── Features Page ────────────────────────────────────────────────────────────
// Design language matches the homepage: dark navy (#111d35/#1a2744), serif
// display type, #2b6cb0/#63b3ed accents, sharp corners, flat gap-px grids.
//
// Anchor contract: section ids below MUST stay in sync with the MODULES hrefs
// in src/app/page.tsx (e.g. /features#asset-management). Changing an id here
// without updating the homepage breaks deep links silently.
//
// Interactions (CSS + IntersectionObserver only — no animation library):
// - Sticky module index with active-section tracking
// - Hash navigation: scroll + temporary highlight pulse on the target module
// - Scroll-reveal on every section via <Reveal>
// - Hover micro-interactions on chips, vignettes, and CTA links

import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Reveal } from "@/src/components/reveal"
import { ModuleVignette } from "@/src/components/module-vignette"
import Link from "next/link"
import { useEffect, useRef, useState, type FC } from "react"
import {
  Cloud,
  CalendarCheck,
  QrCode,
  ShieldCheck,
  Package,
  Users,
  UserCheck,
  ArrowRight,
  Clock,
  RefreshCw,
  Globe,
  TrendingDown,
  Activity,
  CheckCircle2,
  Bell,
  Wrench,
  FileText,
  BarChart3,
  Leaf,
  Fingerprint,
  Eye,
  Lock,
  ClipboardList,
  Wallet,
  CalendarDays,
  DoorOpen,
  Layers,
  Database,
  Workflow,
  type LucideProps,
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

interface BenefitChip {
  Icon: FC<LucideProps>
  label: string
}

interface FeatureModule {
  /** Anchor id — must match homepage MODULES hrefs. */
  id: string
  num: string
  Icon: FC<LucideProps>
  title: string
  tagline: string
  description: string
  benefits: BenefitChip[]
  link: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES: FeatureModule[] = [
  {
    id: "facility-records",
    num: "01",
    Icon: Cloud,
    title: "Cloud-Based Facility Records",
    tagline: "Every document. Every site. One source of truth.",
    description:
      "Access and update all your facility documents anytime, anywhere — securely stored in the cloud. Real-time synchronization across all devices ensures everyone works from the latest information.",
    benefits: [
      { Icon: Globe, label: "24/7 access" },
      { Icon: Lock, label: "Secure storage" },
      { Icon: RefreshCw, label: "Real-time sync" },
    ],
    link: "/facility-records",
  },
  {
    id: "preventive-maintenance",
    num: "02",
    Icon: CalendarCheck,
    title: "Planned Preventive Maintenance",
    tagline: "Fix it before it breaks — on schedule, every time.",
    description:
      "Auto-schedule and track maintenance tasks to avoid last-minute breakdowns. Extend asset lifespan and reduce downtime with intelligent, recurring PPM cycles.",
    benefits: [
      { Icon: CalendarCheck, label: "Auto-scheduling" },
      { Icon: TrendingDown, label: "Downtime reduction" },
      { Icon: Clock, label: "Asset longevity" },
    ],
    link: "/preventive-maintenance",
  },
  {
    id: "complaint-management",
    num: "03",
    Icon: QrCode,
    title: "Complaint Management System",
    tagline: "Scan. Log. Resolve. Full audit trail included.",
    description:
      "Scan, log, and track complaints in real time with QR-based reporting from any location. Every issue is captured, assigned, and resolved promptly — nothing slips through.",
    benefits: [
      { Icon: QrCode, label: "QR-based entry" },
      { Icon: Activity, label: "Real-time tracking" },
      { Icon: CheckCircle2, label: "Issue resolution" },
    ],
    link: "/complaint-management",
  },
  {
    id: "asset-management",
    num: "04",
    Icon: ShieldCheck,
    title: "Asset Management & Alerts",
    tagline: "Know every asset's state before it tells you.",
    description:
      "Monitor assets and get timely alerts for maintenance and service due dates. AMC tracking and warranty expiry notifications mean you never miss a critical window again.",
    benefits: [
      { Icon: Activity, label: "Real-time monitoring" },
      { Icon: Bell, label: "Smart alerts" },
      { Icon: Wrench, label: "Service tracking" },
    ],
    link: "/asset-management",
  },
  {
    id: "inventory-management",
    num: "05",
    Icon: Package,
    title: "Inventory Purchase & Stock",
    tagline: "Paperless procurement, live stock truth.",
    description:
      "Generate POs, track purchases, and maintain real-time stock records — paperless and efficient. Streamline procurement, trigger reorders automatically, and reduce waste.",
    benefits: [
      { Icon: FileText, label: "PO generation" },
      { Icon: BarChart3, label: "Stock tracking" },
      { Icon: Leaf, label: "Paperless ops" },
    ],
    link: "/inventory-management",
  },
  {
    id: "staff-attendance",
    num: "06",
    Icon: Users,
    title: "Facility Staff Attendance & Leave",
    tagline: "One-click transparency for your entire workforce.",
    description:
      "Digitally track staff attendance and approve leaves with one-click transparency. Simplify HR operations, manage shifts, and ensure full visibility across teams.",
    benefits: [
      { Icon: Fingerprint, label: "Digital tracking" },
      { Icon: CheckCircle2, label: "Leave approval" },
      { Icon: Eye, label: "Transparency" },
    ],
    link: "/staff-attendance",
  },
  {
    id: "visitor-management",
    num: "07",
    Icon: UserCheck,
    title: "Visitor Management & Records",
    tagline: "Every entry logged. Every record retrievable.",
    description:
      "Log, monitor, and retrieve visitor records digitally for enhanced security and reporting. Maintain comprehensive audit trails for compliance — from gate to exit.",
    benefits: [
      { Icon: ClipboardList, label: "Digital logging" },
      { Icon: Lock, label: "Security" },
      { Icon: ShieldCheck, label: "Compliance" },
    ],
    link: "/visitor-management",
  },
]

const ADDITIONAL: { Icon: FC<LucideProps>; title: string; desc: string }[] = [
  { Icon: Wallet,       title: "Payroll Management",  desc: "Streamlined payroll processing with automated calculations and compliance reporting." },
  { Icon: CalendarDays, title: "Attendance Tracking", desc: "Real-time attendance monitoring with digital records and leave management." },
  { Icon: DoorOpen,     title: "Visitor Management",  desc: "Enhanced security and compliance with comprehensive visitor logging." },
]

const WHY_INTEGRATED: { Icon: FC<LucideProps>; num: string; title: string; desc: string }[] = [
  { Icon: Layers,   num: "01", title: "Reduced Operational Complexity", desc: "One platform handles all your facility management needs — no more juggling multiple systems." },
  { Icon: Database, num: "02", title: "Better Data Visibility",         desc: "Centralized records provide comprehensive insights for smarter decision-making." },
  { Icon: Workflow, num: "03", title: "Enhanced Team Collaboration",    desc: "Real-time updates and integrated workflows ensure seamless coordination across departments." },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FeaturesPage() {
  const [activeId, setActiveId] = useState<string>("")
  const [highlightId, setHighlightId] = useState<string>("")
  const highlightTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Cursor-following glow for the closing CTA (percent coordinates).
  const [ctaGlow, setCtaGlow] = useState({ x: 50, y: 40 })

  // Hash navigation: highlight the target module briefly so deep links from
  // the homepage Platform cards land with clear visual feedback.
  const pulseHighlight = (id: string) => {
    setHighlightId(id)
    if (highlightTimer.current) clearTimeout(highlightTimer.current)
    highlightTimer.current = setTimeout(() => setHighlightId(""), 2200)
  }

  useEffect(() => {
    const applyHash = () => {
      const id = window.location.hash.replace("#", "")
      if (id && FEATURES.some((f) => f.id === id)) pulseHighlight(id)
    }
    applyHash() // initial deep link
    window.addEventListener("hashchange", applyHash)
    return () => {
      window.removeEventListener("hashchange", applyHash)
      if (highlightTimer.current) clearTimeout(highlightTimer.current)
    }
  }, [])

  // Active-section tracking for the sticky module index.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: "-30% 0px -55% 0px" },
    )
    FEATURES.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navigation />
      <main className="bg-white">
        {/* ── HERO — dark navy, serif, stat strip ── */}
        <section className="bg-[#111d35] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 56px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 56px)" }}
            aria-hidden="true"
          />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-10">
            <Reveal>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-px bg-[#2b6cb0]" />
                <span className="text-[#63b3ed] text-[10px] font-semibold tracking-[0.2em] uppercase">Platform Features</span>
              </div>
              <h1 className="font-serif text-[clamp(1.8rem,4vw,2.6rem)] font-light text-[#f0f4f8] leading-tight tracking-tight max-w-3xl">
                Seven modules. One operating system{" "}
                <span className="text-[#63b3ed] italic">for your facility.</span>
              </h1>
              <p className="text-[13.5px] font-light text-white/[0.45] leading-[1.85] max-w-2xl mt-3">
                Everything you need to manage facilities, assets, staff, and compliance — built as one
                integrated platform, not seven disconnected tools.
              </p>
            </Reveal>
          </div>
          {/* Stat strip */}
          <Reveal delay={150}>
            <div className="relative border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4">
              {[
                { value: "07", label: "Integrated modules" },
                { value: "01", label: "Shared data layer" },
                { value: "24/7", label: "Cloud availability" },
                { value: "100%", label: "Paperless workflows" },
              ].map(({ value, label }) => (
                <div key={label} className="px-6 py-4 border-r border-white/[0.05] last:border-r-0 group hover:bg-white/[0.02] transition-colors">
                  <div className="font-sans text-[20px] font-light text-[#63b3ed] leading-none group-hover:text-[#90cdf4] transition-colors">{value}</div>
                  <div className="text-[9.5px] text-white/[0.35] uppercase tracking-[0.14em] mt-1.5">{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── STICKY MODULE INDEX — sits below the h-16 site nav ── */}
        <nav
          aria-label="Module index"
          className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-[#e2e8f0] overflow-x-auto"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex gap-1 min-w-max">
            {FEATURES.map(({ id, num, Icon, title }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => pulseHighlight(id)}
                className={`flex items-center gap-2 px-3 py-3 text-[10.5px] font-medium border-b-2 -mb-px transition-all whitespace-nowrap ${
                  activeId === id
                    ? "border-[#2b6cb0] text-[#2b6cb0]"
                    : "border-transparent text-[#718096] hover:text-[#2b6cb0] hover:border-[#2b6cb0]/30"
                }`}
              >
                <Icon size={13} strokeWidth={1.5} />
                <span className="hidden md:inline">{title.split(" ").slice(0, 2).join(" ")}</span>
                <span className="md:hidden font-sans font-medium">{num}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* ── MODULE SECTIONS — separated cards on a tinted band ──
            Each module is a distinct white card so features read as clearly
            separate products, not stripes of near-identical background. */}
        <div className="bg-[#eef3f9] border-t border-[#dbe5f0] py-12 lg:py-16 space-y-8 lg:space-y-12">
          {FEATURES.map((feature, i) => {
            const { id, num, Icon, title, tagline, description, benefits, link } = feature
            const flipped = i % 2 === 1
            const highlighted = highlightId === id
            return (
              <section key={id} id={id} className="scroll-mt-32 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
                <Reveal>
                  <div
                    className={`bg-white rounded-[20px] border transition-all duration-500 p-7 sm:p-10 lg:p-12 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(17,29,53,0.12)] ${
                      highlighted
                        ? "border-[#2b6cb0] shadow-[0_0_0_3px_rgba(43,108,176,0.18),0_12px_36px_rgba(17,29,53,0.1)]"
                        : "border-[#dbe5f0] shadow-[0_2px_16px_rgba(17,29,53,0.05)]"
                    }`}
                  >
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center ${flipped ? "lg:[direction:rtl]" : ""}`}>
                      {/* Content — direction reset so text flows normally */}
                      <div className="lg:[direction:ltr]">
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={`w-[44px] h-[44px] rounded-xl border flex items-center justify-center text-[#2b6cb0] transition-all duration-500 ${
                              highlighted ? "border-[#2b6cb0] bg-[#2b6cb0] text-white" : "border-[rgba(43,108,176,0.25)]"
                            }`}
                          >
                            <Icon size={19} strokeWidth={1.5} />
                          </div>
                          <span className="text-[11px] font-semibold tracking-[0.1em] text-[#2b6cb0]/60">MODULE {num}</span>
                        </div>
                        <h2 className="font-serif text-[clamp(1.3rem,2.3vw,1.65rem)] font-light text-[#1a202c] leading-snug tracking-tight mb-1.5">
                          {title}
                        </h2>
                        <p className="text-[12px] font-medium text-[#2b6cb0] tracking-[0.04em] mb-3">{tagline}</p>
                        <p className="text-[13px] font-light text-[#4a5568] leading-[1.85] mb-5">{description}</p>
                        {/* Benefit chips with icons */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {benefits.map(({ Icon: ChipIcon, label }) => (
                            <span
                              key={label}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(43,108,176,0.22)] hover:border-[#2b6cb0] hover:bg-[#2b6cb0] px-2.5 py-1.5 text-[10.5px] font-medium text-[#2b6cb0] hover:text-white transition-all duration-300 cursor-default"
                            >
                              <ChipIcon size={11} strokeWidth={1.8} />
                              {label}
                            </span>
                          ))}
                        </div>
                        <Link
                          href={link}
                          className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#2b6cb0] hover:gap-3.5 transition-all"
                        >
                          Open full module page <ArrowRight size={13} />
                        </Link>
                      </div>
                      {/* Vignette */}
                      <div className="lg:[direction:ltr] min-h-[230px]">
                        <ModuleVignette id={id} />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </section>
            )
          })}
        </div>

        {/* ── BEYOND THE CORE — one rounded dark panel, capability rows ── */}
        <section className="bg-white border-t border-[#e2e8f0] py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <Reveal>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-px bg-[#2b6cb0]" />
                <span className="text-[#2b6cb0] text-[10px] font-semibold tracking-[0.2em] uppercase">Beyond the Core</span>
              </div>
              <h2 className="font-serif text-[clamp(1.4rem,2.5vw,1.75rem)] font-light text-[#1a202c] tracking-tight">
                Additional management capabilities
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="bg-[#1a2744] rounded-[20px] overflow-hidden mt-8">
                {ADDITIONAL.map(({ Icon, title, desc }) => (
                  <div
                    key={title}
                    className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 px-6 sm:px-8 py-6 border-b border-white/[0.06] last:border-b-0 hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="w-[42px] h-[42px] rounded-xl flex-shrink-0 border border-[rgba(99,179,237,0.25)] group-hover:border-[#63b3ed] group-hover:bg-[#63b3ed]/10 flex items-center justify-center text-[#63b3ed] transition-all duration-300">
                      <Icon size={17} strokeWidth={1.5} />
                    </div>
                    <div className="sm:w-[220px] flex-shrink-0 text-[12px] font-semibold tracking-[0.07em] uppercase text-[#f0f4f8]">
                      {title}
                    </div>
                    <p className="text-[12.5px] font-light text-white/[0.45] leading-[1.7] flex-1">{desc}</p>
                    <ArrowRight
                      size={15}
                      className="hidden sm:block text-[#63b3ed] opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── THE INTEGRATION ADVANTAGE — connected pipeline, no boxes ── */}
        <section className="bg-white border-t border-[#e2e8f0] py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <Reveal>
              <div className="flex items-center gap-3 mb-2 justify-center">
                <div className="w-6 h-px bg-[#2b6cb0]" />
                <span className="text-[#2b6cb0] text-[10px] font-semibold tracking-[0.2em] uppercase">The Integration Advantage</span>
                <div className="w-6 h-px bg-[#2b6cb0]" />
              </div>
              <h2 className="font-serif text-[clamp(1.4rem,2.5vw,1.75rem)] font-light text-[#1a202c] tracking-tight text-center">
                Why integrated features matter
              </h2>
            </Reveal>

            {/* Three nodes joined by a single line — reads as one flow */}
            <div className="relative mt-12">
              <div className="hidden md:block absolute top-[26px] left-[14%] right-[14%] h-px bg-[#cbd5e0]" aria-hidden="true" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                {WHY_INTEGRATED.map(({ Icon, num, title, desc }, i) => (
                  <Reveal key={num} delay={i * 160}>
                    <div className="group flex flex-col items-center text-center">
                      <div className="relative z-10 w-[52px] h-[52px] rounded-full bg-white border border-[#2b6cb0]/35 group-hover:border-[#2b6cb0] group-hover:bg-[#2b6cb0] flex items-center justify-center text-[#2b6cb0] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                        <Icon size={19} strokeWidth={1.5} />
                      </div>
                      <span className="text-[10px] font-semibold text-[#2b6cb0]/55 mt-3">{num}</span>
                      <h3 className="text-[12px] font-semibold tracking-[0.06em] uppercase text-[#1a202c] mt-1.5 mb-2">{title}</h3>
                      <p className="text-[12.5px] font-light text-[#718096] leading-[1.75] max-w-[300px]">{desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA — hero-scale, cursor-following glow, interactive chips ── */}
        <section
          className="relative bg-[#111d35] border-t border-white/[0.06] lg:min-h-[88vh] flex items-center justify-center overflow-hidden"
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            setCtaGlow({
              x: ((e.clientX - r.left) / r.width) * 100,
              y: ((e.clientY - r.top) / r.height) * 100,
            })
          }}
        >
          {/* Cursor glow */}
          <div
            className="absolute inset-0 pointer-events-none transition-[background] duration-200"
            style={{ background: `radial-gradient(circle 520px at ${ctaGlow.x}% ${ctaGlow.y}%, rgba(43,108,176,0.22), transparent 70%)` }}
            aria-hidden="true"
          />
          {/* Faint grid texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 56px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 56px)" }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 py-20 lg:py-0 text-center">
            <Reveal>
              <div className="flex items-center gap-3 mb-5 justify-center">
                <div className="w-6 h-px bg-[#2b6cb0]" />
                <span className="text-[#63b3ed] text-[10px] font-semibold tracking-[0.2em] uppercase">Start Today</span>
                <div className="w-6 h-px bg-[#2b6cb0]" />
              </div>
              <h2 className="font-serif text-[clamp(1.9rem,5vw,3.2rem)] font-light text-[#f0f4f8] leading-[1.12] tracking-tight mb-5">
                Experience all features<br />
                <em className="not-italic text-[#63b3ed]">risk-free.</em>
              </h2>
              <p className="text-[14px] font-light text-white/[0.5] leading-[1.8] max-w-xl mx-auto mb-8">
                Try Firmity for 2 weeks with your real facility data — every module unlocked,
                no credit card, and onboarding support from day one.
              </p>

              {/* Assurance chips — light up on hover */}
              <div className="flex flex-wrap justify-center gap-2.5 mb-10">
                {["All 7 modules unlocked", "No credit card", "Dedicated onboarding", "Your data stays yours"].map((chip) => (
                  <span
                    key={chip}
                    className="text-[10.5px] font-medium text-white/[0.55] border border-white/[0.15] rounded-xl px-3.5 py-2 hover:text-[#63b3ed] hover:border-[#63b3ed]/50 hover:bg-[#63b3ed]/[0.06] hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 bg-[#2b6cb0] hover:bg-[#2563a8] text-white text-[13.5px] font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_44px_rgba(43,108,176,0.45)] hover:-translate-y-0.5"
                >
                  Start Free Trial
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-white/60 hover:text-white text-[13px] font-light px-8 py-4 rounded-xl border border-white/[0.18] hover:border-white/[0.45] hover:-translate-y-0.5 transition-all duration-300"
                >
                  Talk to our team
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
// EOF
