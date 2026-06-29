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
  BookOpen,
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
    <div className="flex flex-col items-center bg-[#7c2d12]/55 border border-[#c2410c]/40 rounded-xl px-5 py-3">
      <span className="text-[1.6rem] font-bold text-amber-100 leading-none">{value}</span>
      <span className="text-[11px] text-amber-200/65 mt-1 text-center">{label}</span>
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

function SectionLabel({ children, color = "text-amber-500" }: { children: React.ReactNode; color?: string }) {
  return (
    <p className={`text-[11px] font-semibold tracking-[0.2em] uppercase mb-3 ${color}`}>{children}</p>
  )
}

function BulletPoint({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <CheckCircle size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
      <span className="text-[13.5px] text-[#4a5568] font-light leading-relaxed">{children}</span>
    </li>
  )
}

// ─── Mock UI Cards ────────────────────────────────────────────────────────────

function ComplaintCard() {
  const tickets = [
    { id: "TKT-182", title: "Projector not working", location: "Room 204 — CS Dept.", status: "In Progress", by: "Prof. Anand", time: "1h ago" },
    { id: "TKT-181", title: "Water leakage in washroom", location: "Block C, Ground Floor", status: "Open", by: "Student", time: "3h ago" },
    { id: "TKT-180", title: "AC compressor noise", location: "Staff Room — Block A", status: "Resolved", by: "Admin Staff", time: "Yesterday" },
  ]
  const statusColor: Record<string, string> = {
    "In Progress": "bg-blue-50 text-blue-700",
    Resolved: "bg-emerald-50 text-emerald-700",
    Open: "bg-amber-50 text-amber-700",
  }
  return (
    <div className="bg-white rounded-[20px] border border-[#dbe5f0] shadow-[0_8px_32px_rgba(17,29,53,0.07)] p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-semibold text-[#718096] tracking-wide uppercase">Helpdesk Tickets</p>
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
                <p className="text-[11px] text-[#a0aec0] mt-0.5">{t.id} · {t.location}</p>
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
        <span className="text-[11px] text-[#a0aec0]">47 tickets resolved this month</span>
        <span className="text-[11px] font-semibold text-[#2b6cb0] flex items-center gap-1">View all <ChevronRight size={10} /></span>
      </div>
    </div>
  )
}

