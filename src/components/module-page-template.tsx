"use client"

// ─── Module Page Template (2026-09-12) ────────────────────────────────────────
// Shared layout for every dedicated module page (/facility-task-automation,
// and — as they get rebuilt — /asset-management, /complaint-management,
// /inventory-management, /staff-attendance, /visitor-management). One
// component, data-driven via ModulePageConfig, so every module page shares
// the exact same visual system as the homepage/features instead of each
// hand-rolling its own theme (the old /preventive-maintenance page had its
// own dark-green palette — see MEMORY.md — which is exactly what this
// template replaces).
//
// Design language matches home-sections.tsx / features/page.tsx exactly:
// - Heading text: #114dac (font-serif, font-light, tracking-tight, clamp sizes)
// - Accent: #2b6cb0 (kickers, links, icons, borders)
// - Body copy: #000000, font-light, 12.5-13.5px
// - Section backgrounds alternate white / #f7f7f7 / #eef3f9 — never dark navy
//   (that treatment is reserved for the homepage hero/risk-board/module
//   slideshow, not a standalone module page)
// - Card radius: rounded-[4px] (current sitewide convention, matches
//   ExploreSection/Pillars/features guide cards)
// - CTA buttons: bg-[#114dac] hover:bg-[#0e3e8a] solid primary; bordered
//   #114dac outline secondary — same pair used on features/page.tsx module
//   panels ("View Detailed Features Listing")
// - Reveal (src/components/reveal.tsx) drives every scroll-in animation,
//   same as every other page — no new animation primitive introduced.
//
// A module page supplies a ModulePageConfig; MODULE_IMAGES/MODULES_LIST
// (home-sections.tsx) are read directly here by `slug` so the hero photo and
// the "works well with" cross-links never drift from the single source of
// truth those two arrays already are for the rest of the site.
//
// SIDEBAR, take 3 (2026-09-16): an "Explore our solutions" sidebar (sticky,
// then fixed-with-scroll-tracking) was tried here through several iterations
// and never rendered reliably against the page's mix of tall and short
// full-bleed sections — removed entirely per request on 2026-09-16 ("get rid
// of the explore our solutions sidebar, you are not able to get it right").
// It's back now, per a later, more scoped request: "copy [the sidebar on
// /resources/guide/what-is-cmms] and implement it in
// /facility-task-automation from Capabilities section to Full Feature Set
// section only." This is a DIFFERENT, much simpler technique than either
// previous attempt — no JS at all: plain CSS `position: sticky`, exactly
// what already works reliably on src/app/resources/guide/[slug]/page.tsx.
// The trick that makes it safe this time is scope: the sidebar's containing
// block (the wrapping grid below) spans ONLY the Capabilities + Feature
// groups sections — nothing else. A sticky element can't stick past the
// bottom of its own containing block, so the rail naturally stops following
// scroll the instant Feature groups ends, with zero measurement, listeners,
// or IntersectionObserver involved. That's the whole reason the earlier
// fixed-position + scroll-tracking version kept misbehaving (it was trying
// to replicate this same "stop at a boundary" behavior by hand, against a
// page of full-bleed sections it couldn't cleanly measure) and the whole
// reason this version can't repeat that failure mode.
// Opt-in via config.showSolutionsSidebar (default off) — ONLY
// /facility-task-automation sets it, per request ("...only"); every other
// module page on this shared template renders Capabilities/Feature groups
// exactly as before, full-width, no sidebar.

import Link from "next/link"
import { useState, type FC, type ReactNode } from "react"
import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Reveal } from "@/src/components/reveal"
import { ModuleSolutionsSidebar } from "@/src/components/module-solutions-sidebar"
import { KeepInTouchSection, MODULES_LIST, MODULE_IMAGES, MODULE_PAGES } from "@/src/components/home-sections"
import { ClientsCarousel } from "@/src/components/clients-carousel"
import { OverviewContactForm } from "@/src/components/overview-contact-form"
import { BrochureDownloadForm } from "@/src/components/brochure-download-form"
import { buildInlineVideoUrl } from "@/src/lib/video"
import { ArrowRight, ChevronDown, CheckCircle2, Lock, Zap, Download, X, type LucideProps } from "lucide-react"

