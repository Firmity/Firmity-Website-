import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Reveal } from "@/src/components/reveal"
import {
  Eye, CheckCircle, ArrowRight, Bell, BarChart2,
  Smartphone, FileText, Zap, Shield, Clock, QrCode, Users
} from "lucide-react"
import Link from "next/link"

function DashboardMockup() {
  const visitors = [
    { name: "Rahul Sharma",   host: "Mr. Kapoor",   purpose: "Meeting",    time: "10:02 AM", status: "Inside"   },
    { name: "Priya Mehta",    host: "Admin Office",  purpose: "Delivery",   time: "10:34 AM", status: "Inside"   },
    { name: "Anil Verma",     host: "Mr. Iyer",      purpose: "Interview",  time: "11:00 AM", status: "Expected" },
    { name: "Sunita Reddy",   host: "Mrs. Patil",    purpose: "Contractor", time: "09:45 AM", status: "Exited"   },
  ]
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-2xl" style={{ background: "#0f1c2e", border: "1px solid rgba(244,114,182,0.15)" }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ background: "#0a1422", borderBottom: "1px solid rgba(244,114,182,0.1)" }}>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#f472b6]" />
          <span className="text-[11px] font-medium text-white/70 tracking-wide">Firmity Visitors · Today</span>
        </div>
        <div className="flex gap-1.5">
          <span className="text-[9px] px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(244,114,182,0.15)", color: "#f472b6" }}>Live</span>
          <span className="text-[9px] px-2 py-0.5 rounded-full font-medium text-white/40 bg-white/5">Log</span>
        </div>
      </div>
      <div className="grid grid-cols-4 px-4 py-3" style={{ background: "rgba(244,114,182,0.04)", borderBottom: "1px solid rgba(244,114,182,0.08)" }}>
        {[
          { val: "24",  sub: "Total Today", col: "#f472b6" },
          { val: "8",   sub: "Inside Now",  col: "#4ade80" },
          { val: "3",   sub: "Expected",    col: "#fbbf24" },
          { val: "13",  sub: "Exited",      col: "rgba(255,255,255,0.3)" },
        ].map(function(s) {
          return (
            <div key={s.sub} className="text-center">
              <p className="text-[13px] font-bold" style={{ color: s.col }}>{s.val}</p>
              <p className="text-[8.5px] text-white/35">{s.sub}</p>
            </div>
          )
        })}
      </div>
      <div className="px-4 py-3 space-y-2">
        <span className="text-[9.5px] font-semibold text-white/30 uppercase tracking-widest">Visitor Log</span>
        {visitors.map(function(v) {
          const col = v.status === "Inside" ? "#4ade80" : v.status === "Expected" ? "#fbbf24" : "rgba(255,255,255,0.3)"
          return (
            <div key={v.name} className="rounded-lg px-3 py-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(244,114,182,0.08)" }}>
              <div className="flex items-center gap-2 mb-0.5">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(244,114,182,0.1)" }}>
                  <span className="text-[8px] font-bold" style={{ color: "#f472b6" }}>{v.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-medium text-white/80 truncate">{v.name}</p>
                  <p className="text-[8.5px] text-white/30">Host: {v.host} · {v.purpose}</p>
                </div>
                <span className="text-[8px] text-white/25 flex-shrink-0">{v.time}</span>
                <span className="text-[8px] px-1.5 py-0.5 rounded font-semibold flex-shrink-0 ml-1" style={{ background: col + "20", color: col }}>{v.status}</span>
              </div>
            </div>
          )
        })}
      </div>
      <div className="px-4 py-2.5" style={{ background: "#0a1422", borderTop: "1px solid rgba(244,114,182,0.08)" }}>
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-white/35">3 pre-approved passes pending</span>
          <span className="text-[9px] font-semibold" style={{ color: "#f472b6" }}>Approve all →</span>
        </div>
      </div>
    </div>
  )
}

