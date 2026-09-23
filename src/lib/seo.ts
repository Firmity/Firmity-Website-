// ─────────────────────────────────────────────────────────────────────────────
// Central SEO source of truth. ONE place to define every page's title,
// description, keywords + canonical. `buildMetadata(path)` returns a fully-formed
// Next.js Metadata object (canonical + Open Graph + Twitter). Add a new page by
// adding one entry to PAGE_SEO — nothing else to touch.
//
// Why centralised: the old setup inherited a single title/description from the
// root layout, so every page looked identical to Google. This kills that.
// ─────────────────────────────────────────────────────────────────────────────
import type { Metadata } from "next";

export const SITE = {
  name: "Firmity",
  legalName: "UFIRM Technologies (P) Limited",
  // Canonical base — MUST be a single host to avoid duplicate-content splitting.
  // Matches sitemap.ts / robots.ts (www). firmity.in should 301 -> www at the host.
  url: "https://www.firmity.in",
  // OG/Twitter images come from app/opengraph-image.tsx (file convention), which
  // Next.js auto-injects site-wide and inherits into every route — so we do NOT
  // set images manually here (that would duplicate the tag / point at a non-asset).
  twitter: "@firmity", // placeholder — replace when the handle exists
  locale: "en_IN",
} as const;

// Official profiles (same set as the footer). Used for Organization "sameAs" so
// search and AI systems can tie the site to the brand's other presences.
export const SOCIAL_PROFILES = [
  "https://www.linkedin.com/showcase/firmity-software-real-estate/",
  "https://www.youtube.com/@Firmity",
  "https://www.instagram.com/_firmity_/",
  "https://x.com/firmityglobal",
] as const;

export interface PageSeo {
  title: string;        // page <title> (the "%s" in the root template)
  description: string;  // 150–160 chars ideal
  keywords?: string[];
}

// The company's cross-cutting keyword themes (facility management + CMMS,
// India/local, service-lines, AI facility audit). Reused across pages.
// "facility ERP software" / "facility ERP" added 2026-09-05 (per request:
// "make sure the sitemap and seo stuff is updated accordingly. this will
// help us to get featured even if someone searches for erp and not
// necessarily cmms only") — Firmity now has real ERP-framed content
// (inventory & vendor ERP, payroll ERP, facility expense ERP — see
// /features and /inventory-vendor-automation-erp) to back these terms up, sitewide,
// not just on one page.
const BASE_KEYWORDS = [
  "facility management software",
  "CMMS",
  "facility management India",
  "computerised maintenance management system",
  "building management software",
  "AI facility management",
  "facility ERP software",
  "facility ERP",
];

