import type { ModuleStoryContent } from "./types"

// NOTE FOR EDITORS: the client feature listing describes the Expense Master, the
// Expense Type Master, an expense report and the dashboard's Top 5 widgets. It does
// NOT mention budget limits, breach alerts or approval steps on expenses, which
// earlier versions of this page claimed. They are left out until confirmed.

export const facilityExpenseStory: ModuleStoryContent = {
  path: "/facility-expense-automation-erp",
  h1: "Facility expense management: record, classify and report what you spend",
  lede: [
    "Facility spending is a lot of small things: cleaning consumables, diesel, petrol, repairs. Firmity lets you record each expense against a type and sub-type you define, and then shows the biggest items for any period you choose.",
  ],
  sections: [
    {
      heading: "Where facility spend hides",
      paragraphs: [
        "Small purchases get made on site, written down later and filed under whatever name the person entering them preferred. Diesel is \"fuel\" in one month and \"DG\" in the next. Nobody can say what cleaning really cost, because it's spread over five headings.",
      ],
    },
    {
      heading: "Types and sub-types you control",
      paragraphs: [
        "The expense type master is where you define the headings. Create an expense type and give it as many sub-types as you need, then edit, delete and search them. Because everyone picks from the same list, the same cost is always called the same thing.",
      ],
    },
    {
      heading: "Recording an expense",
      paragraphs: [
        "Each expense record carries its type and sub-type, a date range, a debit or credit amount and a description. Records can be viewed, edited and deleted.",
      ],
    },
    {
      heading: "Reading it",
      paragraphs: [
        "There is an expense report, and the executive dashboard shows the Top 5 Expenses for the period, such as cleaning consumables, diesel and petrol. It also shows the Top 5 Debits and Top 5 Credits side by side, so an unusual outgoing or incoming amount stands out.",
        "Every widget on the dashboard follows one date filter, Today, Week, Month, Year or a custom range, so the figures all describe the same period. Access is role-based, so you control who sees portfolio-wide figures and who sees a single property.",
      ],
    },
    {
      heading: "What it does not try to be",
      paragraphs: [
        "Expenses here are about recording, classifying and reporting. Stock purchases have their own trail in the inventory module, with requisitions, purchase orders, receipts and a ledger. If you need budget limits or approval steps on general expenses, tell us what you need and we'll say plainly whether it is supported.",
      ],
    },
  ],
  faqs: [
    {
      q: "Can we create our own expense categories?",
      a: "Yes. You create expense types and configure as many sub-types under each as you need.",
    },
    {
      q: "Can I see my biggest costs at a glance?",
      a: "Yes. The executive dashboard shows the Top 5 Expenses, Top 5 Debits and Top 5 Credits for the period you select.",
    },
    {
      q: "Can I look at a month, a year or a custom period?",
      a: "Yes. One date filter, Today, Week, Month, Year or a custom range, applies to every dashboard widget.",
    },
    {
      q: "Does it enforce budgets or approvals on expenses?",
      a: "The expense module records, classifies and reports. Purchase orders in the inventory module do have an approval step. If you need limits or approvals on other expenses, ask us and we'll tell you honestly what is supported.",
    },
    {
      q: "Who can see expense figures?",
      a: "Access is role-based, which controls who can view portfolio-wide figures and who sees a single property.",
    },
  ],
  related: [
    { href: "/inventory-vendor-automation-erp", label: "Inventory and vendors", why: "covers stock purchasing with purchase orders and receipts." },
    { href: "/payroll-automation-erp", label: "Payroll", why: "is where staff costs are managed." },
    { href: "/assets-spares-automation", label: "Assets and spares", why: "tracks asset value and service for the equipment you spend on." },
  ],
}
