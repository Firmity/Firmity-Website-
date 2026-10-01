// ─── /erp-software — "ERP Software for Business Management" ────────────────
// Built 2026-09-30, same structural template as /cafm-software. Content
// sourced from Firmity_Features_Listing_Comprehensive_Client.pdf (spans
// Facility Member Management, Inventory & Vendor Management, and Assets &
// Spares Management — the modules that make up Firmity's ERP surface) plus
// the FAQ doc linked for this page in the SEO tracker spreadsheet.
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
  { title: "Asset & maintenance management", body: "Track assets end to end and run preventive maintenance schedules alongside every other business process." },
  { title: "Inventory & vendor management", body: "Manage stock, spare parts, purchase orders, and vendor rate cards from a central procurement workflow." },
  { title: "Employee & payroll management", body: "Centralize employee records, attendance, leave, and payroll processing across every property." },
  { title: "Expense management", body: "Track expense types, sub-types, and reports so spend is visible without manual reconciliation." },
  { title: "Compliance & workflows", body: "Route approvals — purchase orders, leave, expenses — through configurable, auditable workflows." },
  { title: "Reporting dashboards", body: "See operations, finance, and workforce data together instead of across disconnected tools." },
]

const WITHOUT = [
  "Assets, inventory, and payroll tracked in separate spreadsheets",
  "Purchase orders approved over email with no audit trail",
  "Employee records duplicated across HR, payroll, and site files",
  "Expense reports compiled manually at month-end",
  "No single view connecting operations to spend",
]

const WITH = [
  "One platform connecting assets, inventory, employees, and expenses",
  "Purchase orders and approvals tracked with a timestamped workflow",
  "Employee data entered once, used across attendance, leave, and payroll",
  "Expense records structured by type and reportable in real time",
  "Operational and financial data visible from the same dashboard",
]

const STEPS = [
  { title: "Centralize your masters", body: "Bring assets, vendors, employees, and expense categories into one system of record." },
  { title: "Configure workflows", body: "Set up approval chains for purchase orders, leave, and expenses that match how your organization actually runs." },
  { title: "Run daily operations", body: "Maintenance, procurement, attendance, and payroll all update the same shared data as work happens." },
  { title: "Report across the business", body: "Pull operational and financial reports from one platform instead of reconciling multiple tools." },
]

const COMPARISON = [
  { capability: "Asset & maintenance data", manual: "Separate spreadsheet or CMMS", erp: "Included in the platform" },
  { capability: "Inventory & procurement", manual: "Manual PO tracking", erp: "Rate cards, POs, GRN, and stock ledger" },
  { capability: "Employee & payroll records", manual: "Separate HR/payroll tools", erp: "Centralized employee-to-payroll flow" },
  { capability: "Expense tracking", manual: "Compiled manually at month-end", erp: "Structured, reportable in real time" },
  { capability: "Cross-functional reporting", manual: "Reconciled across tools", erp: "One dashboard across operations & finance" },
]

