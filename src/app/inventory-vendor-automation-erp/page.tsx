"use client"

// ─── Inventory & Vendor Automation ERP (2026-09-16 rebuild) ────────────────
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
// MODULE_FEATURE_CHECKLIST["inventory-management"] in
// src/app/features/page.tsx, grouped into four categories — keep both lists
// in sync if the checklist changes on /features. Hero stats are phrased
// from the module's own existing MODULES_LIST desc language ("automated PO
// generation", "GRN tracking", "aligned with your general ledger"), not new
// figures. The "week in the life" scenario and the FAQ are new original
// content for this rebuild — worth a review pass before/when this page's
// content gets deepened individually.

import { ModulePageTemplate, type ModulePageConfig } from "@/src/components/module-page-template"
import {
  Package,
  Bell,
  ShoppingCart,
  RefreshCw,
  Layers,
  BarChart2,
} from "lucide-react"

const config: ModulePageConfig = {
  slug: "inventory-management",
  moduleNumber: "04",
  category: "Inventory & Vendor Automation ERP",
  hideModuleBadge: true,

  heroHeadline: (
    <>
      Stock that reorders itself.
      <br />
      <em className="not-italic text-[#2b6cb0]">Ledgers that stay aligned.</em>
    </>
  ),
  heroDescription:
    "Inventory & Vendor Automation ERP replaces manual stock registers and disconnected purchase approvals with automated PO generation, GRN tracking, and reorder alerts — keeping stock, vendors, and your general ledger aligned without a separate reconciliation step.",
  heroStats: [
    { value: "Auto-PO", label: "Generated at reorder point" },
    { value: "Real-time", label: "Stock-to-ledger alignment" },
    { value: "Zero", label: "Manual GRN reconciliation" },
  ],
  heroImageAlt: "Firmity Inventory & Vendor Automation ERP dashboard showing stock levels and purchase orders",
  showClientsMarquee: true,

  capabilitiesKicker: "Capabilities",
  capabilitiesHeading: "Everything your inventory and procurement team needs.",
  capabilities: [
    {
      Icon: Package,
      title: "Real-Time Stock Tracking",
      desc: "Monitor every item across all store locations in real time — stock levels update automatically on issue, receipt, or adjustment.",
    },
    {
      Icon: Bell,
      title: "Low Stock and Reorder Alerts",
      desc: "Set minimum stock thresholds per item — automated alerts fire when levels drop below par, eliminating emergency procurement runs.",
    },
    {
      Icon: ShoppingCart,
      title: "Purchase Order Management",
      desc: "Raise, approve, and track purchase orders digitally, linked to vendor quotes, GRNs, and invoice history for full procurement visibility.",
    },
    {
      Icon: RefreshCw,
      title: "Auto Replenishment Rules",
      desc: "Configure automatic PO triggers when stock hits reorder point, with preferred vendors, lead times, and order quantities set per SKU.",
    },
    {
      Icon: Layers,
      title: "Multi-Store and Multi-Site",
      desc: "Manage inventory across multiple stores, buildings, or sites from one dashboard, with an audit trail on every inter-location transfer.",
    },
    {
      Icon: BarChart2,
      title: "Consumption Analytics",
      desc: "Track which items are consumed most, identify wastage patterns, and optimise stock levels using historical demand data.",
    },
  ],

  featureGroupsKicker: "Full Feature Set",
  featureGroupsHeading: "Every field a stock movement needs, grouped the way your team works.",
  featureGroupsIntro:
    "The fields below are the same feature set listed on the Features page, organized here into the four stages inventory actually moves through — catalogue, procurement, movement, and replenishment.",
  featureGroups: [
    {
      title: "Item catalogue & setup",
      blurb: "Every item is registered once with a category, unit, and location — not re-described each time it's ordered or issued.",
      items: [
        "Item Category",
        "Item Lists",
        "Item Details",
        "Barcode/QR Scanning",
        "Multi-location Warehouse Management",
      ],
    },
    {
      title: "Procurement & vendors",
      blurb: "Purchase orders, rate cards, and receipt notes tie back to the vendor record they came from, so procurement history is never a separate spreadsheet.",
      items: [
        "Vendor Management",
        "Rate Card",
        "PO Management",
        "GRN (Goods Receipt Note)",
        "Vendor Performance Rating",
      ],
    },
    {
      title: "Stock movement & control",
      blurb: "Every issue, requisition, and handover updates the same ledger, with approval workflows gating anything that needs sign-off first.",
      items: [
        "Stock In/Out",
        "Stock Tracking",
        "Stock Ledger",
        "Item Requisition",
        "Item Handover",
        "Approval Workflows",
      ],
    },
    {
      title: "Replenishment & audit",
      blurb: "Reorder rules and scheduled audits keep stock levels honest without a manual physical count driving every decision.",
      items: [
        "Low Stock Alerts",
        "Reorder Level Management",
        "Stock Audit & Reconciliation",
        "Paperless Operations",
        "Export to Excel Sheets",
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
  scenarioHeading: "What a week with Inventory & Vendor Automation ERP actually looks like.",
  scenarioIntro:
    "Original walkthrough for this rebuild — no new numbers, just the day-to-day sequence the capabilities above add up to.",
  scenarioBeats: [
    {
      time: "Monday",
      title: "A technician issues a spare",
      desc: "An HVAC filter is issued against a work order from the store. The stock ledger updates automatically — no separate stock register to update by hand.",
    },
    {
      time: "Tuesday",
      title: "A reorder alert fires",
      desc: "Filter stock drops below its set minimum. A purchase order drafts automatically against the preferred vendor and lead time already configured for that item.",
    },
    {
      time: "Wednesday",
      title: "A PO gets approved",
      desc: "The draft PO routes through its approval workflow before release — no forwarding an email chain to get sign-off.",
    },
    {
      time: "Thursday",
      title: "A delivery arrives and reconciles itself",
      desc: "A GRN is raised against the incoming delivery. Quantities and rates reconcile against the PO automatically, flagging any mismatch immediately.",
    },
    {
      time: "Friday",
      title: "A stock audit closes clean",
      desc: "A scheduled stock audit compares physical counts against the ledger. Consumption analytics already explain most of the week's movement, so reconciliation is fast.",
    },
  ],

  relatedSlugs: ["preventive-maintenance", "asset-management", "facility-expense-management"],

  faqHeading: "FAQ",
  faqIntro: "Quick answers to what teams evaluating Inventory & Vendor Automation ERP ask most.",
  faqs: [
    {
      q: "How does a purchase order get triggered automatically?",
      a: "Each item can carry its own reorder point, preferred vendor, and lead time. When stock drops to that threshold, a draft PO is raised automatically against the configured vendor, ready for approval rather than manual creation.",
    },
    {
      q: "Can we manage inventory across multiple sites separately?",
      a: "Yes — multi-store and multi-site management is a core part of the module, so stock can be tracked per location or viewed consolidated across all of them, with a full audit trail on transfers between sites.",
    },
    {
      q: "What happens when a delivery doesn't match the purchase order?",
      a: "The GRN process compares received quantities and rates against the original PO and flags any mismatch immediately, rather than surfacing the discrepancy only when the vendor invoice arrives.",
    },
    {
      q: "Does this replace our spreadsheet-based stock register?",
      a: "Yes — every issue, receipt, and adjustment updates one live stock ledger automatically, so there's no separate spreadsheet to keep in sync with what's actually on the shelf.",
    },
    {
      q: "Can we track vendor performance over time?",
      a: "Yes — vendor performance rating tracks delivery timeliness and quality against POs raised, so procurement decisions can be based on a vendor's actual track record rather than memory.",
    },
  ],

  ctaHeading: "Ready to stop reconciling stock by hand?",
  ctaBody:
    "Facility and procurement teams use Firmity's Inventory & Vendor Automation ERP to cut emergency procurement, keep vendor records clean, and stay aligned with the general ledger.",
}

export default function InventoryManagementPage() {
  return <ModulePageTemplate config={config} />
}
