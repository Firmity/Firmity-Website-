// ─── /cafm-software — "CAFM Software for Multi-Site Facility Teams" ────────
// Copy rewritten 2026-09-26 from the supplied "CAFM Software — Firmity
// (redesign).html" mock. Only the content was taken from that file; the
// visual design stays on the homepage's own type tokens (font-serif #114dac
// headings, text-[13.5px] font-light #000000 body — see home-client.tsx) and
// ends with the shared ContactWalkthroughSection. Meta title/description live
// in src/lib/seo.ts (the root layout's title template appends " | Firmity").
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
  { title: "Space & facility management", body: "Track floors, rooms, and occupancy against a single facility record." },
  { title: "Preventive maintenance", body: "Schedule and auto-assign PPM and corrective work before assets fail." },
  { title: "Asset lifecycle tracking", body: "Follow every asset from purchase through service history to retirement." },
  { title: "Compliance & audit trail", body: "Store certificates and inspection records where auditors can find them." },
  { title: "Vendor & inventory", body: "Manage spares, consumables, and vendor performance in one ledger." },
  { title: "Reporting & SLA dashboards", body: "See uptime, cost, and SLA performance live, per site or portfolio-wide." },
]

const WITHOUT = [
  "Maintenance tracked in a shared Excel sheet, updated by memory",
  "Complaints logged over calls and WhatsApp, easy to lose",
  "Compliance certificates scattered across email and paper files",
  "Every site reports separately — no single view for management",
  "Breakdowns discovered after they've already happened",
]

const WITH = [
  "Every asset and task logged once, visible to the whole team",
  "Tickets routed to the right technician the moment they're raised",
  "Certificates and audit records stored against the asset itself",
  "One dashboard across every building you manage",
  "Preventive schedules catch problems before they become breakdowns",
]

const STEPS = [
  { title: "Log assets & spaces", body: "Every asset, floor, and room is entered once and becomes a shared record." },
  { title: "Set PPM schedules", body: "Maintenance cycles run automatically and assign themselves to technicians." },
  { title: "Route tickets", body: "Complaints and breakdowns go straight to the right person, with SLA timers running." },
  { title: "Report & audit", body: "Compliance, cost, and uptime data roll up automatically, ready for any audit." },
]

const COMPARISON = [
  { capability: "Work orders & PPM", cmms: "Core focus", cafm: "Included" },
  { capability: "Asset history", cmms: "Core focus", cafm: "Included" },
  { capability: "Space & occupancy", cmms: "Rarely covered", cafm: "Core focus" },
  { capability: "Compliance & audit trail", cmms: "Limited", cafm: "Core focus" },
  { capability: "Vendor & inventory", cmms: "Sometimes", cafm: "Included" },
]