const REASONS = [
  { title: "One system instead of five", body: "Assets, inventory, employees, payroll, and expenses run on the same platform, not five disconnected tools." },
  { title: "Fewer reconciliation errors", body: "Data entered once — an employee record, a purchase order — is reused everywhere it's needed." },
  { title: "Auditable approvals", body: "Purchase orders, leave, and expense approvals are tracked with a timestamped, exportable trail." },
  { title: "Faster month-end reporting", body: "Operational and financial data already live in one place when it's time to report." },
  { title: "Scales across properties", body: "Every site reports into the same system, giving management one view across the whole portfolio." },
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
    q: "What is ERP software?",
    a: "ERP software is a centralized business management system that connects key processes such as finance, inventory, employees, assets, procurement, and operations in one platform.",
  },
  {
    q: "How can ERP software help manage business operations?",
    a: "ERP software helps organizations centralize data, automate routine workflows, monitor resources, improve coordination between teams, and gain real-time visibility into day-to-day operations.",
  },
  {
    q: "What should I consider when choosing an ERP solution?",
    a: "Consider the software's features, scalability, customization options, integrations, reporting capabilities, ease of use, implementation requirements, and ability to support your organization's specific workflows.",
  },
  {
    q: "Why choose Firmity ERP software?",
    a: "Firmity provides an integrated ERP platform for managing operational processes, including assets, maintenance, inventory, employees, expenses, compliance, and other facility-related workflows from a centralized system.",
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

export default function ErpSoftwarePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <Navigation breadcrumbOverride={[{ label: "ERP Software", href: "/erp-software" }]} />
      <main className="bg-white">
        <section className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-8">
          <h1 className="font-serif text-[clamp(2rem,4.5vw,3.2rem)] font-light text-[#114dac] leading-tight tracking-tight mb-5 max-w-3xl">
            ERP software that connects every part of your operation.
          </h1>
          <p className="text-[14.5px] font-light leading-[1.85] text-[#000000] max-w-3xl mb-6">
            Firmity&apos;s ERP software streamlines business operations by managing assets, maintenance, inventory,
            employees, expenses, compliance, and workflows in one platform.
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
            <strong className="font-semibold">ERP software</strong> — enterprise resource planning software — brings
            an organization&apos;s core processes into one system instead of scattered spreadsheets and standalone
            tools. Firmity&apos;s ERP software connects assets, inventory, employees, expenses, and compliance
            workflows so every team works from the same data.
          </p>
        </section>

        <section id="modules" className={`${SECTION} scroll-mt-24`}>
          <h2 className={H2}>What Firmity&apos;s ERP software manages</h2>
          <p className={`${BODY} max-w-3xl mb-6`}>
            The processes most organizations run across five or six separate tools, brought into one platform.
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
          <h2 className={`${H2} mb-6`}>What running the business looks like without an ERP</h2>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className={H3}>Without ERP software</h3>
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
          <p className={`${BODY} max-w-3xl mb-6`}>Four steps to bring your operations onto one platform.</p>
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
          <h2 className={H2}>ERP software vs separate business tools</h2>
          <p className={`${BODY} max-w-3xl mb-6`}>
            Where disconnected spreadsheets and point tools fall short, and where an ERP platform picks it up.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13.5px] font-light text-[#000000]">
              <thead>
                <tr className="border-b border-[#dbe5f0] text-[#114dac]">
                  <th className="py-2.5 pr-4 font-medium">Capability</th>
                  <th className="py-2.5 pr-4 font-medium">Separate tools</th>
                  <th className="py-2.5 font-medium">Firmity ERP</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.capability} className="border-b border-[#dbe5f0]">
                    <td className="py-2.5 pr-4">{row.capability}</td>
                    <td className="py-2.5 pr-4">{row.manual}</td>
                    <td className="py-2.5">{row.erp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`${BODY} max-w-3xl mt-5`}>
            Need to go deeper on one process? See{" "}
            <Link href="/inventory-vendor-automation-erp" className={LINK}>
              inventory & vendor automation
            </Link>
            ,{" "}
            <Link href="/payroll-automation-erp" className={LINK}>
              payroll automation
            </Link>
            , or{" "}
            <Link href="/facility-expense-automation-erp" className={LINK}>
              expense automation
            </Link>
            .
          </p>
        </section>

        <section className={SECTION}>
          <h2 className={`${H2} mb-6`}>Why organizations choose Firmity&apos;s ERP software</h2>
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
              Assets, inventory, employees, payroll, and expenses all share the same underlying data. Update a record
              once and every module that depends on it stays current automatically.
            </p>
          </div>
        </section>

        <section id="industries" className={`${SECTION} scroll-mt-24`}>
          <h2 className={`${H2} mb-6`}>Built for how your industry runs operations</h2>
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
              FAQ: ERP software common questions
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
