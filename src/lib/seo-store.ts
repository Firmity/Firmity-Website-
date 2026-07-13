// Server-only DB layer for marketer-editable SEO. buildPageMetadata() merges a
// page_seo override (if any) over the static seo.ts defaults, so pages stay
// DB-driven at request time (ISR) while never breaking when no override exists.
import "server-only";
import type { Metadata } from "next";
import { getSupabaseAdmin } from "./supabase-admin";
import { buildMetadata, canonical, SITE } from "./seo";

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
    keywords: row.keywords?.length ? row.keywords : base.keywords,
    robots: row.noindex ? { index: false, follow: true } : base.robots,
    openGraph: { ...base.openGraph, title, description, url, ...(ogImages ? { images: ogImages } : {}) },
    twitter: { ...base.twitter, title, description, ...(row.og_image_url ? { images: [row.og_image_url] } : {}) },
  };
}
