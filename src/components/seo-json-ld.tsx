// // Renders the per-page JSON-LD saved in the SEO tab (page_seo.json_ld), if any.
// // When nothing is saved, falls back to a plain page-type entity for pages that
// // have a natural schema.org type (About, Contact, Resources hub, Blog).
// // Server component — safe to drop into any route layout.
// import { getPageSeo } from "@/src/lib/seo-store";
// import { JsonLd } from "@/src/components/json-ld";
// import { PAGE_SEO, SITE, canonical } from "@/src/lib/seo";

// const DEFAULT_PAGE_TYPES: Record<string, string> = {
//   "/about": "AboutPage",
//   "/contact": "ContactPage",
//   "/resources": "CollectionPage",
//   "/blog": "Blog",
// };

// export async function PageJsonLd({ path }: { path: string }) {
//   const row = await getPageSeo(path);
//   if (row?.json_ld) return <JsonLd data={row.json_ld as Record<string, unknown>} />;

//   const type = DEFAULT_PAGE_TYPES[path];
//   const seo = PAGE_SEO[path];
//   if (!type || !seo) return null;
//   return (
//     <JsonLd
//       data={{
//         "@context": "https://schema.org",
//         "@type": type,
//         name: seo.title,
//         description: seo.description,
//         url: canonical(path),
//         isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
//       }}
//     />
//   );
// }






















// src/components/seo-json-ld.tsx
// Server component — safe to drop into any route layout.
// Generates a maximalist linked @graph: Organization (17 Pan-India locations),
// SoftwareApplication, ItemList (Clients), OfferCatalog (multi-currency),
// WebSite, WebPage, BreadcrumbList, ContactPoint, and PostalAddress.

import { getPageSeo } from "@/src/lib/seo-store";
import { JsonLd } from "@/src/components/json-ld";
import { PAGE_SEO, SITE, canonical } from "@/src/lib/seo";

const DEFAULT_PAGE_TYPES: Record<string, string> = {
  "/": "WebPage",
  "/about": "AboutPage",
  "/contact": "ContactPage",
  "/resources": "CollectionPage",
  "/blog": "Blog",
  "/sg": "WebPage",
  "/features": "ItemPage",
  "/facility-survey": "WebPage",
  "/facility-task-automation": "ItemPage",
  "/assets-spares-automation": "ItemPage",
  "/complaint-helpdesk-automation": "ItemPage",
  "/inventory-vendor-automation-erp": "ItemPage",
  "/visitor-management-automation": "ItemPage",
  "/employee-management-automation": "ItemPage",
  "/payroll-automation-erp": "ItemPage",
  "/facility-expense-automation-erp": "ItemPage",
};

// Supported Currencies for Global Enterprise Software Indexing
const SUPPORTED_CURRENCIES = ["INR", "USD", "CAD", "EUR", "GBP", "SGD", "AED"];

// Helper to construct multi-currency offers without numerical pricing or trial references
function createMultiCurrencyOffers(serviceName: string, serviceDescription: string) {
  return SUPPORTED_CURRENCIES.map((currency) => ({
    "@type": "Offer",
    name: `${serviceName} (${currency})`,
    description: serviceDescription,
    priceCurrency: currency,
    availability: "https://schema.org/InStock",
    areaServed: ["IN", "SG", "AE", "US", "CA", "GB", "EU"],
    seller: { "@id": `${SITE.url}/#organization` },
  }));
}

// 1. Corporate Founders
const FOUNDER_ENTITIES = [
  {
    "@type": "Person",
    "@id": `${SITE.url}/#person-richu`,
    name: "Richu",
    jobTitle: "Co-Founder",
    worksFor: { "@id": `${SITE.url}/#organization` },
  },
  {
    "@type": "Person",
    "@id": `${SITE.url}/#person-anuj`,
    name: "Anuj",
    jobTitle: "Co-Founder",
    worksFor: { "@id": `${SITE.url}/#organization` },
  },
];

