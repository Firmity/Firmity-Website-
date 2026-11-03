"use client"

// ─── Complaint & Helpdesk Automation (2026-09-16 rebuild) ──────────────────
// Replaces the old hand-rolled page with the shared ModulePageTemplate —
// same treatment as /facility-task-automation, /payroll-automation-erp,
// /facility-expense-automation-erp, and /assets-spares-automation (per request: "do to
// every page what we did to the Facility Task Automation page"). "use
// client" required — see the note in facility-task-automation/page.tsx for
// why a Server Component can't pass lucide-react Icon components as config
// data into ModulePageTemplate ("use client").
//
// Content sourcing: capability titles/descriptions are carried over from the
// old page's own capability cards, restructured into this template's
// sections. The feature checklist is copied verbatim from
// MODULE_FEATURE_CHECKLIST["complaint-management"] in
// src/app/features/page.tsx, grouped into four categories — keep both lists
// in sync if the checklist changes on /features. Hero stats are phrased
// from the module's own existing MODULES_LIST desc/slideDesc language
// ("scan-to-raise", "auto-route", "zero dropped issues"), not new figures.
// The "week in the life" scenario and the FAQ are new original content for
// this rebuild — worth a review pass before/when this page's content gets
// deepened individually.

import { ModulePageTemplate, type ModulePageConfig } from "@/src/components/module-page-template"
import {
  MessageSquare,
  Tag,
  Clock,
  Bell,
  BarChart2,
  FileCheck,
} from "lucide-react"

