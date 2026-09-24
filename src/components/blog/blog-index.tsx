"use client";
// Client view for the /blog index. Receives published posts (SSR'd) as props from
// the server page, so cards are in the initial HTML (SEO) while search/filtering
// stays interactive. Navigation/Footer live here (client boundary).
//
// REDESIGN (2026-09-24, per request: "make the blog page look exactly like
// [Planon's resources page]"): the old marketing-headline hero + category-pill
// row + "Browse by product" tiles + "Stay in the loop" newsletter block are
// gone. Replaced with: a hero card for the single latest published post (sort
// order is already `published_at DESC` from listPublished(), so `posts[0]` is
// always the latest — see src/lib/blog.ts), a left sidebar with a live search
// box and a "Topics" checkbox filter (Planon's reference also has a "Content
// Types" filter group, but this schema only has one classification axis —
// `category` — so that second group isn't reproduced), and the homepage's
// "Contact Us for a Walkthrough" section reused verbatim in place of the old
// newsletter block. Nothing is segregated by default — every post shows,
// latest-first, until the reader searches or checks a topic.
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Navigation } from "@/src/components/navigation";
import { Footer } from "@/src/components/footer";
import { Reveal } from "@/src/components/reveal";
import { ContactWalkthroughSection } from "@/src/components/contact-walkthrough-section";
import type { BreadcrumbCrumb } from "@/src/components/breadcrumbs";
import { ArrowRight, Clock, Search, ChevronDown } from "lucide-react";

export interface Card {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  cover?: string | null;
}

// Topics beyond this count are collapsed behind a "Show more" toggle,
// matching the reference sidebar's own overflow pattern.
const TOPICS_SHOW_LIMIT = 6;

