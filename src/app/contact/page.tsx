"use client"

// ─── Contact Page ─────────────────────────────────────────────────────────────
// Design language matches the homepage: dark navy hero, serif display type,
// #2b6cb0/#63b3ed accents, sharp corners, flat gap-px grids.
//
// BACKEND CONTRACT (unchanged): POST /api/contact with keys
// { fullName, email, phone, companyName, manpower, message, requestType }.
// requestType ∈ demo|trial|question|custom, manpower ∈ 1-10|11-50|51-100|100+.
// Do not rename keys or values without updating the API route.
//
// Interactions (CSS only): segmented pill selectors replace <select>s,
// focus-accent inputs, animated success panel, "what happens next" timeline.

import type React from "react"

import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Reveal } from "@/src/components/reveal"
import { useState, type FC } from "react"
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
  { value: "trial",    label: "Start Free Trial", Icon: Rocket },
  { value: "question", label: "Ask a Question",   Icon: HelpCircle },
  { value: "custom",   label: "Custom Inquiry",   Icon: Settings2 },
]

const TEAM_SIZES = ["1-10", "11-50", "51-100", "100+"] as const

const CHANNELS: { Icon: FC<LucideProps>; title: string; primary: React.ReactNode; secondary: string }[] = [
  {
    Icon: Mail,
    title: "Email Us",
    primary: (
      <a href="mailto:info@ufirm.in" className="text-[#2b6cb0] text-[13px] font-medium hover:underline underline-offset-4">
        info@ufirm.in
      </a>
    ),
    secondary: "We respond within 24 hours",
  },
  {
    Icon: Phone,
    title: "Call Us",
    primary: <span className="text-[#2b6cb0] text-[13px] font-medium">Available on request</span>,
    secondary: "Mon–Sat, 9am–6pm IST",
  },
  {
    Icon: MapPin,
    title: "Location",
    primary: <span className="text-[#1a202c] text-[13px] font-medium">UFIRM Technologies (P) Limited</span>,
    secondary: "Proudly Made in India",
  },
]

const NEXT_STEPS: { Icon: FC<LucideProps>; title: string; desc: string }[] = [
  { Icon: CalendarCheck, title: "We confirm within 24 hours",     desc: "A facility expert reviews your request and proposes a slot that works for you." },
  { Icon: MonitorPlay,   title: "30-minute personalized demo",    desc: "A walkthrough built around your facility type, modules of interest, and team size." },
  { Icon: Users,         title: "Q&A with facility experts",      desc: "Bring your edge cases — AMC tracking, compliance audits, multi-site rollouts." },
  { Icon: Rocket,        title: "Instant trial activation",       desc: "Your trial account is live before the call ends. Full access, no credit card." },
  { Icon: Headset,       title: "Dedicated onboarding support",   desc: "We stay with you through data setup, team training, and first PPM cycles." },
]

