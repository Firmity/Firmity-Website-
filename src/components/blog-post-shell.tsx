"use client"

import type { ReactNode } from "react"
import { ChevronRight } from "lucide-react"
import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import type { BreadcrumbCrumb } from "@/src/components/breadcrumbs"
import type { BlogTocItem } from "@/src/lib/blog"
import { scrollToHash } from "@/src/hooks/use-hash-scroll"

// Wraps blog post content with the site's Navigation/Footer.
// This file is the client boundary: Navigation/Footer apparently rely on
// client-only React features without declaring their own "use client",
// which previously worked only because blog/page.tsx declares it at the
// top of the whole file. Our MDX post pages must stay Server Components
// (they export `metadata`), so this wrapper isolates the client-only
// pieces instead. MDX content is passed in as children — Next.js supports
// passing Server Component output into a Client Component's children slot.
//
// "On this page" table of contents (2026-09-23) — was originally a "More
// from the blog" sidebar linking to OTHER posts (same look/placement as
// module-page-template.tsx's ModuleSolutionsSidebar); replaced per request:
// "instead of showing other blogs, we will show section titles from the
// opened blog itself and when any title is clicked... scroll to that
// section." `toc` is extracted server-side from the post's own <h2>/<h3>
// tags (blog.ts::extractToc, called from blog/[slug]/page.tsx, which also
// injects the matching `id`s into the rendered content) and handed in as
// plain data — this component still does no fetching. Column width, gap,
// sticky positioning and row styling (border-t on the first row, border-b
// on every row, ChevronRight that nudges right on hover) are all
// unchanged from the old sidebar — only the link target changed, from
// another post's URL to an in-page scroll via scrollToHash (the same
// smooth-scroll-with-sticky-header-awareness helper "Our Solutions"
// already uses, src/hooks/use-hash-scroll.ts). Falls back to the old
// single-column centered layout when the post has no h2/h3 headings at
// all (nothing to link to) instead of rendering an empty rail.
export function BlogPostShell({
  children,
  toc,
  breadcrumbOverride,
}: {
  children: ReactNode
  toc?: BlogTocItem[]
  /** Full breadcrumb trail override (2026-09-23) — a post's category can't
   * be read off its URL (post URLs stay flat at /blog/[slug]), so
   * blog/[slug]/page.tsx builds "Home > Blog > <Category> > <Post>" itself
   * and hands it down here. See breadcrumbs.tsx's `override` prop. */
  breadcrumbOverride?: BreadcrumbCrumb[]
}) {
  const hasToc = !!toc && toc.length > 0

  return (
    <>
      <Navigation breadcrumbOverride={breadcrumbOverride} />
      <main className="bg-white">
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-20">
          {hasToc ? (
            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16">
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-black mb-4">
                    On this page
                  </h2>
                  <nav className="flex flex-col">
                    {toc!.map(({ id, text, level }, i) => (
                      <a
                        key={id}
                        href={`#${id}`}
                        onClick={(e) => {
                          e.preventDefault()
                          scrollToHash(id)
                        }}
                        className={`group flex items-center justify-between gap-2 py-3 text-[12.5px] text-black hover:text-[#2b6cb0] transition-colors ${
                          i === 0 ? "border-t border-black" : ""
                        } border-b border-black ${level === 3 ? "pl-3" : ""}`}
                      >
                        <span className="leading-snug">{text}</span>
                        <ChevronRight
                          size={14}
                          className="flex-shrink-0 text-black group-hover:text-[#2b6cb0] group-hover:translate-x-0.5 transition-all"
                        />
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
              <div className="min-w-0">
                <div className="max-w-3xl">{children}</div>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">{children}</div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