// path (no trailing slash, "/" for home) -> SEO. Only PUBLIC pages belong here.
export const PAGE_SEO: Record<string, PageSeo> = {
  "/": {
    title: "Firmity — Facility Management, CMMS & ERP Software in India",
    description:
      "AI-powered facility management, CMMS & ERP software for India. Automate maintenance, assets, inventory, payroll and compliance with real-time visibility.",
    keywords: [...BASE_KEYWORDS, "facility maintenance software", "FM software India"],
  },
  "/about": {
    title: "About Firmity",
    description:
      "Firmity is built by UFIRM Technologies to give facility teams in India one integrated platform for maintenance, assets and compliance. Our mission and approach.",
    keywords: [...BASE_KEYWORDS, "about Firmity", "UFIRM Technologies"],
  },
  "/features": {
    title: "Features: Facility Management, CMMS & ERP Platform",
    description:
      "Preventive maintenance, assets, complaints, inventory, visitors, attendance, payroll and expenses: every facility workflow in one CMMS and ERP platform.",
    keywords: [...BASE_KEYWORDS, "CMMS features", "facility management features", "payroll ERP", "facility expense ERP", "inventory ERP"],
  },
  "/pricing": {
    title: "Pricing",
    description:
      "Simple, transparent pricing for Firmity's facility management platform. Start with a free facility health survey and scale as your operations grow.",
    keywords: [...BASE_KEYWORDS, "CMMS pricing", "facility software pricing India"],
  },
  "/resources": {
    title: "Resources & Guides",
    description:
      "Guides, playbooks and best practices for facility managers — moving from spreadsheets to CMMS, preventive maintenance, and digitising facility operations.",
    keywords: [...BASE_KEYWORDS, "facility management guides", "CMMS resources"],
  },
  "/blog": {
    title: "Blog — Facility Management Insights",
    description:
      "Insights on facility management, preventive & predictive maintenance, CMMS adoption and multi-site operations from the Firmity team.",
    keywords: [...BASE_KEYWORDS, "facility management blog", "maintenance insights"],
  },
  "/contact": {
    title: "Contact Firmity",
    description:
      "Talk to the Firmity team about your facility. Book a demo or a free AI facility health survey for your building, campus or society in India.",
    keywords: [...BASE_KEYWORDS, "contact Firmity", "book facility demo India"],
  },
  "/facility-survey": {
    title: "Free AI Facility Health Survey",
    description:
      "Book a free AI-powered facility health survey. Firmity audits your building's safety, systems and services and delivers an actionable facility health report.",
    keywords: [...BASE_KEYWORDS, "facility audit India", "facility health survey", "building audit"],
  },
  "/facility-survey/book": {
    title: "Book Your Free Facility Survey",
    description:
      "Book your free on-site AI facility health survey in a few steps — choose your facility type, scope and preferred dates. Get a detailed facility health report.",
    keywords: [...BASE_KEYWORDS, "book facility survey", "facility audit booking"],
  },
  "/facility-task-automation": {
    title: "Facility Task Automation Software",
    description:
      "Automate preventive maintenance schedules, work orders and asset servicing with Firmity's Facility Task Automation to cut breakdowns and extend equipment life.",
    keywords: [...BASE_KEYWORDS, "facility task automation", "preventive maintenance software", "PPM software", "work order management"],
  },
  "/complaint-helpdesk-automation": {
    title: "Complaint Management Software",
    description:
      "Log, route and resolve facility complaints with SLA tracking. Firmity's complaint management keeps residents, tenants and staff informed and issues accountable.",
    keywords: [...BASE_KEYWORDS, "complaint management software", "helpdesk facility", "SLA tracking"],
  },
  "/assets-spares-automation": {
    title: "Asset Management Software",
    description:
      "Track every facility asset — location, condition, service history and depreciation — in one register. Firmity asset management gives full lifecycle visibility.",
    keywords: [...BASE_KEYWORDS, "asset management software", "asset tracking", "equipment register"],
  },
  "/inventory-vendor-automation-erp": {
    title: "Inventory & Vendor Management ERP Software",
    description:
      "Control facility spares and consumables with Firmity's inventory & vendor ERP: stock levels, reorder alerts, purchase workflows and usage tracking.",
    keywords: [...BASE_KEYWORDS, "inventory management software", "facility spares", "stock control", "inventory ERP", "vendor management ERP"],
  },
  "/employee-management-automation": {
    title: "Staff Attendance & Workforce Management",
    description:
      "Manage facility staff attendance, shifts and deployment with Firmity — real-time headcount, roster control and workforce accountability across sites.",
    keywords: [...BASE_KEYWORDS, "staff attendance software", "workforce management", "shift roster"],
  },
  "/visitor-management-automation": {
    title: "Visitor Management System",
    description:
      "Digitise gate entry with Firmity's visitor management — pre-approvals, passes and audit logs for secure, seamless visitor access at your facility.",
    keywords: [...BASE_KEYWORDS, "visitor management system", "gate management", "visitor pass"],
  },
  "/facility-records": {
    title: "Facility Records & Compliance",
    description:
      "Keep every facility record, register and compliance document in one place with Firmity — audit-ready logbooks, certificates and SOPs at your fingertips.",
    keywords: [...BASE_KEYWORDS, "facility records", "compliance management", "digital logbook"],
  },
  "/payroll-automation-erp": {
    title: "Payroll Automation ERP",
    description:
      "Run multi-tier payroll in one click with Firmity's payroll ERP: automated PF, ESI, PT and TDS deductions, maker-checker approval and bank file generation.",
    keywords: [...BASE_KEYWORDS, "payroll software", "payroll ERP", "statutory compliance payroll", "PF ESI TDS software"],
  },
  "/facility-expense-automation-erp": {
    title: "Facility Expense Automation ERP",
    description:
      "Control facility spend with policy-driven budget caps, category-wise tracking, maker-checker approvals and audit-ready journals posted to your ledger.",
    keywords: [...BASE_KEYWORDS, "facility expense management", "expense ERP", "budget management software", "facility budget control"],
  },
  "/industries/manufacturing": {
    title: "Facility Management for Manufacturing Plants",
    description:
      "Firmity for manufacturing — maintain plant equipment, utilities and safety systems with preventive maintenance, asset tracking and compliance in one platform.",
    keywords: [...BASE_KEYWORDS, "manufacturing facility management", "plant maintenance software"],
  },
  "/industries/educational": {
    title: "Facility Management for Schools & Campuses",
    description:
      "Firmity for educational institutions — manage campus maintenance, assets, housekeeping and safety across buildings from one facility management platform.",
    keywords: [...BASE_KEYWORDS, "campus facility management", "school maintenance software"],
  },
  "/industries/residential": {
    title: "Facility Management for Residential Societies",
    description:
      "Firmity for residential societies and apartments — housekeeping, security, complaints, assets and staff, all managed from one facility platform.",
    keywords: [...BASE_KEYWORDS, "society management software", "apartment facility management India"],
  },
  "/privacy": {
    title: "Privacy Policy",
    description: "How Firmity and UFIRM Technologies collect, use and protect your data.",
  },
  "/privacy-policy": {
    title: "Privacy Policy",
    description: "How Firmity and UFIRM Technologies collect, use and protect your data.",
  },
  "/terms": {
    title: "Terms & Conditions",
    description:
      "The terms and conditions governing your use of the Firmity facility management platform, software and related services.",
  },
  "/event-booking": {
    title: "Book an Event or Demo",
    description: "Schedule a Firmity demo or book an event or room slot, with intelligent calendar management and real-time availability for facilities in India.",
  },
  "/search": {
    title: "Search Firmity",
    description: "Search Firmity's pages, features and blog for facility management guides, modules and resources.",
  },
};

