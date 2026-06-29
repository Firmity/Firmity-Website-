import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Reveal } from "@/src/components/reveal"
import {
  ShieldCheck, Bell, BarChart2, CheckCircle, ArrowRight,
  Barcode, FileText, TrendingUp, Zap, Clock, Tag, AlertTriangle
} from "lucide-react"
import Link from "next/link"

function DashboardMockup() {
  const assets = [
    { name: "Carrier HVAC Unit",    id: "AST-0091", zone: "Roof",    status: "OK",      alert: "AMC due Mar 20", aColor: "#fbbf24" },
    { name: "Kone Elevator — L1",   id: "AST-0047", zone: "Block A", status: "Alert",   alert: "Warranty expiring", aColor: "#f87171" },
    { name: "Diesel Generator 40KW",id: "AST-0012", zone: "G Floor", status: "OK",      alert: "Service Mar 25",  aColor: "#fbbf24" },
    { name: "Bosch Fire Panel",     id: "AST-0063", zone: "Block B", status: "Critical",alert: "Cert expired!",    aColor: "#f87171" },
  ]
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-2xl" style={{ background: "#1c1a08", border: "1px solid rgba(251,191,36,0.15)" }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ background: "#161400", borderBottom: "1px solid rgba(251,191,36,0.1)" }}>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]" />
          <span className="text-[11px] font-medium text-white/70 tracking-wide">Firmity Assets · All Locations</span>
        </div>
        <div className="flex gap-1.5">
          <span className="text-[9px] px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24" }}>Active</span>
          <span className="text-[9px] px-2 py-0.5 rounded-full font-medium text-white/40 bg-white/5">Retired</span>
        </div>
      </div>
      <div className="grid grid-cols-3 px-4 py-3" style={{ background: "rgba(251,191,36,0.04)", borderBottom: "1px solid rgba(251,191,36,0.08)" }}>
        {[{ val: "247", sub: "Total Assets" }, { val: "14", sub: "Alerts Active" }, { val: "98%", sub: "Operational" }].map(function(s) {
          return (
            <div key={s.val} className="text-center">
              <p className="text-[13px] font-bold" style={{ color: "#fbbf24" }}>{s.val}</p>
              <p className="text-[8.5px] text-white/35">{s.sub}</p>
            </div>
          )
        })}
      </div>
      <div className="px-4 py-3 space-y-2">
        <span className="text-[9.5px] font-semibold text-white/30 uppercase tracking-widest">Asset Registry</span>
        {assets.map(function(a) {
          return (
            <div key={a.id} className="rounded-lg px-3 py-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(251,191,36,0.08)" }}>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[8.5px] font-bold text-white/30">{a.id}</span>
                <span className="ml-auto text-[8px] px-1.5 py-0.5 rounded font-semibold" style={{ background: a.aColor + "20", color: a.aColor }}>{a.status}</span>
              </div>
              <p className="text-[10px] font-medium text-white/80">{a.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <AlertTriangle size={8} style={{ color: a.aColor, flexShrink: 0 }} />
                <p className="text-[8.5px]" style={{ color: a.aColor + "cc" }}>{a.alert}</p>
                <span className="text-[8px] text-white/25 ml-auto">{a.zone}</span>
              </div>
            </div>
          )
        })}
      </div>
      <div className="px-4 py-3" style={{ background: "#161400", borderTop: "1px solid rgba(251,191,36,0.08)" }}>
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-white/35">Next alert in 3 days</span>
          <span className="text-[9px] font-semibold" style={{ color: "#fbbf24" }}>View all 14 alerts →</span>
        </div>
      </div>
    </div>
  )
}

