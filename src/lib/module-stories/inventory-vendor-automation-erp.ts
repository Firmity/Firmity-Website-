import type { ModuleStoryContent } from "./types"

export const inventoryVendorStory: ModuleStoryContent = {
  path: "/inventory-vendor-automation-erp",
  h1: "Inventory and vendor management for facility teams, from requisition to stock",
  lede: [
    "From a supervisor asking for material, to a vendor delivering it, to the item reaching the store, every step is recorded in one place. Stock is watched against the minimum you set for each item, and a ledger shows every movement.",
    "It covers one property or a whole portfolio.",
  ],
  sections: [
    {
      heading: "Where stock registers fall behind",
      paragraphs: [
        "A stock register falls behind in small ways. An item is issued but not entered. A delivery arrives in two parts and the second part is never booked. The vendor's price changed and the old rate is still on file. The first sign of any of this is usually a stock-out.",
      ],
    },
    {
      heading: "From requirement to stock",
      steps: [
        "A supervisor or admin spots a need at the property and raises a requisition for the item and quantity.",
        "Firmity checks the requisition against stock in hand and shows the pending quantity.",
        "An authorised approver approves it, sends it back to be re-raised, or rejects it.",
        "On approval, a purchase order is raised from the vendor's active rate card, and the PO goes through its own approval, Pending Approval to Approved or Rejected.",
        "The vendor supplies the items, and a goods receipt note (GRN) is created against the PO. Full or partial receipts are both recorded.",
        "Received quantity updates stock automatically, and every movement is written to the stock ledger.",
        "Stock can be distributed from central inventory to stores, properties or locations.",
        "When an item falls below its minimum, a low-stock alert prompts the next requisition or PO.",
      ],
    },
    {
      heading: "Items and specifications",
      paragraphs: [
        "Items sit in categories and sub-categories and can be searched by name. Each item has a specification such as colour, size, type or gender, so \"shirt, red, size 40, male\" is one clear line wherever it appears in a requisition, an order or a distribution. You set the minimum stock for each item once, and Firmity uses it to flag low stock.",
      ],
    },
    {
      heading: "Vendors and rate cards",
      paragraphs: [
        "Rate cards are kept per vendor on a contract basis with a validity period. Purchase orders use the rates on the card, and when a contract's validity ends, the rate card has to be renewed or updated.",
        "Each approved vendor has a full profile: contact person, phone, email, bank name, account number, IFSC, GST and PAN numbers, address and website. PAN, GST certificate and brochure are attached and can be opened when needed.",
      ],
    },
    {
      heading: "Purchase orders",
      paragraphs: [
        "The purchase order list shows totals for all orders, pending approval, approved and rejected. Authorised users can approve or reject from the list. Creating a PO shows every rate-card item across approved vendors, with base price, GST and rate per unit, ready to select.",
        "Processed orders show how much has been received against what was ordered, as a percentage. POs can be searched by number or vendor, printed and exported.",
      ],
    },
    {
      heading: "Receiving goods",
      paragraphs: [
        "A GRN is raised against a specific PO, with the site and the person who received the goods. For every item it shows PO quantity, previously received, pending and received now, so one order can arrive over several deliveries. The GRN list marks a receipt OK once it is complete and Pending Receipt while quantity is outstanding.",
        "Stock received this way is tagged with its source, so any unit in hand can be traced to the delivery it came on.",
      ],
    },
    {
      heading: "Stock, the ledger and reports",
      paragraphs: [
        "The stock screen shows on-hand quantity against the minimum for every item, for example 17 in hand against a minimum of 30, and flags each as In Stock or Low Stock. You can add quantity by hand or upload it in bulk from an Excel sheet using the format you download.",
        "The stock ledger records every receipt, issue and adjustment in order, with brand, unit, minimum, stock-in, requisitioned and handed-over quantities and a running balance, and it is searchable. A Stock Items report compares requisitioned and handed-over quantities over any date range, keeps a history for each line, and exports to Excel or PDF.",
        "The requisition screen also lists your most frequently requested items, each with a one-click re-raise for demands that repeat.",
      ],
    },
  ],
  faqs: [
    {
      q: "Can one purchase order be received in several deliveries?",
      a: "Yes. A GRN records PO quantity, quantity previously received, pending and quantity received now, so partial deliveries are tracked until the order is complete.",
    },
    {
      q: "Can we load stock from Excel?",
      a: "Yes. You can download a format, fill it in and upload it, or add quantity item by item.",
    },
    {
      q: "How do we know what is running low?",
      a: "Each item has a minimum quantity. When stock falls below it, the item shows as Low Stock and an alert is raised.",
    },
    {
      q: "Can several properties use one inventory?",
      a: "Yes. Item distribution moves stock from a central inventory to stores, properties or locations, and the ledger records each movement.",
    },
    {
      q: "Are vendor documents stored?",
      a: "Yes. PAN, GST certificate and brochure are stored against the vendor, alongside bank and tax details.",
    },
  ],
  related: [
    { href: "/assets-spares-automation", label: "Assets and spares", why: "tracks spare parts against the assets that use them." },
    { href: "/facility-expense-automation-erp", label: "Facility expenses", why: "is where other spending is recorded and reported." },
    { href: "/facility-task-automation", label: "Facility task automation", why: "schedules the maintenance work that uses the stock." },
  ],
}
