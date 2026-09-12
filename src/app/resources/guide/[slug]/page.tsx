// ─── ERP / CMMS Guide Detail Page ──────────────────────────────────────────
// Added 2026-09-08. Static-content sibling of /blog/[slug] (that one is
// DB-driven via src/lib/blog.ts; this one reads from the hand-authored
// src/lib/erp-guides.ts — no CMS/DB needed for a fixed set of 8 evergreen
// guides). Reached from the resource cards on /features (see
// src/app/features/page.tsx's "ERP & CMMS, explained" section).
//
// Styling deliberately mirrors blog/[slug]/page.tsx: same BLOG_PROSE class
// for the article body, same serif h1 treatment, same Navigation/Footer
// shell — so a guide reads as part of the same content system as the blog,
// not a bolted-on page type.

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Reveal } from "@/src/components/reveal"
import { JsonLd } from "@/src/components/json-ld"
import { ERP_GUIDES, getGuideBySlug } from "@/src/lib/erp-guides"
import { BLOG_PROSE } from "@/src/lib/blog-prose"
import { canonical, SITE } from "@/src/lib/seo"

export const revalidate = 3600

export function generateStaticParams() {
  return ERP_GUIDES.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) return { title: "Guide", robots: { index: false, follow: true } }
  const url = canonical(`/resources/guide/${slug}`)
  return {
    title: `${guide.title} | Firmity`,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url,
      type: "article",
    },
  }
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) notFound()

  // "More guides" rail — every other guide, so each page cross-links the rest
  // of the set instead of dead-ending back at /features.
  const others = ERP_GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3)

  return (
    <>
      <Navigation />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.description,
          publisher: {
            "@type": "Organization",
            name: "Firmity",
            logo: { "@type": "ImageObject", url: `${SITE.url}/firmity.png` },
          },
          mainEntityOfPage: canonical(`/resources/guide/${slug}`),
        }}
      />
      <main className="bg-white">
        {/* ── HERO ── */}
        <section className="bg-[#114dac] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 56px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 56px)" }}
            aria-hidden="true"
          />
          <div className="relative max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-16">
            <Reveal>
              <Link
                href="/features#erp-guides"
                className="inline-flex items-center gap-1.5 text-[#63b3ed] text-[11px] font-semibold tracking-wide mb-5 hover:gap-2.5 transition-all"
              >
                <ArrowLeft size={12} /> Back to guides
              </Link>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-px bg-[#2b6cb0]" />
                <span className="text-[#63b3ed] text-[10px] font-semibold tracking-[0.2em] uppercase">ERP &amp; CMMS Guide</span>
              </div>
              <h1 className="font-serif text-[clamp(1.7rem,3.8vw,2.4rem)] font-light text-[#f0f4f8] leading-tight tracking-tight">
                {guide.title}
              </h1>
              <p className="text-[13.5px] font-light text-white/[0.55] leading-[1.85] mt-3">
                {guide.description}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── ARTICLE BODY ── */}
        <section className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-12 lg:py-16">
          <Reveal>
            <div className={BLOG_PROSE} dangerouslySetInnerHTML={{ __html: guide.bodyHtml }} />
          </Reveal>

          <div className="mt-10 pt-8 border-t border-[#e2e8f0]">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 bg-[#2b6cb0] hover:bg-[#2563a8] text-white text-[13px] font-semibold px-6 py-3.5 rounded-xl transition-all hover:shadow-[0_8px_24px_rgba(43,108,176,0.35)]"
            >
              See how Firmity applies this
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </section>

        {/* ── MORE GUIDES ── */}
        {others.length > 0 && (
          <section className="bg-[#eef3f9] border-t border-[#dbe5f0] py-12 lg:py-16">
            <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16">
              <h2 className="font-serif text-[clamp(1.2rem,2.2vw,1.5rem)] font-light text-[#1a202c] tracking-tight mb-6">
                More guides
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {others.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/resources/guide/${g.slug}`}
                    className="group block bg-white rounded-xl border border-[#dbe5f0] p-5 hover:border-[#2b6cb0]/50 hover:shadow-[0_10px_28px_rgba(17,29,53,0.08)] transition-all"
                  >
                    <div className="text-[12.5px] font-semibold text-[#1a202c] mb-1.5 group-hover:text-[#2b6cb0] transition-colors">
                      {g.title}
                    </div>
                    <p className="text-[11.5px] font-light text-[#718096] leading-[1.6] line-clamp-3">{g.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
