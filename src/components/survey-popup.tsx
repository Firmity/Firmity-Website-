"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, ArrowRight, ClipboardList, CheckCircle } from "lucide-react"

export function SurveyPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasBeenClosed, setHasBeenClosed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 2800)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    setHasBeenClosed(true)
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
            className="relative w-full sm:max-w-[440px] bg-white rounded-t-[28px] sm:rounded-[24px] overflow-hidden shadow-[0_32px_80px_rgba(17,29,53,0.28)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/[0.12] hover:bg-white/[0.22] flex items-center justify-center transition-colors"
            >
              <X size={15} className="text-white" />
            </button>

            {/* Dark header */}
            <div className="bg-[#111d35] px-8 pt-8 pb-7 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#2b6cb0]/25 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-24 bg-[#63b3ed]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="relative">
                <span className="inline-block text-[10.5px] font-semibold text-[#63b3ed] tracking-[0.22em] uppercase mb-4">
                  Free · No Obligation
                </span>
                <h2 className="font-serif text-[1.55rem] font-light text-white leading-[1.2] mb-3">
                  Book a Free<br />
                  <span className="italic text-[#63b3ed]">AI Facility Health Survey</span>
                </h2>
                <p className="text-[13px] text-white/[0.58] font-light leading-relaxed">
                  Get a professional, AI-powered assessment of your entire facility — across security, fire safety, HVAC, horticulture, and more.
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="px-8 py-7">
              <ul className="space-y-2.5 mb-7">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle size={14} className="text-[#2b6cb0] flex-shrink-0 mt-0.5" />
                    <span className="text-[13px] text-[#1e2d42] font-normal leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/facility-survey"
                onClick={handleClose}
                className="flex items-center justify-center gap-2 w-full bg-[#111d35] hover:bg-[#1a2744] text-white py-3.5 rounded-xl font-medium text-[14px] transition-colors mb-3"
              >
                Book Your Free Survey <ArrowRight size={15} />
              </Link>
              <p className="text-center text-[11px] text-[#4a5568] font-medium">
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
              className="pointer-events-auto flex items-center gap-2.5 bg-[#111d35] hover:bg-[#1a2744] text-white pl-3 pr-3.5 py-2.5 rounded-xl shadow-[0_8px_32px_rgba(17,29,53,0.35)] transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_12px_40px_rgba(17,29,53,0.4)]"
              aria-label="Book a free AI facility survey"
            >
              {/* Pulsing dot */}
              <div className="relative flex-shrink-0">
                <div className="w-6 h-6 rounded-lg bg-[#2b6cb0] flex items-center justify-center">
                  <ClipboardList size={11} className="text-white" />
                </div>
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border-2 border-[#111d35]">
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
