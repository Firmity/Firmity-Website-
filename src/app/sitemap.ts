import type { MetadataRoute } from "next"
import { canonical } from "@/src/lib/seo"
import { listPublished } from "@/src/lib/blog"
import { ERP_GUIDES } from "@/src/lib/erp-guides"

// ─── Sitemap — added 2026-09-04, expanded 2026-09-05 ───────────────────────
// Backs the footer's "Sitemap" link (src/components/footer.tsx bottom bar,
// per request to match Planon's own footer layout) — without this file, that
// link would 404. Next.js's App Router convention: a `sitemap.ts` at src/app
// root auto-generates a working /sitemap.xml route, no manual XML or extra
// dependency needed.
//
// 2026-09-05: switched from a hardcoded non-www BASE_URL to canonical() from
// src/lib/seo.ts — that's the single source of truth for the canonical host
// (www) already used in every <link rel="canonical">, OG tag and JSON-LD
// entry sitewide. The old constant duplicated that as a separate, drifted
// non-www string, which would have advertised every sitemap URL under a
// different origin than the one every other tag calls canonical.
// request-guard.ts's PRODUCTION_ORIGINS still accepts both hosts at the
// request-validation layer — that's a separate concern from which host we
// advertise as canonical here.
//
// STATIC_ROUTES also grew from 10 to the full public route list: the 7
// feature-module pages, /about, /pricing, /facility-survey(+/book), /search
// and /event-booking were simply missing before (an oversight, not a
// deliberate noindex — every one of them already has a PAGE_SEO entry in
// seo.ts and, as of 2026-09-05, full metadata + JSON-LD wiring). Keep this
// list in sync with PAGE_SEO in src/lib/seo.ts when a new public page ships.
const STATIC_ROUTES = [
  "",
  "/about",
  "/features",
  "/pricing",
  "/preventive-maintenance",
  "/complaint-management",
  "/asset-management",
  "/inventory-management",
  "/staff-attendance",
  "/visitor-management",
  "/facility-records",
  "/resources",
  ...ERP_GUIDES.map((g) => `/resources/guide/${g.slug}`),
  "/blog",
  "/contact",
  "/facility-survey",
  "/facility-survey/book",
  "/event-booking",
  "/search",
  "/industries/manufacturing",
  "/industries/educational",
  "/industries/residential",
  "/privacy",
  "/terms",
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: canonical(route),
    lastModified: new Date(),
  }))

  // Individual blog posts are DB-driven and weren't in the sitemap at all
  // before — append one entry per published post. Fails open to the static
  // list only (never 500s the whole sitemap) if the DB read throws, same
  // fail-open convention used by /api/search/route.ts.
  try {
    const posts = await listPublished()
    const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
      url: canonical(`/blog/${post.slug}`),
      lastModified: new Date(post.updated_at || post.published_at || Date.now()),
    }))
    return [...staticEntries, ...postEntries]
  } catch (err) {
    console.error("[SITEMAP_ERR] listPublished failed, falling back to static routes only", err)
    return staticEntries
  }
}
