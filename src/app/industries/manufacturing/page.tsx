import React from "react"
import Link from "next/link"
import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
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

function MetricChip({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center bg-white/[0.07] border border-white/[0.1] rounded-xl px-5 py-3">
      <span className="font-serif text-[1.6rem] font-light text-white leading-none">{value}</span>
      <span className="text-[11px] text-white/[0.55] font-light mt-1 text-center">{label}</span>
    </div>
  )
}

function Outcome({ icon: Icon, value, label }: { icon: LucideIcon; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center text-center px-6 py-8 bg-white rounded-[20px] border border-[#dbe5f0]">
      <div className="w-10 h-10 rounded-xl bg-[#eef3f9] flex items-center justify-center mb-3">
        <Icon size={18} className="text-[#2b6cb0]" />
      </div>
      <span className="font-serif text-[2rem] font-light text-[#111d35] leading-none mb-1">{value}</span>
      <span className="text-[12.5px] text-[#718096] font-light">{label}</span>
    </div>
  )
}

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
        <span className="text-[10.5px] bg-[#eef3f9] text-[#2b6cb0] px-2.5 py-1 rounded-full font-semibold">
          4 tasks
        </span>
      </div>
      <div className="space-y-0">
        {tasks.map(function(item, i) {
          return (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-[#f0f4f8] last:border-0">
              <div>
                <p className="text-[12.5px] font-medium text-[#1a202c]">{item.task}</p>
                <p className="text-[11px] text-[#a0aec0] font-light mt-0.5">
                  {item.asset} · {item.tech}
                </p>
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
        <span className="text-[11px] font-semibold text-[#2b6cb0] flex items-center gap-1">
          View all <ChevronRight size={10} />
        </span>
      </div>
    </div>
  )
}

function ComplaintCard() {
  const complaints = [
    { id: "MNT-041", title: "Hydraulic press pressure drop", area: "Press Shop", status: "In Progress", priority: "High", time: "2h ago" },
    { id: "MNT-040", title: "AC malfunction in control room", area: "Control Room", status: "Resolved", priority: "Medium", time: "5h ago" },
    { id: "MNT-039", title: "Forklift battery not charging", area: "Warehouse", status: "Open", priority: "High", time: "6h ago" },
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
                <span className={"text-[10.5px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 " + statusColor[c.status]}>
                  {c.status}
                </span>
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
    { name: "Ravi Electrical", type: "Contractor", in: "08:02", out: "—", dept: "Electrical", status: "active" },
    { name: "Suresh Mehta", type: "Technician", in: "07:55", out: "—", dept: "Mechanical", status: "active" },
    { name: "Ajay Plumbing Co.", type: "Contractor", in: "09:10", out: "17:30", dept: "Civil", status: "done" },
    { name: "Vijay Kumar", type: "Technician", in: "08:00", out: "—", dept: "Electrical", status: "active" },
  ]
  return (
    <div className="bg-white rounded-[20px] border border-[#dbe5f0] shadow-[0_8px_32px_rgba(17,29,53,0.07)] p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-semibold text-[#718096] tracking-wide uppercase">Today&apos;s Attendance</p>
        <span className="text-[10.5px] bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-semibold">
          3 on-site
        </span>
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
                <p className="text-[11px] text-[#4a5568]">{r.in} → {r.out}</p>
                <div className={"w-1.5 h-1.5 rounded-full ml-auto mt-1 " + (r.status === "active" ? "bg-emerald-400" : "bg-[#cbd5e0]")} />
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
        <span className="text-[10.5px] bg-red-50 text-red-600 px-2.5 py-1 rounded-full font-semibold">
          2 alerts
        </span>
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
                <div
                  className={"h-full rounded-full " + s.bar}
                  style={{ width: Math.min(100, (item.stock / (item.min * 2)) * 100) + "%" }}
                />
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
        <span className="text-[10.5px] bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full font-semibold">
          1 expiring
        </span>
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
                <span
                  className={"text-[10.5px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 " + (c.status === "expiring" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700")}
                >
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

// ─── Feature Section layout ───────────────────────────────────────────────────

function FeatureSection({
  reverse,
  label,
  heading,
  body,
  bullets,
  card,
}: {
  reverse?: boolean
  label: string
  heading: string
  body: string
  bullets: string[]
  card: React.ReactNode
}) {
  const outerCls = "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center " +
    (reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : "")
  return (
    <div className={outerCls}>
      <div>
        <SectionLabel>{label}</SectionLabel>
        <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-light text-[#111d35] leading-snug mb-4">
          {heading}
        </h2>
        <p className="text-[14px] text-[#718096] font-light leading-relaxed mb-6">{body}</p>
        <ul className="space-y-3">
          {bullets.map(function(b, i) {
            return <BulletPoint key={i}>{b}</BulletPoint>
          })}
        </ul>
      </div>
      <div>{card}</div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ManufacturingPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="relative bg-[#0d1829] overflow-hidden">
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-[0.28]"
            poster="/images/factory-poster.jpg"
          >
            <source src="/videos/factory.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1829]/60 via-[#111d35]/40 to-[#111d35]/95 pointer-events-none" />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            aria-hidden="true"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />

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
                  <div
                    key={i}
                    className={"px-7 py-8 " + (i < 2 ? "md:border-r border-white/[0.12] border-b md:border-b-0" : "")}
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#2b6cb0] flex items-center justify-center mb-4">
                      <Icon size={18} className="text-white" />
                    </div>
                    <h3 className="text-[15px] font-semibold text-white mb-2">{title}</h3>
                    <p className="text-[13px] text-white/[0.58] font-light leading-relaxed mb-4">{desc}</p>
                    {cta && (
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-[#2b6cb0] hover:bg-[#2563a8] text-white px-5 py-2.5 rounded-xl text-[13px] font-medium transition-colors"
                      >
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
              {/* LPS Bossard */}
              <svg viewBox="0 0 160 40" className="h-7 w-auto opacity-40 grayscale" aria-label="LPS Bossard">
                <text x="0" y="28" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" fill="#1a202c" letterSpacing="1">LPS</text>
                <text x="54" y="28" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="400" fill="#1a202c">Bossard</text>
              </svg>
              {/* Donaldson */}
              <svg viewBox="0 0 240 40" className="h-7 w-auto opacity-40 grayscale" aria-label="Donaldson Filtration Solutions">
                <text x="0" y="28" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" fill="#1a202c">DONALDSON</text>
              </svg>
              {/* Existing customers */}
              <span className="text-[13px] text-[#a0aec0] font-semibold tracking-wide">Apex Auto Components</span>
              <span className="text-[13px] text-[#a0aec0] font-semibold tracking-wide">IndoPharma Works</span>
              <span className="text-[13px] text-[#a0aec0] font-semibold tracking-wide">Supreme Plastics</span>
            </div>
          </div>
        </section>

        {/* ── Industry Challenges ───────────────────────────────── */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <SectionLabel>Industry Challenges</SectionLabel>
              <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-light text-[#111d35] max-w-2xl mx-auto">
                Manufacturing maintenance is broken by default
              </h2>
              <p className="text-[14px] text-[#718096] font-light mt-4 max-w-xl mx-auto leading-relaxed">
                Most plants run on WhatsApp groups, paper registers, and tribal knowledge. The result is predictable — and expensive.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: Zap,
                  title: "Reactive maintenance culture",
                  desc: "Equipment failures are discovered when production halts. No early warning, no prevention — just costly emergency repairs and lost output.",
                },
                {
                  icon: FileText,
                  title: "Paper-based PPM records",
                  desc: "Checklists filled in after the fact, registers that go missing, and no way to prove compliance during audits. Digital transformation stalls at the maintenance desk.",
                },
                {
                  icon: Package,
                  title: "Spare parts stockouts",
                  desc: "A critical bearing runs out during a breakdown. The machine stays down for hours while procurement scrambles. Inventory is a mystery nobody owns.",
                },
                {
                  icon: Users,
                  title: "Contractor accountability gaps",
                  desc: "Third-party technicians work on your assets with no digital footprint. Work done, hours claimed, and parts used are impossible to verify after the fact.",
                },
                {
                  icon: BarChart3,
                  title: "No cross-plant visibility",
                  desc: "Multi-plant manufacturers operate in silos. Each facility runs its own spreadsheet, making it impossible to benchmark performance or standardise maintenance processes.",
                },
                {
                  icon: AlertTriangle,
                  title: "Missed AMC renewals",
                  desc: "An Annual Maintenance Contract expires unnoticed. The next OEM service visit has no contract backing it — leading to disputes, voids in warranty, and unplanned costs.",
                },
              ].map(function({ icon: Icon, title, desc }, i) {
                return (
                  <div key={i} className="bg-[#f8fafc] rounded-[20px] border border-[#eef3f9] p-6">
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#dbe5f0] flex items-center justify-center mb-4">
                      <Icon size={16} className="text-[#2b6cb0]" />
                    </div>
                    <p className="text-[13.5px] font-semibold text-[#111d35] mb-2">{title}</p>
                    <p className="text-[12.5px] text-[#718096] font-light leading-relaxed">{desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>



        {/* ── Manufacturing Verticals ───────────────────────────── */}
        <section className="bg-[#f8fafc] py-20 px-6 border-t border-[#eef3f9]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <SectionLabel>Sub-Verticals</SectionLabel>
              <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-light text-[#111d35]">
                Built for every type of manufacturing facility
              </h2>
              <p className="text-[14px] text-[#718096] font-light mt-4 max-w-xl mx-auto leading-relaxed">
                Firmity adapts to the unique maintenance needs of each manufacturing sub-vertical — not a one-size-fits-all CMMS.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Auto & Engineering",
                  tag: "Discrete Manufacturing",
                  points: [
                    "Line stoppage root cause tracking",
                    "Tool calibration and gauge management",
                    "Welding equipment PPM schedules",
                    "Multi-line OEE dashboards",
                  ],
                },
                {
                  title: "Pharmaceuticals",
                  tag: "Regulated Manufacturing",
                  points: [
                    "GMP-compliant equipment qualification logs",
                    "Calibration certificate tracking",
                    "Audit-ready digital maintenance records",
                    "Cleanroom HVAC maintenance schedules",
                  ],
                },
                {
                  title: "FMCG & Food Processing",
                  tag: "Process Manufacturing",
                  points: [
                    "Hygiene compliance checklists with photo proof",
                    "Cold chain equipment PPM tracking",
                    "Pest control and sanitisation logs",
                    "Packaging line breakdown management",
                  ],
                },
                {
                  title: "Plastics & Packaging",
                  tag: "Process Manufacturing",
                  points: [
                    "Mould maintenance schedules by shot count",
                    "Injection moulding machine uptime tracking",
                    "Barrel and screw replacement logs",
                    "Utility energy audit checklists",
                  ],
                },
                {
                  title: "Textiles",
                  tag: "Discrete Manufacturing",
                  points: [
                    "Loom and knitting machine PPM schedules",
                    "Motor and bearing replacement tracking",
                    "Humidification system maintenance logs",
                    "Contractor workforce shift management",
                  ],
                },
                {
                  title: "Metal & Fabrication",
                  tag: "Heavy Manufacturing",
                  points: [
                    "Crane and hoist load test scheduling",
                    "CNC machine calibration checklists",
                    "Welding fume extraction maintenance",
                    "Overhead crane safety compliance records",
                  ],
                },
              ].map(function({ title, tag, points }, i) {
                return (
                  <div key={i} className="bg-white rounded-[20px] border border-[#dbe5f0] p-6">
                    <div className="mb-4">
                      <p className="text-[13.5px] font-semibold text-[#111d35] mb-1">{title}</p>
                      <span className="text-[10px] font-semibold text-[#2b6cb0] tracking-[0.15em] uppercase bg-[#eef3f9] px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {points.map(function(p, j) {
                        return (
                          <li key={j} className="flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#2b6cb0] mt-2 flex-shrink-0" />
                            <span className="text-[12.5px] text-[#4a5568] font-light leading-relaxed">{p}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </section>


        {/* ── Feature Sections ──────────────────────────────────── */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-6xl mx-auto space-y-24">

            <FeatureSection
              label="Preventive Maintenance"
              heading="Stop reacting. Start preventing."
              body="High OEE starts with scheduled maintenance, not emergency repairs. Firmity's PPM engine auto-generates work orders for every machine, utility, and asset in your plant — with checklists, technician assignments, and supervisor sign-offs built in. Your team stops firefighting and starts running a proper maintenance programme."
              bullets={[
                "Create PPM templates with checklists, frequency, skill tags, and SOP attachments",
                "Auto-generate work orders on daily, weekly, monthly, or meter-based schedules",
                "Mobile-first task completion with photo evidence and digital sign-off",
                "Manager dashboard shows pending, overdue, and completed tasks in real time",
              ]}
              card={<PPMCard />}
            />

            <FeatureSection
              reverse
              label="Machine Breakdown Management"
              heading="From fault to fix — in minutes, not hours."
              body="When a line goes down, every minute is lost revenue. Firmity lets operators raise complaints from any device in under 30 seconds, routes them to the right technician instantly, and tracks resolution from assignment to closure — with a full audit trail for every fault."
              bullets={[
                "QR-code complaint raising — scan asset, describe fault, submit in 30 seconds",
                "Priority-based routing: critical breakdowns escalate automatically to supervisors",
                "Real-time status visibility for production and maintenance managers",
                "Root cause analysis fields and resolution history per asset for trend reporting",
              ]}
              card={<ComplaintCard />}
            />

            <FeatureSection
              label="Contractor & Technician Attendance"
              heading="Full workforce accountability, every shift."
              body="Manufacturing plants rely on contract labour for specialist maintenance work — welding, electrical, civil, HVAC. Firmity replaces paper attendance registers with digital timestamped logs tied to specific work orders, giving supervisors real-time visibility of who is on-site, where, and doing what."
              bullets={[
                "Digital check-in / check-out with GPS-stamped and time-stamped logs",
                "Link contractor attendance to specific work orders for cost attribution",
                "Department-wise daily attendance summary for production planning",
                "Export attendance records for payroll processing and compliance documentation",
              ]}
              card={<AttendanceCard />}
            />

            <FeatureSection
              reverse
              label="Spare Parts & MRO Inventory"
              heading="The right part, right when you need it."
              body="A spare parts stockout during a breakdown can halt production for a shift or longer. Firmity tracks your entire MRO inventory in real time — from bearings and belts to consumables and lubricants — alerting stores teams before stock hits minimum levels and logging every issue against a work order."
              bullets={[
                "Part-level stock tracking with configurable minimum stock alerts per location",
                "Consumption linked to work orders for accurate maintenance cost tracking",
                "Multi-store support for large facilities with distributed storerooms",
                "Indent and purchase request workflows for replenishment with audit trail",
              ]}
              card={<InventoryCard />}
            />

            <FeatureSection
              label="AMC & Vendor Contract Management"
              heading="Vendor agreements, fully under control."
              body="Annual Maintenance Contracts for DG sets, compressors, HVAC, lifts, and specialised machinery are easy to lose track of across large facilities. Firmity maintains a centralised AMC register with expiry alerts, service visit scheduling, and a document vault — so nothing slips through."
              bullets={[
                "Centralised AMC register with 90 / 60 / 30-day renewal alert cascade",
                "Service visit scheduling with technician attendance and job sign-off",
                "Document vault for contracts, OEM warranties, and service reports",
                "Vendor performance scoring based on response time and resolution quality",
              ]}
              card={<AMCCard />}
            />
          </div>
        </section>

        {/* ── Case Study ────────────────────────────────────────── */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#eef3f9] rounded-[24px] border border-[#dbe5f0] overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
                <div className="p-10 lg:p-14">
                  <p className="text-[11px] font-semibold text-[#2b6cb0] tracking-[0.2em] uppercase mb-4">
                    Case Study
                  </p>
                  <h2 className="font-serif text-[clamp(1.4rem,2.5vw,1.9rem)] font-light text-[#111d35] leading-snug mb-4">
                    How Apex Auto Components cut maintenance costs by 31% in 6 months
                  </h2>
                  <p className="text-[13.5px] text-[#718096] font-light leading-relaxed mb-6">
                    Apex Auto Components, a Pune-based auto parts manufacturer with 4 production lines and 280
                    employees, was struggling with reactive maintenance culture, paper-based PPM schedules, and
                    a spare parts stockroom that nobody trusted. After deploying Firmity across their facility:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {[
                      { value: "31%", label: "Reduction in total maintenance spend" },
                      { value: "4.2h → 47min", label: "Machine breakdown response time" },
                      { value: "₹18L", label: "Inventory waste eliminated annually" },
                    ].map(function(s, i) {
                      return (
                        <div key={i} className="bg-white rounded-xl border border-[#dbe5f0] p-4">
                          <p className="font-serif text-[1.5rem] font-light text-[#111d35] leading-none mb-1">{s.value}</p>
                          <p className="text-[11.5px] text-[#718096] font-light">{s.label}</p>
                        </div>
                      )
                    })}
                  </div>
                  <blockquote className="border-l-2 border-[#2b6cb0] pl-4">
                    <p className="text-[13.5px] text-[#4a5568] font-light italic leading-relaxed">
                      &ldquo;We used to find out about machine failures when production stopped. Now our technicians get
                      notified before I even know there&apos;s an issue. Firmity changed how our entire maintenance
                      team operates.&rdquo;
                    </p>
                    <p className="text-[12px] text-[#718096] mt-2 font-medium not-italic">
                      — Rakesh Sharma, Maintenance Manager, Apex Auto Components
                    </p>
                  </blockquote>
                </div>
                <div className="bg-[#111d35] p-10 flex flex-col justify-center gap-6">
                  <div>
                    <p className="text-[10.5px] text-white/[0.4] tracking-widest uppercase mb-1">Company</p>
                    <p className="text-[13px] text-white font-light">Apex Auto Components Pvt. Ltd.</p>
                  </div>
                  <div>
                    <p className="text-[10.5px] text-white/[0.4] tracking-widest uppercase mb-1">Location</p>
                    <p className="text-[13px] text-white font-light">Pune, Maharashtra</p>
                  </div>
                  <div>
                    <p className="text-[10.5px] text-white/[0.4] tracking-widest uppercase mb-1">Size</p>
                    <p className="text-[13px] text-white font-light">280 employees, 4 production lines</p>
                  </div>
                  <div>
                    <p className="text-[10.5px] text-white/[0.4] tracking-widest uppercase mb-1">Modules Used</p>
                    <div className="space-y-1">
                      {["PPM Scheduling", "Machine Complaints", "Spare Parts Inventory", "AMC Tracking", "Contractor Attendance"].map(function(m) {
                        return (
                          <div key={m} className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#63b3ed]" />
                            <span className="text-[12px] text-white/[0.7] font-light">{m}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ── Related Industries ────────────────────────────────── */}
        <section className="bg-white py-16 px-6 border-t border-[#eef3f9]">
          <div className="max-w-5xl mx-auto">
            <p className="text-[11px] font-semibold text-[#718096] tracking-[0.2em] uppercase mb-6 text-center">
              Explore Other Industries
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Educational Institutions", desc: "Campus maintenance, student complaint helpdesk, and hostel management.", href: "/industries/educational" },
                { label: "Residential Communities", desc: "Gate management, resident complaints, and society equipment maintenance.", href: "/industries/residential" },
              ].map(function(r) {
                return (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="group flex items-center justify-between p-6 rounded-[20px] border border-[#dbe5f0] hover:border-[#2b6cb0] hover:bg-[#eef3f9] transition-all"
                  >
                    <div>
                      <p className="text-[13.5px] font-semibold text-[#111d35] mb-1">{r.label}</p>
                      <p className="text-[12.5px] text-[#718096] font-light">{r.desc}</p>
                    </div>
                    <ArrowRight size={16} className="text-[#2b6cb0] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4" />
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section className="bg-[#111d35] py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-[clamp(1.6rem,4vw,2.5rem)] font-light text-white mb-4">
              Ready to transform your facility maintenance?
            </h2>
            <p className="text-[14px] text-white/[0.55] font-light mb-8 leading-relaxed">
              Join manufacturing facilities across India using Firmity to reduce downtime, control costs, and keep
              their teams accountable — from factory floor to boardroom.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#2b6cb0] hover:bg-[#2563a8] text-white px-8 py-3.5 rounded-xl font-medium transition-colors"
              >
                Book a Free Demo <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/[0.2] hover:border-white/[0.4] text-white/[0.8] hover:text-white px-8 py-3.5 rounded-xl font-light transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
