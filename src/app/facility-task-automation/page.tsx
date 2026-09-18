"use client"

// ─── Facility Task Automation (2026-09-12 rebuild) ─────────────────────────
// "use client" is required here (2026-09-12 fix): this file's config object
// carries lucide-react Icon components (functions) as data, and a Server
// Component cannot pass functions as props across the boundary into
// ModulePageTemplate ("use client") — Next.js throws "Functions cannot be
// passed directly to Client Components" at runtime. Making this file a
// Client Component too keeps everything on the same side of that boundary.
// Formerly /preventive-maintenance — renamed on-page and in the URL per
// request ("we will redo the module pages... rename this link to Facility
// Task Automation"). The old route now 301-redirects here (next.config.mjs
// + a redirect() stub left at src/app/preventive-maintenance/page.tsx as a
// safety net) — see that file and src/lib/seo.ts / src/app/sitemap.ts /
// src/components/navigation.tsx / src/components/home-sections.tsx
// (MODULE_PAGES), all updated together so nothing still points at the old URL.
//
// This page is now a config object handed to ModulePageTemplate
// (src/components/module-page-template.tsx) — the same template every other
// module page will move onto — instead of its own hand-rolled layout. Visual
// language matches the homepage/features exactly (see that file's header
// comment); the old page's dark-green theme is gone entirely.
//
// Content sourcing:
// - Hero stats and the capability list are carried over from the previous
//   /preventive-maintenance page (same claims, restyled).
// - The 20-item feature checklist is copied verbatim from
//   MODULE_FEATURE_CHECKLIST["preventive-maintenance"] in
//   src/app/features/page.tsx (the single existing source for this list),
//   grouped into four categories with new original blurbs expanding on what
//   each cluster does — this is the "take the content from features and
//   expand on it" part of the request. Keep both lists in sync if the
//   checklist changes on /features.
// - The "week in the life" scenario section and the FAQ are new original
//   content for this rebuild (not claims copied from elsewhere) — flagging
//   per request so these can be reviewed/edited like any new marketing copy.
//
// PAGE-SPECIFIC LAYOUT (2026-09-12, per request) — this page now deviates
// from the template's default section set:
// - showClientsMarquee: true — companies marquee added right after the hero.
// - Intro statement (introKicker/introHeading/introBody) removed — the
//   "Explore our solutions" sidebar stays (it no longer depends on intro
//   copy — see module-page-template.tsx's sidebar-row comment).
// - showContactWalkthrough: true — the landing page's "Contact Us for a
//   Walkthrough" form/video/brochure section added right after Feature
//   groups.
// - Process ("Four steps..."), Variants ("One platform. Four maintenance
//   strategies."), Business impact ("Transform reactive..."), and
//   Industries ("...for every type of facility.") sections removed by
//   omitting their config fields — the template skips each one entirely
//   when its fields are absent.

import { ModulePageTemplate, type ModulePageConfig } from "@/src/components/module-page-template"
import {
  Calendar,
  Bell,
  Wrench,
  BarChart2,
  Smartphone,
  FileCheck,
} from "lucide-react"

