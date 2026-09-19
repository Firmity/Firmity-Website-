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
}
