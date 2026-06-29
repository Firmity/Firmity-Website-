import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Reveal } from "@/src/components/reveal"
import {
  Cloud, Search, Shield, Lock, UploadCloud, FolderOpen,
  FileText, CheckCircle, ArrowRight, Database, Bell,
  BarChart2, Users, Globe, RefreshCw, Tag
} from "lucide-react"
import Link from "next/link"

// ─── Records Dashboard mockup ─────────────────────────────────────────────────
function DashboardMockup() {
  const folders = [
    { name: "Tenancy Agreements", count: 142, updated: "2h ago"  },
    { name: "Compliance Certificates", count: 38,  updated: "Today"  },
    { name: "Vendor Contracts",    count: 67,  updated: "Yesterday" },
    { name: "Floor Plans",         count: 24,  updated: "Mar 10"  },
  ]
  const recent = [
    { name: "HVAC_ServiceContract_2025.pdf", tag: "Contract",     time: "9:42 AM" },
    { name: "Block_A_FloorPlan_v3.dwg",      tag: "Floor Plan",   time: "Yesterday" },
    { name: "FireSafety_Cert_Q1.pdf",         tag: "Compliance",   time: "Mar 11" },
  ]

  return (
    <div
      className="w-full rounded-2xl overflow-hidden shadow-2xl"
      style={{ background: "#0d1b2e", border: "1px solid rgba(99,179,237,0.15)" }}
    >
      {/* Titlebar */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ background: "#0a1624", borderBottom: "1px solid rgba(99,179,237,0.1)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#63b3ed]" />
          <span className="text-[11px] font-medium text-white/70 tracking-wide">Firmity Records · All Facilities</span>
        </div>
        <div className="flex gap-1.5">
          <span
            className="text-[9px] px-2 py-0.5 rounded-full font-medium"
            style={{ background: "rgba(99,179,237,0.15)", color: "#63b3ed" }}
          >Cloud</span>
          <span className="text-[9px] px-2 py-0.5 rounded-full font-medium text-white/40 bg-white/5">Archived</span>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-4 pt-3 pb-2">
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-2"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(99,179,237,0.12)" }}
        >
          <Search size={11} style={{ color: "rgba(99,179,237,0.5)" }} />
          <span className="text-[10px] text-white/25">Search documents, tags, facility...</span>
        </div>
      </div>

      {/* Folder list */}
      <div className="px-4 pb-2 space-y-1">
        <span className="text-[9.5px] font-semibold text-white/30 uppercase tracking-widest">Folders</span>
        {folders.map(function(f) {
          return (
            <div
              key={f.name}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(99,179,237,0.06)" }}
            >
              <FolderOpen size={11} style={{ color: "#63b3ed", flexShrink: 0 }} />
              <p className="text-[10px] font-medium text-white/75 flex-1 truncate">{f.name}</p>
              <span className="text-[8.5px] text-white/30 flex-shrink-0">{f.count} files</span>
              <span className="text-[8px] text-white/20 flex-shrink-0">{f.updated}</span>
            </div>
          )
        })}
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "rgba(99,179,237,0.07)", margin: "4px 16px" }} />

      {/* Recent docs */}
      <div className="px-4 py-2 space-y-1">
        <span className="text-[9.5px] font-semibold text-white/30 uppercase tracking-widest">Recently Accessed</span>
        {recent.map(function(r) {
          return (
            <div
              key={r.name}
              className="flex items-center gap-2 rounded-lg px-3 py-1.5"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <FileText size={10} style={{ color: "rgba(99,179,237,0.6)", flexShrink: 0 }} />
              <p className="text-[9.5px] text-white/60 flex-1 truncate">{r.name}</p>
              <span
                className="text-[8px] px-1.5 py-0.5 rounded font-medium flex-shrink-0"
                style={{ background: "rgba(99,179,237,0.1)", color: "#63b3ed" }}
              >{r.tag}</span>
              <span className="text-[8px] text-white/20 flex-shrink-0 ml-1">{r.time}</span>
            </div>
          )
        })}
      </div>

      {/* Stats footer */}
      <div
        className="grid grid-cols-3 px-4 py-3 mt-1"
        style={{ background: "#0a1624", borderTop: "1px solid rgba(99,179,237,0.08)" }}
      >
        {[
          { val: "2.4k", sub: "Total documents" },
          { val: "99.9%",sub: "Uptime SLA" },
          { val: "256-bit",sub: "Encryption" },
        ].map(function(s) {
          return (
            <div key={s.val} className="text-center">
              <p className="text-[13px] font-bold" style={{ color: "#63b3ed" }}>{s.val}</p>
              <p className="text-[8.5px] text-white/35 leading-tight">{s.sub}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FacilityRecordsPage() {

  const capabilities = [
    { Icon: UploadCloud, title: "Centralised Document Repository",   desc: "Store every facility document — contracts, floor plans, compliance certificates, warranties — in one searchable cloud location accessible from anywhere." },
    { Icon: Search,      title: "Instant Full-Text Search",           desc: "Find any document in seconds with full-text search across file names, tags, content, and metadata. No more hunting through shared drives." },
    { Icon: Tag,         title: "Smart Tagging and Classification",   desc: "Organise documents with custom tags, categories, and facility-linked metadata. Enforce consistent naming conventions across your team." },
    { Icon: Bell,        title: "Expiry and Renewal Alerts",          desc: "Never miss a contract renewal, certificate expiry, or compliance deadline. Automated reminders fire days or weeks in advance." },
    { Icon: Shield,      title: "Role-Based Access Control",          desc: "Grant granular permissions by role, department, or facility. Sensitive documents stay protected without blocking legitimate access." },
    { Icon: BarChart2,   title: "Audit Logs and Version History",     desc: "Every document view, edit, and download is logged with timestamp and user ID. Roll back to any previous version with one click." },
  ]

  const steps = [
    { num: "01", Icon: UploadCloud, title: "Upload and Tag",       desc: "Drag-and-drop files or bulk-import from existing drives. Tag by type, facility, and expiry date." },
    { num: "02", Icon: FolderOpen,  title: "Organise by Facility", desc: "Folder structures mirror your building hierarchy. Each site has its own record space." },
    { num: "03", Icon: Bell,        title: "Set Expiry Alerts",    desc: "Define lead times for contracts, certificates, and warranties. Alerts go to the right people automatically." },
    { num: "04", Icon: Search,      title: "Search and Retrieve",  desc: "Anyone with the right permissions finds what they need instantly — from desktop or mobile." },
  ]

  const documentTypes = [
    { Icon: FileText,     title: "Tenancy and Leases",     desc: "Lease agreements, addenda, rent schedules, occupancy certificates, and tenant correspondence stored and versioned." },
    { Icon: CheckCircle,  title: "Compliance Documents",   desc: "Fire safety certificates, lift inspection reports, electrical certifications, and statutory compliance records." },
    { Icon: FolderOpen,   title: "Vendor Contracts",       desc: "AMC agreements, service contracts, SLAs, purchase orders, and vendor performance records in one place." },
    { Icon: Database,     title: "As-Built Drawings",      desc: "Floor plans, M&E schematics, structural drawings, and CAD files with revision history and markup support." },
  ]

  const industries = [
    { title: "Commercial Offices",       desc: "Lease agreements, MEP drawings, compliance certs, and fit-out approvals for multi-tenant buildings." },
    { title: "Residential Communities",  desc: "Unit ownership records, NOC history, facility handover documents, and shared asset registers." },
    { title: "Retail and Malls",         desc: "Retailer agreements, brand guidelines, maintenance contracts, and common-area usage records." },
    { title: "Healthcare Facilities",    desc: "Equipment certifications, sterilisation logs, NABH documentation, and regulatory compliance records." },
    { title: "Educational Institutions", desc: "Campus infrastructure records, lab equipment manuals, safety certificates, and vendor agreements." },
    { title: "Industrial and Logistics", desc: "Plant drawings, ISO documentation, safety registers, and equipment calibration certificates." },
  ]

  return (
    <>
      <Navigation />
      <main className="overflow-x-hidden">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section style={{ background: "#0c1a32" }} className="relative min-h-screen flex items-center">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 60% at 20% 50%, rgba(99,179,237,0.07) 0%, transparent 70%)" }}
          />
          <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-14 py-28 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Left */}
              <div>
                <Reveal>
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-7"
                    style={{ background: "rgba(99,179,237,0.1)", border: "1px solid rgba(99,179,237,0.2)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#63b3ed]" />
                    <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: "#63b3ed" }}>
                      Module 01 · Cloud-Based Facility Records
                    </span>
                  </div>
                </Reveal>

                <Reveal delay={80}>
                  <h1
                    className="font-serif font-light leading-[1.1] tracking-tight mb-6"
                    style={{ fontSize: "clamp(2rem,5vw,3.4rem)", color: "#f0f8ff" }}
                  >
                    Every document.<br />
                    Every facility.<br />
                    <em className="not-italic" style={{ color: "#63b3ed" }}>Always accessible.</em>
                  </h1>
                </Reveal>

                <Reveal delay={150}>
                  <p className="text-[15px] leading-[1.75] mb-10 max-w-[480px]" style={{ color: "rgba(240,248,255,0.65)" }}>
                    Firmity replaces scattered drives, email attachments, and paper filing cabinets with a single
                    cloud repository — searchable, access-controlled, and linked directly to your facilities, assets,
                    and vendors.
                  </p>
                </Reveal>

                <Reveal delay={200}>
                  <div className="grid grid-cols-3 gap-5 mb-10 max-w-[440px]">
                    {[
                      { val: "2.4k+", label: "Documents managed per facility" },
                      { val: "99.9%", label: "Cloud uptime SLA" },
                      { val: "0",     label: "Lost documents with Firmity" },
                    ].map(function(s) {
                      return (
                        <div key={s.val}>
                          <p
                            className="font-serif font-light leading-none mb-1.5"
                            style={{ fontSize: "clamp(1.6rem,3.5vw,2.2rem)", color: "#63b3ed" }}
                          >
                            {s.val}
                          </p>
                          <p className="text-[10.5px] leading-snug" style={{ color: "rgba(240,248,255,0.45)" }}>
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
                      style={{ background: "#63b3ed", color: "#0c1a32" }}
                    >
                      Book a Demo <ArrowRight size={14} />
                    </Link>
                    <Link
                      href="/features"
                      className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[13px] font-semibold transition-all"
                      style={{ background: "rgba(99,179,237,0.08)", color: "#63b3ed", border: "1px solid rgba(99,179,237,0.2)" }}
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
              <p className="text-[11px] font-semibold tracking-widest uppercase text-[#2b6cb0] mb-5">
                What Firmity Records delivers
              </p>
              <h2
                className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c] mb-6"
                style={{ fontSize: "clamp(1.7rem,4vw,2.8rem)" }}
              >
                One source of truth for<br className="hidden sm:block" />
                every facility document.
              </h2>
              <p className="text-[15px] leading-[1.8] text-[#4a5568] max-w-2xl mx-auto">
                Most facility teams lose hours each week hunting for documents across email threads, shared drives,
                and physical files. Firmity centralises everything — with expiry alerts, version control, and
                role-based access — so the right document reaches the right person in seconds.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Capability grid ───────────────────────────────────────────────── */}
        <section className="py-16 lg:py-24" style={{ background: "#f7fbff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <Reveal>
              <div className="mb-12 lg:mb-16">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#2b6cb0] mb-3">Capabilities</p>
                <h2
                  className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c]"
                  style={{ fontSize: "clamp(1.5rem,3.5vw,2.4rem)" }}
                >
                  Everything your records team needs.
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
                        style={{ background: "rgba(99,179,237,0.1)" }}
                      >
                        <Icon size={18} style={{ color: "#2b6cb0" }} strokeWidth={1.75} />
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
        <section style={{ background: "#0c1a32" }} className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <Reveal>
              <div className="mb-12 lg:mb-16 text-center">
                <p className="text-[11px] font-semibold tracking-widest uppercase mb-3" style={{ color: "#63b3ed" }}>
                  How it works
                </p>
                <h2
                  className="font-serif font-light leading-[1.15] tracking-tight"
                  style={{ fontSize: "clamp(1.5rem,3.5vw,2.4rem)", color: "#f0f8ff" }}
                >
                  From file chaos to instant retrieval.
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
              <div
                className="hidden lg:block absolute top-[28px] left-[12.5%] right-[12.5%] h-px"
                style={{ background: "linear-gradient(to right, rgba(99,179,237,0.3), rgba(99,179,237,0.1))" }}
              />
              {steps.map(function(step, i) {
                const Icon = step.Icon
                return (
                  <Reveal key={step.num} delay={i * 90}>
                    <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center mb-5 relative z-10"
                        style={{ background: "#0c2240", border: "1px solid rgba(99,179,237,0.3)" }}
                      >
                        <Icon size={20} style={{ color: "#63b3ed" }} strokeWidth={1.5} />
                      </div>
                      <span className="text-[9px] font-bold tracking-widest mb-2" style={{ color: "rgba(99,179,237,0.5)" }}>
                        {step.num}
                      </span>
                      <h4 className="text-[13.5px] font-semibold mb-2" style={{ color: "#f0f8ff" }}>{step.title}</h4>
                      <p className="text-[12px] leading-[1.7]" style={{ color: "rgba(240,248,255,0.5)" }}>{step.desc}</p>
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
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#2b6cb0] mb-8">Business impact</p>
                <div className="space-y-8">
                  {[
                    { val: "80%",    label: "Less time spent finding documents",   sub: "instant search replaces manual folder hunting" },
                    { val: "Zero",   label: "Missed contract renewals",            sub: "automated alerts fire before every deadline" },
                    { val: "100%",   label: "Audit-ready at any time",             sub: "every access, edit, and download is logged" },
                    { val: "256-bit",label: "Encryption at rest and in transit",   sub: "enterprise-grade security with role-based access" },
                  ].map(function(m) {
                    return (
                      <div key={m.val} className="flex gap-5 items-start">
                        <p
                          className="font-serif font-light leading-none flex-shrink-0 w-[110px]"
                          style={{ fontSize: "clamp(1.4rem,2.5vw,1.9rem)", color: "#2b6cb0" }}
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
                  style={{ background: "#ebf8ff", border: "1px solid #bee3f8" }}
                >
                  <h3 className="font-serif font-light text-[1.35rem] text-[#1a202c] mb-7 leading-snug">
                    Replace the filing cabinet<br />with something smarter.
                  </h3>
                  <div className="space-y-4">
                    {[
                      "Access any document from desktop, tablet, or mobile — anywhere, anytime",
                      "Share documents securely with external parties via time-limited links",
                      "Link documents directly to assets, vendors, and work orders",
                      "Bulk-import existing files from Google Drive, OneDrive, or local storage",
                      "Receive expiry alerts for leases, certificates, AMCs, and insurance",
                      "Generate document compliance reports for audits in one click",
                    ].map(function(b) {
                      return (
                        <div key={b} className="flex gap-3 items-start">
                          <CheckCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color: "#2b6cb0" }} />
                          <p className="text-[12.5px] leading-[1.65] text-[#2d3748]">{b}</p>
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-8">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-[12.5px] font-semibold transition-all hover:gap-3.5"
                      style={{ color: "#2b6cb0" }}
                    >
                      See it in action <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </Reveal>

            </div>
          </div>
        </section>

        {/* ── Document types ────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-24" style={{ background: "#f7fbff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <Reveal>
              <div className="mb-12 text-center">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#2b6cb0] mb-3">
                  Document types
                </p>
                <h2
                  className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c]"
                  style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)" }}
                >
                  One platform. Every document category.
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {documentTypes.map(function(dt, i) {
                const Icon = dt.Icon
                return (
                  <Reveal key={dt.title} delay={i * 60}>
                    <div
                      className="rounded-2xl p-6 h-full"
                      style={{ background: "#ffffff", border: "1px solid #bee3f8" }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: "rgba(99,179,237,0.1)" }}
                      >
                        <Icon size={18} style={{ color: "#2b6cb0" }} strokeWidth={1.75} />
                      </div>
                      <h4 className="text-[13.5px] font-semibold text-[#1a202c] mb-2">{dt.title}</h4>
                      <p className="text-[12px] leading-[1.7] text-[#718096]">{dt.desc}</p>
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
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#2b6cb0] mb-3">Who uses it</p>
                <h2
                  className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c]"
                  style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)" }}
                >
                  Records management for every sector.
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
                        <div className="w-1.5 h-1.5 rounded-full bg-[#63b3ed]" />
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
        <section style={{ background: "#0c1a32" }} className="py-16 lg:py-20 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(99,179,237,0.06) 0%, transparent 70%)" }}
          />
          <div className="relative max-w-4xl mx-auto px-6 sm:px-10 text-center">
            <Reveal>
              <h2
                className="font-serif font-light leading-[1.15] tracking-tight mb-4"
                style={{ fontSize: "clamp(1.6rem,4vw,2.6rem)", color: "#f0f8ff" }}
              >
                Ready to centralise your facility records?
              </h2>
              <p
                className="text-[14px] leading-[1.75] mb-8 max-w-xl mx-auto"
                style={{ color: "rgba(240,248,255,0.6)" }}
              >
                Facility teams using Firmity Records eliminate document loss, pass audits faster, and reclaim
                hours every week — without changing how they work.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-[13px] font-semibold transition-all"
                  style={{ background: "#63b3ed", color: "#0c1a32" }}
                >
                  Book a Demo <ArrowRight size={14} />
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-[13px] font-semibold transition-all"
                  style={{ background: "rgba(99,179,237,0.08)", color: "#63b3ed", border: "1px solid rgba(99,179,237,0.2)" }}
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
