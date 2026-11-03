// On-demand ISR invalidation. Pages now carry a long safety-net TTL (24h, see
// the `export const revalidate` lines); anything an admin edits is pushed live
// here instead of waiting for a timer. revalidatePath only marks entries stale
// — the regeneration (and the metered ISR write) happens lazily on the next
// visit, so calling these is cheap and never rebuilds pages nobody requests.
import "server-only";
import { revalidatePath } from "next/cache";

interface BlogRevalidateOptions {
  /** Slug(s) of the post(s) that changed. Their detail pages are purged. */
  slugs?: Array<string | null | undefined>;
  /** Purge every post page — only for shared data (author bio, category
   * rename) that is rendered inside all posts. Rare; leave off for edits. */
  allPosts?: boolean;
}

/** Everything that renders from blog_posts / blog_categories / blog_authors. */
export function revalidateBlog({ slugs = [], allPosts = false }: BlogRevalidateOptions = {}): void {
  try {
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/blog/page/[page]", "page");
    revalidatePath("/blog/category/[slug]", "page");
    revalidatePath("/blog/rss.xml");
    revalidatePath("/sitemap.xml");
    revalidatePath("/api/blog/latest");
    revalidatePath("/api/blog/case-studies");
    revalidatePath("/api/search");
    if (allPosts) revalidatePath("/blog/[slug]", "page");
    for (const slug of new Set(slugs.filter((s): s is string => Boolean(s)))) {
      revalidatePath(`/blog/${slug}`);
    }
  } catch (err) {
    // Never fail an admin save because cache invalidation hiccupped; the
    // 24h TTL still converges.
    console.error("[REVALIDATE_ERR] blog", err);
  }
}

/** SEO overrides feed metadata + JSON-LD on every page and the root layout. */
export function revalidateSeo(): void {
  try {
    revalidatePath("/", "layout");
    revalidatePath("/sitemap.xml");
    revalidatePath("/robots.txt");
  } catch (err) {
    console.error("[REVALIDATE_ERR] seo", err);
  }
}
