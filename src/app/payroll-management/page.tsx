"use client"

// ─── Payroll Automation ERP (2026-09-12) ───────────────────────────────────
// New dedicated module page — previously this module only lived as a card on
// /features (MODULE_PAGES had no entry for "payroll-management", so it fell
// through to the /features#payroll-management anchor). Built on
// ModulePageTemplate, same as /facility-task-automation — see that
// component's header comment for the shared design language.
//
// "use client" required: this config carries lucide-react Icon components as
// data passed into ModulePageTemplate ("use client") — see the note in
// facility-task-automation/page.tsx for why a Server Component can't do this.
//
// Content sourcing: the 20-item feature checklist and the hero/capability
// copy are grounded in MODULE_FEATURE_CHECKLIST["payroll-management"] and
// MODULES_LIST's existing desc/slideDesc for this module (src/app/features/
// page.tsx and src/components/home-sections.tsx) — nothing here duplicates
// those by accident; keep both in sync if the checklist changes on
// /features. Hero stats and impact metrics deliberately avoid inventing new
// numeric claims (unlike Facility Task Automation, this module had no prior
// standalone page to carry stats over from) — they're phrased from the
// existing "1-click", "100% statutory compliance", "zero financial leakage"
// language already in MODULES_LIST's slideDesc, not new figures. The
// "payroll cycle in practice" scenario and the FAQ are new original content
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
  Users,
  Calendar,
  Workflow,
  Landmark,
  ShieldCheck,
  IndianRupee,
} from "lucide-react"

