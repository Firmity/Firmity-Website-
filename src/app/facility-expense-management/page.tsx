"use client"

// ─── Facility Expense Automation ERP (2026-09-12) ──────────────────────────
// New dedicated module page — previously this module only lived as a card on
// /features (MODULE_PAGES had no entry for "facility-expense-management", so
// it fell through to the /features#facility-expense-management anchor).
// Built on ModulePageTemplate, same as /facility-task-automation — see that
// component's header comment for the shared design language.
//
// "use client" required: this config carries lucide-react Icon components as
// data passed into ModulePageTemplate ("use client") — see the note in
// facility-task-automation/page.tsx for why a Server Component can't do this.
//
// Content sourcing: the 15-item feature checklist and the hero/capability
// copy are grounded in MODULE_FEATURE_CHECKLIST["facility-expense-management"]
// and MODULES_LIST's existing desc/slideDesc for this module (src/app/
// features/page.tsx and src/components/home-sections.tsx) — keep both in
// sync if the checklist changes on /features. Hero stats and impact metrics
// deliberately avoid inventing new numeric claims (no prior standalone page
// existed for this module) — they're phrased structurally ("policy-driven",
// "real-time", "audit-ready") rather than as fabricated percentages. The
// "month of facility spend" scenario and the FAQ are new original content
// for this build, same flagging as the Facility Task Automation rebuild —
// worth a review pass before/when this page's content gets deepened
// individually.
//
// TRIMMED (2026-09-16, per request — "do to every page what we did to the
// Facility Task Automation page"): dropped the intro statement, "How it
// works" process steps, Business impact metrics, and Industries grid —
// facility-task-automation's final shape doesn't carry those sections
// either. Added the companies marquee after the hero and the "Contact Us
// for a Walkthrough" section after Feature groups, and hid the "Module NN ·
// Category" badge — same three flags facility-task-automation uses.

import { ModulePageTemplate, type ModulePageConfig } from "@/src/components/module-page-template"
import {
  Receipt,
  Layers,
  Wallet,
  Workflow,
  RefreshCw,
  BarChart3,
} from "lucide-react"

