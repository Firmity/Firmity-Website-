// Dedicated per-category blog listing (2026-09-23) — e.g. /blog/category/cafm
// shows only CAFM posts. Backs both the "Browse by product" tiles at the
// bottom of /blog (blog-index.tsx) and the category breadcrumb link on
// individual posts (blog/[slug]/page.tsx). Reuses BlogIndex verbatim
// (lockCategory suppresses the redundant filter pills + the featured-tiles
// section, since this page already IS one of those tiles' destination) so
// it looks and behaves exactly like the main index, just pre-filtered —
// no new layout or styling introduced.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listCategories, listPublishedByCategory, categorySlug } from "@/src/lib/blog";
import { BlogIndex } from "@/src/components/blog/blog-index";
import { canonical } from "@/src/lib/seo";

export const revalidate = 60;

async function resolveCategory(slug: string): Promise<string | null> {
  const categories = await listCategories();
  return categories.find((c) => categorySlug(c) === slug) ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = await resolveCategory(slug);
  if (!category) return { title: "Blog category", robots: { index: false, follow: true } };
  const url = canonical(`/blog/category/${slug}`);
  const description = `${category} guides, playbooks and updates from the Firmity blog for facility teams.`;
  return {
    title: `${category} Articles — Firmity Blog`,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${category} Articles — Firmity Blog`, description, url, type: "website" },
    twitter: { card: "summary", title: `${category} Articles — Firmity Blog`, description },
  };
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await resolveCategory(slug);
  if (!category) notFound();

  const posts = await listPublishedByCategory(category);

  return (
    <BlogIndex
      posts={posts}
      lockCategory={category}
      breadcrumbOverride={[
        { label: "Blog", href: "/blog" },
        { label: category, href: `/blog/category/${slug}` },
      ]}
    />
  );
}
