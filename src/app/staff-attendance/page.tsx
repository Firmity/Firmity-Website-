"use client"

// ─── Employee Management Automation (2026-09-16 rebuild) ───────────────────
// Replaces the old hand-rolled page with the shared ModulePageTemplate —
// same treatment as every other module page rebuild this pass (per request:
// "do to every page what we did to the Facility Task Automation page").
// Route stays /staff-attendance (unchanged, matches MODULE_PAGES) even
// though MODULES_LIST titles this module "Employee Management Automation" —
// same pattern as facility-task-automation keeping the "preventive-
// maintenance" slug after its own rename. "use client" required — see the
// note in facility-task-automation/page.tsx for why a Server Component
// can't pass lucide-react Icon components as config data into
// ModulePageTemplate ("use client").
//
// Content sourcing: capability titles/descriptions are carried over from the
// old page's own capability cards, restructured into this template's
// sections. The feature checklist is copied verbatim from
// MODULE_FEATURE_CHECKLIST["staff-attendance"] in src/app/features/page.tsx,
// grouped into four categories — keep both lists in sync if the checklist
// changes on /features. Hero stats are phrased from the module's own
// existing MODULES_LIST desc language ("touchless", "geo-fenced",
// "payroll-ready exports"), not new figures. The "week in the life" scenario
// and the FAQ are new original content for this rebuild — worth a review
// pass before/when this page's content gets deepened individually.

import { ModulePageTemplate, type ModulePageConfig } from "@/src/components/module-page-template"
import {
  Smartphone,
  MapPin,
  Clock,
  Bell,
  Calendar,
  BarChart2,
} from "lucide-react"

