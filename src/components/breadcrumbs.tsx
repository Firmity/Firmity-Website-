"use client"

import Link from "next/link"
import { Fragment, useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { Home, ChevronRight } from "lucide-react"
import { JsonLd } from "@/src/components/json-ld"
import { breadcrumbJsonLd } from "@/src/lib/seo"
import { useHideOnScroll } from "@/src/hooks/use-hide-on-scroll"

// Keep in sync with navigation.tsx's NAV_HEIGHT (64) — this bar sticks
// directly below the navbar, so its resting `top` must equal that height,
// and both bars must share the same reveal threshold so they hide/show in
// lockstep on scroll (see use-hide-on-scroll.ts).
const NAV_HEIGHT = 64

// Auto-generated from the URL path (planonsoftware.com/.../glossary/cafm
// reference — "Home > Glossary > CAFM..."), so every current and future page
// gets a breadcrumb trail for free just by rendering <Navigation/>, no
// per-page wiring needed.
//
// Sticky (2026-09-04, was intentionally non-sticky before — reversed per
// request: "breadcrumbs bar should also be sticky like the navbar"). Sits
// in a separate `sticky` block directly below <Navigation/>'s sticky <nav>
// (not inside it), resting `top: NAV_HEIGHT`px to match that nav's row
// height exactly — if navigation.tsx's NAV_HEIGHT ever changes, this must
// change with it or the two bars will overlap/gap when stacked. z-30 (below
// both the navbar's own z-50 AND its Industries dropdown panel at z-40 —
// deliberately lower, not equal: this element comes later in the DOM than
// that dropdown, and equal z-index ties break in DOM order, which would
// otherwise paint this bar OVER an open dropdown) keeps stacking order
// correct. The border-b on the <nav> above already reads as the separator
// between the two bars once they're stacked (per request: "do add the
// border separator in between") — no extra border needed on this side.
// 2026-09-05: gained the same hide-on-scroll-down/show-on-scroll-up behavior
// as the navbar (`top` now toggles to `-ownHeight`, not a fixed Tailwind
// class) — per request: "the planon bar disappears when we scroll down...
// this is the behavior we also want and not a continuous sticky navbar."
function humanize(segment: string): string {
  try {
    segment = decodeURIComponent(segment)
  } catch {
    // malformed URI component — fall back to the raw segment rather than throwing
  }
  return segment.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

export function Breadcrumbs() {
  const pathname = usePathname()
  const barRef = useRef<HTMLDivElement>(null)
  const [ownHeight, setOwnHeight] = useState(0)
  // Same threshold as the navbar (NAV_HEIGHT) so the two bars hide/show
  // together in lockstep — see use-hide-on-scroll.ts's file comment.
  const hidden = useHideOnScroll(NAV_HEIGHT)

  useEffect(() => {
    if (barRef.current) setOwnHeight(barRef.current.getBoundingClientRect().height)
  }, [pathname])

  if (!pathname || pathname === "/") return null

  const segments = pathname.split("/").filter(Boolean)
  if (segments.length === 0) return null

  const crumbs = segments.map((seg, i) => ({
    key: seg + i,
    label: humanize(seg),
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }))

  // Matching BreadcrumbList structured data (2026-09-04) — `breadcrumbJsonLd`
  // already existed in src/lib/seo.ts but was never actually called anywhere
  // in the codebase; wiring it in here means every page with a visible
  // breadcrumb trail also gets the matching JSON-LD for free, in sync by
  // construction (same `crumbs` array feeds both).
  const jsonLdItems = [
    { name: "Home", path: "/" },
    ...crumbs.map((c) => ({ name: c.label, path: c.href })),
  ]

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(jsonLdItems)} />
      {/* sticky, resting top = NAV_HEIGHT (64px) z-30 — see file header
          comment for the offset/z-index rationale. py-4 → py-3, text-[13.5px]
          → text-[12.5px], icon sizes back a notch (14→13 / 13→12) — REVERTED
          2026-09-05 (was bumped up 2026-09-04 to match the navbar's h-24;
          now that navbar is back to h-16, see navigation.tsx, this reverts
          in lockstep). `top` (not `top-24`/`top-16` Tailwind class) is now an
          inline style so it can also slide to `-ownHeight` on scroll-down —
          same hide/show technique as navigation.tsx, see use-hide-on-scroll.ts. */}
      <div
        ref={barRef}
        className="sticky z-30 bg-[#f8fafc] border-b border-[#e8edf4] transition-[top] duration-200 ease-in-out"
        style={{ top: hidden ? `-${ownHeight || 40}px` : `${NAV_HEIGHT}px` }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-3">
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-[12.5px]">
            <Link href="/" aria-label="Home" className="flex items-center text-[#718096] hover:text-[#2b6cb0] transition-colors">
              <Home size={13} />
            </Link>
            {crumbs.map((c) => (
              <Fragment key={c.key}>
                <ChevronRight size={12} className="text-[#c0ccd8] flex-shrink-0" />
                {c.isLast ? (
                  <span className="font-medium text-[#2d3748]">{c.label}</span>
                ) : (
                  <Link href={c.href} className="text-[#718096] hover:text-[#2b6cb0] transition-colors">
                    {c.label}
                  </Link>
                )}
              </Fragment>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
