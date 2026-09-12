// Site search (2026-09-04) — the navbar's search box (src/components/navigation.tsx)
// used to submit to /search?q=... with no results route behind it (UI parity
// with the Planon reference nav only). This is the real backend for that:
// GET /api/search?q=<term> returns matching marketing pages + published blog
// posts, consumed by src/app/search/page.tsx.
//
// Two sources, merged:
// 1. STATIC_PAGES — hand-maintained index of marketing/feature pages. There's
//    no sitemap-driven auto-index because most of these pages don't expose a
//    machine-readable title/description at build time; add an entry here when
//    a new public page is added (same manual-sync tradeoff as sitemap.ts).
// 2. Published blog posts, fetched server-side via listPublished() (server-only
//    Supabase read, same lib the /blog index page and /api/blog/latest use) —
//    matched against title/subtitle/meta_description/category so the whole
//    blog is searchable, not just the latest 4 posts.
//
// Matching is a simple case-insensitive substring match (no fuzzy/ranking
// beyond "pages first, then posts") — deliberately simple, same class of
// search Planon's own reference site runs (a keyword index, not full-text
// relevance scoring). Revisit only if search quality becomes a real complaint.
import { NextResponse } from "next/server";
import { listPublished } from "@/src/lib/blog";

export const revalidate = 60; // ISR, matches /api/blog/latest's cadence

export interface SearchResult {
  title: string;
  url: string;
  description: string;
}

const STATIC_PAGES: SearchResult[] = [
  { title: "Firmity — Facility Management & CMMS Software", url: "/", description: "Cloud-based facility management software for maintenance, assets, visitors, staff, and compliance." },
  { title: "Features", url: "/features", description: "Every Firmity module in detail — task automation, assets, complaints, inventory, visitors, staff, payroll, and expenses." },
  { title: "Resources", url: "/resources", description: "Guides, brochures, and downloadable resources for facility management teams." },
  { title: "Blog", url: "/blog", description: "Ideas, guides, and case studies for teams that run buildings better." },
  { title: "Contact Us", url: "/contact", description: "Schedule a demo, request a callback, or ask a question — our team replies within 24 hours." },
  { title: "Facility Management for Manufacturing Plants", url: "/industries/manufacturing", description: "Facility management for manufacturing plants — breakdown management, PPM scheduling, and compliance records." },
  { title: "Facility Management for Schools & Campuses", url: "/industries/educational", description: "Facility management for schools and campuses — help desk, hostel records, visitor management, and staff attendance." },
  { title: "Facility Management for Residential Societies", url: "/industries/residential", description: "Facility management for residential societies — gate and visitor logs, complaints, and common-area maintenance." },
  { title: "Preventive Maintenance", url: "/preventive-maintenance", description: "Schedule and auto-trigger PPM cycles. Extend asset lifespan through intelligent, timely interventions." },
  { title: "Asset Management", url: "/asset-management", description: "Live asset registry with lifecycle alerts, AMC tracking, and warranty expiry notifications." },
  { title: "Complaint Management", url: "/complaint-management", description: "QR-based ticket raising from any location, assigned and tracked with a full audit trail." },
  { title: "Inventory & Vendor Management", url: "/inventory-management", description: "Stock tracking, auto-reorder triggers, and vendor workflows — purchase to delivery in one place." },
  { title: "Visitor Management", url: "/visitor-management", description: "Digital gate entries, host approvals, and badge printing — contactless and fully audit-ready." },
  { title: "Staff Attendance", url: "/staff-attendance", description: "Face-recognition attendance, shift scheduling, and real-time presence tracking across all sites." },
  { title: "Facility Records", url: "/facility-records", description: "Centralised, always-accessible records for every asset, vendor, and compliance document." },
  { title: "Privacy Policy", url: "/privacy", description: "How Firmity and UFIRM Technologies collect, use, and protect your data." },
  { title: "Terms & Conditions", url: "/terms", description: "The terms and conditions governing your use of the Firmity facility management platform." },
];

function matches(haystack: string, needleLower: string): boolean {
  return haystack.toLowerCase().includes(needleLower);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const qRaw = searchParams.get("q") ?? "";
    const q = qRaw.trim().toLowerCase();
    if (!q) return NextResponse.json([]);

    const pageResults = STATIC_PAGES.filter((p) => matches(p.title, q) || matches(p.description, q));

    let blogResults: SearchResult[] = [];
    try {
      const posts = await listPublished();
      blogResults = posts
        .filter((p) => matches(`${p.title} ${p.subtitle ?? ""} ${p.meta_description ?? ""} ${p.category ?? ""}`, q))
        .map((p) => ({
          title: p.title,
          url: `/blog/${p.slug}`,
          description: p.meta_description || p.subtitle || "",
        }));
    } catch (err) {
      // Blog DB unreachable — degrade to page-only results rather than 500ing
      // the whole search (same fail-open pattern as getPageSeo in seo-store.ts).
      console.error("[SEARCH_BLOG_ERR]", err);
    }

    const results: SearchResult[] = [...pageResults, ...blogResults].slice(0, 50);
    return NextResponse.json(results);
  } catch (err) {
    console.error("[SEARCH_ERR]", err);
    return NextResponse.json([], { status: 500 });
  }
}
