"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import {
  ArrowRight, CheckCircle, Shield, Flame, Wind, Zap, Droplets, HardHat,
  Leaf, Sparkles, ChevronDown, Lock, FileText, Star, Download,
  TrendingUp, AlertTriangle, Building2, BarChart3, Eye, ShieldCheck,
  Cpu, Recycle, ClipboardList,
} from "lucide-react"

// ─── Theme tokens ──────────────────────────────────────────────────────────────
// Green/white theme matching the residential page

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  const color = light ? "bg-emerald-400" : "bg-emerald-600"
  const text  = light ? "text-emerald-300" : "text-emerald-700"
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className={"w-6 h-px flex-shrink-0 " + color} />
      <p className={"text-[10px] font-semibold tracking-[0.2em] uppercase " + text}>{children}</p>
    </div>
  )
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <CheckCircle size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
      <span className="text-[13.5px] text-[#374151] font-light leading-relaxed">{children}</span>
    </li>
  )
}

// ─── Donut chart for ScoreCard ─────────────────────────────────────────────────

function DonutScore({ score }: { score: number }) {
  const r = 52
  const circ = 2 * Math.PI * r
  const filled = (score / 100) * circ
  const color = score >= 80 ? "#34d399" : score >= 60 ? "#f59e0b" : "#f87171"
  return (
    <div className="relative flex items-center justify-center" style={{ width: 140, height: 140 }}>
      <svg width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
        <circle
          cx="70" cy="70" r={r}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circ + " " + circ}
          strokeDashoffset={circ - filled}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-serif text-[2.4rem] font-light text-white leading-none">{score}</span>
        <span className="text-[11px] text-white/40">/100</span>
      </div>
    </div>
  )
}

// ─── Score Card ───────────────────────────────────────────────────────────────

