"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, QrCode } from "lucide-react"

// Once-per-session "user closed it" state, same pattern as SurveyPopup's
// hasBeenClosed/SESSION_KEY_CLOSED (survey-popup.tsx) — this widget is
// mounted site-wide (marketing-widgets.tsx) so every page nav remounts it;
// without persisting this, closing it on one page would just have it pop
// back open on the next page, and the scroll-trigger below (which only
// knows how to open the widget, not respect a dismissal) would immediately
// undo the close on any page with a hero section. "1" = user has explicitly
// closed it at least once this session — the scroll-trigger effect checks
// this first and skips entirely when set, so a manual close always wins for
// the rest of the session.
const SESSION_KEY_CLOSED = "firmity-app-qr-widget-closed"

// id of the section this widget waits to scroll past before revealing
// itself (see HeroSection in home-sections.tsx, which owns this id).
const HERO_SECTION_ID = "hero-slideshow"

// Floating "Scan to get the app" QR widget (2026-09-18/19, per request —
// "add this scan to get the app qr... exactly like the card i had shown in
// the image [x.com's own widget]... same dimensions and colors and
// roundness"). Card styling below was copied from x.com's live "Scan to get
// the app" widget's actual computed CSS (inspected directly, not guessed):
// bg #fff, border 1px rgba(0,0,0,.15), border-radius ~22px, shadow
// 0 4px 20px rgba(0,0,0,.08), title text 13px/regular/rgba(0,0,0,.6)/centered.
// There is deliberately NO gap class between the title and the QR on the
// <Link> below (flex default is 0) — went gap-2 -> gap-1 -> gap-0.5 across
// three rounds of "reduce the gap" requests before landing on removing it
// outright (2026-09-18). Add e.g. gap-1 back if that ever reads as too
// tight. Space around
// the QR (and the title above it) is the `p-1.5` on the <Link> below (6px on
// every side — x.com's own widget uses 16px/p-4; tightened twice now for the
// same reason as the gap above) — change that one class to adjust it, e.g.
// p-1 for less, p-4 to go back to X's exact spacing, or an arbitrary
// p-[10px] for anything in between. Neither change touches the QR's own
// on-screen size (`h-28 w-28` below, unaffected by padding/gap) — per
// explicit request to shrink the card's whitespace without shrinking the
// code itself. The QR image itself is rounded on all four corners via
// `rounded-xl` on the <img> below (2026-09-18 per request "round all four
// corners as well") — bump to rounded-2xl for more, or drop the class
// entirely to go back to square corners; note the underlying PNG has its own
// small white quiet-zone margin baked in (see generate-app-qr.js's `margin`
// option), so rounding the <img> element crops into that margin rather than
// into the QR's actual scan data — safe at any reasonable radius. Change the
// QR's on-screen size by editing the `h-28 w-28` classes on the <img> below
// (28 = 112px, Tailwind's 4px scale — e.g. h-32 w-32 = 128px, or an
// arbitrary h-[140px] w-[140px]). The underlying PNG (public/images/app-qr-code.png)
// is generated at 336px (3x) so it stays crisp up to that display size
// without regenerating; past ~150-160px displayed, bump `width` in
// scripts/generate-app-qr.js and rerun `npm run generate:app-qr` too, or it
// starts to look soft. X's own widget is a plain <button> that does nothing
// on click; ours stays a <Link> since a clickable fallback for desktop
// users (no phone handy) is strictly more useful and nothing asked for it
// to be inert.
//
// The rest — rail wrapper, opacity-60-at-rest/opacity-100-on-hover-or-focus,
// hover-scale — is unchanged from the original pill-button version and
// matches WhatsAppButton (whatsapp-button.tsx), per the earlier explicit
// request that this widget behave "exactly like the existing ones".
//
// Stacking: WhatsApp sits at bottom-5 (20px, 48px tall → top edge ~68px).
// This card sits at bottom-20 (80px) — the same slot the "Free AI Survey"
// sticky thumbnail used to occupy before it was hidden (see the
// SHOW_STICKY_THUMBNAIL flag in survey-popup.tsx) — leaving the same ~12px
// gap above WhatsApp that was already tuned there: enough to read as two
// separate things, not so much it looks like dead space.
//
// Links to /get-app (src/app/get-app/route.ts), NOT straight to a store —
// that route reads the scanning device's User-Agent server-side and sends
// iPhone/iPad to NEXT_PUBLIC_APP_STORE_URL and Android to
// NEXT_PUBLIC_PLAY_STORE_URL (2026-09-19, per request: "send apple scanners
// to apple store and android scanners to playstore" — a single static QR
// can't branch by device on its own, so the branching happens server-side
// instead, one hop after the scan). See that route's file-header comment
// for the .env vars it reads and for the QR image encoding this same
// /get-app URL (scripts/generate-app-qr.js).
//
// Thumbnail -> scroll-triggered open (2026-09-18 per request: "when the
// homepage loads, it shows as thumbnail, when we scroll past the hero
// slideshow section, the qr opens up animatedly"). Both states are always
// mounted, absolutely stacked on top of each other in the same spot, and
// cross-fade + scale between each other (`origin-bottom-right`, so the card
// visually grows outward from where the thumbnail sits) — simpler and
// smoother than trying to animate box dimensions from a 48px circle to an
// auto-sized card, which CSS transitions can't do cleanly.
//
// State machine:
// - `expanded` starts false — thumbnail on first paint, every page, no
//   flash of the full card (SSR and the pre-effect client render agree).
// - On mount, an IntersectionObserver watches HERO_SECTION_ID. The instant
//   it's no longer intersecting (scrolled past, either direction), this
//   sets expanded=true once and disconnects — a one-shot reveal, not a
//   toggle that flips back closed if the user scrolls back up.
// - Pages with no element matching HERO_SECTION_ID (anything other than
//   the homepage) have nothing to scroll past, so the widget just expands
//   immediately on mount instead of staying stuck as a thumbnail forever.
// - The "x" on the full card (handleClose) always wins over the above: it
//   sets expanded=false AND writes SESSION_KEY_CLOSED, which the mount
//   effect checks FIRST — if set, the observer is never even attached, so
//   a manual close can't be undone by the next scroll past the hero on
//   this or any later page this session. Clicking the thumbnail after a
//   manual close re-expands it (setExpanded(true) directly) but does NOT
//   clear SESSION_KEY_CLOSED — that flag only ever means "don't
//   auto-open", not "never open again"; the user can still open it by hand
//   any time.
export function AppQrWidget() {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY_CLOSED)) return

    const hero = document.getElementById(HERO_SECTION_ID)
    if (!hero) {
      // No hero section on this page (not the homepage) — nothing to wait
      // to scroll past, so don't strand the widget as a thumbnail forever.
      setExpanded(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setExpanded(true)
          observer.disconnect()
        }
      },
      { threshold: 0 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  const handleClose = () => {
    setExpanded(false)
    sessionStorage.setItem(SESSION_KEY_CLOSED, "1")
  }

  return (
    <div className="fixed inset-x-0 bottom-20 z-40 pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex justify-end">
        <div className="relative">
          {/* Thumbnail — same 48px circle + opacity-60/hover-100 treatment
              as WhatsAppButton, so it reads as "one of the site's floating
              widgets" rather than a broken/leftover element. */}
          <button
            type="button"
            onClick={() => setExpanded(true)}
            aria-label="Show the app download QR code"
            aria-hidden={expanded}
            tabIndex={expanded ? -1 : 0}
            className={
              "cursor-pointer flex items-center justify-center w-12 h-12 bg-white border border-black/[0.15] rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out origin-bottom-right " +
              (expanded
                ? "opacity-0 scale-75 pointer-events-none"
                : "pointer-events-auto opacity-60 hover:opacity-100 focus-visible:opacity-100 hover:scale-[1.05] hover:shadow-[0_8px_28px_rgba(0,0,0,0.14)]")
            }
          >
            <QrCode size={20} className="text-[#114dac]" />
          </button>

          {/* Full card — absolutely positioned over the thumbnail's spot so
              the two can cross-fade in place instead of the layout jumping
              between a circle and a rectangle. `w-max` (2026-09-18, fixing a
              report of the card rendering "squished" — title text wrapping
              onto 3 separate lines) is load-bearing here: this div's only
              in-flow sibling is the 48px thumbnail button above, and without
              an explicit width, an absolutely-positioned flex column next to
              a much smaller flow sibling was shrinking to a near-content-free
              width instead of sizing to its own children (the QR image /
              title text) — `w-max` forces sizing off this element's own
              max-content width instead. */}
          <div
            aria-hidden={!expanded}
            className={
              "absolute bottom-0 right-0 w-max flex flex-col items-center bg-white border border-black/[0.15] rounded-[22px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-1.5 transition-all duration-500 ease-out origin-bottom-right " +
              (expanded
                ? "pointer-events-auto opacity-60 hover:opacity-100 focus-within:opacity-100 hover:scale-[1.05] hover:shadow-[0_8px_28px_rgba(0,0,0,0.14)]"
                : "opacity-0 scale-75 pointer-events-none")
            }
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              tabIndex={expanded ? 0 : -1}
              // Overlapping badge in the top-right corner, same idea as
              // SurveyPopup's close button but sized/colored for a small
              // white card instead of a dark header — a solid dark-header
              // close button here would look like an unrelated UI bug
              // floating over white.
              className="cursor-pointer absolute -top-2 -right-2 z-10 w-5 h-5 rounded-full bg-white border border-black/[0.15] shadow-[0_2px_6px_rgba(0,0,0,0.15)] flex items-center justify-center hover:bg-black/[0.04] transition-colors"
            >
              <X size={11} className="text-black/60" />
            </button>
            <Link
              href="/get-app"
              aria-label="Scan the QR code to get the Firmity app"
              tabIndex={expanded ? 0 : -1}
              // No opacity classes here — the wrapper above now owns the
              // opacity-60-at-rest/opacity-100-on-hover-or-focus treatment
              // (had to move up a level once the close button became a
              // sibling of the <Link> rather than living inside it).
              className="cursor-pointer flex flex-col items-center"
            >
              {/* Sized down twice now (13px -> 11px -> current, 2026-09-18
                  per "reduce the size of scan to get the app text") and
                  forced to one line — with `w-max` above now sizing this
                  card off its own content, `whitespace-nowrap` guarantees
                  the width that drives comes from the QR image (112px) or
                  this text laid out flat, never a mid-word wrap. */}
              <span className="text-[10px] font-normal text-black/60 text-center leading-[1.25] whitespace-nowrap">
                Scan to get the app
              </span>
              <img src="/images/app-qr-code.png" alt="" className="h-28 w-28 flex-shrink-0 rounded-xl" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
