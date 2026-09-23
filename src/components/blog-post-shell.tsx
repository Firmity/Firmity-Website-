"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import type { BreadcrumbCrumb } from "@/src/components/breadcrumbs"
import type { BlogSidebarPost } from "@/src/lib/blog"

// Wraps blog post content with the site's Navigation/Footer.
// This file is the client boundary: Navigation/Footer apparently rely on
// client-only React features without declaring their own "use client",
// which previously worked only because blog/page.tsx declares it at the
// top of the whole file. Our MDX post pages must stay Server Components
// (they export `metadata`), so this wrapper isolates the client-only
// pieces instead. MDX content is passed in as children — Next.js supports
// passing Server Component output into a Client Component's children slot.
//
// "More from the blog" sidebar (2026-09-23, per request: "the table of
// contents linking to other blogs... exact same look placement and
// behaviour as the Explore our solutions when we open a certain
// solution"). `sidebarPosts` is fetched server-side (blog.ts's
// listRecentForSidebar) and handed in as plain data — this component
// itself does no fetching. Deliberately copies module-page-template.tsx's
// sidebar treatment verbatim rather than sharing a component with it:
// same column width (220px), same gap, same `hidden lg:block` + `sticky
// top-24`, same row style as ModuleSolutionsSidebar (border-t on the
// first row, border-b on every row, ChevronRight that nudges right on
// hover) — just fed post links instead of module links. Falls back to the
// old single-column centered layout when there's nothing to show in the
// sidebar (e.g. this is the only published post) instead of rendering an
// empty rail.
export function BlogPostShell({
  children,
  sidebarPosts,
  breadcrumbOverride,
}: {
  children: ReactNode
  sidebarPosts?: BlogSidebarPost[]
  /** Full breadcrumb trail override (2026-09-23) — a post's category can't
   * be read off its URL (post URLs stay flat at /blog/[slug]), so
   * blog/[slug]/page.tsx builds "Home > Blog > <Category> > <Post>" itself
   * and hands it down here. See breadcrumbs.tsx's `override` prop. */
  breadcrumbOverride?: BreadcrumbCrumb[]
}) {
  const hasSidebar = !!sidebarPosts && sidebarPosts.length > 0

  return (
    <>
      <Navigation breadcrumbOverride={breadcrumbOverride} />
      <main className="bg-white">
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-20">
          {hasSidebar ? (
            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16">
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-black mb-4">
                    More from the blog
                  </h2>
                  <nav className="flex flex-col">
                    {sidebarPosts!.map(({ slug, title }, i) => (
                      <Link
                        key={slug}
                        href={`/blog/${slug}`}
                        className={`group flex items-center justify-between gap-2 py-3 text-[12.5px] text-black hover:text-[#2b6cb0] transition-colors ${
                          i === 0 ? "border-t border-black" : ""
                        } border-b border-black`}
                      >
                        <span className="leading-snug">{title}</span>
                        <ChevronRight
                          size={14}
                          className="flex-shrink-0 text-black group-hover:text-[#2b6cb0] group-hover:translate-x-0.5 transition-all"
                        />
                      </Link>
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
