// ─── /employee-management-software — "Employee Management Software for
// Workforce Operations" ─────────────────────────────────────────────────────
// Built 2026-09-30, same structural template as /cafm-software. Content
// sourced from the Facility Member Management section of
// Firmity_Features_Listing_Comprehensive_Client.pdf (employee master,
// onboarding, search & transfer, attendance, leave management) plus the FAQ
// doc linked for this page in the SEO tracker spreadsheet.
//
// Slug normalized from the tracker's "Employee-Managements-software" to the
// standard "employee-management-software" — flagged to the user in the
// summary of this batch of work.
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
  { title: "Centralized employee master", body: "Employee code, contact details, department, designation, reporting manager, and documents in one searchable record." },
  { title: "Onboarding & transfers", body: "Onboard new employees with the same structured fields, and search or transfer employees by name, code, or ID." },
  { title: "Attendance management", body: "Monthly calendar view of present, absent, and leave status, with check-in/check-out times and CSV export." },
  { title: "Leave management", body: "CL, SL, EL, and comp-off types with allocation, balances by financial year, and an approve/reject workflow." },
  { title: "Geo-tagged location records", body: "Employee visit locations are logged with latitude/longitude and visit type for field and multi-site teams." },
  { title: "Role-based access & reporting", body: "Create users with defined access levels and pull workforce reports across departments and properties." },
]

const WITHOUT = [
  "Employee records duplicated across HR files and site registers",
  "Attendance marked on paper sheets or a shared spreadsheet",
  "Leave balances tracked manually, prone to errors",
  "No easy way to search or transfer an employee's record",
  "No visibility into where field staff actually are",
]

const WITH = [
  "One employee record used across attendance, leave, and payroll",
  "Attendance tracked digitally with check-in/check-out times",
  "Leave balances calculated automatically by type and financial year",
  "Employees searchable by code, name, phone, PAN, or bank account",
  "Field staff locations logged with geo-tagged visit records",
]

const STEPS = [
  { title: "Onboard employees", body: "Enter employee details once — contact, department, designation, and documents — into a single master record." },
  { title: "Track attendance", body: "Daily attendance, check-in/out times, and holidays are recorded against each employee automatically." },
  { title: "Manage leave", body: "Leave types, balances, and approvals run through a structured workflow instead of manual tracking." },
  { title: "Search, transfer & report", body: "Find any employee instantly and pull workforce reports across departments or properties." },
]

const COMPARISON = [
  { capability: "Employee records", manual: "Spreadsheets or paper files", software: "Centralized, searchable master" },
  { capability: "Attendance tracking", manual: "Paper register or manual entry", software: "Digital calendar with export" },
  { capability: "Leave balances", manual: "Calculated manually", software: "Auto-tracked by type & financial year" },
  { capability: "Employee search", manual: "Manual lookup across files", software: "Search by code, name, phone, PAN" },
  { capability: "Field staff visibility", manual: "Untracked", software: "Geo-tagged visit records" },
]

const REASONS = [
  { title: "One record, every process", body: "Employee data entered once feeds attendance, leave, and payroll without re-entry." },
  { title: "Accurate leave balances", body: "CL, SL, EL, and comp-off balances are tracked automatically by financial year, not on paper." },
  { title: "Faster employee lookup", body: "Search by name, code, phone, PAN, Aadhaar, or bank account instead of digging through files." },
  { title: "Visibility into field teams", body: "Geo-tagged location records show where field and site staff actually are." },
  { title: "Role-based, auditable access", body: "User accounts and permissions are defined per role, keeping sensitive records controlled." },
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
    q: "What is employee management software?",
    a: "Employee management software is a digital platform that helps organizations manage employee information, attendance, tasks, payroll-related processes, and workforce activities from one centralized system.",
  },
  {
    q: "How does employee management software help businesses?",
    a: "It helps streamline employee records, attendance tracking, task management, workforce coordination, and reporting while reducing manual administrative work.",
  },
  {
    q: "What features should an employee management system include?",
    a: "Key features can include employee records, attendance management, task allocation, workforce tracking, payroll management, reporting, notifications, and role-based access.",
  },
  {
    q: "Why choose Firmity employee management software?",
    a: "Firmity helps organizations manage employee information and workforce-related activities alongside other facility operations, providing centralized visibility across teams and processes.",
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

export default function EmployeeManagementSoftwarePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <Navigation
        breadcrumbOverride={[{ label: "Employee Management Software", href: "/employee-management-software" }]}
      />
      <main className="bg-white">
        <section className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-8">
          <h1 className="font-serif text-[clamp(2rem,4.5vw,3.2rem)] font-light text-[#114dac] leading-tight tracking-tight mb-5 max-w-3xl">
            Employee management software for workforce operations.
          </h1>
          <p className="text-[14.5px] font-light leading-[1.85] text-[#000000] max-w-3xl mb-6">
            Simplify employee management with Firmity. Manage employee records, attendance, tasks, payroll, and
            workforce operations from one centralized platform.
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
            <strong className="font-semibold">Employee management software</strong> centralizes employee records,
            attendance, leave, and workforce activity into one system, instead of scattered HR files and paper
            registers. Firmity&apos;s employee management software keeps one record per employee that every process
            draws from.
          </p>
        </section>

        <section id="modules" className={`${SECTION} scroll-mt-24`}>
          <h2 className={H2}>What Firmity&apos;s employee management software covers</h2>
          <p className={`${BODY} max-w-3xl mb-6`}>
            From onboarding to attendance and leave, workforce operations run on one platform.
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
          <h2 className={`${H2} mb-6`}>What workforce management looks like without dedicated software</h2>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className={H3}>Without employee management software</h3>
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
          <p className={`${BODY} max-w-3xl mb-6`}>Four steps to bring workforce operations onto one system.</p>
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
          <h2 className={H2}>Employee management software vs manual HR records</h2>
          <p className={`${BODY} max-w-3xl mb-6`}>
            Where spreadsheets and paper files fall short, and where dedicated software picks it up.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13.5px] font-light text-[#000000]">
              <thead>
                <tr className="border-b border-[#dbe5f0] text-[#114dac]">
                  <th className="py-2.5 pr-4 font-medium">Capability</th>
                  <th className="py-2.5 pr-4 font-medium">Manual records</th>
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
            <Link href="/employee-management-automation" className={LINK}>
              employee management automation
            </Link>
            , or see the related{" "}
            <Link href="/payroll-management-software" className={LINK}>
              payroll management software
            </Link>
            .
          </p>
        </section>

        <section className={SECTION}>
          <h2 className={`${H2} mb-6`}>Why teams choose Firmity&apos;s employee management software</h2>
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
              One employee record feeds attendance, leave, and payroll — update it once, and every downstream process
              stays accurate without re-entry.
            </p>
          </div>
        </section>

        <section id="industries" className={`${SECTION} scroll-mt-24`}>
          <h2 className={`${H2} mb-6`}>Built for how your industry manages its workforce</h2>
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
              FAQ: Employee management software common questions
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
