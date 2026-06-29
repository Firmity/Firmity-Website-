import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Reveal } from "@/src/components/reveal"
import {
  ClipboardList, Bell, CheckCircle, ArrowRight, MessageSquare,
  BarChart2, Users, Clock, Zap, FileCheck, Tag, AlertCircle
} from "lucide-react"
import Link from "next/link"

function DashboardMockup() {
  const tickets = [
    { id: "T-0041", title: "Lobby AC not cooling",    zone: "Block A", priority: "High",   status: "Open",       pColor: "#f87171", sColor: "#a78bfa" },
    { id: "T-0042", title: "Lift door sensor fault",  zone: "Block B", priority: "High",   status: "In Progress",pColor: "#f87171", sColor: "#fbbf24" },
    { id: "T-0043", title: "Washroom tap leaking",    zone: "Block C", priority: "Medium", status: "Open",       pColor: "#fbbf24", sColor: "#a78bfa" },
    { id: "T-0044", title: "Parking light flickering",zone: "G Floor", priority: "Low",    status: "Resolved",   pColor: "#86efac", sColor: "#4ade80" },
  ]
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-2xl" style={{ background: "#1a0e2e", border: "1px solid rgba(167,139,250,0.15)" }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ background: "#140a24", borderBottom: "1px solid rgba(167,139,250,0.1)" }}>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#a78bfa]" />
          <span className="text-[11px] font-medium text-white/70 tracking-wide">Firmity CMS · All Complaints</span>
        </div>
        <div className="flex gap-1.5">
          <span className="text-[9px] px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(167,139,250,0.15)", color: "#a78bfa" }}>Live</span>
          <span className="text-[9px] px-2 py-0.5 rounded-full font-medium text-white/40 bg-white/5">History</span>
        </div>
      </div>
      <div className="grid grid-cols-3 px-4 py-3" style={{ background: "rgba(167,139,250,0.04)", borderBottom: "1px solid rgba(167,139,250,0.08)" }}>
        {[{ val: "12", sub: "Open" }, { val: "3", sub: "In Progress" }, { val: "94%", sub: "SLA Met" }].map(function(s) {
          return (
            <div key={s.val} className="text-center">
              <p className="text-[13px] font-bold" style={{ color: "#a78bfa" }}>{s.val}</p>
              <p className="text-[8.5px] text-white/35">{s.sub}</p>
            </div>
          )
        })}
      </div>
      <div className="px-4 py-3 space-y-2">
        <span className="text-[9.5px] font-semibold text-white/30 uppercase tracking-widest">Active Tickets</span>
        {tickets.map(function(t) {
          return (
            <div key={t.id} className="rounded-lg px-3 py-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(167,139,250,0.08)" }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[8.5px] font-bold text-white/30">{t.id}</span>
                <span className="text-[8px] px-1.5 py-0.5 rounded font-semibold flex-shrink-0" style={{ background: t.pColor + "20", color: t.pColor }}>{t.priority}</span>
                <span className="text-[8px] px-1.5 py-0.5 rounded font-semibold flex-shrink-0 ml-auto" style={{ background: t.sColor + "20", color: t.sColor }}>{t.status}</span>
              </div>
              <p className="text-[10px] font-medium text-white/75 truncate">{t.title}</p>
              <p className="text-[9px] text-white/30">{t.zone}</p>
            </div>
          )
        })}
      </div>
      <div className="px-4 py-3" style={{ background: "#140a24", borderTop: "1px solid rgba(167,139,250,0.08)" }}>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="h-full rounded-full" style={{ width: "74%", background: "linear-gradient(to right, #a78bfa, #7c3aed)" }} />
          </div>
          <span className="text-[9px] text-white/40 flex-shrink-0">74% resolved this week</span>
        </div>
      </div>
    </div>
  )
}