export default function AssetManagementPage() {
  const capabilities = [
    { Icon: Barcode,     title: "Digital Asset Registry",        desc: "Maintain a complete database of every asset — photos, specs, purchase date, warranty, vendor, and location. QR-coded for instant field access." },
    { Icon: Bell,        title: "Smart Alert Engine",            desc: "Automated alerts for AMC renewals, warranty expiry, insurance deadlines, and compliance certifications — days before they are due." },
    { Icon: Tag,         title: "QR Code Asset Tagging",         desc: "Generate and print QR codes for each asset. Scan from mobile to instantly pull up history, documents, and upcoming tasks." },
    { Icon: TrendingUp,  title: "Lifecycle Cost Tracking",       desc: "Track every rupee spent on each asset — purchase, maintenance, repair, and disposal. Calculate true cost of ownership for smarter replacement decisions." },
    { Icon: FileText,    title: "Document Vault per Asset",      desc: "Attach AMC agreements, insurance policies, calibration certificates, and manuals directly to each asset record. Never lose a document again." },
    { Icon: BarChart2,   title: "Asset Performance Analytics",  desc: "View uptime history, repair frequency, cost trends, and depreciation. Identify underperformers before they become emergencies." },
  ]
  const steps = [
    { num: "01", Icon: Barcode,   title: "Register Asset",    desc: "Add asset details, specs, purchase info, and attach vendor documents. Generate QR code." },
    { num: "02", Icon: Bell,      title: "Set Alert Rules",   desc: "Configure maintenance intervals, warranty expiry lead times, and AMC renewal reminders." },
    { num: "03", Icon: Zap,       title: "Monitor Alerts",    desc: "System sends notifications to the right people before every critical date arrives." },
    { num: "04", Icon: BarChart2, title: "Analyse and Optimise", desc: "Review asset performance, repair history, and cost data. Make data-driven decisions." },
  ]
  const assetTypes = [
    { Icon: ShieldCheck, title: "MEP Equipment",      desc: "HVAC systems, chillers, AHUs, pumps, electrical panels, gensets, and UPS units with full maintenance history." },
    { Icon: Clock,       title: "Safety Systems",     desc: "Fire panels, sprinklers, emergency lighting, CCTV, access control — with compliance cert tracking built in." },
    { Icon: FileText,    title: "IT and Electronics", desc: "Servers, networking equipment, security systems, and AV equipment with depreciation tracking." },
    { Icon: Tag,         title: "Furniture and Fixtures", desc: "Office and common area furniture, fixtures, and appliances with location and custodian assignment." },
  ]
  const industries = [
    { title: "Commercial Buildings",     desc: "HVAC, elevators, fire safety, gensets, and MEP assets tracked with full maintenance and compliance history." },
    { title: "Manufacturing Plants",     desc: "Production machinery, conveyor systems, quality equipment, and safety systems with usage-based maintenance." },
    { title: "Hospitals and Healthcare", desc: "Medical equipment, sterilisation systems, emergency power, and life-support assets — audit-ready at all times." },
    { title: "Educational Institutions", desc: "Lab instruments, campus equipment, sports facilities, and IT assets tracked across multiple buildings." },
    { title: "Hotels and Hospitality",   desc: "Guest room systems, kitchen equipment, pool plant, and property infrastructure with warranty management." },
    { title: "Residential Communities",  desc: "Lifts, generators, pool equipment, gym assets, and utility systems tracked per block and common area." },
  ]
  return (
    <>
      <Navigation />
      <main className="overflow-x-hidden">
        <section style={{ background: "#1c1a08" }} className="relative min-h-screen flex items-center">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 20% 50%, rgba(251,191,36,0.07) 0%, transparent 70%)" }} />
          <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-14 py-28 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <Reveal>
                  <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-7" style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />
                    <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: "#fbbf24" }}>Module 04 · Asset Management and Alerts</span>
                  </div>
                </Reveal>
                <Reveal delay={80}>
                  <h1 className="font-serif font-light leading-[1.1] tracking-tight mb-6" style={{ fontSize: "clamp(2rem,5vw,3.4rem)", color: "#fffbeb" }}>
                    Know every asset.<br />Miss no deadline.<br /><em className="not-italic" style={{ color: "#fbbf24" }}>Maximise uptime.</em>
                  </h1>
                </Reveal>
                <Reveal delay={150}>
                  <p className="text-[15px] leading-[1.75] mb-10 max-w-[480px]" style={{ color: "rgba(255,251,235,0.65)" }}>
                    Firmity gives you a live registry of every asset your facility owns — with automated alerts for AMC renewals, warranty expiry, compliance certificates, and maintenance deadlines. Never be caught off-guard again.
                  </p>
                </Reveal>
                <Reveal delay={200}>
                  <div className="grid grid-cols-3 gap-5 mb-10 max-w-[440px]">
                    {[{ val: "247", label: "Assets tracked per facility on average" }, { val: "40%", label: "Less downtime vs unmanaged assets" }, { val: "Zero", label: "Missed AMC or warranty renewals" }].map(function(s) {
                      return (
                        <div key={s.val}>
                          <p className="font-serif font-light leading-none mb-1.5" style={{ fontSize: "clamp(1.6rem,3.5vw,2.2rem)", color: "#fbbf24" }}>{s.val}</p>
                          <p className="text-[10.5px] leading-snug" style={{ color: "rgba(255,251,235,0.45)" }}>{s.label}</p>
                        </div>
                      )
                    })}
                  </div>
                </Reveal>
                <Reveal delay={250}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[13px] font-semibold" style={{ background: "#fbbf24", color: "#1c1a08" }}>Book a Demo <ArrowRight size={14} /></Link>
                    <Link href="/features" className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[13px] font-semibold" style={{ background: "rgba(251,191,36,0.08)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.2)" }}>Explore All Features</Link>
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
              <p className="text-[11px] font-semibold tracking-widest uppercase text-[#b45309] mb-5">What Firmity Assets delivers</p>
              <h2 className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c] mb-6" style={{ fontSize: "clamp(1.7rem,4vw,2.8rem)" }}>
                A live command centre<br className="hidden sm:block" />for every asset you own.
              </h2>
              <p className="text-[15px] leading-[1.8] text-[#4a5568] max-w-2xl mx-auto">
                Most facilities discover asset problems too late — expired warranties, missed AMCs, failed inspections. Firmity makes every asset visible, every deadline tracked, and every alert automatic. So your team acts before issues escalate.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 lg:py-24" style={{ background: "#fffbeb" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <Reveal>
              <div className="mb-12 lg:mb-16">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#b45309] mb-3">Capabilities</p>
                <h2 className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c]" style={{ fontSize: "clamp(1.5rem,3.5vw,2.4rem)" }}>Everything your asset team needs.</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {capabilities.map(function(cap, i) {
                const Icon = cap.Icon
                return (
                  <Reveal key={cap.title} delay={i * 55}>
                    <div className="rounded-2xl p-6 h-full" style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(251,191,36,0.1)" }}>
                        <Icon size={18} style={{ color: "#b45309" }} strokeWidth={1.75} />
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

        <section style={{ background: "#1c1a08" }} className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <Reveal>
              <div className="mb-12 lg:mb-16 text-center">
                <p className="text-[11px] font-semibold tracking-widest uppercase mb-3" style={{ color: "#fbbf24" }}>How it works</p>
                <h2 className="font-serif font-light leading-[1.15] tracking-tight" style={{ fontSize: "clamp(1.5rem,3.5vw,2.4rem)", color: "#fffbeb" }}>Register once. Stay informed forever.</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
              <div className="hidden lg:block absolute top-[28px] left-[12.5%] right-[12.5%] h-px" style={{ background: "linear-gradient(to right, rgba(251,191,36,0.3), rgba(251,191,36,0.1))" }} />
              {steps.map(function(step, i) {
                const Icon = step.Icon
                return (
                  <Reveal key={step.num} delay={i * 90}>
                    <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5 relative z-10" style={{ background: "#2a2500", border: "1px solid rgba(251,191,36,0.3)" }}>
                        <Icon size={20} style={{ color: "#fbbf24" }} strokeWidth={1.5} />
                      </div>
                      <span className="text-[9px] font-bold tracking-widest mb-2" style={{ color: "rgba(251,191,36,0.5)" }}>{step.num}</span>
                      <h4 className="text-[13.5px] font-semibold mb-2" style={{ color: "#fffbeb" }}>{step.title}</h4>
                      <p className="text-[12px] leading-[1.7]" style={{ color: "rgba(255,251,235,0.5)" }}>{step.desc}</p>
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
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#b45309] mb-8">Business impact</p>
                <div className="space-y-8">
                  {[
                    { val: "40%", label: "Reduction in unplanned downtime",    sub: "alerts prevent failures before they happen" },
                    { val: "25%", label: "Extension of average asset lifespan", sub: "timely AMCs and servicing maximise equipment life" },
                    { val: "Zero", label: "Missed warranty or AMC renewals",   sub: "every critical date tracked and alerted automatically" },
                    { val: "100%", label: "Asset visibility across all sites",  sub: "single dashboard for every asset you own" },
                  ].map(function(m) {
                    return (
                      <div key={m.val} className="flex gap-5 items-start">
                        <p className="font-serif font-light leading-none flex-shrink-0 w-[100px]" style={{ fontSize: "clamp(1.4rem,2.5vw,1.9rem)", color: "#b45309" }}>{m.val}</p>
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
                <div className="rounded-2xl p-8" style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
                  <h3 className="font-serif font-light text-[1.35rem] text-[#1a202c] mb-7 leading-snug">Stop discovering problems<br />after they happen.</h3>
                  <div className="space-y-4">
                    {[
                      "Scan QR code on any asset to instantly view full history and upcoming tasks",
                      "Receive alerts via push, email, or SMS — days before any deadline",
                      "Link assets to PPM schedules, work orders, and vendor contracts",
                      "Track depreciation automatically for accounting and tax reporting",
                      "Generate asset audit reports for insurance and compliance reviews",
                      "Identify high-cost assets and make data-driven replacement decisions",
                    ].map(function(b) {
                      return (
                        <div key={b} className="flex gap-3 items-start">
                          <CheckCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color: "#b45309" }} />
                          <p className="text-[12.5px] leading-[1.65] text-[#2d3748]">{b}</p>
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-8">
                    <Link href="/contact" className="inline-flex items-center gap-2 text-[12.5px] font-semibold hover:gap-3.5 transition-all" style={{ color: "#b45309" }}>See it in action <ArrowRight size={14} /></Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24" style={{ background: "#fffbeb" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <Reveal>
              <div className="mb-12 text-center">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#b45309] mb-3">Asset categories</p>
                <h2 className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c]" style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)" }}>Track every asset type in one place.</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {assetTypes.map(function(at, i) {
                const Icon = at.Icon
                return (
                  <Reveal key={at.title} delay={i * 60}>
                    <div className="rounded-2xl p-6 h-full" style={{ background: "#ffffff", border: "1px solid #fde68a" }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(251,191,36,0.1)" }}>
                        <Icon size={18} style={{ color: "#b45309" }} strokeWidth={1.75} />
                      </div>
                      <h4 className="text-[13.5px] font-semibold text-[#1a202c] mb-2">{at.title}</h4>
                      <p className="text-[12px] leading-[1.7] text-[#718096]">{at.desc}</p>
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
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#b45309] mb-3">Who uses it</p>
                <h2 className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c]" style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)" }}>Asset management for every sector.</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {industries.map(function(ind, i) {
                return (
                  <Reveal key={ind.title} delay={i * 45}>
                    <div className="rounded-xl p-5" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />
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

        <section style={{ background: "#1c1a08" }} className="py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(251,191,36,0.06) 0%, transparent 70%)" }} />
          <div className="relative max-w-4xl mx-auto px-6 sm:px-10 text-center">
            <Reveal>
              <h2 className="font-serif font-light leading-[1.15] tracking-tight mb-4" style={{ fontSize: "clamp(1.6rem,4vw,2.6rem)", color: "#fffbeb" }}>Ready to take control of your assets?</h2>
              <p className="text-[14px] leading-[1.75] mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,251,235,0.6)" }}>Facility teams using Firmity Assets eliminate missed AMCs, reduce unplanned failures, and maximise the ROI of every piece of equipment they own.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-[13px] font-semibold" style={{ background: "#fbbf24", color: "#1c1a08" }}>Book a Demo <ArrowRight size={14} /></Link>
                <Link href="/features" className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-[13px] font-semibold" style={{ background: "rgba(251,191,36,0.08)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.2)" }}>Explore All Modules</Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
