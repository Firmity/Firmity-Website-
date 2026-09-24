// ─── /cafm-software — "What Is CAFM Software?" ─────────────────────────────
// New page (2026-09-24), per request: "create a cafm page. nothing fancy.
// follow the same theme as the homepage. no kickers anywhere. no em dashes
// anywhere... keep the content to around 500 words." Deliberately plain: a
// serif H1, a few short prose sections with the homepage's own type tokens
// (font-serif #114dac headings, text-[13.5px] font-light #000000 body — see
// home-client.tsx), and the homepage's contact section at the end. No
// eyebrow/kicker rows (every other marketing page on this site uses a small
// line + uppercase label above each heading; this page intentionally omits
// that per the request) and no em dashes in any copy.
//
// Primary keyword: "CAFM software". Secondary keyword: "computer aided
// facility management" (used once, spelled out, near the top). Content
// topics were checked against eFACiLiTY's own CAFM product page
// (efacility.global) for coverage parity, but every sentence here is
// original — nothing was copied.
//
// Server Component: no interactivity of its own, so no "use client" is
// needed here — Navigation/Footer/ContactWalkthroughSection are already
// Client Components and Next.js renders them fine from a Server parent
// (same pattern as blog/[slug]/page.tsx).
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { ContactWalkthroughSection } from "@/src/components/contact-walkthrough-section"

const WHAT_IT_DOES = [
  "Space and facility management, tracking floors, rooms, and occupancy",
  "Preventive and corrective maintenance scheduling",
  "Asset tracking across its full lifecycle, from purchase to retirement",
  "Compliance documentation, certificates, and audit trails",
  "Vendor and inventory management for spares and consumables",
  "Reporting dashboards that show uptime, cost, and SLA performance",
]

const BENEFITS = [
  "Fewer missed maintenance cycles, since every task is scheduled and tracked automatically",
  "Faster ticket resolution, with complaints routed to the right technician the moment they are raised",
  "Audit-ready compliance records instead of certificates scattered across email and paper files",
  "Lower reactive maintenance costs, because problems get caught before they turn into breakdowns",
  "One view across multiple sites, so management is not chasing separate spreadsheets per building",
]

export default function CafmSoftwarePage() {
  return (
    <>
      <Navigation breadcrumbOverride={[{ label: "CAFM Software", href: "/cafm-software" }]} />
      <main className="bg-white">
        <section className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-10">
          <h1 className="font-serif text-[clamp(2rem,4.5vw,3.2rem)] font-light text-[#114dac] leading-tight tracking-tight mb-5">
            What Is CAFM Software?
          </h1>
          <p className="text-[14.5px] font-light leading-[1.85] text-[#000000]">
            CAFM software, short for computer aided facility management software, gives facility teams one system
            to manage buildings, assets, maintenance, and compliance instead of spreadsheets, email threads, and
            paper logs. It centralizes the day to day work of running a facility so nothing gets missed, and gives
            management a live view of what is happening across every site.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-8">
          <h2 className="font-serif text-[clamp(1.4rem,2.8vw,1.9rem)] font-light text-[#114dac] leading-tight tracking-tight mb-4">
            What CAFM software does
          </h2>
          <p className="text-[13.5px] font-light leading-[1.8] text-[#000000] mb-5">
            A CAFM platform typically brings together several functions that used to live in separate tools or
            files:
          </p>
          <ul className="space-y-3">
            {WHAT_IT_DOES.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5 text-[#2b6cb0]" strokeWidth={1.75} />
                <span className="text-[13.5px] font-light leading-[1.75] text-[#000000]">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-8">
          <h2 className="font-serif text-[clamp(1.4rem,2.8vw,1.9rem)] font-light text-[#114dac] leading-tight tracking-tight mb-4">
            CAFM software vs CMMS
          </h2>
          <p className="text-[13.5px] font-light leading-[1.8] text-[#000000]">
            CAFM and CMMS overlap heavily, and the two terms are often used for the same kind of software. A CMMS
            (computerized maintenance management system) is usually maintenance first: work orders, PPM schedules,
            and asset history. CAFM is a broader term that adds space management, compliance, and workplace
            operations on top of that maintenance core. In practice, most modern platforms, including Firmity,
            blend both, so the distinction matters less than picking a system your team will actually use every
            day. For a deeper side by side comparison with CMMS, IWMS, and EAM, read our guide on{" "}
            <Link href="/blog/what-is-cafm-software" className="text-[#2b6cb0] font-semibold hover:underline">
              what CAFM software is
            </Link>
            .
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-8">
          <h2 className="font-serif text-[clamp(1.4rem,2.8vw,1.9rem)] font-light text-[#114dac] leading-tight tracking-tight mb-4">
            Why facility teams choose CAFM software
          </h2>
          <ul className="space-y-3">
            {BENEFITS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5 text-[#2b6cb0]" strokeWidth={1.75} />
                <span className="text-[13.5px] font-light leading-[1.75] text-[#000000]">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-14">
          <h2 className="font-serif text-[clamp(1.4rem,2.8vw,1.9rem)] font-light text-[#114dac] leading-tight tracking-tight mb-4">
            CAFM software from Firmity
          </h2>
          <p className="text-[13.5px] font-light leading-[1.8] text-[#000000]">
            Firmity brings task automation, asset and spares tracking, complaint and helpdesk ticketing, inventory
            and vendor management, visitor management, and staff attendance into one cloud platform built for
            facility teams in India. Every module shares the same data, so an asset logged in one screen shows up
            in maintenance history, compliance records, and reporting automatically, with nothing to re enter by
            hand. Talk to our team below to see how it would work for your buildings.
          </p>
        </section>

        <ContactWalkthroughSection />
      </main>
      <Footer />
    </>
  )
}