export default function ComplaintManagementPage() {
  const capabilities = [
    { Icon: MessageSquare, title: "Multi-Channel Complaint Intake",   desc: "Capture complaints via mobile app, web portal, QR codes, email, or front-desk logging. Every submission lands in a single queue." },
    { Icon: Tag,           title: "Auto-Categorisation and Routing",  desc: "Classify complaints by type, zone, and priority automatically. Route to the right team or technician without manual assignment." },
    { Icon: Clock,         title: "SLA Tracking and Escalation",      desc: "Define resolution SLAs per complaint type. Automatic escalation fires when deadlines approach, keeping management informed." },
    { Icon: Bell,          title: "Real-Time Status Notifications",   desc: "Complainants and supervisors receive instant updates at every status change — no need to chase for progress." },
    { Icon: BarChart2,     title: "Resolution Analytics Dashboard",   desc: "Track open counts, average resolution time, SLA compliance rate, and recurring issue patterns across facilities." },
    { Icon: FileCheck,     title: "Full Audit and History Trail",     desc: "Every comment, reassignment, and status update is logged with user and timestamp. Perfect for accountability and audits." },
  ]
  const steps = [
    { num: "01", Icon: MessageSquare, title: "Complaint Logged",      desc: "Resident or staff submits via any channel. Ticket created instantly with timestamp and category." },
    { num: "02", Icon: Tag,           title: "Auto-Assigned",         desc: "System routes to the right team based on category, zone, and workload rules." },
    { num: "03", Icon: Zap,           title: "Team Resolves",         desc: "Technician receives work order, updates status from field. Complainant gets notified throughout." },
    { num: "04", Icon: CheckCircle,   title: "Closed and Logged",     desc: "Resolution confirmed, feedback collected, and full history archived for reporting." },
  ]
  const complaintTypes = [
    { Icon: AlertCircle, title: "Maintenance Faults",   desc: "Plumbing, electrical, HVAC, lift defects, structural issues — captured with photo evidence and location tagging." },
    { Icon: Users,       title: "Housekeeping Issues",  desc: "Cleanliness complaints, waste management, pest sightings — with frequency tracking to catch repeat problems." },
    { Icon: Bell,        title: "Noise and Nuisance",   desc: "Neighbour disturbances, late-night noise, parking violations — logged with timestamps for dispute resolution." },
    { Icon: ClipboardList,title: "Service Requests",   desc: "General service requests beyond maintenance — event bookings, utility queries, access approvals, and facility requests." },
  ]
  const industries = [
    { title: "Residential Communities", desc: "Resident complaints on building facilities, security, noise, and common areas managed transparently." },
    { title: "Commercial Offices",      desc: "Employee and tenant complaints on HVAC, cleanliness, lift service, and building access resolved fast." },
    { title: "Retail and Malls",        desc: "Retailer and shopper complaints on signage, washrooms, parking, and common area conditions." },
    { title: "Healthcare Facilities",   desc: "Patient and staff complaints on equipment, cleanliness, and facility conditions with rapid SLA response." },
    { title: "Educational Campuses",    desc: "Student and staff complaints on classroom conditions, equipment, canteen, and campus maintenance." },
    { title: "Hotels and Hospitality",  desc: "Guest complaints on room conditions, amenities, noise, and service quality — tracked to resolution." },
  ]
  return (
    <>
      <Navigation />
      <main className="overflow-x-hidden">
        <section style={{ background: "#1a0e2e" }} className="relative min-h-screen flex items-center">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 20% 50%, rgba(167,139,250,0.07) 0%, transparent 70%)" }} />
          <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-14 py-28 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <Reveal>
                  <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-7" style={{ background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.2)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa]" />
                    <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: "#a78bfa" }}>Module 03 · Complaint Management System</span>
                  </div>
                </Reveal>
                <Reveal delay={80}>
                  <h1 className="font-serif font-light leading-[1.1] tracking-tight mb-6" style={{ fontSize: "clamp(2rem,5vw,3.4rem)", color: "#faf5ff" }}>
                    Every complaint<br />resolved. Every<br /><em className="not-italic" style={{ color: "#a78bfa" }}>resident heard.</em>
                  </h1>
                </Reveal>
                <Reveal delay={150}>
                  <p className="text-[15px] leading-[1.75] mb-10 max-w-[480px]" style={{ color: "rgba(250,245,255,0.65)" }}>
                    Firmity CMS turns scattered WhatsApp messages, verbal complaints, and missed calls into a structured,
                    trackable ticket system — with SLA enforcement, auto-routing, and real-time status updates.
                  </p>
                </Reveal>
                <Reveal delay={200}>
                  <div className="grid grid-cols-3 gap-5 mb-10 max-w-[440px]">
                    {[{ val: "94%", label: "SLA compliance rate" }, { val: "4h", label: "Avg resolution time" }, { val: "0", label: "Complaints lost in the system" }].map(function(s) {
                      return (
                        <div key={s.val}>
                          <p className="font-serif font-light leading-none mb-1.5" style={{ fontSize: "clamp(1.6rem,3.5vw,2.2rem)", color: "#a78bfa" }}>{s.val}</p>
                          <p className="text-[10.5px] leading-snug" style={{ color: "rgba(250,245,255,0.45)" }}>{s.label}</p>
                        </div>
                      )
                    })}
                  </div>
                </Reveal>
                <Reveal delay={250}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[13px] font-semibold" style={{ background: "#a78bfa", color: "#1a0e2e" }}>Book a Demo <ArrowRight size={14} /></Link>
                    <Link href="/features" className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[13px] font-semibold" style={{ background: "rgba(167,139,250,0.08)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.2)" }}>Explore All Features</Link>
                  </div>
                </Reveal>
              </div>
              <Reveal direction="left" delay={180}><DashboardMockup /></Reveal>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center">
            <Reveal>
              <p className="text-[11px] font-semibold tracking-widest uppercase text-[#6d28d9] mb-5">What Firmity CMS delivers</p>
              <h2 className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c] mb-6" style={{ fontSize: "clamp(1.7rem,4vw,2.8rem)" }}>
                From complaint to closure.<br className="hidden sm:block" />Fully transparent.
              </h2>
              <p className="text-[15px] leading-[1.8] text-[#4a5568] max-w-2xl mx-auto">
                Residents lose trust when complaints disappear into WhatsApp groups or verbal promises. Firmity gives every complaint a ticket number, an owner, and a deadline — and keeps everyone informed until it is closed.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 lg:py-24" style={{ background: "#fdf8ff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <Reveal>
              <div className="mb-12 lg:mb-16">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#6d28d9] mb-3">Capabilities</p>
                <h2 className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c]" style={{ fontSize: "clamp(1.5rem,3.5vw,2.4rem)" }}>Everything your operations team needs.</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {capabilities.map(function(cap, i) {
                const Icon = cap.Icon
                return (
                  <Reveal key={cap.title} delay={i * 55}>
                    <div className="rounded-2xl p-6 h-full" style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(167,139,250,0.1)" }}>
                        <Icon size={18} style={{ color: "#7c3aed" }} strokeWidth={1.75} />
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

        <section style={{ background: "#1a0e2e" }} className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <Reveal>
              <div className="mb-12 lg:mb-16 text-center">
                <p className="text-[11px] font-semibold tracking-widest uppercase mb-3" style={{ color: "#a78bfa" }}>How it works</p>
                <h2 className="font-serif font-light leading-[1.15] tracking-tight" style={{ fontSize: "clamp(1.5rem,3.5vw,2.4rem)", color: "#faf5ff" }}>Logged, assigned, resolved. Automatically.</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
              <div className="hidden lg:block absolute top-[28px] left-[12.5%] right-[12.5%] h-px" style={{ background: "linear-gradient(to right, rgba(167,139,250,0.3), rgba(167,139,250,0.1))" }} />
              {steps.map(function(step, i) {
                const Icon = step.Icon
                return (
                  <Reveal key={step.num} delay={i * 90}>
                    <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5 relative z-10" style={{ background: "#2d1654", border: "1px solid rgba(167,139,250,0.3)" }}>
                        <Icon size={20} style={{ color: "#a78bfa" }} strokeWidth={1.5} />
                      </div>
                      <span className="text-[9px] font-bold tracking-widest mb-2" style={{ color: "rgba(167,139,250,0.5)" }}>{step.num}</span>
                      <h4 className="text-[13.5px] font-semibold mb-2" style={{ color: "#faf5ff" }}>{step.title}</h4>
                      <p className="text-[12px] leading-[1.7]" style={{ color: "rgba(250,245,255,0.5)" }}>{step.desc}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <Reveal direction="right">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#6d28d9] mb-8">Business impact</p>
                <div className="space-y-8">
                  {[
                    { val: "60%", label: "Faster complaint resolution",     sub: "structured routing eliminates manual follow-up" },
                    { val: "94%", label: "SLA compliance on average",       sub: "escalation rules ensure no deadline is missed" },
                    { val: "Zero", label: "Complaints lost or forgotten",   sub: "every ticket has a number, owner, and status" },
                    { val: "100%", label: "Resident satisfaction visibility",sub: "feedback loop closes every resolved ticket" },
                  ].map(function(m) {
                    return (
                      <div key={m.val} className="flex gap-5 items-start">
                        <p className="font-serif font-light leading-none flex-shrink-0 w-[100px]" style={{ fontSize: "clamp(1.4rem,2.5vw,1.9rem)", color: "#7c3aed" }}>{m.val}</p>
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
                <div className="rounded-2xl p-8" style={{ background: "#f5f3ff", border: "1px solid #ddd6fe" }}>
                  <h3 className="font-serif font-light text-[1.35rem] text-[#1a202c] mb-7 leading-snug">Replace WhatsApp threads<br />with a real system.</h3>
                  <div className="space-y-4">
                    {[
                      "Log complaints via QR code scan — no app download needed for residents",
                      "Auto-assign tickets to available technicians based on zone and skill",
                      "Send progress updates to complainant automatically at each stage",
                      "Escalate unresolved tickets to supervisors after SLA breach",
                      "Track recurring complaints to identify systemic facility issues",
                      "Generate weekly complaint reports for management review",
                    ].map(function(b) {
                      return (
                        <div key={b} className="flex gap-3 items-start">
                          <CheckCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color: "#7c3aed" }} />
                          <p className="text-[12.5px] leading-[1.65] text-[#2d3748]">{b}</p>
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-8">
                    <Link href="/contact" className="inline-flex items-center gap-2 text-[12.5px] font-semibold hover:gap-3.5 transition-all" style={{ color: "#7c3aed" }}>See it in action <ArrowRight size={14} /></Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24" style={{ background: "#fdf8ff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <Reveal>
              <div className="mb-12 text-center">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#6d28d9] mb-3">Complaint categories</p>
                <h2 className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c]" style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)" }}>One platform. Every complaint type.</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {complaintTypes.map(function(ct, i) {
                const Icon = ct.Icon
                return (
                  <Reveal key={ct.title} delay={i * 60}>
                    <div className="rounded-2xl p-6 h-full" style={{ background: "#ffffff", border: "1px solid #ddd6fe" }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(167,139,250,0.1)" }}>
                        <Icon size={18} style={{ color: "#7c3aed" }} strokeWidth={1.75} />
                      </div>
                      <h4 className="text-[13.5px] font-semibold text-[#1a202c] mb-2">{ct.title}</h4>
                      <p className="text-[12px] leading-[1.7] text-[#718096]">{ct.desc}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <Reveal>
              <div className="mb-12">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#6d28d9] mb-3">Who uses it</p>
                <h2 className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c]" style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)" }}>Complaint management for every facility.</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {industries.map(function(ind, i) {
                return (
                  <Reveal key={ind.title} delay={i * 45}>
                    <div className="rounded-xl p-5" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#a78bfa]" />
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

        <section style={{ background: "#1a0e2e" }} className="py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(167,139,250,0.06) 0%, transparent 70%)" }} />
          <div className="relative max-w-4xl mx-auto px-6 sm:px-10 text-center">
            <Reveal>
              <h2 className="font-serif font-light leading-[1.15] tracking-tight mb-4" style={{ fontSize: "clamp(1.6rem,4vw,2.6rem)", color: "#faf5ff" }}>Ready to replace complaint chaos with clarity?</h2>
              <p className="text-[14px] leading-[1.75] mb-8 max-w-xl mx-auto" style={{ color: "rgba(250,245,255,0.6)" }}>Hundreds of facilities use Firmity CMS to resolve complaints faster, meet SLAs consistently, and build resident trust — without the spreadsheets.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-[13px] font-semibold" style={{ background: "#a78bfa", color: "#1a0e2e" }}>Book a Demo <ArrowRight size={14} /></Link>
                <Link href="/features" className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-[13px] font-semibold" style={{ background: "rgba(167,139,250,0.08)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.2)" }}>Explore All Modules</Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
