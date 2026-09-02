"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Download, Loader2, CheckCircle, AlertCircle } from "lucide-react"

// Bot resistance (2026-09-01 — this form was being hit repeatedly by bots
// submitting fake leads): the server (src/app/api/brochure/route.ts) already
// rejects requests without a matching Origin/Referer. These two are a
// second, client-side layer for bots that DO render the page:
//   - honeypot "website" field, hidden off-screen — a real visitor never
//     touches it, a bot that blindly fills every input does. Server treats
//     a non-empty value as spam and silently no-ops.
//   - minimum time-to-submit — rejects instantly-submitted forms client-side
//     before even hitting the network, since a real person can't read the
//     fields and type into all four in under ~1.5s.
const MIN_SUBMIT_MS = 1500

export function BrochureDownloadForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    website: "", // honeypot — must stay empty
  })
  const mountedAt = useRef(Date.now())

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Fail closed, quietly — no error shown, so a bot gets no signal about
    // why it didn't "work". A real visitor will never trip either check.
    if (formData.website.trim().length > 0 || Date.now() - mountedAt.current < MIN_SUBMIT_MS) {
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/brochure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSuccess(true)
        setFormData({ name: "", email: "", phone: "", city: "", website: "" })

        const link = document.createElement("a")
        link.href = "/Pricing_FIRMITY FACILITY SOFTWARE UFIRM TECHNOLOGIES.pdf"
        link.download = "Firmity-CMMS-Brochure.pdf"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        setTimeout(() => setSuccess(false), 5000)
      } else {
        throw new Error("Failed to submit form")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <CheckCircle size={20} className="text-emerald-600 flex-shrink-0" />
          <p className="font-semibold text-[13.5px] text-emerald-900">Download started!</p>
        </div>
        <p className="text-[12.5px] text-emerald-700 font-light pl-8">Check your downloads folder. We've also sent details to your email.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {/* Honeypot — visually and semantically hidden from real users
          (aria-hidden, tabIndex -1, off-screen, autocomplete off so browsers
          don't offer to fill it), but present in the DOM for a bot that
          blindly fills every <input> it finds. */}
      <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor="brochure-website">Website</label>
        <input
          id="brochure-website"
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[10.5px] font-semibold text-[#4a5568] tracking-wide uppercase">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Rajesh Kumar"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2.5 text-[13px] border border-[#e2e8f0] bg-[#f8fafc] text-[#1a202c] placeholder:text-[#c0ccd8] focus:outline-none focus:border-[#2b6cb0] focus:bg-white transition-all"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10.5px] font-semibold text-[#4a5568] tracking-wide uppercase">Work Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@company.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2.5 text-[13px] border border-[#e2e8f0] bg-[#f8fafc] text-[#1a202c] placeholder:text-[#c0ccd8] focus:outline-none focus:border-[#2b6cb0] focus:bg-white transition-all"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10.5px] font-semibold text-[#4a5568] tracking-wide uppercase">Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2.5 text-[13px] border border-[#e2e8f0] bg-[#f8fafc] text-[#1a202c] placeholder:text-[#c0ccd8] focus:outline-none focus:border-[#2b6cb0] focus:bg-white transition-all"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10.5px] font-semibold text-[#4a5568] tracking-wide uppercase">City</label>
          <input
            type="text"
            name="city"
            placeholder="Mumbai"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full px-3 py-2.5 text-[13px] border border-[#e2e8f0] bg-[#f8fafc] text-[#1a202c] placeholder:text-[#c0ccd8] focus:outline-none focus:border-[#2b6cb0] focus:bg-white transition-all"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
          <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
          <p className="text-[12px] text-red-700">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#111d35] text-white py-3 text-[13px] font-semibold flex items-center justify-center gap-2 hover:bg-[#1a2744] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-1"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Processing…
          </>
        ) : (
          <>
            <Download size={15} />
            Download Brochure
          </>
        )}
      </button>

      <p className="text-[10.5px] text-[#718096] text-center font-light">
        No spam. Instant PDF download.
      </p>
    </form>
  )
}