// 2. Client Social Proof Node
const CLIENT_PORTFOLIO_SCHEMA = {
  "@type": "ItemList",
  "@id": `${SITE.url}/#client-portfolio`,
  name: "Notable Enterprise Clients Using Firmity",
  description:
    "Enterprise organizations, industrial hubs, educational institutions, and real estate groups operating on Firmity CMMS & ERP.",
  itemListElement: [
    { "@type": "Organization", name: "Donaldson Filtration Solutions" },
    { "@type": "Organization", name: "Royal Nest Group" },
    { "@type": "Organization", name: "Homes 121" },
    { "@type": "Organization", name: "RG Residency" },
    { "@type": "EducationalOrganization", name: "BITS Pilani" },
    { "@type": "EducationalOrganization", name: "DPS Group Ghaziabad" },
    { "@type": "Organization", name: "Octave" },
    { "@type": "Organization", name: "Cargill" },
    { "@type": "Organization", name: "Skeps" },
    { "@type": "Organization", name: "LPS Bossard" },
  ],
};

// 3. Multi-Currency Enterprise Offer Catalog (No Numerical Pricing / No Trial)
const OFFER_CATALOG_SCHEMA = {
  "@type": "OfferCatalog",
  "@id": `${SITE.url}/#offer-catalog`,
  name: "Firmity Enterprise Facility Management Modules",
  itemListElement: [
    {
      "@type": "OfferCatalog",
      name: "Computerized Maintenance Management System (CMMS)",
      itemListElement: [
        ...createMultiCurrencyOffers(
          "Facility Task Automation & PPM Schedules",
          "Automated preventive maintenance schedules, recurring work order assignment, and task tracking."
        ),
        ...createMultiCurrencyOffers(
          "Assets & Spares Automation with QR Tagging",
          "Complete asset lifecycle tracking, QR code labeling, spare parts stock control, and depreciation management."
        ),
        ...createMultiCurrencyOffers(
          "Complaint & Helpdesk QR Ticketing & SLA Tracking",
          "QR code-based ticket generation, automated SLA escalation paths, and facility helpdesk resolution workflows."
        ),
      ],
    },
    {
      "@type": "OfferCatalog",
      name: "Facility Enterprise Resource Planning (ERP)",
      itemListElement: [
        ...createMultiCurrencyOffers(
          "Inventory & Vendor ERP with Auto-Reorder Alerts",
          "Real-time stock level monitoring, automated purchase requisitions, and vendor performance management."
        ),
        ...createMultiCurrencyOffers(
          "Employee Management & Geo-Fenced AI Attendance",
          "AI-driven facial recognition, geo-fenced mobile check-ins, shift planning, and staff roster management."
        ),
        ...createMultiCurrencyOffers(
          "Statutory Payroll ERP",
          "Automated statutory compliance payroll engine for PF, ESI, TDS, GST, and regional labor law rules."
        ),
        ...createMultiCurrencyOffers(
          "Facility Expense & Budget ERP",
          "Facility operational expense tracking, departmental budget allocation, and maker-checker approval workflows."
        ),
      ],
    },
    {
      "@type": "OfferCatalog",
      name: "Security & Visitor Automation",
      itemListElement: [
        ...createMultiCurrencyOffers(
          "Visitor Management with Contactless QR Gate Pass",
          "Digital gate pass generation, VIP host notifications, vehicle logging, and security desk dashboard."
        ),
      ],
    },
  ],
};

