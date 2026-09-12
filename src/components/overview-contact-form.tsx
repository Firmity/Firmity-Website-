"use client"

// ─── "Get the complete Firmity overview" contact form ─────────────────────────
// Added 2026-09-04 per request: "change the brochure form to contact form
// with contact fields Full Name*/Email*/Phone/Company Name*/Team Size*
// (1-10/11-50/51-100/100+ people)/Message". Replaces <BrochureDownloadForm />
// as the form embedded directly in that homepage section — the original
// brochure form (name/email/phone/city → PDF download) still exists
// unchanged in brochure-download-form.tsx and now lives behind the
// "Download Brochure" popup triggered from the same section (see page.tsx).
//
// BACKEND CONTRACT: posts to the SAME /api/contact route /contact's own form
// uses (src/app/api/contact/route.ts — only fullName/email/companyName are
// server-validated).
//
// "I want to" request-type selector added 2026-09-04, per request: "add
// ...these to the contact form on the homepage as well" — mirrors
// src/app/contact/page.tsx's REQUEST_TYPES exactly (same values/labels/icons)
// so replies read identically regardless of which form they came from; the
// requestType field is no longer hardcoded to "overview" — it's now whatever
// the visitor picks here, submitted as part of formData like every other
// field, same as /contact's own handleSubmit.
//
// Field styling matches HowDidYouHearForm/BrochureDownloadForm's shared
// convention: labels text-[11px] font-semibold tracking-[0.04em] text-[#114dac],
// inputs rounded-[4px] border-[#cbd5e0] bg-white with the blue focus ring.

import type React from "react"
import { useState, useRef } from "react"
import { Send, Loader2, CheckCircle, AlertCircle, MonitorPlay, Rocket, HelpCircle, Settings2, type LucideProps } from "lucide-react"
import type { FC } from "react"
import { HowDidYouHearForm } from "@/src/components/how-did-you-hear-form"

const MIN_SUBMIT_MS = 1500
const TEAM_SIZES = ["1-10", "11-50", "51-100", "100+"] as const

// Same value/label/icon set as src/app/contact/page.tsx's REQUEST_TYPES —
// keep the two in sync by hand if either changes.
const REQUEST_TYPES: { value: string; label: string; Icon: FC<LucideProps> }[] = [
  { value: "demo",     label: "Schedule a Demo",    Icon: MonitorPlay },
  { value: "trial",    label: "Request a Callback", Icon: Rocket },
  { value: "question", label: "Ask a Question",     Icon: HelpCircle },
  { value: "custom",   label: "Custom Inquiry",     Icon: Settings2 },
]

interface FormState {
  fullName: string
  email: string
  phone: string
  companyName: string
  manpower: string
  message: string
  requestType: string
  website: string // honeypot — must stay empty, see handleSubmit
}

const INITIAL_FORM: FormState = {
  fullName: "",
  email: "",
  phone: "",
  companyName: "",
  manpower: "",
  message: "",
  requestType: "demo",
  website: "",
}

const labelClass = "block text-[11px] font-semibold tracking-[0.04em] text-[#114dac] mb-1"
const inputClass =
  "w-full px-3.5 py-2 rounded-[4px] text-[13px] border border-[#cbd5e0] bg-white text-[#114dac] font-light placeholder:text-[#000000] focus:outline-none focus:border-[#2b6cb0] focus:ring-1 focus:ring-[#2b6cb0] transition-colors"

export function OverviewContactForm() {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  // Bot resistance — same honeypot + min-submit-time pattern as
  // brochure-download-form.tsx / contact/page.tsx.
  const mountedAt = useRef(Date.now())

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const setField = (name: keyof FormState, value: string) =>
    setFormData((prev) => ({ ...prev, [name]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.website.trim().length > 0 || Date.now() - mountedAt.current < MIN_SUBMIT_MS) {
      return
    }
    if (!formData.manpower) {
      setError("Please select your team size.")
      return
    }
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error("Failed to submit form")
      setSuccess(true)
      setFormData(INITIAL_FORM)
      // No auto-revert-to-form timeout here (there used to be one, 5s) — the
      // success state now embeds the "How did you hear about Firmity?"
      // re-ask (added 2026-09-04), which needs time to fill in. Matches
      // /contact's own success state, which also has no auto-timeout and
      // stays until the visitor clicks "Send another request".
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col gap-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-[4px] p-5 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <CheckCircle size={20} className="text-emerald-600 flex-shrink-0" />
            <p className="font-semibold text-[13.5px] text-emerald-900">Request received!</p>
          </div>
          <p className="text-[12.5px] text-emerald-700 font-light pl-8">Our team will reach out within 24 hours.</p>
        </div>

        {/* Re-ask attribution — same widget/backend as /contact's own success
            state (src/components/how-did-you-hear-form.tsx), added 2026-09-04
            for parity: this homepage form previously skipped it entirely.
            source="overview-form" keeps replies traceable to this widget
            specifically (see that route's SOURCE_LABELS map). */}
        <div className="border-t border-[#e2e8f0] pt-4">
          <HowDidYouHearForm source="overview-form" />
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
      {/* Honeypot — hidden off-screen, same pattern as brochure-download-form.tsx */}
      <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor="overview-website">Website</label>
        <input
          id="overview-website"
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label className={labelClass}>I want to*</label>
        <div className="grid grid-cols-2 gap-2">
          {REQUEST_TYPES.map(({ value, label, Icon }) => {
            const active = formData.requestType === value
            return (
              <button
                key={value}
                type="button"
                aria-pressed={active}
                onClick={() => setField("requestType", value)}
                className={`cursor-pointer flex items-center gap-1.5 px-2.5 py-1.5 rounded-[4px] border text-[10.5px] font-medium transition-all duration-200 ${
                  active
                    ? "bg-[#114dac] border-[#114dac] text-white"
                    : "bg-white border-[#cbd5e0] text-[#114dac] hover:border-[#114dac]"
                }`}
              >
                <Icon size={13} strokeWidth={1.5} />
                {label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <label className={labelClass}>Full Name*</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Rajesh Kumar"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Company Name*</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            placeholder="Your Company"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Team Size*</label>
        {/* grid-cols-2 (was flex flex-wrap, 2026-09-05) — matches the same
            2-column grid as the Full Name/Email and Phone/Company Name rows
            above, so these 4 buttons' left/right edges line up with those
            fields instead of free-flowing to whatever width each label needs.
            "people" dropped from the label per request — just the range. */}
        <div className="grid grid-cols-2 gap-2">
          {TEAM_SIZES.map((size) => {
            const active = formData.manpower === size
            return (
              <button
                key={size}
                type="button"
                aria-pressed={active}
                onClick={() => setField("manpower", size)}
                className={`cursor-pointer px-3.5 py-1.5 rounded-[4px] text-[11.5px] font-medium border transition-all duration-200 ${
                  active
                    ? "bg-[#114dac] border-[#114dac] text-white"
                    : "bg-white border-[#cbd5e0] text-[#114dac] hover:border-[#114dac]"
                }`}
              >
                {size}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className={labelClass}>Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={2}
          placeholder="Tell us about your facility requirements..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-[4px] p-3 flex items-center gap-2">
          <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
          <p className="text-[12px] text-red-700">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="cursor-pointer w-full bg-[#114dac] hover:bg-[#0e3e8a] text-white py-2.5 rounded-[4px] text-[13px] font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-[0_8px_24px_rgba(17,29,53,0.2)] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send size={15} />
            Send Message
          </>
        )}
      </button>
    </form>
  )
}
