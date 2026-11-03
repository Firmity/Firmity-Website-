"use client"

// ─── Assets & Spares Automation (2026-09-16 rebuild) ───────────────────────
// Replaces the old hand-rolled dark-amber-themed page (own dashboard mockup,
// own palette) with the shared ModulePageTemplate — same treatment as
// /facility-task-automation, /payroll-automation-erp, and
// /facility-expense-automation-erp (per request: "do to every page what we did
// to the Facility Task Automation page"). "use client" required: this
// config carries lucide-react Icon components as data passed into
// ModulePageTemplate ("use client") — see the note in
// facility-task-automation/page.tsx for why a Server Component can't do
// this.
//
// Content sourcing: capability titles/descriptions are carried over from the
// old page's own capability cards (already good, on-brand copy — reworded
// only where needed to fit this template's voice), restructured into this
// template's sections. The feature checklist is copied verbatim from
// MODULE_FEATURE_CHECKLIST["asset-management"] in src/app/features/page.tsx
// (the single existing source for this list), grouped into four categories
// — keep both lists in sync if the checklist changes on /features. Hero
// stats avoid inventing new numeric claims (the old page's dashboard mockup
// numbers — "247 assets", "14 alerts" — were decorative UI mockup data, not
// documented product claims, so they aren't carried over); "15 Years of
// Service Records Tracking" is a real checklist item, so it's used as-is.
// The "week in the life" scenario and the FAQ are new original content for
// this rebuild, same flagging as every other module page rebuild — worth a
// review pass before/when this page's content gets deepened individually.

import { ModulePageTemplate, type ModulePageConfig } from "@/src/components/module-page-template"
import {
  Barcode,
  Bell,
  Tag,
  TrendingUp,
  FileText,
  BarChart2,
} from "lucide-react"