const config: ModulePageConfig = {
  slug: "preventive-maintenance", // MODULES_LIST/MODULE_IMAGES key — unchanged, only the URL moved
  moduleNumber: "01",
  category: "Planned Preventive Maintenance",
  // 2026-09-12, per request: "remove Module 01 · Planned Preventive
  // Maintenance ... from the Stop reacting to breakdowns section" — hides
  // the badge pill above the hero headline for this page only.
  hideModuleBadge: true,

  heroHeadline: (
    <>
      Stop reacting to breakdowns.
      <br />
      <em className="not-italic text-[#2b6cb0]">Automate every task.</em>
    </>
  ),
  heroDescription:
    "Facility Task Automation replaces spreadsheets, whiteboards, and WhatsApp reminders with one scheduling engine that assigns work, tracks completion, and keeps an audit-ready record — automatically, from setup to sign-off.",
  heroStats: [
    { value: "40%", label: "Reduction in emergency repairs" },
    { value: "3x", label: "ROI within 12 months" },
    { value: "100%", label: "Audit-ready compliance log" },
  ],
  heroImageAlt: "Firmity Facility Task Automation dashboard showing scheduled tasks and completion status",
  showClientsMarquee: true,

  capabilitiesKicker: "Capabilities",
  capabilitiesHeading: "Everything your maintenance team needs.",
  capabilities: [
    {
      Icon: Calendar,
      title: "Automated Schedule Generation",
      desc: "Define intervals once — daily, weekly, monthly, or by usage meter. Firmity auto-generates and assigns work orders without manual input.",
    },
    {
      Icon: Bell,
      title: "Multi-Channel Alert Engine",
      desc: "Push, email, and in-app notifications fire days before a task is due. Escalation chains ensure nothing slips past your team.",
    },
    {
      Icon: Wrench,
      title: "Digital Work Orders",
      desc: "Each task ships as a structured work order with checklist steps, assigned technician, parts list, and photo-upload fields.",
    },
    {
      Icon: Smartphone,
      title: "Field Technician App",
      desc: "Technicians update task status, capture evidence photos, and log time from the field — offline-capable and mobile-first.",
    },
    {
      Icon: BarChart2,
      title: "Maintenance Analytics",
      desc: "Track completion rates, average resolution time, cost-per-task, and downtime trends. Exportable reports for management review.",
    },
    {
      Icon: FileCheck,
      title: "Compliance Audit Trail",
      desc: "Every completed task is timestamped and logged. One-click audit exports prove maintenance compliance to regulators or insurers.",
    },
  ],

  featureGroupsKicker: "Full Feature Set",
  featureGroupsHeading: "Every field a task needs, grouped the way your team works.",
  featureGroupsIntro:
    "The 20 fields below are the same feature set listed on the Features page, organized here into the four stages a task actually moves through — setup, scheduling, field execution, and reporting — so it's clear where each capability fits into the day-to-day workflow.",
  featureGroups: [
    {
      title: "Task setup & categorization",
      blurb:
        "Every task starts from a structured definition, not a free-text note — so the same category always reports the same way later.",
      items: ["Task Category", "Task Sub-category", "Task Description", "Task Location", "Task QR Tagging"],
    },
    {
      title: "Scheduling & assignment",
      blurb:
        "Frequency, shift, and repetition rules generate the calendar once and keep regenerating it — technicians get a queue, not a memory test.",
      items: ["Task Frequency", "Multiple Task Shifts", "Task Repetitions", "Task Date/Date Range", "Task-Employee Assignment"],
    },
    {
      title: "Field execution",
      blurb:
        "Work happens on the app the technician already has open — checklist, timing, and messaging live next to the task, not in a separate channel.",
      items: ["Digital Task Checklist", "Before/After Task Images", "Task Timings", "In-built Task-wise Messaging", "Task Priority"],
    },
    {
      title: "Reporting & oversight",
      blurb:
        "Status, remarks, and filters turn into a report a supervisor can export in one click — no manual collation at month-end.",
      items: ["Task Status", "Task Remarks", "Task Filters", "Export to Excel Sheets", "DMR Report"],
    },
  ],

  // Sticky "Explore our solutions" rail alongside Capabilities + Feature
  // groups (2026-09-16, per explicit request — copied from the working
  // sidebar on /resources/guide/[slug]; see module-page-template.tsx's
  // file-header note for why this plain-CSS-sticky version is safe where
  // the earlier fixed-position one wasn't). Piloted here first, then rolled
  // out to every other module page on this template the same day.
  showSolutionsSidebar: true,

  showContactWalkthrough: true,

  scenarioKicker: "New — a week in practice",
  scenarioHeading: "What a week with Facility Task Automation actually looks like.",
  scenarioIntro:
    "Original walkthrough for this rebuild — no new numbers, just the day-to-day sequence the capabilities above add up to.",
  scenarioBeats: [
    {
      time: "Monday, 6:00 AM",
      title: "The week's calendar is already built",
      desc: "Every recurring task due this week — HVAC filters, fire alarm checks, generator servicing — was generated automatically over the weekend, based on the frequency rules set up once per asset. No one opened a spreadsheet to make it happen.",
    },
    {
      time: "Tuesday",
      title: "A technician gets a due-today alert",
      desc: "A push notification lands on the field app with the work order, checklist, and location attached. The technician marks steps complete and attaches a before/after photo directly from site — no separate report to file later.",
    },
    {
      time: "Wednesday",
      title: "A usage-based trigger fires early",
      desc: "A generator crosses its running-hours threshold ahead of its usual monthly slot. Because the schedule is usage-based, not just calendar-based, the work order is raised the same day the threshold is crossed, not weeks later at the next scheduled check.",
    },
    {
      time: "Thursday",
      title: "A supervisor reviews the exception queue",
      desc: "One task is marked overdue. The escalation chain has already notified the site manager, and the task's remarks field shows the technician noted a missing part — visible without a phone call.",
    },
    {
      time: "Friday",
      title: "The compliance export takes one click",
      desc: "Month-end reporting is a DMR export, not a data-entry exercise — every task's status, timestamps, and technician sign-off are already logged, ready to hand to an auditor or insurer.",
    },
  ],

  relatedSlugs: ["asset-management", "complaint-management", "inventory-management"],

  faqHeading: "FAQ",
  faqIntro: "Quick answers to what teams evaluating Facility Task Automation ask most.",
  faqs: [
    {
      q: "How is this different from a shared to-do list or spreadsheet?",
      a: "A to-do list has to be filled in by someone every time. Facility Task Automation generates the calendar itself from the frequency rules you set once per asset, assigns it to the right technician automatically, and keeps a timestamped record of every action — nothing depends on someone remembering to update a sheet.",
    },
    {
      q: "Do technicians need a laptop to use it?",
      a: "No — the field technician app is mobile-first and offline-capable. Technicians see their task queue, complete checklists, and attach photos from a phone, and the record syncs once they're back online.",
    },
    {
      q: "What happens if a task is missed?",
      a: "The escalation chain notifies the assigned technician's supervisor once a task passes its due date without being closed, so a missed task surfaces the same day rather than at the next audit.",
    },
    {
      q: "Can we run time-based and usage-based schedules at the same time?",
      a: "Yes — each asset can carry its own trigger type. A generator might run on a usage-based hour count while a fire alarm panel runs on a fixed monthly calendar, and both feed the same task queue and reporting.",
    },
    {
      q: "Does this replace our existing AMC/vendor tracking?",
      a: "Facility Task Automation handles the scheduling and execution side of maintenance. AMC contracts and vendor/spares records live in the Assets & Spares Automation module (linked below) and connect back to the same task history.",
    },
  ],

  ctaHeading: "Ready to eliminate reactive maintenance?",
  ctaBody:
    "Facility teams use Firmity's Facility Task Automation to cut emergency repair costs, extend asset life, and stay fully compliant — without the spreadsheets.",
}

export default function FacilityTaskAutomationPage() {
  return <ModulePageTemplate config={config} />
}
