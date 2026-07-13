import { MetadataRoute } from "next";
import { listPageSeo } from "@/src/lib/seo-store";
import { listPublished } from "@/src/lib/blog";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.firmity.in";
  const lastModified = new Date();

  const routes: { path: string; changeFrequency: "daily" | "weekly" | "monthly" | "yearly"; priority: number }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/facility-survey", changeFrequency: "monthly", priority: 0.9 },
    { path: "/facility-survey/book", changeFrequency: "monthly", priority: 0.8 },
    { path: "/features", changeFrequency: "monthly", priority: 0.9 },
    { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
    { path: "/resources", changeFrequency: "monthly", priority: 0.7 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
    { path: "/industries/manufacturing", changeFrequency: "monthly", priority: 0.8 },
    { path: "/industries/educational", changeFrequency: "monthly", priority: 0.8 },
    { path: "/industries/residential", changeFrequency: "monthly", priority: 0.8 },
    { path: "/preventive-maintenance", changeFrequency: "monthly", priority: 0.7 },
    { path: "/asset-management", changeFrequency: "monthly", priority: 0.7 },
    { path: "/complaint-management", changeFrequency: "monthly", priority: 0.7 },
    { path: "/inventory-management", changeFrequency: "monthly", priority: 0.7 },
    { path: "/facility-records", changeFrequency: "monthly", priority: 0.7 },
    { path: "/visitor-management", changeFrequency: "monthly", priority: 0.7 },
    { path: "/staff-attendance", changeFrequency: "monthly", priority: 0.7 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  ];

  // Apply Marketing Studio SEO overrides (priority / changefreq / noindex).
  const overrides = new Map((await listPageSeo()).map((r) => [r.path, r]));

  const staticEntries: MetadataRoute.Sitemap = routes
    .filter((r) => !overrides.get(r.path)?.noindex) // drop pages marked noindex
    .map((r) => {
      const o = overrides.get(r.path);
      return {
        url: `${baseUrl}${r.path === "/" ? "" : r.path}`,
        lastModified,
        changeFrequency: (o?.sitemap_changefreq as (typeof r)["changeFrequency"]) || r.changeFrequency,
        priority: o?.sitemap_priority ?? r.priority,
      };
    });

  // Published blog posts (DB-driven).
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await listPublished();
    blogEntries = posts.map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: p.published_at ? new Date(p.published_at) : lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    /* blog table not migrated yet — skip */
  }

  return [...staticEntries, ...blogEntries];
}
