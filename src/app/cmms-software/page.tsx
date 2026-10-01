// ─── /cmms-software — "CMMS Software for Maintenance Management" ───────────
// Built 2026-09-30, same structural template as /cafm-software (see that
// page's own header comment for the design-token rationale). Content is
// keyword-rich and sourced from Firmity_Features_Listing_Comprehensive_Client.pdf
// (Checklists/Task Management + Assets & Spares Management sections) plus the
// FAQ doc linked for this page in the SEO tracker spreadsheet.
//
// Server Component: no interactivity of its own (FAQ uses native <details>),
// so no "use client" is needed — Navigation/Footer/ContactWalkthroughSection
// are Client Components and render fine from a Server parent.
import Link from "next/link"
import { CheckCircle2, ChevronDown } from "lucide-react"
import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { ContactWalkthroughSection } from "@/src/components/contact-walkthrough-section"
import { JsonLd } from "@/src/components/json-ld"
import { faqJsonLd } from "@/src/lib/seo"

const H2 =
  "font-serif text-[clamp(1.4rem,2.8vw,1.9rem)] font-light text-[#114dac] leading-tight tracking-tight mb-3"
const H3 = "font-serif text-[17px] font-light text-[#114dac] leading-snug mb-1.5"
const BODY = "text-[13.5px] font-light leading-[1.8] text-[#000000]"
const SECTION = "max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-8"
const LINK = "text-[#2b6cb0] font-semibold hover:underline"

const MODULES = [
  { title: "Work order management", body: "Raise, assign, and track work orders from creation through to sign-off, with a full audit trail on every job." },
  { title: "Preventive maintenance scheduling", body: "Configure recurring PPM cycles by day, week, or month — the system auto-generates the next occurrence and flags overdue work." },
  { title: "QR-based task execution", body: "Technicians scan a location-based QR code to open the task, complete the checklist, and capture photo evidence on the spot." },
  { title: "Asset & spare parts tracking", body: "Every asset carries its own service history, warranty, and linked spare parts, so maintenance decisions use real data." },
  { title: "Technician assignment & workload", body: "Work is assigned to individual technicians by category, with reassignment and escalation when a job stalls." },
  { title: "Maintenance reports & dashboards", body: "Track total, completed, overdue, and actionable work orders across every site from one dashboard, exportable to Excel or PDF." },
]

const WITHOUT = [
  "Maintenance schedules tracked in spreadsheets or a wall calendar",
  "Work orders passed along verbally or over WhatsApp",
  "No record of which asset was serviced, when, or by whom",
  "Breakdowns discovered only after equipment has already failed",
  "Spare parts usage never tied back to the asset it was used on",
]

const WITH = [
  "Every PPM cycle auto-scheduled and assigned without manual follow-up",
  "Work orders logged, assigned, and tracked to closure with a timestamped trail",
  "Full service history against each asset — dates, technicians, parts used",
  "Preventive checks catch issues before they become breakdowns",
  "Spare parts consumption linked directly to the asset and work order",
]

const STEPS = [
  { title: "Set up assets & checklists", body: "Log every asset once and configure the checklists and categories maintenance work will run against." },
  { title: "Schedule preventive maintenance", body: "Define PPM frequency per asset or location — the system generates and assigns the next cycle automatically." },
  { title: "Execute with QR & mobile", body: "Technicians scan the task QR, complete the checklist, and log remarks or photo evidence from the field." },
  { title: "Track, report & audit", body: "Overdue work, actionable items, and completion history roll up into dashboards ready for any review." },
]

const COMPARISON = [
  { capability: "Work order tracking", manual: "Spreadsheet or notebook", cmms: "Logged, assigned, and timestamped" },
  { capability: "Preventive maintenance", manual: "Manually scheduled, easy to miss", cmms: "Auto-generated recurring cycles" },
  { capability: "Asset service history", manual: "Scattered across files and memory", cmms: "One record per asset, always current" },
  { capability: "Spare parts usage", manual: "Untracked or reconciled later", cmms: "Linked to the asset and work order" },
  { capability: "Maintenance reporting", manual: "Manually compiled, delayed", cmms: "Live dashboards, exportable anytime" },
]

const REASONS = [
  { title: "Fewer missed maintenance cycles", body: "Preventive schedules run automatically instead of depending on someone remembering to check a calendar." },
  { title: "Faster response on breakdowns", body: "Work orders route to the right technician immediately, with the asset's full history attached." },
  { title: "Real asset-level visibility", body: "Every service, part, and inspection is logged against the asset it belongs to, not a shared spreadsheet." },
  { title: "Lower reactive maintenance cost", body: "Catching issues in scheduled checks is consistently cheaper than fixing a failure after the fact." },
  { title: "Audit-ready maintenance records", body: "Checklist responses, remarks, and photo evidence are retained automatically for every job." },
]

