"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Reveal } from "@/src/components/reveal"
import {
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Users,
  Package,
  FileText,
  TrendingDown,
  Activity,
  ChevronRight,
  BarChart3,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react"

// ─── Shared sub-components ───────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold text-[#2b6cb0] tracking-[0.2em] uppercase mb-3">{children}</p>
  )
}

function BulletPoint({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <CheckCircle size={14} className="text-[#2b6cb0] mt-0.5 flex-shrink-0" />
      <span className="text-[13.5px] text-[#4a5568] font-light leading-relaxed">{children}</span>
    </li>
  )
}

// ─── Feature section mock UI cards ───────────────────────────────────────────

function PPMCard() {
  const tasks = [
    { task: "Compressor Oil Change", asset: "CMP-03", due: "Today", tech: "Ramesh K.", urgent: true },
    { task: "Generator Load Test", asset: "GEN-01", due: "Tomorrow", tech: "Vijay P.", urgent: false },
    { task: "Conveyor Belt Inspection", asset: "CVR-07", due: "Thu", tech: "Suresh M.", urgent: false },
    { task: "Cooling Tower Cleaning", asset: "CT-02", due: "Fri", tech: "Ajay S.", urgent: false },
  ]
  return (
    <div className="bg-white rounded-[20px] border border-[#dbe5f0] shadow-[0_8px_32px_rgba(17,29,53,0.07)] p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-semibold text-[#718096] tracking-wide uppercase">PPM Schedule — This Week</p>
        <span className="text-[10.5px] bg-[#eef3f9] text-[#2b6cb0] px-2.5 py-1 rounded-full font-semibold">4 tasks</span>
      </div>
      <div className="space-y-0">
        {tasks.map(function(item, i) {
          return (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-[#f0f4f8] last:border-0">
              <div>
                <p className="text-[12.5px] font-medium text-[#1a202c]">{item.task}</p>
                <p className="text-[11px] text-[#a0aec0] font-light mt-0.5">{item.asset} · {item.tech}</p>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] text-[#718096]">{item.due}</span>
                <span className={"w-2 h-2 rounded-full flex-shrink-0 " + (item.urgent ? "bg-amber-400" : "bg-[#63b3ed]")} />
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-4 pt-3 border-t border-[#f0f4f8] flex items-center justify-between">
        <span className="text-[11px] text-[#a0aec0]">12 tasks completed this month</span>
        <span className="text-[11px] font-semibold text-[#2b6cb0] flex items-center gap-1">View all <ChevronRight size={10} /></span>
      </div>
    </div>
  )
}

function ComplaintCard() {
  const complaints = [
    { id: "MNT-041", title: "Hydraulic press pressure drop", area: "Press Shop", status: "In Progress", time: "2h ago" },
    { id: "MNT-040", title: "AC malfunction in control room", area: "Control Room", status: "Resolved", time: "5h ago" },
    { id: "MNT-039", title: "Forklift battery not charging", area: "Warehouse", status: "Open", time: "6h ago" },
  ]
  const statusColor: Record<string, string> = {
    "In Progress": "bg-blue-50 text-blue-700",
    Resolved: "bg-emerald-50 text-emerald-700",
    Open: "bg-amber-50 text-amber-700",
  }
  return (
    <div className="bg-white rounded-[20px] border border-[#dbe5f0] shadow-[0_8px_32px_rgba(17,29,53,0.07)] p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-semibold text-[#718096] tracking-wide uppercase">Machine Complaints</p>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-[10.5px] text-[#718096]">2 open</span>
        </div>
      </div>
      <div className="space-y-3">
        {complaints.map(function(c, i) {
          return (
            <div key={i} className="p-3 rounded-xl bg-[#f8fafc] border border-[#eef3f9]">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[12px] font-semibold text-[#1a202c]">{c.title}</p>
                  <p className="text-[11px] text-[#a0aec0] mt-0.5">{c.id} · {c.area}</p>
                </div>
                <span className={"text-[10.5px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 " + statusColor[c.status]}>{c.status}</span>
              </div>
              <p className="text-[10.5px] text-[#a0aec0] mt-1.5">{c.time}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function AttendanceCard() {
  const records = [
    { name: "Ravi Electrical", type: "Contractor", inn: "08:02", out: "—", dept: "Electrical", active: true },
    { name: "Suresh Mehta", type: "Technician", inn: "07:55", out: "—", dept: "Mechanical", active: true },
    { name: "Ajay Plumbing Co.", type: "Contractor", inn: "09:10", out: "17:30", dept: "Civil", active: false },
    { name: "Vijay Kumar", type: "Technician", inn: "08:00", out: "—", dept: "Electrical", active: true },
  ]
  return (
    <div className="bg-white rounded-[20px] border border-[#dbe5f0] shadow-[0_8px_32px_rgba(17,29,53,0.07)] p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-semibold text-[#718096] tracking-wide uppercase">Today&apos;s Attendance</p>
        <span className="text-[10.5px] bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-semibold">3 on-site</span>
      </div>
      <div className="space-y-0">
        {records.map(function(r, i) {
          return (
            <div key={i} className="flex items-center gap-3 py-2.5 border-b border-[#f0f4f8] last:border-0">
              <div className="w-7 h-7 rounded-lg bg-[#eef3f9] flex items-center justify-center flex-shrink-0">
                <span className="text-[10px] font-semibold text-[#2b6cb0]">{r.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-[#1a202c] truncate">{r.name}</p>
                <p className="text-[10.5px] text-[#a0aec0]">{r.type} · {r.dept}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[11px] text-[#4a5568]">{r.inn} → {r.out}</p>
                <div className={"w-1.5 h-1.5 rounded-full ml-auto mt-1 " + (r.active ? "bg-emerald-400" : "bg-[#cbd5e0]")} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function InventoryCard() {
  const items = [
    { name: "Hydraulic Oil (ISO 46)", unit: "20L drum", stock: 8, min: 5, status: "ok" },
    { name: "Bearing SKF 6205", unit: "pcs", stock: 2, min: 10, status: "low" },
    { name: "V-Belt A-47", unit: "pcs", stock: 14, min: 6, status: "ok" },
    { name: "Gasket Kit — Pump", unit: "set", stock: 1, min: 4, status: "critical" },
  ]
  const statusStyle: Record<string, { bar: string; label: string; text: string }> = {
    ok: { bar: "bg-emerald-400", label: "In Stock", text: "text-emerald-700" },
    low: { bar: "bg-amber-400", label: "Low", text: "text-amber-700" },
    critical: { bar: "bg-red-400", label: "Reorder Now", text: "text-red-700" },
  }
  return (
    <div className="bg-white rounded-[20px] border border-[#dbe5f0] shadow-[0_8px_32px_rgba(17,29,53,0.07)] p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-semibold text-[#718096] tracking-wide uppercase">Spare Parts Inventory</p>
        <span className="text-[10.5px] bg-red-50 text-red-600 px-2.5 py-1 rounded-full font-semibold">2 alerts</span>
      </div>
      <div className="space-y-3">
        {items.map(function(item, i) {
          const s = statusStyle[item.status]
          return (
            <div key={i} className="space-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[12px] font-medium text-[#1a202c]">{item.name}</p>
                  <p className="text-[10.5px] text-[#a0aec0]">{item.stock} {item.unit} · Min: {item.min}</p>
                </div>
                <span className={"text-[10.5px] font-semibold " + s.text}>{s.label}</span>
              </div>
              <div className="h-1 bg-[#f0f4f8] rounded-full overflow-hidden">
                <div className={"h-full rounded-full " + s.bar} style={{ width: Math.min(100, (item.stock / (item.min * 2)) * 100) + "%" }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function AMCCard() {
  const contracts = [
    { vendor: "Kirloskar Service", scope: "DG Sets × 3", expiry: "30 Sep 2026", daysLeft: 98, status: "active" },
    { vendor: "Atlas Copco India", scope: "Air Compressors", expiry: "15 Jul 2026", daysLeft: 21, status: "expiring" },
    { vendor: "Otis Elevators", scope: "Lifts × 2", expiry: "12 Mar 2027", daysLeft: 261, status: "active" },
  ]
  return (
    <div className="bg-white rounded-[20px] border border-[#dbe5f0] shadow-[0_8px_32px_rgba(17,29,53,0.07)] p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-semibold text-[#718096] tracking-wide uppercase">AMC Contracts</p>
        <span className="text-[10.5px] bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full font-semibold">1 expiring</span>
      </div>
      <div className="space-y-3">
        {contracts.map(function(c, i) {
          return (
            <div key={i} className="p-3 rounded-xl bg-[#f8fafc] border border-[#eef3f9]">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[12px] font-semibold text-[#1a202c]">{c.vendor}</p>
                  <p className="text-[11px] text-[#a0aec0] mt-0.5">{c.scope}</p>
                </div>
                <span className={"text-[10.5px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 " + (c.status === "expiring" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700")}>
                  {c.status === "expiring" ? "Expiring soon" : "Active"}
                </span>
              </div>
              <p className="text-[10.5px] text-[#a0aec0] mt-1.5">Expires {c.expiry} · {c.daysLeft} days left</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Feature tab data ────────────────────────────────────────────────────────

interface TabData {
  id: string
  label: string
  heading: string
  body: string
  bullets: string[]
  card: React.ReactNode
}

const FEATURE_TABS: TabData[] = [
  {
    id: "ppm",
    label: "PPM Scheduling",
    heading: "Stop reacting. Start preventing.",
    body: "High OEE starts with scheduled maintenance, not emergency repairs. Firmity's PPM engine auto-generates work orders for every machine, utility, and asset in your plant — with checklists, technician assignments, and supervisor sign-offs built in.",
    bullets: [
      "Create PPM templates with checklists, frequency, skill tags, and SOP attachments",
      "Auto-generate work orders on daily, weekly, monthly, or meter-based schedules",
      "Mobile-first task completion with photo evidence and digital sign-off",
      "Manager dashboard shows pending, overdue, and completed tasks in real time",
    ],
    card: <PPMCard />,
  },
  {
    id: "breakdown",
    label: "Breakdown",
    heading: "From fault to fix — in minutes, not hours.",
    body: "When a line goes down, every minute is lost revenue. Firmity lets operators raise complaints from any device in under 30 seconds, routes them to the right technician instantly, and tracks resolution from assignment to closure.",
    bullets: [
      "QR-code complaint raising — scan asset, describe fault, submit in 30 seconds",
      "Priority-based routing: critical breakdowns escalate automatically to supervisors",
      "Real-time status visibility for production and maintenance managers",
      "Root cause analysis and resolution history per asset for trend reporting",
    ],
    card: <ComplaintCard />,
  },
  {
    id: "spares",
    label: "Spare Parts",
    heading: "The right part, right when you need it.",
    body: "A spare parts stockout during a breakdown can halt production for a shift or longer. Firmity tracks your entire MRO inventory in real time — alerting stores teams before stock hits minimum levels and logging every issue against a work order.",
    bullets: [
      "Part-level stock tracking with configurable minimum stock alerts per location",
      "Consumption linked to work orders for accurate maintenance cost tracking",
      "Multi-store support for large facilities with distributed storerooms",
      "Indent and purchase request workflows for replenishment with audit trail",
    ],
    card: <InventoryCard />,
  },
  {
    id: "attendance",
    label: "Attendance",
    heading: "Full workforce accountability, every shift.",
    body: "Manufacturing plants rely on contract labour for specialist maintenance work. Firmity replaces paper attendance registers with digital timestamped logs tied to specific work orders, giving supervisors real-time visibility of who is on-site.",
    bullets: [
      "Digital check-in / check-out with GPS-stamped and time-stamped logs",
      "Link contractor attendance to specific work orders for cost attribution",
      "Department-wise daily attendance summary for production planning",
      "Export attendance records for payroll processing and compliance documentation",
    ],
    card: <AttendanceCard />,
  },
  {
    id: "amc",
    label: "AMC & Vendors",
    heading: "Vendor agreements, fully under control.",
    body: "Annual Maintenance Contracts for DG sets, compressors, HVAC, lifts, and specialised machinery are easy to lose track of. Firmity maintains a centralised AMC register with expiry alerts, service visit scheduling, and a document vault.",
    bullets: [
      "Centralised AMC register with 90 / 60 / 30-day renewal alert cascade",
      "Service visit scheduling with technician attendance and job sign-off",
      "Document vault for contracts, OEM warranties, and service reports",
      "Vendor performance scoring based on response time and resolution quality",
    ],
    card: <AMCCard />,
  },
]

// ─── Challenges data ─────────────────────────────────────────────────────────

const CHALLENGES = [
  {
    Icon: Zap,
    title: "Reactive maintenance culture",
    desc: "Equipment failures discovered only when the line stops. No early warning, no prevention.",
  },
  {
    Icon: FileText,
    title: "Paper-based PPM records",
    desc: "Checklists filled after the fact. No way to prove compliance during audits.",
  },
  {
    Icon: Package,
    title: "Spare parts stockouts",
    desc: "A critical bearing runs out during a breakdown. Hours lost while procurement scrambles.",
  },
  {
    Icon: Users,
    title: "Contractor accountability gaps",
    desc: "Third-party technicians with no digital footprint — impossible to verify what was done.",
  },
  {
    Icon: BarChart3,
    title: "No cross-plant visibility",
    desc: "Each facility runs its own spreadsheet — no benchmarking, no standardisation.",
  },
  {
    Icon: AlertTriangle,
    title: "Missed AMC renewals",
    desc: "Contracts expire unnoticed — leading to disputes, voided warranties, unplanned costs.",
  },
]

// ─── Sub-vertical data ───────────────────────────────────────────────────────

const VERTICALS = [
  {
    title: "Auto & Engineering",
    tag: "Discrete manufacturing",
    points: [
      "Line stoppage root cause tracking",
      "Tool calibration & gauge management",
      "Multi-line OEE dashboards",
    ],
  },
  {
    title: "Pharmaceuticals",
    tag: "Regulated manufacturing",
    points: [
      "GMP-compliant equipment qualification logs",
      "Calibration certificate tracking",
      "Audit-ready digital maintenance records",
    ],
  },
  {
    title: "FMCG & Food Processing",
    tag: "Process manufacturing",
    points: [
      "Hygiene compliance checklists with photo proof",
      "Cold chain equipment PPM tracking",
      "Pest control & sanitisation logs",
    ],
  },
  {
    title: "Textiles",
    tag: "Discrete manufacturing",
    points: [
      "Loom and knitting machine PPM",
      "Motor and bearing replacement tracking",
      "Contractor workforce shift management",
    ],
  },
  {
    title: "Plastics & Packaging",
    tag: "Process manufacturing",
    points: [
      "Mould maintenance by shot count",
      "Injection moulding machine uptime tracking",
      "Utility energy audit checklists",
    ],
  },
  {
    title: "Metal & Fabrication",
    tag: "Heavy manufacturing",
    points: [
      "Crane and hoist load test scheduling",
      "CNC machine calibration checklists",
      "Overhead crane safety compliance records",
    ],
  },
]


// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ManufacturingPage() {
  const [activeTab, setActiveTab] = useState("ppm")
  const tab = FEATURE_TABS.find(function(t) { return t.id === activeTab })!

  return (
    <>
      <Navigation />
      <main>

        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="relative bg-[#0d1829] overflow-hidden">
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-[0.7]"
            poster="/images/factory-poster.jpg"
          >
            <source src="/videos/factory.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1829]/60 via-[#111d35]/40 to-[#111d35]/95 pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none opacity-[0.025]" aria-hidden="true"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />

          <div className="relative max-w-6xl mx-auto px-6">
            <div className="text-center pt-20 pb-14">
              <p className="text-[11px] font-semibold text-[#63b3ed] tracking-[0.22em] uppercase mb-5">
                Firmity for Manufacturing
              </p>
              <h1 className="font-serif text-[clamp(2rem,5vw,3.25rem)] font-light text-white leading-[1.15] mb-5">
                Operational Excellence,<br />Built for the Factory Floor.
              </h1>
              <p className="text-[15px] text-white/[0.62] font-light max-w-2xl mx-auto leading-relaxed mb-10">
                Manufacturing facilities lose hours every day to reactive maintenance, paper-based PPM records, and
                untraceable spare parts. Firmity gives your team a unified platform to schedule work, manage breakdowns,
                track inventory, and maintain compliance — across every line, shift, and site.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/[0.12]">
              {[
                {
                  Icon: TrendingDown,
                  title: "Maximise OEE, minimise downtime",
                  desc: "Shift from reactive firefighting to a planned maintenance culture. Firmity's PPM engine keeps your critical assets running to schedule.",
                },
                {
                  Icon: ShieldCheck,
                  title: "Audit-ready compliance records",
                  desc: "Every maintenance task, sign-off, and part consumption is logged with a timestamped digital trail — ready for ISO, GMP, or internal audits.",
                },
                {
                  Icon: Activity,
                  title: "One platform, every plant",
                  desc: "Manage maintenance operations across multiple facilities from a single dashboard. Standardise processes, compare performance, and scale what works.",
                  cta: true,
                },
              ].map(function({ Icon, title, desc, cta }, i) {
                return (
                  <div key={i} className={"px-7 py-8 " + (i < 2 ? "md:border-r border-white/[0.12] border-b md:border-b-0" : "")}>
                    <div className="w-10 h-10 rounded-xl bg-[#2b6cb0] flex items-center justify-center mb-4">
                      <Icon size={18} className="text-white" />
                    </div>
                    <h3 className="text-[15px] font-semibold text-white mb-2">{title}</h3>
                    <p className="text-[13px] text-white/[0.58] font-light leading-relaxed mb-4">{desc}</p>
                    {cta && (
                      <Link href="/contact"
                        className="inline-flex items-center gap-2 bg-[#2b6cb0] hover:bg-[#2563a8] text-white px-5 py-2.5 rounded-xl text-[13px] font-medium transition-colors">
                        Book a Demo <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Trusted by strip ──────────────────────────────────── */}
        <section className="bg-[#f8fafc] border-b border-[#eef3f9] py-8 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-[11px] text-[#a0aec0] font-light tracking-widest uppercase mb-6">
              Trusted by manufacturing facilities across India
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              <svg viewBox="0 0 160 40" className="h-7 w-auto opacity-40 grayscale" aria-label="LPS Bossard">
                <text x="0" y="28" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" fill="#1a202c" letterSpacing="1">LPS</text>
                <text x="54" y="28" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="400" fill="#1a202c">Bossard</text>
              </svg>
              <svg viewBox="0 0 240 40" className="h-7 w-auto opacity-40 grayscale" aria-label="Donaldson">
                <text x="0" y="28" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" fill="#1a202c">DONALDSON</text>
              </svg>
              <span className="text-[13px] text-[#a0aec0] font-semibold tracking-wide">Apex Auto Components</span>
              <span className="text-[13px] text-[#a0aec0] font-semibold tracking-wide">IndoPharma Works</span>
              <span className="text-[13px] text-[#a0aec0] font-semibold tracking-wide">Supreme Plastics</span>
            </div>
          </div>
        </section>

        {/* ── Industry Challenges ───────────────────────────────── */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel>Industry Challenges</SectionLabel>
              <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] font-light text-[#111d35] mb-4 max-w-2xl">
                Manufacturing maintenance is broken by default
              </h2>
              <p className="text-[15px] text-[#718096] font-light mb-14 max-w-2xl leading-relaxed">
                Most plants run on WhatsApp groups, paper registers, and tribal knowledge. The result is predictable — and expensive.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
              {CHALLENGES.map(function({ Icon, title, desc }, i) {
                return (
                  <Reveal key={i} delay={(i % 3) * 90}>
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[#eef3f9] flex items-center justify-center mb-4">
                        <Icon size={18} className="text-[#2b6cb0]" />
                      </div>
                      <p className="font-serif text-[1.2rem] font-light text-[#111d35] mb-1.5">{title}</p>
                      <p className="text-[13.5px] text-[#718096] font-light leading-relaxed">{desc}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Sub-Verticals ─────────────────────────────────────── */}
        <section className="bg-[#f8fafc] py-20 px-6 border-t border-[#eef3f9]">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel>Sub-Verticals</SectionLabel>
              <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] font-light text-[#111d35] mb-4">
                Built for every type of manufacturing facility
              </h2>
              <p className="text-[15px] text-[#718096] font-light mb-14 max-w-2xl leading-relaxed">
                Not a one-size-fits-all CMMS — Firmity adapts to your specific production environment.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
              {VERTICALS.map(function({ title, tag, points }, i) {
                return (
                  <Reveal key={i} delay={(i % 3) * 90}>
                    <div>
                      <p className="font-serif text-[1.2rem] font-light text-[#111d35] mb-1">{title}</p>
                      <p className="text-[10.5px] text-[#a0aec0] font-semibold mb-4 tracking-[0.14em] uppercase">{tag}</p>
                      <ul className="space-y-2.5">
                        {points.map(function(p, j) {
                          return (
                            <li key={j} className="flex items-start gap-2.5">
                              <CheckCircle size={14} className="text-[#2b6cb0] mt-0.5 flex-shrink-0" />
                              <span className="text-[13px] text-[#4a5568] font-light leading-relaxed">{p}</span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Feature Tabs ──────────────────────────────────────── */}
        <section className="bg-white py-20 px-6">
          {/* Header aligned to max-w-5xl like sibling sections */}
          <Reveal className="max-w-5xl mx-auto mb-10">
            <SectionLabel>Features</SectionLabel>
            <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] font-light text-[#111d35] mb-2">
              Everything your plant needs, in one platform
            </h2>
            <p className="text-[14px] text-[#718096] font-light">Click a module to see how it works.</p>
          </Reveal>

          <div className="max-w-6xl mx-auto">
            {/* Tab bar */}
            <div className="flex gap-2 flex-wrap mb-12">
              {FEATURE_TABS.map(function(t) {
                const active = t.id === activeTab
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={function() { setActiveTab(t.id) }}
                    className={"cursor-pointer px-5 py-2 rounded-full text-[13px] font-medium transition-all " + (
                      active
                        ? "bg-[#2b6cb0] text-white shadow-[0_2px_12px_rgba(43,108,176,0.30)]"
                        : "border border-[#dbe5f0] text-[#4a5568] hover:border-[#2b6cb0] hover:text-[#2b6cb0]"
                    )}
                  >
                    {t.label}
                  </button>
                )
              })}
            </div>

            {/* Active tab content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h3 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-light text-[#111d35] leading-snug mb-4">
                  {tab.heading}
                </h3>
                <p className="text-[14px] text-[#718096] font-light leading-relaxed mb-6">{tab.body}</p>
                <ul className="space-y-3">
                  {tab.bullets.map(function(b, i) {
                    return <BulletPoint key={i}>{b}</BulletPoint>
                  })}
                </ul>
              </div>
              <div>{tab.card}</div>
            </div>
          </div>
        </section>

        {/* ── Case Study ────────────────────────────────────────── */}
        <section className="bg-[#f8fafc] py-20 px-6 border-t border-[#eef3f9]">
          <Reveal className="max-w-3xl mx-auto text-center">
            <SectionLabel>Case Study</SectionLabel>
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2.1rem)] font-light text-[#111d35] mb-4">
              How Apex Auto Components cut maintenance costs by 31%
            </h2>
            <p className="text-[14px] text-[#718096] font-light mb-10 leading-relaxed">
              Pune-based auto parts manufacturer, 4 production lines, 280 employees — running on reactive maintenance and paper PPM before Firmity.
            </p>

            {/* Shadow card */}
            <div className="bg-white rounded-[24px] border border-[#dbe5f0] shadow-[0_8px_40px_rgba(17,29,53,0.08)] px-10 py-10">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-10 pb-10 border-b border-[#eef3f9]">
                {[
                  { value: "31%", label: "Reduction in maintenance spend" },
                  { value: "47 min", label: "Breakdown response (was 4.2 hrs)" },
                  { value: "\u20b918L", label: "Inventory waste eliminated annually" },
                ].map(function(s, i) {
                  return (
                    <div key={i}>
                      <p className="font-serif text-[2.2rem] font-light text-[#2b6cb0] leading-none mb-2">{s.value}</p>
                      <p className="text-[12px] text-[#718096] font-light leading-snug">{s.label}</p>
                    </div>
                  )
                })}
              </div>

              {/* Blockquote */}
              <blockquote>
                <p className="text-[14px] text-[#4a5568] font-light italic leading-relaxed mb-4">
                  &ldquo;We used to find out about machine failures when production stopped. Now our technicians get
                  notified before I even know there&apos;s an issue. Firmity changed how our entire maintenance
                  team operates.&rdquo;
                </p>
                <p className="text-[12.5px] text-[#718096] font-medium not-italic">
                  — Rakesh Sharma, Maintenance Manager, Apex Auto Components, Pune
                </p>
              </blockquote>
            </div>
          </Reveal>
        </section>

        {/* ── Related Industries ────────────────────────────────── */}
        <section className="bg-white py-16 px-6 border-t border-[#eef3f9]">
          <Reveal className="max-w-5xl mx-auto">
            <p className="text-[11px] font-semibold text-[#718096] tracking-[0.2em] uppercase mb-6 text-center">
              Explore Other Industries
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Educational Institutions", desc: "Campus maintenance, student complaint helpdesk, and hostel management.", href: "/industries/educational" },
                { label: "Residential Communities", desc: "Gate management, resident complaints, and society equipment maintenance.", href: "/industries/residential" },
              ].map(function(r) {
                return (
                  <Link key={r.href} href={r.href}
                    className="group flex items-center justify-between p-6 rounded-[20px] border border-[#dbe5f0] hover:border-[#2b6cb0] hover:bg-[#eef3f9] transition-all">
                    <div>
                      <p className="text-[13.5px] font-semibold text-[#111d35] mb-1">{r.label}</p>
                      <p className="text-[12.5px] text-[#718096] font-light">{r.desc}</p>
                    </div>
                    <ArrowRight size={16} className="text-[#2b6cb0] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4" />
                  </Link>
                )
              })}
            </div>
          </Reveal>
        </section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section className="bg-[#111d35] py-20 px-6">
          <Reveal className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-[clamp(1.6rem,4vw,2.5rem)] font-light text-white mb-4">
              Ready to transform your facility maintenance?
            </h2>
            <p className="text-[14px] text-white/[0.55] font-light mb-8 leading-relaxed">
              Join manufacturing facilities across India using Firmity to reduce downtime, control costs, and keep
              their teams accountable — from factory floor to boardroom.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-[#2b6cb0] hover:bg-[#2563a8] text-white px-8 py-3.5 rounded-xl font-medium transition-colors">
                Book a Free Demo <ArrowRight size={15} />
              </Link>
              <Link href="/contact"
                className="inline-flex items-center gap-2 border border-white/[0.2] hover:border-white/[0.4] text-white/[0.8] hover:text-white px-8 py-3.5 rounded-xl font-light transition-colors">
                Contact Sales
              </Link>
            </div>
          </Reveal>
        </section>

      </main>
      <Footer />
    </>
  )
}
