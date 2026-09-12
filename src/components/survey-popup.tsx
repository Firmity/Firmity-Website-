"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, ArrowRight, ClipboardList, CheckCircle } from "lucide-react"

// Once-per-browser-session: without this, navigating to "/" from any other
// page remounts SurveyPopup and its 2.8s timer fires again, reopening the
// popup every single time (reported 2026-09-06 — clicking "Our Solutions"
// from another page always re-triggered it). Clicking around WITHIN the
// homepage doesn't remount it, which is why it only ever misbehaved on
// cross-page navigation.
const SESSION_KEY_SHOWN = "firmity-survey-popup-shown"
// Second key for the sticky "Free AI Survey" thumbnail (hasBeenClosed).
// SurveyPopup only lives on "/" (see marketing-widgets.tsx's comment), so
// every nav away and back fully unmounts/remounts it — hasBeenClosed is
// local useState and was resetting to false on every remount. That was
// invisible before the SESSION_KEY_SHOWN fix above (the popup reopened on
// every remount anyway, so closing it again kept re-setting hasBeenClosed
// to true) but became a regression once the popup was gated to once per
// session: after that first close, later remounts skip the popup entirely
// (correct) but also never re-set hasBeenClosed, so the thumbnail vanished
// for the rest of the session (reported 2026-09-06 — "why did the popup
// disappear... its thumbnail"). Persisting the closed flag the same way
// keeps the thumbnail sticky across navigation without reintroducing the
// repeat-popup bug.
const SESSION_KEY_CLOSED = "firmity-survey-popup-closed"

export function SurveyPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasBeenClosed, setHasBeenClosed] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY_CLOSED)) {
      setHasBeenClosed(true)
      return
    }
    if (sessionStorage.getItem(SESSION_KEY_SHOWN)) return
    const timer = setTimeout(() => {
      setIsOpen(true)
      sessionStorage.setItem(SESSION_KEY_SHOWN, "1")
    }, 2800)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    setHasBeenClosed(true)
    sessionStorage.setItem(SESSION_KEY_CLOSED, "1")
  }

  const benefits = [
    "Comprehensive AI-powered facility health report",
    "Expert recommendations per domain (security, fire, HVAC & more)",
    "Risk scoring for every area of your facility",
    "100% free — no commitment required",
  ]

  return (
    <>
      {/* ── Full popup ───────────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/50 backdrop-blur-[3px]"
          onClick={handleClose}
        >
          <div
            className="relative w-full sm:max-w-[380px] bg-white rounded-t-[24px] sm:rounded-[20px] overflow-hidden shadow-[0_32px_80px_rgba(17,29,53,0.28)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={handleClose}
              aria-label="Close"
              className="cursor-pointer absolute top-3.5 right-3.5 z-10 w-7 h-7 rounded-full bg-white/[0.12] hover:bg-white/[0.22] flex items-center justify-center transition-colors"
            >
              <X size={14} className="text-white" />
            </button>

            {/* Dark header — kicker/headline colors changed 2026-09-05 (were
                text-[#63b3ed] on this bg-[#114dac], a ~3.4:1 contrast ratio —
                fails WCAG AA's 4.5:1 minimum for text this small, which is
                exactly why it read as "not visible" per request. #dbeafe
                clears ~6.4:1 while keeping a faint blue tint instead of
                going flat white. */}
            <div className="bg-[#114dac] px-6 pt-6 pb-5 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#2b6cb0]/25 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-24 bg-[#63b3ed]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="relative">
                <span className="inline-block text-[10px] font-semibold text-[#dbeafe] tracking-[0.22em] uppercase mb-3">
                  Free · No Obligation
                </span>
                <h2 className="font-serif text-[1.3rem] font-light text-white leading-[1.2] mb-2.5">
                  Book a Free<br />
                  <span className="italic text-[#dbeafe]">AI Facility Health Survey</span>
                </h2>
                <p className="text-[12px] text-white/[0.58] font-light leading-relaxed">
                  Get a professional, AI-powered assessment of your entire facility — across security, fire safety, HVAC, horticulture, and more.
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <ul className="space-y-2 mb-5">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle size={13} className="text-[#2b6cb0] flex-shrink-0 mt-0.5" />
                    <span className="text-[12px] text-[#000000] font-normal leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/facility-survey"
                onClick={handleClose}
                className="flex items-center justify-center gap-2 w-full bg-[#114dac] hover:bg-[#0e3e8a] text-white py-3 rounded-[4px] font-medium text-[13px] transition-colors mb-2.5"
              >
                Book Your Free Survey <ArrowRight size={14} />
              </Link>
              <p className="text-center text-[10.5px] text-[#000000] font-medium">
                Our team will connect with you within 24 hours.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Sticky widget (appears after first close) ─────────────────────── */}
      {/* Rail wrapper — same pattern as WhatsAppButton (whatsapp-button.tsx):
          max-w-7xl + the navbar/footer padding scale, flex-justify-end, so the
          widget's right edge tracks the Book Demo button/footer edge at any
          viewport width instead of a raw `right-5`. bottom-24 (not bottom-5)
          still stacks it above the WhatsApp button. */}
      {hasBeenClosed && !isOpen && (
        // bottom-24 (96px) was tuned for the old, larger WhatsApp button (56px
        // @ bottom-5) — left a ~28px gap above it. WhatsApp is now 48px, so
        // bottom-20 (80px) closes that down to ~12px without the two touching.
        <div className="fixed inset-x-0 bottom-20 z-40 pointer-events-none">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex justify-end">
            <button
              onClick={() => setIsOpen(true)}
              // opacity-60 at rest, full opacity on hover/keyboard-focus —
              // same treatment as WhatsAppButton (2026-09-04, per request:
              // "make the free ai survey thumbnail... semi-transparent when
              // they are not in focus or hovered").
              className="cursor-pointer pointer-events-auto flex items-center gap-2.5 bg-[#114dac] hover:bg-[#0e3e8a] text-white pl-3 pr-3.5 py-2.5 rounded-[4px] shadow-[0_8px_32px_rgba(17,29,53,0.35)] opacity-60 hover:opacity-100 focus-visible:opacity-100 transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_12px_40px_rgba(17,29,53,0.4)]"
              aria-label="Book a free AI facility survey"
            >
              {/* Pulsing dot */}
              <div className="relative flex-shrink-0">
                <div className="w-6 h-6 rounded-lg bg-[#2b6cb0] flex items-center justify-center">
                  <ClipboardList size={11} className="text-white" />
                </div>
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border-2 border-[#114dac]">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                </span>
              </div>
              <div className="text-left">
                <p className="text-[11px] font-semibold leading-none mb-1">Free AI Survey</p>
                {/* Lightened from white/[0.55] — was reading too dim against the dark chip */}
                <p className="text-[9.5px] text-white/[0.78] font-light leading-none">Book now →</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