const REASONS = [
  { title: "Fewer missed maintenance cycles", body: "Every task is scheduled and tracked automatically, not chased over email." },
  { title: "Faster ticket resolution", body: "Complaints route to the right technician the moment they're raised." },
  { title: "Audit-ready records", body: "Certificates live against the asset, not scattered across folders." },
  { title: "Lower reactive costs", body: "Problems get caught in preventive checks before they turn into breakdowns." },
  { title: "One view, every site", body: "Management sees every building without chasing separate spreadsheets." },
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
    q: "What is CAFM software?",
    a: "CAFM software (computer aided facility management software) is a system that brings space management, maintenance scheduling, asset tracking, and compliance records into one platform, replacing spreadsheets and paper logs.",
  },
  {
    q: "Is CAFM software the same as a CMMS?",
    a: "They overlap. A CMMS is usually maintenance-first — work orders and asset history. CAFM software is broader, adding space management, compliance, and workplace operations on top. Firmity's CAFM software covers both in one platform.",
  },
  {
    q: "Can Firmity's CAFM software handle multiple sites?",
    a: "Yes. Every site reports into the same system, so management gets one dashboard across all buildings instead of chasing separate spreadsheets per location.",
  },
  {
    q: "How long does it take to set up?",
    a: "Most teams start by logging assets and spaces, then switch on PPM scheduling and ticketing. Book a walkthrough and our team will scope a rollout plan for your sites.",
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

export default function CafmSoftwarePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <Navigation breadcrumbOverride={[{ label: "CAFM Software", href: "/cafm-software" }]} />
      <main className="bg-white">
        <section className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-8">
          <h1 className="font-serif text-[clamp(2rem,4.5vw,3.2rem)] font-light text-[#114dac] leading-tight tracking-tight mb-5 max-w-3xl">
            CAFM software built to run every building you own.
          </h1>
          <p className="text-[14.5px] font-light leading-[1.85] text-[#000000] max-w-3xl mb-6">
            Firmity&apos;s CAFM software replaces the spreadsheets, WhatsApp threads, and paper registers facility
            teams use today with one live record of every asset, task, ticket, and certificate — across every site.
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
            <strong className="font-semibold">CAFM software</strong> — short for computer aided facility management
            software — gives facility teams one system to run buildings, assets, maintenance, and compliance, instead
            of spreadsheets, email threads, and paper logs. Firmity&apos;s CAFM software centralizes that day-to-day
            work so nothing gets missed, and gives management a live view of every site.
          </p>
        </section>

        <section id="modules" className={`${SECTION} scroll-mt-24`}>
          <h2 className={H2}>What Firmity&apos;s CAFM software replaces</h2>
          <p className={`${BODY} max-w-3xl mb-6`}>
            A CAFM platform brings the functions facility teams usually run across six different tools and files into
            one shared system.
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
          <h2 className={`${H2} mb-6`}>What running facilities without it looks like</h2>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className={H3}>Without a CAFM system</h3>
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
          <p className={`${BODY} max-w-3xl mb-6`}>Four steps to move a site from spreadsheets to a live system.</p>
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
          <h2 className={H2}>CAFM software vs CMMS</h2>
          <p className={`${BODY} max-w-3xl mb-6`}>
            The terms overlap. Here&apos;s where they typically differ, and where Firmity sits.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13.5px] font-light text-[#000000]">
              <thead>
                <tr className="border-b border-[#dbe5f0] text-[#114dac]">
                  <th className="py-2.5 pr-4 font-medium">Capability</th>
                  <th className="py-2.5 pr-4 font-medium">CMMS</th>
                  <th className="py-2.5 font-medium">CAFM</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.capability} className="border-b border-[#dbe5f0]">
                    <td className="py-2.5 pr-4">{row.capability}</td>
                    <td className="py-2.5 pr-4">{row.cmms}</td>
                    <td className="py-2.5">{row.cafm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`${BODY} max-w-3xl mt-5`}>
            Firmity blends both, so an asset logged once shows up in maintenance history, compliance records, and
            reporting automatically. Read the full comparison with CMMS, IWMS, and EAM in our{" "}
            <Link href="/blog/what-is-cafm-software" className={LINK}>
              CAFM software guide
            </Link>
            .
          </p>
        </section>

        <section className={SECTION}>
          <h2 className={`${H2} mb-6`}>Why facility teams choose Firmity&apos;s CAFM software</h2>
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
              Every module — tasks, assets, tickets, inventory, visitors, attendance — shares the same data. Log an
              asset once, and it shows up in maintenance history, compliance records, and reporting automatically.
              Nothing re-entered by hand.
            </p>
          </div>
        </section>

        <section id="industries" className={`${SECTION} scroll-mt-24`}>
          <h2 className={`${H2} mb-6`}>Built for how your industry runs facilities</h2>
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

        {/* Same gray (#f7f7f7) full-width panel and heading/row styling as the homepage FAQ.
            Native <details> keeps every answer in the server-rendered HTML (crawlable,
            like the homepage's always-in-DOM answers) with no client JS needed. */}
        <section id="faq" className="bg-[#f7f7f7] py-6 lg:py-8 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <h2 className="font-serif font-light text-[clamp(1.6rem,4vw,2.6rem)] leading-[1.15] text-[#114dac] tracking-tight mb-8">
              FAQ: CAFM software common questions
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
