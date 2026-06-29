import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Reveal } from "@/src/components/reveal"
import {
  Users, Clock, CheckCircle, ArrowRight, Bell,
  BarChart2, Smartphone, FileText, Zap, Shield, Calendar, MapPin
} from "lucide-react"
import Link from "next/link"

function DashboardMockup() {
  const staff = [
    { name: "Ravi Kumar",    role: "Technician", time: "08:02 AM", status: "Present" },
    { name: "Sunita Patil",  role: "Supervisor", time: "08:17 AM", status: "Present" },
    { name: "Arun Mehta",    role: "Housekeeping",time: "09:45 AM",status: "Late"    },
    { name: "Deepa Nair",    role: "Security",   time: "—",        status: "Absent"  },
  ]
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-2xl" style={{ background: "#0a1620", border: "1px solid rgba(56,189,248,0.15)" }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ background: "#071018", borderBottom: "1px solid rgba(56,189,248,0.1)" }}>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" />
          <span className="text-[11px] font-medium text-white/70 tracking-wide">Firmity Attendance · Today</span>
        </div>
        <div className="flex gap-1.5">
          <span className="text-[9px] px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8" }}>Live</span>
          <span className="text-[9px] px-2 py-0.5 rounded-full font-medium text-white/40 bg-white/5">History</span>
        </div>
      </div>
      <div className="grid grid-cols-4 px-4 py-3" style={{ background: "rgba(56,189,248,0.04)", borderBottom: "1px solid rgba(56,189,248,0.08)" }}>
        {[{ val: "32", sub: "Present", col: "#4ade80" }, { val: "4", sub: "Late", col: "#fbbf24" }, { val: "2", sub: "Absent", col: "#f87171" }, { val: "89%", sub: "Rate", col: "#38bdf8" }].map(function(s) {
          return (
            <div key={s.sub} className="text-center">
              <p className="text-[13px] font-bold" style={{ color: s.col }}>{s.val}</p>
              <p className="text-[8.5px] text-white/35">{s.sub}</p>
            </div>
          )
        })}
      </div>
      <div className="px-4 py-3 space-y-2">
        <span className="text-[9.5px] font-semibold text-white/30 uppercase tracking-widest">Staff Log</span>
        {staff.map(function(s) {
          const col = s.status === "Present" ? "#4ade80" : s.status === "Late" ? "#fbbf24" : "#f87171"
          return (
            <div key={s.name} className="flex items-center gap-2.5 rounded-lg px-3 py-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(56,189,248,0.08)" }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(56,189,248,0.1)" }}>
                <span className="text-[9px] font-bold" style={{ color: "#38bdf8" }}>{s.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-medium text-white/80 truncate">{s.name}</p>
                <p className="text-[9px] text-white/30">{s.role}</p>
              </div>
              <span className="text-[8.5px] text-white/30">{s.time}</span>
              <span className="text-[8px] px-1.5 py-0.5 rounded font-semibold flex-shrink-0 ml-1" style={{ background: col + "20", color: col }}>{s.status}</span>
            </div>
          )
        })}
      </div>
      <div className="px-4 py-2.5" style={{ background: "#071018", borderTop: "1px solid rgba(56,189,248,0.08)" }}>
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-white/35">Shift ends at 5:00 PM</span>
          <span className="text-[9px] font-semibold" style={{ color: "#38bdf8" }}>Export report →</span>
        </div>
      </div>
    </div>
  )
}

