// Pages 2..N of the blog index → /blog/page/2, /blog/page/3, ...
// Page 1 is /blog itself; /blog/page/1 permanently redirects there so each
// page has exactly one URL. Out-of-range or non-canonical numbers 404.
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { listPublished, toCardData } from "@/src/lib/blog";
import { parsePageParam, sliceForPage, totalPagesFor } from "@/src/lib/blog-pagination";
import { BlogIndex } from "@/src/components/blog/blog-index";
import { buildPageMetadata } from "@/src/lib/seo-store";
import { canonical } from "@/src/lib/seo";

export const revalidate = 86400;

type RouteParams = { params: Promise<{ page: string }> };

// Pre-render pages 2..N so they are ISR-cached rather than rendered per
// request. A page beyond today's count (more posts later) still resolves on
// demand; it just isn't pre-built.
export async function generateStaticParams() {
  const total = totalPagesFor((await listPublished()).length);
  return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({ page: String(i + 2) }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { page: raw } = await params;
  const page = parsePageParam(raw);
  if (!page || page < 2) return { title: "Blog", robots: { index: false, follow: true } };

  // Inherit the /blog defaults (description, OG, Twitter) and override only
  // what must be unique per page: title and a self-referencing canonical.
  const base = await buildPageMetadata("/blog");
  const baseTitle = typeof base.title === "string" ? base.title : "Firmity Blog";
  const title = `${baseTitle} — Page ${page}`;
  const url = canonical(`/blog/page/${page}`);
  return {
    ...base,
    title,
    alternates: { canonical: url },
    openGraph: { ...base.openGraph, title, url },
    twitter: { ...base.twitter, title },
  };
}

export default async function BlogPageN({ params }: RouteParams) {
  const { page: raw } = await params;
  const page = parsePageParam(raw);
  if (!page) notFound();
  if (page === 1) permanentRedirect("/blog");

  const cards = (await listPublished()).map(toCardData);
  if (page > totalPagesFor(cards.length)) notFound();

  const slice = sliceForPage(cards, page);
  return (
    <BlogIndex
      posts={slice.items}
      searchIndex={cards}
      pagination={{ page: slice.page, totalPages: slice.totalPages }}
      breadcrumbOverride={[
        { label: "Blog", href: "/blog" },
        { label: `Page ${slice.page}`, href: `/blog/page/${slice.page}` },
      ]}
    />
  );
}
