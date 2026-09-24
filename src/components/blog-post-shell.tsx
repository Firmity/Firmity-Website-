"use client"

import { type ReactNode, useEffect, useRef, useState } from "react"
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
// "On this page" table of contents — `toc` is extracted server-side from
// the post's own <h2>/<h3> tags (blog.ts::extractToc, called from
// blog/[slug]/page.tsx, which also injects the matching `id`s into the
// rendered content) and handed in as plain data — this component still
// does no fetching. Clicking a row scrolls to that section via
// scrollToHash (the same smooth-scroll-with-sticky-header-awareness helper
// "Our Solutions" already uses, src/hooks/use-hash-scroll.ts).
//
// RESTYLE (2026-09-24, per request: style this exactly like the "Explore
// our solutions" sidebar — see module-solutions-sidebar.tsx): dropped the
// old per-item border-t/border-b rows + ChevronRight icon in favor of that
// component's look — a single continuous thin guide line down the list
// with a solid black 2px bar + bold black text on the active row. That
// component picks "active" via the current route; a same-page TOC has no
// route per section, so "active" here is the heading nearest the top of
// the viewport, tracked with a scroll listener below.
//
// AUTOSCROLL, NOT A SCROLLBAR (2026-09-24 follow-up — two earlier attempts
// both missed this): the request isn't "make every item reachable" (that
// was solved once already), it's "as I scroll the article, keep the
// currently-active item visible in the sidebar without me having to scroll
// or zoom the page myself to find it." A tall TOC (e.g. the 45-acronym
// guide) has far more rows than fit in the viewport, so whatever row is
// bold/active can end up scrolled out of view entirely. Fixing this needs
// an actual scrollable container (`scrollTracker`, overflow-y-auto below)
// that JS can drive — pure `position: sticky` (even the earlier top+bottom
// variant) has no scroll position a script can read or set, so it can't
// "follow" anything. The container's native scrollbar is hidden via the
// `[&::-webkit-scrollbar]:hidden` / `scrollbar-width:none` utilities below
// so nothing about this reads as a manual scrollbar to the user — the
// effect after the scroll listener calls `scrollIntoView({block:"nearest"})`
// on the active row every time `activeId` changes, which only moves this
// container's own scroll position (not the page's), so it doesn't fight
// the scroll that triggered it.
//
// CTA RAIL REMOVED (2026-09-24, per request: "the blog itself won't get
// squished between the sidebar and the contact" — move the lead-gen form
// to the bottom of the post instead).
//
// AFTER-CONTENT SLOT (2026-09-24 follow-up, per request: "the sidebar will
// scroll up when the blog ends at author and will not continue to the
// Talk to our team contact... Talk to our team will be after faqs and
// author and will be full width"): `children` (article header, content,
// FAQ, author bio) stays inside the TOC grid, so the sticky sidebar's
// height — and therefore how long it stays pinned — is bounded by that
// content only. `afterContent` (the CTA form + related posts) renders in
// its own full-width block below the grid entirely, outside the TOC
// column's influence, so it's never squeezed to the narrow article width.
export function BlogPostShell({
  children,
  afterContent,
  toc,
  breadcrumbOverride,
}: {
  children: ReactNode
  /** Rendered full-width, below the TOC+article grid — not sidebar-tracked. */
  afterContent?: ReactNode
  toc?: BlogTocItem[]
  /** Full breadcrumb trail override — a post's category can't be read off
   * its URL (post URLs stay flat at /blog/[slug]), so blog/[slug]/page.tsx
   * builds "Home > Blog > <Category> > <Post>" itself and hands it down
   * here. See breadcrumbs.tsx's `override` prop. */
  breadcrumbOverride?: BreadcrumbCrumb[]
}) {
  const hasToc = !!toc && toc.length > 0
  const [activeId, setActiveId] = useState<string>("")
  const scrollTrackerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasToc) return
    const ids = toc!.map((t) => t.id)

    const onScroll = () => {
      const offset = 120 // px from viewport top counted as "reached"
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) current = id
      }
      setActiveId(current)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasToc])

  // Auto-scrolls the TOC's own internal scroll position (not the page's) so
  // the active row is always visible — see the file-header comment above
  // for why this exists. `block: "nearest"` means it does nothing if the
  // row is already in view, so this doesn't fight a reader who's manually
  // scrolled the TOC to look ahead.
  useEffect(() => {
    if (!activeId || !scrollTrackerRef.current) return
    const activeEl = scrollTrackerRef.current.querySelector<HTMLElement>(`[data-toc-id="${activeId}"]`)
    activeEl?.scrollIntoView({ block: "nearest", behavior: "smooth" })
  }, [activeId])

  return (
    <>
      <Navigation breadcrumbOverride={breadcrumbOverride} />
      <main className="bg-white">
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-20">
          <div
            className={`grid grid-cols-1 gap-10 lg:gap-12 ${hasToc ? "lg:grid-cols-[220px_1fr]" : ""}`}
          >
            {hasToc && (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-black mb-4">
                    On this page
                  </h2>
                  {/* max-h + overflow-y-auto so this can actually be
                      scrolled by JS (see the auto-scroll effect above) —
                      the native scrollbar itself is hidden (next three
                      utilities) so nothing here reads as a manual
                      scrollbar; the container still scrolls, just never by
                      the reader's own hand. */}
                  <nav
                    ref={scrollTrackerRef}
                    className="relative max-h-[calc(100vh-9rem)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-[#e2e8f0]" aria-hidden="true" />
                    <ul className="flex flex-col">
                      {toc!.map(({ id, text, level }) => {
                        const isActive = activeId === id
                        return (
                          <li key={id} className="relative">
                            {isActive && (
                              <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-black" aria-hidden="true" />
                            )}
                            <a
                              href={`#${id}`}
                              data-toc-id={id}
                              onClick={(e) => {
                                e.preventDefault()
                                scrollToHash(id)
                              }}
                              className={`block py-3 text-[12.5px] leading-snug transition-colors ${
                                level === 3 ? "pl-8" : "pl-5"
                              } ${isActive ? "text-black font-semibold" : "text-[#718096] hover:text-black"}`}
                            >
                              {text}
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                  </nav>
                </div>
              </aside>
            )}

            <div className="min-w-0">
              <div className="max-w-3xl mx-auto">{children}</div>
            </div>
          </div>

          {afterContent && <div className="mt-12 lg:mt-16">{afterContent}</div>}
        </section>
      </main>
      <Footer />
    </>
  )
}
