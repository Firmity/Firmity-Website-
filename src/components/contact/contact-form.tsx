"use client"

// Contact form (client island of the /contact page).
//
// BACKEND CONTRACT (unchanged): POST /api/contact with keys
// { fullName, email, phone, companyName, manpower, message, requestType, website }.
// requestType ∈ demo|trial|question|custom, manpower ∈ 1-10|11-50|51-100|100+.
// Do not rename keys or values without updating src/app/api/contact/route.ts.
//
// Mobile notes: every control is >=48px tall and uses a 16px font — iOS Safari
// zooms the whole page on focus of anything smaller. Choice groups are native
// radios (keyboard arrows, screen-reader grouping) styled as filled tiles, not
// aria-pressed buttons. Each input has autocomplete so phones can autofill.
//
// Look (design-taste-frontend house rules): the card is a tone step (white on the
// page's #f7f7f7 band), not an outlined box; unselected tiles are a filled tone,
// selected is the brand blue. Text inputs keep their 1px border — form fields are
// the one place lines are correct. Type is five sizes: 16 (body/inputs), 14
// (labels, tiles, notes), 22+ for headings.

import type React from "react"
import { useEffect, useId, useRef, useState, type FC } from "react"
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Loader2,
  MonitorPlay,
  Rocket,
  Send,
  Settings2,
  type LucideProps,
} from "lucide-react"
import { HowDidYouHearForm } from "@/src/components/how-did-you-hear-form"

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

// Bot resistance: the server rejects requests without a matching Origin/Referer;
// this is the client-side second layer — a person can't fill this form in <1.5s.
const MIN_SUBMIT_MS = 1500

const REQUEST_TYPES: { value: string; label: string; Icon: FC<LucideProps> }[] = [
  { value: "demo", label: "Schedule a demo", Icon: MonitorPlay },
  { value: "trial", label: "Request a callback", Icon: Rocket },
  { value: "question", label: "Ask a question", Icon: HelpCircle },
  { value: "custom", label: "Custom inquiry", Icon: Settings2 },
]

const TEAM_SIZES = ["1-10", "11-50", "51-100", "100+"] as const

// Entrance (see rise keyframes in globals.css); off for reduced-motion users.
const RISE = "motion-safe:animate-[rise_.55s_cubic-bezier(.22,1,.36,1)_both]"

// text-base (16px) on purpose — see the mobile note above.
const controlClass =
  "block w-full min-h-12 rounded-[4px] border border-[#a0aec0] bg-white px-3.5 py-3 text-base text-[#1a202c] placeholder:text-[#718096] transition-colors focus:border-[#114dac] focus:outline-none focus:ring-1 focus:ring-[#114dac]"

const labelClass = "mb-1.5 block text-sm font-medium text-[#1a202c]"

function TextField({
  label,
  hint,
  className = "",
  ...input
}: { label: string; hint?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId()
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
        {input.required ? (
          <span aria-hidden="true" className="text-[#114dac]"> *</span>
        ) : (
          hint && <span className="font-normal text-[#4a5568]"> ({hint})</span>
        )}
      </label>
      <input id={id} {...input} className={controlClass} />
    </div>
  )
}

interface Choice {
  value: string
  label: string
  Icon?: FC<LucideProps>
}

