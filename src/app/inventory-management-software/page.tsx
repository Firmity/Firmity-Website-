// ─── /inventory-management-software — "Inventory Management Software for
// Tracking & Managing Stock" ─────────────────────────────────────────────
// Built 2026-09-30, same structural template as /cafm-software. Content
// sourced from the Inventory and Vendor Management section of
// Firmity_Features_Listing_Comprehensive_Client.pdf (item cataloguing,
// vendor rate cards, purchase orders, GRN, stock ledger, item distribution,
// low-stock alerts) plus the FAQ doc linked for this page in the SEO
// tracker spreadsheet.
//
// Slug lowercased from the tracker's "Inventory-management-software" to the
// standard all-lowercase "inventory-management-software" — flagged to the
// user in the summary of this batch of work.
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
  { title: "Item cataloguing & specifications", body: "Categorize items by category, sub-category, and variant attributes like colour, size, or type, with a minimum stock threshold set per item." },
  { title: "Vendor-wise rate cards", body: "Contract-based pricing per vendor with a validity period, plus full vendor profiles — GST, PAN, bank details, and documents." },
  { title: "Purchase orders & approvals", body: "Raise, approve, or reject purchase orders against a vendor's rate card, with searchable, exportable PO records." },
  { title: "Goods receipt (GRN)", body: "Record full or partial deliveries against a PO, tracking received, pending, and previously-received quantities per item." },
  { title: "Stock tracking & low-stock alerts", body: "A visual stock-level view per item, auto-flagged In Stock or Low Stock against a configured minimum threshold." },
  { title: "Stock ledger & item distribution", body: "Every transaction — receipt, issue, adjustment — logged chronologically, with stock transferable across stores and properties." },
]

const WITHOUT = [
  "Stock levels tracked in a spreadsheet, updated after the fact",
  "Purchase orders approved informally, with no audit trail",
  "No way to tell what's low on stock until it runs out",
  "Deliveries logged without linking back to the original PO",
  "No visibility into stock moving between properties or sites",
]

const WITH = [
  "Stock levels visible in real time, flagged before they run low",
  "Purchase orders tracked through a defined approval workflow",
  "Low-stock alerts triggered automatically against set thresholds",
  "Every delivery (GRN) traceable back to its purchase order",
  "Stock transfers between stores and properties fully logged",
]

const STEPS = [
  { title: "Catalogue items & set thresholds", body: "Organize items by category and specification, and set minimum stock levels per item." },
  { title: "Set up vendor rate cards", body: "Attach contract pricing per vendor so purchase orders draw from approved rates automatically." },
  { title: "Raise & receive purchase orders", body: "Requisitions convert to POs, approvals are tracked, and GRNs record what's actually delivered." },
  { title: "Track stock & distribute", body: "The stock ledger updates on every transaction, and items transfer across stores as needed." },
]

const COMPARISON = [
  { capability: "Stock visibility", manual: "Spreadsheet, updated after the fact", software: "Real-time stock ledger" },
  { capability: "Low-stock detection", manual: "Discovered when items run out", software: "Auto-triggered threshold alerts" },
  { capability: "Purchase order approval", manual: "Informal, no audit trail", software: "Tracked approval workflow" },
  { capability: "Delivery tracking (GRN)", manual: "Logged separately from the PO", software: "Linked directly to its PO" },
  { capability: "Multi-property stock transfer", manual: "Untracked", software: "Logged item distribution" },
]

