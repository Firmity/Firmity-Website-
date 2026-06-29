"use client"

// ─── Contact Page — C1: Split canvas ─────────────────────────────────────────
// Layout: dark navy left panel (statement + channels) / clean white right form.
// Interactive grainy gradient: mouse-tracked radial glow + SVG turbulence noise.
//
// BACKEND CONTRACT (unchanged): POST /api/contact with keys
// { fullName, email, phone, companyName, manpower, message, requestType }.
// requestType ∈ demo|trial|question|custom, manpower ∈ 1-10|11-50|51-100|100+.
// Do not rename keys or values without updating the API route.

import type React from "react"
import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { useState, useRef, useCallback, type FC } from "react"
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  MonitorPlay,
  Rocket,
  HelpCircle,
  Settings2,
  CalendarCheck,
  Users,
  Headset,
  type LucideProps,
} from "lucide-react"

// ─── Static config ────────────────────────────────────────────────────────────

interface FormState {
  fullName: string
  email: string
  phone: string
  companyName: string
  manpower: string
  message: string
  requestType: string
}

const INITIAL_FORM: FormState = {
  fullName: "",
  email: "",
  phone: "",
  companyName: "",
  manpower: "",
  message: "",
  requestType: "demo",
}

const REQUEST_TYPES: { value: string; label: string; Icon: FC<LucideProps> }[] = [
  { value: "demo",     label: "Schedule a Demo",  Icon: MonitorPlay },
  { value: "trial",    label: "Request a Callback", Icon: Rocket },
  { value: "question", label: "Ask a Question",   Icon: HelpCircle },
  { value: "custom",   label: "Custom Inquiry",   Icon: Settings2 },
]

const TEAM_SIZES = ["1-10", "11-50", "51-100", "100+"] as const

const CHANNELS: { Icon: FC<LucideProps>; title: string; detail: string; sub: string }[] = [
  { Icon: Mail,   title: "Email",    detail: "info@ufirm.in",           sub: "Reply within 24 hours" },
  { Icon: Phone,  title: "Phone",    detail: "Available on request",     sub: "Mon–Sat, 9am–6pm IST" },
  { Icon: MapPin, title: "Office",   detail: "UFIRM Technologies (P) Ltd", sub: "Proudly Made in India" },
]

const NEXT_STEPS: { Icon: FC<LucideProps>; label: string }[] = [
  { Icon: CalendarCheck, label: "We confirm within 24 hours" },
  { Icon: MonitorPlay,   label: "30-min personalised demo" },
  { Icon: Users,         label: "Q&A with facility experts" },
  { Icon: Rocket,        label: "Guided setup and data onboarding" },
  { Icon: Headset,       label: "Dedicated onboarding support" },
]

// ─── Shared input style ───────────────────────────────────────────────────────

