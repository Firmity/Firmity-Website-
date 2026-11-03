"use client"

// ─── Visitor Management Automation (2026-09-16 rebuild) ────────────────────
// Replaces the old hand-rolled page with the shared ModulePageTemplate —
// same treatment as every other module page rebuild this pass (per request:
// "do to every page what we did to the Facility Task Automation page").
// "use client" required — see the note in facility-task-automation/page.tsx
// for why a Server Component can't pass lucide-react Icon components as
// config data into ModulePageTemplate ("use client").
//
// Content sourcing: capability titles/descriptions are carried over from the
// old page's own capability cards, restructured into this template's
// sections. The feature checklist is copied verbatim from
// MODULE_FEATURE_CHECKLIST["visitor-management"] in
// src/app/features/page.tsx (14 items — shorter than most modules, so the
// four feature groups below are uneven in size rather than padded), grouped
// into four categories — keep both lists in sync if the checklist changes
// on /features. Hero stats are phrased from the module's own existing
// MODULES_LIST desc language ("contactless QR check-ins", "instant host
// alerts", "occupancy tracking"), not new figures. The "week in the life"
// scenario and the FAQ are new original content for this rebuild — worth a
// review pass before/when this page's content gets deepened individually.

import { ModulePageTemplate, type ModulePageConfig } from "@/src/components/module-page-template"
import {
  QrCode,
  Smartphone,
  Shield,
  Eye,
  Bell,
  BarChart2,
} from "lucide-react"