const config: ModulePageConfig = {
  slug: "complaint-management",
  moduleNumber: "03",
  category: "Complaint & Helpdesk Automation",
  hideModuleBadge: true,

  heroHeadline: (
    <>
      Every complaint routed.
      <br />
      <em className="not-italic text-[#2b6cb0]">Every SLA tracked.</em>
    </>
  ),
  heroDescription:
    "Complaint & Helpdesk Automation replaces WhatsApp complaints and lost front-desk notes with scan-to-raise QR ticketing that auto-routes to the right technician, tracks every SLA, and leaves a full audit trail from report to resolution.",
  heroStats: [
    { value: "Scan-to-raise", label: "QR ticket creation" },
    { value: "Auto-routed", label: "Every ticket, zero manual triage" },
    { value: "Zero", label: "Dropped issues" },
  ],
  heroImageAlt: "Firmity Complaint & Helpdesk Automation dashboard showing live ticket status boards",
  showClientsMarquee: true,

  capabilitiesKicker: "Capabilities",
  capabilitiesHeading: "Everything your helpdesk team needs.",
  capabilities: [
    {
      Icon: MessageSquare,
      title: "Multi-Channel Complaint Intake",
      desc: "Capture complaints via mobile app, web portal, QR codes, email, or front-desk logging — every submission lands in a single queue.",
    },
    {
      Icon: Tag,
      title: "Auto-Categorisation and Routing",
      desc: "Classify complaints by type, zone, and priority automatically, and route to the right team or technician without manual assignment.",
    },
    {
      Icon: Clock,
      title: "SLA Tracking and Escalation",
      desc: "Define resolution SLAs per complaint type — automatic escalation fires when deadlines approach, keeping management informed.",
    },
    {
      Icon: Bell,
      title: "Real-Time Status Notifications",
      desc: "Complainants and supervisors receive instant updates at every status change — no need to chase for progress.",
    },
    {
      Icon: BarChart2,
      title: "Resolution Analytics Dashboard",
      desc: "Track open counts, average resolution time, SLA compliance rate, and recurring issue patterns across facilities.",
    },
    {
      Icon: FileCheck,
      title: "Full Audit and History Trail",
      desc: "Every comment, reassignment, and status update is logged with user and timestamp — built for accountability and audits.",
    },
  ],

  featureGroupsKicker: "Full Feature Set",
  featureGroupsHeading: "Every field a ticket needs, grouped the way your team works.",
  featureGroupsIntro:
    "The fields below are the same feature set listed on the Features page, organized here into the four stages a ticket actually moves through — intake, routing, resolution, and reporting.",
  featureGroups: [
    {
      title: "Ticket intake & categorization",
      blurb: "A complaint starts as a structured, located, categorized ticket — not a message that has to be re-typed into a system later.",
      items: [
        "Ticket Management",
        "Ticket Category",
        "Ticket Description",
        "Ticket Image Attachment",
        "QR-based Ticketing",
        "Geo-located Ticketing",
      ],
    },
    {
      title: "Routing & SLA control",
      blurb: "Priority and category drive automatic assignment and a resolution clock the team can't quietly let slip.",
      items: [
        "Auto Ticket Assignment",
        "Ticket Priority",
        "SLA Tracking",
        "TAT Tracking",
        "Escalation Matrix",
      ],
    },
    {
      title: "Resolution & communication",
      blurb: "Status changes and comments reach the right people the moment they happen, and a closed ticket can be reopened if the issue recurs.",
      items: [
        "Ticket Status",
        "Real-time Ticket Updates",
        "Ticket Comments & Remarks",
        "Notifications & Alerts",
        "Ticket Reopening",
        "User-Friendly Interface",
      ],
    },
    {
      title: "Reporting & feedback",
      blurb: "A full history, searchable and exportable, turns complaint data into a pattern-finding tool instead of a closed file.",
      items: [
        "Ticket History & Activity Log",
        "Resident Feedback & Rating",
        "Analytics Dashboard",
        "Ticket Search & Filters",
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
  scenarioHeading: "What a week with Complaint & Helpdesk Automation actually looks like.",
  scenarioIntro:
    "Original walkthrough for this rebuild — no new numbers, just the day-to-day sequence the capabilities above add up to.",
  scenarioBeats: [
    {
      time: "Monday",
      title: "A resident scans and reports",
      desc: "A leaking pipe gets reported by scanning a corridor QR code — category, location, and a photo attach automatically, no front-desk call needed.",
    },
    {
      time: "Monday",
      title: "The ticket routes itself",
      desc: "Based on category and zone, the ticket lands directly on the assigned plumbing technician's queue — no supervisor manually assigning it.",
    },
    {
      time: "Tuesday",
      title: "An SLA clock starts ticking",
      desc: "The complaint's SLA timer counts down visibly on the status board; as it nears deadline, the escalation matrix notifies the shift supervisor automatically.",
    },
    {
      time: "Wednesday",
      title: "The resident sees progress without asking",
      desc: "A status change to \"in progress\" pushes a notification to the resident — no one has to call the office to ask what's happening.",
    },
    {
      time: "Friday",
      title: "A pattern surfaces in the dashboard",
      desc: "The analytics dashboard flags a spike in recurring plumbing complaints in one wing — a maintenance review gets scheduled from the data, not a hunch.",
    },
  ],

  relatedSlugs: ["preventive-maintenance", "asset-management", "staff-attendance"],

  faqHeading: "FAQ",
  faqIntro: "Quick answers to what teams evaluating Complaint & Helpdesk Automation ask most.",
  faqs: [
    {
      q: "How is this different from a WhatsApp group or shared inbox?",
      a: "A WhatsApp group has no SLA clock, no automatic routing, and no searchable history. Every ticket here is categorized, routed, and timestamped automatically, so nothing depends on someone scrolling back through messages to find what was reported.",
    },
    {
      q: "Can residents or building occupants submit complaints without an app?",
      a: "Yes — QR-based ticketing lets anyone submit a complaint by scanning a code with their phone's camera, no app install or login required, alongside the web portal and app for registered users.",
    },
    {
      q: "What happens if a ticket isn't resolved in time?",
      a: "The escalation matrix automatically notifies the next level up as a ticket's SLA deadline approaches, so an at-risk ticket surfaces to a supervisor before it breaches, not after a resident complains again.",
    },
    {
      q: "Can a resolved ticket be reopened?",
      a: "Yes — ticket reopening is built in, so if the same issue recurs shortly after being marked resolved, it can be reopened against the same ticket rather than starting a fresh one that loses the history.",
    },
    {
      q: "Does this connect to the Facility Task Automation module?",
      a: "Yes — a complaint that turns into maintenance work can be handed off to a technician the same way a scheduled task is, so a resident-reported issue and a planned work order share the same execution and audit trail.",
    },
  ],

  ctaHeading: "Ready to route every complaint automatically?",
  ctaBody:
    "Facility and property teams use Firmity's Complaint & Helpdesk Automation to cut resolution time, stay SLA-compliant, and give every ticket a full audit trail.",
}

export default function ComplaintManagementPage() {
  return <ModulePageTemplate config={config} />
}