// ─── Local kicker — mirrors home-sections.tsx's (module-private) SectionKicker
// exactly. Duplicated here rather than exporting the original, to avoid
// touching an already-large shared file for one small presentational piece. ──
function ModuleKicker({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-6 h-px bg-[#2b6cb0] flex-shrink-0" />
      <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#2b6cb0]">{text}</span>
    </div>
  )
}

// ─── Companies marquee — copied verbatim from src/app/page.tsx's own
// "Trusted by Leading Companies" band (2026-09-12), for pages that opt in
// via config.showClientsMarquee. No local state needed — ClientsCarousel is
// self-contained. Rendered full-bleed BEFORE the sticky sidebar region
// starts (see file header). ──────────────────────────────────────────────
function ClientsMarqueeSection() {
  return (
    <section className="bg-transparent sm:bg-white/60 pb-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-6 h-px bg-[#2b6cb0]" />
          <span className="text-[#2b6cb0] text-[10px] font-semibold tracking-[0.2em] uppercase">Trusted by Leading Companies</span>
        </div>
        <h2 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-[1.15] text-[#114dac] tracking-tight mb-1">
          Companies Using Firmity
        </h2>
        <p className="text-[13.5px] font-light leading-[1.8] text-[#000000] mb-6">
          Join hundreds of facility managers transforming their operations
        </p>
      </div>
      <div>
        <ClientsCarousel />
      </div>
    </section>
  )
}

// ─── "Contact Us for a Walkthrough" — copied verbatim from src/app/page.tsx
// (form + inline video + trust chips + brochure popup), for pages that opt
// in via config.showContactWalkthrough. Keeps its own local state (video
// playing, popup open). No outer <section>/max-w-7xl wrapper of its own
// (2026-09-12) — it now renders INSIDE the sticky sidebar region's content
// column, which already provides that container, so wrapping again here
// would double the horizontal padding. ─────────────────────────────────────
function ContactWalkthroughSection() {
  const [inlineVideoPlaying, setInlineVideoPlaying] = useState<boolean>(false)
  const [brochurePopupOpen, setBrochurePopupOpen] = useState<boolean>(false)
  const videoUrl = process.env.NEXT_PUBLIC_VIDEO_URL ?? ""

  return (
    <div>
      <h3 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-[1.15] text-[#114dac] tracking-tight mb-2">
        Contact Us for a Walkthrough
      </h3>
      <p className="text-[13.5px] font-light leading-[1.8] text-[#000000] mb-6 max-w-[460px]">
        Tell us about your requirements and we will get back to you within 24hrs.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 lg:items-stretch">
        <div className="bg-[#f7f7f7] rounded-[4px] border border-[#dbe5f0] shadow-[0_8px_32px_rgba(17,29,53,0.09)] p-5 sm:p-6 max-w-[460px] w-full">
          <OverviewContactForm />
        </div>

        <div className="relative rounded-[4px] overflow-hidden bg-[#f7f7f7] border border-[#dbe5f0] min-h-[280px] lg:min-h-0 lg:h-full">
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

      <div className="flex items-center gap-5 mt-4 flex-wrap max-w-[460px]">
        {[
          { Icon: Lock, label: "No spam" },
          { Icon: Zap, label: "24hr response" },
        ].map((chip) => {
          const ChipIcon = chip.Icon
          return (
            <span key={chip.label} className="flex items-center gap-1.5 text-[10.5px] font-light text-[#000000]">
              <ChipIcon size={12} strokeWidth={1.75} className="text-[#000000]" />
              {chip.label}
            </span>
          )
        })}
      </div>

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
    </div>
  )
}

// ─── Config types ───────────────────────────────────────────────────────────

export interface ModuleStat {
  value: string
  label: string
}

export interface ModuleCapability {
  Icon: FC<LucideProps>
  title: string
  desc: string
}

export interface ModuleFeatureGroup {
  title: string
  blurb: string
  items: string[]
}

export interface ModuleProcessStep {
  num: string
  Icon: FC<LucideProps>
  title: string
  desc: string
}

export interface ModuleVariant {
  Icon: FC<LucideProps>
  title: string
  desc: string
}

export interface ModuleImpactMetric {
  value: string
  label: string
  sub: string
}

export interface ModuleIndustry {
  title: string
  desc: string
}

export interface ModuleScenarioBeat {
  time: string
  title: string
  desc: string
}

export interface ModuleFaqItem {
  q: string
  a: string
}

export interface ModulePageConfig {
  /** Must match a MODULES_LIST slug — drives the hero photo (MODULE_IMAGES)
      and the "works well with" cross-links (MODULES_LIST lookups). */
  slug: string
  moduleNumber: string
  category: string
  /** Hides the "Module NN · Category" pill above the hero headline
      (2026-09-12, per request, first used on /facility-task-automation). */
  hideModuleBadge?: boolean
  heroHeadline: ReactNode
  heroDescription: string
  heroStats: ModuleStat[]
  heroImageAlt: string
  /** Companies-marquee band (ClientsCarousel), copied verbatim from the
      landing page — rendered directly after the hero when true. Off by
      default; opt in per page (2026-09-12, first used on
      /facility-task-automation). */
  showClientsMarquee?: boolean
  /** Intro statement, now optional (2026-09-12) — a page can drop it while
      keeping the "Explore our solutions" sidebar, which no longer depends
      on these fields being present. */
  introKicker?: string
  introHeading?: ReactNode
  introBody?: string
  capabilitiesKicker: string
  capabilitiesHeading: string
  capabilities: ModuleCapability[]
  featureGroupsKicker: string
  featureGroupsHeading: string
  featureGroupsIntro: string
  featureGroups: ModuleFeatureGroup[]
  /** Sticky "Explore our solutions" rail (ModuleSolutionsSidebar) alongside
      ONLY the Capabilities + Feature groups sections — pure CSS `position:
      sticky`, same technique as /resources/guide/[slug]. Off by default;
      opt in per page (2026-09-16, first/only used on
      /facility-task-automation, per explicit request). See the file-header
      note above for why this is safe where the earlier fixed-position
      version wasn't. */
  showSolutionsSidebar?: boolean
  /** "Contact Us for a Walkthrough" — form + video + brochure popup, copied
      verbatim from the landing page. Rendered directly after Feature
      groups when true (2026-09-12, first used on /facility-task-automation). */
  showContactWalkthrough?: boolean
  /** How-it-works process steps — optional (2026-09-12); section is
      skipped entirely when omitted, same pattern as `variants` below. */
  processKicker?: string
  processHeading?: string
  processSteps?: ModuleProcessStep[]
  variantsKicker?: string
  variantsHeading?: string
  variants?: ModuleVariant[]
  /** Business-impact metrics — optional (2026-09-12); section is skipped
      entirely when omitted. */
  impactKicker?: string
  impactHeading?: ReactNode
  impactMetrics?: ModuleImpactMetric[]
  impactPanelHeading?: ReactNode
  impactChecklist?: string[]
  scenarioKicker: string
  scenarioHeading: string
  scenarioIntro: string
  scenarioBeats: ModuleScenarioBeat[]
  /** Industries grid — optional (2026-09-12); section is skipped entirely
      when omitted. */
  industriesKicker?: string
  industriesHeading?: string
  industries?: ModuleIndustry[]
  /** Slugs into MODULES_LIST for the cross-link cards. */
  relatedSlugs: string[]
  faqHeading: string
  faqIntro: string
  faqs: ModuleFaqItem[]
  ctaHeading: string
  ctaBody: string
  /** Optional override for the Keep-in-touch banner photo — see
      KeepInTouchSection's own bannerImage prop (home-sections.tsx). */
  bannerImage?: string
}

export function ModulePageTemplate({ config }: { config: ModulePageConfig }) {
  const [openFaq, setOpenFaq] = useState<number>(0)
  const heroImage = MODULE_IMAGES[config.slug]
  const related = config.relatedSlugs
    .map((slug) => MODULES_LIST.find((m) => m.slug === slug))
    .filter((m): m is (typeof MODULES_LIST)[number] => Boolean(m))

  return (
    <>
      <Navigation />
      <main className="bg-white">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        {/* overflow-hidden HERE, not on <main> (2026-09-16, per request — the
            sticky "Explore our solutions" sidebar was scrolling away instead
            of sticking, unlike the working one on /resources/guide/[slug]).
            Root cause: `overflow-x-hidden` on <main> — added at some point
            to clip the brief horizontal translateX() this section's own
            Reveal direction="left" hero image produces before it settles —
            was an ancestor of the sidebar too. Per spec, `position: sticky`
            doesn't stick if ANY ancestor sets `overflow` to something other
            than `visible` (even just overflow-x): the ancestor becomes a
            scroll/clipping container and the sticky element just scrolls
            with the page instead, which is exactly the "scrolling out of
            the viewport" symptom reported. guide/[slug]/page.tsx's <main>
            never had this class, which is why its sidebar always worked.
            Fix: move the clipping down to only the two sections that
            actually use a horizontal Reveal direction (this Hero, and the
            optional Business-impact panel below) — the sidebar's own
            containing block (the Capabilities/Feature-groups grid, a
            sibling of both) is never wrapped in an overflow-hidden ancestor
            now, so `sticky` behaves the same way it already does on the
            guide pages. ── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[90svh] lg:min-h-[82vh] overflow-hidden">
          <div className="px-6 sm:px-10 lg:px-16 py-16 lg:py-0 flex flex-col justify-center">
            {!config.hideModuleBadge && (
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-[4px] px-3 py-1 mb-6 border border-[rgba(43,108,176,0.25)] w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2b6cb0]" />
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#2b6cb0]">
                    Module {config.moduleNumber} · {config.category}
                  </span>
                </div>
              </Reveal>
            )}

            <Reveal delay={80}>
              <h1
                className="font-serif font-light text-[#114dac] leading-[1.1] tracking-tight mb-6"
                style={{ fontSize: "clamp(1.9rem,4.2vw,3rem)" }}
              >
                {config.heroHeadline}
              </h1>
            </Reveal>

            <Reveal delay={150}>
              <p className="text-[13.5px] font-light leading-[1.8] text-[#000000] max-w-[480px] mb-9">
                {config.heroDescription}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="grid grid-cols-3 gap-5 mb-9 max-w-[440px]">
                {config.heroStats.map((s) => (
                  <div key={s.label}>
                    <p
                      className="font-serif font-light leading-none mb-1.5 text-[#114dac]"
                      style={{ fontSize: "clamp(1.5rem,3.2vw,2rem)" }}
                    >
                      {s.value}
                    </p>
                    <p className="text-[10.5px] leading-snug text-[#000000]/60">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={250}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-[4px] px-7 py-3 text-[13px] font-semibold bg-[#114dac] text-white hover:bg-[#0e3e8a] transition-colors"
                >
                  Book a Demo <ArrowRight size={14} />
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center justify-center gap-2 rounded-[4px] px-7 py-3 text-[13px] font-semibold border border-[#114dac] text-[#114dac] hover:bg-[#114dac] hover:text-white transition-colors"
                >
                  Explore All Features
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="hidden lg:flex bg-[#f7f7f7] items-center justify-center p-10 lg:p-14">
            {heroImage && (
              <Reveal direction="left" delay={180}>
                <img
                  src={heroImage}
                  alt={config.heroImageAlt}
                  className="w-full max-w-[520px] h-auto select-none drop-shadow-[0_24px_48px_rgba(17,29,53,0.18)]"
                  draggable={false}
                />
              </Reveal>
            )}
          </div>
        </section>

        {/* ── Companies marquee (optional) — copied verbatim from the
            landing page, right after the hero, when a page opts in
            (2026-09-12, first used on /facility-task-automation). ── */}
        {config.showClientsMarquee && <ClientsMarqueeSection />}

        {/* ══════════════════════════════════════════════════════════════
            Main content — single column. Stacks Intro → Capabilities →
            Feature groups → Contact walkthrough → Process → Variants →
            Business impact → Scenario → Industries, each optional field
            controlling whether its block renders. ──────────────────────── */}
        <section className="bg-white py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="min-w-0 flex flex-col gap-14 lg:gap-20">

                {/* Intro (optional) */}
                {config.introHeading && (
                  <div className="max-w-2xl">
                    <Reveal>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-6 h-px bg-[#2b6cb0]" />
                        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#2b6cb0]">
                          {config.introKicker}
                        </span>
                      </div>
                      <h2
                        className="font-serif font-light leading-[1.15] tracking-tight text-[#114dac] mb-6"
                        style={{ fontSize: "clamp(1.6rem,4vw,2.6rem)" }}
                      >
                        {config.introHeading}
                      </h2>
                      <p className="text-[13.5px] font-light leading-[1.8] text-[#000000]">
                        {config.introBody}
                      </p>
                    </Reveal>
                  </div>
                )}

                {/* Capabilities + Feature groups — built once as a fragment so
                    the sidebar-wrapped and plain layouts below don't have to
                    duplicate this JSX; which wrapper renders it depends on
                    config.showSolutionsSidebar. */}
                {(() => {
                  const capabilitiesAndFeatures = (
                    <>
                      {/* Capabilities grid */}
                      <div>
                        <Reveal>
                          <div className="mb-10">
                            <ModuleKicker text={config.capabilitiesKicker} />
                            <h2
                              className="font-serif font-light leading-[1.15] tracking-tight text-[#114dac]"
                              style={{ fontSize: "clamp(1.5rem,3.5vw,2.4rem)" }}
                            >
                              {config.capabilitiesHeading}
                            </h2>
                          </div>
                        </Reveal>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {config.capabilities.map((cap, i) => (
                            <Reveal key={cap.title} delay={i * 55}>
                              <div className="rounded-[4px] p-6 h-full bg-[#f7f7f7] border border-[#e2e8f0] hover:border-[#114dac]/40 hover:shadow-[0_10px_30px_rgba(17,77,172,0.08)] transition-all">
                                <div className="w-[42px] h-[42px] rounded-xl border border-[rgba(43,108,176,0.25)] flex items-center justify-center mb-5 text-[#2b6cb0] bg-white">
                                  <cap.Icon size={18} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-[14px] font-semibold text-[#114dac] mb-2 leading-snug">{cap.title}</h3>
                                <p className="text-[12.5px] font-light leading-[1.75] text-[#000000]">{cap.desc}</p>
                              </div>
                            </Reveal>
                          ))}
                        </div>
                      </div>

                      {/* Feature groups — expanded checklist */}
                      <div>
                        <Reveal>
                          <div className="mb-10 max-w-2xl">
                            <ModuleKicker text={config.featureGroupsKicker} />
                            <h2
                              className="font-serif font-light leading-[1.15] tracking-tight text-[#114dac] mb-4"
                              style={{ fontSize: "clamp(1.5rem,3.5vw,2.4rem)" }}
                            >
                              {config.featureGroupsHeading}
                            </h2>
                            <p className="text-[13.5px] font-light leading-[1.8] text-[#000000]">{config.featureGroupsIntro}</p>
                          </div>
                        </Reveal>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {config.featureGroups.map((group, i) => (
                            <Reveal key={group.title} delay={i * 70}>
                              <div className="rounded-[4px] border border-[#e2e8f0] bg-[#f7f7f7] p-6 h-full">
                                <h3 className="font-serif text-[1.05rem] font-normal text-[#114dac] mb-2 leading-snug">
                                  {group.title}
                                </h3>
                                <p className="text-[12.5px] font-light leading-[1.7] text-[#000000] mb-4">{group.blurb}</p>
                                <ul className="grid grid-cols-1 gap-y-2">
                                  {group.items.map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-[12px] font-light text-[#000000] leading-snug">
                                      <CheckCircle2 size={13} strokeWidth={2} className="text-[#1a9e5c] flex-shrink-0 mt-[2px]" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </Reveal>
                          ))}
                        </div>
                      </div>
                    </>
                  )

                  if (!config.showSolutionsSidebar) return capabilitiesAndFeatures

                  return (
                    <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16">
                      {/* Sidebar — hidden below lg, pure CSS `position: sticky`
                          bounded to THIS grid's height only (Capabilities +
                          Feature groups), same technique already working on
                          /resources/guide/[slug]. It cannot stick past the
                          bottom of this div, so it stops following scroll the
                          instant Feature groups ends — see the file-header
                          note for why that's the whole fix. */}
                      <aside className="hidden lg:block">
                        <div className="sticky top-24">
                          <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-black mb-4">
                            Explore our solutions
                          </h2>
                          <ModuleSolutionsSidebar />
                        </div>
                      </aside>
                      <div className="min-w-0 flex flex-col gap-14 lg:gap-20">
                        {capabilitiesAndFeatures}
                      </div>
                    </div>
                  )
                })()}

                {/* Contact Us for a Walkthrough (optional) */}
                {config.showContactWalkthrough && <ContactWalkthroughSection />}

                {/* How it works (optional) */}
                {config.processSteps && config.processSteps.length > 0 && (
                  <div className="bg-[#eef3f9] rounded-[4px] p-6 sm:p-8 lg:p-10">
                    <Reveal>
                      <div className="mb-10">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-6 h-px bg-[#2b6cb0]" />
                          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#2b6cb0]">
                            {config.processKicker}
                          </span>
                        </div>
                        <h2
                          className="font-serif font-light leading-[1.15] tracking-tight text-[#114dac]"
                          style={{ fontSize: "clamp(1.5rem,3.5vw,2.4rem)" }}
                        >
                          {config.processHeading}
                        </h2>
                      </div>
                    </Reveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {config.processSteps.map((step, i) => (
                        <Reveal key={step.num} delay={i * 90}>
                          <div className="flex flex-col items-start text-left">
                            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5 bg-white border border-[#2b6cb0]/30">
                              <step.Icon size={20} style={{ color: "#2b6cb0" }} strokeWidth={1.5} />
                            </div>
                            <span className="text-[9px] font-bold tracking-widest mb-2 text-[#2b6cb0]/50">{step.num}</span>
                            <h4 className="text-[13.5px] font-semibold mb-2 text-[#114dac]">{step.title}</h4>
                            <p className="text-[12px] leading-[1.7] text-[#000000]/70">{step.desc}</p>
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                )}

                {/* Variants / models (optional) */}
                {config.variants && config.variants.length > 0 && (
                  <div>
                    <Reveal>
                      <div className="mb-10">
                        {config.variantsKicker && (
                          <div className="flex items-center gap-3 mb-5">
                            <div className="w-6 h-px bg-[#2b6cb0]" />
                            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#2b6cb0]">
                              {config.variantsKicker}
                            </span>
                          </div>
                        )}
                        <h2
                          className="font-serif font-light leading-[1.15] tracking-tight text-[#114dac]"
                          style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)" }}
                        >
                          {config.variantsHeading}
                        </h2>
                      </div>
                    </Reveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {config.variants.map((v, i) => (
                        <Reveal key={v.title} delay={i * 60}>
                          <div className="rounded-[4px] p-6 h-full bg-[#f7f7f7] border border-[#e2e8f0]">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border border-[rgba(43,108,176,0.25)] text-[#2b6cb0] bg-white">
                              <v.Icon size={18} strokeWidth={1.75} />
                            </div>
                            <h4 className="text-[13.5px] font-semibold text-[#114dac] mb-2">{v.title}</h4>
                            <p className="text-[12px] leading-[1.7] text-[#000000]">{v.desc}</p>
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                )}

                {/* Business impact (optional) — overflow-hidden here too
                    (see the Hero section's note above): this panel's own
                    Reveal direction="right"/"left" pair is the other user
                    of a horizontal slide-in on this page. */}
                {config.impactMetrics && config.impactMetrics.length > 0 && (
                  <div className="bg-[#f7f7f7] rounded-[4px] p-6 sm:p-8 lg:p-10 overflow-hidden">
                    <div className="grid grid-cols-1 gap-10">
                      <Reveal direction="right">
                        <ModuleKicker text={config.impactKicker ?? ""} />
                        <h2
                          className="font-serif font-light leading-[1.15] tracking-tight text-[#114dac] mb-8"
                          style={{ fontSize: "clamp(1.4rem,3vw,2.1rem)" }}
                        >
                          {config.impactHeading}
                        </h2>
                        <div className="space-y-8">
                          {config.impactMetrics.map((m) => (
                            <div key={m.label} className="flex gap-5 items-start">
                              <p
                                className="font-serif font-light leading-none flex-shrink-0 w-[100px] text-[#114dac]"
                                style={{ fontSize: "clamp(1.6rem,3vw,2.1rem)" }}
                              >
                                {m.value}
                              </p>
                              <div>
                                <p className="text-[13.5px] font-semibold text-[#114dac] mb-0.5">{m.label}</p>
                                <p className="text-[12px] text-[#000000]/60 leading-snug">{m.sub}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Reveal>

                      <Reveal direction="left" delay={100}>
                        <div className="rounded-[4px] p-8 bg-white border border-[#dbe5f0]">
                          <h3 className="font-serif font-light text-[1.35rem] text-[#114dac] mb-7 leading-snug">
                            {config.impactPanelHeading}
                          </h3>
                          <div className="space-y-4">
                            {(config.impactChecklist ?? []).map((b) => (
                              <div key={b} className="flex gap-3 items-start">
                                <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5 text-[#2b6cb0]" />
                                <p className="text-[12.5px] leading-[1.65] text-[#000000]">{b}</p>
                              </div>
                            ))}
                          </div>
                          <div className="mt-8">
                            <Link
                              href="/contact"
                              className="inline-flex items-center gap-2 text-[12.5px] font-semibold transition-all hover:gap-3.5 text-[#114dac]"
                            >
                              See it in action <ArrowRight size={14} />
                            </Link>
                          </div>
                        </div>
                      </Reveal>
                    </div>
                  </div>
                )}

                {/* Scenario walkthrough */}
                <div>
                  <Reveal>
                    <div className="mb-10 max-w-2xl">
                      <ModuleKicker text={config.scenarioKicker} />
                      <h2
                        className="font-serif font-light leading-[1.15] tracking-tight text-[#114dac] mb-4"
                        style={{ fontSize: "clamp(1.5rem,3.5vw,2.4rem)" }}
                      >
                        {config.scenarioHeading}
                      </h2>
                      <p className="text-[13.5px] font-light leading-[1.8] text-[#000000]">{config.scenarioIntro}</p>
                    </div>
                  </Reveal>

                  <div className="relative">
                    <div className="hidden sm:block absolute left-[15px] top-2 bottom-2 w-px bg-[#e2e8f0]" aria-hidden />
                    <div className="space-y-6">
                      {config.scenarioBeats.map((beat, i) => (
                        <Reveal key={beat.time} delay={i * 60}>
                          <div className="relative flex gap-5">
                            <span className="relative z-10 hidden sm:flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full border border-[#2b6cb0]/40 bg-white text-[11px] font-semibold text-[#2b6cb0]">
                              {i + 1}
                            </span>
                            <div>
                              <span className="mb-1 inline-block rounded-[4px] border border-[#2b6cb0]/25 px-2 py-[3px] text-[9px] font-medium uppercase tracking-[0.14em] text-[#2b6cb0]">
                                {beat.time}
                              </span>
                              <h4 className="font-serif text-[15px] font-normal leading-snug text-[#114dac] mb-1">{beat.title}</h4>
                              <p className="text-[12.5px] font-light leading-[1.7] text-[#000000]">{beat.desc}</p>
                            </div>
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Industries (optional) */}
                {config.industries && config.industries.length > 0 && (
                  <div className="bg-[#f7f7f7] rounded-[4px] p-6 sm:p-8 lg:p-10">
                    <Reveal>
                      <div className="mb-10">
                        <ModuleKicker text={config.industriesKicker ?? ""} />
                        <h2
                          className="font-serif font-light leading-[1.15] tracking-tight text-[#114dac]"
                          style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)" }}
                        >
                          {config.industriesHeading}
                        </h2>
                      </div>
                    </Reveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {config.industries.map((ind, i) => (
                        <Reveal key={ind.title} delay={i * 45}>
                          <div className="rounded-[4px] p-5 bg-white border border-[#e2e8f0]">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#2b6cb0]" />
                              <h4 className="text-[13px] font-semibold text-[#114dac]">{ind.title}</h4>
                            </div>
                            <p className="text-[12px] leading-[1.65] text-[#000000] pl-3.5">{ind.desc}</p>
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                )}

            </div>
          </div>
        </section>

        {/* ── Works well with — cross-links to related modules ─────────── */}
        {related.length > 0 && (
          <section className="bg-white py-14 lg:py-20">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
              <Reveal>
                <div className="mb-10">
                  <ModuleKicker text="One platform, one data layer" />
                  <h2
                    className="font-serif font-light leading-[1.15] tracking-tight text-[#114dac]"
                    style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)" }}
                  >
                    Works well with
                  </h2>
                </div>
              </Reveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {related.map((m, i) => (
                  <Reveal key={m.slug} delay={i * 50}>
                    <Link
                      href={MODULE_PAGES[m.slug] ?? `/features#${m.slug}`}
                      className="group h-full flex items-start justify-between gap-4 bg-[#f7f7f7] border border-[#e2e8f0] rounded-[4px] p-5 sm:p-6 hover:border-[#114dac]/40 hover:shadow-[0_10px_30px_rgba(17,77,172,0.08)] transition-all"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[14px] font-semibold text-[#114dac] mb-2 leading-snug">{m.title}</h3>
                        <p className="text-[12px] font-light text-[#000000] leading-relaxed mb-4">{m.desc}</p>
                        <span className="inline-flex items-center gap-1.5 text-[#114dac] text-[12px] font-semibold group-hover:gap-2.5 transition-all">
                          Learn more <ArrowRight size={12} />
                        </span>
                      </div>
                      <div className="flex-shrink-0 w-[56px] h-[56px] rounded-[4px] bg-[#114dac] flex items-center justify-center">
                        <m.Icon size={24} className="text-white" strokeWidth={1.5} />
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Keep in touch ─────────────────────────────────────────────── */}
        <KeepInTouchSection bannerImage={config.bannerImage} />

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section className="bg-white py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <Reveal>
              <h2
                className="font-serif font-light leading-[1.15] tracking-tight text-[#114dac] mb-2"
                style={{ fontSize: "clamp(1.6rem,4vw,2.6rem)" }}
              >
                {config.faqHeading}
              </h2>
              <p className="text-[13.5px] font-light leading-[1.8] text-[#000000] max-w-[460px] mb-8">
                {config.faqIntro}
              </p>
            </Reveal>
            <div>
              {config.faqs.map((item, i) => {
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
                        <p className="text-[13.5px] leading-[1.8] text-[#000000]">{item.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
              <div style={{ borderTop: "1px solid #e2e8f0" }} />
            </div>
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────────────────────── */}
        <section className="bg-[#114dac] py-16 lg:py-20 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)" }}
          />
          <div className="relative max-w-4xl mx-auto px-6 sm:px-10 text-center">
            <Reveal>
              <h2
                className="font-serif font-light leading-[1.15] tracking-tight mb-4 text-white"
                style={{ fontSize: "clamp(1.6rem,4vw,2.6rem)" }}
              >
                {config.ctaHeading}
              </h2>
              <p className="text-[14px] leading-[1.75] mb-8 max-w-xl mx-auto text-white/70">{config.ctaBody}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-[4px] px-7 py-3 text-[13px] font-semibold bg-white text-[#114dac] hover:bg-[#eef3f9] transition-colors"
                >
                  Book a Demo <ArrowRight size={14} />
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center justify-center gap-2 rounded-[4px] px-7 py-3 text-[13px] font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors"
                >
                  Explore All Modules
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