export default function StaffAttendancePage() {
  const capabilities = [
    { Icon: Smartphone, title: "Mobile Check-In and Check-Out",    desc: "Staff mark attendance via mobile app with GPS verification. Supervisors get a live view of who is on-site, on time, and on shift." },
    { Icon: MapPin,     title: "Geo-Fenced Attendance",            desc: "Restrict check-ins to authorised locations. If a staff member checks in outside the facility perimeter, the system flags it immediately." },
    { Icon: Clock,      title: "Shift and Roster Management",      desc: "Define shifts, assign rosters, and track adherence in real time. Handle rotating shifts, night duties, and multi-site assignments." },
    { Icon: Bell,       title: "Late and Absence Alerts",          desc: "Supervisors receive instant alerts when staff are late or absent. Escalation chains ensure cover is arranged before operations are affected." },
    { Icon: Calendar,   title: "Leave and Holiday Management",     desc: "Staff apply for leave digitally. Supervisors approve or reject with one click. Leave balances update automatically against payroll records." },
    { Icon: BarChart2,  title: "Attendance Analytics and Reports", desc: "Track punctuality trends, absenteeism patterns, overtime, and compliance across teams. Export payroll-ready reports for HR and accounts." },
  ]
  const steps = [
    { num: "01", Icon: Users,      title: "Set Up Staff Profiles", desc: "Add staff details, assign roles, shifts, and locations. Import existing HR data in bulk." },
    { num: "02", Icon: Calendar,   title: "Define Shifts and Rosters", desc: "Create shift patterns, assign to staff, and publish rosters. Handle substitutions and overtime." },
    { num: "03", Icon: Smartphone, title: "Staff Check In",        desc: "Staff use mobile app or biometric terminal. GPS and timestamp are recorded automatically." },
    { num: "04", Icon: BarChart2,  title: "Review and Report",     desc: "Daily summaries, exception reports, and payroll-ready exports are generated automatically." },
  ]
  const useCases = [
    { Icon: Shield,    title: "Security Personnel",      desc: "Track guard shifts, patrol completion, and site coverage with real-time location verification." },
    { Icon: Users,     title: "Housekeeping Teams",      desc: "Monitor cleaning staff attendance per floor or zone and link to daily task completion records." },
    { Icon: Zap,       title: "Maintenance Technicians", desc: "Track technician availability by shift and location. Link attendance to work order assignment." },
    { Icon: FileText,  title: "Office and Admin Staff",  desc: "Standard attendance tracking with leave management and HR-ready reports for payroll processing." },
  ]
  const industries = [
    { title: "Commercial Buildings",     desc: "Track attendance of facility management, housekeeping, security, and technical staff across floors." },
    { title: "Residential Communities",  desc: "Monitor guard, cleaning, and maintenance staff attendance per block with supervisor override." },
    { title: "Manufacturing Plants",     desc: "Manage shift-based attendance for production, safety, and maintenance staff with overtime tracking." },
    { title: "Hospitals and Healthcare", desc: "Track attendance of facility staff, housekeeping, and security across wards and departments." },
    { title: "Educational Institutions", desc: "Monitor attendance of support staff, security, housekeeping, and maintenance across campuses." },
    { title: "Hotels and Hospitality",   desc: "Manage shift rosters for front desk, housekeeping, kitchen, and maintenance staff across properties." },
  ]
  return (
    <>
      <Navigation />
      <main className="overflow-x-hidden">
        <section style={{ background: "#0a1620" }} className="relative min-h-screen flex items-center">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 20% 50%, rgba(56,189,248,0.07) 0%, transparent 70%)" }} />
          <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-14 py-28 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <Reveal>
                  <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-7" style={{ background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.2)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                    <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: "#38bdf8" }}>Module 06 · Staff Attendance Management</span>
                  </div>
                </Reveal>
                <Reveal delay={80}>
                  <h1 className="font-serif font-light leading-[1.1] tracking-tight mb-6" style={{ fontSize: "clamp(2rem,5vw,3.4rem)", color: "#f0f9ff" }}>
                    Know who is on-site.<br />When. Where.<br /><em className="not-italic" style={{ color: "#38bdf8" }}>In real time.</em>
                  </h1>
                </Reveal>
                <Reveal delay={150}>
                  <p className="text-[15px] leading-[1.75] mb-10 max-w-[480px]" style={{ color: "rgba(240,249,255,0.65)" }}>
                    Firmity replaces paper registers and manual roll calls with a live attendance system — GPS-verified, mobile-first, and linked to shift rosters, leave management, and payroll exports.
                  </p>
                </Reveal>
                <Reveal delay={200}>
                  <div className="grid grid-cols-3 gap-5 mb-10 max-w-[440px]">
                    {[{ val: "89%", label: "Average attendance compliance rate" }, { val: "Real-time", label: "Live staff visibility across sites" }, { val: "Zero", label: "Paper registers or manual rollcalls" }].map(function(s) {
                      return (
                        <div key={s.val}>
                          <p className="font-serif font-light leading-none mb-1.5" style={{ fontSize: "clamp(1.3rem,3vw,1.9rem)", color: "#38bdf8" }}>{s.val}</p>
                          <p className="text-[10.5px] leading-snug" style={{ color: "rgba(240,249,255,0.45)" }}>{s.label}</p>
                        </div>
                      )
                    })}
                  </div>
                </Reveal>
                <Reveal delay={250}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[13px] font-semibold" style={{ background: "#38bdf8", color: "#0a1620" }}>Book a Demo <ArrowRight size={14} /></Link>
                    <Link href="/features" className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[13px] font-semibold" style={{ background: "rgba(56,189,248,0.08)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.2)" }}>Explore All Features</Link>
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
              <p className="text-[11px] font-semibold tracking-widest uppercase text-[#0369a1] mb-5">What Firmity Attendance delivers</p>
              <h2 className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c] mb-6" style={{ fontSize: "clamp(1.7rem,4vw,2.8rem)" }}>
                From paper registers<br className="hidden sm:block" />to real-time staff visibility.
              </h2>
              <p className="text-[15px] leading-[1.8] text-[#4a5568] max-w-2xl mx-auto">
                Facility managers who rely on paper registers or WhatsApp confirmations have no real-time picture of who is on duty. Firmity gives you a live dashboard of every staff member — present, late, absent, or on leave — across every site you manage.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 lg:py-24" style={{ background: "#f0f9ff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <Reveal>
              <div className="mb-12 lg:mb-16">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#0369a1] mb-3">Capabilities</p>
                <h2 className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c]" style={{ fontSize: "clamp(1.5rem,3.5vw,2.4rem)" }}>Everything your HR and ops teams need.</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {capabilities.map(function(cap, i) {
                const Icon = cap.Icon
                return (
                  <Reveal key={cap.title} delay={i * 55}>
                    <div className="rounded-2xl p-6 h-full" style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(56,189,248,0.1)" }}>
                        <Icon size={18} style={{ color: "#0369a1" }} strokeWidth={1.75} />
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

        <section style={{ background: "#0a1620" }} className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <Reveal>
              <div className="mb-12 lg:mb-16 text-center">
                <p className="text-[11px] font-semibold tracking-widest uppercase mb-3" style={{ color: "#38bdf8" }}>How it works</p>
                <h2 className="font-serif font-light leading-[1.15] tracking-tight" style={{ fontSize: "clamp(1.5rem,3.5vw,2.4rem)", color: "#f0f9ff" }}>Set up once. Track every shift automatically.</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
              <div className="hidden lg:block absolute top-[28px] left-[12.5%] right-[12.5%] h-px" style={{ background: "linear-gradient(to right, rgba(56,189,248,0.3), rgba(56,189,248,0.1))" }} />
              {steps.map(function(step, i) {
                const Icon = step.Icon
                return (
                  <Reveal key={step.num} delay={i * 90}>
                    <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5 relative z-10" style={{ background: "#0c2030", border: "1px solid rgba(56,189,248,0.3)" }}>
                        <Icon size={20} style={{ color: "#38bdf8" }} strokeWidth={1.5} />
                      </div>
                      <span className="text-[9px] font-bold tracking-widest mb-2" style={{ color: "rgba(56,189,248,0.5)" }}>{step.num}</span>
                      <h4 className="text-[13.5px] font-semibold mb-2" style={{ color: "#f0f9ff" }}>{step.title}</h4>
                      <p className="text-[12px] leading-[1.7]" style={{ color: "rgba(240,249,255,0.5)" }}>{step.desc}</p>
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
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#0369a1] mb-8">Business impact</p>
                <div className="space-y-8">
                  {[
                    { val: "100%", label: "Staff visibility in real time",         sub: "live dashboard replaces manual roll calls" },
                    { val: "Zero", label: "Proxy attendance with geo-fencing",      sub: "location verification prevents buddy punching" },
                    { val: "2x",   label: "Faster payroll processing",             sub: "payroll-ready exports eliminate manual calculation" },
                    { val: "50%",  label: "Reduction in HR administrative effort", sub: "leave approvals, reports, and overtime — automated" },
                  ].map(function(m) {
                    return (
                      <div key={m.val} className="flex gap-5 items-start">
                        <p className="font-serif font-light leading-none flex-shrink-0 w-[100px]" style={{ fontSize: "clamp(1.4rem,2.5vw,1.9rem)", color: "#0369a1" }}>{m.val}</p>
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
                <div className="rounded-2xl p-8" style={{ background: "#f0f9ff", border: "1px solid #bae6fd" }}>
                  <h3 className="font-serif font-light text-[1.35rem] text-[#1a202c] mb-7 leading-snug">Replace the register book<br />with live digital tracking.</h3>
                  <div className="space-y-4">
                    {[
                      "Staff check in from mobile — no hardware installation required",
                      "Geo-fence your facility to block remote or proxy check-ins",
                      "Get notified instantly when staff are late or absent for their shift",
                      "Handle leave requests, approvals, and balance tracking digitally",
                      "Export payroll data in formats compatible with your HR software",
                      "Track attendance across multiple sites from a single dashboard",
                    ].map(function(b) {
                      return (
                        <div key={b} className="flex gap-3 items-start">
                          <CheckCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color: "#0369a1" }} />
                          <p className="text-[12.5px] leading-[1.65] text-[#2d3748]">{b}</p>
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-8">
                    <Link href="/contact" className="inline-flex items-center gap-2 text-[12.5px] font-semibold hover:gap-3.5 transition-all" style={{ color: "#0369a1" }}>See it in action <ArrowRight size={14} /></Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24" style={{ background: "#f0f9ff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <Reveal>
              <div className="mb-12 text-center">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#0369a1] mb-3">Staff categories</p>
                <h2 className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c]" style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)" }}>Attendance tracking for every team type.</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {useCases.map(function(uc, i) {
                const Icon = uc.Icon
                return (
                  <Reveal key={uc.title} delay={i * 60}>
                    <div className="rounded-2xl p-6 h-full" style={{ background: "#ffffff", border: "1px solid #bae6fd" }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(56,189,248,0.1)" }}>
                        <Icon size={18} style={{ color: "#0369a1" }} strokeWidth={1.75} />
                      </div>
                      <h4 className="text-[13.5px] font-semibold text-[#1a202c] mb-2">{uc.title}</h4>
                      <p className="text-[12px] leading-[1.7] text-[#718096]">{uc.desc}</p>
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
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#0369a1] mb-3">Who uses it</p>
                <h2 className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c]" style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)" }}>Attendance management for every sector.</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {industries.map(function(ind, i) {
                return (
                  <Reveal key={ind.title} delay={i * 45}>
                    <div className="rounded-xl p-5" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
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

        <section style={{ background: "#0a1620" }} className="py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(56,189,248,0.06) 0%, transparent 70%)" }} />
          <div className="relative max-w-4xl mx-auto px-6 sm:px-10 text-center">
            <Reveal>
              <h2 className="font-serif font-light leading-[1.15] tracking-tight mb-4" style={{ fontSize: "clamp(1.6rem,4vw,2.6rem)", color: "#f0f9ff" }}>Ready to see who is on-site right now?</h2>
              <p className="text-[14px] leading-[1.75] mb-8 max-w-xl mx-auto" style={{ color: "rgba(240,249,255,0.6)" }}>Facility managers using Firmity Attendance eliminate proxy check-ins, speed up payroll processing, and always know exactly who is on duty — across every site they manage.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-[13px] font-semibold" style={{ background: "#38bdf8", color: "#0a1620" }}>Book a Demo <ArrowRight size={14} /></Link>
                <Link href="/features" className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-[13px] font-semibold" style={{ background: "rgba(56,189,248,0.08)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.2)" }}>Explore All Modules</Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
