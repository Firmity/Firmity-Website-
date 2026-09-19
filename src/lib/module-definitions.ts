// Self-contained "What is X?" passages for each module page — the block AI
// answer engines and search snippets can lift verbatim. Keyed by the module's
// config slug (ModulePageConfig.slug), NOT its URL. Each body is kept at
// 134–167 words: a complete, standalone definition that doesn't depend on the
// surrounding page. Only claims already made elsewhere on the site.

export interface ModuleDefinition {
  heading: string
  body: string
}

export const MODULE_DEFINITIONS: Record<string, ModuleDefinition> = {
  "preventive-maintenance": {
    heading: "What is Facility Task Automation?",
    body: "Facility Task Automation is Firmity's planned preventive maintenance module. It lets facility teams create recurring tasks with custom frequencies, assign them to technicians and track every task from schedule to sign-off in one system, instead of spreadsheets, whiteboards and WhatsApp reminders. Each task can carry a digital checklist, before and after photos, a priority, a location and remarks, and QR tagging lets a technician open the right task by scanning the equipment. Automated triggers create work orders on schedule and send real-time status updates, so supervisors no longer chase follow-ups by hand. Every completed task leaves a timestamped record, which builds an audit-ready history that managers can filter and export. Because Firmity is one connected platform, the module shares live data with the asset, complaint, inventory and workforce modules rather than keeping its own copy. It is used for buildings, campuses, plants and residential communities.",
  },
  "asset-management": {
    heading: "What is Assets & Spares Automation?",
    body: "Assets & Spares Automation is Firmity's asset lifecycle and spare-parts management module. It keeps a digital registry of every piece of equipment, including photos, specifications, manufacturer, model, warranty, AMC contract, documentation and location, and gives each asset a QR tag. A technician who scans the tag sees the asset's history, maintenance logs, warranty cards and contracts immediately, without searching folders or asking colleagues. Maintenance schedules trigger automatically, and alerts warn the team before AMC renewals and warranty expiry dates, so contracts are not missed. The module also tracks spares, links them to the assets they serve, records check-in and check-out, supports asset renting, and keeps service history for up to fifteen years. The goal is higher equipment uptime and a lower total cost of ownership, because decisions about repair, service or replacement rest on a complete record instead of memory.",
  },
  "complaint-management": {
    heading: "What is Complaint & Helpdesk Automation?",
    body: "Complaint & Helpdesk Automation is Firmity's QR-powered ticketing module for facility issues. Building occupants scan a QR code placed at the location, describe the problem and attach photos, and the ticket is created with that location already attached. Firmity routes each ticket automatically to the concerned technician, tracks its status and priority, and shows live status boards so managers can see what is open, overdue or resolved. Service-level agreement and turnaround-time tracking, an escalation matrix and notifications keep tickets moving, while every action is written to an audit trail from report to resolution. Requesters can rate the fix, reopen a ticket that was not resolved, and review comments and history. The module replaces WhatsApp complaints and lost front-desk notes so that no issue is dropped between reporting and resolution, and it feeds analytics dashboards that show recurring problem areas across a site.",
  },
  "inventory-management": {
    heading: "What is Inventory & Vendor Automation ERP?",
    body: "Inventory & Vendor Automation ERP is Firmity's stock, purchasing and vendor management module, built to connect maintenance work with back-office finance. It maintains item categories and lists, rate cards, vendor records and performance ratings, and stock across multiple warehouse locations. Purchase orders are generated automatically, goods are received against Goods Receipt Notes (GRN), and stock in, stock out and a stock ledger show where every item is. Reorder levels and low-stock alerts warn the team before a critical spare runs out, and requisition and handover steps run through approval workflows. Because the module keeps stock, materials and vendors aligned with the general ledger, finance does not need a separate reconciliation step. Barcode and QR scanning speeds up counting, and stock audit and reconciliation tools support periodic checks. The result is fewer emergency purchases, cleaner vendor records and one financially accurate view of inventory.",
  },
  "visitor-management": {
    heading: "What is Visitor Management Automation?",
    body: "Visitor Management Automation is Firmity's gate and visitor-entry module. It replaces paper registers and intercom calls with contactless QR check-ins and digital gate passes. Guests, contractors and deliveries can be pre-approved before they arrive, which removes queues at the gate, or scanned on arrival for instant photo verification. The host receives an automatic notification and can approve or reject the entry through an approval hierarchy. Security teams see live occupancy, receive overstay alerts and keep a digital logbook of every visit, including check-in and check-out times and visitor details. Temporary guest passes and permanent vendor credentials are both supported, along with frequent-visitor lists, delivery management and emergency or SOS alerts. Visitor data is protected with end-to-end encryption, and the module works across multiple gates and locations, so a campus, plant or residential society can manage every entrance from one system.",
  },
  "staff-attendance": {
    heading: "What is Employee Management Automation?",
    body: "Employee Management Automation is Firmity's workforce and attendance module. It records attendance with touchless, geo-fenced facial recognition, so an employee can only punch in from the assigned site and one person cannot mark attendance for another. Managers see real-time site presence across locations, while shift management, a holiday calendar and working-hour and overtime calculations run automatically. Employees request leave digitally under configurable leave policies and types, and approvers respond inside the system. Digital onboarding captures employee details and documents, and an employee self-service app gives staff access to their own records. Attendance and working hours flow into instant payroll-ready exports, which removes manual muster rolls and re-keying of data. Reports and analytics summarise attendance across all sites, so facility and HR managers can see coverage and absences in one place. The module is designed for organisations that run multiple locations and need a single, reliable record of who was present, where and for how long.",
  },
  "payroll-management": {
    heading: "What is Payroll Automation ERP?",
    body: "Payroll Automation ERP is Firmity's payroll and statutory compliance module for organisations that pay staff across several sites or clients. It runs a full payroll cycle in one execution: gross-to-net calculation, overtime, custom allowance structures and statutory deductions including TDS, PF, ESI and PT, with loan and advance handling and automatic EMI scheduling. Attendance is imported each month, and salaries are generated, frozen and locked with maker-checker validation and a multi-tier approval workflow. The module produces digital payslips, bank transfer files, wage registers, deduction reports, full-and-final settlements and Form 16s, and posts entries to the general ledger. Salary hold and release controls and audit reports give finance teams traceability for every run. By replacing manual salary sheets and scattered compliance tracking, Payroll Automation ERP is designed to keep statutory compliance intact and to prevent financial leakage between HR, operations and accounts.",
  },
  "facility-expense-management": {
    heading: "What is Facility Expense Automation ERP?",
    body: "Facility Expense Automation ERP is Firmity's expense and budget control module for facility operations. Teams attach bills as PDFs, categorise each expense and track spending by cost centre, location or property in one central dashboard. Category-wise budget caps and policy rules are enforced automatically, so a budget breach triggers an alert before the money is spent rather than after the month closes. Expenses move through maker-checker approval workflows, vendor claims and travel advances are handled in the same system, and recurring expenses are scheduled instead of re-entered every month. Every payment and approval is written to an audit trail, and audit-ready journals post directly to the general ledger, which removes the gap between operational spending and the finance books. Expense analytics, trend analysis and exportable reports show where facility costs are rising across multiple properties, so managers can act on the data.",
  },
}

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}
