import type { MetadataRoute } from "next"
import { canonical } from "@/src/lib/seo"
import { listPublished, listCategories, categorySlug } from "@/src/lib/blog"
import { ERP_GUIDES } from "@/src/lib/erp-guides"
import { VIDEO_TUTORIALS, latestVideoDate, videoEmbedUrl, videoThumbnail } from "@/src/lib/video-tutorials"

// ─── Sitemap ─────────────────────────────────────────────────────────────────
// Backs /sitemap.xml and the footer's "Sitemap" link. Next.js auto-generates a
// working /sitemap.xml from this file.
//
// Hosts: URLs come from canonical() (src/lib/seo.ts) — the single source of
// truth for the www host used in every <link rel="canonical">, OG tag and
// JSON-LD entry. request-guard.ts still accepts both hosts at the request layer;
// that is separate from which host we advertise here.
//
// Rules for this list:
//  - Only pages that are indexable and return 200. Redirects (/pricing →
//    /, /privacy-policy → /privacy, /preventive-maintenance → its new URL) and
//    private/app routes (see robots.ts) do not belong here.
//  - Keep STATIC_ROUTES in sync with PAGE_SEO in src/lib/seo.ts when a public
//    page ships. Blog posts, blog categories and the video page are DB/data
//    driven below, so they never need a manual entry.
//
// 2026-11-03: added /resources/guide, /cookie-policy, the video tutorials page
// (with its video entries) and one entry per blog category page, none of which
// were listed; the sitemap also now revalidates (it was frozen at build time).
export const revalidate = 86400

const STATIC_ROUTES = [
  "",
  "/about",
  "/features",
  "/facility-task-automation",
  "/complaint-helpdesk-automation",
  "/assets-spares-automation",
  "/inventory-vendor-automation-erp",
  "/employee-management-automation",
  "/visitor-management-automation",
  "/cafm-software",
  "/payroll-automation-erp",
  "/facility-expense-automation-erp",
  // 8 pillar pages added 2026-09-30, from the SEO tracker spreadsheet.
  "/cmms-software",
  "/erp-software",
  "/asset-management-software",
  "/complaint-management-software",
  "/visitor-management-software",
  "/employee-management-software",
  "/payroll-management-software",
  "/inventory-management-software",
  "/resources",
  "/resources/guide",
  ...ERP_GUIDES.map((g) => `/resources/guide/${g.slug}`),
  "/blog",
  "/contact",
  "/facility-survey",
  "/facility-survey/book",
  "/event-booking",
  "/industries/manufacturing",
  "/industries/educational",
  "/industries/residential",
  "/privacy",
  "/terms",
  "/cookie-policy",
  "/modern-slavery-statement",
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: canonical(route),
  }))

  // Video tutorials page, with one <video:video> entry per tutorial so Google can
  // associate the videos with this URL. lastModified = newest upload (a real date).
  const videoEntry: MetadataRoute.Sitemap[number] = {
    url: canonical("/resources/video-tutorials"),
    lastModified: latestVideoDate(),
    videos: VIDEO_TUTORIALS.map((v) => ({
      title: v.title,
      description: v.description,
      thumbnail_loc: videoThumbnail(v.id),
      player_loc: videoEmbedUrl(v.id),
      duration: v.durationSeconds,
      publication_date: v.uploadDate,
      family_friendly: "yes" as const,
    })),
  }

  // DB-driven entries fail open independently: a failed read drops only its own
  // section, never the whole sitemap (same convention as /api/search).
  let categoryEntries: MetadataRoute.Sitemap = []
  try {
    const categories = await listCategories()
    categoryEntries = categories.map((c) => ({ url: canonical(`/blog/category/${categorySlug(c)}`) }))
  } catch (err) {
    console.error("[SITEMAP_ERR] listCategories failed, omitting category pages", err)
  }

  let postEntries: MetadataRoute.Sitemap = []
  try {
    const posts = await listPublished()
    postEntries = posts.map((post) => ({
      url: canonical(`/blog/${post.slug}`),
      lastModified: new Date(post.content_updated_at || post.updated_at || Date.now()),
    }))
  } catch (err) {
    console.error("[SITEMAP_ERR] listPublished failed, omitting blog posts", err)
  }

  return [...staticEntries, videoEntry, ...categoryEntries, ...postEntries]
}
