import { MetadataRoute } from "next";
import { getSiteSeo, listPageSeo } from "@/src/lib/seo-store";

export const revalidate = 300;

export default async function robots(): Promise<MetadataRoute.Robots> {
  const base = ["/login", "/staff-login", "/surveys", "/my-surveys", "/survey/", "/awards", "/settings", "/profile", "/admin/", "/blog-admin", "/api/", "/dashboard/", "/r/"];

  // Extra global disallows + per-page noindex paths from the Marketing Studio.
  let extra: string[] = [];
  try {
    const site = await getSiteSeo();
    extra = site.robots_disallow ?? [];
    const noindexPaths = (await listPageSeo()).filter((r) => r.noindex).map((r) => r.path);
    extra = [...extra, ...noindexPaths];
  } catch {
    /* tables not migrated yet */
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: [...new Set([...base, ...extra])] },
    sitemap: "https://www.firmity.in/sitemap.xml",
  };
}