// 4. Primary Organization Entity with 17 Offices across India
const ORGANIZATION_SCHEMA = {
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: "UFIRM Technologies (P) Limited",
  legalName: "UFIRM Technologies Private Limited",
  alternateName: ["Firmity", "Firmity CMMS", "Firmity ERP", "UFIRM"],
  url: SITE.url,
  identifier: "U74999DL2016PTC306643",
  taxID: "U74999DL2016PTC306643",
  founder: FOUNDER_ENTITIES,
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE.url}/#logo`,
    url: `${SITE.url}/firmity.png`,
    caption: "Firmity - UFIRM Technologies Logo",
  },
  image: { "@id": `${SITE.url}/#logo` },
  sameAs: [
    "https://www.linkedin.com/showcase/firmity-software-real-estate/",
    "https://www.youtube.com/@Firmity",
    "https://x.com/firmityglobal",
    "https://www.instagram.com/_firmity_/",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-9797039690",
      email: "sales@firmity.in", // PLACEHOLDER: Update if official contact email differs
      contactType: "sales",
      areaServed: ["IN", "SG", "AE", "US", "CA", "GB", "EU"],
      availableLanguage: ["English", "Hindi"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
      url: `${SITE.url}/contact`,
    },
    {
      "@type": "ContactPoint",
      telephone: "+91-9797039690",
      email: "demo@firmity.in", // PLACEHOLDER: Update if official support email differs
      contactType: "technical support",
      areaServed: ["IN", "SG", "AE", "US", "CA", "GB", "EU"],
      availableLanguage: ["English", "Hindi"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
      url: `${SITE.url}/contact`,
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "H-64, Sector 63",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201301",
    addressCountry: "IN",
  },
  location: [
    { "@type": "Place", name: "Noida Head Office", address: { "@type": "PostalAddress", streetAddress: "H-64, Sector 63", addressLocality: "Noida", addressRegion: "Uttar Pradesh", postalCode: "201301", addressCountry: "IN" } },
    { "@type": "Place", name: "Delhi Office", address: { "@type": "PostalAddress", addressLocality: "New Delhi", addressRegion: "Delhi", addressCountry: "IN" } },
    { "@type": "Place", name: "Gurugram Office", address: { "@type": "PostalAddress", addressLocality: "Gurugram", addressRegion: "Haryana", addressCountry: "IN" } },
    { "@type": "Place", name: "Faridabad Office", address: { "@type": "PostalAddress", addressLocality: "Faridabad", addressRegion: "Haryana", addressCountry: "IN" } },
    { "@type": "Place", name: "Dehradun Office", address: { "@type": "PostalAddress", addressLocality: "Dehradun", addressRegion: "Uttarakhand", addressCountry: "IN" } },
    { "@type": "Place", name: "Dharamshala Office", address: { "@type": "PostalAddress", addressLocality: "Dharamshala", addressRegion: "Himachal Pradesh", addressCountry: "IN" } },
    { "@type": "Place", name: "Jammu Office", address: { "@type": "PostalAddress", addressLocality: "Jammu", addressRegion: "Jammu and Kashmir", addressCountry: "IN" } },
    { "@type": "Place", name: "Srinagar Office", address: { "@type": "PostalAddress", addressLocality: "Srinagar", addressRegion: "Jammu and Kashmir", addressCountry: "IN" } },
    { "@type": "Place", name: "Kolkata Hub", address: { "@type": "PostalAddress", addressLocality: "Kolkata", addressRegion: "West Bengal", addressCountry: "IN" } },
    { "@type": "Place", name: "Bengaluru Office", address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "IN" } },
    { "@type": "Place", name: "Hyderabad Office", address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressRegion: "Telangana", addressCountry: "IN" } },
    { "@type": "Place", name: "Mumbai Regional Office", address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressRegion: "Maharashtra", addressCountry: "IN" } },
    { "@type": "Place", name: "Raipur Office", address: { "@type": "PostalAddress", addressLocality: "Raipur", addressRegion: "Chhattisgarh", addressCountry: "IN" } },
    { "@type": "Place", name: "Ahmedabad Office", address: { "@type": "PostalAddress", addressLocality: "Ahmedabad", addressRegion: "Gujarat", addressCountry: "IN" } },
    { "@type": "Place", name: "Pune Office", address: { "@type": "PostalAddress", addressLocality: "Pune", addressRegion: "Maharashtra", addressCountry: "IN" } },
    { "@type": "Place", name: "Chennai Office", address: { "@type": "PostalAddress", addressLocality: "Chennai", addressRegion: "Tamil Nadu", addressCountry: "IN" } },
    { "@type": "Place", name: "Udaipur Office", address: { "@type": "PostalAddress", addressLocality: "Udaipur", addressRegion: "Rajasthan", addressCountry: "IN" } },
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Security Certification",
      name: "ISO 27001 Certified",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Data Privacy & Compliance Standards",
      name: "Digital Personal Data Protection Act (DPDP) Compliant",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Global Data Protection Regulation",
      name: "GDPR Compliant",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Security Framework",
      name: "SOC 2 (In Process / Alignment)",
    },
  ],
  hasOfferCatalog: { "@id": `${SITE.url}/#offer-catalog` },
};