const config: ModulePageConfig = {
  slug: "staff-attendance",
  moduleNumber: "06",
  category: "Employee Management Automation",
  hideModuleBadge: true,

  heroHeadline: (
    <>
      Attendance that verifies itself.
      <br />
      <em className="not-italic text-[#2b6cb0]">Payroll that's already ready.</em>
    </>
  ),
  heroDescription:
    "Employee Management Automation replaces buddy-punching and paper muster rolls with touchless, geo-fenced facial-recognition attendance — leave requests, working-hour calculations, and payroll-ready exports, all from one system.",
  heroStats: [
    { value: "Touchless", label: "Facial-recognition check-in" },
    { value: "Geo-fenced", label: "Site presence verification" },
    { value: "Payroll-ready", label: "Attendance exports" },
  ],
  heroImageAlt: "Firmity Employee Management Automation dashboard showing staff attendance and shift status",
  showClientsMarquee: true,

  capabilitiesKicker: "Capabilities",
  capabilitiesHeading: "Everything your workforce management team needs.",
  capabilities: [
    {
      Icon: Smartphone,
      title: "Mobile Check-In and Check-Out",
      desc: "Staff mark attendance via mobile app with GPS verification — supervisors get a live view of who is on-site, on time, and on shift.",
    },
    {
      Icon: MapPin,
      title: "Geo-Fenced Attendance",
      desc: "Restrict check-ins to authorised locations — if a staff member checks in outside the facility perimeter, the system flags it immediately.",
    },
    {
      Icon: Clock,
      title: "Shift and Roster Management",
      desc: "Define shifts, assign rosters, and track adherence in real time, including rotating shifts, night duties, and multi-site assignments.",
    },
    {
      Icon: Bell,
      title: "Late and Absence Alerts",
      desc: "Supervisors receive instant alerts when staff are late or absent, so cover can be arranged before operations are affected.",
    },
    {
      Icon: Calendar,
      title: "Leave and Holiday Management",
      desc: "Staff apply for leave digitally, supervisors approve or reject with one click, and leave balances update automatically against payroll records.",
    },
    {
      Icon: BarChart2,
      title: "Attendance Analytics and Reports",
      desc: "Track punctuality trends, absenteeism patterns, overtime, and compliance across teams — export payroll-ready reports for HR and accounts.",
    },
  ],

  featureGroupsKicker: "Full Feature Set",
  featureGroupsHeading: "Every field a shift needs, grouped the way your team works.",
  featureGroupsIntro:
    "The fields below are the same feature set listed on the Features page, organized here into the four areas workforce management actually moves through — setup, attendance capture, leave and scheduling, and reporting.",
  featureGroups: [
    {
      title: "Employee setup",
      blurb: "An employee is onboarded once with their documents and profile — not re-registered every time a new supervisor needs their details.",
      items: [
        "Digital Employee Onboarding",
        "Documents Management",
        "Employee Self-Service App",
      ],
    },
    {
      title: "Attendance capture",
      blurb: "Facial recognition and geo-verification confirm presence at the actual site, not just a tap on a shared terminal.",
      items: [
        "Facial Recognition Attendance",
        "Attendance Management",
        "Check-in/out Time Logging",
        "Working Hours & OT Tracking",
      ],
    },
    {
      title: "Leave & scheduling",
      blurb: "Leave policies, approvals, and shift rosters are set up once and enforced automatically, rather than negotiated case by case.",
      items: [
        "Leave Policies & Types",
        "Leave Management",
        "Leave Approval",
        "Shift Management",
        "Holiday Calendar",
      ],
    },
    {
      title: "Reporting",
      blurb: "Attendance data exports in a format HR and payroll can use directly, without a manual reformatting step every cycle.",
      items: [
        "Export to Excel Sheets",
        "Reports & Analytics",
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
  scenarioHeading: "What a week with Employee Management Automation actually looks like.",
  scenarioIntro:
    "Original walkthrough for this rebuild — no new numbers, just the day-to-day sequence the capabilities above add up to.",
  scenarioBeats: [
    {
      time: "Monday",
      title: "A new guard is onboarded",
      desc: "A new security guard's profile, documents, and shift assignment are set up once. Facial recognition enrollment takes a few seconds on the mobile app.",
    },
    {
      time: "Tuesday",
      title: "A geo-fence flags a mismatch",
      desc: "A check-in attempt comes from outside the facility perimeter. The system flags it immediately instead of silently accepting it.",
    },
    {
      time: "Wednesday",
      title: "A leave request clears in one click",
      desc: "A housekeeping staff member applies for leave from the self-service app. Their supervisor approves it on mobile, and the leave balance updates automatically.",
    },
    {
      time: "Thursday",
      title: "A late alert reaches the right supervisor",
      desc: "A technician hasn't checked in 20 minutes into their shift. An alert reaches their supervisor immediately, giving time to arrange cover before it affects operations.",
    },
    {
      time: "Friday",
      title: "Payroll-ready data exports itself",
      desc: "The week's attendance, overtime, and leave data export in a format ready to hand straight to payroll — no manual reconciliation between two systems.",
    },
  ],

  relatedSlugs: ["payroll-management", "preventive-maintenance", "complaint-management"],

  faqHeading: "FAQ",
  faqIntro: "Quick answers to what teams evaluating Employee Management Automation ask most.",
  faqs: [
    {
      q: "How does facial-recognition attendance prevent buddy-punching?",
      a: "Attendance is marked against a verified face match at the time of check-in, not a shared badge or PIN, so one employee can't check in on another's behalf.",
    },
    {
      q: "What does geo-fencing actually restrict?",
      a: "A geo-fence defines the authorised area around a site. A check-in attempt from outside that perimeter is flagged immediately, catching a remote or spoofed check-in rather than accepting it silently.",
    },
    {
      q: "Can we run different shift patterns across sites?",
      a: "Yes — shift and roster management supports rotating shifts, night duties, and multi-site assignments, so a guard on a night rotation and an office staff member on a fixed shift both run through the same system.",
    },
    {
      q: "Does attendance feed directly into payroll?",
      a: "Yes — attendance, overtime, and leave data export in a payroll-ready format, and the Payroll Automation ERP module imports this directly rather than requiring a manual re-entry step.",
    },
    {
      q: "Can employees apply for leave without going through a supervisor in person?",
      a: "Yes — the employee self-service app lets staff apply for leave digitally, and a supervisor can approve or reject it remotely with one click.",
    },
  ],

  ctaHeading: "Ready to make attendance a solved problem?",
  ctaBody:
    "Facility and workforce teams use Firmity's Employee Management Automation to eliminate buddy-punching, cut manual payroll reconciliation, and give supervisors a live view of who's on-site.",
}

export default function StaffAttendancePage() {
  return <ModulePageTemplate config={config} />
}
