// ─── /visitor-management-software — "Visitor Management Software for
// Offices" ────────────────────────────────────────────────────────────────
// Built 2026-09-30, same structural template as /cafm-software. Content
// sourced from the Visitor Management sections of
// Firmity_Features_Listing_Comprehensive_Client.pdf (registration, approval
// workflow, department mapping, visitor lifecycle flow) plus the FAQ doc
// linked for this page in the SEO tracker spreadsheet.
//
// Slug lowercased from the tracker's "Visitor-management-software" to the
// standard all-lowercase "visitor-management-software" — flagged to the user
// in the summary of this batch of work.
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
  { title: "QR-based visitor registration", body: "Visitors scan a property or gate QR code, select a department, and register with photo capture at the gate." },
  { title: "Host approval workflow", body: "The system notifies the host by email and SMS; entry is granted only after the host approves the visit." },
  { title: "Department & host mapping", body: "Each property configures its own departments and mapped employees, so visitors reach the right contact person." },
  { title: "Check-in / check-out tracking", body: "Guards verify and grant entry on approval, and record checkout manually or via QR rescan for a complete visit record." },
  { title: "Visitor records & history", body: "Every visit — purpose, contact person, items carried, in/out time — is retained and searchable with date-range filters." },
  { title: "Visitor dashboard & export", body: "Approved, rejected, and in-progress visits roll up into a dashboard, exportable for front-desk and security review." },
]

const WITHOUT = [
  "Visitors signing a paper register at the gate",
  "No way to confirm a host actually approved a visit before entry",
  "Visitor records impossible to search after the fact",
  "No record of what a visitor was carrying in or out",
  "Reception has no dashboard of who's on-site right now",
]

const WITH = [
  "Visitors register digitally with photo capture at the gate",
  "Entry granted only after the host approves the request",
  "Every visit searchable by name, date, or department",
  "Items carried in and out logged against the visit record",
  "Live dashboard of every approved, pending, and rejected visit",
]

const STEPS = [
  { title: "Configure departments & hosts", body: "Map each department to its employees so a visitor can select the right contact person at check-in." },
  { title: "Register visitors at the gate", body: "A QR scan or guard-assisted entry captures name, purpose, contact person, and a photo." },
  { title: "Approve & grant entry", body: "The host approves or rejects via notification; the guard verifies and grants entry only on approval." },
  { title: "Track & report", body: "Checkout, visit history, and dashboards are available to front-desk and security without extra paperwork." },
]

const COMPARISON = [
  { capability: "Visitor registration", manual: "Paper register at the gate", software: "QR-based, with photo capture" },
  { capability: "Host approval", manual: "Verbal confirmation or a phone call", software: "Notification-based approve/reject" },
  { capability: "Visit history", manual: "Impossible to search reliably", software: "Searchable, filterable by date" },
  { capability: "Items carried", manual: "Rarely logged", software: "Recorded against the visit" },
  { capability: "Front-desk visibility", manual: "No live view of who's on-site", software: "Live dashboard, exportable" },
]

const REASONS = [
  { title: "No unapproved entries", body: "Entry is granted only after the host approves — never on the guard's judgment alone." },
  { title: "Faster check-in", body: "QR-based registration with department mapping gets visitors to the right host without back-and-forth at the gate." },
  { title: "Complete, searchable visit history", body: "Every visit is retained with purpose, contact person, and timing — searchable whenever it's needed." },
  { title: "Better security visibility", body: "Front-desk and security see a live dashboard of who's on-site, not a paper register no one reviews." },
  { title: "Accountability on items carried", body: "Items carried in and out are logged against the visit, reducing disputes at exit." },
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
    q: "What is visitor management software?",
    a: "Visitor management software is a digital solution that helps organizations register, verify, track, and manage visitors while maintaining accurate visitor records.",
  },
  {
    q: "How does visitor management software improve visitor handling?",
    a: "It streamlines visitor registration, check-ins, approvals, notifications, and visitor tracking, helping reception and facility teams manage visitors more efficiently.",
  },
  {
    q: "What features should I look for in visitor management software?",
    a: "Look for features such as digital visitor registration, pre-registration, check-in and check-out tracking, visitor records, host notifications, approval workflows, and visitor reporting.",
  },
  {
    q: "Why choose Firmity visitor management software?",
    a: "Firmity helps organizations manage visitor registration, track entries and exits, maintain visitor records, and streamline visitor-related workflows through a centralized facility management platform.",
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

export default function VisitorManagementSoftwarePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <Navigation
        breadcrumbOverride={[{ label: "Visitor Management Software", href: "/visitor-management-software" }]}
      />
      <main className="bg-white">
        <section className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-8">
          <h1 className="font-serif text-[clamp(2rem,4.5vw,3.2rem)] font-light text-[#114dac] leading-tight tracking-tight mb-5 max-w-3xl">
            Visitor management software for offices that take entry seriously.
          </h1>
          <p className="text-[14.5px] font-light leading-[1.85] text-[#000000] max-w-3xl mb-6">
            Simplify visitor registration and tracking with Firmity visitor management software. Manage check-ins,
            approvals, visitor records, and access efficiently.
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
            <strong className="font-semibold">Visitor management software</strong> replaces the paper register at the
            gate with digital registration, host approval, and a searchable visit history. Firmity&apos;s visitor
            management software makes sure no one enters a building without the host actually approving it.
          </p>
        </section>

        <section id="modules" className={`${SECTION} scroll-mt-24`}>
          <h2 className={H2}>What Firmity&apos;s visitor management software covers</h2>
          <p className={`${BODY} max-w-3xl mb-6`}>
            From the gate to checkout, every visit is registered, approved, and tracked.
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
          <h2 className={`${H2} mb-6`}>What visitor entry looks like without dedicated software</h2>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className={H3}>Without visitor management software</h3>
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
          <p className={`${BODY} max-w-3xl mb-6`}>Four steps from arrival at the gate to a logged, approved visit.</p>
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
          <h2 className={H2}>Visitor management software vs a paper register</h2>
          <p className={`${BODY} max-w-3xl mb-6`}>
            Where a sign-in book falls short, and where dedicated visitor management software picks it up.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13.5px] font-light text-[#000000]">
              <thead>
                <tr className="border-b border-[#dbe5f0] text-[#114dac]">
                  <th className="py-2.5 pr-4 font-medium">Capability</th>
                  <th className="py-2.5 pr-4 font-medium">Paper register</th>
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
            <Link href="/visitor-management-automation" className={LINK}>
              visitor management automation
            </Link>
            , or see how it fits into{" "}
            <Link href="/cafm-software" className={LINK}>
              CAFM software
            </Link>
            .
          </p>
        </section>

        <section className={SECTION}>
          <h2 className={`${H2} mb-6`}>Why offices choose Firmity&apos;s visitor management software</h2>
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
              Registration, host approval, and checkout share the same visit record — reception, security, and hosts
              all see the same information, updated the moment it happens.
            </p>
          </div>
        </section>

        <section id="industries" className={`${SECTION} scroll-mt-24`}>
          <h2 className={`${H2} mb-6`}>Built for how your industry manages visitors</h2>
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
              FAQ: Visitor management software common questions
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
