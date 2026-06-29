import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Reveal } from "@/src/components/reveal"
import {
  Calendar, Bell, Wrench, BarChart2, Smartphone, Shield,
  CheckCircle, ArrowRight, Clock, FileCheck, Zap,
  TrendingDown, RefreshCw
} from "lucide-react"
import Link from "next/link"

// ─── PPM Dashboard mockup ─────────────────────────────────────────────────────
function DashboardMockup() {
  const tasks = [
    { label: "HVAC Filter Replacement", zone: "Block A", due: "Today",  status: "due"       },
    { label: "Generator Oil Change",     zone: "Block B", due: "Mar 14", status: "upcoming"  },
    { label: "Fire Alarm Inspection",    zone: "All",     due: "Mar 17", status: "upcoming"  },
    { label: "Chiller Service",          zone: "Roof",    due: "Mar 21", status: "scheduled" },
  ]
  const calBlocks = [
    { day: "Mon", label: "HVAC",      fill: true  },
    { day: "Tue", label: "",          fill: false },
    { day: "Wed", label: "Plumbing",  fill: true  },
    { day: "Thu", label: "",          fill: false },
    { day: "Fri", label: "Generator", fill: true  },
    { day: "Sat", label: "Elect.",    fill: true  },
    { day: "Sun", label: "",          fill: false },
  ]

  return (
    <div
      className="w-full rounded-2xl overflow-hidden shadow-2xl"
      style={{ background: "#0d2416", border: "1px solid rgba(74,222,128,0.15)" }}
    >
      {/* Titlebar */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ background: "#0b1f12", borderBottom: "1px solid rgba(74,222,128,0.1)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#4ade80]" />
          <span className="text-[11px] font-medium text-white/70 tracking-wide">Firmity PPM · March 2025</span>
        </div>
        <div className="flex gap-1.5">
          <span
            className="text-[9px] px-2 py-0.5 rounded-full font-medium"
            style={{ background: "rgba(74,222,128,0.15)", color: "#4ade80" }}
          >Weekly</span>
          <span className="text-[9px] px-2 py-0.5 rounded-full font-medium text-white/40 bg-white/5">Monthly</span>
        </div>
      </div>

      {/* Calendar strip */}
      <div className="px-4 pt-3 pb-2">
        <div className="grid grid-cols-7 gap-1">
          {calBlocks.map(function(b) {
            return (
              <div key={b.day} className="flex flex-col items-center gap-1">
                <span className="text-[9px] font-medium text-white/30">{b.day}</span>
                <div
                  className="w-full rounded-md flex items-center justify-center"
                  style={{
                    height: "34px",
                    background: b.fill ? "rgba(74,222,128,0.12)" : "rgba(255,255,255,0.03)",
                    border: b.fill ? "1px solid rgba(74,222,128,0.25)" : "1px solid transparent",
                  }}
                >
                  {b.fill && (
                    <span className="text-[7.5px] font-medium text-center leading-tight px-0.5" style={{ color: "#86efac" }}>
                      {b.label}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "rgba(74,222,128,0.07)", margin: "0 16px" }} />

      {/* Task list */}
      <div className="px-4 py-3 space-y-2">
        <span className="text-[9.5px] font-semibold text-white/30 uppercase tracking-widest">Upcoming Tasks</span>
        {tasks.map(function(t, i) {
          return (
            <div
              key={i}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(74,222,128,0.08)" }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: t.status === "due" ? "#4ade80" : "#86efac" }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-medium text-white/80 truncate">{t.label}</p>
                <p className="text-[9px] text-white/35">{t.zone}</p>
              </div>
              <span
                className="text-[8.5px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                style={{
                  background: t.status === "due" ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.05)",
                  color: t.status === "due" ? "#4ade80" : "rgba(255,255,255,0.4)",
                }}
              >
                {t.due}
              </span>
            </div>
          )
        })}
      </div>

      {/* Stats footer */}
      <div
        className="grid grid-cols-3 px-4 py-3"
        style={{ background: "#0b1f12", borderTop: "1px solid rgba(74,222,128,0.08)" }}
      >
        {[
          { val: "4",   sub: "Due this week" },
          { val: "18",  sub: "Scheduled" },
          { val: "94%", sub: "Completion rate" },
        ].map(function(s) {
          return (
            <div key={s.val} className="text-center">
              <p className="text-[13px] font-bold" style={{ color: "#4ade80" }}>{s.val}</p>
              <p className="text-[8.5px] text-white/35 leading-tight">{s.sub}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PreventiveMaintenancePage() {

  const capabilities = [
    { Icon: Calendar,  title: "Automated Schedule Generation",  desc: "Define intervals once — daily, weekly, monthly, or by usage meter. Firmity auto-generates and assigns work orders without manual input." },
    { Icon: Bell,      title: "Multi-Channel Alert Engine",      desc: "Push, email, and in-app notifications fire days before a task is due. Escalation chains ensure nothing slips past your team." },
    { Icon: Wrench,    title: "Digital Work Orders",             desc: "Each task ships as a structured work order with checklist steps, assigned technician, parts list, and photo-upload fields." },
    { Icon: Smartphone,title: "Field Technician App",            desc: "Technicians update task status, capture evidence photos, and log time from the field — offline-capable and mobile-first." },
    { Icon: BarChart2, title: "Maintenance Analytics",           desc: "Track completion rates, average resolution time, cost-per-task, and downtime trends. Exportable reports for management review." },
    { Icon: FileCheck, title: "Compliance Audit Trail",          desc: "Every completed task is timestamped and logged. One-click audit exports prove maintenance compliance to regulators or insurers." },
  ]

  const steps = [
    { num: "01", Icon: Zap,       title: "Register Assets",   desc: "Add equipment with category, location, manufacturer, and maintenance specs." },
    { num: "02", Icon: Calendar,  title: "Define Schedules",  desc: "Set time-based or usage-based triggers. The system generates the calendar." },
    { num: "03", Icon: Bell,      title: "Receive Alerts",    desc: "Automated notifications go to technicians and supervisors before due dates." },
    { num: "04", Icon: BarChart2, title: "Close and Analyse", desc: "Mark tasks complete, capture data, and review performance dashboards." },
  ]

  const maintenanceTypes = [
    { Icon: Clock,        title: "Time-Based",     desc: "Schedule by fixed intervals — daily, weekly, monthly, quarterly, or yearly. Best for equipment with predictable service windows." },
    { Icon: TrendingDown, title: "Usage-Based",     desc: "Trigger work orders when an asset crosses a usage threshold — operating hours, cycles, or mileage readings." },
    { Icon: Shield,       title: "Condition-Based", desc: "Monitor real-world parameters and initiate maintenance only when conditions indicate the need. Reduce unnecessary service runs." },
    { Icon: RefreshCw,    title: "Predictive",      desc: "Use historical maintenance data and trend analysis to predict failure windows and act before breakdowns occur." },
  ]

  const industries = [
    { title: "Commercial Buildings",     desc: "HVAC, elevators, fire safety, BMS, generators, and common area systems." },
    { title: "Manufacturing Plants",     desc: "Production machinery, conveyor belts, quality equipment, and safety systems." },
    { title: "Hospitals and Healthcare", desc: "Medical equipment, sterilisation units, emergency power, and life-support systems." },
    { title: "Educational Institutions", desc: "Lab instruments, classroom AV, sports facilities, and campus infrastructure." },
    { title: "Hotels and Hospitality",   desc: "Guest room systems, kitchen equipment, pool maintenance, and property infrastructure." },
    { title: "Residential Communities",  desc: "Common area lifts, swimming pools, gym equipment, and shared utilities." },
  ]

  return (
    <>
      <Navigation />
      <main className="overflow-x-hidden">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section style={{ background: "#0b2018" }} className="relative min-h-screen flex items-center">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 60% at 20% 50%, rgba(74,222,128,0.07) 0%, transparent 70%)" }}
          />
          <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-14 py-28 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Left */}
              <div>
                <Reveal>
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-7"
                    style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                    <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: "#4ade80" }}>
                      Module 02 · Planned Preventive Maintenance
                    </span>
                  </div>
                </Reveal>

                <Reveal delay={80}>
                  <h1
                    className="font-serif font-light leading-[1.1] tracking-tight mb-6"
                    style={{ fontSize: "clamp(2rem,5vw,3.4rem)", color: "#f0fdf4" }}
                  >
                    Stop reacting<br />
                    to breakdowns.<br />
                    <em className="not-italic" style={{ color: "#4ade80" }}>Start preventing them.</em>
                  </h1>
                </Reveal>

                <Reveal delay={150}>
                  <p className="text-[15px] leading-[1.75] mb-10 max-w-[480px]" style={{ color: "rgba(240,253,244,0.65)" }}>
                    Firmity PPM automates your entire maintenance cycle — from schedule generation and technician
                    dispatch to completion tracking and compliance reporting. No spreadsheets. No missed services.
                  </p>
                </Reveal>

                <Reveal delay={200}>
                  <div className="grid grid-cols-3 gap-5 mb-10 max-w-[440px]">
                    {[
                      { val: "40%",  label: "Reduction in emergency repairs" },
                      { val: "3x",   label: "ROI within 12 months" },
                      { val: "100%", label: "Audit-ready compliance log" },
                    ].map(function(s) {
                      return (
                        <div key={s.val}>
                          <p
                            className="font-serif font-light leading-none mb-1.5"
                            style={{ fontSize: "clamp(1.6rem,3.5vw,2.2rem)", color: "#4ade80" }}
                          >
                            {s.val}
                          </p>
                          <p className="text-[10.5px] leading-snug" style={{ color: "rgba(240,253,244,0.45)" }}>
                            {s.label}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </Reveal>

                <Reveal delay={250}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[13px] font-semibold transition-all"
                      style={{ background: "#4ade80", color: "#0b2018" }}
                    >
                      Book a Demo <ArrowRight size={14} />
                    </Link>
                    <Link
                      href="/features"
                      className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[13px] font-semibold transition-all"
                      style={{ background: "rgba(74,222,128,0.08)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}
                    >
                      Explore All Features
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* Right — dashboard mockup */}
              <Reveal direction="left" delay={180}>
                <DashboardMockup />
              </Reveal>

            </div>
          </div>
        </section>

        {/* ── Intro statement ──────────────────────────────────────────────── */}
        <section className="bg-white py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center">
            <Reveal>
              <p className="text-[11px] font-semibold tracking-widest uppercase text-[#2f855a] mb-5">
                What Firmity PPM delivers
              </p>
              <h2
                className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c] mb-6"
                style={{ fontSize: "clamp(1.7rem,4vw,2.8rem)" }}
              >
                Maintenance that plans, schedules,<br className="hidden sm:block" />
                and notifies itself.
              </h2>
              <p className="text-[15px] leading-[1.8] text-[#4a5568] max-w-2xl mx-auto">
                Most facilities still manage PPM on whiteboards, Excel sheets, and memory. Firmity replaces that
                with an always-on scheduling engine that knows every asset, every interval, and every technician
                — and acts without you having to chase it.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Capability grid ───────────────────────────────────────────────── */}
        <section className="py-16 lg:py-24" style={{ background: "#f8fffe" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <Reveal>
              <div className="mb-12 lg:mb-16">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#2f855a] mb-3">Capabilities</p>
                <h2
                  className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c]"
                  style={{ fontSize: "clamp(1.5rem,3.5vw,2.4rem)" }}
                >
                  Everything your maintenance team needs.
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {capabilities.map(function(cap, i) {
                const Icon = cap.Icon
                return (
                  <Reveal key={cap.title} delay={i * 55}>
                    <div
                      className="rounded-2xl p-6 h-full"
                      style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                        style={{ background: "rgba(74,222,128,0.1)" }}
                      >
                        <Icon size={18} style={{ color: "#16a34a" }} strokeWidth={1.75} />
                      </div>
                      <h3 className="text-[14px] font-semibold text-[#1a202c] mb-2 leading-snug">{cap.title}</h3>
                      <p className="text-[12.5px] leading-[1.75] text-[#718096]">{cap.desc}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Process flow ─────────────────────────────────────────────────── */}
        <section style={{ background: "#0b1a2e" }} className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <Reveal>
              <div className="mb-12 lg:mb-16 text-center">
                <p className="text-[11px] font-semibold tracking-widest uppercase mb-3" style={{ color: "#4ade80" }}>
                  How it works
                </p>
                <h2
                  className="font-serif font-light leading-[1.15] tracking-tight"
                  style={{ fontSize: "clamp(1.5rem,3.5vw,2.4rem)", color: "#f0f4f8" }}
                >
                  Four steps from setup to optimisation.
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
              <div
                className="hidden lg:block absolute top-[28px] left-[12.5%] right-[12.5%] h-px"
                style={{ background: "linear-gradient(to right, rgba(74,222,128,0.3), rgba(74,222,128,0.1))" }}
              />
              {steps.map(function(step, i) {
                const Icon = step.Icon
                return (
                  <Reveal key={step.num} delay={i * 90}>
                    <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center mb-5 relative z-10"
                        style={{ background: "#0b2018", border: "1px solid rgba(74,222,128,0.3)" }}
                      >
                        <Icon size={20} style={{ color: "#4ade80" }} strokeWidth={1.5} />
                      </div>
                      <span className="text-[9px] font-bold tracking-widest mb-2" style={{ color: "rgba(74,222,128,0.5)" }}>
                        {step.num}
                      </span>
                      <h4 className="text-[13.5px] font-semibold mb-2" style={{ color: "#f0f4f8" }}>{step.title}</h4>
                      <p className="text-[12px] leading-[1.7]" style={{ color: "rgba(240,244,248,0.5)" }}>{step.desc}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Business impact ───────────────────────────────────────────────── */}
        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              <Reveal direction="right">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#2f855a] mb-8">Business impact</p>
                <div className="space-y-8">
                  {[
                    { val: "40%",    label: "Fewer emergency breakdowns",          sub: "by catching failures before they escalate" },
                    { val: "20-40%", label: "Longer equipment lifespan",           sub: "through consistent, data-driven servicing" },
                    { val: "3-5x",   label: "Cost savings vs reactive maintenance",sub: "planned work costs a fraction of emergency repair" },
                    { val: "100%",   label: "Audit-ready compliance history",      sub: "every task timestamped and electronically signed" },
                  ].map(function(m) {
                    return (
                      <div key={m.val} className="flex gap-5 items-start">
                        <p
                          className="font-serif font-light leading-none flex-shrink-0 w-[100px]"
                          style={{ fontSize: "clamp(1.6rem,3vw,2.1rem)", color: "#16a34a" }}
                        >
                          {m.val}
                        </p>
                        <div>
                          <p className="text-[13.5px] font-semibold text-[#1a202c] mb-0.5">{m.label}</p>
                          <p className="text-[12px] text-[#718096] leading-snug">{m.sub}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Reveal>

              <Reveal direction="left" delay={100}>
                <div
                  className="rounded-2xl p-8"
                  style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}
                >
                  <h3 className="font-serif font-light text-[1.35rem] text-[#1a202c] mb-7 leading-snug">
                    Transform reactive to<br />proactive operations.
                  </h3>
                  <div className="space-y-4">
                    {[
                      "Schedule maintenance during off-peak hours to eliminate disruptions",
                      "Assign work orders to the right technician with full task context",
                      "Track parts usage and reorder stock before it runs out",
                      "Generate management reports in one click — no manual collation",
                      "Catch warranty and compliance deadlines automatically",
                      "Build a searchable history of every maintenance action per asset",
                    ].map(function(b) {
                      return (
                        <div key={b} className="flex gap-3 items-start">
                          <CheckCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color: "#16a34a" }} />
                          <p className="text-[12.5px] leading-[1.65] text-[#2d3748]">{b}</p>
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-8">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-[12.5px] font-semibold transition-all hover:gap-3.5"
                      style={{ color: "#16a34a" }}
                    >
                      See it in action <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </Reveal>

            </div>
          </div>
        </section>

        {/* ── Maintenance types ─────────────────────────────────────────────── */}
        <section className="py-16 lg:py-24" style={{ background: "#f8fffe" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <Reveal>
              <div className="mb-12 text-center">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#2f855a] mb-3">
                  Maintenance models
                </p>
                <h2
                  className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c]"
                  style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)" }}
                >
                  One platform. Four maintenance strategies.
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {maintenanceTypes.map(function(mt, i) {
                const Icon = mt.Icon
                return (
                  <Reveal key={mt.title} delay={i * 60}>
                    <div
                      className="rounded-2xl p-6 h-full"
                      style={{ background: "#ffffff", border: "1px solid #d1fae5" }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: "rgba(74,222,128,0.1)" }}
                      >
                        <Icon size={18} style={{ color: "#16a34a" }} strokeWidth={1.75} />
                      </div>
                      <h4 className="text-[13.5px] font-semibold text-[#1a202c] mb-2">{mt.title}</h4>
                      <p className="text-[12px] leading-[1.7] text-[#718096]">{mt.desc}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Industries ────────────────────────────────────────────────────── */}
        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <Reveal>
              <div className="mb-12">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#2f855a] mb-3">Who uses it</p>
                <h2
                  className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c]"
                  style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)" }}
                >
                  PPM for every type of facility.
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {industries.map(function(ind, i) {
                return (
                  <Reveal key={ind.title} delay={i * 45}>
                    <div
                      className="rounded-xl p-5"
                      style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                        <h4 className="text-[13px] font-semibold text-[#1a202c]">{ind.title}</h4>
                      </div>
                      <p className="text-[12px] leading-[1.65] text-[#718096] pl-3.5">{ind.desc}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section style={{ background: "#0b2018" }} className="py-16 lg:py-20 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(74,222,128,0.06) 0%, transparent 70%)" }}
          />
          <div className="relative max-w-4xl mx-auto px-6 sm:px-10 text-center">
            <Reveal>
              <h2
                className="font-serif font-light leading-[1.15] tracking-tight mb-4"
                style={{ fontSize: "clamp(1.6rem,4vw,2.6rem)", color: "#f0fdf4" }}
              >
                Ready to eliminate reactive maintenance?
              </h2>
              <p
                className="text-[14px] leading-[1.75] mb-8 max-w-xl mx-auto"
                style={{ color: "rgba(240,253,244,0.6)" }}
              >
                Hundreds of facility teams use Firmity PPM to cut emergency repair costs, extend asset life,
                and stay fully compliant — without the spreadsheets.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-[13px] font-semibold transition-all"
                  style={{ background: "#4ade80", color: "#0b2018" }}
                >
                  Book a Demo <ArrowRight size={14} />
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-[13px] font-semibold transition-all"
                  style={{ background: "rgba(74,222,128,0.08)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}
                >
                  Explore All Modules
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
