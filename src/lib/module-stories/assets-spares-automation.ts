import type { ModuleStoryContent } from "./types"

export const assetsSparesStory: ModuleStoryContent = {
  path: "/assets-spares-automation",
  h1: "Asset management for facilities: every asset, its history and its next service",
  lede: [
    "Firmity keeps one record for each asset: what it is, where it is, who made it, what it cost, when it was last serviced, when its warranty and AMC end, and everything that has happened to it since. Spare parts have their own records, linked to the asset they belong to.",
    "A QR code on the asset opens that record for the people who are allowed to see it.",
  ],
  sections: [
    {
      heading: "The spreadsheet problem",
      paragraphs: [
        "An asset register in Excel usually holds the purchase cost and the location. The warranty card is in a drawer, the AMC contract is in someone's inbox, and the last service date is whatever the last person typed. When a pump has been rebuilt for the third time, nobody sees the pattern, because the history is spread over five places.",
      ],
    },
    {
      heading: "One asset, one record",
      paragraphs: [
        "Each asset gets a unique ID and a record with its name, description, category, manufacturer, model, location, status, image, value and date of purchase. Status can be active, inactive, servicing or another state you configure. Assets are marked as movable or non-movable and rentable or not.",
        "Documents stay with the asset: the invoice, warranty card, AMC contract, rental contract and anything else you attach. You can search by name or ID, filter, and export.",
      ],
    },
    {
      heading: "Scan the asset",
      paragraphs: [
        "Every asset can have a QR code that you generate and download, then stick on the equipment. Scanning it opens the asset record: its details, service and warranty information, documents, history and related actionable items.",
        "The sticker is not the key. What a person sees after scanning depends on their role. A facility manager or supervisor with the right access sees the record. A guest or a passer-by who scans the code doesn't get the asset's information.",
      ],
    },
    {
      heading: "Service dates that don't depend on memory",
      paragraphs: [
        "Each asset carries its last service, next service and due date, with reminders and a status. A dedicated view lists assets whose service is overdue, with the asset ID, name, due date and available actions, and overdue assets also appear in notifications.",
        "Assets link to your maintenance schedules. One asset can have several PPM tasks, and one task can cover several assets. When a checklist item fails on an asset-linked task, it becomes an actionable item that stays linked to that asset, and its resolution is written into the asset's history.",
      ],
    },
    {
      heading: "Where it is, and who has it",
      paragraphs: [
        "Every asset has a location, and assets can sit across different properties. You can transfer an asset between locations or properties and track the dispatch, the destination and the status of the transfer. Check-in and check-out record issue and return, with a history of each movement.",
        "Rented assets have their own section with rental status, location, expiry, vendor and lease details. When you rent an asset out, Firmity records the assignee, the destination property, the charges, the security deposit, the dates, who approved it and the rental contract, and keeps the rental history.",
      ],
    },
    {
      heading: "History that stays",
      paragraphs: [
        "The record keeps the asset's whole life: services, actionable issues and how they were resolved, movements, check-ins and check-outs and rentals. Clients get 15 years of asset and spare-part history. You can open it from the asset record without losing earlier entries.",
      ],
    },
    {
      heading: "Spare parts, linked to the assets they serve",
      paragraphs: [
        "Spare parts are managed in a separate master. Each one has an ID, name, type, serial number, vendor, quantity, status, purchase date, expiry date and value, and it can be associated with an asset. A part can sit under a chain such as inverter, motor, spare part 238, so you can tell what a spare belongs to.",
        "Spare parts have their own QR codes, separate from the asset's. Quantity, status, vendor and expiry are tracked per part, and parts approaching expiry can be identified. Like assets, spare parts carry 15 years of history.",
      ],
    },
  ],
  faqs: [
    {
      q: "Does scanning an asset's QR code show its details to anyone?",
      a: "No. Access follows the role and rights model. Authorised users such as a facility manager or supervisor can open the record. Guests and random users cannot see protected asset information just by scanning.",
    },
    {
      q: "Can we track warranty and AMC dates?",
      a: "Yes. Warranty dates, expiry, documents and the warranty card, and AMC details, contracts, coverage and history, are held against the asset. Service due dates generate reminders and an overdue view.",
    },
    {
      q: "Can spare parts be tracked on their own?",
      a: "Yes. Spare parts have their own master, QR codes, quantity, status and expiry. They can be linked to an asset while still being tracked independently.",
    },
    {
      q: "Can we manage rented-in and rented-out assets?",
      a: "Yes. There is a section for rented assets with lease and expiry details, and a rent-out record covering the assignee, charges, deposit, dates, approver, contract and return.",
    },
    {
      q: "How long is the history kept?",
      a: "Clients get 15 years of asset history and 15 years of spare-part history.",
    },
  ],
  related: [
    { href: "/facility-task-automation", label: "Facility task automation", why: "schedules the PPM and checklists that build each asset's history." },
    { href: "/inventory-vendor-automation-erp", label: "Inventory and vendors", why: "covers purchasing and stock for the materials you use." },
    { href: "/complaint-helpdesk-automation", label: "Complaints and helpdesk", why: "is where breakdowns get reported and resolved." },
  ],
}
