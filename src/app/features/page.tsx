"use client"

// ─── Features Page (rebuilt 2026-09-08) ────────────────────────────────────
// Design language: NO dark-navy background panels on this page (2026-09-08
// follow-up — the homepage's #114dac/#1a2744 dark sections were explicitly
// ruled out here). Heading TEXT color (text-[#114dac]) is untouched — that's
// the sitewide h2 convention used on every page, not a background, and isn't
// what was being flagged. Serif display type, #2b6cb0 accent for buttons/
// links/icons, sharp corners, flat gap-px grids — same as the rest of the site.
//
// Layout, top to bottom (per request, "use cues from" sap.com/resources/
// what-is-erp for the ERP-education content, structure otherwise matches the
// homepage): Hero (features_hero.png + cloud/24-7/paperless/RBAC stats) →
// client marquee → 8-module list with a sticky LEFT sidebar → contact form
// (OverviewContactForm, same component the homepage uses) → live product
// demo (unchanged from the prior build) → "why cloud" section → ERP/CMMS
// guide cards (open at /resources/guide/[slug]) → Keep in touch banner
// (KeepInTouchSection, same component/instance style as the homepage) → FAQ.
// Page intentionally ends right after FAQ, no trailing CTA band — mirrors
// exactly how src/app/page.tsx ends (FaqSection then straight to <Footer/>),
// per the request to use the homepage as the model for this tail.
//
// REMOVED vs. the previous build: "The Integration Advantage" (3-node
// pipeline) and "Additional management capabilities" (Beyond the Core dark
// panel) — both explicitly requested for removal. Also removed: the abstract
// <ModuleVignette/> illustration per module, replaced by the real per-module
// photography that already exists in MODULE_IMAGES (home-sections.tsx) —
// this page reads that map instead of carrying its own placeholder art.
//
// Data note: module copy (title/desc/slideDesc/Icon), the module→page link
// map, and the module→photo map are now imported from home-sections.tsx
// (MODULES_LIST / MODULE_PAGES / MODULE_IMAGES, exported 2026-09-08 for
// exactly this reuse) instead of being hand-duplicated here — that array is
// also what drives the homepage's ExploreSection cards and Hero slideshow,
// so all three surfaces read from one place now. Only benefit-chip icons/
// labels (3 per module, cosmetic) still live locally — MODULES_LIST has no
// equivalent field.
//
//
// Glossary linkify (2026-09-08): every plain-text mention of "ERP"/"CMMS"
// on this page is wrapped via linkifyGlossary() (src/components/
// glossary-term.tsx) into a hoverable/clickable term with a popup
// definition + "Learn more" link to the matching /resources/guide page.
// Deliberately NOT applied inside the sidebar module links, the mobile
// pill nav, the ERP-guide card titles, or the FAQ question buttons —
// those strings already sit inside an <a>/<button>, and nesting another
// interactive element inside one is invalid HTML that breaks click
// handling. Also left plain: the small uppercase kicker labels (10px
// tracked caps) — a "?" badge doesn't fit that scale cleanly and a kicker
// isn't body copy a reader is parsing for terminology.
// Anchor contract: module section ids MUST stay in sync with MODULES_LIST's
// `slug` field (home-sections.tsx) — those slugs are also what the homepage's
// ExploreSection cards and footer.tsx's SOLUTIONS links point at via
// /features#<slug>. Don't rename an id here without updating that source.

