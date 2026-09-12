"use client"

import { useEffect, useRef, useState } from "react"

import { isAutoScrolling } from "@/src/hooks/use-hash-scroll"

// ─── Auto-hide-on-scroll — added 2026-09-05 ────────────────────────────────
// Replicates Planon's own header behavior (planonsoftware.com: measured via
// getComputedStyle — a 60px `<header>` and a 35px `.breadcrumbs` bar, both
// `position: sticky`, both toggle between `top: 0` and `top: -<own height>px`
// via a scroll-direction class, with `transition: top 0.2s ease-in-out` for
// the slide) instead of a permanently-visible sticky bar, per request:
// "the planon bar disappears when we scroll down and when we scroll a bit
// up, it reappears, this is the behavior we also want and not a continuous
// sticky navbar."
//
// Returns `true` once the user has scrolled DOWN past `revealHeight` (kept
// equal to the navbar's own height so both bars stay pinned visible near the
// very top of the page, matching Planon), and flips back to `false` the
// instant they scroll up even one pixel. Navigation and Breadcrumbs each
// call this independently with the SAME `revealHeight` (the navbar height) —
// since both read the same `window.scrollY` against the same threshold,
// their hidden state is always identical with no prop-drilling or shared
// context required.
//
// `pause` (e.g. the mobile menu being open) forces the bar to stay visible
// regardless of scroll position — sliding the header away while its own
// mobile menu is open would leave the menu overlay orphaned below a gap.
export function useHideOnScroll(revealHeight: number, pause = false): boolean {
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY
  }, [])

  useEffect(() => {
    if (pause) {
      setHidden(false)
      return
    }
    function onScroll() {
      const y = window.scrollY
      // Ignore scroll events caused by the "Our Solutions" hash jump
      // (use-hash-scroll.ts) so this bar doesn't hide itself mid-jump and
      // uncover the section above the target — still track `y` so the next
      // real user scroll compares against where the jump actually landed,
      // not wherever the page was before it.
      if (isAutoScrolling) {
        lastY.current = y
        return
      }
      if (y <= revealHeight) {
        setHidden(false)
      } else if (y > lastY.current) {
        setHidden(true) // scrolling down
      } else {
        setHidden(false) // scrolling up
      }
      lastY.current = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [revealHeight, pause])

  return hidden
}