function ChoiceGroup({
  legend,
  name,
  value,
  options,
  onChange,
  columns,
}: {
  legend: string
  name: string
  value: string
  options: Choice[]
  onChange: (next: string) => void
  columns: string
}) {
  return (
    <fieldset>
      <legend className={labelClass}>
        {legend}
        <span aria-hidden="true" className="text-[#114dac]"> *</span>
      </legend>
      <div className={`grid gap-2 ${columns}`}>
        {options.map(({ value: optionValue, label, Icon }) => (
          <label key={optionValue} className="relative block cursor-pointer">
            <input
              type="radio"
              name={name}
              value={optionValue}
              checked={value === optionValue}
              onChange={() => onChange(optionValue)}
              required
              className="peer sr-only"
            />
            <span className="flex min-h-12 items-center justify-center gap-2 rounded-[4px] bg-[#f1f4f8] px-3 py-2.5 text-center text-sm font-medium leading-tight text-[#1a202c] transition-[background-color,color,transform] duration-150 hover:bg-[#e2e9f3] active:scale-[0.98] peer-checked:bg-[#114dac] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[#114dac] peer-focus-visible:ring-offset-2">
              {Icon && <Icon size={16} strokeWidth={1.6} aria-hidden="true" className="shrink-0" />}
              {label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Set once at first render ≈ "when the form appeared" (see MIN_SUBMIT_MS).
  const mountedAt = useRef(Date.now())
  const successRef = useRef<HTMLDivElement>(null)

  // After a successful send the form is replaced by the confirmation; on a
  // phone that can leave the viewport mid-page. Bring the confirmation into
  // view and move focus so screen readers announce it.
  useEffect(() => {
    if (!submitted) return
    successRef.current?.scrollIntoView({ block: "start" })
    successRef.current?.focus({ preventScroll: true })
  }, [submitted])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const setField = (name: keyof FormState, value: string) => setFormData((prev) => ({ ...prev, [name]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Fail closed, quietly — no error shown, so a bot gets no signal about why
    // it didn't "work". A real visitor never trips either check.
    if (formData.website.trim().length > 0 || Date.now() - mountedAt.current < MIN_SUBMIT_MS) return
    if (!formData.manpower) {
      setError("Select your team size.")
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
      setSubmitted(true)
      setFormData(INITIAL_FORM)
    } catch (err) {
      console.error("[CONTACT_SUBMIT_ERR]", err)
      setError("We couldn't send your request. Check your connection and try again, or email sales@firmity.in.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div
        id="request"
        ref={successRef}
        tabIndex={-1}
        className="scroll-mt-24 rounded-[4px] bg-white p-6 text-center outline-none sm:p-10"
      >
        <CheckCircle2 size={40} strokeWidth={1.5} aria-hidden="true" className="mx-auto mb-4 text-[#114dac]" />
        <h2 className="mb-2 font-serif text-[1.75rem] font-light leading-tight text-[#114dac]">Request received</h2>
        <p className="mx-auto mb-6 max-w-sm text-base leading-relaxed text-[#1a202c]">
          Thank you. Our team will contact you within 24 hours to confirm your slot.
        </p>

        {/* Same widget/backend as the homepage section; source="contact-form"
            keeps replies traceable to this flow. */}
        <div className="mb-6 rounded-[4px] bg-[#f7f7f7] p-5 text-left">
          <p className="mb-4 text-center text-base font-semibold text-[#1a202c]">How did you hear about Firmity?</p>
          <HowDidYouHearForm source="contact-form" />
        </div>

        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-semibold text-[#114dac] transition-all hover:gap-3"
        >
          Send another request <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>
    )
  }

  return (
    <div id="request" className={`scroll-mt-24 rounded-[4px] bg-white p-5 sm:p-8 ${RISE}`} style={{ animationDelay: "60ms" }}>
      <h2 className="mb-6 font-serif text-[1.75rem] font-light leading-tight tracking-tight text-[#114dac]">
        Tell us about your facility
      </h2>

      <form onSubmit={handleSubmit} className="relative space-y-5" aria-busy={loading}>
        {/* Honeypot — off-screen, aria-hidden, not tabbable; a bot filling every
            input blindly fills this too. */}
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <ChoiceGroup
          legend="I want to"
          name="requestType"
          value={formData.requestType}
          options={REQUEST_TYPES}
          onChange={(v) => setField("requestType", v)}
          columns="grid-cols-2 sm:grid-cols-4"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField label="Full name" name="fullName" type="text" autoComplete="name" required value={formData.fullName} onChange={handleChange} placeholder="Your name" />
          <TextField label="Work email" name="email" type="email" autoComplete="email" inputMode="email" required value={formData.email} onChange={handleChange} placeholder="you@company.com" />
          <TextField label="Phone" hint="optional" name="phone" type="tel" autoComplete="tel" inputMode="tel" value={formData.phone} onChange={handleChange} placeholder="+91 98XXX XXXXX" />
          <TextField label="Company name" name="companyName" type="text" autoComplete="organization" required value={formData.companyName} onChange={handleChange} placeholder="Your company" />
        </div>

        <ChoiceGroup
          legend="Team size"
          name="manpower"
          value={formData.manpower}
          options={TEAM_SIZES.map((size) => ({ value: size, label: size.replace("-", "–") }))}
          onChange={(v) => setField("manpower", v)}
          columns="grid-cols-2 sm:grid-cols-4"
        />

        <div>
          <label htmlFor="contact-message" className={labelClass}>
            Message <span className="font-normal text-[#4a5568]">(optional)</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={`${controlClass} resize-y`}
            placeholder="Sites, headcount, what you track today…"
          />
        </div>

        {error && (
          <div role="alert" className="flex items-start gap-2 rounded-[4px] bg-[#fff5f5] p-3">
            <AlertCircle size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#c53030]" />
            <p className="text-base leading-snug text-[#9b1c1c]">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[4px] bg-[#114dac] px-6 py-3 text-base font-semibold text-white transition-[background-color,transform] hover:bg-[#0e3e8a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#114dac] focus-visible:ring-offset-2 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 size={16} aria-hidden="true" className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Send size={15} aria-hidden="true" /> Send request
            </>
          )}
        </button>

        <p className="text-center text-sm text-[#4a5568]">We use your details only to respond to this request.</p>
      </form>
    </div>
  )
}