const REASONS = [
  { title: "Fewer stock-outs", body: "Low-stock alerts trigger automatically against a configured threshold, before an item actually runs out." },
  { title: "Faster procurement cycles", body: "Purchase orders draw from pre-agreed vendor rate cards, cutting back-and-forth on pricing." },
  { title: "Full audit trail", body: "Every requisition, PO, GRN, and stock movement is cross-referenced and traceable to its source." },
  { title: "Centralized multi-property visibility", body: "See stock across every store and property from one platform, not separate site spreadsheets." },
  { title: "Scales with more vendors & stores", body: "Add vendors, categories, and properties without outgrowing the system." },
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
    q: "What is inventory management software?",
    a: "Inventory management software is a digital solution that helps businesses monitor stock, spare parts, materials, purchases, usage, and inventory records from a centralized platform.",
  },
  {
    q: "How can inventory software help control stock?",
    a: "It provides better visibility into available items, consumption, stock movements, and replenishment requirements, helping teams maintain appropriate inventory levels and avoid unnecessary shortages.",
  },
  {
    q: "What capabilities should an inventory management system provide?",
    a: "Look for capabilities such as stock tracking, item categorization, purchase management, stock movement records, spare parts tracking, low-stock alerts, usage monitoring, and inventory reporting.",
  },
  {
    q: "Why choose Firmity inventory management software?",
    a: "Firmity helps organizations manage inventory and spare parts alongside assets, maintenance, and other facility operations, giving teams centralized control over stock-related activities.",
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

export default function InventoryManagementSoftwarePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <Navigation
        breadcrumbOverride={[{ label: "Inventory Management Software", href: "/inventory-management-software" }]}
      />
      <main className="bg-white">
        <section className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-8">
          <h1 className="font-serif text-[clamp(2rem,4.5vw,3.2rem)] font-light text-[#114dac] leading-tight tracking-tight mb-5 max-w-3xl">
            Inventory management software for tracking & managing stock.
          </h1>
          <p className="text-[14.5px] font-light leading-[1.85] text-[#000000] max-w-3xl mb-6">
            Manage inventory efficiently with Firmity. Track stock, spare parts, purchases, usage, and inventory
            records while improving visibility across facility operations.
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
            <strong className="font-semibold">Inventory management software</strong> tracks stock, spare parts, and
            purchases from requisition through to delivery, replacing spreadsheets and manual registers. Firmity&apos;s
            inventory management software connects procurement, stock, and distribution into one auditable workflow.
          </p>
        </section>

        <section id="modules" className={`${SECTION} scroll-mt-24`}>
          <h2 className={H2}>What Firmity&apos;s inventory management software covers</h2>
          <p className={`${BODY} max-w-3xl mb-6`}>
            From cataloguing an item to distributing it across sites, every step is tracked.
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
          <h2 className={`${H2} mb-6`}>What stock control looks like without dedicated software</h2>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className={H3}>Without inventory management software</h3>
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
          <p className={`${BODY} max-w-3xl mb-6`}>Four steps from cataloguing an item to tracking it across every site.</p>
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
          <h2 className={H2}>Inventory management software vs spreadsheet tracking</h2>
          <p className={`${BODY} max-w-3xl mb-6`}>
            Where a spreadsheet falls short, and where dedicated inventory management software picks it up.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13.5px] font-light text-[#000000]">
              <thead>
                <tr className="border-b border-[#dbe5f0] text-[#114dac]">
                  <th className="py-2.5 pr-4 font-medium">Capability</th>
                  <th className="py-2.5 pr-4 font-medium">Spreadsheet tracking</th>
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
            <Link href="/inventory-vendor-automation-erp" className={LINK}>
              inventory & vendor automation ERP
            </Link>
            , or see how it fits into{" "}
            <Link href="/erp-software" className={LINK}>
              ERP software
            </Link>
            .
          </p>
        </section>

        <section className={SECTION}>
          <h2 className={`${H2} mb-6`}>Why teams choose Firmity&apos;s inventory management software</h2>
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
              Requisitions, purchase orders, GRNs, and stock movements are all cross-referenced, so every stock-in is
              traceable back to its source — no reconciling separate registers at month-end.
            </p>
          </div>
        </section>

        <section id="industries" className={`${SECTION} scroll-mt-24`}>
          <h2 className={`${H2} mb-6`}>Built for how your industry manages stock</h2>
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
              FAQ: Inventory management software common questions
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
