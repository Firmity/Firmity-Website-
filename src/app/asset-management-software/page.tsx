// ─── /asset-management-software — "Asset Management Software for Smarter
// Asset Tracking" ─────────────────────────────────────────────────────────
// Built 2026-09-30, same structural template as /cafm-software. Content
// sourced from the Assets & Spares Management section of
// Firmity_Features_Listing_Comprehensive_Client.pdf (Asset Master, QR Code
// Management, Location Management, Service & Maintenance, Asset & PPM
// Relationship, Asset History) plus the FAQ doc linked for this page in the
// SEO tracker spreadsheet.
//
// Slug normalized from the tracker's "asset-management--software" (double
// hyphen) to the standard single-hyphen "asset-management-software" —
// flagged to the user in the summary of this batch of work.
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
  { title: "Centralized asset master", body: "A single record per asset — name, category, manufacturer, location, status, value, and ownership type (owned, rented, spare)." },
  { title: "Asset QR code tagging", body: "Every asset carries a unique QR code; scanning it (role-based) opens its full record, history, and linked spare parts." },
  { title: "Location & movement tracking", body: "Know exactly where an asset is, track transfers between locations, and keep a movement history per asset." },
  { title: "Service & maintenance scheduling", body: "Last service, next service, and due-date reminders, with a dedicated view for assets overdue for service." },
  { title: "Asset & PPM relationship", body: "Assets link to maintenance tasks directly, so a failed checklist item generates an actionable item tied to the asset." },
  { title: "Full asset history", body: "Service records, actionable issues and resolutions, and movement history retained against every asset over its lifecycle." },
]

const WITHOUT = [
  "Asset records spread across spreadsheets, folders, and memory",
  "No way to tell what's overdue for service until it fails",
  "Asset location and ownership status untracked between transfers",
  "Warranty and AMC dates missed because nothing flags them",
  "No link between a maintenance issue and the asset it happened on",
]

const WITH = [
  "One record per asset — location, status, value, and history in one place",
  "Service-overdue assets flagged automatically, before they fail",
  "Every transfer and location change logged against the asset",
  "Warranty and AMC expiry tracked with reminders, not guesswork",
  "Failed checklist items linked straight back to the asset as actionable items",
]

const STEPS = [
  { title: "Register your assets", body: "Log every asset once — category, manufacturer, location, value, and ownership type — as a shared record." },
  { title: "Tag with QR codes", body: "Print and attach a unique QR code per asset so anyone with access can pull its full record on-site." },
  { title: "Track service & movement", body: "Service dates, transfers, and location changes update the asset's record automatically as they happen." },
  { title: "Review history & compliance", body: "Pull complete service, issue, and movement history for any asset whenever an audit needs it." },
]

const COMPARISON = [
  { capability: "Asset records", manual: "Spreadsheet or paper register", software: "Centralized asset master" },
  { capability: "Locating an asset", manual: "Manual search or asking around", software: "QR scan or location filter" },
  { capability: "Service due dates", manual: "Tracked manually, often missed", software: "Auto-flagged overdue view" },
  { capability: "Warranty / AMC tracking", manual: "Noted separately, easy to lose", software: "Tracked against the asset record" },
  { capability: "Asset history", manual: "Scattered across files", software: "Full lifecycle history in one place" },
]

const REASONS = [
  { title: "Never lose track of an asset", body: "Every asset has a QR code and a location record, so finding it doesn't depend on asking around." },
  { title: "Service happens before failure", body: "Overdue-service assets are flagged automatically instead of discovered when they break down." },
  { title: "Warranty & AMC dates don't slip", body: "Expiry reminders mean you claim under warranty instead of paying for a repair you didn't need to." },
  { title: "Maintenance issues trace back to the asset", body: "A failed checklist item becomes an actionable item linked to the exact asset, not a generic ticket." },
  { title: "Audit-ready asset history", body: "Fifteen years of service, movement, and issue history stay attached to the asset, not scattered across files." },
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
    q: "What is asset management software?",
    a: "Asset management software helps organizations maintain centralized records of physical assets, monitor their locations and status, track maintenance activities, and manage asset information throughout its lifecycle.",
  },
  {
    q: "How can asset management software improve asset control?",
    a: "It gives teams a centralized view of assets, making it easier to monitor ownership, location, condition, maintenance history, and other important asset information while reducing manual record keeping.",
  },
  {
    q: "What capabilities should an asset management system have?",
    a: "Useful capabilities include asset registration, asset tracking, location management, maintenance history, lifecycle monitoring, document management, asset assignment, alerts, and reporting.",
  },
  {
    q: "Why choose Firmity asset management software?",
    a: "Firmity helps organizations centralize asset records, monitor asset information, connect assets with maintenance activities, and manage asset-related operations through an integrated facility management platform.",
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

export default function AssetManagementSoftwarePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <Navigation breadcrumbOverride={[{ label: "Asset Management Software", href: "/asset-management-software" }]} />
      <main className="bg-white">
        <section className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-8">
          <h1 className="font-serif text-[clamp(2rem,4.5vw,3.2rem)] font-light text-[#114dac] leading-tight tracking-tight mb-5 max-w-3xl">
            Asset management software for smarter asset tracking.
          </h1>
          <p className="text-[14.5px] font-light leading-[1.85] text-[#000000] max-w-3xl mb-6">
            Manage and track assets with Firmity asset management software. Monitor asset records, locations,
            maintenance, lifecycle details, and performance from one platform.
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
            <strong className="font-semibold">Asset management software</strong> gives facility and operations teams
            one centralized record for every physical asset — location, status, service history, and lifecycle
            details — instead of spreadsheets and paper registers. Firmity&apos;s asset management software connects
            that record to maintenance activity, so nothing is tracked twice.
          </p>
        </section>

        <section id="modules" className={`${SECTION} scroll-mt-24`}>
          <h2 className={H2}>What Firmity&apos;s asset management software covers</h2>
          <p className={`${BODY} max-w-3xl mb-6`}>
            Everything needed to track an asset from purchase through service history to retirement.
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
          <h2 className={`${H2} mb-6`}>What asset tracking looks like without dedicated software</h2>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className={H3}>Without asset management software</h3>
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
          <p className={`${BODY} max-w-3xl mb-6`}>Four steps to bring every asset onto one live record.</p>
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
          <h2 className={H2}>Asset management software vs manual tracking</h2>
          <p className={`${BODY} max-w-3xl mb-6`}>
            Where a spreadsheet or paper register falls short, and where dedicated asset management software picks it up.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13.5px] font-light text-[#000000]">
              <thead>
                <tr className="border-b border-[#dbe5f0] text-[#114dac]">
                  <th className="py-2.5 pr-4 font-medium">Capability</th>
                  <th className="py-2.5 pr-4 font-medium">Manual tracking</th>
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
            Need the maintenance side too? See how this connects with{" "}
            <Link href="/assets-spares-automation" className={LINK}>
              assets & spares automation
            </Link>{" "}
            or the broader{" "}
            <Link href="/cmms-software" className={LINK}>
              CMMS software
            </Link>
            .
          </p>
        </section>

        <section className={SECTION}>
          <h2 className={`${H2} mb-6`}>Why facility teams choose Firmity&apos;s asset management software</h2>
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
              Every asset carries its own QR code, location, and history. Scan it on-site and the full record —
              service dates, warranty, linked spares — is right there, not buried in a spreadsheet.
            </p>
          </div>
        </section>

        <section id="industries" className={`${SECTION} scroll-mt-24`}>
          <h2 className={`${H2} mb-6`}>Built for how your industry manages assets</h2>
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
              FAQ: Asset management software common questions
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
