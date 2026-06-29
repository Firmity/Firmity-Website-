import Link from "next/link"
import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import {
  ArrowRight,
  CheckCircle,
  Calendar,
  Users,
  FileText,
  Shield,
  Package,
  MessageSquare,
  ChevronRight,
  Clock,
  Activity,
  Star,
  type LucideIcon,
} from "lucide-react"

// ─── Shared sub-components ───────────────────────────────────────────────────

function MetricChip({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center bg-emerald-900/45 border border-emerald-700/40 rounded-xl px-5 py-3">
      <span className="text-[1.6rem] font-semibold text-emerald-100 leading-none">{value}</span>
      <span className="text-[11px] text-emerald-200/65 mt-1 text-center">{label}</span>
    </div>
  )
}

function Outcome({ icon: Icon, value, label, bgClass, iconClass, valueClass }: {
  icon: LucideIcon; value: string; label: string
  bgClass: string; iconClass: string; valueClass: string
}) {
  return (
    <div className="flex flex-col items-center text-center px-6 py-8 bg-white rounded-[20px] border border-[#dbe5f0]">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${bgClass}`}>
        <Icon size={18} className={iconClass} />
      </div>
      <span className={`font-serif text-[2rem] font-light leading-none mb-1 ${valueClass}`}>{value}</span>
      <span className="text-[12.5px] text-[#718096] font-light">{label}</span>
    </div>
  )
}

function SectionLabel({ children, color = "text-emerald-700" }: { children: React.ReactNode; color?: string }) {
  return (
    <p className={`text-[11px] font-semibold tracking-[0.2em] uppercase mb-3 ${color}`}>{children}</p>
  )
}

function BulletPoint({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <CheckCircle size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
      <span className="text-[13.5px] text-[#4a5568] font-light leading-relaxed">{children}</span>
    </li>
  )
}

// ─── Mock UI Cards ────────────────────────────────────────────────────────────

function GateCard() {
  const log = [
    { name: "Ramesh Delivery (Zomato)", type: "Delivery", flat: "A-402", vehicle: "On Foot", in: "12:15", out: "12:23", status: "exited" },
    { name: "Sunita Verma", type: "Resident", flat: "B-201", vehicle: "DL 7C 1234", in: "11:48", out: "—", status: "on-premises" },
    { name: "Nikhil Plumbing", type: "Contractor", flat: "C-104", vehicle: "UP 32 BB 9012", in: "10:00", out: "—", status: "on-premises" },
    { name: "Amazon Delivery", type: "Delivery", flat: "A-301", vehicle: "On Foot", in: "09:32", out: "09:40", status: "exited" },
  ]
  return (
    <div className="bg-white rounded-[20px] border border-[#dbe5f0] shadow-[0_8px_32px_rgba(17,29,53,0.07)] p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-semibold text-[#718096] tracking-wide uppercase">Gate Log — Today</p>
        <span className="text-[10.5px] bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-semibold">2 on-premises</span>
      </div>
      <div className="space-y-3">
        {log.map((v, i) => (
          <div key={i} className="p-3 rounded-xl bg-[#f8fafc] border border-[#eef3f9]">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[12px] font-semibold text-[#1a202c]">{v.name}</p>
                <p className="text-[11px] text-[#a0aec0] mt-0.5">{v.type} · {v.flat} · {v.vehicle}</p>
              </div>
              <span className={`text-[10.5px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${v.status === "on-premises" ? "bg-emerald-50 text-emerald-700" : "bg-[#f0f4f8] text-[#718096]"}`}>
                {v.status === "on-premises" ? "On-premises" : "Exited"}
              </span>
            </div>
            <p className="text-[10.5px] text-[#a0aec0] mt-1.5">In: {v.in} · Out: {v.out}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ComplaintCard() {
  const tickets = [
    { id: "TKT-094", title: "Lift not operational — Block A", area: "Common Area", status: "In Progress", by: "Priya T., A-402", time: "2h ago" },
    { id: "TKT-093", title: "Water leakage in car park", area: "Parking Level 1", status: "Open", by: "Rahul S., B-201", time: "5h ago" },
    { id: "TKT-092", title: "Street light fused — Gate 2 side", area: "Perimeter", status: "Resolved", by: "Megha R., C-105", time: "Yesterday" },
  ]
  const statusColor: Record<string, string> = {
    "In Progress": "bg-blue-50 text-blue-700",
    Resolved: "bg-emerald-50 text-emerald-700",
    Open: "bg-amber-50 text-amber-700",
  }
  return (
    <div className="bg-white rounded-[20px] border border-[#dbe5f0] shadow-[0_8px_32px_rgba(17,29,53,0.07)] p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-semibold text-[#718096] tracking-wide uppercase">Resident Complaints</p>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-[10.5px] text-[#718096]">2 open</span>
        </div>
      </div>
      <div className="space-y-3">
        {tickets.map((t, i) => (
          <div key={i} className="p-3 rounded-xl bg-[#f8fafc] border border-[#eef3f9]">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[12px] font-semibold text-[#1a202c]">{t.title}</p>
                <p className="text-[11px] text-[#a0aec0] mt-0.5">{t.id} · {t.area}</p>
              </div>
              <span className={`text-[10.5px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${statusColor[t.status]}`}>
                {t.status}
              </span>
            </div>
            <p className="text-[10.5px] text-[#a0aec0] mt-1.5">Raised by {t.by} · {t.time}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-[#f0f4f8] flex items-center justify-between">
        <span className="text-[11px] text-[#a0aec0]">38 tickets resolved this month</span>
        <span className="text-[11px] font-semibold text-[#2b6cb0] flex items-center gap-1">View all <ChevronRight size={10} /></span>
      </div>
    </div>
  )
}

function CommonAreaCard() {
  const tasks = [
    { area: "Swimming Pool", task: "Water quality check + chlorination", freq: "Daily", last: "Today 06:00", next: "Tomorrow 06:00", status: "ok" },
    { area: "Gym Equipment", task: "Lubrication + safety inspection", freq: "Weekly", last: "Mon, 23 Jun", next: "Mon, 30 Jun", status: "upcoming" },
    { area: "Fire Extinguishers", task: "Pressure check + log update", freq: "Monthly", last: "1 Jun 2026", next: "1 Jul 2026", status: "upcoming" },
    { area: "Rooftop Pump", task: "Pump operation check", freq: "Weekly", last: "Mon, 23 Jun", next: "Mon, 30 Jun", status: "ok" },
  ]
  return (
    <div className="bg-white rounded-[20px] border border-[#dbe5f0] shadow-[0_8px_32px_rgba(17,29,53,0.07)] p-5">
      <p className="text-[11px] font-semibold text-[#718096] tracking-wide uppercase mb-4">Common Area PPM Schedule</p>
      <div className="space-y-3">
        {tasks.map((t, i) => (
          <div key={i} className="p-3 rounded-xl bg-[#f8fafc] border border-[#eef3f9]">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[12px] font-semibold text-[#1a202c]">{t.area}</p>
                <p className="text-[11px] text-[#a0aec0] mt-0.5">{t.task}</p>
              </div>
              <span className={`text-[10.5px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${t.status === "ok" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}`}>
                {t.freq}
              </span>
            </div>
            <p className="text-[10.5px] text-[#a0aec0] mt-1.5">Last: {t.last} · Next: {t.next}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function StaffCard() {
  const staff = [
    { name: "Suresh (Gate — Shift A)", dept: "Security", in: "06:00", out: "—", active: true },
    { name: "Kamala (Housekeeping)", dept: "Housekeeping", in: "07:00", out: "—", active: true },
    { name: "Deepak (Gate — Shift A)", dept: "Security", in: "06:00", out: "—", active: true },
    { name: "Ranjit (Plumbing)", dept: "Contractor", in: "09:00", out: "13:00", active: false },
  ]
  return (
    <div className="bg-white rounded-[20px] border border-[#dbe5f0] shadow-[0_8px_32px_rgba(17,29,53,0.07)] p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-semibold text-[#718096] tracking-wide uppercase">Staff Attendance — Today</p>
        <span className="text-[10.5px] bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-semibold">3 on-duty</span>
      </div>
      <div className="space-y-0">
        {staff.map((s, i) => (
          <div key={i} className="flex items-center gap-3 py-2.5 border-b border-[#f0f4f8] last:border-0">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-semibold text-emerald-700">{s.name[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-[#1a202c] truncate">{s.name}</p>
              <p className="text-[10.5px] text-[#a0aec0]">{s.dept}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-[11px] text-[#4a5568]">{s.in} → {s.out === "—" ? "On duty" : s.out}</p>
              <div className={`w-1.5 h-1.5 rounded-full ml-auto mt-1 ${s.active ? "bg-emerald-400" : "bg-[#cbd5e0]"}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function InventoryCard() {
  const contracts = [
    { vendor: "ThyssenKrupp Lifts", scope: "Lifts × 3", expiry: "15 Nov 2026", daysLeft: 144, status: "active" },
    { vendor: "Kirloskar Electric", scope: "DG Set × 1", expiry: "05 Aug 2026", daysLeft: 42, status: "expiring" },
    { vendor: "Aquaguard Services", scope: "Water Filters × 6", expiry: "20 Mar 2027", daysLeft: 268, status: "active" },
  ]
  return (
    <div className="bg-white rounded-[20px] border border-[#dbe5f0] shadow-[0_8px_32px_rgba(17,29,53,0.07)] p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-semibold text-[#718096] tracking-wide uppercase">AMC Register</p>
        <span className="text-[10.5px] bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full font-semibold">1 expiring</span>
      </div>
      <div className="space-y-3">
        {contracts.map((c, i) => (
          <div key={i} className="p-3 rounded-xl bg-[#f8fafc] border border-[#eef3f9]">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[12px] font-semibold text-[#1a202c]">{c.vendor}</p>
                <p className="text-[11px] text-[#a0aec0] mt-0.5">{c.scope}</p>
              </div>
              <span className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${c.status === "expiring" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>
                {c.status === "expiring" ? "Expiring soon" : "Active"}
              </span>
            </div>
            <p className="text-[10.5px] text-[#a0aec0] mt-1.5">Expires {c.expiry} · {c.daysLeft} days left</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Feature Section ──────────────────────────────────────────────────────────

function FeatureSection({
  reverse, label, labelColor = "text-emerald-700", heading, body, bullets, card,
}: {
  reverse?: boolean; label: string; labelColor?: string
  heading: string; body: string; bullets: string[]; card: React.ReactNode
}) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""}`}>
      <div>
        <SectionLabel color={labelColor}>{label}</SectionLabel>
        <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-light text-[#111d35] leading-snug mb-4">{heading}</h2>
        <p className="text-[14px] text-[#718096] font-light leading-relaxed mb-6">{body}</p>
        <ul className="space-y-3">
          {bullets.map((b, i) => <BulletPoint key={i}>{b}</BulletPoint>)}
        </ul>
      </div>
      <div>{card}</div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ResidentialPage() {
  return (
    <>
      <Navigation />
      <main>

        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="relative bg-[#052e16] overflow-hidden">
          {/* Video background — place /public/videos/residential.mp4 to activate */}
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-[0.22]"
            poster="/images/residential-poster.jpg"
          >
            <source src="/videos/residential.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#052e16]/65 via-[#14532d]/45 to-[#052e16]/90 pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]" aria-hidden="true"
            style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: "40px 40px" }}
          />

          <div className="relative max-w-6xl mx-auto px-6">
            {/* Top content */}
            <div className="text-center pt-20 pb-14">
              <p className="text-[11px] font-semibold text-emerald-300 tracking-[0.22em] uppercase mb-5">
                Firmity for Residential Communities
              </p>
              <h1 className="font-serif text-[clamp(2rem,5vw,3.25rem)] font-light text-white leading-[1.15] mb-5">
                Your Society, Safe and{" "}
                <span className="italic text-emerald-300">Well-Maintained.</span>
              </h1>
              <p className="text-[15px] text-white/[0.68] font-light max-w-2xl mx-auto leading-relaxed mb-10">
                Gate management, resident complaints, preventive maintenance, and staff tracking — everything your
                facility management team needs to run a residential community safely and well.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
                <MetricChip value="45%" label="Reduction in resident complaints" />
                <MetricChip value="3×" label="Faster maintenance resolution" />
                <MetricChip value="100%" label="Gate entries digitised" />
                <MetricChip value="2 wks" label="To go live" />
              </div>
            </div>

            {/* 3-column benefit grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/[0.12]">
              {[
                {
                  bg: "bg-emerald-600",
                  Icon: Shield,
                  title: "Your society, safer for every family",
                  desc: "Digital gate log, pre-authorised visitor lists, and a complete audit trail for every person who enters your society — no paper slips, no blind spots.",
                  cta: false,
                },
                {
                  bg: "bg-sky-500",
                  Icon: MessageSquare,
                  title: "Complaints resolved. Residents happy.",
                  desc: "Residents raise issues from their phones. Your team receives, assigns, and resolves them with full accountability — no more WhatsApp groups for facility problems.",
                  cta: false,
                },
                {
                  bg: "bg-teal-600",
                  Icon: Calendar,
                  title: "Common areas, always in good shape",
                  desc: "Scheduled upkeep for the gym, pool, lifts, DG sets, and more. Preventive maintenance that prevents breakdowns — not reacts to them.",
                  cta: true,
                },
              ].map(({ bg, Icon, title, desc, cta }, i) => (
                <div key={i} className={`px-7 py-8 ${i < 2 ? "md:border-r border-white/[0.12] border-b md:border-b-0" : ""}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${bg}`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-white mb-2">{title}</h3>
                  <p className="text-[13px] text-white/[0.58] font-light leading-relaxed mb-4">{desc}</p>
                  {cta && (
                    <Link href="/contact"
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-[13px] font-medium transition-colors">
                      Book a Demo <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trusted by strip ──────────────────────────────────── */}
        <section className="bg-emerald-50 border-b border-emerald-100 py-7 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-[11px] text-emerald-600/60 tracking-widest uppercase mb-5">
              Trusted by residential societies across India
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
              {["Greenwood Heights", "Palm Grove Residency", "The Palms Society", "Vrindavan Apartments", "Prestige Sunrise"].map((name) => (
                <span key={name} className="text-[13px] text-emerald-900/55 font-medium">{name}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Outcomes ──────────────────────────────────────────── */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <SectionLabel>What Firmity Delivers</SectionLabel>
              <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-light text-[#111d35]">
                Outcomes residential communities measure
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Outcome icon={Clock} value="45%" label="Reduction in resident complaint resolution time"
                bgClass="bg-emerald-50" iconClass="text-emerald-600" valueClass="text-emerald-700" />
              <Outcome icon={Shield} value="100%" label="Gate entries and exits digitally logged"
                bgClass="bg-sky-50" iconClass="text-sky-600" valueClass="text-sky-700" />
              <Outcome icon={Star} value="4.7/5" label="Resident satisfaction with facility management"
                bgClass="bg-teal-50" iconClass="text-teal-600" valueClass="text-teal-700" />
              <Outcome icon={Activity} value="3×" label="Faster response to maintenance breakdowns"
                bgClass="bg-green-50" iconClass="text-green-700" valueClass="text-green-700" />
            </div>
          </div>
        </section>

        {/* ── Feature Sections ──────────────────────────────────── */}
        <section className="bg-[#f6fbf8] py-20 px-6 border-t border-emerald-100">
          <div className="max-w-6xl mx-auto space-y-24">

            <FeatureSection
              labelColor="text-emerald-700"
              label="Gate & Visitor Management"
              heading="Every visitor logged. Every family safer."
              body="Replace paper visitor books with a structured digital gate log. Security guards check in visitors from a tablet, residents pre-authorise expected guests via the app, and facility managers get a real-time view of who is on-premises at any given moment."
              bullets={[
                "Pre-authorise expected visitors — housemaids, delivery, family — from a resident app",
                "Security guard captures visitor name, photo, purpose, and vehicle at entry",
                "Instant SMS / WhatsApp to resident when their visitor arrives at the gate",
                "Searchable gate log with entry and exit timestamps, accessible to the management committee",
              ]}
              card={<GateCard />}
            />

            <FeatureSection
              reverse
              labelColor="text-sky-600"
              label="Resident Complaint Management"
              heading="From lift failures to water leaks — resolved fast."
              body="Residents raise complaints from their phones in under a minute. Facility staff receive structured tickets with location tags, photos, and priority. Management committees get a real-time dashboard — no more chasing updates over calls or WhatsApp."
              bullets={[
                "Residents submit complaints with photos directly from their phones",
                "Category-based routing: electrical, plumbing, civil, lift, housekeeping",
                "Real-time resolution status visible to the resident who raised the complaint",
                "SLA tracking and escalation for complaints unresolved beyond threshold",
              ]}
              card={<ComplaintCard />}
            />

            <FeatureSection
              labelColor="text-teal-700"
              label="Common Area Preventive Maintenance"
              heading="Scheduled care for every shared space."
              body="Pool, gym, garden, rooftop, and parking — common areas need regular upkeep to stay safe and functional. Firmity schedules and tracks every recurring maintenance task, so nothing slips through the cracks between caretaker visits."
              bullets={[
                "PPM schedules for pool, gym equipment, lifts, generators, and fire systems",
                "Task completion confirmed by caretaker with photo and digital sign-off",
                "Automatic scheduling based on daily, weekly, or monthly frequency",
                "Full history log for each asset — auditable at AGMs or during handover",
              ]}
              card={<CommonAreaCard />}
            />

            <FeatureSection
              reverse
              labelColor="text-green-700"
              label="Staff & Contractor Attendance"
              heading="Security, housekeeping, and contractors — accounted for."
              body="Societies employ multiple categories of staff, often across shifts. Firmity tracks attendance digitally for all of them — security guards, housekeeping staff, gardeners, and visiting contractors — giving management a clean payroll export every month."
              bullets={[
                "Digital check-in/out for all society staff with time-stamps per shift",
                "Shift-wise attendance summary per department for management review",
                "Contractor attendance linked to work orders and task completion records",
                "Monthly export for salary computation and contractor billing",
              ]}
              card={<StaffCard />}
            />

            <FeatureSection
              labelColor="text-cyan-700"
              label="AMC & Inventory Management"
              heading="Critical equipment — always in contract, always maintained."
              body="An expired AMC for a society lift or DG set can leave 300 families stranded. Firmity maintains a central AMC register with expiry alerts at 90, 60, and 30 days — so renewals happen on time and equipment never lapses out of warranty."
              bullets={[
                "Central AMC register for lifts, generators, water systems, and fire equipment",
                "Renewal alerts at 90, 60, and 30 days before contract expiry",
                "Vendor service visit scheduling with digital sign-off and report upload",
                "Document vault for AMC contracts, warranties, and compliance certificates",
              ]}
              card={<InventoryCard />}
            />
          </div>
        </section>

        {/* ── Case Study ────────────────────────────────────────── */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-emerald-50 rounded-[24px] border border-emerald-100 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
                <div className="p-10 lg:p-14">
                  <p className="text-[11px] font-semibold text-emerald-700 tracking-[0.2em] uppercase mb-4">Case Study</p>
                  <h2 className="font-serif text-[clamp(1.4rem,2.5vw,1.9rem)] font-light text-[#111d35] leading-snug mb-4">
                    How Greenwood Heights reduced maintenance complaints by 45% in the first quarter
                  </h2>
                  <p className="text-[13.5px] text-[#718096] font-light leading-relaxed mb-6">
                    Greenwood Heights, a 320-flat residential society in Lucknow, was managing facility requests through
                    WhatsApp groups and a paper visitor register at the gate. After deploying Firmity:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {[
                      { value: "45%", label: "Fewer unresolved complaints per quarter" },
                      { value: "4 days → 22 hrs", label: "Average maintenance resolution time" },
                      { value: "100%", label: "Gate visitor entries now digital" },
                    ].map((s, i) => (
                      <div key={i} className="bg-white rounded-xl border border-emerald-100 p-4">
                        <p className="font-serif text-[1.5rem] font-light text-emerald-700 leading-none mb-1">{s.value}</p>
                        <p className="text-[11.5px] text-[#718096] font-light">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <blockquote className="border-l-2 border-emerald-600 pl-4">
                    <p className="text-[13.5px] text-[#4a5568] font-light italic leading-relaxed">
                      &ldquo;The management committee used to get calls all weekend about broken lifts or seepage issues.
                      Now residents raise a ticket, our team gets it, and we close it. The committee can actually see
                      the numbers — it&apos;s changed how we run the AGM as well.&rdquo;
                    </p>
                    <p className="text-[12px] text-[#718096] mt-2 font-medium not-italic">
                      — Anita Khanna, Secretary, Greenwood Heights RWA, Lucknow
                    </p>
                  </blockquote>
                </div>
                <div className="bg-[#14532d] p-10 flex flex-col justify-center gap-6">
                  {[
                    { label: "Society", value: "Greenwood Heights" },
                    { label: "Location", value: "Lucknow, Uttar Pradesh" },
                    { label: "Size", value: "320 flats · 3 towers" },
                  ].map((item, i) => (
                    <div key={i}>
                      <p className="text-[10.5px] text-emerald-200/35 tracking-widest uppercase mb-1">{item.label}</p>
                      <p className="text-[13px] text-white font-light">{item.value}</p>
                    </div>
                  ))}
                  <div>
                    <p className="text-[10.5px] text-emerald-200/35 tracking-widest uppercase mb-1">Modules Used</p>
                    <div className="space-y-1">
                      {["Gate & Visitor Management", "Resident Complaints", "Common Area PPM", "Staff Attendance", "AMC Register"].map((m) => (
                        <div key={m} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-emerald-300" />
                          <span className="text-[12px] text-white/[0.7] font-light">{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Capabilities ──────────────────────────────────────── */}
        <section className="bg-[#f6fbf8] py-20 px-6 border-t border-emerald-100">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <SectionLabel>Platform Capabilities</SectionLabel>
              <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-light text-[#111d35]">
                Everything your society facility team needs
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: Shield,        title: "Gate & Visitor Management",   desc: "Digital gate log with pre-authorisation, photo capture, and resident notifications",         bg: "bg-emerald-50", iconCls: "text-emerald-700" },
                { icon: MessageSquare, title: "Resident Complaints",          desc: "Photo-based complaint submission with category routing, status tracking, and SLA monitoring", bg: "bg-sky-50",     iconCls: "text-sky-600" },
                { icon: Calendar,      title: "Common Area PPM",              desc: "Scheduled upkeep for pool, gym, lifts, DG, and all shared infrastructure",                   bg: "bg-teal-50",    iconCls: "text-teal-700" },
                { icon: Users,         title: "Staff Attendance",             desc: "Digital attendance for security, housekeeping, and contractors with shift reports",           bg: "bg-green-50",   iconCls: "text-green-700" },
                { icon: FileText,      title: "AMC Management",               desc: "Contract register with renewal alerts, service visit scheduling, and document vault",         bg: "bg-emerald-50", iconCls: "text-emerald-600" },
                { icon: Package,       title: "Inventory & Spares",           desc: "Track consumables and spare parts usage against maintenance tasks and vendors",               bg: "bg-sky-50",     iconCls: "text-sky-700" },
              ].map(({ icon: Icon, title, desc, bg, iconCls }, i) => (
                <div key={i} className="bg-white rounded-[20px] border border-[#dbe5f0] p-6 hover:border-emerald-300 hover:shadow-[0_4px_16px_rgba(20,83,45,0.08)] transition-all">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-4 ${bg}`}>
                    <Icon size={16} className={iconCls} />
                  </div>
                  <p className="text-[13.5px] font-semibold text-[#111d35] mb-1.5">{title}</p>
                  <p className="text-[12.5px] text-[#718096] font-light leading-relaxed">{desc}</p>
                </div>
              ))}
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
                { label: "Manufacturing", desc: "PPM scheduling, machine complaint management, and spare parts inventory for factories.", href: "/industries/manufacturing" },
                { label: "Educational Institutions", desc: "Helpdesk, hostel maintenance, visitor management, and staff attendance for campuses.", href: "/industries/educational" },
              ].map((r) => (
                <Link key={r.href} href={r.href}
                  className="group flex items-center justify-between p-6 rounded-[20px] border border-[#dbe5f0] hover:border-emerald-400 hover:bg-emerald-50 transition-all">
                  <div>
                    <p className="text-[13.5px] font-semibold text-[#111d35] mb-1">{r.label}</p>
                    <p className="text-[12.5px] text-[#718096] font-light">{r.desc}</p>
                  </div>
                  <ArrowRight size={16} className="text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section className="bg-[#14532d] py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-[clamp(1.6rem,4vw,2.4rem)] font-light text-white mb-4">
              Give your residents the society experience they deserve.
            </h2>
            <p className="text-[14px] text-white/[0.62] font-light mb-8 leading-relaxed">
              Firmity is purpose-built for the complexity of residential facility management — from multi-tower gate
              coordination to vendor AMC tracking.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors">
                Book a Free Demo <ArrowRight size={15} />
              </Link>
              <Link href="/contact"
                className="inline-flex items-center gap-2 border border-white/[0.25] hover:border-white/[0.5] text-white/[0.85] hover:text-white px-8 py-3.5 rounded-xl transition-colors">
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