function ScoreCard() {
  const domains = [
    { label: "Infrastructure", score: 68, color: "#f59e0b" },
    { label: "Fire Safety",    score: 74, color: "#34d399" },
    { label: "Security",       score: 81, color: "#34d399" },
    { label: "Maintenance",    score: 65, color: "#f59e0b" },
    { label: "Sustainability", score: 70, color: "#34d399" },
    { label: "Housekeeping",   score: 88, color: "#34d399" },
  ]
  return (
    <div className="bg-white rounded-[24px] border border-emerald-100 shadow-[0_12px_40px_rgba(5,46,22,0.12)] overflow-hidden">
      <div className="bg-[#052e16] px-6 py-6">
        <p className="text-[10px] font-semibold text-white/40 tracking-[0.22em] uppercase mb-4 text-center">Facility Health Score</p>
        <div className="flex items-center justify-center mb-4">
          <DonutScore score={72} />
        </div>
        <p className="text-[11px] text-white/50 text-center">Moderate — Attention Required</p>
        {/* Mini bar charts */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {domains.slice(0, 3).map(function(d, i) {
            return (
              <div key={i} className="text-center">
                <div className="h-12 bg-white/5 rounded-lg flex flex-col-reverse overflow-hidden">
                  <div className="rounded-lg" style={{ height: d.score + "%", backgroundColor: d.color, opacity: 0.8 }} />
                </div>
                <p className="text-[8.5px] text-white/40 mt-1 truncate">{d.label}</p>
              </div>
            )
          })}
        </div>
      </div>
      <div className="p-5 space-y-3">
        {domains.map(function(d, i) {
          return (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11.5px] text-[#374151] font-medium">{d.label}</span>
                <span className="text-[11.5px] font-bold text-[#052e16]">{d.score}</span>
              </div>
              <div className="w-full bg-[#f0f4f8] rounded-full h-1.5">
                <div className="h-1.5 rounded-full" style={{ width: d.score + "%", backgroundColor: d.color }} />
              </div>
            </div>
          )
        })}
      </div>
      <div className="px-5 pb-4">
        <p className="text-[10.5px] text-[#a0aec0] text-center italic">Sample score — your facility&apos;s score may differ</p>
      </div>
    </div>
  )
}

// ─── Report Mockup ────────────────────────────────────────────────────────────

function ReportMockup() {
  const sections = [
    { label: "Executive Summary",      icon: FileText,      color: "#f0fdf4" },
    { label: "Facility Health Score",  icon: BarChart3,     color: "#f0fdf4" },
    { label: "Domain-wise Findings",   icon: Eye,           color: "#f0fdf4" },
    { label: "Risk Classification",    icon: AlertTriangle, color: "#fff5f5" },
    { label: "Priority Action Matrix", icon: TrendingUp,    color: "#f0fdf4" },
    { label: "Photo Evidence",         icon: Building2,     color: "#f0fdf4" },
    { label: "Expert Recommendations", icon: CheckCircle,   color: "#f0fdf4" },
    { label: "Compliance Snapshot",    icon: Shield,        color: "#f0fdf4" },
  ]
  return (
    <div className="bg-white rounded-[24px] border border-emerald-100 shadow-[0_12px_40px_rgba(5,46,22,0.1)] overflow-hidden">
      <div className="bg-[#15803d] px-5 py-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
          <FileText size={15} className="text-white" />
        </div>
        <div>
          <p className="text-[11px] text-white/60 leading-none mb-0.5">FACILITY HEALTH ASSESSMENT</p>
          <p className="text-[13px] font-semibold text-white leading-none">Your Property Report</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-[10px] text-white/50 leading-none mb-0.5">Prepared by</p>
          <p className="text-[12px] font-bold text-white leading-none">Firmity AI</p>
        </div>
      </div>
      <div className="p-4 space-y-1.5">
        {sections.map(function(s, i) {
          const Icon = s.icon
          return (
            <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-xl" style={{ backgroundColor: s.color }}>
              <Icon size={13} className="text-emerald-600 flex-shrink-0" />
              <span className="text-[12px] font-medium text-[#1a202c]">{s.label}</span>
              <div className="ml-auto w-16 h-1.5 bg-[#d1fae5] rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: (60 + i * 5) + "%" }} />
              </div>
            </div>
          )
        })}
      </div>
      <div className="px-5 py-3 border-t border-[#f0fdf4] flex items-center justify-between">
        <span className="text-[10.5px] text-[#a0aec0]">AI-generated · Ready in 10 minutes</span>
        <span className="text-[10.5px] font-semibold text-emerald-600">Confidential</span>
      </div>
    </div>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "Is the facility assessment really free?",
    a: "Yes, completely. There are no hidden charges, consultation fees, or follow-up costs. The assessment is our way of helping facility managers and property owners understand their facility health — with no strings attached.",
  },
  {
    q: "Is there any obligation to purchase Firmity after the assessment?",
    a: "None whatsoever. You receive the full report regardless of whether you choose to use Firmity. We believe the report speaks for itself.",
  },
  {
    q: "How long does the on-site survey take?",
    a: "Most assessments take between half a day to a full day, depending on the size and complexity of your facility. Multi-building campuses may require 1–2 days.",
  },
  {
    q: "What types of properties do you assess?",
    a: "We assess residential societies, commercial offices, manufacturing plants, hospitals, educational campuses, hotels, mixed-use developments, and industrial facilities.",
  },
  {
    q: "Who receives the assessment report?",
    a: "The report is shared exclusively with the authorised contact you designate at the time of booking.",
  },
  {
    q: "Is my facility information kept confidential?",
    a: "Absolutely. All observations, photographs, and data collected during the assessment are treated as strictly confidential. We do not share, sell, or disclose any information to third parties.",
  },
  {
    q: "When will I receive the report after the survey?",
    a: "After the on-site assessment, our AI generates your Facility Health Report in 10 minutes. You receive it shortly after the surveyor completes data collection.",
  },
  {
    q: "Do you cover multi-building or multi-block campuses?",
    a: "Yes. During the booking process, you can specify each building, tower, or block you want assessed. Our team plans the survey accordingly.",
  },
]

function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  return (
    <section className="bg-white py-16 lg:py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <SectionLabel>Common Questions</SectionLabel>
          <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.5rem)] font-light text-[#052e16]">
            Frequently asked questions
          </h2>
        </div>
        <div>
          {FAQ_ITEMS.map(function(item, i) {
            const isOpen = openIdx === i
            return (
              <div key={i} style={{ borderTop: "1px solid #d1fae5" }}>
                <button
                  onClick={function() { setOpenIdx(isOpen ? null : i) }}
                  className="w-full flex items-center gap-3 py-4 text-left cursor-pointer hover:text-emerald-700 transition-colors"
                >
                  <ChevronDown
                    size={16}
                    className="text-emerald-500 flex-shrink-0 transition-transform duration-200"
                    style={{ transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)" }}
                  />
                  <span className="text-[14px] font-medium text-[#1a202c]">{item.q}</span>
                </button>
                {isOpen && (
                  <div className="pb-5 pl-[28px]">
                    <p className="text-[13.5px] text-[#6b7280] font-light leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            )
          })}
          <div style={{ borderTop: "1px solid #d1fae5" }} />
        </div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FacilitySurveyLandingPage() {
  return (
    <>
      <Navigation />
      <style>{`
        @keyframes heroGradient {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
        .hero-animated {
          background: linear-gradient(135deg, #052e16 0%, #064e3b 20%, #065f46 40%, #052e16 60%, #14532d 80%, #052e16 100%);
          background-size: 400% 400%;
          animation: heroGradient 22s ease infinite;
        }
      `}</style>
      <main>

        {/* ── 1. HERO ──────────────────────────────────────────────────── */}
        <section className="hero-animated relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "36px 36px" }} />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-300/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-0">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-center pb-14">
              {/* Left */}
              <div>
                <p className="text-[11px] font-semibold text-emerald-300 tracking-[0.22em] uppercase mb-5">
                  Free AI Facility Health Assessment
                </p>
                <h1 className="font-serif text-[clamp(2rem,5vw,3.25rem)] font-light text-white leading-[1.15] mb-4">
                  Know the True Health<br />
                  <span className="italic text-emerald-300">of Your Facility.</span>
                </h1>
                <p className="text-[16.5px] font-semibold text-white mb-3 leading-snug">
                  Our surveyor visits your property. Our AI generates a comprehensive facility health report in 10 minutes.
                </p>
                <p className="text-[14.5px] text-white/[0.62] font-light max-w-lg leading-relaxed mb-8">
                  A certified expert conducts an on-site inspection across every safety, infrastructure, and operational dimension — and AI compiles it into a detailed report with findings, risk scores, and a priority action plan.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/facility-survey/book"
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#052e16] px-7 py-3.5 rounded-xl font-semibold text-[14px] hover:bg-emerald-50 transition-colors shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
                  >
                    Get My Free Assessment <ArrowRight size={15} />
                  </Link>
                  <a
                    href="#sample-report"
                    className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white/50 text-white/80 hover:text-white px-7 py-3.5 rounded-xl font-light text-[14px] transition-colors"
                  >
                    <Download size={14} /> View Sample Report
                  </a>
                </div>
              </div>
              {/* Right — Score Card */}
              <div className="hidden lg:block">
                <ScoreCard />
              </div>
            </div>
          </div>

          {/* ── Trust Banner ──────────────────────────────────────── */}
          <div className="relative border-t border-white/[0.08] bg-white/[0.04] backdrop-blur-sm">
            <div className="max-w-5xl mx-auto px-6">
              <div className="grid grid-cols-1 sm:grid-cols-3">
                {[
                  {
                    icon: <CheckCircle size={22} className="text-emerald-400" />,
                    title: "100% Free",
                    desc: "No hidden costs, ever",
                  },
                  {
                    icon: <Lock size={22} className="text-emerald-400" />,
                    title: "Fully Confidential",
                    desc: "Your data stays private",
                  },
                  {
                    icon: <Cpu size={22} className="text-emerald-400" />,
                    title: "AI Report in 10 Minutes",
                    desc: "Instant, comprehensive output",
                  },
                ].map(function(item, i) {
                  return (
                    <div key={i} className="flex items-center gap-4 py-5 px-4 border-b sm:border-b-0 sm:border-r border-white/[0.08] last:border-0">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-400/20 flex items-center justify-center flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[13.5px] font-semibold text-white">{item.title}</p>
                        <p className="text-[11.5px] text-white/45 font-light">{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── Stats strip ──────────────────────────────────────── */}
          <div className="relative border-t border-white/[0.05] bg-[#041f10]/60">
            <div className="max-w-5xl mx-auto px-6 grid grid-cols-3">
              {[
                { label: "Facility Types Assessed", value: "7+" },
                { label: "Inspection Domains",      value: "14" },
                { label: "AI Report Generation",    value: "10 min" },
              ].map(function(s, i) {
                return (
                  <div key={i} className="flex flex-col items-center justify-center py-7 border-r border-white/[0.06] last:border-0">
                    <span className="font-serif text-[2.2rem] font-light text-emerald-300 leading-none mb-1">{s.value}</span>
                    <span className="text-[11px] text-white/35 font-light tracking-wide text-center px-2">{s.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── 2. Trusted by ────────────────────────────────────────────── */}
        <section className="bg-[#f0fdf4] border-b border-emerald-100 py-7 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-[11px] text-emerald-600/60 font-light tracking-widest uppercase mb-4">
              Trusted by facility managers across
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {[
                "Residential Societies",
                "Commercial Offices",
                "Manufacturing Plants",
                "Hospitals & Clinics",
                "Educational Campuses",
                "Hotels & Hospitality",
              ].map(function(t) {
                return (
                  <span key={t} className="text-[12.5px] text-[#374151] font-light">{t}</span>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── 3. Why Assess — editorial with real images ───────────────── */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-5xl mx-auto">

            {/* Section heading + intro image */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-center mb-20">
              <div>
                <SectionLabel>Why Get a Free Assessment?</SectionLabel>
                <h2 className="font-serif text-[clamp(2rem,4.5vw,3rem)] font-light text-[#052e16] max-w-2xl leading-tight mb-5">
                  Most facilities are healthier on paper
                  <span className="italic text-emerald-600"> than in reality.</span>
                </h2>
                <p className="text-[15px] text-[#374151] font-light leading-relaxed">
                  Day-to-day operations mask problems that compound quietly — until they surface as costly failures, compliance violations, or safety incidents. A Firmity assessment gives you the full picture, fast.
                </p>
              </div>
              <div className="rounded-[20px] overflow-hidden shadow-[0_12px_40px_rgba(5,46,22,0.12)]">
                <img
                  src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80"
                  alt="Modern facility building exterior"
                  className="w-full h-[280px] object-cover"
                />
              </div>
            </div>

            {/* Story 1 — Water */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Droplets size={16} className="text-emerald-600" />
                  <span className="text-[11px] font-semibold text-emerald-700 tracking-[0.18em] uppercase">Leakages & Water</span>
                </div>
                <h3 className="font-serif text-[clamp(1.3rem,2.5vw,1.7rem)] font-light text-[#052e16] leading-snug mb-4">
                  Water silently erodes your building — and your budget.
                </h3>
                <p className="text-[14px] text-[#374151] font-light leading-relaxed mb-4">
                  Leakages in terrace waterproofing, plumbing lines, and wet areas routinely go undetected for months. By the time they are visible, structural damage and remediation cost far exceed what an early fix would have required.
                </p>
                <p className="text-[14px] text-[#374151] font-light leading-relaxed">
                  Our assessment maps every active and latent leakage with photographic evidence and location tags — giving you a precise picture of where water is getting in, and what it will cost if ignored.
                </p>
              </div>
              <div className="rounded-[20px] overflow-hidden shadow-[0_12px_40px_rgba(5,46,22,0.10)]">
                <img
                  src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80"
                  alt="Facility water pipes and plumbing inspection"
                  className="w-full h-[280px] object-cover"
                />
              </div>
            </div>

            {/* Story 2 — Fire + Security */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">
              <div className="order-2 lg:order-1">
                <div className="rounded-[20px] overflow-hidden shadow-[0_12px_40px_rgba(5,46,22,0.10)]">
                  <img
                    src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80"
                    alt="Fire safety equipment in a facility"
                    className="w-full h-[280px] object-cover"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-2 mb-4">
                  <Flame size={16} className="text-emerald-600" />
                  <span className="text-[11px] font-semibold text-emerald-700 tracking-[0.18em] uppercase">Fire Safety & Security</span>
                </div>
                <h3 className="font-serif text-[clamp(1.3rem,2.5vw,1.7rem)] font-light text-[#052e16] leading-snug mb-4">
                  A blocked exit or a CCTV blind spot is not a minor issue.
                </h3>
                <p className="text-[14px] text-[#374151] font-light leading-relaxed mb-4">
                  Non-functional extinguishers, expired service records, unmarked evacuation routes, and access control gaps only surface during audits or incidents — neither of which you want to be caught unprepared for.
                </p>
                <p className="text-[14px] text-[#374151] font-light leading-relaxed">
                  An independent assessment identifies compliance gaps before they become liabilities — and gives you documented evidence of due diligence.
                </p>
              </div>
            </div>

            {/* Story 3 — Assets + Sustainability */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Leaf size={16} className="text-emerald-600" />
                  <span className="text-[11px] font-semibold text-emerald-700 tracking-[0.18em] uppercase">Assets & Sustainability</span>
                </div>
                <h3 className="font-serif text-[clamp(1.3rem,2.5vw,1.7rem)] font-light text-[#052e16] leading-snug mb-4">
                  Equipment that is not maintained deteriorates — and does not announce it.
                </h3>
                <p className="text-[14px] text-[#374151] font-light leading-relaxed mb-4">
                  HVAC units running past service intervals, STP systems underperforming, and horticulture neglect quietly reduce both the functionality and value of your facility.
                </p>
                <p className="text-[14px] text-[#374151] font-light leading-relaxed">
                  The assessment covers every asset category — mechanical, civil, electrical, and landscape — with condition ratings, maintenance history gaps, and prioritised action recommendations.
                </p>
              </div>
              <div className="rounded-[20px] overflow-hidden shadow-[0_12px_40px_rgba(5,46,22,0.10)]">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                  alt="Facility assets and maintenance inspection"
                  className="w-full h-[280px] object-cover"
                />
              </div>
            </div>

          </div>
        </section>

        {/* ── 4. Urgency — full background image ───────────────────────── */}
        <section
          className="relative py-24 px-6 overflow-hidden"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#052e16]/82" />
          <div className="relative max-w-4xl mx-auto">
            <SectionLabel light>Why Act Now</SectionLabel>
            <h2 className="font-serif text-[clamp(1.8rem,4.5vw,3rem)] font-light text-white leading-snug mb-8 max-w-3xl">
              Small issues today compound into costly problems tomorrow.
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 items-start">
              <div className="space-y-5">
                <p className="text-[15.5px] text-white/70 font-light leading-relaxed">
                  Most facilities operate under the assumption that if nothing has broken yet, nothing is wrong. But facility health degrades incrementally — and the gap between functioning and failing is exactly where the most expensive problems live.
                </p>
                <p className="text-[15.5px] text-white/70 font-light leading-relaxed">
                  Undetected water leakages increase operational costs by 15–25%. Fire extinguishers that miss their annual service date become compliance liabilities. Assets without preventive maintenance schedules fail earlier and cost significantly more to replace. Security gaps remain invisible until a breach makes them obvious.
                </p>
                <p className="text-[15.5px] text-white/70 font-light leading-relaxed">
                  An independent assessment surfaces these issues and gives you documented evidence to prioritise maintenance spend, address compliance gaps, and make capital decisions based on actual facility condition — not assumption.
                </p>
                <div className="pt-2">
                  <Link
                    href="/facility-survey/book"
                    className="inline-flex items-center gap-2 bg-white text-[#052e16] px-7 py-3.5 rounded-xl font-semibold text-[14px] hover:bg-emerald-50 transition-colors shadow-[0_4px_16px_rgba(0,0,0,0.25)]"
                  >
                    Schedule My Free Assessment <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { stat: "15–25%", desc: "Increase in costs from undetected leakages" },
                  { stat: "3–5x",   desc: "Higher repair costs: reactive vs. preventive" },
                  { stat: "14",     desc: "Domains inspected in a single on-site visit" },
                ].map(function(item, i) {
                  return (
                    <div key={i} className="bg-white/[0.08] border border-white/[0.12] rounded-[16px] p-5 backdrop-blur-sm">
                      <p className="font-serif text-[2.2rem] font-light text-emerald-300 leading-none mb-1">{item.stat}</p>
                      <p className="text-[12.5px] text-white/55 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. Inspection Coverage — Apple grid ──────────────────────── */}
        <section className="bg-[#f0fdf4] py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <SectionLabel>What We Inspect</SectionLabel>
              <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] font-light text-[#052e16]">
                14 domains. Every corner of your facility.
              </h2>
              <p className="text-[15px] text-[#374151] font-light mt-4 max-w-xl leading-relaxed">
                Your assessment covers a comprehensive range of operational and infrastructure parameters — not just the obvious ones.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { Icon: HardHat,       label: "Building Exterior & Structure",  bg: "bg-slate-50",    ic: "text-slate-500",   dot: "#94a3b8" },
                { Icon: Droplets,      label: "Leakages & Water Management",    bg: "bg-blue-50",     ic: "text-blue-500",    dot: "#3b82f6" },
                { Icon: Flame,         label: "Fire Safety Readiness",          bg: "bg-red-50",      ic: "text-red-500",     dot: "#ef4444" },
                { Icon: Shield,        label: "Security Infrastructure",        bg: "bg-purple-50",   ic: "text-purple-500",  dot: "#a855f7" },
                { Icon: Zap,           label: "Electrical Systems",             bg: "bg-amber-50",    ic: "text-amber-500",   dot: "#f59e0b" },
                { Icon: Wind,          label: "HVAC & Mechanical",             bg: "bg-sky-50",      ic: "text-sky-500",     dot: "#0ea5e9" },
                { Icon: Sparkles,      label: "Common Areas & Housekeeping",    bg: "bg-pink-50",     ic: "text-pink-500",    dot: "#ec4899" },
                { Icon: Building2,     label: "Asset Condition",                bg: "bg-orange-50",   ic: "text-orange-500",  dot: "#f97316" },
                { Icon: ClipboardList, label: "Preventive Maintenance",         bg: "bg-teal-50",     ic: "text-teal-600",    dot: "#0d9488" },
                { Icon: Leaf,          label: "Landscape & Horticulture",       bg: "bg-lime-50",     ic: "text-lime-600",    dot: "#65a30d" },
                { Icon: Recycle,       label: "Waste Management",               bg: "bg-stone-50",    ic: "text-stone-500",   dot: "#78716c" },
                { Icon: BarChart3,     label: "Sustainability (STP / RWH)",     bg: "bg-emerald-50",  ic: "text-emerald-600", dot: "#10b981" },
                { Icon: ShieldCheck,   label: "Compliance Snapshot",            bg: "bg-indigo-50",   ic: "text-indigo-500",  dot: "#6366f1" },
                { Icon: Eye,           label: "Vendor & Contract Review",       bg: "bg-violet-50",   ic: "text-violet-500",  dot: "#8b5cf6" },
              ].map(function(item, i) {
                const Icon = item.Icon
                return (
                  <div key={i} className="flex items-center gap-4 bg-white rounded-[16px] border border-emerald-100 px-4 py-3.5 shadow-[0_1px_6px_rgba(5,46,22,0.06)] hover:shadow-[0_4px_16px_rgba(5,46,22,0.10)] transition-shadow">
                    <div className={"w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0 " + item.bg}>
                      <Icon size={19} className={item.ic} />
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.dot }} />
                      <span className="text-[13px] font-medium text-[#1a202c] leading-snug">{item.label}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── 6. Facility Health Score ──────────────────────────────────── */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <SectionLabel>Facility Health Score</SectionLabel>
                <h2 className="font-serif text-[clamp(1.8rem,4vw,2.5rem)] font-light text-[#052e16] leading-snug mb-4">
                  Know your score across every critical parameter.
                </h2>
                <p className="text-[14.5px] text-[#374151] font-light leading-relaxed mb-6">
                  Your Facility Health Report includes an overall score and individual domain scores — giving you a clear, structured view of where your facility excels and where it needs attention.
                </p>
                <ul className="space-y-2.5 mb-8">
                  {[
                    "Scored out of 100 across 6 operational domains",
                    "Green / Amber / Red risk classification per finding",
                    "Priority matrix to guide your maintenance budget",
                    "Benchmarked against industry best practices",
                  ].map(function(b, i) {
                    return <Check key={i}>{b}</Check>
                  })}
                </ul>
                <Link
                  href="/facility-survey/book"
                  className="inline-flex items-center gap-2 bg-[#15803d] hover:bg-[#166534] text-white px-7 py-3.5 rounded-xl font-semibold text-[14px] transition-colors shadow-[0_4px_20px_rgba(21,128,61,0.25)]"
                >
                  Get My Facility Score <ArrowRight size={15} />
                </Link>
              </div>
              <ScoreCard />
            </div>
          </div>
        </section>

        {/* ── 7. Your Deliverable ───────────────────────────────────────── */}
        <section className="bg-[#f0fdf4] py-20 px-6 border-t border-emerald-100">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <ReportMockup />
              </div>
              <div className="order-1 lg:order-2">
                <SectionLabel>Your Deliverable</SectionLabel>
                <h2 className="font-serif text-[clamp(1.8rem,4vw,2.5rem)] font-light text-[#052e16] leading-snug mb-4">
                  A professional report you can actually act on.
                </h2>
                <p className="text-[14.5px] text-[#374151] font-light leading-relaxed mb-6">
                  After the on-site survey, AI compiles all findings into a complete Facility Health Report in 10 minutes — with photographic evidence, risk ratings, and a prioritised action plan.
                </p>
                <ul className="space-y-2.5">
                  {[
                    "Executive summary for senior management",
                    "Facility Health Score with domain breakdown",
                    "Photographic findings with location tags",
                    "Risk classification — High / Medium / Low",
                    "Priority action matrix with cost guidance",
                    "Expert recommendations per domain",
                    "Compliance snapshot across key parameters",
                    "Shared exclusively with your authorised contact",
                  ].map(function(b, i) {
                    return <Check key={i}>{b}</Check>
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. Process — Gemini gradient ─────────────────────────────── */}
        <section
          className="relative py-20 px-6"
          style={{ background: "linear-gradient(135deg, #0d1f3c 0%, #1e0a3c 30%, #2a0a1c 60%, #0a1a1a 100%)" }}
        >
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[10px] font-semibold text-violet-300/70 tracking-[0.2em] uppercase mb-4">Powered by AI</p>
              <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] font-light text-white leading-snug">
                Simple. Structured.
                <span className="italic text-violet-300"> AI-powered.</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  num: "01",
                  title: "Schedule Your Assessment",
                  desc: "Choose a convenient date, describe your property, and pick the domains you want assessed. Takes less than 5 minutes.",
                  color: "#818cf8",
                },
                {
                  num: "02",
                  title: "On-site Facility Survey",
                  desc: "Our certified experts inspect the property across all selected domains with photographic documentation and structured observations.",
                  color: "#a78bfa",
                },
                {
                  num: "03",
                  title: "AI Generates Your Report",
                  desc: "After data collection, AI compiles a comprehensive Facility Health Report in 10 minutes — complete with scores, risk ratings, and recommendations.",
                  color: "#f472b6",
                },
                {
                  num: "04",
                  title: "Improve with Confidence",
                  desc: "Use the report to prioritise maintenance spend, address compliance gaps, and plan long-term capital improvements.",
                  color: "#34d399",
                },
              ].map(function(step, i) {
                return (
                  <div key={i} className="relative">
                    <div className="mb-4">
                      <span className="font-serif text-[2.4rem] font-light leading-none" style={{ color: step.color, opacity: 0.3 }}>{step.num}</span>
                    </div>
                    <div className="w-8 h-0.5 mb-4" style={{ backgroundColor: step.color }} />
                    <h3 className="text-[14px] font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-[13px] text-white/45 font-light leading-relaxed">{step.desc}</p>
                    {i < 3 && (
                      <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2 text-white/20">
                        <ArrowRight size={18} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="mt-14 text-center">
              <Link
                href="/facility-survey/book"
                className="inline-flex items-center gap-2 bg-white text-[#0d1f3c] px-8 py-4 rounded-xl font-semibold text-[14px] hover:bg-violet-50 transition-colors shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
              >
                Start Step 1 — Schedule Now <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── 9. Sample Report Download ─────────────────────────────────── */}
        <section id="sample-report" className="bg-white py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#f0fdf4] rounded-[24px] border border-emerald-100 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px]">
                <div className="p-10 lg:p-14">
                  <SectionLabel>Sample Report</SectionLabel>
                  <h2 className="font-serif text-[clamp(1.5rem,2.5vw,2rem)] font-light text-[#052e16] leading-snug mb-4">
                    See exactly what you will receive.
                  </h2>
                  <p className="text-[14px] text-[#374151] font-light leading-relaxed mb-6">
                    Download a sample Facility Health Report to understand the level of detail, structure, and professional quality you can expect.
                  </p>
                  <ul className="space-y-2.5 mb-8">
                    {[
                      "20–40 page professional PDF",
                      "Photographic evidence with location labels",
                      "Risk-rated findings per domain",
                      "Executive summary and priority action plan",
                    ].map(function(b, i) {
                      return <Check key={i}>{b}</Check>
                    })}
                  </ul>
                  <a
                    href="/sample-facility-report.pdf"
                    className="inline-flex items-center gap-2 bg-[#15803d] hover:bg-[#166534] text-white px-7 py-3.5 rounded-xl font-semibold text-[14px] transition-colors"
                    download
                  >
                    <Download size={15} /> Download Sample Report
                  </a>
                </div>
                <div className="bg-[#052e16] flex flex-col items-center justify-center p-10 gap-5">
                  <div className="w-16 h-20 rounded-xl bg-white/[0.08] border border-white/[0.1] flex items-center justify-center">
                    <FileText size={28} className="text-emerald-300" />
                  </div>
                  <div className="text-center">
                    <p className="text-[13px] font-semibold text-white mb-1">Sample_FHA_Report.pdf</p>
                    <p className="text-[11px] text-white/40">PDF · Approx. 25 pages</p>
                  </div>
                  <div className="space-y-1.5 w-full">
                    {["Executive Summary", "Domain Scores", "Photo Findings", "Action Plan"].map(function(s) {
                      return (
                        <div key={s} className="flex items-center gap-2 text-[11px] text-white/50">
                          <CheckCircle size={10} className="text-emerald-400 flex-shrink-0" />
                          {s}
                        </div>
                      )
                    })}
                  </div>
                  <span className="inline-block bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full border border-emerald-500/30">
                    Free Download
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 10. Testimonial ──────────────────────────────────────────── */}
        <section className="bg-[#f0fdf4] py-16 px-6 border-t border-emerald-100">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <SectionLabel>What Facility Managers Say</SectionLabel>
            </div>
            <div className="bg-white rounded-[24px] border border-emerald-100 shadow-[0_8px_32px_rgba(5,46,22,0.07)] p-8 lg:p-10">
              <div className="flex gap-1 mb-5">
                {[0,1,2,3,4].map(function(i) {
                  return <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                })}
              </div>
              <blockquote className="font-serif text-[1.05rem] font-light text-[#1a202c] leading-relaxed mb-6 italic">
                &ldquo;The Firmity team assessed our entire residential campus in a single day. The report was incredibly detailed — they found three active leakages we had no idea about, flagged two fire extinguishers that were past service date, and gave us a clear priority list for the next six months. It helped us allocate our maintenance budget with confidence.&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#052e16] flex items-center justify-center flex-shrink-0">
                  <span className="text-[13px] font-bold text-white">A</span>
                </div>
                <div>
                  <p className="text-[13.5px] font-semibold text-[#052e16]">Ankit Sharma</p>
                  <p className="text-[12px] text-[#6b7280] font-light">Facility Head · Greenfield Housing Society, Pune</p>
                </div>
                <div className="ml-auto">
                  <span className="text-[10px] font-semibold text-[#a0aec0] tracking-wider uppercase">Verified Review</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 11. Confidentiality — compact with image ─────────────────── */}
        <section className="bg-white py-20 px-6 border-t border-emerald-100">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-center">
              <div>
                <div className="w-12 h-12 rounded-[16px] bg-[#f0fdf4] border border-emerald-200 flex items-center justify-center mb-6">
                  <Lock size={22} className="text-emerald-600" />
                </div>
                <SectionLabel>Privacy Commitment</SectionLabel>
                <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.5rem)] font-light text-[#052e16] leading-snug mb-5">
                  Your facility data stays private.
                </h2>
                <div className="space-y-5">
                  {[
                    {
                      title: "Authorised contacts only",
                      body: "The report is delivered exclusively to the contact you designate at the time of booking — no exceptions.",
                    },
                    {
                      title: "No third-party disclosure",
                      body: "Your data, observations, and findings are never sold, shared, or disclosed to any third party.",
                    },
                    {
                      title: "No operational data used elsewhere",
                      body: "Information about your facility operations is used only to prepare your report — nothing retained beyond it.",
                    },
                    {
                      title: "No obligation after assessment",
                      body: "Receiving the report does not commit you to purchasing Firmity or any other service.",
                    },
                  ].map(function(item, i) {
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle size={11} className="text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-[13.5px] font-semibold text-[#052e16] mb-0.5">{item.title}</p>
                          <p className="text-[13px] text-[#6b7280] font-light leading-relaxed">{item.body}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-7">
                  <span className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[12px] font-semibold tracking-wide px-5 py-2.5 rounded-full">
                    <CheckCircle size={14} />
                    100% Confidential · Independent · No Obligation
                  </span>
                </div>
              </div>

              <div className="rounded-[20px] overflow-hidden shadow-[0_16px_48px_rgba(5,46,22,0.12)]">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                  alt="Professional confidential document handling"
                  className="w-full h-full object-cover"
                  style={{ minHeight: "420px" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── 12. FAQ ──────────────────────────────────────────────────── */}
        <FaqSection />

        {/* ── 13. Final CTA ────────────────────────────────────────────── */}
        <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #052e16 0%, #064e3b 50%, #052e16 100%)" }}>
          <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "36px 36px" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl mx-auto px-6 py-24 text-center">
            <p className="text-[11px] font-semibold text-emerald-300/70 tracking-[0.22em] uppercase mb-5">Get Started Today</p>
            <h2 className="font-serif text-[clamp(1.8rem,5vw,3.25rem)] font-light text-white leading-tight mb-5">
              Your facility deserves<br />
              <span className="italic text-emerald-300">a health check.</span>
            </h2>
            <p className="text-[15px] text-white/55 font-light mb-10 leading-relaxed max-w-xl mx-auto">
              Whether you manage a residential community, commercial property, hospital, educational campus, or industrial facility — a clearer picture of your property health enables better planning, safer operations, and more confident decisions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                href="/facility-survey/book"
                className="inline-flex items-center gap-2 bg-white text-[#052e16] px-8 py-4 rounded-xl font-semibold text-[15px] hover:bg-emerald-50 transition-colors shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
              >
                Get My Free Facility Health Assessment <ArrowRight size={16} />
              </Link>
            </div>
            <div className="flex items-center justify-center gap-7 flex-wrap">
              {[
                "100% Free",
                "Confidential",
                "AI report in 10 minutes",
                "No obligation",
              ].map(function(text, i) {
                return (
                  <div key={i} className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-emerald-400" />
                    <span className="text-[12.5px] font-light text-white/50">{text}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