import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Reveal } from "@/src/components/reveal"
import { ClientsCarousel } from "@/src/components/clients-carousel"
import { OverviewContactForm } from "@/src/components/overview-contact-form"
import { BrochureDownloadForm } from "@/src/components/brochure-download-form"
import { buildInlineVideoUrl } from "@/src/lib/video"
import {
  MODULES_LIST,
  MODULE_PAGES,
  MODULE_IMAGES,
  KeepInTouchSection,
} from "@/src/components/home-sections"
import { ERP_GUIDES } from "@/src/lib/erp-guides"
import { linkifyGlossary } from "@/src/components/glossary-term"
import Link from "next/link"
import { useEffect, useRef, useState, type FC } from "react"
import {
  ArrowRight,
  Cloud,
  Globe,
  Lock,
  ShieldCheck,
  RefreshCw,
  Wallet,
  Workflow,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Zap,
  Download,
  X,
  Wrench,
  BarChart3,
  BookOpen,
  Layers,
  Rocket,
  Search,
  Smartphone,
  type LucideProps,
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

// Full feature checklist — replaces the slideDesc paragraph for a module
// when present (2026-09-09, per request, for "preventive-maintenance"
// only). Keyed by slug so it stays optional/additive per module rather
// than forcing every module onto this layout.
const MODULE_FEATURE_CHECKLIST: Record<string, string[]> = {
  "preventive-maintenance": [
    "Task Category",
    "Task Sub-category",
    "Task Frequency",
    "Multiple Task Shifts",
    "Task Repetitions",
    "Digital Task Checklist",
    "Before/After Task Images",
    "Preventive Calendars",
    "In-built Task-wise Messaging",
    "Task Priority",
    "Task Status",
    "Task Remarks",
    "Task-Employee Assignment",
    "Task Timings",
    "Task Date/Date Range",
    "Task Description",
    "Task Location",
    "Task QR Tagging",
    "Task Filters",
    "Export to Excel Sheets",
    "DMR Report"
  ],
  "asset-management": [
    "Real-time Monitoring",
    "Smart Service Alerts",
    "15 Years of Service Records Tracking",
    "Automated Service Scheduling",
    "Centralised Database",
    "QR Asset/Spares Tagging",
    "Asset/Spares Images",
    "Asset/Spares Name & Description",
    "Asset/Spares Manufacturer",
    "Asset/Spares Model",
    "Asset/Spares Warranty",
    "Asset AMC",
    "Asset/Spares Documentation",
    "Asset/Spares Health Monitoring",
    "Asset Renting",
    "Asset Rental Contract",
    "Rented Asset Tracking",
    "Asset/Spares Invoicing",
    "Asset/Spares Location",
    "Spares-Asset Linking",
    "Spares Quantity",
    "Asset/Spares Check-in & Check-out Tracking",
    "DMR Report"
  ],
  "complaint-management": [
    "Ticket Management",
    "Auto Ticket Assignment",
    "Ticket Status",
    "Ticket Priority",
    "Ticket Image Attachment",
    "Ticket Description",
    "Ticket Category",
    "QR-based Ticketing",
    "Geo-located Ticketing",
    "SLA Tracking",
    "TAT Tracking",
    "Escalation Matrix",
    "Notifications & Alerts",
    "User-Friendly Interface",
    "Real-time Ticket Updates",
    "Ticket History & Activity Log",
    "Ticket Comments & Remarks",
    "Ticket Reopening",
    "Resident Feedback & Rating",
    "Analytics Dashboard",
    "Ticket Search & Filters",
    "DMR Report"
  ],
  "inventory-management": [
    "Item Category",
    "Item Lists",
    "Item Details",
    "Vendor Management",
    "Rate Card",
    "PO Management",
    "Stock In/Out",
    "Stock Tracking",
    "Stock Ledger",
    "Item Requisition",
    "Item Handover",
    "Approval Workflows",
    "GRN (Goods Receipt Note)",
    "Paperless Operations",
    "Low Stock Alerts",
    "Reorder Level Management",
    "Multi-location Warehouse Management",
    "Barcode/QR Scanning",
    "Vendor Performance Rating",
    "Stock Audit & Reconciliation",
    "Export to Excel Sheets",
  ],
  "visitor-management": [
    "QR-based Entry",
    "Login-based Entry",
    "Pre-approved Passes",
    "Visitor Approval Hierarchy",
    "Visitor and Approval Alerts",
    "Check-in/out Time Logging",
    "Visitor Details Capture",
    "End-to-End Data Encryption",
    "Frequent Visitor List",
    "Visitor Delisting",
    "Delivery Management",
    "Emergency/SOS Alerts",
    "Visitor History & Reports",
    "Multi-gate/location Support",
  ],
  "payroll-management": [
    "Digital Employee Onboarding",
    "Digital Employee Management",
    "Salary Group & Wage Configuration",
    "Multi-site & Multi-client Payroll",
    "Loan & Advance Management",
    "Automatic EMI Scheduling",
    "Monthly Attendance Import",
    "Automated Salary Generation",
    "Salary Freeze & Lock",
    "Digital Payslip Generation",
    "Multi-tier Funds Approval Workflow",
    "Salary Hold & Release Management",
    "Bank Transfer Export",
    "Statutory Compliance (PF/ESI/PT/LWF)",
    "Wage Register (Salary Report)",
    "Deduction Report",
    "Loan & Advance Report",
    "Company Salary Summary",
    "Generate & Freeze Audit Report",
    "Designation & Department Management",
  ],
  "staff-attendance": [
    "Digital Employee Onboarding",
    "Documents Management",
    "Facial Recognition Attendance",
    "Attendance Management",
    "Leave Policies & Types",
    "Leave Management",
    "Leave Approval",
    "Shift Management",
    "Holiday Calendar",
    "Check-in/out Time Logging",
    "Working Hours & OT Tracking",
    "Employee Self-Service App",
    "Export to Excel Sheets",
    "Reports & Analytics",
  ],
  "facility-expense-management": [
    "Expense Bill PDF Attachment",
    "Expense Categorization",
    "Centralized Expense Dashboard",
    "Expense Tracking",
    "Cost Center/Location-wise Tracking",
    "Recurring Expense Management",
    "Budget Creation & Alerts",
    "Expense Approval Workflow",
    "Vendor/Bill Payment Tracking",
    "Expense Analytics",
    "Expense History & Audit Trail",
    "Multi-property Expense Tracking",
    "Expense Trend Analysis",
    "Export to Excel Sheets",
    "Expense Reports",
  ],
}

// Modules that end their CTA row with a "mobile app available" badge strip
// (2026-09-09, per request, for "preventive-maintenance" only — the
// technician/supervisor app is specific to field task execution).
const MOBILE_APP_SLUGS = new Set([
  "preventive-maintenance",
  "asset-management",
  "complaint-management",
  "inventory-management",
  "visitor-management",
  "staff-attendance",
  "payroll-management",
  "facility-expense-management",
])

// Icon shown on each ERP/CMMS guide card — cosmetic, keyed by erp-guides.ts slug.
const GUIDE_ICONS: Record<string, FC<LucideProps>> = {
  "what-is-erp": Layers,
  "what-is-cloud-erp": Cloud,
  "what-is-two-tier-erp": Workflow,
  "erp-benefits": BarChart3,
  "replacing-legacy-erp": RefreshCw,
  "evaluating-erp-software": Search,
  "erp-implementation-best-practices": Rocket,
  "what-is-cmms": Wrench,
}

// ─── FAQ — features/module/ERP-specific, own set from the homepage's ──────────
const FAQ_ITEMS = [
  {
    q: "How many modules does Firmity actually include?",
    a: "Eight integrated modules — facility task automation, assets & spares, complaints & helpdesk, inventory & vendor, visitor management, employee management, payroll, and facility expense — plus cloud-based facility records underpinning all of them. Every module ships as part of the same platform; there's no à la carte module pricing.",
  },
  {
    q: "Is Firmity a CMMS or an ERP?",
    a: "Both, depending on what you're searching for. Firmity started as a CMMS for planned maintenance and asset tracking, and has grown ERP-adjacent modules on top — inventory & vendor, payroll, and facility expense automation — without losing the maintenance-first design. See \"What is CMMS?\" in the guides below for the full distinction.",
  },
  {
    q: "Does moving to the cloud mean giving up control of our data?",
    a: "No — cloud hosting changes who maintains the infrastructure, not who owns the data. Firmity runs on encrypted, role- and rights-based access, so control over who sees what stays with you; you just stop maintaining the servers yourself.",
  },
  {
    q: "Can we roll out one module at a time instead of all eight?",
    a: "Yes. A phased rollout — one module or one site at a time — is the lower-risk path, and it's how most Firmity deployments actually go live. See \"ERP implementation best practices\" below for why a phased approach outperforms a single big-bang cutover.",
  },
  {
    q: "How does Firmity fit alongside an ERP we already run?",
    a: "Firmity runs the facility-operations layer — work orders, assets, inventory, staff, expenses — and can sit alongside a corporate finance ERP the same way a Tier 2 system does in a two-tier architecture: fast and local at the site level, feeding clean data up to whatever system your finance team already consolidates in.",
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FeaturesPage() {
  const [activeId, setActiveId] = useState<string>("")
  const [highlightId, setHighlightId] = useState<string>("")
  const highlightTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [openFaq, setOpenFaq] = useState<number>(0)
  // Mobile/tablet "which module" nav — collapsible bar + dropdown list
  // (replaces the old horizontal scrolling pill strip, 2026-09-08).
  const [moduleNavOpen, setModuleNavOpen] = useState<boolean>(false)
  const moduleNavRef = useRef<HTMLElement>(null)
  // Tracks the site nav's live bottom edge (it auto-hides/reshows on
  // scroll — see the note on the sidebar <aside> below) so the sticky
  // module sidebar always sits flush against it, in every nav state.
  const [sidebarTop, setSidebarTop] = useState<number>(64)

  // Video + brochure-popup state for the "Contact Us for a Walkthrough"
  // section below — cloned verbatim from src/app/page.tsx (2026-09-08) so
  // /features has the exact same contact section as the homepage.
  const [inlineVideoPlaying, setInlineVideoPlaying] = useState<boolean>(false)
  const videoUrl = process.env.NEXT_PUBLIC_VIDEO_URL ?? ""
  const [brochurePopupOpen, setBrochurePopupOpen] = useState<boolean>(false)

  // Hash navigation: highlight the target module briefly so deep links from
  // the homepage Explore cards / footer SOLUTIONS links land with clear
  // visual feedback.
  const pulseHighlight = (id: string) => {
    setHighlightId(id)
    if (highlightTimer.current) clearTimeout(highlightTimer.current)
    highlightTimer.current = setTimeout(() => setHighlightId(""), 2200)
  }

  useEffect(() => {
    const applyHash = () => {
      const id = window.location.hash.replace("#", "")
      if (id && MODULES_LIST.some((m) => m.slug === id)) pulseHighlight(id)
    }
    applyHash() // initial deep link
    window.addEventListener("hashchange", applyHash)
    return () => {
      window.removeEventListener("hashchange", applyHash)
      if (highlightTimer.current) clearTimeout(highlightTimer.current)
    }
  }, [])

  // Keep the sidebar's sticky top offset locked to the real nav height —
  // the nav auto-hides on scroll-down (transitions to top:-64px) and
  // reshows on scroll-up, so a fixed offset leaves a gap (when the nav is
  // hidden) or clips the sidebar (when it's shown). rAF instead of a
  // scroll listener so it also tracks the nav's own 200ms slide animation
  // smoothly rather than just its start/end states.
  useEffect(() => {
    let raf = 0
    let last = -1
    const sync = () => {
      const nav = document.querySelector("nav")
      const next = nav ? Math.max(0, Math.round(nav.getBoundingClientRect().bottom)) : 64
      if (next !== last) {
        last = next
        setSidebarTop(next)
      }
      raf = requestAnimationFrame(sync)
    }
    raf = requestAnimationFrame(sync)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Close the mobile module-nav dropdown on an outside click or Escape —
  // same pattern as glossary-term.tsx's popover.
  useEffect(() => {
    if (!moduleNavOpen) return
    const onDocClick = (e: MouseEvent) => {
      if (moduleNavRef.current?.contains(e.target as Node)) return
      setModuleNavOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModuleNavOpen(false)
    }
    document.addEventListener("mousedown", onDocClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDocClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [moduleNavOpen])

  // Active-section tracking for the sticky module sidebar.
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
    MODULES_LIST.forEach(({ slug }) => {
      const el = document.getElementById(slug)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Drives the mobile module-nav bar's label/icon — falls back to the
  // first module before the IntersectionObserver above has claimed one.
  const activeModule = MODULES_LIST.find((m) => m.slug === activeId) ?? MODULES_LIST[0]

  return (
    <>
      <Navigation />
      <main className="bg-white">
        {/* ── HERO — full-bleed photo, no navy panel (2026-09-08 rewrite) ──
            Was a two-column navy section (copy left, framed photo right) +
            a separate dark stat strip underneath. Per request: photo now
            fills the whole section edge to edge ("keep the hero photo full
            screen and remove the blue background"), copy is overlaid
            directly on the photo's left side (no "Platform Features"
            kicker), and the 4 quick facts sit right under the copy in the
            same overlay instead of a separate banded strip below — "a
            simple 24/7 / Cloud availability / 100% automated workflows /
            RBAC / Role- & rights-based access / Web and Android + iOS
            Mobile Application" is that exact 4-item list. A dark NEUTRAL
            scrim (not blue) sits between the photo and the text for
            legibility — the page-wide instruction was "no dark blue
            anywhere," a black/gray gradient reads completely differently
            from the navy panel this replaced. */}
        <section className="relative h-[560px] sm:h-[600px] lg:h-[640px] overflow-hidden">
          <img
            src="/images/features_hero.png"
            alt="Firmity facility management platform"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, rgba(8,12,20,0.82) 0%, rgba(8,12,20,0.58) 38%, rgba(8,12,20,0.18) 68%, rgba(8,12,20,0) 88%)" }}
            aria-hidden="true"
          />
          <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center">
            <Reveal className="max-w-xl">
              <h1 className="font-serif text-[clamp(1.8rem,4vw,2.6rem)] font-light text-white leading-tight tracking-tight">
                Eight modules. One cloud operating system{" "}
                <span className="text-[#8fc3f5] italic">for your facility.</span>
              </h1>
              <p className="text-[13.5px] font-light text-white/70 leading-[1.85] max-w-md mt-3">
                Everything you need to manage facilities, assets, staff, and compliance — one integrated,
                cloud-based platform, not seven disconnected tools.
              </p>

              {/* Simple stat row — no boxes/borders, just icon + value + label. */}
              <div className="flex flex-wrap gap-x-8 gap-y-5 mt-9">
                {[
                  { Icon: RefreshCw,   value: "24/7",  label: "Cloud availability", badges: false },
                  { Icon: CheckCircle2, value: "100%", label: "Automated workflows", badges: false },
                  { Icon: ShieldCheck, value: "RBAC",  label: "Role- & rights-based access", badges: false },
                  { Icon: Smartphone,  value: null,    label: "Web, Android & iOS mobile app", badges: true },
                ].map(({ Icon, value, label, badges }) => (
                  <div key={label} className="flex items-start gap-2 max-w-[150px]">
                    <Icon size={15} strokeWidth={1.6} className="text-[#8fc3f5] mt-0.5 flex-shrink-0" />
                    <div>
                      {badges && (
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <img src="/images/appstore_icon.png" alt="App Store" className="h-4 w-4 object-contain" />
                          <img src="/images/googleplay_icon.png" alt="Google Play" className="h-4 w-4 object-contain" />
                        </div>
                      )}
                      {value && (
                        <div className="font-sans text-[15px] font-semibold text-white leading-none mb-1">{value}</div>
                      )}
                      <div className="text-[10px] text-white/60 leading-snug tracking-[0.02em]">{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CLIENT MARQUEE ── */}
        <section className="bg-transparent sm:bg-white/60 pb-10">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-[#2b6cb0]" />
              <span className="text-[#2b6cb0] text-[10px] font-semibold tracking-[0.2em] uppercase">Trusted by Leading Companies</span>
            </div>
            <h2 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-[1.15] text-[#114dac] tracking-tight mb-1">
              Companies Using Firmity
            </h2>
            <p className="text-[13.5px] font-light leading-[1.8] text-[#000000]">
              Join hundreds of facility managers running every module below in production.
            </p>
          </div>
          <ClientsCarousel />
        </section>

        {/* ── MODULES — sticky LEFT sidebar + 8 module sections ──
            Sidebar is desktop-only (lg:); a horizontal sticky pill nav takes
            its place below lg so the "which module am I viewing" affordance
            survives on mobile without cramming a vertical rail into a narrow
            viewport. ── */}
        <div id="modules" className="bg-[#f7f7f7] border-t border-[#dbe5f0] pt-6 lg:pt-8 pb-0 scroll-mt-16">
          {/* Mobile/tablet module nav (hidden at lg, where the sidebar takes
              over). Was a horizontal scrolling pill strip — replaced 2026-09-08
              with a collapsible bar + dropdown list (reference: the TOC
              accordion on sap.com/resources/what-is-erp) since the pill strip
              truncated titles ("Assets &") with no affordance hinting there
              was more to scroll. Sticky offset is the SAME live-tracked
              sidebarTop as the desktop sidebar below (see the rAF effect
              above) — the site nav auto-hides on scroll, so a fixed top-*
              here would reopen the exact gap-when-scrolling bug the desktop
              sidebar had. */}
          <nav
            aria-label="Module index"
            ref={moduleNavRef}
            className="lg:hidden sticky z-30 mb-8"
            style={{ top: sidebarTop }}
          >
            <div className="max-w-7xl mx-auto px-6 sm:px-10 relative">
              <button
                type="button"
                onClick={() => setModuleNavOpen((v) => !v)}
                aria-expanded={moduleNavOpen}
                className="w-full flex items-center justify-between gap-3 bg-white border border-[#e2e8f0] rounded-[4px] px-4 py-3.5 shadow-[0_1px_4px_rgba(17,29,53,0.06)]"
              >
                <span className="flex items-center gap-2.5 text-[13px] font-medium text-[#000000] min-w-0">
                  <activeModule.Icon size={16} strokeWidth={1.5} className="text-[#2b6cb0] flex-shrink-0" />
                  <span className="truncate">{activeModule.title}</span>
                </span>
                <ChevronDown
                  size={16}
                  strokeWidth={2}
                  className={`text-[#000000] flex-shrink-0 transition-transform duration-200 ${moduleNavOpen ? "rotate-180" : ""}`}
                />
              </button>

              {moduleNavOpen && (
                <div className="absolute left-6 right-6 sm:left-10 sm:right-10 mt-1 bg-white border border-[#e2e8f0] rounded-[4px] shadow-[0_12px_32px_rgba(17,29,53,0.16)] max-h-[60vh] overflow-y-auto z-10">
                  {MODULES_LIST.map(({ slug, Icon, title }, i) => {
                    const isActive = activeId === slug
                    const isLast = i === MODULES_LIST.length - 1
                    return (
                      <a
                        key={slug}
                        href={`#${slug}`}
                        onClick={() => {
                          pulseHighlight(slug)
                          setModuleNavOpen(false)
                        }}
                        className={`flex items-center gap-3 px-4 py-3 text-[13px] font-medium transition-colors ${
                          isLast ? "" : "border-b border-[#e2e8f0]"
                        } ${isActive ? "text-[#114dac] bg-[#f7f7f7]" : "text-[#000000] hover:bg-[#f7f7f7]"}`}
                      >
                        <Icon size={16} strokeWidth={1.5} className={isActive ? "text-[#114dac]" : "text-[#2b6cb0]"} />
                        {title}
                      </a>
                    )
                  })}
                </div>
              )}
            </div>
          </nav>

          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-4">
            <h2 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-[1.15] text-[#114dac] tracking-tight">
              Features of Our Solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr]">
            {/* Sidebar column — desktop only. Full-bleed to the screen's
                left edge: no horizontal padding on this column itself, so
                each row's own background paints edge-to-edge and only the
                row's text is inset (via the row's own px-6).

                Two nested pieces on purpose (2026-09-08 fix, "gap at the
                bottom of the sidebar" — a first attempt that just dropped
                self-start from a single <aside> broke sticky entirely, see
                below):
                  1. OUTER plain <div> — this is the actual grid item, no
                     self-start, so default align-items:stretch makes it
                     match the content column's full height. Carries the
                     bg-[#f7f7f7] + border-r border-[#2b6cb0], so that color/
                     border now paints the ENTIRE column, right down to where
                     the content column ends, with zero overshoot (both are
                     sized off the same grid track) — no more blank white gap
                     below the 8 nav rows once you've scrolled past their
                     short natural height.
                  2. INNER <aside> — the actual sticky nav. Its containing
                     block for `position: sticky` purposes is now the OUTER
                     div (which is tall), not the grid track directly, so it
                     has the same "slack" to stick within that self-start
                     used to provide at the grid level.
                Why not just drop self-start on the one <aside>, full stop:
                sticky needs the element to be SHORTER than its containing
                block to have any room to visually pin in place. Once the
                outer grid item is stretched to match the content column
                (≈4000px tall), an <aside> that IS that stretched item has
                zero slack — its own height already equals its containing
                block's height, so there's nowhere for `top: sidebarTop` to
                hold it; it just scrolls normally like `position: static`
                (confirmed live: the whole nav scrolled off-screen, top ≈
                -850px, instead of staying pinned under the navbar). Splitting
                the stretched box from the sticky box fixes both at once. */}
            <div className="hidden lg:block border-r border-[#2b6cb0] bg-[#f7f7f7]">
              <aside className="sticky will-change-transform" style={{ top: sidebarTop }}>
                <div className="flex flex-col bg-[#f7f7f7]">
                  {MODULES_LIST.map(({ slug, title }, i) => {
                    const isActive = activeId === slug
                    const isLast = i === MODULES_LIST.length - 1
                    return (
                      <a
                        key={slug}
                        href={`#${slug}`}
                        onClick={() => pulseHighlight(slug)}
                        className={`flex items-center justify-between gap-3 px-6 py-4 font-serif text-[13px] leading-snug transition-colors ${
                          isLast ? "" : "border-b border-[#2b6cb0]"
                        } ${isActive ? "bg-white text-[#114dac] font-medium" : "bg-[#f7f7f7] text-[#000000] hover:text-[#114dac]"}`}
                      >
                        <span className="flex-1">{title}</span>
                        <ChevronRight
                          size={isActive ? 24 : 16}
                          strokeWidth={1.5}
                          className={`flex-shrink-0 transition-all ${isActive ? "text-[#2b6cb0]" : "text-black"}`}
                        />
                      </a>
                    )
                  })}
                </div>
              </aside>
            </div>

            {/* Module sections — full-bleed white panel, no max-width cap,
                so the white background reaches the screen's right edge;
                inner padding keeps the text off the literal edge without
                capping the background itself. */}
            <div className="bg-[#f7f7f7]">
            <div className="space-y-8 lg:space-y-10">
              {MODULES_LIST.map((module, i) => {
                const { slug, Icon, title, desc, slideDesc } = module
                const featureChecklist = MODULE_FEATURE_CHECKLIST[slug]
                const showMobileApp = MOBILE_APP_SLUGS.has(slug)
                const image = MODULE_IMAGES[slug]
                const highlighted = highlightId === slug
                const ctaHref = MODULE_PAGES[slug] ?? "/pricing"
                return (
                  <section key={slug} id={slug} className="scroll-mt-32">
                    <Reveal>
                      <div
                        className={`transition-colors duration-500 p-6 sm:p-8 lg:p-10 ${
                          highlighted ? "bg-[#fafafa]" : "bg-white"
                        }`}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                          {/* Content — order-2 at every breakpoint, so the
                              photo (order-1, below in this JSX) always
                              renders first / on the left. */}
                          <div className="order-2">
                            {/* Icon + title on one row (2026-09-09, per request:
                                "put the titles in the same line next to their
                                icons instead of putting them in the next
                                line") — was icon box stacked above the h2. */}
                            <div className="flex items-center gap-3.5 mb-3">
                              <div
                                className={`w-[42px] h-[42px] rounded-xl border flex items-center justify-center text-[#2b6cb0] transition-all duration-500 flex-shrink-0 ${
                                  highlighted ? "border-[#2b6cb0] bg-[#2b6cb0] text-white" : "border-[rgba(43,108,176,0.25)]"
                                }`}
                              >
                                <Icon size={18} strokeWidth={1.5} />
                              </div>
                              <h2 className="font-serif text-[clamp(1.25rem,2.2vw,1.55rem)] font-light text-[#114dac] leading-snug tracking-tight">
                                {linkifyGlossary(title, `${slug}-title`)}
                              </h2>
                            </div>
                            <p className="text-[12px] font-medium text-[#2b6cb0] tracking-[0.03em] mb-3">{linkifyGlossary(desc, `${slug}-desc`)}</p>
                            {featureChecklist ? (
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-5">
                                {featureChecklist.map((item, idx) => (
                                  <li key={`${item}-${idx}`} className="flex items-start gap-2 text-[12.5px] font-light text-[#000000] leading-snug">
                                    <CheckCircle2 size={14} strokeWidth={2} className="text-[#1a9e5c] flex-shrink-0 mt-[1.5px]" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-[12.5px] font-light text-[#000000] leading-[1.85] mb-5">{linkifyGlossary(slideDesc, `${slug}-slidedesc`)}</p>
                            )}
                            {/* "VIEW DETAILED FEATURES LISTING" cta — every module subsection ends with this */}
                            <div className="flex flex-wrap items-center gap-5">
                              <Link
                                href={ctaHref}
                                className="group inline-flex items-center justify-center gap-2 text-[13px] font-semibold px-7 py-3 rounded-[4px] transition-colors whitespace-nowrap bg-[#114dac] text-white hover:bg-[#0e3e8a]"
                              >
                                View Detailed Features Listing
                                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                              </Link>
                              {showMobileApp && (
                                // TODO: point at the real App Store / Google Play
                                // listing (or an internal /mobile-app page) once
                                // those links exist — placeholder per request
                                // (2026-09-09).
                                <Link
                                  href="#"
                                  className="inline-flex items-center justify-center gap-2 text-[13px] font-semibold px-7 py-3 rounded-[4px] transition-colors whitespace-nowrap border border-[#114dac] text-[#114dac] hover:bg-[#114dac] hover:text-white"
                                >
                                  <span className="flex items-center gap-1 flex-shrink-0">
                                    <img src="/images/appstore_icon.png" alt="" className="h-4 w-4 object-contain" />
                                    <img src="/images/googleplay_icon.png" alt="" className="h-4 w-4 object-contain" />
                                  </span>
                                  View Mobile App
                                </Link>
                              )}
                            </div>
                          </div>
                          {/* Photo — order-1 at every breakpoint (2026-09-09,
                              correction to the change above: "THE IMAGES
                              SHOULD BE ON THE LEFT AND THE TEXT ON THE
                              RIGHT" — image-left/text-right for every
                              module, still not alternating). Used to reset
                              to order-none at md+ and rely on a parent
                              direction:rtl trick to flip odd modules; now
                              that there's no alternation to support, plain
                              CSS `order` on both children is simpler and
                              needs no direction hack. */}
                          <div className="order-1 overflow-hidden min-h-[220px]">
                            {image ? (
                              <img src={image} alt={title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center min-h-[220px]">
                                <Icon size={40} strokeWidth={1} className="text-[#2b6cb0]/20" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  </section>
                )
              })}
            </div>
            </div>
          </div>
        </div>

        {/* ── CONTACT US FOR A WALKTHROUGH — cloned verbatim from ──
            src/app/page.tsx (2026-09-08), per request: exact same
            section as the homepage — same title, subtitle, form,
            video panel, trust chips, and "Download Brochure" CTA,
            wired to the same OverviewContactForm / email backend. ── */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10 lg:py-14">
            <h3 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-[1.15] text-[#114dac] tracking-tight mb-2">
              Contact Us for a Walkthrough
            </h3>
            <p className="text-[13.5px] font-light leading-[1.8] text-[#000000] mb-6 max-w-[460px]">
              Tell us about your requirements and we will get back to you within 24hrs.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 lg:items-stretch">

              {/* Form card — grey now that the section itself is white (was
                  white-on-grey before the section swap above). */}
              <div className="bg-[#f7f7f7] rounded-[4px] border border-[#dbe5f0] shadow-[0_8px_32px_rgba(17,29,53,0.09)] p-5 sm:p-6 max-w-[460px] w-full">
                <OverviewContactForm />
              </div>

              {/* Right — video, grey panel to match the form card (was white
                  before the section swap above). Hidden below lg (2026-09-08,
                  "hide the video in the contact form on phone") — the grid
                  above already collapses to one column there, so this was
                  rendering as a large empty-looking placeholder under the
                  form on phone/tablet before the user pressed play. */}
              <div className="hidden lg:block relative rounded-[4px] overflow-hidden bg-[#f7f7f7] border border-[#dbe5f0] min-h-[280px] lg:min-h-0 lg:h-full">
                {!inlineVideoPlaying && (
                  <button
                    onClick={() => setInlineVideoPlaying(true)}
                    className="group absolute inset-0 w-full h-full cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b6cb0]"
                    aria-label="Play Firmity demo video inline"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#114dac] group-hover:bg-[#0e3e8a] flex items-center justify-center shadow-[0_8px_24px_rgba(17,77,172,0.28)] transition-all duration-300 group-hover:scale-110">
                      <div className="w-0 h-0 ml-1" style={{ borderTop: "9px solid transparent", borderBottom: "9px solid transparent", borderLeft: "15px solid #fff" }} />
                    </div>
                  </button>
                )}

                {/* Inline iframe — proper autoplay URL for YouTube, Vimeo, direct */}
                {inlineVideoPlaying && videoUrl && (
                  <iframe
                    src={buildInlineVideoUrl(videoUrl)}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="Firmity CMMS Demo"
                  />
                )}

                {inlineVideoPlaying && !videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#f7f7f7]">
                    <div className="text-center">
                      <p className="text-[#4a5568] text-sm mb-2">No video URL configured</p>
                      <p className="text-[#a0aec0] text-xs font-sans">Set NEXT_PUBLIC_VIDEO_URL</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Trust chips — left-aligned, sits under the form column thanks
                to the shared max-w-[460px] + this section's own left inset. */}
            <div className="flex items-center gap-5 mt-4 flex-wrap max-w-[460px]">
              {[
                { Icon: Lock, label: "No spam" },
                { Icon: Zap, label: "24hr response" },
              ].map(function(chip) {
                const ChipIcon = chip.Icon
                return (
                  <span key={chip.label} className="flex items-center gap-1.5 text-[10.5px] font-light text-[#000000]">
                    <ChipIcon size={12} strokeWidth={1.75} className="text-[#000000]" />
                    {chip.label}
                  </span>
                )
              })}
            </div>

            {/* Secondary CTA — opens the brochure-download popup below. */}
            <div className="mt-5 flex items-center gap-2 max-w-[460px]">
              <span className="text-[11px] text-[#000000] font-light">Prefer a quick read first?</span>
              <button
                type="button"
                onClick={() => setBrochurePopupOpen(true)}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-[4px] border border-[#2b6cb0]/30 px-3 py-1 text-[11px] text-[#2b6cb0] font-semibold hover:border-[#2b6cb0] hover:bg-[#2b6cb0]/[0.06] transition-colors"
              >
                <Download size={11} strokeWidth={2} />
                Download Brochure
              </button>
            </div>
          </div>
        </section>

        {/* Brochure-download popup (2026-09-04) — triggered by "Download
            Brochure" above. Same modal pattern as SurveyPopup's own card:
            fixed overlay + centered white panel, backdrop click and the X
            button both close it, inner click stopped from bubbling to the
            backdrop. Reuses BrochureDownloadForm unmodified. */}
        {brochurePopupOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-[3px]"
            onClick={() => setBrochurePopupOpen(false)}
          >
            <div
              className="relative w-full max-w-[440px] bg-white rounded-[4px] p-6 sm:p-7 shadow-[0_32px_80px_rgba(17,29,53,0.28)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setBrochurePopupOpen(false)}
                aria-label="Close"
                className="cursor-pointer absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f7f7f7] hover:bg-[#e8f0fb] flex items-center justify-center transition-colors"
              >
                <X size={15} className="text-[#114dac]" />
              </button>
              <h3 className="font-serif text-[19px] font-light text-[#114dac] mb-1 pr-8">
                Download the Firmity brochure
              </h3>
              <p className="text-[12.5px] text-[#000000] font-light leading-relaxed mb-5">
                Modules, pricing, integrations, and deployment guide — all in one PDF.
              </p>
              <BrochureDownloadForm />
            </div>
          </div>
        )}

        {/* ── LIVE PRODUCT DEMO — embeds public/firmity-interactive-demo.html,
            unchanged from the prior build (see that build's own note): a
            self-contained static HTML/Chart.js mock of the real dashboard,
            kept as an <iframe> since it does its own canvas/DOM work that
            isn't safe to hydrate. Hidden below md — its own internal layout
            only degrades gracefully to ~760px. ── */}
        <section className="hidden md:block bg-[#f7f7f7] py-8 lg:py-10">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <Reveal>
              <h2 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-[1.15] text-[#114dac] tracking-tight max-w-2xl">
                A live look inside the Firmity dashboard
              </h2>
              <p className="text-[13.5px] font-light text-[#000000] leading-[1.8] max-w-2xl mt-2">
                Explore a working walkthrough of the actual product — tickets, assets, attendance, and reports,
                wired together the same way they are on your real facility data.
              </p>
            </Reveal>
            {/* Dashboard preview (2026-09-09 follow-up, per request: "wtf
                is wrong with the mock dashboard, i should not have to
                scroll to see all of it. reduce the size of everything ...
                and increase the overall size"): the internal scroll came
                from firmity-interactive-demo.html's .content needing more
                height than the iframe box gave it. Fixed at the source —
                that file now applies `zoom:0.72` to its .app shell (a real
                relayout, not transform:scale, so scrollHeight actually
                shrinks) and dropped .content's own overflow-y:auto, so the
                whole mock now measures ~718px tall total. This iframe box
                is 760px — comfortably taller than that with room to spare,
                bigger than the previous 45vh/440px attempt (which was
                itself too cramped) but nowhere near the original 720px
                iframe + 14/20 section padding that started this. */}
            <Reveal delay={120}>
              <div className="mt-5 rounded-[20px] border border-[#dbe5f0] shadow-[0_18px_48px_rgba(17,29,53,0.1)] overflow-hidden bg-white">
                <div className="flex items-center gap-1.5 px-4 py-3 bg-[#f7f9fb] border-b border-[#e2e8f0]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e2e8f0]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e2e8f0]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e2e8f0]" />
                  <span className="ml-3 text-[10.5px] font-light text-[#000000]/50">app.firmity.in</span>
                </div>
                <iframe
                  // Cache-busted (2026-09-09): the browser was serving a
                  // stale cached copy of this static file after edits —
                  // classic "I changed the file and nothing happened"
                  // symptom for an <iframe src="..."> to a public/ asset.
                  // Bump this query value whenever the demo html changes
                  // so a normal refresh (not a hard-reload) always picks
                  // up the latest version.
                  src="/firmity-interactive-demo.html?v=8"
                  title="Firmity interactive product demo"
                  loading="lazy"
                  className="w-full h-[660px] block border-0"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── WHY CLOUD — cloud-forward messaging, cued from sap.com's ──
            "what is ERP" resource page (anywhere access, lower hardware/
            support cost, stronger security, integration with other systems,
            adopting a "cloud mindset" as the pace of business accelerates) —
            rewritten in Firmity's own words, not reproduced from the source.
            Light band (was a dark-navy #1a2744 panel) — 2026-09-08, per the
            page-wide "no dark blue anywhere" request. ── */}
        <section className="bg-white border-t border-[#dbe5f0] relative overflow-hidden py-14 lg:py-20">
          <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">
              <Reveal>
                <h2 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-tight text-[#114dac] tracking-tight">
                  Built cloud-first, not a legacy system with a cloud login bolted on.
                </h2>
                <p className="text-[13.5px] font-light text-[#000000] leading-[1.85] mt-3">
                  {linkifyGlossary(
                    'Cloud ERP has become the default for facility teams, not a fallback. It runs on a ' +
                    'subscription, so there is no server room to build, patch, or replace every few years, ' +
                    'and the provider carries the maintenance and upgrade load instead of your team. Your ' +
                    'managers can open Firmity from a site visit, a client meeting, or a phone in the field ' +
                    'and see the same live data as the office. Security improves too: most breaches trace ' +
                    'back to on-premise systems left unpatched, while a cloud platform runs on redundant, ' +
                    'off-site backups with dedicated security teams watching it around the clock, coverage ' +
                    'few facility teams can staff on their own. And because Firmity already lives in the ' +
                    'cloud, it connects to the other cloud systems you run, accounting, HR, IoT sensors, ' +
                    'without custom point-to-point integrations holding it all together. As the pace of ' +
                    'facility operations keeps accelerating, that cloud-first foundation stops being ' +
                    'optional and becomes the baseline every other decision gets built on.',
                    "why-cloud-copy",
                  )}
                </p>
              </Reveal>
              <Reveal delay={100}>
                <img
                  src="/images/cloud.png"
                  alt="Firmity cloud platform, accessible anywhere and connected to accounting, HR, and IoT systems"
                  className="w-full h-auto object-contain"
                />
              </Reveal>
            </div>
            <Reveal delay={140}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
                {[
                  { Icon: Globe,     title: "Anywhere access",      desc: "Log in from any site, any device. No VPN, no on-prem client." },
                  { Icon: Wallet,    title: "Lower overhead",       desc: "No servers to buy, patch, or refresh every few years." },
                  { Icon: ShieldCheck, title: "Stronger security",  desc: "Redundant off-site backups with dedicated security teams, around the clock." },
                  { Icon: Workflow,  title: "One connected system", desc: "Every module reads and writes the same live data. Nothing to reconcile." },
                ].map(({ Icon, title, desc }) => (
                  <div key={title} className="bg-white rounded-xl border border-[#dbe5f0] p-6">
                    <Icon size={18} strokeWidth={1.5} className="text-[#2b6cb0] mb-3" />
                    <div className="text-[12.5px] font-semibold text-[#114dac] mb-1.5">{title}</div>
                    <p className="text-[11.5px] font-light text-[#000000] leading-[1.7]">{desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── KEEP IN TOUCH — same component/instance the homepage uses ──
            (moved 2026-09-10, per request, to right after "Built cloud-first"
            instead of just before the FAQ). ── */}
        <KeepInTouchSection bannerImage="/images/features_banner.png" bannerPosition="center top" />

        {/* ── ERP & CMMS GUIDES — icon-topped card grid, same lighter ──
            pattern as the RESOURCES cards on /resources/page.tsx (icon box,
            small label, title, excerpt, "Read guide" link) — swapped in
            2026-09-08 for the previous solid-color header-bar (blog-card)
            style, which used a bg-[#114dac]/bg-[#2b6cb0] bar per card; that
            no longer fits the page-wide "no dark blue" direction. Each card
            opens /resources/guide/[slug] — full content in
            src/lib/erp-guides.ts. Getting Started Guide card (already exists
            on /resources, linking to /contact) included alongside so this
            page is also reachable that way. ── */}
        <section id="erp-guides" className="bg-[#f7f7f7] border-t border-[#dbe5f0] py-14 lg:py-20 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <Reveal>
              <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
                <div>
                  <h2 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-[1.15] text-[#114dac] tracking-tight mb-1">
                    {linkifyGlossary("Guides for teams evaluating ERP", "guides-h2")}
                  </h2>
                  <p className="text-[13.5px] font-light leading-[1.8] text-[#000000] max-w-[460px]">
                    {linkifyGlossary(
                      "Whether you call it ERP or CMMS — here's what the terms actually mean, and how to evaluate, implement, or replace either one.",
                      "guides-intro",
                    )}
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-[#2b6cb0] text-[12.5px] font-semibold hover:gap-2.5 transition-all flex-shrink-0"
                >
                  Getting Started Guide <ArrowRight size={13} />
                </Link>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ERP_GUIDES.map((guide, i) => {
                const GuideIcon = GUIDE_ICONS[guide.slug] ?? BookOpen
                return (
                  <Reveal key={guide.slug} delay={(i % 3) * 100}>
                    <Link
                      href={`/resources/guide/${guide.slug}`}
                      className="group block h-full bg-white rounded-[20px] border border-[#cbd5e0] shadow-[0_4px_20px_rgba(17,29,53,0.06)] hover:shadow-[0_14px_36px_rgba(17,29,53,0.13)] hover:-translate-y-1 hover:border-[#2b6cb0]/50 transition-all duration-300 p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b6cb0]"
                    >
                      <div className="w-[42px] h-[42px] rounded-xl border border-[rgba(43,108,176,0.25)] group-hover:border-[#2b6cb0] group-hover:bg-[#2b6cb0] flex items-center justify-center mb-4 text-[#2b6cb0] group-hover:text-white transition-all duration-300">
                        <GuideIcon size={17} strokeWidth={1.5} />
                      </div>
                      <div className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#2b6cb0]/60 mb-1.5">Guide</div>
                      <div className="text-[13px] font-semibold text-[#114dac] mb-1.5 group-hover:text-[#2b6cb0] transition-colors">{guide.title}</div>
                      <p className="text-[12.5px] font-light text-[#000000] leading-[1.7] mb-4 line-clamp-3">{guide.description}</p>
                      <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-[#2b6cb0] group-hover:gap-3 transition-all">
                        Read guide <ArrowRight size={12} />
                      </span>
                    </Link>
                  </Reveal>
                )
              })}

              {/* Getting Started Guide — same entry that exists on /resources
                  (RESOURCES array there), reachable from here too per request. */}
              <Reveal delay={(ERP_GUIDES.length % 3) * 100}>
                <Link
                  href="/contact"
                  className="group block h-full bg-white rounded-[20px] border-2 border-dashed border-[#2b6cb0]/30 hover:border-[#2b6cb0] hover:shadow-[0_14px_36px_rgba(17,29,53,0.13)] hover:-translate-y-1 transition-all duration-300 p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b6cb0]"
                >
                  <div className="w-[42px] h-[42px] rounded-xl border border-[rgba(43,108,176,0.25)] group-hover:border-[#2b6cb0] group-hover:bg-[#2b6cb0] flex items-center justify-center mb-4 text-[#2b6cb0] group-hover:text-white transition-all duration-300">
                    <BookOpen size={17} strokeWidth={1.5} />
                  </div>
                  <div className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#2b6cb0]/60 mb-1.5">Get Started</div>
                  <div className="text-[13px] font-semibold text-[#114dac] mb-1.5 group-hover:text-[#2b6cb0] transition-colors">Getting Started Guide</div>
                  <p className="text-[12.5px] font-light text-[#000000] leading-[1.7] mb-4">Step-by-step industry guide for your organization.</p>
                  <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-[#2b6cb0] group-hover:gap-3 transition-all">
                    Learn more <ArrowRight size={12} />
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── FAQ — features/module/ERP-specific questions ── */}
        <section className="bg-white py-6 lg:py-8">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <h2 className="font-serif font-light text-[clamp(1.6rem,4vw,2.6rem)] leading-[1.15] text-[#114dac] tracking-tight mb-2">
              FAQ
            </h2>
            <p className="text-[13.5px] font-light leading-[1.8] text-[#000000] max-w-[460px] mb-8">
              Quick answers to what teams evaluating Firmity's modules ask most.
            </p>
            <div>
              {FAQ_ITEMS.map((item, i) => {
                const isOpen = openFaq === i
                return (
                  <div key={item.q} style={{ borderTop: "1px solid #e2e8f0" }}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                      className="cursor-pointer w-full flex items-center gap-4 py-5 text-left group"
                      aria-expanded={isOpen}
                    >
                      <ChevronDown
                        size={18}
                        className="flex-shrink-0 transition-transform duration-200"
                        style={{ color: "#2b6cb0", transform: isOpen ? "rotate(180deg)" : "rotate(-90deg)" }}
                      />
                      <span className="text-[15px] font-medium text-[#114dac] group-hover:text-[#2b6cb0] transition-colors leading-snug">
                        {item.q}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="pb-6 pl-[34px] pr-2">
                        <p className="text-[13.5px] leading-[1.8] text-[#000000]">{linkifyGlossary(item.a, `faq-${i}`)}</p>
                      </div>
                    )}
                  </div>
                )
              })}
              <div style={{ borderTop: "1px solid #e2e8f0" }} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
// EOF