export function BlogIndex({
  posts,
  breadcrumbOverride,
  lockCategory,
}: {
  posts: Card[];
  /** Forwarded to Navigation/Breadcrumbs — see breadcrumbs.tsx's `override`
   * prop. Used by /blog/category/[slug]/page.tsx so that page reads "Home >
   * Blog > <Category>" instead of the generic auto "Home > Blog > Category > <slug>". */
  breadcrumbOverride?: BreadcrumbCrumb[];
  /** Set by /blog/category/[slug]/page.tsx: `posts` is already pre-filtered
   * to this one category server-side, so the Topics sidebar (redundant on a
   * page that IS one category) is suppressed. Omitted on the main /blog
   * index — zero behavior change there. */
  lockCategory?: string;
}) {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [showAllTopics, setShowAllTopics] = useState(false);

  const categories = useMemo(
    () => Array.from(new Set(posts.map((p) => p.category).filter(Boolean))),
    [posts],
  );
  const visibleTopics = showAllTopics ? categories : categories.slice(0, TOPICS_SHOW_LIMIT);

  // Deep-link support (2026-09-04) — the footer's "Case Studies" link
  // (src/components/footer.tsx) points at /blog?category=Case%20Study so it
  // lands pre-filtered. Read via window.location.search in an effect rather
  // than next/navigation's useSearchParams — that hook opts a Client
  // Component out of static rendering and requires a Suspense boundary
  // around it at build time, which this page doesn't have; this achieves
  // the same result with no such requirement.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("category");
    if (requested) setSelectedCategories(new Set([requested]));
  }, []);

  const heroPost = posts[0];
  const rest = posts.slice(1);
  const isFiltering = search.trim().length > 0 || selectedCategories.size > 0;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    // With no active filter, the grid excludes the hero post (it's already
    // shown above) so nothing repeats. But once a filter is active, the
    // pool switches to ALL posts — otherwise a topic/search that only
    // matches the hero post (the bug: checking "CAFM" showed "No posts
    // match your search" when the sole CAFM post was posts[0]) would come
    // up empty even though a real match exists.
    const pool = isFiltering ? posts : rest;
    return pool.filter((p) => {
      const matchesCategory = selectedCategories.size === 0 || selectedCategories.has(p.category);
      const matchesSearch =
        !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [posts, rest, isFiltering, search, selectedCategories]);

  const toggleCategory = (c: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };

  return (
    <>
      <Navigation breadcrumbOverride={breadcrumbOverride} />
      <main className="bg-white">
        {/* HERO — latest published post (posts[0]; already sorted published_at
            DESC by listPublished()/listPublishedByCategory()). */}
        {heroPost && (
          <Reveal>
            <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-10 pb-10 lg:pt-14 lg:pb-14">
              <Link href={`/blog/${heroPost.slug}`} className="group block">
                {/* rounded-[4px] (2026-09-24) — matches the grid cards'
                    corner radius below, was rounded-[20px]. Hover state
                    (2026-09-24, per request: "when i hover on the hero
                    blog, i want the background color of the card to be
                    planon blue... and all of the text color to be white")
                    turns the whole text panel Planon blue with every piece
                    of text/icon switching to white via group-hover. */}
                <article className="rounded-[4px] overflow-hidden border border-[#cbd5e0] hover:shadow-[0_18px_48px_rgba(17,29,53,0.15)] transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-64 lg:h-auto overflow-hidden">
                      {heroPost.cover ? (
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-[900ms] ease-out group-hover:scale-105"
                          style={{ backgroundImage: `url(${heroPost.cover})` }}
                        />
                      ) : (
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundColor: "#eaf2ff",
                            backgroundImage:
                              "radial-gradient(circle at 18% 22%, rgba(147,197,253,0.85) 0%, transparent 46%)," +
                              "radial-gradient(circle at 82% 14%, rgba(244,168,208,0.85) 0%, transparent 42%)," +
                              "radial-gradient(circle at 72% 82%, rgba(153,230,190,0.8) 0%, transparent 46%)," +
                              "radial-gradient(circle at 12% 88%, rgba(196,181,253,0.8) 0%, transparent 46%)," +
                              "conic-gradient(from 200deg at 55% 45%, #cfe8ff, #ffd9e8, #ffe6c7, #d5f5e3, #dcd6ff, #cfe8ff)",
                            backgroundBlendMode: "screen, screen, screen, screen, normal",
                          }}
                        />
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-[#114dac] text-white text-[10px] font-semibold tracking-[0.18em] uppercase px-5 py-2.5">
                        Recommended
                      </div>
                    </div>
                    <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12 transition-colors duration-300 group-hover:bg-[#114dac]">
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="text-[9px] font-semibold tracking-[0.16em] uppercase text-[#2b6cb0] border border-[#2b6cb0]/40 rounded-lg px-2.5 py-1 transition-colors group-hover:text-white group-hover:border-white/50">
                          {heroPost.category}
                        </span>
                        {heroPost.readTime && (
                          <span className="flex items-center gap-1.5 text-[10.5px] font-light text-[#1a2744]/70 transition-colors group-hover:text-white/85">
                            <Clock size={11} /> {heroPost.readTime}
                          </span>
                        )}
                        <span className="text-[10.5px] font-light text-[#1a2744]/70 transition-colors group-hover:text-white/85">{heroPost.date}</span>
                      </div>
                      <h2 className="font-serif text-[clamp(1.4rem,2.8vw,2.1rem)] font-light text-[#114dac] leading-snug tracking-tight mb-3 transition-colors group-hover:text-white">
                        {heroPost.title}
                      </h2>
                      <p className="text-[13.5px] font-light text-[#1a2744]/80 leading-[1.8] mb-5 transition-colors group-hover:text-white/90">
                        {heroPost.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-[#2b6cb0] text-[12.5px] font-semibold transition-all group-hover:gap-3 group-hover:text-white">
                        Read more <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </section>
          </Reveal>
        )}

        {/* SIDEBAR + GRID — bg-[#f7f7f7] matches the homepage's own gray
            sections (ExploreSection, HomeBlogSection in home-client.tsx use
            the same flat gray panel, not a separately invented tone). */}
        <section className="bg-[#f7f7f7] py-10 lg:py-14">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
              {!lockCategory && (
                <aside className="lg:w-[260px] flex-shrink-0">
                  {/* Autoscroll, not a scrollbar (2026-09-24, sitewide
                      pattern — see blog-post-shell.tsx's "On this page"
                      TOC for the full rationale): the search box stays
                      fixed/always visible; only the Topics list (the part
                      that can actually grow past the viewport) gets its
                      own bounded, scrollable region with its native
                      scrollbar hidden. There's no single "active" topic
                      here (it's a multi-select filter, not a scrollspy),
                      so unlike the TOC/ModuleSolutionsSidebar there's
                      nothing to auto-scroll to — this just guarantees every
                      topic is reachable without a visible scrollbar. */}
                  <div className="lg:sticky lg:top-24">
                    <div className="relative mb-7">
                      <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a0aec0] pointer-events-none" />
                      <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search"
                        aria-label="Search resources"
                        className="w-full pl-9 pr-3 py-2.5 rounded-[4px] border border-[#cbd5e0] bg-white text-[13px] text-[#1a202c] placeholder:text-[#a0aec0] focus:outline-none focus:border-[#2b6cb0] focus:ring-1 focus:ring-[#2b6cb0] transition-colors"
                      />
                    </div>

                    {categories.length > 0 && (
                      <div className="max-h-[calc(100vh-16rem)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        <h3 className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#1a2744] mb-3 pb-2.5 border-b border-[#e2e8f0]">
                          Topics
                        </h3>
                        <label className="flex items-center gap-2.5 py-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCategories.size === 0}
                            onChange={() => setSelectedCategories(new Set())}
                            className="w-3.5 h-3.5 rounded-[3px] border-[#cbd5e0] text-[#2b6cb0] focus:ring-[#2b6cb0] cursor-pointer"
                          />
                          <span className="text-[12.5px] text-[#1a202c] font-semibold">Select all</span>
                        </label>
                        {visibleTopics.map((c) => (
                          <label key={c} className="flex items-center gap-2.5 py-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedCategories.has(c)}
                              onChange={() => toggleCategory(c)}
                              className="w-3.5 h-3.5 rounded-[3px] border-[#cbd5e0] text-[#2b6cb0] focus:ring-[#2b6cb0] cursor-pointer"
                            />
                            <span className="text-[12.5px] text-[#4a5568]">{c}</span>
                          </label>
                        ))}
                        {categories.length > TOPICS_SHOW_LIMIT && (
                          <button
                            type="button"
                            onClick={() => setShowAllTopics((v) => !v)}
                            className="cursor-pointer flex items-center gap-1 text-[11.5px] font-semibold text-[#2b6cb0] mt-2"
                          >
                            {showAllTopics ? "Show less" : "Show more"}
                            <ChevronDown size={12} className={`transition-transform ${showAllTopics ? "rotate-180" : ""}`} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </aside>
              )}

              <div className="flex-1 min-w-0">
                {/* Card style (2026-09-24, per request: "the blogs in blog
                    section will look exactly like blogs on the homepage")
                    duplicates HomeBlogSection's card JSX/classes verbatim
                    (src/app/home-client.tsx) — same convention already used
                    by related-posts-section.tsx for the same reason. */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map((post, i) => (
                    <Reveal key={post.slug} delay={(i % 3) * 100}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group flex flex-col bg-white rounded-[4px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_30px_rgba(43,108,176,0.14)] transition-shadow overflow-hidden h-full"
                      >
                        <div className="bg-[#114dac] px-4 py-4 flex-shrink-0">
                          <span className="text-[12px] font-semibold text-white tracking-wide">
                            {post.category || "Guide"}
                          </span>
                        </div>

                        <div className="relative h-[230px] bg-[#eef3f9] overflow-hidden flex-shrink-0">
                          {post.cover ? (
                            <div
                              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.04]"
                              style={{ backgroundImage: `url(${post.cover})` }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="opacity-20">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#2b6cb0" strokeWidth="1.5" />
                                <polyline points="14 2 14 8 20 8" stroke="#2b6cb0" strokeWidth="1.5" />
                              </svg>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col flex-1 p-5">
                          <p className="font-serif text-[15px] font-normal text-[#2b6cb0] leading-snug mb-2 line-clamp-2 group-hover:text-[#0e3e8a] transition-colors">
                            {post.title}
                          </p>
                          {post.description && (
                            <p className="text-[12.5px] font-light text-[#000000] leading-relaxed mb-4 line-clamp-3">{post.description}</p>
                          )}
                          <div className="mt-auto flex items-end justify-between gap-2">
                            <span className="inline-flex items-center gap-1.5 text-[#2b6cb0] text-[12px] font-semibold group-hover:gap-2.5 transition-all flex-shrink-0">
                              Read more <ArrowRight size={12} />
                            </span>
                            {(post.date || post.readTime) && (
                              <span className="text-[10.5px] text-[#000000] font-light text-right">
                                {post.date}
                                {post.date && post.readTime ? " · " : ""}
                                {post.readTime}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>

                {filtered.length === 0 && (
                  <p className="text-center text-[13px] font-light text-[#718096] py-12">
                    {posts.length === 0 ? "No posts published yet." : "No posts match your search."}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT — replaces the old "Stay in the loop" newsletter block,
            reusing the homepage's "Contact Us for a Walkthrough" section
            verbatim (see contact-walkthrough-section.tsx). */}
        <ContactWalkthroughSection />
      </main>
      <Footer />
    </>
  );
}
