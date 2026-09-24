"use client"

// ─── "Contact Us for a Walkthrough" section ────────────────────────────────
// Extracted from home-client.tsx (2026-09-24) so the exact same section
// (heading, grey OverviewContactForm card, inline video panel, trust chips,
// "Download Brochure" popup CTA) can be reused verbatim on the blog index
// page in place of the old "Stay in the loop" newsletter block, without
// duplicating ~100 lines of JSX/state. Self-contained: owns its own inline
// video + brochure-popup state, so any page can drop it in with zero props.
import { useState } from "react"
import { Lock, Zap, Download, X } from "lucide-react"
import { OverviewContactForm } from "@/src/components/overview-contact-form"
import { BrochureDownloadForm } from "@/src/components/brochure-download-form"
import { buildInlineVideoUrl } from "@/src/lib/video"

export function ContactWalkthroughSection() {
  const [inlineVideoPlaying, setInlineVideoPlaying] = useState<boolean>(false)
  const videoUrl = process.env.NEXT_PUBLIC_VIDEO_URL ?? ""
  const [brochurePopupOpen, setBrochurePopupOpen] = useState<boolean>(false)

  return (
    <>
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10 lg:py-14">
          <h3 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-[1.15] text-[#114dac] tracking-tight mb-2">
            Contact Us for a Walkthrough
          </h3>
          <p className="text-[13.5px] font-light leading-[1.8] text-[#000000] mb-6 max-w-[460px]">
            Tell us about your requirements and we will get back to you within 24hrs.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 lg:items-stretch">
            <div className="bg-[#f7f7f7] rounded-[4px] border border-[#dbe5f0] shadow-[0_8px_32px_rgba(17,29,53,0.09)] p-5 sm:p-6 max-w-[460px] w-full">
              <OverviewContactForm />
            </div>

            <div className="relative rounded-[4px] overflow-hidden bg-[#f7f7f7] border border-[#dbe5f0] min-h-[280px] lg:min-h-0 lg:h-full">
              {!inlineVideoPlaying && (
                <button
                  onClick={() => setInlineVideoPlaying(true)}
                  className="group absolute inset-0 w-full h-full cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b6cb0]"
                  aria-label="Play Firmity demo video inline"
                >
                  <div className="w-16 h-16 rounded-full bg-[#114dac] group-hover:bg-[#0e3e8a] flex items-center justify-center shadow-[0_8px_24px_rgba(17,77,172,0.28)] transition-all duration-300 group-hover:scale-110">
                    <div className="w-0 h-0 ml-1" style={{ borderTop: "9px solid transparent", borderBottom: "9px solid transparent", borderLeft: "15px solid #fff" }} />
                  </div>
                </button>
              )}

              {inlineVideoPlaying && videoUrl && (
                <iframe
                  src={buildInlineVideoUrl(videoUrl)}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Firmity CMMS Demo"
                />
              )}

              {inlineVideoPlaying && !videoUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#f7f7f7]">
                  <div className="text-center">
                    <p className="text-[#4a5568] text-sm mb-2">No video URL configured</p>
                    <p className="text-[#a0aec0] text-xs font-sans">Set NEXT_PUBLIC_VIDEO_URL</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-5 mt-4 flex-wrap max-w-[460px]">
            {[
              { Icon: Lock, label: "No spam" },
              { Icon: Zap, label: "24hr response" },
            ].map(function (chip) {
              const ChipIcon = chip.Icon
              return (
                <span key={chip.label} className="flex items-center gap-1.5 text-[10.5px] font-light text-[#000000]">
                  <ChipIcon size={12} strokeWidth={1.75} className="text-[#000000]" />
                  {chip.label}
                </span>
              )
            })}
          </div>

          <div className="mt-5 flex items-center gap-2 max-w-[460px]">
            <span className="text-[11px] text-[#000000] font-light">Prefer a quick read first?</span>
            <button
              type="button"
              onClick={() => setBrochurePopupOpen(true)}
              className="cursor-pointer inline-flex items-center gap-1.5 rounded-[4px] border border-[#2b6cb0]/30 px-3 py-1 text-[11px] text-[#2b6cb0] font-semibold hover:border-[#2b6cb0] hover:bg-[#2b6cb0]/[0.06] transition-colors"
            >
              <Download size={11} strokeWidth={2} />
              Download Brochure
            </button>
          </div>
        </div>
      </section>

      {brochurePopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-[3px]"
          onClick={() => setBrochurePopupOpen(false)}
        >
          <div
            className="relative w-full max-w-[440px] bg-white rounded-[4px] p-6 sm:p-7 shadow-[0_32px_80px_rgba(17,29,53,0.28)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setBrochurePopupOpen(false)}
              aria-label="Close"
              className="cursor-pointer absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f7f7f7] hover:bg-[#e8f0fb] flex items-center justify-center transition-colors"
            >
              <X size={15} className="text-[#114dac]" />
            </button>
            <h3 className="font-serif text-[19px] font-light text-[#114dac] mb-1 pr-8">
              Download the Firmity brochure
            </h3>
            <p className="text-[12.5px] text-[#000000] font-light leading-relaxed mb-5">
              Modules, pricing, integrations, and deployment guide — all in one PDF.
            </p>
            <BrochureDownloadForm />
          </div>
        </div>
      )}
    </>
  )
}