const config: ModulePageConfig = {
  slug: "facility-expense-management",
  moduleNumber: "08",
  category: "Budget & Expense Control",
  hideModuleBadge: true,

  heroHeadline: (
    <>
      Catch budget breaches
      <br />
      <em className="not-italic text-[#2b6cb0]">before they happen.</em>
    </>
  ),
  heroDescription:
    "Facility Expense Automation ERP replaces manual bill tracking and static spreadsheets with policy-driven budget caps, maker-checker approvals, and audit-ready journals posted straight to your general ledger.",
  heroStats: [
    { value: "Policy-driven", label: "Budget caps" },
    { value: "Auto", label: "Ledger posting" },
    { value: "Live", label: "Breach alerts" },
  ],
  heroImageAlt: "Firmity Facility Expense Automation ERP dashboard showing category budgets and approvals",
  showClientsMarquee: true,

  capabilitiesKicker: "Capabilities",
  capabilitiesHeading: "Everything your finance team needs to control facility spend.",
  capabilities: [
    {
      Icon: Receipt,
      title: "Expense Bill Capture",
      desc: "Attach PDF bills directly to each expense entry — no lost paperwork or separate filing system.",
    },
    {
      Icon: Layers,
      title: "Category & Cost-Center Tracking",
      desc: "Every expense is tagged by category and cost center or location for clean, comparable reporting.",
    },
    {
      Icon: Wallet,
      title: "Budget Creation & Alerts",
      desc: "Set category-wise budget caps and get alerted before spend crosses the line, not after.",
    },
    {
      Icon: Workflow,
      title: "Approval Workflow",
      desc: "Every expense routes through a defined approval chain before it's paid — no email chasing.",
    },
    {
      Icon: RefreshCw,
      title: "Recurring Expense Management",
      desc: "Set up recurring bills once and let them post automatically each cycle without re-entry.",
    },
    {
      Icon: BarChart3,
      title: "Expense Analytics & Trends",
      desc: "Track spend trends across properties and catch anomalies early with a consolidated dashboard.",
    },
  ],

  featureGroupsKicker: "Full Feature Set",
  featureGroupsHeading: "Every field an expense needs, grouped the way your team works.",
  featureGroupsIntro:
    "The 15 fields below are the same feature set listed on the Features page, organized here into the three stages an expense actually moves through — capture, control, and reporting.",
  featureGroups: [
    {
      title: "Capture & categorization",
      blurb: "Every expense starts as a structured, documented entry — not a loose receipt waiting to be reconciled later.",
      items: ["Expense Bill PDF Attachment", "Expense Categorization", "Cost Center/Location-wise Tracking", "Multi-property Expense Tracking", "Recurring Expense Management"],
    },
    {
      title: "Budget & approval control",
      blurb: "Spend is checked against a category budget and routed for sign-off automatically, before money moves.",
      items: ["Budget Creation & Alerts", "Expense Approval Workflow", "Vendor/Bill Payment Tracking", "Centralized Expense Dashboard", "Expense Tracking"],
    },
    {
      title: "Reporting & audit",
      blurb: "Month-end reporting is a review of data already captured, complete with a full trail for auditors.",
      items: ["Expense Analytics", "Expense Trend Analysis", "Expense History & Audit Trail", "Export to Excel Sheets", "Expense Reports"],
    },
  ],

  // Sticky "Explore our solutions" rail alongside Capabilities + Feature
  // groups (2026-09-16, rolled out to all module pages on this template —
  // see module-page-template.tsx's file-header note for the sticky/overflow
  // fix that makes this safe; originally piloted on facility-task-automation).
  showSolutionsSidebar: true,

  showContactWalkthrough: true,

  scenarioKicker: "New — a month in practice",
  scenarioHeading: "What a month of facility spend looks like with Facility Expense Automation ERP.",
  scenarioIntro:
    "Original walkthrough for this build — no new numbers, just the sequence the capabilities above add up to.",
  scenarioBeats: [
    {
      time: "Week 1",
      title: "A bill comes in",
      desc: "A vendor invoice for HVAC servicing is logged with its PDF, category, and cost center attached — no separate filing step.",
    },
    {
      time: "Week 1",
      title: "Approval routes automatically",
      desc: "The expense moves to the right approver based on its category and amount, without anyone forwarding an email.",
    },
    {
      time: "Week 2",
      title: "A budget cap flags early",
      desc: "Housekeeping supply spend crosses most of its monthly cap. The alert fires before the category goes over budget, not after.",
    },
    {
      time: "Week 3",
      title: "A recurring bill posts itself",
      desc: "The month's internet and AMC bills, set up once as recurring expenses, post automatically without re-entry.",
    },
    {
      time: "Month-end",
      title: "The ledger is already reconciled",
      desc: "Every approved expense has already posted to the general ledger, so month-end close is a review, not a data-entry exercise.",
    },
  ],

  relatedSlugs: ["inventory-management", "payroll-management", "asset-management"],

  faqHeading: "FAQ",
  faqIntro: "Quick answers to what teams evaluating Facility Expense Automation ERP ask most.",
  faqs: [
    {
      q: "How are budget caps enforced?",
      a: "Each expense category carries its own budget cap. As spend is logged against a category, Firmity compares it to the cap in real time and alerts before the category is breached, rather than reporting an overrun after the fact.",
    },
    {
      q: "Can different categories have different approval chains?",
      a: "Yes — approval workflows route by category and amount, so a small recurring bill and a large one-off vendor payment can follow different sign-off chains.",
    },
    {
      q: "Does this replace our accounting software?",
      a: "No — it handles expense capture, budget control, and approval at the facility-operations layer, then posts approved entries to your ledger, the same way a Tier 2 system feeds a corporate finance system.",
    },
    {
      q: "Can we track spend across multiple properties separately?",
      a: "Yes — multi-property expense tracking is a core part of the module, so spend can be viewed per property or consolidated across all of them from one dashboard.",
    },
    {
      q: "What happens when a recurring expense changes amount?",
      a: "A recurring expense can be updated at any point — the next cycle posts at the new amount, and the change is reflected in the audit trail like any other edit.",
    },
  ],

  ctaHeading: "Ready to see facility spend before it becomes a problem?",
  ctaBody:
    "Facility and property management teams use Firmity's Facility Expense Automation ERP to enforce budget discipline, cut approval delays, and keep every expense audit-ready.",
}

export default function FacilityExpenseManagementPage() {
  return <ModulePageTemplate config={config} />
}
