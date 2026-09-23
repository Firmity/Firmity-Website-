// Server-only DB layer for marketer-editable SEO. buildPageMetadata() merges a
// page_seo override (if any) over the static seo.ts defaults, so pages stay
// DB-driven at request time (ISR) while never breaking when no override exists.
import "server-only";
import type { Metadata } from "next";
import { getSupabaseAdmin } from "./supabase-admin";
import { buildMetadata, canonical, SITE, SEO_ROUTES, PAGE_SEO, serviceJsonLd } from "./seo";

export interface PageSeoRow {
  path: string;
  title: string | null;
  description: string | null;
  keywords: string[] | null;
  og_image_url: string | null;
  noindex: boolean;
  sitemap_priority: number | null;
  sitemap_changefreq: string | null;
  json_ld: Record<string, unknown> | null;
  updated_at?: string;
}

export interface SiteSeo {
  org_name: string | null;
  org_logo_url: string | null;
  social_links: string[] | null;
  robots_disallow: string[] | null;
}

// ── Reads ────────────────────────────────────────────────────────────────────
export async function getPageSeo(path: string): Promise<PageSeoRow | null> {
  const { data, error } = await getSupabaseAdmin().from("page_seo").select("*").eq("path", path).maybeSingle();
  if (error) {
    console.error("[SEO_DB_ERR] getPageSeo", path, error.message);
    return null; // fail-safe: fall back to code defaults
  }
  return (data as PageSeoRow) ?? null;
}

export async function listPageSeo(): Promise<PageSeoRow[]> {
  const { data } = await getSupabaseAdmin().from("page_seo").select("*");
  return (data as PageSeoRow[]) ?? [];
}

export async function getSiteSeo(): Promise<SiteSeo> {
  const { data } = await getSupabaseAdmin().from("site_seo").select("*").eq("id", 1).maybeSingle();
  return (
    (data as SiteSeo) ?? { org_name: SITE.name, org_logo_url: null, social_links: null, robots_disallow: null }
  );
}

// ── Writes (admin) ───────────────────────────────────────────────────────────
export async function upsertPageSeo(row: Partial<PageSeoRow> & { path: string }): Promise<void> {
  const { error } = await getSupabaseAdmin().from("page_seo").upsert(row, { onConflict: "path" });
  if (error) throw new Error(`[SEO_DB_ERR] upsert: ${error.message}`);
}

export async function deletePageSeo(path: string): Promise<void> {
  const { error } = await getSupabaseAdmin().from("page_seo").delete().eq("path", path);
  if (error) throw new Error(`[SEO_DB_ERR] delete: ${error.message}`);
}

export async function updateSiteSeo(patch: Partial<SiteSeo>): Promise<void> {
  const { error } = await getSupabaseAdmin().from("site_seo").update(patch).eq("id", 1);
  if (error) throw new Error(`[SEO_DB_ERR] site update: ${error.message}`);
}

// ── Refresh (2026-09-23) ──────────────────────────────────────────────────────
// The Studio's page list (SEO_ROUTES) and title/description/keywords already
// always track seo.ts's PAGE_SEO live — buildPageMetadata/seo-manager.tsx
// both fall back to the code default whenever no override is saved, so
// there's nothing to "go stale" there. The one field that genuinely freezes
// is Structured Data (JSON-LD): the moment a page gets a saved override, it
// stops tracking the code, even after that page's real name/description
// changes in PAGE_SEO. This regenerates it, for exactly the pages that have
// a code-computable schema, and — as a free side effect — deletes any
// override row left over for a path that's since been removed from
// SEO_ROUTES entirely.

// Pages whose Structured Data box maps onto serviceJsonLd(title, description,
// path) — i.e. every page that describes one Firmity module/service. Every
// other page's JSON-LD (if any) was hand-typed in the Studio for something
// refresh has no code equivalent for (e.g. Home's Organization/WebSite data
// is emitted site-wide elsewhere, not stored here) and is never touched.
const SERVICE_SCHEMA_PATHS = new Set<string>([
  "/features",
  "/facility-task-automation",
  "/complaint-helpdesk-automation",
  "/assets-spares-automation",
  "/inventory-vendor-automation-erp",
  "/employee-management-automation",
  "/visitor-management-automation",
  "/facility-records",
  "/payroll-automation-erp",
  "/facility-expense-automation-erp",
  "/industries/manufacturing",
  "/industries/educational",
  "/industries/residential",
]);

export interface RefreshResult {
  updated: string[];
  removedOrphans: string[];
}

/**
 * mode "merge": only fills in Structured Data where a page currently has
 * none saved — never touches a page that already has something, hand-typed
 * or previously generated.
 * mode "overwrite": always replaces it with the current computed default —
 * the marketer explicitly asked to discard whatever was there.
 */
export async function refreshPageSeo(mode: "merge" | "overwrite"): Promise<RefreshResult> {
  const rows = await listPageSeo();
  const byPath = new Map(rows.map((r) => [r.path, r]));
  const validPaths = new Set(SEO_ROUTES.map((r) => r.path));
  const updated: string[] = [];
  const removedOrphans: string[] = [];

  for (const row of rows) {
    if (!validPaths.has(row.path)) {
      await deletePageSeo(row.path);
      removedOrphans.push(row.path);
    }
  }

  for (const path of SERVICE_SCHEMA_PATHS) {
    const seo = PAGE_SEO[path];
    if (!seo) continue;
    const existing = byPath.get(path);
    if (mode === "merge" && existing?.json_ld) continue;

    const fresh = serviceJsonLd(seo.title, seo.description, path);
    if (JSON.stringify(existing?.json_ld ?? null) === JSON.stringify(fresh)) continue;

    await upsertPageSeo({
      path,
      title: existing?.title ?? null,
      description: existing?.description ?? null,
      keywords: existing?.keywords ?? null,
      og_image_url: existing?.og_image_url ?? null,
      noindex: existing?.noindex ?? false,
      sitemap_priority: existing?.sitemap_priority ?? null,
      sitemap_changefreq: existing?.sitemap_changefreq ?? null,
      json_ld: fresh,
    });
    updated.push(path);
  }

  return { updated, removedOrphans };
}

// ── The one function every page's generateMetadata() calls ───────────────────
export async function buildPageMetadata(path: string): Promise<Metadata> {
  const base = buildMetadata(path);
  const row = await getPageSeo(path);
  if (!row) return base;

  const title = row.title || (base.title as string);
  const description = row.description ?? (base.description as string | undefined);
  const url = canonical(path);
  const ogImages = row.og_image_url ? [{ url: row.og_image_url, width: 1200, height: 630, alt: title }] : undefined;

  return {
    ...base,
    title,
    description,
    robots: row.noindex ? { index: false, follow: true } : base.robots,
    openGraph: { ...base.openGraph, title, description, url, ...(ogImages ? { images: ogImages } : {}) },
    twitter: { ...base.twitter, title, description, ...(row.og_image_url ? { images: [row.og_image_url] } : {}) },
  };
}
