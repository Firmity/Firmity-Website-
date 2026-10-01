// ─── /payroll-management-software — "Payroll Management Software for Easy
// Payroll Processing" ────────────────────────────────────────────────────
// Built 2026-09-30, same structural template as /cafm-software. Content
// sourced from the Facility Member Management (Attendance, Leave, Payroll)
// section of Firmity_Features_Listing_Comprehensive_Client.pdf plus the FAQ
// doc linked for this page in the SEO tracker spreadsheet.
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
  { title: "Attendance-integrated payroll", body: "Payroll draws directly from attendance and leave records, so pay runs match actual working days without manual reconciliation." },
  { title: "Employee salary records", body: "Salary structure, bank details, and payment history are stored against each employee's master record." },
  { title: "Leave & comp-off deductions", body: "CL, SL, EL, and comp-off balances factor into payroll automatically, reducing manual deduction calculations." },
  { title: "Payroll processing workflow", body: "Process payroll runs across properties from one platform instead of reconciling separate site-level sheets." },
  { title: "Payroll reports & exports", body: "Generate payroll reports and export records for finance, compliance, or audit review." },
  { title: "Role-based access controls", body: "Payroll data stays restricted to the roles that need it, with access controlled at the user level." },
]

const WITHOUT = [
  "Payroll calculated manually against a separate attendance sheet",
  "Leave deductions reconciled by hand every pay cycle",
  "Salary records duplicated between HR and finance",
  "No single view of payroll across multiple properties",
  "Payroll reports compiled manually before every audit",
]

const WITH = [
  "Payroll pulls attendance and leave data automatically",
  "Leave and comp-off deductions calculated without manual work",
  "One salary record shared between HR and payroll processing",
  "Payroll visibility across every property from one platform",
  "Payroll reports available on demand, not compiled at audit time",
]

const STEPS = [
  { title: "Set up salary records", body: "Enter salary structure and bank details once per employee, linked to the same master record used elsewhere." },
  { title: "Sync attendance & leave", body: "Attendance and leave balances feed into payroll automatically, without separate reconciliation." },
  { title: "Process payroll", body: "Run payroll across properties from one platform, with deductions and allowances applied consistently." },
  { title: "Report & export", body: "Pull payroll reports for finance or compliance whenever they're needed, not just at month-end." },
]

const COMPARISON = [
  { capability: "Attendance-to-payroll link", manual: "Manually reconciled each cycle", software: "Synced automatically" },
  { capability: "Leave deductions", manual: "Calculated by hand", software: "Applied from leave balances automatically" },
  { capability: "Salary records", manual: "Duplicated across HR & finance", software: "One record, shared" },
  { capability: "Multi-property payroll", manual: "Separate sheets per site", software: "One platform, every property" },
  { capability: "Payroll reporting", manual: "Compiled manually before audits", software: "Available on demand" },
]

const REASONS = [
  { title: "Accurate pay runs", body: "Payroll reflects actual attendance and leave data, not a manually reconciled estimate." },
  { title: "Less manual deduction work", body: "Leave and comp-off balances apply to payroll automatically, cycle after cycle." },
  { title: "One source of truth", body: "Salary records live against the same employee master used by attendance and HR." },
  { title: "Portfolio-wide payroll visibility", body: "Run and review payroll across every property from a single platform." },
  { title: "Audit-ready records on demand", body: "Payroll reports are exportable whenever finance or an auditor needs them." },
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
    q: "What is payroll management software?",
    a: "Payroll management software is a digital solution that helps organizations manage employee salary records, payroll processes, attendance data, and related workforce information efficiently.",
  },
  {
    q: "How can businesses manage payroll more efficiently with software?",
    a: "A payroll solution brings employee salary data, attendance details, deductions, and payment-related records into a structured workflow, helping HR teams handle payroll activities with less manual effort and better record accuracy.",
  },
  {
    q: "What features should payroll management software include?",
    a: "Useful features include employee salary records, attendance integration, payroll processing, deductions and allowances, payroll reports, employee data management, and access controls.",
  },
  {
    q: "Why choose Firmity payroll management software?",
    a: "Firmity helps organizations manage payroll-related processes alongside employee, attendance, facility, and operational workflows through a centralized platform.",
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

export default function PayrollManagementSoftwarePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <Navigation
        breadcrumbOverride={[{ label: "Payroll Management Software", href: "/payroll-management-software" }]}
      />
      <main className="bg-white">
        <section className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-8">
          <h1 className="font-serif text-[clamp(2rem,4.5vw,3.2rem)] font-light text-[#114dac] leading-tight tracking-tight mb-5 max-w-3xl">
            Payroll management software for easy payroll processing.
          </h1>
          <p className="text-[14.5px] font-light leading-[1.85] text-[#000000] max-w-3xl mb-6">
            Simplify payroll operations with Firmity payroll management software. Manage employee payroll, attendance,
            salary records, and payroll workflows from one platform.
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
            <strong className="font-semibold">Payroll management software</strong> connects salary records,
            attendance, and leave data so pay runs are accurate without manual reconciliation. Firmity&apos;s payroll
            management software processes payroll alongside the same employee data your attendance and HR records
            already use.
          </p>
        </section>

        <section id="modules" className={`${SECTION} scroll-mt-24`}>
          <h2 className={H2}>What Firmity&apos;s payroll management software covers</h2>
          <p className={`${BODY} max-w-3xl mb-6`}>
            From attendance sync to payroll reporting, every step runs on the same platform.
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
          <h2 className={`${H2} mb-6`}>What payroll processing looks like without dedicated software</h2>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className={H3}>Without payroll management software</h3>
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
          <p className={`${BODY} max-w-3xl mb-6`}>Four steps from salary setup to a processed, reportable payroll run.</p>
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
          <h2 className={H2}>Payroll management software vs manual payroll processing</h2>
          <p className={`${BODY} max-w-3xl mb-6`}>
            Where manually reconciled payroll falls short, and where dedicated software picks it up.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13.5px] font-light text-[#000000]">
              <thead>
                <tr className="border-b border-[#dbe5f0] text-[#114dac]">
                  <th className="py-2.5 pr-4 font-medium">Capability</th>
                  <th className="py-2.5 pr-4 font-medium">Manual processing</th>
                  <th className="py-2.5 font-medium">Firmity</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.capability} className="border-b border-[#dbe5f0]">
                    <td className="py-2.5 pr-4">{row.capability}</td>
                    <td className="py-2.5 pr-4">{row.manual}</td>
                    <td className="py-2.5">{row.software}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`${BODY} max-w-3xl mt-5`}>
            Go deeper on the full workflow in{" "}
            <Link href="/payroll-automation-erp" className={LINK}>
              payroll automation ERP
            </Link>
            , or see the related{" "}
            <Link href="/employee-management-software" className={LINK}>
              employee management software
            </Link>
            .
          </p>
        </section>

        <section className={SECTION}>
          <h2 className={`${H2} mb-6`}>Why teams choose Firmity&apos;s payroll management software</h2>
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
              Salary, attendance, and leave data all live against the same employee record, so payroll reflects what
              actually happened during the pay cycle — not a manually reconciled estimate.
            </p>
          </div>
        </section>

        <section id="industries" className={`${SECTION} scroll-mt-24`}>
          <h2 className={`${H2} mb-6`}>Built for how your industry runs payroll</h2>
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
              FAQ: Payroll management software common questions
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
