"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

// ─── Hash-anchor scrolling ──────────────────────────────────────────────────
// Scrolls to a "/#id" target (currently just "Our Solutions" ->
// #explore-solutions, src/components/home-sections.tsx) using a plain native
// smooth scroll. `isAutoScrolling` is exported so use-hide-on-scroll.ts can
// ignore the scroll events this causes — without it, the auto-hiding navbar
// (see that file) treated this jump as a normal scroll-down and hid itself
// mid-jump, uncovering a sliver of the section above the target.
export let isAutoScrolling = false

function endAutoScroll() {
  isAutoScrolling = false
}

export function scrollToHash(hash: string): void {
  const id = hash.replace(/^#/, "")
  if (!id) return

  const el = document.getElementById(id)
  if (!el) return

  isAutoScrolling = true
  el.scrollIntoView({ behavior: "smooth", block: "start" })

  // Reset once the smooth scroll actually settles; `scrollend` isn't
  // supported everywhere yet, so fall back to a timer.
  if ("onscrollend" in window) {
    window.addEventListener("scrollend", endAutoScroll, { once: true })
  } else {
    setTimeout(endAutoScroll, 1000)
  }
}

/**
 * Mounted once in <Navigation/> (rendered on every page) so a "/#id" link
 * scrolls to its target once that target exists — whether the hash arrived
 * via a fresh page load or a same-origin route change from another page.
 */
export function useHashScroll(): void {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === "undefined" || !window.location.hash) return
    const id = window.location.hash.slice(1)
    if (!id) return

    if (document.getElementById(id)) {
      scrollToHash(window.location.hash)
      return
    }

    // Target not mounted yet (e.g. data still loading) — poll briefly.
    let cancelled = false
    const interval = setInterval(() => {
      if (cancelled || !document.getElementById(id)) return
      clearInterval(interval)
      scrollToHash(window.location.hash)
    }, 100)
    const timeout = setTimeout(() => clearInterval(interval), 2000)

    return () => {
      cancelled = true
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [pathname])
}
