"use client";
// Client view for the /blog index. Receives published posts (SSR'd) as props from
// the server page, so cards are in the initial HTML (SEO) while the category
// filter stays interactive. Navigation/Footer live here (client boundary).

import { useMemo, useState } from "react";
import Link from "next/link";
import { Navigation } from "@/src/components/navigation";
import { Footer } from "@/src/components/footer";
import { Reveal } from "@/src/components/reveal";
import { ArrowRight, Clock, Mail } from "lucide-react";

export interface Card {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  cover?: string | null;
}

export function BlogIndex({ posts }: { posts: Card[] }) {
  const [category, setCategory] = useState<string>("All");
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))],
    [posts],
  );

  const visible = category === "All" ? posts : posts.filter((p) => p.category === category);
  const featured = visible[0];
  const rest = visible.slice(1);

  return (
    <>
      <Navigation />
      <main className="bg-white">
        {/* HERO */}
        <section className="bg-[#111d35] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 56px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 56px)" }}
            aria-hidden="true"
          />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-16">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-[#2b6cb0]" />
              <span className="text-[#63b3ed] text-[10px] font-semibold tracking-[0.2em] uppercase">Blog</span>
            </div>
            <h1 className="font-serif text-[clamp(1.8rem,4vw,2.6rem)] font-light text-[#f0f4f8] leading-tight tracking-tight max-w-3xl">
              Ideas for teams that <em className="not-italic text-[#63b3ed]">run buildings better.</em>
            </h1>
            <p className="text-[13.5px] font-light text-white/[0.45] leading-[1.85] max-w-2xl mt-3">
              Guides, case studies, and best practices on facility operations, maintenance, and the systems behind them.
            </p>
          </div>
        </section>

        {/* FILTER */}
        {categories.length > 1 && (
          <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => {
                const active = category === c;
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
                );
              })}
            </div>
          </section>
        )}

        {/* POSTS */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10 lg:py-12">
          {featured && (
            <Reveal>
              <Link href={`/blog/${featured.slug}`} className="block group mb-8">
                <article className="bg-[#1a2744] rounded-[20px] relative overflow-hidden p-8 sm:p-10 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(17,29,53,0.25)] transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#2b6cb0]" />
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[9px] font-semibold tracking-[0.16em] uppercase text-[#63b3ed] border border-[#63b3ed]/30 rounded-lg px-2.5 py-1">
                      Featured · {featured.category}
                    </span>
                    {featured.readTime && (
                      <span className="flex items-center gap-1.5 text-[10.5px] font-light text-white/[0.4]">
                        <Clock size={11} /> {featured.readTime}
                      </span>
                    )}
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

          <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 100} className="w-[82%] flex-shrink-0 snap-start sm:w-auto">
                <Link href={`/blog/${post.slug}`} className="group h-full block">
                  <article className="h-full bg-white rounded-[20px] border border-[#cbd5e0] shadow-[0_4px_20px_rgba(17,29,53,0.06)] hover:shadow-[0_14px_36px_rgba(17,29,53,0.13)] hover:-translate-y-1 hover:border-[#2b6cb0]/50 transition-all duration-300 p-6 flex flex-col overflow-hidden">
                    {/* Cover thumbnail: full-bleed, gradient veil, slow pan-in on hover */}
                    <div className="relative -mx-6 -mt-6 mb-4 h-44 overflow-hidden rounded-t-[20px]">
                      {post.cover && (
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-[900ms] ease-out group-hover:scale-110"
                          style={{ backgroundImage: `url(${post.cover})` }}
                        />
                      )}
                      {!post.cover && <div className="absolute inset-0 bg-gradient-to-br from-[#1a2744] to-[#2b6cb0]" />}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111d35]/55 via-[#111d35]/10 to-transparent" />
                    </div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="text-[9px] font-semibold tracking-[0.14em] uppercase text-[#2b6cb0] border border-[#2b6cb0]/25 rounded-lg px-2 py-[3px]">
                        {post.category}
                      </span>
                      {post.readTime && (
                        <span className="flex items-center gap-1 text-[10px] font-light text-[#a0aec0]">
                          <Clock size={10} /> {post.readTime}
                        </span>
                      )}
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
            <p className="text-center text-[13px] font-light text-[#718096] py-12">No posts published yet.</p>
          )}
        </section>

        {/* NEWSLETTER */}
        <section className="bg-[#111d35]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 text-center">
            <div className="flex items-center gap-3 mb-3 justify-center">
              <Mail size={15} className="text-[#63b3ed]" strokeWidth={1.5} />
              <span className="text-[#63b3ed] text-[10px] font-semibold tracking-[0.2em] uppercase">Stay in the loop</span>
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,2.8vw,1.9rem)] font-light text-[#f0f4f8] tracking-tight mb-2">
              New articles, <em className="not-italic text-[#63b3ed]">straight to your inbox</em>
            </h2>
            <p className="text-[13px] font-light text-white/[0.45] mb-6">Get notified when we publish new guides and case studies.</p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-[#2b6cb0] hover:bg-[#2563a8] text-white text-[12.5px] font-semibold px-7 py-3 rounded-xl transition-all hover:shadow-[0_8px_24px_rgba(43,108,176,0.4)]"
            >
              Subscribe via Contact
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