/** Absolute canonical URL for a path. */
export function canonical(path: string): string {
  return path === "/" ? SITE.url : `${SITE.url}${path}`;
}

// The fixed set of pages the Marketing Studio SEO tab can edit. Marketers can
// override/reset these — they CANNOT add new routes here (only a developer can).
export const SEO_ROUTES: { path: string; label: string }[] = [
  { path: "/", label: "Home" },
  { path: "/features", label: "Features" },
  { path: "/pricing", label: "Pricing" },
  { path: "/about", label: "About" },
  { path: "/resources", label: "Resources" },
  { path: "/blog", label: "Blog (index)" },
  { path: "/contact", label: "Contact" },
  { path: "/facility-survey", label: "Facility Survey" },
  { path: "/facility-survey/book", label: "Facility Survey — Book" },
  { path: "/facility-task-automation", label: "Facility Task Automation" },
  { path: "/complaint-helpdesk-automation", label: "Complaint Management" },
  { path: "/assets-spares-automation", label: "Asset Management" },
  { path: "/inventory-vendor-automation-erp", label: "Inventory Management" },
  { path: "/employee-management-automation", label: "Staff Attendance" },
  { path: "/visitor-management-automation", label: "Visitor Management" },
  { path: "/facility-records", label: "Facility Records" },
  { path: "/payroll-automation-erp", label: "Payroll Management" },
  { path: "/facility-expense-automation-erp", label: "Facility Expense Management" },
  { path: "/industries/manufacturing", label: "Industries — Manufacturing" },
  { path: "/industries/educational", label: "Industries — Educational" },
  { path: "/industries/residential", label: "Industries — Residential" },
  { path: "/privacy", label: "Privacy Policy" },
  { path: "/terms", label: "Terms & Conditions" },
];

/**
 * Build a full Metadata object for a public page. Falls back to the home entry
 * if the path is unknown (so a missing map entry degrades gracefully, never 500s).
 */
export function buildMetadata(path: string): Metadata {
  const seo = PAGE_SEO[path] ?? PAGE_SEO["/"];
  const url = canonical(path);
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: url },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: "website",
      // Explicit so EVERY page carries an og:image. "/opengraph-image" is the
      // route generated by app/opengraph-image.tsx; metadataBase makes it absolute.
      // (Relying on the file-convention inheritance dropped the tag once a child
      // segment set its own openGraph, so we set it explicitly here.)
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/opengraph-image"],
    },
  };
}

/** Metadata for private/app pages: index off, but still crawlable for links. */
export function noindexMetadata(title: string): Metadata {
  return {
    title,
    robots: { index: false, follow: false },
  };
}

// ─── JSON-LD (structured data) ───────────────────────────────────────────────
// Rendered as <script type="application/ld+json"> — safe in both server and
// client components.

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/firmity.png`,
    description:
      "AI-powered facility management, CMMS and ERP platform for maintenance, assets, inventory, payroll, expenses, workforce and compliance.",
    address: { "@type": "PostalAddress", addressCountry: "IN" },
    sameAs: [...SOCIAL_PROFILES] as string[],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "demo@firmity.in",
      areaServed: "IN",
      availableLanguage: ["English"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
  };
}

export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: canonical(path),
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    areaServed: { "@type": "Country", name: "India" },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: canonical(it.path),
    })),
  };
}

// FAQPage structured data (2026-09-23, for the blog post FAQ block — see
// src/components/blog/blog-faq-section.tsx). Worth knowing going in: Google
// deprecated the visual FAQ rich-result snippet entirely in May 2026 (it had
// already been restricted to gov/health sites since Aug 2023) — this
// markup no longer earns the expanded SERP entry for anyone. It's still
// emitted because (a) it's free, standards-correct structured data with no
// downside, and (b) AI answer engines (ChatGPT, Perplexity, Google's own AI
// Overviews) do still parse Question/acceptedAnswer pairs when citing a
// page. The real SEO win for these FAQs is the crawlable HTML text itself —
// see the `hidden`-attribute technique in that component's file comment.
export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}