function HostelCard() {
  const floors = [
    { floor: "Floor 1", open: 0, inProgress: 0, status: "ok" },
    { floor: "Floor 2", open: 1, inProgress: 2, status: "warn" },
    { floor: "Floor 3", open: 0, inProgress: 1, status: "info" },
    { floor: "Floor 4", open: 3, inProgress: 1, status: "warn" },
  ]
  const recent = [
    { room: "Room 312", issue: "Tap dripping", status: "Scheduled", tech: "Raju P." },
    { room: "Room 214", issue: "Light fitting loose", status: "In Progress", tech: "Mohan S." },
    { room: "Room 401", issue: "Door lock broken", status: "Open", tech: "—" },
  ]
  return (
    <div className="bg-white rounded-[20px] border border-[#dbe5f0] shadow-[0_8px_32px_rgba(17,29,53,0.07)] p-5 space-y-4">
      <p className="text-[11px] font-semibold text-[#718096] tracking-wide uppercase">Hostel Block A — Maintenance</p>
      <div className="grid grid-cols-4 gap-2">
        {floors.map((f, i) => (
          <div key={i} className={`rounded-xl p-2.5 text-center ${f.status === "warn" ? "bg-amber-50 border border-amber-100" : f.status === "info" ? "bg-blue-50 border border-blue-100" : "bg-emerald-50 border border-emerald-100"}`}>
            <p className="text-[10px] font-semibold text-[#718096]">{f.floor}</p>
            <p className={`text-[16px] font-serif font-light mt-0.5 ${f.open > 0 ? "text-amber-700" : "text-emerald-700"}`}>
              {f.open + f.inProgress}
            </p>
            <p className="text-[9.5px] text-[#a0aec0]">tickets</p>
          </div>
        ))}
      </div>
      <div className="space-y-2 pt-1">
        {recent.map((r, i) => (
          <div key={i} className="flex items-center justify-between py-1.5 border-b border-[#f0f4f8] last:border-0">
            <div>
              <p className="text-[12px] font-medium text-[#1a202c]">{r.issue}</p>
              <p className="text-[10.5px] text-[#a0aec0]">{r.room} · {r.tech}</p>
            </div>
            <span className="text-[10.5px] text-[#718096]">{r.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function VisitorCard() {
  const visitors = [
    { name: "Priya Sharma", purpose: "Parent Visit", vehicle: "DL 4C 2341", host: "Ananya Sharma (Rm 204)", in: "10:15", out: "—", status: "on-campus" },
    { name: "TechSupport India", purpose: "Vendor", vehicle: "UP 32 AK 5678", host: "IT Dept.", in: "09:30", out: "11:45", status: "exited" },
    { name: "Raj Constructions", purpose: "Contractor", vehicle: "On Foot", host: "Civil Dept.", in: "08:00", out: "—", status: "on-campus" },
  ]
  return (
    <div className="bg-white rounded-[20px] border border-[#dbe5f0] shadow-[0_8px_32px_rgba(17,29,53,0.07)] p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-semibold text-[#718096] tracking-wide uppercase">Gate Log — Today</p>
        <span className="text-[10.5px] bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-semibold">2 on-campus</span>
      </div>
      <div className="space-y-3">
        {visitors.map((v, i) => (
          <div key={i} className="p-3 rounded-xl bg-[#f8fafc] border border-[#eef3f9]">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[12px] font-semibold text-[#1a202c]">{v.name}</p>
                <p className="text-[11px] text-[#a0aec0] mt-0.5">{v.purpose} · {v.host}</p>
              </div>
              <span className={`text-[10.5px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${v.status === "on-campus" ? "bg-emerald-50 text-emerald-700" : "bg-[#f0f4f8] text-[#718096]"}`}>
                {v.status === "on-campus" ? "On Campus" : "Exited"}
              </span>
            </div>
            <p className="text-[10.5px] text-[#a0aec0] mt-1.5">{v.vehicle} · In: {v.in} · Out: {v.out}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function AMCCard() {
  const contracts = [
    { vendor: "Otis India", scope: "Lifts × 4", expiry: "30 Nov 2026", daysLeft: 159, status: "active" },
    { vendor: "Blue Star Service", scope: "HVAC Units × 12", expiry: "10 Aug 2026", daysLeft: 47, status: "expiring" },
    { vendor: "Kirloskar Electric", scope: "DG Set × 2", expiry: "20 Feb 2027", daysLeft: 241, status: "active" },
  ]
  return (
    <div className="bg-white rounded-[20px] border border-[#dbe5f0] shadow-[0_8px_32px_rgba(17,29,53,0.07)] p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-semibold text-[#718096] tracking-wide uppercase">Equipment AMC Register</p>
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

function AttendanceCard() {
  const staff = [
    { name: "Kumar (Security)", dept: "Security", shift: "Morning", in: "06:00", out: "—", active: true },
    { name: "Sangeeta (Housekeeping)", dept: "Housekeeping", shift: "Morning", in: "06:30", out: "—", active: true },
    { name: "Raju Electricals", dept: "Contractor", shift: "Day", in: "09:00", out: "13:30", active: false },
    { name: "Mohan (Housekeeping)", dept: "Housekeeping", shift: "Morning", in: "06:30", out: "14:30", active: false },
  ]
  return (
    <div className="bg-white rounded-[20px] border border-[#dbe5f0] shadow-[0_8px_32px_rgba(17,29,53,0.07)] p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-semibold text-[#718096] tracking-wide uppercase">Staff Attendance — Today</p>
        <span className="text-[10.5px] bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-semibold">2 on-duty</span>
      </div>
      <div className="space-y-0">
        {staff.map((s, i) => (
          <div key={i} className="flex items-center gap-3 py-2.5 border-b border-[#f0f4f8] last:border-0">
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-semibold text-amber-700">{s.name[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-[#1a202c] truncate">{s.name}</p>
              <p className="text-[10.5px] text-[#a0aec0]">{s.dept} · {s.shift}</p>
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

// ─── Feature Section ──────────────────────────────────────────────────────────

function FeatureSection({
  reverse, label, labelColor = "text-amber-600", heading, body, bullets, card,
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

export default function EducationalPage() {
  return (
    <>
      <Navigation />
      <main>

        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="relative bg-[#431407] overflow-hidden">
          {/* Video background — place /public/videos/campus.mp4 to activate */}
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-[0.25]"
            poster="/images/campus-poster.jpg"
          >
            <source src="/videos/campus.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#431407]/65 via-[#7c2d12]/45 to-[#431407]/90 pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]" aria-hidden="true"
            style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: "40px 40px" }}
          />

          <div className="relative max-w-6xl mx-auto px-6">
            {/* Top content */}
            <div className="text-center pt-20 pb-14">
              <p className="text-[11px] font-bold text-amber-300 tracking-[0.22em] uppercase mb-5">
                Firmity for Educational Institutions
              </p>
              <h1 className="font-serif text-[clamp(2rem,5vw,3.25rem)] font-light text-white leading-[1.15] mb-5">
                Campus Infrastructure,{" "}
                <span className="italic text-amber-300">Professionally Managed.</span>
              </h1>
              <p className="text-[15px] text-white/[0.72] max-w-2xl mx-auto leading-relaxed mb-10">
                From classrooms to hostels — Firmity helps educational institutions stay on top of maintenance,
                keep campuses secure, and serve students and staff with faster facility support.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
                <MetricChip value="60%" label="Faster complaint resolution" />
                <MetricChip value="100%" label="Campus staff digitally tracked" />
                <MetricChip value="0" label="Paper registers required" />
                <MetricChip value="2 wks" label="To go live" />
              </div>
            </div>

            {/* 3-column benefit grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/[0.12]">
              {[
                {
                  bg: "bg-lime-500",
                  Icon: MessageSquare,
                  title: "Students raise issues in 30 seconds",
                  desc: "QR codes in every room. Scan, describe, submit. No more WhatsApp chaos or verbal handoffs to wardens and admin.",
                  cta: false,
                },
                {
                  bg: "bg-amber-500",
                  Icon: Users,
                  title: "Every campus worker, tracked",
                  desc: "Security, housekeeping, and contractors — digitally checked in and out, shift by shift. No paper. No disputes.",
                  cta: false,
                },
                {
                  bg: "bg-sky-500",
                  Icon: Shield,
                  title: "Safer gates, smarter campuses",
                  desc: "Pre-authorise parent visits, log every vendor, and maintain an auditable gate record from any device — anywhere.",
                  cta: true,
                },
              ].map(({ bg, Icon, title, desc, cta }, i) => (
                <div key={i} className={`px-7 py-8 ${i < 2 ? "md:border-r border-white/[0.12] border-b md:border-b-0" : ""}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${bg}`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <h3 className="text-[15px] font-bold text-white mb-2">{title}</h3>
                  <p className="text-[13px] text-white/[0.58] leading-relaxed mb-4">{desc}</p>
                  {cta && (
                    <Link href="/contact"
                      className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white px-5 py-2.5 rounded-xl text-[13px] font-bold transition-colors">
                      Book a Demo <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trusted by strip ──────────────────────────────────── */}
        <section className="bg-amber-50 border-b border-amber-100 py-7 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-[11px] text-amber-500/80 tracking-widest uppercase mb-5">
              Trusted by campuses across India
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
              {["Shivalik Institute of Technology", "Delhi Public School Group", "Regent International School", "Apex University", "Greenleaf Academy"].map((name) => (
                <span key={name} className="text-[13px] text-amber-800/60 font-medium">{name}</span>
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
                Outcomes educational institutions measure
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Outcome icon={Clock} value="60%" label="Reduction in avg. complaint resolution time"
                bgClass="bg-amber-50" iconClass="text-amber-500" valueClass="text-amber-600" />
              <Outcome icon={Shield} value="100%" label="Visitor entry digitised at the gate"
                bgClass="bg-emerald-50" iconClass="text-emerald-600" valueClass="text-emerald-700" />
              <Outcome icon={Star} value="4.6/5" label="Student satisfaction with facility support"
                bgClass="bg-violet-50" iconClass="text-violet-600" valueClass="text-violet-700" />
              <Outcome icon={Activity} value="99%" label="AMC renewal rate for Firmity customers"
                bgClass="bg-sky-50" iconClass="text-sky-600" valueClass="text-sky-700" />
            </div>
          </div>
        </section>

        {/* ── Feature Sections ──────────────────────────────────── */}
        <section className="bg-[#fffbf5] py-20 px-6">
          <div className="max-w-6xl mx-auto space-y-24">

            <FeatureSection
              labelColor="text-amber-500"
              label="Facility Complaint Helpdesk"
              heading="Students and staff report issues in 30 seconds."
              body="Replace WhatsApp chains and verbal complaints with a structured, trackable helpdesk. Students, faculty, and admin staff raise tickets from their phones — and facility teams receive, assign, and resolve them with full accountability."
              bullets={[
                "Scan a QR code in any room to raise a location-tagged complaint instantly",
                "Category-based routing: electrical, plumbing, civil, IT, housekeeping",
                "Real-time status updates sent back to the person who raised the ticket",
                "Management dashboard showing resolution time, volume by department, and SLA adherence",
              ]}
              card={<ComplaintCard />}
            />

            <FeatureSection
              reverse
              labelColor="text-emerald-600"
              label="Hostel Maintenance"
              heading="From room repairs to common areas — one system."
              body="Hostel facilities run 24/7. Firmity gives hostel wardens a floor-wise view of all pending maintenance requests, lets students raise issues without visiting the warden's office, and tracks every repair to closure."
              bullets={[
                "Floor-wise and block-wise maintenance tracking for hostel wardens",
                "Student-raised requests via mobile: room number auto-tagged",
                "Recurring PPM for common areas: water pumps, geysers, gym equipment",
                "Escalation rules for unresolved issues beyond SLA thresholds",
              ]}
              card={<HostelCard />}
            />

            <FeatureSection
              labelColor="text-violet-600"
              label="Visitor & Gate Management"
              heading="Secure campus. Seamless entry."
              body="Uncontrolled visitor access is a safety risk. Firmity's visitor management module logs every entry, supports parent pre-authorisation, and gives security staff a digital register accessible from a tablet at the gate."
              bullets={[
                "Pre-authorise parent and vendor visits from the admin portal",
                "Capture visitor photo, vehicle number, and purpose on entry",
                "Automatic SMS / WhatsApp notification to the host on visitor arrival",
                "Searchable digital visitor log with entry/exit timestamps",
              ]}
              card={<VisitorCard />}
            />

            <FeatureSection
              reverse
              labelColor="text-sky-600"
              label="Equipment AMC Management"
              heading="Critical systems — never out of contract."
              body="A failed lift or a tripped generator during examinations is an institution's worst nightmare. Firmity maintains a centralised register of all AMC contracts for campus equipment, with automated renewal alerts and service visit logs."
              bullets={[
                "AMC register for lifts, generators, HVAC, fire systems, lab equipment",
                "Renewal alerts at 90, 60, and 30 days before expiry",
                "Service visit scheduling with vendor sign-off and report upload",
                "Document vault for contracts, warranties, and compliance certificates",
              ]}
              card={<AMCCard />}
            />

            <FeatureSection
              labelColor="text-orange-600"
              label="Staff & Contractor Attendance"
              heading="Housekeeping, security, and contractors — accounted for."
              body="From daily cleaning staff to electrical contractors, Firmity digitises attendance for every category of facility worker on campus. No paper registers, no disputes, and a clean export for payroll every month."
              bullets={[
                "Digital check-in/out with time-stamps for security, housekeeping, and maintenance staff",
                "Shift-wise attendance summary for each department",
                "Contractor attendance linked to work orders and task completion",
                "Monthly attendance export for payroll and contractor billing",
              ]}
              card={<AttendanceCard />}
            />
          </div>
        </section>

        {/* ── Case Study ────────────────────────────────────────── */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-amber-50 rounded-[24px] border border-amber-100 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
                <div className="p-10 lg:p-14">
                  <p className="text-[11px] font-semibold text-amber-500 tracking-[0.2em] uppercase mb-4">Case Study</p>
                  <h2 className="font-serif text-[clamp(1.4rem,2.5vw,1.9rem)] font-light text-[#111d35] leading-snug mb-4">
                    How Shivalik Institute of Technology reduced campus complaints by 58% in one semester
                  </h2>
                  <p className="text-[13.5px] text-[#718096] font-light leading-relaxed mb-6">
                    Shivalik Institute of Technology, Noida — a 4,000-student engineering college — was managing facility
                    requests through a mix of WhatsApp groups, verbal communication, and email threads. After deploying Firmity:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {[
                      { value: "58%", label: "Fewer unresolved complaints per semester" },
                      { value: "5 days → 18 hrs", label: "Average resolution time drop" },
                      { value: "100%", label: "Visitor log digitisation at gate" },
                    ].map((s, i) => (
                      <div key={i} className="bg-white rounded-xl border border-amber-100 p-4">
                        <p className="font-serif text-[1.5rem] font-light text-amber-700 leading-none mb-1">{s.value}</p>
                        <p className="text-[11.5px] text-[#718096] font-light">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <blockquote className="border-l-2 border-amber-300 pl-4">
                    <p className="text-[13.5px] text-[#4a5568] font-light italic leading-relaxed">
                      &ldquo;Before Firmity, students came directly to my office for every issue. Now they raise a ticket and
                      see updates on their phone. Our team actually resolves problems — they&apos;re not just firefighting
                      anymore.&rdquo;
                    </p>
                    <p className="text-[12px] text-[#718096] mt-2 font-medium not-italic">
                      — Dr. Priya Nair, Director of Administration, Shivalik Institute of Technology
                    </p>
                  </blockquote>
                </div>
                <div className="bg-[#7c2d12] p-10 flex flex-col justify-center gap-6">
                  {[
                    { label: "Institution", value: "Shivalik Institute of Technology" },
                    { label: "Location", value: "Noida, Uttar Pradesh" },
                    { label: "Size", value: "4,000 students · 320 staff" },
                  ].map((item, i) => (
                    <div key={i}>
                      <p className="text-[10.5px] text-amber-200/40 tracking-widest uppercase mb-1">{item.label}</p>
                      <p className="text-[13px] text-white font-light">{item.value}</p>
                    </div>
                  ))}
                  <div>
                    <p className="text-[10.5px] text-amber-200/40 tracking-widest uppercase mb-1">Modules Used</p>
                    <div className="space-y-1">
                      {["Complaint Helpdesk", "Hostel Maintenance", "Visitor Management", "Equipment AMC", "Staff Attendance"].map((m) => (
                        <div key={m} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-amber-300" />
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
        <section className="bg-[#fffbf5] py-20 px-6 border-t border-amber-100">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <SectionLabel>Platform Capabilities</SectionLabel>
              <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-light text-[#111d35]">
                Everything your campus facility team needs
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: MessageSquare, title: "Complaint Helpdesk", desc: "QR-based issue reporting with category routing, status tracking, and SLA monitoring", bg: "bg-amber-50", iconCls: "text-amber-500" },
                { icon: BookOpen,      title: "Hostel Maintenance",  desc: "Floor-wise request tracking for hostel wardens with recurring PPM for common areas",      bg: "bg-emerald-50", iconCls: "text-emerald-600" },
                { icon: Shield,        title: "Visitor Management",  desc: "Digital gate log with pre-authorisation, photo capture, and host notifications",           bg: "bg-violet-50",  iconCls: "text-violet-600" },
                { icon: FileText,      title: "Equipment AMC",       desc: "Contract register with renewal alerts, service logs, and document vault",                   bg: "bg-sky-50",     iconCls: "text-sky-600" },
                { icon: Users,         title: "Staff Attendance",    desc: "Digital attendance for security, housekeeping, and contractors with shift reports",         bg: "bg-orange-50",  iconCls: "text-orange-600" },
                { icon: Calendar,      title: "Preventive Maintenance", desc: "Scheduled upkeep for generators, lifts, HVAC, and campus infrastructure",               bg: "bg-lime-50",    iconCls: "text-lime-700" },
              ].map(({ icon: Icon, title, desc, bg, iconCls }, i) => (
                <div key={i} className="bg-white rounded-[20px] border border-[#dbe5f0] p-6 hover:border-amber-200 hover:shadow-[0_4px_16px_rgba(124,45,18,0.08)] transition-all">
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
                { label: "Residential Communities", desc: "Gate management, resident complaints, and society equipment maintenance.", href: "/industries/residential" },
              ].map((r) => (
                <Link key={r.href} href={r.href}
                  className="group flex items-center justify-between p-6 rounded-[20px] border border-[#dbe5f0] hover:border-amber-300 hover:bg-amber-50 transition-all">
                  <div>
                    <p className="text-[13.5px] font-semibold text-[#111d35] mb-1">{r.label}</p>
                    <p className="text-[12.5px] text-[#718096] font-light">{r.desc}</p>
                  </div>
                  <ArrowRight size={16} className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section className="bg-[#7c2d12] py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-[clamp(1.6rem,4vw,2.4rem)] font-light text-white mb-4">
              Give your campus the facility management it deserves.
            </h2>
            <p className="text-[14px] text-white/[0.65] mb-8 leading-relaxed">
              Firmity is purpose-built for the complexity of institutional campuses — from multi-building layouts to
              multi-shift staff rosters.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white px-8 py-3.5 rounded-xl font-bold transition-colors">
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