export default function VisitorManagementPage() {
  const capabilities = [
    { Icon: QrCode,     title: "Digital Pre-Registration",         desc: "Hosts send a pre-registration link to expected visitors. QR pass is issued before arrival — no paperwork at the gate, zero queues." },
    { Icon: Smartphone, title: "Mobile Check-In and Check-Out",    desc: "Visitors scan their QR pass on arrival. Guard verifies digitally and logs entry in real time. Exit recorded on departure." },
    { Icon: Shield,     title: "Host Notification and Approval",   desc: "Hosts receive instant notifications when their visitor arrives. One-tap approval or rejection from mobile — no intercom hunting." },
    { Icon: Eye,        title: "Live Visitor Dashboard",           desc: "Security and facility managers see every visitor currently inside — name, host, purpose, entry time, and expected exit." },
    { Icon: Bell,       title: "Overstay and Blacklist Alerts",    desc: "Get notified when a visitor exceeds their permitted duration. Block-listed individuals are flagged automatically at check-in." },
    { Icon: BarChart2,  title: "Visitor Analytics and Reports",    desc: "Track visitor volumes by day, zone, host, and purpose. Generate compliance reports and occupancy data for management." },
  ]
  const steps = [
    { num: "01", Icon: QrCode,     title: "Pre-Register or Walk In",   desc: "Host pre-registers visitor online, or guard logs walk-in visitor at the gate with ID and purpose." },
    { num: "02", Icon: Bell,       title: "Host Notified",             desc: "Host receives push notification and approves entry with one tap from their mobile." },
    { num: "03", Icon: Smartphone, title: "QR Pass Issued",            desc: "Visitor receives digital pass. Guard scans at entry — no printed badges, no manual logbooks." },
    { num: "04", Icon: BarChart2,  title: "Exit Logged and Reported",  desc: "Check-out is recorded digitally. Full visit log is stored for compliance and audit." },
  ]
  const visitorTypes = [
    { Icon: Users,    title: "Business Visitors",   desc: "Meeting guests, clients, and partners — pre-registered by host with appointment details and permitted zones." },
    { Icon: FileText, title: "Vendors and Contractors", desc: "Service providers and contractors with time-bound access permits, document verification, and work permit linkage." },
    { Icon: Zap,      title: "Delivery Personnel",  desc: "Couriers and delivery staff with single-use passes, restricted to reception or goods entry zones only." },
    { Icon: Clock,    title: "Interview Candidates",desc: "Pre-registered candidates with one-time passes linked to HR host — auto-expire after the appointment window." },
  ]
  const industries = [
    { title: "Commercial Offices",       desc: "Professional visitor management for multi-tenant buildings — host-approved passes, floor-level access control." },
    { title: "Residential Communities",  desc: "Guest, domestic help, and delivery tracking with resident approval and security log for every entry." },
    { title: "Manufacturing Plants",     desc: "Contractor and vendor access with safety induction verification, permit-to-work linkage, and zone restrictions." },
    { title: "Hospitals and Healthcare", desc: "Patient visitor management with ward-level access control, permitted hours, and infection control compliance." },
    { title: "Educational Institutions", desc: "Parent, vendor, and contractor visits with student-linked approvals and campus security integration." },
    { title: "Hotels and Hospitality",   desc: "Guest visitor tracking, contractor access, and supplier deliveries managed from a single security desk dashboard." },
  ]
  return (
    <>
      <Navigation />
      <main className="overflow-x-hidden">
        <section style={{ background: "#0f1c2e" }} className="relative min-h-screen flex items-center">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 20% 50%, rgba(244,114,182,0.07) 0%, transparent 70%)" }} />
          <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-14 py-28 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <Reveal>
                  <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-7" style={{ background: "rgba(244,114,182,0.1)", border: "1px solid rgba(244,114,182,0.2)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f472b6]" />
                    <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: "#f472b6" }}>Module 07 · Visitor Management</span>
                  </div>
                </Reveal>
                <Reveal delay={80}>
                  <h1 className="font-serif font-light leading-[1.1] tracking-tight mb-6" style={{ fontSize: "clamp(2rem,5vw,3.4rem)", color: "#fdf2f8" }}>
                    Know every visitor.<br />Control every entry.<br /><em className="not-italic" style={{ color: "#f472b6" }}>Zero paper. Zero risk.</em>
                  </h1>
                </Reveal>
                <Reveal delay={150}>
                  <p className="text-[15px] leading-[1.75] mb-10 max-w-[480px]" style={{ color: "rgba(253,242,248,0.65)" }}>
                    Firmity replaces paper logbooks and manual gate registers with a fully digital visitor system — pre-registration, QR-based check-in, host approval, real-time occupancy, and complete visit history for every person who enters your facility.
                  </p>
                </Reveal>
                <Reveal delay={200}>
                  <div className="grid grid-cols-3 gap-5 mb-10 max-w-[440px]">
                    {[
                      { val: "Zero",  label: "Paper logbooks or manual registers" },
                      { val: "30s",   label: "Average check-in time with QR pass" },
                      { val: "100%",  label: "Visitor audit trail for compliance" },
                    ].map(function(s) {
                      return (
                        <div key={s.val}>
                          <p className="font-serif font-light leading-none mb-1.5" style={{ fontSize: "clamp(1.6rem,3.5vw,2.2rem)", color: "#f472b6" }}>{s.val}</p>
                          <p className="text-[10.5px] leading-snug" style={{ color: "rgba(253,242,248,0.45)" }}>{s.label}</p>
                        </div>
                      )
                    })}
                  </div>
                </Reveal>
                <Reveal delay={250}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[13px] font-semibold" style={{ background: "#f472b6", color: "#0f1c2e" }}>Book a Demo <ArrowRight size={14} /></Link>
                    <Link href="/features" className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[13px] font-semibold" style={{ background: "rgba(244,114,182,0.08)", color: "#f472b6", border: "1px solid rgba(244,114,182,0.2)" }}>Explore All Features</Link>
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
              <p className="text-[11px] font-semibold tracking-widest uppercase text-[#be185d] mb-5">What Firmity Visitors delivers</p>
              <h2 className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c] mb-6" style={{ fontSize: "clamp(1.7rem,4vw,2.8rem)" }}>
                Replace the paper logbook<br className="hidden sm:block" />with a security-grade system.
              </h2>
              <p className="text-[15px] leading-[1.8] text-[#4a5568] max-w-2xl mx-auto">
                Paper visitor registers are a compliance liability — illegible, unverified, and impossible to audit. Firmity gives every visitor a digital identity from the moment they are expected, through check-in, to the moment they leave.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 lg:py-24" style={{ background: "#fdf2f8" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <Reveal>
              <div className="mb-12 lg:mb-16">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#be185d] mb-3">Capabilities</p>
                <h2 className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c]" style={{ fontSize: "clamp(1.5rem,3.5vw,2.4rem)" }}>Everything your security team needs.</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {capabilities.map(function(cap, i) {
                const Icon = cap.Icon
                return (
                  <Reveal key={cap.title} delay={i * 55}>
                    <div className="rounded-2xl p-6 h-full" style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(244,114,182,0.1)" }}>
                        <Icon size={18} style={{ color: "#be185d" }} strokeWidth={1.75} />
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

        <section style={{ background: "#0f1c2e" }} className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <Reveal>
              <div className="mb-12 lg:mb-16 text-center">
                <p className="text-[11px] font-semibold tracking-widest uppercase mb-3" style={{ color: "#f472b6" }}>How it works</p>
                <h2 className="font-serif font-light leading-[1.15] tracking-tight" style={{ fontSize: "clamp(1.5rem,3.5vw,2.4rem)", color: "#fdf2f8" }}>From expected to exited. Fully tracked.</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
              <div className="hidden lg:block absolute top-[28px] left-[12.5%] right-[12.5%] h-px" style={{ background: "linear-gradient(to right, rgba(244,114,182,0.3), rgba(244,114,182,0.1))" }} />
              {steps.map(function(step, i) {
                const Icon = step.Icon
                return (
                  <Reveal key={step.num} delay={i * 90}>
                    <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5 relative z-10" style={{ background: "#1a2640", border: "1px solid rgba(244,114,182,0.3)" }}>
                        <Icon size={20} style={{ color: "#f472b6" }} strokeWidth={1.5} />
                      </div>
                      <span className="text-[9px] font-bold tracking-widest mb-2" style={{ color: "rgba(244,114,182,0.5)" }}>{step.num}</span>
                      <h4 className="text-[13.5px] font-semibold mb-2" style={{ color: "#fdf2f8" }}>{step.title}</h4>
                      <p className="text-[12px] leading-[1.7]" style={{ color: "rgba(253,242,248,0.5)" }}>{step.desc}</p>
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
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#be185d] mb-8">Business impact</p>
                <div className="space-y-8">
                  {[
                    { val: "30s",   label: "Average check-in time",              sub: "vs 3-5 minutes with paper registers and phone calls" },
                    { val: "100%",  label: "Visitor audit trail retained",       sub: "every visit timestamped and stored for compliance" },
                    { val: "Zero",  label: "Unauthorised entries go undetected", sub: "host approval and blacklist checks on every visit" },
                    { val: "Real-time", label: "Occupancy visibility",          sub: "know exactly who is inside your facility right now" },
                  ].map(function(m) {
                    return (
                      <div key={m.val} className="flex gap-5 items-start">
                        <p className="font-serif font-light leading-none flex-shrink-0 w-[110px]" style={{ fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "#be185d" }}>{m.val}</p>
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
                <div className="rounded-2xl p-8" style={{ background: "#fdf2f8", border: "1px solid #fbcfe8" }}>
                  <h3 className="font-serif font-light text-[1.35rem] text-[#1a202c] mb-7 leading-snug">Close the gate on<br />security blind spots.</h3>
                  <div className="space-y-4">
                    {[
                      "Send pre-registration links to visitors before they arrive — no surprises at the gate",
                      "Host receives mobile notification and approves entry with one tap",
                      "Visitor photo captured at check-in for identity verification",
                      "Overstay alerts notify security when a visitor exceeds permitted time",
                      "Block-listed individuals flagged automatically — no manual checking",
                      "Generate visitor compliance reports for audits and insurance requirements",
                    ].map(function(b) {
                      return (
                        <div key={b} className="flex gap-3 items-start">
                          <CheckCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color: "#be185d" }} />
                          <p className="text-[12.5px] leading-[1.65] text-[#2d3748]">{b}</p>
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-8">
                    <Link href="/contact" className="inline-flex items-center gap-2 text-[12.5px] font-semibold hover:gap-3.5 transition-all" style={{ color: "#be185d" }}>See it in action <ArrowRight size={14} /></Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24" style={{ background: "#fdf2f8" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <Reveal>
              <div className="mb-12 text-center">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#be185d] mb-3">Visitor types</p>
                <h2 className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c]" style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)" }}>One system. Every type of visitor.</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {visitorTypes.map(function(vt, i) {
                const Icon = vt.Icon
                return (
                  <Reveal key={vt.title} delay={i * 60}>
                    <div className="rounded-2xl p-6 h-full" style={{ background: "#ffffff", border: "1px solid #fbcfe8" }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(244,114,182,0.1)" }}>
                        <Icon size={18} style={{ color: "#be185d" }} strokeWidth={1.75} />
                      </div>
                      <h4 className="text-[13.5px] font-semibold text-[#1a202c] mb-2">{vt.title}</h4>
                      <p className="text-[12px] leading-[1.7] text-[#718096]">{vt.desc}</p>
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
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#be185d] mb-3">Who uses it</p>
                <h2 className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c]" style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)" }}>Visitor management for every facility type.</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {industries.map(function(ind, i) {
                return (
                  <Reveal key={ind.title} delay={i * 45}>
                    <div className="rounded-xl p-5" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#f472b6]" />
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

        <section style={{ background: "#0f1c2e" }} className="py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(244,114,182,0.06) 0%, transparent 70%)" }} />
          <div className="relative max-w-4xl mx-auto px-6 sm:px-10 text-center">
            <Reveal>
              <h2 className="font-serif font-light leading-[1.15] tracking-tight mb-4" style={{ fontSize: "clamp(1.6rem,4vw,2.6rem)", color: "#fdf2f8" }}>Ready to make your facility entrance secure and paperless?</h2>
              <p className="text-[14px] leading-[1.75] mb-8 max-w-xl mx-auto" style={{ color: "rgba(253,242,248,0.6)" }}>
                Facilities using Firmity Visitors eliminate paper logbooks, reduce check-in time to under 30 seconds, and maintain a complete compliance-ready visitor audit trail — automatically.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-[13px] font-semibold" style={{ background: "#f472b6", color: "#0f1c2e" }}>Book a Demo <ArrowRight size={14} /></Link>
                <Link href="/features" className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-[13px] font-semibold" style={{ background: "rgba(244,114,182,0.08)", color: "#f472b6", border: "1px solid rgba(244,114,182,0.2)" }}>Explore All Modules</Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
