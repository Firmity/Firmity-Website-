"use client"

// ─── Blog post lead-capture CTA ("Talk to our team") ───────────────────────
// Added 2026-09-23 per request: "add a cta form on the right hand side of
// the blog when opened... first name, last name, email, phone number and
// submit... make it look nice like the contact form on the homepage."
//
// MOVED (2026-09-24, per request: "move Talk to our team contact when a
// blog is opened at the bottom... this way the blog itself won't get
// squished between the sidebar and the contact") from a desktop sticky
// right rail + separate mobile-only inline copy to a single full-width
// render, for every viewport, right before the FAQ section at the bottom
// of the post (see blog/[slug]/page.tsx). useId() namespacing was kept
// even though there's only one instance now — harmless, and cheaper than
// stripping it back out.
//
// Styling (label/input classes, button, honeypot + MIN_SUBMIT_MS bot guard)
// copied from overview-contact-form.tsx — the homepage's own contact form —
// per the request to match its look. Field set is deliberately smaller (no
// company/team-size/message/request-type — this is a lightweight blog-reader
// form, not the demo-request form), so it posts to the SAME /api/contact
// route with companyName omitted; that route's server-side validation was
// relaxed to make companyName optional (see route.ts's 2026-09-23 comment)
// — every other caller still always sends one, so nothing changes for them.
import type React from "react"
import { useId, useRef, useState } from "react"
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react"

const MIN_SUBMIT_MS = 1500

interface FormState {
  firstName: string
  lastName: string
  email: string
  phone: string
  website: string // honeypot — must stay empty, see handleSubmit
}

const INITIAL_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  website: "",
}

const labelClass = "block text-[11px] font-semibold tracking-[0.04em] text-[#114dac] mb-1"
const inputClass =
  "w-full px-3.5 py-2 rounded-[4px] text-[13px] border border-[#cbd5e0] bg-white text-[#114dac] font-light placeholder:text-[#000000] focus:outline-none focus:border-[#2b6cb0] focus:ring-1 focus:ring-[#2b6cb0] transition-colors"

export function BlogCtaForm({ postTitle }: { postTitle?: string }) {
  const uid = useId()
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  // Bot resistance — same honeypot + min-submit-time pattern as
  // overview-contact-form.tsx / brochure-download-form.tsx / contact/page.tsx.
  const mountedAt = useRef(Date.now())

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.website.trim().length > 0 || Date.now() - mountedAt.current < MIN_SUBMIT_MS) {
      return
    }
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // No companyName/manpower/requestType fields on this form — sent as
        // empty/fixed values since /api/contact's payload shape is shared
        // across all three lead forms. `message` carries which post drove
        // the lead (not visible to the reader) so the team has context even
        // though this form has no visible message box.
        body: JSON.stringify({
          fullName: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          companyName: "",
          manpower: "",
          message: postTitle ? `Blog inquiry — from post: "${postTitle}"` : "Blog inquiry",
          requestType: "blog",
          website: formData.website,
        }),
      })
      if (!res.ok) throw new Error("Failed to submit form")
      setSuccess(true)
      setFormData(INITIAL_FORM)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-[#f7f7f7] rounded-[4px] border border-[#dbe5f0] shadow-[0_8px_32px_rgba(17,29,53,0.09)] p-5">
        <div className="bg-emerald-50 border border-emerald-200 rounded-[4px] p-4 flex items-center gap-3">
          <CheckCircle size={20} className="text-emerald-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-[13px] text-emerald-900">Thanks — got it!</p>
            <p className="text-[12px] text-emerald-700 font-light">Our team will reach out within 24 hours.</p>
          </div>
        </div>
      </div>
    )
  }

  // FULL-WIDTH LAYOUT (2026-09-24, per request: "talk to our team is still
  // not full content width... fix this"). The card itself now stretches to
  // fill its parent (page.tsx no longer wraps it in a max-w constraint) —
  // but letting the actual <input> fields stretch to that same ~1100px
  // width would look broken, so a two-column split (heading/copy left,
  // form capped at 420px right) fills the width usefully instead, echoing
  // the same text+form side-by-side pattern as "Contact Us for a
  // Walkthrough" (contact-walkthrough-section.tsx) elsewhere on the site.
  return (
    <div className="bg-[#f7f7f7] rounded-[4px] border border-[#dbe5f0] shadow-[0_8px_32px_rgba(17,29,53,0.09)] p-6 sm:p-8">
      <div className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] md:gap-10 md:items-center">
        <div className="mb-5 md:mb-0">
          <h2 className="font-serif text-[1.5rem] font-light leading-tight text-[#114dac] tracking-tight mb-2">
            Talk to our team
          </h2>
          <p className="text-[13px] font-light leading-[1.7] text-[#000000] max-w-md">
            Questions about facility management software? Leave your details and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
        {/* Honeypot — hidden off-screen, same pattern as overview-contact-form.tsx */}
        <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
          <label htmlFor={`${uid}-website`}>Website</label>
          <input
            id={`${uid}-website`}
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label htmlFor={`${uid}-firstName`} className={labelClass}>First Name*</label>
            <input
              type="text"
              id={`${uid}-firstName`}
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Rajesh"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`${uid}-lastName`} className={labelClass}>Last Name*</label>
            <input
              type="text"
              id={`${uid}-lastName`}
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Kumar"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${uid}-email`} className={labelClass}>Email*</label>
          <input
            type="email"
            id={`${uid}-email`}
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor={`${uid}-phone`} className={labelClass}>Phone</label>
          <input
            type="tel"
            id={`${uid}-phone`}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className={inputClass}
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
              Submit
            </>
          )}
        </button>
        </form>
      </div>
    </div>
  )
}