// ─── Field wrapper — consistent label + focus accent ─────────────────────────

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="group/field">
      <label className="flex items-center gap-1.5 text-[10.5px] font-semibold tracking-[0.08em] uppercase text-[#4a5568] mb-1.5">
        {label}
        {required && <span className="text-[#2b6cb0]">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  "w-full px-3.5 py-2.5 rounded-xl border border-[#cbd5e0] bg-white text-[13px] text-[#1a202c] font-light placeholder:text-[#a0aec0] focus:outline-none focus:border-[#2b6cb0] focus:ring-1 focus:ring-[#2b6cb0] transition-colors"

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const setField = (name: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Early validation — manpower has no native `required` as a pill group.
    if (!formData.manpower) {
      setError("Please select your team size.")
      return
    }
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // schema unchanged — see contract note at top
      })

      if (!response.ok) throw new Error("Failed to submit form")

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
      <main className="bg-white">
        {/* ── HERO — dark navy ── */}
        <section className="bg-[#111d35] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 56px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 56px)" }}
            aria-hidden="true"
          />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-10">
            <Reveal>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-px bg-[#2b6cb0]" />
                <span className="text-[#63b3ed] text-[10px] font-semibold tracking-[0.2em] uppercase">Contact</span>
              </div>
              <h1 className="font-serif text-[clamp(1.8rem,4vw,2.6rem)] font-light text-[#f0f4f8] leading-tight tracking-tight max-w-3xl">
                Let&apos;s get your facility{" "}
                <span className="text-[#63b3ed] italic">running on Firmity.</span>
              </h1>
              <p className="text-[13.5px] font-light text-white/[0.45] leading-[1.85] max-w-2xl mt-3">
                Schedule a personalized demo or get in touch with our team. We&apos;re here to help you
                transform your facility management.
              </p>
            </Reveal>
          </div>
          {/* Trust strip */}
          <Reveal delay={150}>
            <div className="relative border-t border-white/[0.06] grid grid-cols-3">
              {[
                { value: "<24h", label: "Response time" },
                { value: "30min", label: "Personalized demo" },
                { value: "2wk", label: "Free trial, no card" },
              ].map(({ value, label }) => (
                <div key={label} className="px-6 py-4 border-r border-white/[0.05] last:border-r-0 group hover:bg-white/[0.02] transition-colors">
                  <div className="font-sans text-[20px] font-light text-[#63b3ed] leading-none group-hover:text-[#90cdf4] transition-colors">{value}</div>
                  <div className="text-[9.5px] text-white/[0.35] uppercase tracking-[0.14em] mt-1.5">{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── CONTACT CHANNELS — three distinct cards, real borders ── */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 -mt-8 relative z-10 pb-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {CHANNELS.map(({ Icon, title, primary, secondary }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div className="group h-full bg-white rounded-[20px] border border-[#cbd5e0] shadow-[0_4px_20px_rgba(17,29,53,0.07)] hover:shadow-[0_14px_36px_rgba(17,29,53,0.13)] hover:-translate-y-1 hover:border-[#2b6cb0]/50 transition-all duration-300 p-6">
                  <div className="w-[42px] h-[42px] rounded-xl border border-[rgba(43,108,176,0.25)] group-hover:border-[#2b6cb0] group-hover:bg-[#2b6cb0] flex items-center justify-center mb-4 text-[#2b6cb0] group-hover:text-white transition-all duration-300">
                    <Icon size={17} strokeWidth={1.5} />
                  </div>
                  <div className="text-[11px] font-semibold tracking-[0.07em] uppercase text-[#1a202c] mb-1.5">{title}</div>
                  <div className="mb-1">{primary}</div>
                  <p className="text-[11.5px] font-light text-[#718096]">{secondary}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── FORM + NEXT STEPS ── */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-16">
            {/* ── Form column ── */}
            <Reveal direction="right">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-px bg-[#2b6cb0]" />
                <span className="text-[#2b6cb0] text-[10px] font-semibold tracking-[0.2em] uppercase">Request a Demo or Trial</span>
              </div>
              <h2 className="font-serif text-[clamp(1.3rem,2.3vw,1.65rem)] font-light text-[#1a202c] tracking-tight mb-6">
                Tell us about your facility
              </h2>

              {submitted ? (
                /* Success panel replaces the form — clear single state, no overlap */
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
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Request type — distinct rounded buttons, no hairline grid */}
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
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className={inputClass}
                        placeholder="John Doe"
                      />
                    </Field>
                    <Field label="Email" required>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={inputClass}
                        placeholder="john@company.com"
                      />
                    </Field>
                    <Field label="Phone">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </Field>
                    <Field label="Company Name" required>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        className={inputClass}
                        placeholder="Your Company"
                      />
                    </Field>
                  </div>

                  {/* Team size — pill group, values unchanged */}
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
                      rows={4}
                      className={`${inputClass} resize-none`}
                      placeholder="Tell us about your facility management needs — sites, assets, current pain points..."
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
                    className="w-full bg-[#2b6cb0] hover:bg-[#2563a8] text-white px-6 py-3.5 rounded-xl text-[12.5px] font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-[0_8px_24px_rgba(43,108,176,0.35)] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Request
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10.5px] text-[#a0aec0] font-light">
                    No spam, ever. Your details are used only to respond to this request.
                  </p>
                </form>
              )}
            </Reveal>

            {/* ── What happens next — timeline ── */}
            <Reveal direction="left" delay={120}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-px bg-[#2b6cb0]" />
                <span className="text-[#2b6cb0] text-[10px] font-semibold tracking-[0.2em] uppercase">What Happens Next</span>
              </div>
              <h3 className="font-serif text-[clamp(1.2rem,2vw,1.45rem)] font-light text-[#1a202c] tracking-tight mb-6">
                From first call to full rollout
              </h3>

              <div className="relative">
                {/* Vertical connector */}
                <div className="absolute left-[17px] top-2 bottom-2 w-px bg-[#e2e8f0]" aria-hidden="true" />
                <div className="space-y-1">
                  {NEXT_STEPS.map(({ Icon, title, desc }, i) => (
                    <div key={title} className="group relative flex gap-4 p-3 rounded-xl hover:bg-[#f8fafc] transition-colors">
                      <div className="relative z-10 w-[36px] h-[36px] flex-shrink-0 bg-white rounded-xl border border-[rgba(43,108,176,0.25)] group-hover:border-[#2b6cb0] group-hover:bg-[#2b6cb0] flex items-center justify-center text-[#2b6cb0] group-hover:text-white transition-all duration-300">
                        <Icon size={15} strokeWidth={1.5} />
                      </div>
                      <div className="pt-0.5">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-sans font-medium text-[9.5px] text-[#2b6cb0]/50">0{i + 1}</span>
                          <h4 className="text-[12.5px] font-semibold text-[#1a202c]">{title}</h4>
                        </div>
                        <p className="text-[11.5px] font-light text-[#718096] leading-[1.7]">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assurance card */}
              <div className="mt-6 bg-[#1a2744] rounded-[20px] p-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#2b6cb0]" />
                <div className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#63b3ed] mb-2">No obligation</div>
                <p className="text-[12px] font-light text-white/[0.55] leading-[1.8]">
                  Explore the platform risk-free with a 2-week trial — full access to every module,
                  no credit card, and your data stays yours.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CTA — dark navy ── */}
        <section className="bg-[#111d35] border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 text-center">
            <Reveal>
              <h2 className="font-serif text-[clamp(1.4rem,2.8vw,1.9rem)] font-light text-[#f0f4f8] tracking-tight mb-2">
                Ready to transform your{" "}
                <span className="text-[#63b3ed] italic">facility operations?</span>
              </h2>
              <p className="text-[13px] font-light text-white/[0.45]">
                Get started with a free 2-week trial today. No credit card required — full access to all features.
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
// EOF
