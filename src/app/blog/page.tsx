// Server component: reads PUBLISHED posts from Supabase and hands them to the
// client index view. ISR keeps the list fresh without a redeploy when the
// marketing team publishes from /blog-admin.
import { listPublished } from "@/src/lib/blog";
import { BlogIndex, type Card } from "@/src/components/blog/blog-index";

export const revalidate = 60;

function monthYear(iso: string | null): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch {
    return "";
  }
}

export default async function BlogPage() {
  const posts = await listPublished();
  const cards: Card[] = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.subtitle || p.meta_description || "",
    category: p.category || "Article",
    readTime: p.read_time || "",
    date: monthYear(p.published_at),
    cover: p.cover_image_url,
  }));
  return <BlogIndex posts={cards} />;
}
