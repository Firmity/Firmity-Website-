// ─── /complaint-management-software — "Complaint Management Software for
// Faster Resolution" ─────────────────────────────────────────────────────
// Built 2026-09-30, same structural template as /cafm-software. Content
// sourced from the Helpdesk/Complaint Management section of
// Firmity_Features_Listing_Comprehensive_Client.pdf (QR-based registration,
// workflow-based assignment, ticket lifecycle, SLA management, no-login
// tracking, dashboard & reporting) plus the FAQ doc linked for this page in
// the SEO tracker spreadsheet.
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
  { title: "QR-based complaint registration", body: "Scan a location QR to log a complaint with the location auto-populated — no login required, with SMS tracking for guests." },
  { title: "Workflow-based assignment", body: "Complaints route to the right responder group by category, with manual reassignment and an escalation hierarchy when needed." },
  { title: "Full ticket lifecycle", body: "Open, In Progress, On Hold, Resolved, Closed — with SLA pausing on hold and no complaint auto-closed without a resolution." },
  { title: "SLA management & escalation", body: "Response and resolution SLAs run on working hours, with automatic escalation triggered only after a breach." },
  { title: "Resolution with photo evidence", body: "Every resolution requires a remark and mandatory post-resolution photo evidence before a ticket can close." },
  { title: "Tracking without login", body: "Anyone can check status by mobile number and tracking ID — no account or login required." },
]

const WITHOUT = [
  "Complaints logged over calls, WhatsApp, or a register that gets lost",
  "No way to tell who a complaint was assigned to, or when",
  "Tickets marked resolved with no proof the work was done",
  "SLA breaches discovered only when someone complains again",
  "No record of how long a complaint actually took to close",
]

const WITH = [
  "Complaints logged in seconds via QR, with location auto-captured",
  "Every ticket assigned to a responder group with a visible owner",
  "Resolution requires a remark and photo evidence before closing",
  "SLA breaches escalate automatically, not after a second complaint",
  "Turnaround time and resolution history tracked for every ticket",
]

const STEPS = [
  { title: "Deploy location QR codes", body: "Place QR codes at each location so anyone can raise a complaint with location and category pre-filled." },
  { title: "Route by category", body: "Complaints assign automatically to the right responder group based on category, with reassignment when needed." },
  { title: "Resolve with evidence", body: "Responders close tickets with a remark and mandatory photo evidence — no complaint closes without proof." },
  { title: "Track SLAs & report", body: "Response and resolution SLAs run automatically, escalating breaches and rolling up into dashboards." },
]

const COMPARISON = [
  { capability: "Logging a complaint", manual: "Phone call or WhatsApp message", software: "QR scan, location auto-filled" },
  { capability: "Assignment", manual: "Manually routed by a supervisor", software: "Auto-assigned by category workflow" },
  { capability: "Resolution proof", manual: "Verbal confirmation only", software: "Remark + mandatory photo evidence" },
  { capability: "SLA tracking", manual: "Tracked informally, if at all", software: "Working-hours-aware, auto-escalating" },
  { capability: "Status tracking", manual: "Calling to check", software: "Mobile number + tracking ID, no login" },
]

const REASONS = [
  { title: "Faster resolution", body: "Tickets route to the right responder group the moment they're raised, with SLA timers already running." },
  { title: "No complaint slips through", body: "Every ticket needs a remark and photo evidence to close — nothing gets marked resolved without proof." },
  { title: "SLA breaches escalate on their own", body: "Escalation triggers automatically after a breach, instead of waiting for a second complaint." },
  { title: "No login needed to check status", body: "Anyone can track a complaint by mobile number and tracking ID, reducing repeat follow-up calls." },
  { title: "Full audit trail on every ticket", body: "Category, location, responder, remarks, and turnaround time are retained for every complaint." },
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
    q: "What is complaint management software?",
    a: "Complaint management software helps organizations record, assign, track, and resolve complaints through a centralized digital system, making it easier to monitor issues from submission to closure.",
  },
  {
    q: "How does complaint management software improve issue resolution?",
    a: "It helps teams automatically route complaints, assign them to responsible staff, track progress, set priorities, and maintain resolution records for better operational visibility.",
  },
  {
    q: "What features should complaint management software have?",
    a: "Important features include complaint registration, ticket assignment, priority management, status tracking, notifications, escalation workflows, response tracking, reporting, and complaint history.",
  },
  {
    q: "Why choose Firmity complaint management software?",
    a: "Firmity helps organizations centralize complaint handling, assign requests to the right teams, monitor resolution progress, and maintain complaint records as part of an integrated facility management platform.",
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

export default function ComplaintManagementSoftwarePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <Navigation
        breadcrumbOverride={[{ label: "Complaint Management Software", href: "/complaint-management-software" }]}
      />
      <main className="bg-white">
        <section className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-8">
          <h1 className="font-serif text-[clamp(2rem,4.5vw,3.2rem)] font-light text-[#114dac] leading-tight tracking-tight mb-5 max-w-3xl">
            Complaint management software for faster resolution.
          </h1>
          <p className="text-[14.5px] font-light leading-[1.85] text-[#000000] max-w-3xl mb-6">
            Manage complaints efficiently with Firmity complaint management software. Track requests, assign tasks,
            monitor resolution status, and improve service operations.
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
            <strong className="font-semibold">Complaint management software</strong> centralizes how complaints are
            logged, assigned, and resolved, replacing phone calls and WhatsApp threads with a trackable workflow.
            Firmity&apos;s complaint management software routes every ticket to the right responder and requires
            proof before it can close.
          </p>
        </section>

        <section id="modules" className={`${SECTION} scroll-mt-24`}>
          <h2 className={H2}>What Firmity&apos;s complaint management software covers</h2>
          <p className={`${BODY} max-w-3xl mb-6`}>
            From logging a complaint to closing it with evidence, every step is tracked.
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
          <h2 className={`${H2} mb-6`}>What complaint handling looks like without dedicated software</h2>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className={H3}>Without complaint management software</h3>
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
          <p className={`${BODY} max-w-3xl mb-6`}>Four steps from a raised complaint to a closed, verified ticket.</p>
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
          <h2 className={H2}>Complaint management software vs manual handling</h2>
          <p className={`${BODY} max-w-3xl mb-6`}>
            Where phone calls and WhatsApp threads fall short, and where dedicated software picks it up.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13.5px] font-light text-[#000000]">
              <thead>
                <tr className="border-b border-[#dbe5f0] text-[#114dac]">
                  <th className="py-2.5 pr-4 font-medium">Capability</th>
                  <th className="py-2.5 pr-4 font-medium">Manual handling</th>
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
            <Link href="/complaint-helpdesk-automation" className={LINK}>
              complaint & helpdesk automation
            </Link>
            , or see how it fits into{" "}
            <Link href="/cafm-software" className={LINK}>
              CAFM software
            </Link>
            .
          </p>
        </section>

        <section className={SECTION}>
          <h2 className={`${H2} mb-6`}>Why teams choose Firmity&apos;s complaint management software</h2>
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
              Every ticket carries its category, location, responder, and resolution evidence. Nothing closes without
              a remark and a photo — so resolved actually means resolved.
            </p>
          </div>
        </section>

        <section id="industries" className={`${SECTION} scroll-mt-24`}>
          <h2 className={`${H2} mb-6`}>Built for how your industry handles complaints</h2>
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
              FAQ: Complaint management software common questions
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
