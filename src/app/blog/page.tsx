"use client"

// ─── Blog Page ────────────────────────────────────────────────────────────────
// Index of the live articles. Each POSTS entry links to app/blog/<slug>/page.mdx.
// To publish a post: create the .mdx folder, add its slug to sitemap.ts, and add
// one entry to POSTS below.
// Design language: dark navy hero, serif display, DM Sans, 12/20px radii.

import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Reveal } from "@/src/components/reveal"
import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Clock, Mail } from "lucide-react"

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Post {
  slug: string            // route under /blog/<slug> (must match the .mdx folder)
  title: string
  description: string
  category: string
  readTime: string
  date: string
  featured?: boolean
}

// The live articles. Each `slug` maps to app/blog/<slug>/page.mdx.
// Add a new post: create the .mdx folder + add one entry here.
const POSTS: Post[] = [
  { slug: "spreadsheets-to-cmms",           title: "Why Your Facility Team Is Still Running on Spreadsheets",   description: "What spreadsheet-based maintenance tracking is really costing facility teams — and how to move to a CMMS without a six-month project.", category: "Guide",          readTime: "6 min read", date: "Jul 2026", featured: true },
  { slug: "predictive-maintenance-ai",      title: "From Reactive to Predictive: AI-Driven Maintenance in Practice", description: "What predictive maintenance actually looks like day to day — where it earns its keep, and where a simple preventive schedule still wins.", category: "Best Practices", readTime: "7 min read", date: "Jul 2026" },
  { slug: "mobile-first-technician-adoption", title: "The CMMS Nobody Uses Is Just an Expensive Spreadsheet",    description: "Why mobile experience — not feature lists — determines whether a CMMS rollout actually succeeds with field technicians.",             category: "Case Study",     readTime: "5 min read", date: "Jun 2026" },
  { slug: "cloud-vs-onprem-multisite",      title: "Cloud vs. On-Premise CMMS for Multi-Site Portfolios",       description: "What actually matters when choosing between cloud and on-premise facility management software for a multi-site organization.",         category: "Guide",          readTime: "6 min read", date: "Jun 2026" },
]

const CATEGORIES = ["All", "Guide", "Best Practices", "Case Study"] as const

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [category, setCategory] = useState<string>("All")

  const visible = category === "All" ? POSTS : POSTS.filter((p) => p.category === category)
  const featured = visible.find((p) => p.featured)
  const rest = visible.filter((p) => p !== featured)

  return (
    <>
      <Navigation />
      <main className="bg-white">
        {/* ── HERO — dark navy ── */}
        <section className="bg-[#111d35] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 56px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 56px)" }}
            aria-hidden="true"
          />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-16">
            <Reveal>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-px bg-[#2b6cb0]" />
                <span className="text-[#63b3ed] text-[10px] font-semibold tracking-[0.2em] uppercase">Blog</span>
              </div>
              <h1 className="font-serif text-[clamp(1.8rem,4vw,2.6rem)] font-light text-[#f0f4f8] leading-tight tracking-tight max-w-3xl">
                Ideas for teams that{" "}
                <em className="not-italic text-[#63b3ed]">run buildings better.</em>
              </h1>
              <p className="text-[13.5px] font-light text-white/[0.45] leading-[1.85] max-w-2xl mt-3">
                Guides, case studies, and best practices on facility operations, maintenance,
                and the systems behind them.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── CATEGORY FILTER ── */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-8">
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => {
                const active = category === c
                return (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setCategory(c)}
                    className={`px-4 py-2 rounded-xl text-[11.5px] font-medium border transition-all duration-200 ${
                      active
                        ? "bg-[#2b6cb0] border-[#2b6cb0] text-white shadow-[0_4px_14px_rgba(43,108,176,0.3)]"
                        : "bg-white border-[#cbd5e0] text-[#4a5568] hover:border-[#2b6cb0] hover:text-[#2b6cb0]"
                    }`}
                  >
                    {c}
                  </button>
                )
              })}
            </div>
          </Reveal>
        </section>

        {/* ── POSTS ── */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10 lg:py-12">
          {/* Featured post */}
          {featured && (
            <Reveal>
              <Link href={`/blog/${featured.slug}`} className="block group mb-8">
              <article className="bg-[#1a2744] rounded-[20px] relative overflow-hidden p-8 sm:p-10 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(17,29,53,0.25)] transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#2b6cb0]" />
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[9px] font-semibold tracking-[0.16em] uppercase text-[#63b3ed] border border-[#63b3ed]/30 rounded-lg px-2.5 py-1">
                    Featured · {featured.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-[10.5px] font-light text-white/[0.4]">
                    <Clock size={11} /> {featured.readTime}
                  </span>
                  <span className="text-[10.5px] font-light text-white/[0.4]">{featured.date}</span>
                </div>
                <h2 className="font-serif text-[clamp(1.3rem,2.6vw,1.8rem)] font-light text-[#f0f4f8] leading-snug tracking-tight mb-3 max-w-2xl group-hover:text-[#90cdf4] transition-colors">
                  {featured.title}
                </h2>
                <p className="text-[13px] font-light text-white/[0.5] leading-[1.8] max-w-2xl">{featured.description}</p>
              </article>
              </Link>
            </Reveal>
          )}

          {/* Post grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post, i) => (
              <Reveal key={post.title} delay={(i % 3) * 100}>
                <Link href={`/blog/${post.slug}`} className="group h-full block">
                <article className="h-full bg-white rounded-[20px] border border-[#cbd5e0] shadow-[0_4px_20px_rgba(17,29,53,0.06)] hover:shadow-[0_14px_36px_rgba(17,29,53,0.13)] hover:-translate-y-1 hover:border-[#2b6cb0]/50 transition-all duration-300 p-6 flex flex-col">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-[9px] font-semibold tracking-[0.14em] uppercase text-[#2b6cb0] border border-[#2b6cb0]/25 rounded-lg px-2 py-[3px]">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-light text-[#a0aec0]">
                      <Clock size={10} /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-[14px] font-semibold text-[#1a202c] leading-snug mb-2 group-hover:text-[#2b6cb0] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[12.5px] font-light text-[#718096] leading-[1.7] flex-1">{post.description}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#eef3f9]">
                    <span className="text-[10.5px] font-light text-[#a0aec0]">{post.date}</span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#2b6cb0] opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      Read article <ArrowRight size={11} />
                    </span>
                  </div>
                </article>
                </Link>
              </Reveal>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="text-center text-[13px] font-light text-[#718096] py-12">No posts in this category yet.</p>
          )}
        </section>

        {/* ── NEWSLETTER / CTA ── */}
        <section className="bg-[#111d35]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 text-center">
            <Reveal>
              <div className="flex items-center gap-3 mb-3 justify-center">
                <Mail size={15} className="text-[#63b3ed]" strokeWidth={1.5} />
                <span className="text-[#63b3ed] text-[10px] font-semibold tracking-[0.2em] uppercase">Stay in the loop</span>
              </div>
              <h2 className="font-serif text-[clamp(1.4rem,2.8vw,1.9rem)] font-light text-[#f0f4f8] tracking-tight mb-2">
                New articles, <em className="not-italic text-[#63b3ed]">straight to your inbox</em>
              </h2>
              <p className="text-[13px] font-light text-white/[0.45] mb-6">
                Get notified when we publish new guides and case studies.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-[#2b6cb0] hover:bg-[#2563a8] text-white text-[12.5px] font-semibold px-7 py-3 rounded-xl transition-all hover:shadow-[0_8px_24px_rgba(43,108,176,0.4)]"
              >
                Subscribe via Contact
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
