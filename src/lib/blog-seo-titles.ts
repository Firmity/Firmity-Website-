// Search-friendly <title>/social titles for blog posts whose headline is too
// long to show in full in results. The root layout appends " | Firmity", so keep
// each value at roughly 50 characters or fewer. The on-page H1 and the
// BlogPosting `headline` stay the full post title; posts without an entry use
// their own title.
export const BLOG_SEO_TITLES: Record<string, string> = {
  "45-essential-facility-management-maintenance-acronyms-every-facility-manager":
    "45 Facility Management & Maintenance Acronyms",
  "the-hidden-cost-of-reactive-maintenance": "The Hidden Cost of Reactive Maintenance",
  "the-evolution-of-cmms-from-maintenance-software-to-operational-intelligence":
    "The Evolution of CMMS: Software to Intelligence",
  "why-reactive-maintenance-is-costing-your-business-more-than-you-think":
    "Why Reactive Maintenance Costs More Than You Think",
  "monsoon-readiness-checklist-for-facility-managers-in-india":
    "Monsoon Readiness Checklist for Facility Managers",
  "spreadsheets-to-cmms": "Why Your Facility Team Still Runs on Spreadsheets",
  "mobile-first-technician-adoption": "The CMMS Nobody Uses Is an Expensive Spreadsheet",

  // Added 2026-11-03 (SEO audit): every post below had a <title> over 60 characters,
  // which Google truncates. Blog titles do not get the " | Firmity" suffix, so each
  // value here is the whole title, kept under ~58 characters. The H1 and BlogPosting
  // headline stay the full post title.
  "erpnext-alternatives": "7 Best ERPNext Alternatives for Inventory in 2026",
  "types-of-inventory-management-systems": "Types of Inventory Management Systems Explained",
  "maintainx-alternatives": "7 Best MaintainX Alternatives & Competitors (2026)",
  "what-is-cafm-software": "What Is CAFM Software? A Guide for Facility Managers",
  "what-is-inventory-management-software": "What Is Inventory Management Software? Complete Guide",
  "employee-management-software": "8 Best Employee Management Software in 2026 (India)",
  "asset-management-software-vs-spreadsheets": "Asset Management Software vs Spreadsheets Compared",
  "what-is-cmms-software": "What Is CMMS Software? Computerized Maintenance Explained",
  "zoho-inventory-alternatives": "Zoho Inventory Alternatives: Best Inventory Software",
  "peoplestrong-alternatives": "4 Best PeopleStrong Alternatives in 2026 (India)",
  "zoho-creator-alternatives": "7 Best Zoho Creator Alternatives in 2026 (India)",
  "pocket-hrms-alternatives": "7 Best Pocket HRMS Alternatives in 2026 (India)",
  "tallyprime-alternatives": "7 Best TallyPrime Alternatives in 2026 (India)",
  "cmms-for-healthcare": "7 Top CMMS for Healthcare in 2026 (Hospitals, Clinics)",
  "zoho-payroll-alternatives": "Zoho Payroll Alternatives: 7 Best Payroll Software",
  "keka-alternatives": "Keka Alternatives in India: Best Payroll Software",
  "benefits-of-asset-management-software": "Benefits of Asset Management Software: 10 Ways",
  "how-cmms-work": "How Does a CMMS Work? Guide for Indian Facility Teams",
  "factohr-alternatives": "7 Best factoHR Alternatives in 2026 (India)",
  "vyapar-alternatives": "7 Best Vyapar Alternatives in 2026 (India)",
  "types-of-asset-management-software": "Types of Asset Management Software: 7 Kinds",
  "what-is-asset-management-software": "What Is Asset Management Software? A Simple Guide",
  "benefits-of-inventory-management-software": "11 Benefits of Inventory Management Software (India)",
  "what-is-payroll-software": "What Is Payroll Software? A Complete Guide (India)",
  "best-complaint-management-software": "Best Complaint Management Software: Top 11 Tools",
  "best-payroll-management-software": "Best Payroll Management Software in India",
  "best-cmms-software": "10 Best CMMS Software in 2026 (Compared for India)",
}