const config: ModulePageConfig = {
  slug: "payroll-management",
  moduleNumber: "07",
  category: "Payroll & Statutory Compliance",
  hideModuleBadge: true,

  heroHeadline: (
    <>
      Run payroll in minutes.
      <br />
      <em className="not-italic text-[#2b6cb0]">Not in spreadsheets.</em>
    </>
  ),
  heroDescription:
    "Payroll Automation ERP replaces manual salary sheets and scattered compliance tracking with 1-click, error-free payroll — gross-to-net calculations, statutory deductions, maker-checker approval, and bank file generation, all from one run.",
  heroStats: [
    { value: "1-click", label: "Payroll execution" },
    { value: "100%", label: "Statutory compliance" },
    { value: "Zero", label: "Financial leakage" },
  ],
  heroImageAlt: "Firmity Payroll Automation ERP dashboard showing a payroll run and compliance status",
  showClientsMarquee: true,

  capabilitiesKicker: "Capabilities",
  capabilitiesHeading: "Everything your payroll team needs.",
  capabilities: [
    {
      Icon: Users,
      title: "Digital Employee Onboarding & Management",
      desc: "Add employees once with salary group, wage structure, and site assignment — no re-entry across systems.",
    },
    {
      Icon: Calendar,
      title: "Monthly Attendance Import",
      desc: "Attendance flows directly into the payroll run instead of being re-keyed from a separate system.",
    },
    {
      Icon: IndianRupee,
      title: "Automated Salary Generation",
      desc: "Gross-to-net calculations, overtime, and allowance structures compute automatically for every employee.",
    },
    {
      Icon: Workflow,
      title: "Multi-Tier Funds Approval",
      desc: "Every run passes through maker-checker validation before release — no salary goes out unreviewed.",
    },
    {
      Icon: Landmark,
      title: "Bank Transfer Export",
      desc: "An approved run generates a bank-ready transfer file for direct disbursal, alongside digital payslips.",
    },
    {
      Icon: ShieldCheck,
      title: "Statutory Compliance",
      desc: "PF, ESI, PT, TDS, and LWF are calculated automatically and stay ready for filing and audit.",
    },
  ],

  featureGroupsKicker: "Full Feature Set",
  featureGroupsHeading: "Every field a payroll run needs, grouped the way your team works.",
  featureGroupsIntro:
    "The 20 fields below are the same feature set listed on the Features page, organized here into the four stages a payroll cycle actually moves through — records, calculation, approval, and reporting.",
  featureGroups: [
    {
      title: "Employee records & structure",
      blurb: "Salary groups and wage configuration are set up once per employee, not re-entered every cycle.",
      items: [
        "Digital Employee Onboarding",
        "Digital Employee Management",
        "Salary Group & Wage Configuration",
        "Multi-site & Multi-client Payroll",
        "Designation & Department Management",
      ],
    },
    {
      title: "Calculation & disbursal",
      blurb: "Attendance, loans, and deductions feed a single automated salary run — no manual arithmetic.",
      items: [
        "Monthly Attendance Import",
        "Automated Salary Generation",
        "Loan & Advance Management",
        "Automatic EMI Scheduling",
        "Digital Payslip Generation",
      ],
    },
    {
      title: "Approval & controls",
      blurb: "Nothing disburses without a maker-checker review, and a run can be held or frozen if something looks wrong.",
      items: [
        "Multi-tier Funds Approval Workflow",
        "Salary Freeze & Lock",
        "Salary Hold & Release Management",
        "Bank Transfer Export",
        "Statutory Compliance (PF/ESI/PT/LWF)",
      ],
    },
    {
      title: "Reporting & audit",
      blurb: "Month-end and year-end reporting are exports of data already captured, not a separate compilation exercise.",
      items: [
        "Wage Register (Salary Report)",
        "Deduction Report",
        "Loan & Advance Report",
        "Company Salary Summary",
        "Generate & Freeze Audit Report",
      ],
    },
  ],

  // Sticky "Explore our solutions" rail alongside Capabilities + Feature
  // groups (2026-09-16, rolled out to all module pages on this template —
  // see module-page-template.tsx's file-header note for the sticky/overflow
  // fix that makes this safe; originally piloted on facility-task-automation).
  showSolutionsSidebar: true,

  showContactWalkthrough: true,

  scenarioKicker: "New — a cycle in practice",
  scenarioHeading: "What a payroll cycle with Payroll Automation ERP actually looks like.",
  scenarioIntro:
    "Original walkthrough for this build — no new numbers, just the sequence the capabilities above add up to.",
  scenarioBeats: [
    {
      time: "Day 25",
      title: "Attendance closes",
      desc: "The monthly attendance window closes and imports directly into payroll — no spreadsheet reconciliation between systems.",
    },
    {
      time: "Day 26",
      title: "The salary run generates",
      desc: "Gross-to-net calculations, overtime, and allowance structures run automatically for every employee and site.",
    },
    {
      time: "Day 27",
      title: "Maker-checker review",
      desc: "A finance maker submits the run; a checker reviews and approves it before anything is released for disbursal.",
    },
    {
      time: "Day 28",
      title: "Bank file exported",
      desc: "An approved run generates a bank transfer file ready for direct disbursal, plus digital payslips for every employee.",
    },
    {
      time: "Month-end",
      title: "Compliance is already filed",
      desc: "PF, ESI, PT, and TDS reports are already computed and ready to file, with the full run frozen and archived for audit.",
    },
  ],

  relatedSlugs: ["staff-attendance", "facility-expense-management", "inventory-management"],

  faqHeading: "FAQ",
  faqIntro: "Quick answers to what teams evaluating Payroll Automation ERP ask most.",
  faqs: [
    {
      q: "How does attendance feed into payroll?",
      a: "Monthly attendance from the Employee Management module imports directly into the payroll run — hours, shifts, and leave are already reflected before salary generation starts, with no manual re-keying.",
    },
    {
      q: "What statutory deductions does Firmity calculate automatically?",
      a: "PF, ESI, PT, TDS, and LWF are calculated as part of every run, along with overtime and allowance structures, so a run's compliance figures are ready without a separate calculation step.",
    },
    {
      q: "What is maker-checker approval and why does it matter for payroll?",
      a: "A maker prepares or submits the run and a separate checker reviews and approves it before disbursal — a control against errors or unauthorized changes reaching an actual bank transfer.",
    },
    {
      q: "Can Firmity handle multiple sites or clients on one payroll run?",
      a: "Yes — multi-site and multi-client payroll is a core part of the module, so a facility management company running payroll across several client sites can process it from one platform.",
    },
    {
      q: "Does this post directly to our accounting ledger?",
      a: "Yes — approved payroll runs post to your core ERP general ledger, so payroll doesn't sit as a disconnected spreadsheet outside your books.",
    },
  ],

  ctaHeading: "Ready to run payroll in one click?",
  ctaBody:
    "Facility and property management teams use Firmity's Payroll Automation ERP to cut payroll processing time, stay statutorily compliant, and eliminate manual recalculation errors.",
}

export default function PayrollManagementPage() {
  return <ModulePageTemplate config={config} />
}