const INDUSTRIES = [
  {
    label: "Manufacturing",
    title: "Plants & factories",
    body: "PPM scheduling, asset tracking, and breakdown management for production-critical equipment.",
    href: "/industries/manufacturing",
    cta: "See manufacturing →",
  },
  {
    label: "Educational",
    title: "Campuses",
    body: "Campus helpdesk, visitor management, and staff attendance in one system.",
    href: "/industries/educational",
    cta: "See educational →",
  },
  {
    label: "Residential",
    title: "Estates & societies",
    body: "Gate logs, resident complaints, and common area maintenance, tracked end to end.",
    href: "/industries/residential",
    cta: "See residential →",
  },
]

const FAQS = [
  {
    q: "What is CMMS software?",
    a: "CMMS software is a maintenance management system that helps businesses manage work orders, preventive maintenance, assets, inventory, inspections, and maintenance activities from one centralized platform.",
  },
  {
    q: "How can CMMS software improve maintenance management?",
    a: "CMMS software helps automate maintenance workflows, schedule preventive maintenance, track assets, manage spare parts, assign work orders, and monitor maintenance performance in real time.",
  },
  {
    q: "What should a CMMS solution include?",
    a: "Key CMMS features include work order management, preventive maintenance scheduling, asset management, spare parts and inventory tracking, technician management, inspections, maintenance reports, and dashboards.",
  },
  {
    q: "Why choose Firmity CMMS software?",
    a: "Firmity CMMS software helps organizations manage maintenance, assets, work orders, inventory, and preventive maintenance through an integrated platform, providing better visibility and control over maintenance operations.",
  },
]

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5 text-[#2b6cb0]" strokeWidth={1.75} />
          <span className="text-[13.5px] font-light leading-[1.75] text-[#000000]">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function CmmsSoftwarePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <Navigation breadcrumbOverride={[{ label: "CMMS Software", href: "/cmms-software" }]} />
      <main className="bg-white">
        <section className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-8">
          <h1 className="font-serif text-[clamp(2rem,4.5vw,3.2rem)] font-light text-[#114dac] leading-tight tracking-tight mb-5 max-w-3xl">
            CMMS software for maintenance teams that can&apos;t afford surprises.
          </h1>
          <p className="text-[14.5px] font-light leading-[1.85] text-[#000000] max-w-3xl mb-6">
            Firmity&apos;s CMMS software helps you manage work orders, preventive maintenance, assets, inventory, and
            maintenance teams from one platform — so maintenance operations run on schedule, not on memory.
          </p>
          <div className="flex flex-wrap gap-3 mb-3">
            <a
              href="#contact"
              className="inline-block bg-[#114dac] hover:bg-[#0e3e8a] text-white text-[13px] font-medium px-5 py-2.5 rounded-[4px] transition-colors"
            >
              Book a walkthrough
            </a>
            <a
              href="#modules"
              className="inline-block border border-[#114dac] text-[#114dac] hover:bg-[#f0f5fc] text-[13px] font-medium px-5 py-2.5 rounded-[4px] transition-colors"
            >
              See what it does
            </a>
          </div>
          <p className="text-[12px] font-light text-[#4a5568]">
            Trusted by facility teams in manufacturing, education, and residential estates across India.
          </p>
        </section>

        <section className={SECTION}>
          <p className={`${BODY} max-w-3xl`}>
            <strong className="font-semibold">CMMS software</strong> — computerized maintenance management system
            software — gives maintenance teams a single record of every work order, asset, and preventive maintenance
            cycle. Firmity&apos;s CMMS software streamlines maintenance operations end to end, from scheduling PPM to
            closing out a work order with photo evidence attached.
          </p>
        </section>

        <section id="modules" className={`${SECTION} scroll-mt-24`}>
          <h2 className={H2}>What Firmity&apos;s CMMS software covers</h2>
          <p className={`${BODY} max-w-3xl mb-6`}>
            Everything a maintenance team needs to run work orders and preventive maintenance without spreadsheets.
          </p>
          <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((m) => (
              <div key={m.title}>
                <h3 className={H3}>{m.title}</h3>
                <p className={BODY}>{m.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={SECTION}>
          <h2 className={`${H2} mb-6`}>What maintenance looks like without a CMMS</h2>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className={H3}>Without CMMS software</h3>
              <CheckList items={WITHOUT} />
            </div>
            <div>
              <h3 className={H3}>With Firmity</h3>
              <CheckList items={WITH} />
            </div>
          </div>
        </section>

        <section id="how" className={`${SECTION} scroll-mt-24`}>
          <h2 className={H2}>How it works</h2>
          <p className={`${BODY} max-w-3xl mb-6`}>Four steps to move maintenance from spreadsheets to a live system.</p>
          <ol className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="block font-serif text-[22px] font-light text-[#2b6cb0] mb-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={H3}>{s.title}</h3>
                <p className={BODY}>{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="compare" className={`${SECTION} scroll-mt-24`}>
          <h2 className={H2}>CMMS software vs manual maintenance tracking</h2>
          <p className={`${BODY} max-w-3xl mb-6`}>
            Where a spreadsheet or paper log falls short, and where Firmity&apos;s CMMS software picks it up.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13.5px] font-light text-[#000000]">
              <thead>
                <tr className="border-b border-[#dbe5f0] text-[#114dac]">
                  <th className="py-2.5 pr-4 font-medium">Capability</th>
                  <th className="py-2.5 pr-4 font-medium">Manual tracking</th>
                  <th className="py-2.5 font-medium">Firmity CMMS</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.capability} className="border-b border-[#dbe5f0]">
                    <td className="py-2.5 pr-4">{row.capability}</td>
                    <td className="py-2.5 pr-4">{row.manual}</td>
                    <td className="py-2.5">{row.cmms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`${BODY} max-w-3xl mt-5`}>
            Looking for the broader picture, including space and compliance management? See how CMMS compares to{" "}
            <Link href="/cafm-software" className={LINK}>
              CAFM software
            </Link>{" "}
            or go deeper on{" "}
            <Link href="/assets-spares-automation" className={LINK}>
              asset & spares automation
            </Link>
            .
          </p>
        </section>

        <section className={SECTION}>
          <h2 className={`${H2} mb-6`}>Why maintenance teams choose Firmity&apos;s CMMS software</h2>
          <div className="grid gap-10 md:grid-cols-2">
            <ul className="space-y-4">
              {REASONS.map((r) => (
                <li key={r.title}>
                  <h3 className={H3}>{r.title}</h3>
                  <p className={BODY}>{r.body}</p>
                </li>
              ))}
            </ul>
            <p className={`${BODY} self-start bg-[#f7f7f7] border-l-2 border-[#114dac] p-5`}>
              Work orders, assets, spare parts, and checklists share the same data. Log an asset once, and its service
              history, warranty, and linked spares stay current automatically — nothing re-entered by hand.
            </p>
          </div>
        </section>

        <section id="industries" className={`${SECTION} scroll-mt-24`}>
          <h2 className={`${H2} mb-6`}>Built for how your industry runs maintenance</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {INDUSTRIES.map((ind) => (
              <div key={ind.label}>
                <span className="block text-[11px] font-light text-[#4a5568] mb-1">{ind.label}</span>
                <h3 className={H3}>{ind.title}</h3>
                <p className={`${BODY} mb-2`}>{ind.body}</p>
                <Link href={ind.href} className={`${LINK} text-[13px]`}>
                  {ind.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="bg-[#f7f7f7] py-6 lg:py-8 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <h2 className="font-serif font-light text-[clamp(1.6rem,4vw,2.6rem)] leading-[1.15] text-[#114dac] tracking-tight mb-8">
              FAQ: CMMS software common questions
            </h2>
            <div>
              {FAQS.map((f) => (
                <details key={f.q} className="group border-t border-[#e2e8f0]">
                  <summary className="cursor-pointer list-none flex items-center gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
                    <ChevronDown
                      size={18}
                      className="flex-shrink-0 text-[#2b6cb0] transition-transform duration-200 -rotate-90 group-open:rotate-0"
                    />
                    <span className="text-[15px] font-medium text-[#114dac] group-hover:text-[#2b6cb0] transition-colors leading-snug">
                      {f.q}
                    </span>
                  </summary>
                  <div className="pb-6 pl-[34px] pr-2">
                    <p className="text-[13.5px] leading-[1.8] text-[#000000]">{f.a}</p>
                  </div>
                </details>
              ))}
              <div className="border-t border-[#e2e8f0]" />
            </div>
          </div>
        </section>

        <div id="contact" className="scroll-mt-24">
          <ContactWalkthroughSection />
        </div>
      </main>
      <Footer />
    </>
  )
}
