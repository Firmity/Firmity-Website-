// Server component: reads PUBLISHED posts from Supabase and hands them to the
// client index view. Page 1 of the paginated index (6 posts per page — see
// src/lib/blog-pagination.ts); pages 2+ live at /blog/page/[page].
// On-demand revalidation (src/lib/revalidate.ts) keeps it fresh when the
// marketing team publishes from /blog-admin; the TTL is only a safety net.
import { listPublished, toCardData } from "@/src/lib/blog";
import { sliceForPage } from "@/src/lib/blog-pagination";
import { BlogIndex } from "@/src/components/blog/blog-index";

export const revalidate = 86400;

export default async function BlogPage() {
  const cards = (await listPublished()).map(toCardData);
  const { items, page, totalPages } = sliceForPage(cards, 1);
  // `searchIndex` carries every card so the sidebar search/topic filters keep
  // working across the whole blog even though only one page is rendered.
  return <BlogIndex posts={items} searchIndex={cards} pagination={{ page, totalPages }} />;
}