const config: ModulePageConfig = {
  slug: "visitor-management",
  moduleNumber: "05",
  category: "Visitor Management Automation",
  hideModuleBadge: true,

  heroHeadline: (
    <>
      No queues at the gate.
      <br />
      <em className="not-italic text-[#2b6cb0]">No gaps in the log.</em>
    </>
  ),
  heroDescription:
    "Visitor Management Automation replaces paper registers and intercom calls with contactless QR check-ins and pre-approved gate passes — hosts get instant alerts, security gets live occupancy tracking, and every entry stays logged.",
  heroStats: [
    { value: "Contactless", label: "QR check-in and check-out" },
    { value: "Instant", label: "Host notification on arrival" },
    { value: "Real-time", label: "Occupancy tracking" },
  ],
  heroImageAlt: "Firmity Visitor Management Automation dashboard showing live visitor check-ins and occupancy",
  showClientsMarquee: true,

  capabilitiesKicker: "Capabilities",
  capabilitiesHeading: "Everything your front desk and security team needs.",
  capabilities: [
    {
      Icon: QrCode,
      title: "Digital Pre-Registration",
      desc: "Hosts send a pre-registration link to expected visitors — a QR pass is issued before arrival, so there's no paperwork at the gate and zero queues.",
    },
    {
      Icon: Smartphone,
      title: "Mobile Check-In and Check-Out",
      desc: "Visitors scan their QR pass on arrival, the guard verifies digitally and logs entry in real time, and exit is recorded on departure.",
    },
    {
      Icon: Shield,
      title: "Host Notification and Approval",
      desc: "Hosts receive instant notifications when their visitor arrives, with one-tap approval or rejection from mobile — no intercom hunting.",
    },
    {
      Icon: Eye,
      title: "Live Visitor Dashboard",
      desc: "Security and facility managers see every visitor currently inside — name, host, purpose, entry time, and expected exit.",
    },
    {
      Icon: Bell,
      title: "Overstay and Blacklist Alerts",
      desc: "Get notified when a visitor exceeds their permitted duration, and block-listed individuals are flagged automatically at check-in.",
    },
    {
      Icon: BarChart2,
      title: "Visitor Analytics and Reports",
      desc: "Track visitor volumes by day, zone, host, and purpose — generate compliance reports and occupancy data for management.",
    },
  ],

  featureGroupsKicker: "Full Feature Set",
  featureGroupsHeading: "Every field a visit needs, grouped the way your team works.",
  featureGroupsIntro:
    "The fields below are the same feature set listed on the Features page, organized here into the four areas a visit actually moves through — entry, approval, on-site tracking, and security.",
  featureGroups: [
    {
      title: "Entry & registration",
      blurb: "A visit is registered once — by QR, login, or pre-approval — so the gate is a scan, not a form to fill out on arrival.",
      items: [
        "QR-based Entry",
        "Login-based Entry",
        "Pre-approved Passes",
        "Visitor Details Capture",
        "Multi-gate/location Support",
      ],
    },
    {
      title: "Approval & host alerts",
      blurb: "A host's approval and an emergency alert reach the right person the same way — instantly, on mobile, without a middle step.",
      items: [
        "Visitor Approval Hierarchy",
        "Visitor and Approval Alerts",
        "Emergency/SOS Alerts",
      ],
    },
    {
      title: "On-site management",
      blurb: "Frequent visitors, delivery staff, and delisted individuals are each handled by their own rule set, not one generic visitor flow.",
      items: [
        "Check-in/out Time Logging",
        "Frequent Visitor List",
        "Visitor Delisting",
        "Delivery Management",
      ],
    },
    {
      title: "Security & reporting",
      blurb: "Every visit is encrypted end-to-end and stays in a searchable history — a compliance report is a query, not a logbook search.",
      items: [
        "End-to-End Data Encryption",
        "Visitor History & Reports",
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
  scenarioHeading: "What a week with Visitor Management Automation actually looks like.",
  scenarioIntro:
    "Original walkthrough for this rebuild — no new numbers, just the day-to-day sequence the capabilities above add up to.",
  scenarioBeats: [
    {
      time: "Monday",
      title: "A meeting guest is pre-registered",
      desc: "A host sends a pre-registration link the night before. The visitor arrives Monday morning, scans their QR pass, and is through the gate in seconds.",
    },
    {
      time: "Tuesday",
      title: "A walk-in vendor gets approved on the spot",
      desc: "An unscheduled contractor arrives. The guard logs them at the gate, the host gets an instant notification, and approves entry with one tap from their phone.",
    },
    {
      time: "Wednesday",
      title: "A delivery is logged without disturbing anyone",
      desc: "A courier drops a package under delivery management — restricted to the goods entry zone, with no host approval needed for a routine delivery.",
    },
    {
      time: "Thursday",
      title: "An overstay alert fires",
      desc: "A visitor is still on-site well past their permitted window. Security gets an automatic alert instead of discovering it during a manual walkthrough.",
    },
    {
      time: "Friday",
      title: "The week's compliance report takes one click",
      desc: "The visitor analytics dashboard exports the week's volumes by host and purpose — ready for a compliance review without compiling a logbook by hand.",
    },
  ],

  relatedSlugs: ["staff-attendance", "complaint-management", "preventive-maintenance"],

  faqHeading: "FAQ",
  faqIntro: "Quick answers to what teams evaluating Visitor Management Automation ask most.",
  faqs: [
    {
      q: "Do visitors need to install an app?",
      a: "No — a visitor scans a QR pass sent via a pre-registration link, or is logged as a walk-in by security. No app install or account is required on the visitor's side.",
    },
    {
      q: "How does host approval work for walk-in visitors?",
      a: "A guard logs the walk-in visitor's details at the gate, which sends an instant notification to the host. The host approves or rejects entry with one tap from their mobile — no intercom call needed.",
    },
    {
      q: "Can we block specific individuals from entering?",
      a: "Yes — blacklisted individuals are flagged automatically at check-in against the delisting record, so a previously delisted visitor is caught before being let through.",
    },
    {
      q: "Is visitor data secure?",
      a: "Visitor details are protected with end-to-end data encryption, and the live visitor dashboard is restricted to authorized security and facility management staff.",
    },
    {
      q: "Can we support multiple gates or entry points?",
      a: "Yes — multi-gate and multi-location support is built in, so a facility with several entry points can manage all of them from one visitor log and dashboard.",
    },
  ],

  ctaHeading: "Ready to clear the gate queue for good?",
  ctaBody:
    "Facility and security teams use Firmity's Visitor Management Automation to eliminate paper logbooks, speed up check-ins, and keep a complete, encrypted visitor record.",
}

export default function VisitorManagementPage() {
  return <ModulePageTemplate config={config} />
}
