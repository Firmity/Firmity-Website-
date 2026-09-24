"use client"

// ─── Module Solutions Sidebar (2026-09-12, restyled 2026-09-12) ───────────
// Small "use client" wrapper so a Server Component (currently only
// src/app/resources/guide/[slug]/page.tsx, an async Server Component) can
// render an "Explore our solutions" nav without importing MODULES_LIST/
// MODULE_PAGES directly. Those two live in home-sections.tsx, which is
// itself marked "use client" — Next's RSC bundler turns EVERY export of a
// "use client" module into an opaque client-reference when it's imported
// from server-compiled code, not just the component exports, so a Server
// Component destructuring MODULES_LIST directly would get a reference
// object instead of the real array (throws at render, e.g. "MODULES_LIST.map
// is not a function"). This component takes no props, does the data read on
// the client side, and hands back finished JSX — a Server Component can
// render it as a plain leaf with zero serialization concerns.
//
// Reused wherever a page wants the same "Explore our solutions" list
// (module pages via module-page-template.tsx, guide detail pages) — keep it
// in sync with MODULES_LIST/MODULE_PAGES automatically since it reads them
// directly, no separate list to maintain by hand.
//
// RESTYLE (2026-09-12, per request — reference: Planon's own glossary-page
// "Table of Contents" sidebar screenshot, matched exactly for color/borders/
// styling/bars/highlights): dropped the old per-item border-t/border-b rows
// + ChevronRight icon. Now a single continuous thin guide line (#e2e8f0)
// runs the full height of the list; the "active" item — the module whose
// page you're currently on, via usePathname, the closest equivalent here to
// Planon's "current heading" highlight since these links go to separate
// pages rather than same-page anchors — gets a solid black bar segment
// overlaid on the guide line plus bold black text, while inactive items sit
// in medium-gray text with no border of their own.

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MODULES_LIST, MODULE_PAGES } from "@/src/components/home-sections"

// AUTOSCROLL, NOT A SCROLLBAR (2026-09-24, per request: "this behaviour
// should be for all sidebars"). Bounded + scrollable so every item stays
// reachable no matter how long MODULES_LIST grows, with the native
// scrollbar hidden so nothing reads as manual.
//
// NO auto-scroll-into-view on the active item here (2026-09-24 follow-up
// fix — an earlier version of this component did call
// `scrollIntoView({block:"nearest"})` on the active link whenever
// `pathname` changed, same pattern as blog-post-shell.tsx's TOC). That was
// wrong for THIS sidebar: unlike the TOC (a scrollspy that tracks reading
// position on ONE page), this component's "active" item only changes via
// a full route navigation to a brand new page — and calling scrollIntoView
// right after that navigation was scrolling the whole newly-loaded PAGE
// down to the sidebar item's position, skipping straight past that page's
// own hero section instead of landing at the top like every other link on
// the site. A reader landing on a new page should always see it from the
// top; the bounded/scrollable container below is enough on its own to
// keep every item technically reachable (this list is short enough in
// practice that it never actually needs to).
export function ModuleSolutionsSidebar() {
  const pathname = usePathname()

  return (
    <nav className="relative max-h-[calc(100vh-9rem)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-[#e2e8f0]" aria-hidden="true" />
      <ul className="flex flex-col">
        {MODULES_LIST.map(({ slug, title }) => {
          const href = MODULE_PAGES[slug] ?? `/features#${slug}`
          const isActive = pathname === href
          return (
            <li key={slug} className="relative">
              {isActive && (
                <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-black" aria-hidden="true" />
              )}
              <Link
                href={href}
                className={`block pl-5 py-3 text-[12.5px] leading-snug transition-colors ${
                  isActive ? "text-black font-semibold" : "text-[#718096] hover:text-black"
                }`}
              >
                {title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
