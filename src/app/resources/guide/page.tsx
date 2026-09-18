// ─── ERP / CMMS Guide Index ─────────────────────────────────────────────────
// Added 2026-09-16, per request ("guide page does not exist. create it.") —
// /resources/guide/[slug] existed (the individual guide articles), but the
// bare /resources/guide path had no page.tsx at all, so it 404'd. This is
// that missing index: a listing of every guide in ERP_GUIDES.
//
// Card style is copied verbatim from the /features#erp-guides section
// (2026-09-16 restyle — see src/app/features/page.tsx): the homepage's
// "Browse our latest resources" card (bg-white rounded-[4px] shadow-only
// panel, solid bg-[#114dac] "Guide" header bar, serif blue title, excerpt,
// "Read guide" link), minus the cover image — each guide's own icon sits in
// the header bar instead, same as on /features. Kept in sync manually (GUIDE_
// ICONS is duplicated here rather than exported from features/page.tsx,
// which is a page module, not a shared lib) — update both if a guide's icon
// changes.
//
// Hero band matches guide/[slug]/page.tsx's own hero treatment (dark navy
// #114dac, same repeating-grid texture) so a visitor landing here from a
// guide's "Back to guides" link — or a search engine — sees a page that
// reads as part of the same content system, not a bolted-on stub.

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, type LucideProps } from "lucide-react"
import type { FC } from "react"
import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Reveal } from "@/src/components/reveal"
import { ERP_GUIDES } from "@/src/lib/erp-guides"
import { canonical } from "@/src/lib/seo"
import {
  BookOpen,
  Layers,
  Cloud,
  Workflow,
  BarChart3,
  RefreshCw,
  Search,
  Rocket,
  Wrench,
} from "lucide-react"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "ERP & CMMS Guides | Firmity",
  description:
    "Plain-English guides to ERP and CMMS — what the terms mean, how they differ, and how to evaluate, implement, or replace either one.",
  alternates: { canonical: canonical("/resources/guide") },
  openGraph: {
    title: "ERP & CMMS Guides",
    description:
      "Plain-English guides to ERP and CMMS — what the terms mean, how they differ, and how to evaluate, implement, or replace either one.",
    url: canonical("/resources/guide"),
    type: "website",
  },
}

// Icon shown on each guide card — cosmetic, keyed by erp-guides.ts slug.
// Duplicated from GUIDE_ICONS in src/app/features/page.tsx — keep both in
// sync if a guide's icon changes there.
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

export default function GuideIndexPage() {
  return (
    <>
      <Navigation />
      <main className="bg-white">
        {/* ── HERO — same dark-navy treatment as guide/[slug]/page.tsx ── */}
        <section className="bg-[#114dac] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 56px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 56px)" }}
            aria-hidden="true"
          />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-16">
            <Reveal>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-px bg-[#2b6cb0]" />
                <span className="text-[#63b3ed] text-[10px] font-semibold tracking-[0.2em] uppercase">ERP &amp; CMMS Guides</span>
              </div>
              <h1 className="font-serif text-[clamp(1.8rem,4vw,2.6rem)] font-light text-[#f0f4f8] leading-tight tracking-tight max-w-3xl">
                Guides for teams evaluating <em className="not-italic text-[#63b3ed]">ERP and CMMS.</em>
              </h1>
              <p className="text-[13.5px] font-light text-white/[0.55] leading-[1.85] max-w-2xl mt-3">
                Whether you call it ERP or CMMS — here's what the terms actually mean, and how to evaluate, implement, or replace either one.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── GUIDE GRID ── */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ERP_GUIDES.map((guide, i) => {
              const GuideIcon = GUIDE_ICONS[guide.slug] ?? BookOpen
              return (
                <Reveal key={guide.slug} delay={(i % 3) * 100}>
                  <Link
                    href={`/resources/guide/${guide.slug}`}
                    className="group flex flex-col h-full bg-white rounded-[4px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_30px_rgba(43,108,176,0.14)] transition-shadow overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b6cb0]"
                  >
                    <div className="bg-[#114dac] px-4 py-4 flex-shrink-0 flex items-center justify-between">
                      <span className="text-[12px] font-semibold text-white tracking-wide">Guide</span>
                      <GuideIcon size={18} strokeWidth={1.5} className="text-white/70" />
                    </div>
                    <div className="flex flex-col flex-1 p-5">
                      <p className="font-serif text-[15px] font-normal text-[#2b6cb0] leading-snug mb-2 line-clamp-2 group-hover:text-[#0e3e8a] transition-colors">
                        {guide.title}
                      </p>
                      <p className="text-[12.5px] font-light text-[#000000] leading-relaxed mb-4 line-clamp-3">
                        {guide.description}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1.5 text-[#2b6cb0] text-[12px] font-semibold group-hover:gap-2.5 transition-all flex-shrink-0">
                        Read guide <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              )
            })}

            {/* Getting Started Guide — same entry included on /features#erp-guides
                and /resources, reachable from here too for consistency. */}
            <Reveal delay={(ERP_GUIDES.length % 3) * 100}>
              <Link
                href="/contact"
                className="group flex flex-col h-full bg-white rounded-[4px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_30px_rgba(43,108,176,0.14)] transition-shadow overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b6cb0]"
              >
                <div className="bg-[#2b6cb0] px-4 py-4 flex-shrink-0 flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-white tracking-wide">Get Started</span>
                  <BookOpen size={18} strokeWidth={1.5} className="text-white/70" />
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <p className="font-serif text-[15px] font-normal text-[#2b6cb0] leading-snug mb-2 line-clamp-2 group-hover:text-[#0e3e8a] transition-colors">
                    Getting Started Guide
                  </p>
                  <p className="text-[12.5px] font-light text-[#000000] leading-relaxed mb-4">
                    Step-by-step industry guide for your organization.
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-[#2b6cb0] text-[12px] font-semibold group-hover:gap-2.5 transition-all flex-shrink-0">
                    Learn more <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