const config: ModulePageConfig = {
  slug: "asset-management",
  moduleNumber: "02",
  category: "Assets & Spares Automation",
  hideModuleBadge: true,

  heroHeadline: (
    <>
      Know every asset's story.
      <br />
      <em className="not-italic text-[#2b6cb0]">Before it breaks down.</em>
    </>
  ),
  heroDescription:
    "Assets & Spares Automation replaces scattered warranty folders and tribal knowledge with one QR-tagged registry — history, AMC contracts, and spares available to any technician in a scan, and maintenance triggered automatically before uptime is at risk.",
  heroStats: [
    { value: "QR-tagged", label: "Instant asset history in the field" },
    { value: "15 yrs", label: "Service record retention" },
    { value: "Zero", label: "Lost AMC or warranty documents" },
  ],
  heroImageAlt: "Firmity Assets & Spares Automation dashboard showing asset registry and AMC status",
  showClientsMarquee: true,

  capabilitiesKicker: "Capabilities",
  capabilitiesHeading: "Everything your asset management team needs.",
  capabilities: [
    {
      Icon: Barcode,
      title: "Digital Asset Registry",
      desc: "Maintain a complete database of every asset — photos, specs, purchase date, warranty, vendor, and location — QR-coded for instant field access.",
    },
    {
      Icon: Bell,
      title: "Smart Service Alerts",
      desc: "Automated alerts for AMC renewals, warranty expiry, insurance deadlines, and compliance certifications — days before they're due.",
    },
    {
      Icon: Tag,
      title: "QR Code Asset & Spares Tagging",
      desc: "Generate and print QR codes for every asset and spare. Scan from mobile to instantly pull up history, documents, and upcoming tasks.",
    },
    {
      Icon: TrendingUp,
      title: "Lifecycle Cost Tracking",
      desc: "Track every rupee spent on each asset — purchase, maintenance, repair, and disposal — for a true cost-of-ownership picture.",
    },
    {
      Icon: FileText,
      title: "Document Vault per Asset",
      desc: "Attach AMC agreements, insurance policies, calibration certificates, and manuals directly to each asset record.",
    },
    {
      Icon: BarChart2,
      title: "Asset Performance Analytics",
      desc: "View uptime history, repair frequency, cost trends, and depreciation — spot underperformers before they become emergencies.",
    },
  ],

  featureGroupsKicker: "Full Feature Set",
  featureGroupsHeading: "Every field an asset record needs, grouped the way your team works.",
  featureGroupsIntro:
    "The fields below are the same feature set listed on the Features page, organized here into the four areas an asset actually moves through — identity, monitoring, contracts, and spares.",
  featureGroups: [
    {
      title: "Asset identity & records",
      blurb: "Every asset is registered once with a complete profile — not re-described from memory every time it needs service.",
      items: [
        "Centralised Database",
        "Asset/Spares Name & Description",
        "Asset/Spares Manufacturer",
        "Asset/Spares Model",
        "Asset/Spares Location",
        "QR Asset/Spares Tagging",
        "Asset/Spares Images",
      ],
    },
    {
      title: "Monitoring & service scheduling",
      blurb: "Service triggers itself off real usage and history, not a technician's memory of when something was last checked.",
      items: [
        "Real-time Monitoring",
        "Smart Service Alerts",
        "Automated Service Scheduling",
        "Asset/Spares Health Monitoring",
        "15 Years of Service Records Tracking",
      ],
    },
    {
      title: "Warranty, AMC & rental",
      blurb: "Warranty, AMC, and rental terms live on the asset record itself, so coverage status is a lookup, not a filing-cabinet search.",
      items: [
        "Asset/Spares Warranty",
        "Asset AMC",
        "Asset Renting",
        "Asset Rental Contract",
        "Rented Asset Tracking",
      ],
    },
    {
      title: "Spares, invoicing & reporting",
      blurb: "Spares are linked to the assets they serve, so stock, cost, and audit reporting all trace back to one record.",
      items: [
        "Spares-Asset Linking",
        "Spares Quantity",
        "Asset/Spares Check-in & Check-out Tracking",
        "Asset/Spares Invoicing",
        "Asset/Spares Documentation",
        "DMR Report",
      ],
    },
  ],

  // Sticky "Explore our solutions" rail alongside Capabilities + Feature
  // groups (2026-09-16, rolled out to all module pages on this template —
  // see module-page-template.tsx's file-header note for the sticky/overflow
  // fix that makes this safe; originally piloted on facility-task-automation).
  showSolutionsSidebar: true,

  showContactWalkthrough: true,

  scenarioKicker: "New — a week in practice",
  scenarioHeading: "What a week with Assets & Spares Automation actually looks like.",
  scenarioIntro:
    "Original walkthrough for this rebuild — no new numbers, just the day-to-day sequence the capabilities above add up to.",
  scenarioBeats: [
    {
      time: "Monday",
      title: "A new chiller is registered",
      desc: "Specs, purchase date, vendor, and warranty card go in once. A QR code is generated and printed for the unit the same afternoon.",
    },
    {
      time: "Tuesday",
      title: "A technician scans on arrival",
      desc: "Called out for a generator alarm, the technician scans its QR tag on-site and gets full service history and the current AMC contract instantly — no calling the office for context.",
    },
    {
      time: "Wednesday",
      title: "An AMC renewal alert fires",
      desc: "A fire panel's annual maintenance contract is 30 days from expiry. The alert reaches the facility manager before coverage lapses, not after.",
    },
    {
      time: "Thursday",
      title: "A spare is checked out",
      desc: "A replacement pump seal is checked out against the asset it serves. The spares ledger and the asset's maintenance log update together, automatically.",
    },
    {
      time: "Friday",
      title: "A replacement decision gets made on data",
      desc: "Lifecycle cost tracking shows one HVAC unit's repair spend now exceeds a threshold worth flagging — a replacement conversation starts from cost history, not a guess.",
    },
  ],

  relatedSlugs: ["preventive-maintenance", "inventory-management", "facility-expense-management"],

  faqHeading: "FAQ",
  faqIntro: "Quick answers to what teams evaluating Assets & Spares Automation ask most.",
  faqs: [
    {
      q: "What happens when a technician doesn't have signal on-site?",
      a: "Asset records and QR tags are designed for field use — once an asset's details have synced to the app, its history and documents remain viewable, with updates syncing back once connectivity returns.",
    },
    {
      q: "Can we track rented or leased equipment alongside owned assets?",
      a: "Yes — asset renting, rental contracts, and rented-asset tracking sit alongside owned-asset records, so a leased generator is tracked the same way as one you own, including its own contract terms.",
    },
    {
      q: "How far back does service history go?",
      a: "Service records are retained for up to 15 years per asset, so a long-lived piece of equipment carries its full maintenance history rather than losing records after a system migration.",
    },
    {
      q: "Are spares tied to specific assets, or tracked separately?",
      a: "Both — spares carry their own quantity and location, and can be linked to the specific assets they serve, so checking a spare out updates that asset's record automatically.",
    },
    {
      q: "Does this replace our AMC vendor's own portal?",
      a: "No — it's where your AMC contracts, renewal dates, and service history live on your side, regardless of which vendor holds a given contract, so switching vendors doesn't mean losing an asset's history.",
    },
  ],

  ctaHeading: "Ready to give every asset a paper trail that finds itself?",
  ctaBody:
    "Facility teams use Firmity's Assets & Spares Automation to cut emergency repairs, extend asset life, and never miss an AMC renewal again.",
}

export default function AssetManagementPage() {
  return <ModulePageTemplate config={config} />
}
