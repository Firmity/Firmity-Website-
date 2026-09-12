"use client"

// ─── Glossary term — inline ERP/CMMS definitions ───────────────────────────
// Added 2026-09-08, per request: "wherever we mention CMMS or erp, it will
// be a blue link which when clicked will show a popup with a brief
// definition... a '?' next to it which when hovered will show the
// definition... and when the cmms or erp link is hovered as well, it will
// show the definition."
//
// One popover serves both behaviors instead of a separate hover-tooltip +
// click-modal (simpler, one less thing to keep in sync): hovering the term
// OR the "?" opens it; clicking either PINS it open (stays open after the
// mouse leaves — matters on touch devices, which have no hover at all) until
// an outside click, Escape, or another mouse-leave on an unpinned open.
//
// Usage: <GlossaryTerm term="ERP" /> or wrap custom text: <GlossaryTerm
// term="CMMS">CMMS-driven</GlossaryTerm>. linkifyGlossary(text) is the
// companion helper — call it on any PLAIN string (a title/description/
// paragraph) to auto-wrap every whole-word "ERP"/"CMMS" occurrence; do NOT
// call it on text that's already the child of an <a>/<Link> or a <button>
// (module sidebar links, mobile pill nav, guide-card titles, FAQ question
// buttons) — nesting an interactive element inside another one is invalid
// HTML and breaks click handling. Those call sites intentionally render the
// plain string instead.
//
// Portal fix (2026-09-08 follow-up — "cmms erp help boxes are going under
// cards"): the popover used to be positioned with plain CSS `absolute`
// inside the local DOM tree. Several ancestors on the features page (the
// <Reveal> wrapper, in particular) apply an inline `transform`, which per
// the CSS spec creates a NEW stacking context — that trapped the popover's
// z-index inside its own card, so later sibling cards (their own separate
// stacking contexts, painted after this one in DOM order) rendered on top
// of it regardless of z-50. Fix: render the popover through a React portal
// straight into document.body, positioned with `position: fixed` from the
// trigger's getBoundingClientRect() — that escapes every ancestor stacking
// context entirely, so it always paints above the page. Closes on scroll
// (rather than continuously repositioning during scroll) and on resize.

import Link from "next/link"
import { createPortal } from "react-dom"
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react"

interface GlossaryEntry {
  term: string
  full: string
  definition: string
  href: string
}

export const GLOSSARY: Record<"ERP" | "CMMS", GlossaryEntry> = {
  ERP: {
    term: "ERP",
    full: "Enterprise Resource Planning",
    definition:
      "Software that runs an organization's core operations — finance, procurement, inventory, HR — from one connected system instead of disconnected tools.",
    href: "/resources/guide/what-is-erp",
  },
  CMMS: {
    term: "CMMS",
    full: "Computerized Maintenance Management System",
    definition:
      "Software purpose-built to manage maintenance work — scheduling work orders, tracking asset history, and managing spare-parts inventory.",
    href: "/resources/guide/what-is-cmms",
  },
}

const HIDE_DELAY_MS = 200
const POPOVER_WIDTH = 260
const VIEWPORT_MARGIN = 10

