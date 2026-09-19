import { MetadataRoute } from "next";
import { getSiteSeo, listPageSeo } from "@/src/lib/seo-store";

export const revalidate = 300;

export default async function robots(): Promise<MetadataRoute.Robots> {
  const base = ["/login", "/staff-login", "/surveys", "/my-surveys", "/survey/", "/awards", "/settings", "/profile", "/admin/", "/blog-admin", "/api/", "/dashboard/", "/r/", "/home"];

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

  const disallow = [...new Set([...base, ...extra])];
  // Search/answer crawlers get their own explicit groups. A named group
  // overrides the "*" group entirely, so each repeats the same disallow list.
  // Training-only bots (GPTBot, ClaudeBot, Google-Extended, CCBot, ...) are
  // deliberately left under "*" (allowed) — that is a licensing choice, not a
  // visibility one.
  const searchBots = ["Googlebot", "Bingbot", "OAI-SearchBot", "Claude-SearchBot", "PerplexityBot"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...searchBots.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: "https://www.firmity.in/sitemap.xml",
  };
}