const inputClass =
  "w-full px-3.5 py-2.5 rounded-xl border border-[#cbd5e0] bg-white text-[13px] text-[#1a202c] font-light placeholder:text-[#a0aec0] focus:outline-none focus:border-[#2b6cb0] focus:ring-1 focus:ring-[#2b6cb0] transition-colors"

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[10.5px] font-semibold tracking-[0.08em] uppercase text-[#4a5568] mb-1.5">
        {label}
        {required && <span className="text-[#2b6cb0]">*</span>}
      </label>
      {children}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [formData, setFormData]   = useState<FormState>(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState("")

  // Mouse-tracking glow for left panel
  const leftRef = useRef<HTMLDivElement>(null)
  const [glow, setGlow] = useState({ x: 50, y: 30 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = leftRef.current?.getBoundingClientRect()
    if (!rect) return
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const setField = (name: keyof FormState, value: string) =>
    setFormData((prev) => ({ ...prev, [name]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.manpower) { setError("Please select your team size."); return }
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
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navigation />
      <main>
        {/* ── SPLIT CANVAS ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] min-h-[calc(100vh-64px)]">

          {/* ── LEFT — dark panel with interactive grainy gradient ── */}
          <div
            ref={leftRef}
            onMouseMove={handleMouseMove}
            className="relative bg-[#111d35] overflow-hidden flex flex-col px-8 sm:px-12 lg:px-14 py-14 lg:py-16"
          >
            {/* Grain texture — SVG turbulence overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.032]" aria-hidden="true">
              <filter id="grain-c1">
                <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#grain-c1)" />
            </svg>

            {/* Mouse-following radial glow */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(ellipse 55% 45% at ${glow.x}% ${glow.y}%, rgba(43,108,176,0.22) 0%, transparent 70%)`,
              }}
              aria-hidden="true"
            />

            {/* Static ambient glows */}
            <div className="absolute top-0 right-0 w-[320px] h-[320px] rounded-full bg-[#1a3a60]/30 blur-[80px] pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-[240px] h-[240px] rounded-full bg-[#0d2040]/40 blur-[60px] pointer-events-none" aria-hidden="true" />

            {/* Content */}
            <div className="relative flex flex-col gap-10 flex-1">

              {/* Kicker + headline */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-px bg-[#2b6cb0]" />
                  <span className="text-[#63b3ed] text-[10px] font-semibold tracking-[0.22em] uppercase">Get in Touch</span>
                </div>
                <h1 className="font-serif text-[clamp(1.7rem,3.5vw,2.4rem)] font-light text-[#f0f4f8] leading-tight tracking-tight">
                  Let&apos;s get your facility{" "}
                  <em className="not-italic text-[#63b3ed]">running on Firmity.</em>
                </h1>
                <p className="text-[13.5px] font-light text-white/[0.45] leading-[1.85] mt-4 max-w-sm">
                  Schedule a personalised demo or reach out directly. Our team responds
                  within 24 hours and stays with you through onboarding.
                </p>
              </div>

              {/* Contact channels */}
              <div className="flex flex-col gap-4">
                {CHANNELS.map(({ Icon, title, detail, sub }) => (
                  <div key={title} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl border border-white/[0.1] bg-white/[0.04] flex items-center justify-center text-[#63b3ed] group-hover:border-[#2b6cb0]/60 group-hover:bg-[#2b6cb0]/10 transition-all duration-300">
                      <Icon size={15} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold tracking-[0.12em] uppercase text-white/[0.35] mb-0.5">{title}</div>
                      <div className="text-[13px] font-light text-white/[0.75]">{detail}</div>
                      <div className="text-[11px] font-light text-white/[0.35]">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* What happens next */}
              <div className="mt-auto">
                <div className="text-[10px] font-semibold tracking-[0.16em] uppercase text-white/[0.35] mb-4">What happens next</div>
                <div className="flex flex-col gap-2.5">
                  {NEXT_STEPS.map(({ Icon, label }, i) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className="text-[9px] font-semibold text-[#2b6cb0]/50 w-4 text-right flex-shrink-0">0{i + 1}</span>
                      <div className="w-[26px] h-[26px] flex-shrink-0 rounded-lg border border-white/[0.08] bg-white/[0.03] flex items-center justify-center">
                        <Icon size={12} className="text-[#63b3ed]" strokeWidth={1.5} />
                      </div>
                      <span className="text-[12px] font-light text-white/[0.5]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ── RIGHT — white form ── */}
          <div className="bg-white flex flex-col justify-center px-8 sm:px-12 lg:px-14 py-14 lg:py-16 overflow-y-auto">
            <div className="max-w-[520px] w-full mx-auto lg:mx-0">

              {submitted ? (
                /* Success state */
                <div className="border border-[#cbd5e0] rounded-[20px] bg-[#f8fafc] p-10 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl border border-[#2b6cb0]/30 bg-[#2b6cb0]/5 flex items-center justify-center">
                    <CheckCircle2 size={26} className="text-[#2b6cb0]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-[20px] font-light text-[#1a202c] mb-2">Request received</h3>
                  <p className="text-[13px] font-light text-[#4a5568] leading-[1.8] max-w-sm mx-auto mb-6">
                    Thank you — our team will be in touch within 24 hours to confirm your slot.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#2b6cb0] hover:gap-3.5 transition-all"
                  >
                    Send another request <ArrowRight size={13} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-7">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-5 h-px bg-[#2b6cb0]" />
                      <span className="text-[#2b6cb0] text-[10px] font-semibold tracking-[0.2em] uppercase">Request a Demo</span>
                    </div>
                    <h2 className="font-serif text-[clamp(1.3rem,2.3vw,1.6rem)] font-light text-[#1a202c] tracking-tight">
                      Tell us about your facility
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Request type */}
                    <Field label="I want to" required>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {REQUEST_TYPES.map(({ value, label, Icon }) => {
                          const active = formData.requestType === value
                          return (
                            <button
                              key={value}
                              type="button"
                              aria-pressed={active}
                              onClick={() => setField("requestType", value)}
                              className={`flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl border text-[10.5px] font-medium transition-all duration-200 ${
                                active
                                  ? "bg-[#2b6cb0] border-[#2b6cb0] text-white shadow-[0_4px_14px_rgba(43,108,176,0.3)]"
                                  : "bg-white border-[#cbd5e0] text-[#4a5568] hover:border-[#2b6cb0] hover:text-[#2b6cb0]"
                              }`}
                            >
                              <Icon size={15} strokeWidth={1.5} />
                              {label}
                            </button>
                          )
                        })}
                      </div>
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Full Name" required>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className={inputClass} placeholder="John Doe" />
                      </Field>
                      <Field label="Email" required>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="john@company.com" />
                      </Field>
                      <Field label="Phone">
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+91 XXXXX XXXXX" />
                      </Field>
                      <Field label="Company Name" required>
                        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required className={inputClass} placeholder="Your Company" />
                      </Field>
                    </div>

                    {/* Team size */}
                    <Field label="Team Size" required>
                      <div className="flex flex-wrap gap-2">
                        {TEAM_SIZES.map((size) => {
                          const active = formData.manpower === size
                          return (
                            <button
                              key={size}
                              type="button"
                              aria-pressed={active}
                              onClick={() => setField("manpower", size)}
                              className={`px-4 py-2 rounded-xl text-[11.5px] font-medium border transition-all duration-200 ${
                                active
                                  ? "bg-[#2b6cb0] border-[#2b6cb0] text-white shadow-[0_4px_14px_rgba(43,108,176,0.3)]"
                                  : "bg-white border-[#cbd5e0] text-[#4a5568] hover:border-[#2b6cb0] hover:text-[#2b6cb0]"
                              }`}
                            >
                              {size} people
                            </button>
                          )
                        })}
                      </div>
                    </Field>

                    <Field label="Message">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className={`${inputClass} resize-none`}
                        placeholder="Tell us about your facility management needs..."
                      />
                    </Field>

                    {error && (
                      <div className="bg-[#fff5f5] border border-[#feb2b2] rounded-xl p-3 flex items-center gap-2">
                        <AlertCircle size={16} className="text-[#c53030] flex-shrink-0" />
                        <p className="text-[12px] text-[#c53030]">{error}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#111d35] hover:bg-[#1a2744] text-white px-6 py-3.5 rounded-xl text-[12.5px] font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-[0_8px_24px_rgba(17,29,53,0.25)] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <><Loader2 size={16} className="animate-spin" /> Sending...</>
                      ) : (
                        <><Send size={15} /> Send Request</>
                      )}
                    </button>

                    <p className="text-center text-[10.5px] text-[#a0aec0] font-light">
                      No spam, ever. Your details are used only to respond to this request.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
// EOF