export function GlossaryTerm({ term, children }: { term: "ERP" | "CMMS"; children?: ReactNode }) {
  const entry = GLOSSARY[term]
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null)
  const [mounted, setMounted] = useState(false)
  const pinned = useRef(false)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wrapperRef = useRef<HTMLSpanElement>(null)
  const popoverRef = useRef<HTMLSpanElement>(null)

  // Portals need document.body, which doesn't exist during SSR — flip this
  // on after mount so the very first client render still matches the server.
  useEffect(() => setMounted(true), [])

  const clearHideTimer = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current)
      hideTimer.current = null
    }
  }

  const show = () => {
    clearHideTimer()
    setOpen(true)
  }

  const scheduleHide = () => {
    if (pinned.current) return
    clearHideTimer()
    hideTimer.current = setTimeout(() => setOpen(false), HIDE_DELAY_MS)
  }

  const toggleClick = () => {
    if (open && pinned.current) {
      pinned.current = false
      setOpen(false)
      return
    }
    pinned.current = true
    show()
  }

  // Position the portal popover from the trigger's viewport rect every time
  // it opens — `position: fixed` coordinates are viewport-relative, same
  // basis as getBoundingClientRect(), so no scroll-offset math is needed.
  useLayoutEffect(() => {
    if (!open || !wrapperRef.current) return
    const rect = wrapperRef.current.getBoundingClientRect()
    let left = rect.left + rect.width / 2 - POPOVER_WIDTH / 2
    const maxLeft = window.innerWidth - POPOVER_WIDTH - VIEWPORT_MARGIN
    left = Math.min(Math.max(left, VIEWPORT_MARGIN), Math.max(maxLeft, VIEWPORT_MARGIN))
    const top = rect.bottom + 8
    setCoords({ top, left })
  }, [open])

  // Outside click + Escape close a pinned popover. The popover now lives in
  // a portal outside wrapperRef's DOM subtree, so it needs its own ref in
  // this check — otherwise every click inside it (e.g. on "Learn more")
  // would register as "outside" and close it before the navigation fires.
  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (wrapperRef.current?.contains(target)) return
      if (popoverRef.current?.contains(target)) return
      pinned.current = false
      setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        pinned.current = false
        setOpen(false)
      }
    }
    // Closing on scroll/resize is simpler and cheaper than re-tracking the
    // trigger's position on every scroll frame while a fixed-position
    // popover is open.
    const onScroll = () => {
      pinned.current = false
      setOpen(false)
    }
    document.addEventListener("mousedown", onDocClick)
    document.addEventListener("keydown", onKey)
    window.addEventListener("scroll", onScroll, true)
    window.addEventListener("resize", onScroll)
    return () => {
      document.removeEventListener("mousedown", onDocClick)
      document.removeEventListener("keydown", onKey)
      window.removeEventListener("scroll", onScroll, true)
      window.removeEventListener("resize", onScroll)
    }
  }, [open])

  useEffect(() => () => clearHideTimer(), [])

  const popover =
    open && coords ? (
      // Every element in here MUST be phrasing content (span, not div/p) —
      // GlossaryTerm can end up rendered inside a <p> (via linkifyGlossary
      // on a paragraph string), and a <div>/<p> nested inside a <p> is
      // invalid HTML: the browser silently closes the outer <p> early,
      // which both breaks layout and throws a hydration mismatch (caught
      // 2026-09-08 from the features-page console error — "<p> cannot
      // contain a nested <p>" / "...a nested <div>"). `block` forces each
      // span to lay out as its own line, same as a div would. This no
      // longer matters for where the portal itself lands (document.body,
      // not inside any <p>), but the popover's OWN markup still needs to be
      // safe wherever a future call site nests it.
      <span
        ref={popoverRef}
        onMouseEnter={clearHideTimer}
        onMouseLeave={scheduleHide}
        role="tooltip"
        style={{ position: "fixed", top: coords.top, left: coords.left, width: POPOVER_WIDTH, zIndex: 9999 }}
        className="bg-white rounded-xl border border-[#dbe5f0] shadow-[0_14px_36px_rgba(17,29,53,0.18)] p-4 text-left normal-case block"
      >
        <span className="text-[11px] font-semibold tracking-[0.06em] text-[#2b6cb0] uppercase mb-0.5 block">
          {entry.term}
        </span>
        <span className="text-[10.5px] font-medium text-[#a0aec0] mb-2 block">{entry.full}</span>
        <span className="text-[12px] font-light text-[#000000] leading-[1.6] mb-3 block">{entry.definition}</span>
        <Link
          href={entry.href}
          className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-[#2b6cb0] hover:gap-2.5 transition-all"
        >
          Learn more <span aria-hidden="true">&rarr;</span>
        </Link>
      </span>
    ) : null

  return (
    <span ref={wrapperRef} className="relative inline-flex items-baseline">
      <button
        type="button"
        onMouseEnter={show}
        onMouseLeave={scheduleHide}
        onClick={toggleClick}
        aria-expanded={open}
        className="cursor-pointer text-[#2b6cb0] font-medium underline decoration-[#2b6cb0]/40 underline-offset-2 hover:decoration-[#2b6cb0] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2b6cb0] rounded-sm"
      >
        {children ?? entry.term}
      </button>
      <button
        type="button"
        onMouseEnter={show}
        onMouseLeave={scheduleHide}
        onClick={toggleClick}
        aria-label={`What is ${entry.term}?`}
        aria-expanded={open}
        className="cursor-pointer ml-0.5 inline-flex items-center justify-center w-[13px] h-[13px] rounded-full border border-[#2b6cb0]/40 text-[#2b6cb0] text-[8.5px] font-semibold leading-none hover:border-[#2b6cb0] hover:bg-[#2b6cb0] hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2b6cb0] translate-y-[-3px]"
      >
        ?
      </button>

      {mounted && popover ? createPortal(popover, document.body) : null}
    </span>
  )
}

// Splits `text` on whole-word "ERP"/"CMMS" and wraps each match in a
// <GlossaryTerm>. Safe to call on any plain string that isn't itself already
// inside an <a>/<Link>/<button> — see the file-header note above.
const GLOSSARY_PATTERN = /\b(ERP|CMMS)\b/g

export function linkifyGlossary(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(GLOSSARY_PATTERN)
  return parts.map((part, i) => {
    if (part === "ERP" || part === "CMMS") {
      return <GlossaryTerm key={`${keyPrefix}-${i}`} term={part} />
    }
    return part ? <span key={`${keyPrefix}-${i}`}>{part}</span> : null
  })
}