// 5. Software Application Specification Entity
const SOFTWARE_APPLICATION_SCHEMA = {
  "@type": "SoftwareApplication",
  "@id": `${SITE.url}/#software`,
  name: "Firmity Platform",
  alternateName: [
    "Firmity CMMS",
    "Firmity ERP",
    "UFIRM Facility Management Platform",
  ],
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Facility Management Software, Enterprise Resource Planning, CMMS",
  operatingSystem: "Web Desktop, iOS, Android",
  softwareVersion: "2.5",
  description:
    "Integrated enterprise facility management platform combining CMMS, ERP, IoT integrations, AI attendance, QR ticket routing, statutory payroll, and asset lifetime management across commercial, industrial, and residential real estate.",
  areaServed: [
    { "@type": "Country", name: "India", identifier: "IN" },
    { "@type": "Country", name: "Singapore", identifier: "SG" },
    { "@type": "Country", name: "United Arab Emirates", identifier: "AE" },
    { "@type": "Country", name: "United States", identifier: "US" },
    { "@type": "Country", name: "Canada", identifier: "CA" },
    { "@type": "Country", name: "United Kingdom", identifier: "GB" },
  ],
  author: { "@id": `${SITE.url}/#organization` },
  publisher: { "@id": `${SITE.url}/#organization` },
  availableLanguage: ["English", "Hindi"],
  permissions: "Camera (for QR scanning & AI attendance), Location (for geo-fencing)",
  storageRequirements: "Cloud Hosted (Enterprise SaaS)",
  featureList: [
    "Facility Task Automation & PPM Schedules",
    "Assets & Spares Automation with QR Tagging",
    "Complaint & Helpdesk QR Ticketing with SLA Audit Trail",
    "Inventory & Vendor ERP with Auto Reorder Alerts",
    "Visitor Management with Contactless QR Gate Pass",
    "Geo-fenced AI Facial Recognition Attendance",
    "Statutory Payroll ERP (PF, ESI, TDS, GST Compliance)",
    "Facility Expense & Budget ERP with Maker-Checker Approvals",
    "Third-party Hardware Integration (ZKTeco Biometrics, BACnet BMS, WhatsApp API, ERPs)",
  ],
};

// Helper: Dynamically builds BreadcrumbList schema from the URL path
function buildBreadcrumbs(path: string) {
  if (path === "/" || path === "") return null;

  const segments = path.split("/").filter(Boolean);
  // Explicitly typed (2026-09-24 fix) — without this, TS infers `item`'s
  // type from the first element's `item: SITE.url` as the narrow literal
  // "https://www.firmity.in" (since SITE is declared `as const` in seo.ts),
  // so the .push() below with a computed `${SITE.url}${currentPath}` string
  // fails to typecheck against that literal. `item: string` is what this
  // field actually is everywhere it's used.
  const itemListElement: Array<{ "@type": "ListItem"; position: number; name: string; item: string }> = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE.url,
    },
  ];

  let currentPath = "";
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const formattedName = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    itemListElement.push({
      "@type": "ListItem",
      position: index + 2,
      name: formattedName,
      item: `${SITE.url}${currentPath}`,
    });
  });

  return {
    "@type": "BreadcrumbList",
    "@id": `${canonical(path)}/#breadcrumb`,
    itemListElement,
  };
}

export async function PageJsonLd({ path }: { path: string }) {
  // 1. Return database-driven JSON-LD if present in SEO store
  const row = await getPageSeo(path);
  if (row?.json_ld) {
    return <JsonLd data={row.json_ld as Record<string, unknown>} />;
  }

  // 2. Build maximalist graph fallback tree
  const type = DEFAULT_PAGE_TYPES[path] || "WebPage";
  const seo = PAGE_SEO[path];
  const breadcrumbs = buildBreadcrumbs(path);

  const graphNodes: Record<string, unknown>[] = [
    ORGANIZATION_SCHEMA,
    SOFTWARE_APPLICATION_SCHEMA,
    CLIENT_PORTFOLIO_SCHEMA,
    OFFER_CATALOG_SCHEMA,
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      publisher: { "@id": `${SITE.url}/#organization` },
      inLanguage: ["en-IN", "en-SG", "hi", "en"],
    },
    {
      "@type": type,
      "@id": `${canonical(path)}/#webpage`,
      url: canonical(path),
      name: seo?.title || SITE.name,
      description: seo?.description || PAGE_SEO["/"]?.description,
      isPartOf: { "@id": `${SITE.url}/#website` },
      about: { "@id": `${SITE.url}/#software` },
      inLanguage: path.startsWith("/sg") ? "en-SG" : "en-IN",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE.url}/firmity.png`,
      },
    },
  ];

  if (breadcrumbs) {
    graphNodes.push(breadcrumbs);
  }

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": graphNodes,
      }}
    />
  );
}