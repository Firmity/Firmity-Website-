// Blog data layer (server-only). All reads/writes use the Supabase service-role
// key via getSupabaseAdmin — the blog_posts table has no anon access.
import "server-only";
import sanitizeHtml from "sanitize-html";
import { getSupabaseAdmin } from "./supabase-admin";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  cover_image_url: string | null;
  content_html: string;
  category: string | null;
  read_time: string | null;
  meta_description: string | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPostInput {
  id?: string;
  slug?: string;
  title: string;
  subtitle?: string;
  cover_image_url?: string | null;
  content_html: string;
  category?: string;
  read_time?: string;
  meta_description?: string;
  status: "draft" | "published";
}

const TABLE = "blog_posts";

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || `post-${Date.now()}`;
}

// Allow exactly what the Tiptap toolbar can produce — nothing else survives.
// This is the XSS boundary: never render content_html without passing through here.
export function sanitizeContent(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "hr", "h1", "h2", "h3", "h4",
      "strong", "b", "em", "i", "u", "s", "strike",
      "ul", "ol", "li", "blockquote", "a", "img", "code", "pre", "figure", "figcaption",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      // Force safe link attrs on every anchor.
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer nofollow" }),
    },
  });
}

/** Roughly estimate reading time from HTML text (~200 wpm). */
export function estimateReadTime(html: string): string {
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export async function listPublished(): Promise<BlogPost[]> {
  const { data, error } = await getSupabaseAdmin()
    .from(TABLE)
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) {
    console.error("[BLOG_DB_ERR] listPublished", error);
    return [];
  }
  return (data ?? []) as BlogPost[];
}

export async function listAll(): Promise<BlogPost[]> {
  const { data, error } = await getSupabaseAdmin()
    .from(TABLE)
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw new Error(`[BLOG_DB_ERR] listAll: ${error.message}`);
  return (data ?? []) as BlogPost[];
}

export async function getBySlug(slug: string): Promise<BlogPost | null> {
  const { data } = await getSupabaseAdmin().from(TABLE).select("*").eq("slug", slug).maybeSingle();
  return (data as BlogPost) ?? null;
}

export async function getById(id: string): Promise<BlogPost | null> {
  const { data } = await getSupabaseAdmin().from(TABLE).select("*").eq("id", id).maybeSingle();
  return (data as BlogPost) ?? null;
}

/** Create or update a post. Sanitizes content, derives slug + published_at. */
export async function upsertPost(input: BlogPostInput): Promise<BlogPost> {
  const db = getSupabaseAdmin();
  const content_html = sanitizeContent(input.content_html || "");
  const slug = (input.slug && slugify(input.slug)) || slugify(input.title);

  const base = {
    slug,
    title: input.title.trim(),
    subtitle: input.subtitle?.trim() || null,
    cover_image_url: input.cover_image_url || null,
    content_html,
    category: input.category?.trim() || null,
    read_time: input.read_time?.trim() || estimateReadTime(content_html),
    meta_description: input.meta_description?.trim() || null,
    status: input.status,
  };

  if (input.id) {
    // On update: stamp published_at the first time it goes live.
    const existing = await getById(input.id);
    const published_at =
      input.status === "published" ? existing?.published_at ?? new Date().toISOString() : existing?.published_at ?? null;
    const { data, error } = await db
      .from(TABLE)
      .update({ ...base, published_at })
      .eq("id", input.id)
      .select("*")
      .single();
    if (error) throw new Error(`[BLOG_DB_ERR] update: ${error.message}`);
    return data as BlogPost;
  }

  const published_at = input.status === "published" ? new Date().toISOString() : null;
  const { data, error } = await db
    .from(TABLE)
    .insert({ ...base, published_at })
    .select("*")
    .single();
  if (error) throw new Error(`[BLOG_DB_ERR] insert: ${error.message}`);
  return data as BlogPost;
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await getSupabaseAdmin().from(TABLE).delete().eq("id", id);
  if (error) throw new Error(`[BLOG_DB_ERR] delete: ${error.message}`);
}

/** Publish / unpublish without touching content. Keeps the original published_at. */
export async function setPostStatus(id: string, status: "draft" | "published"): Promise<void> {
  const existing = await getById(id);
  const published_at =
    status === "published" ? existing?.published_at ?? new Date().toISOString() : existing?.published_at ?? null;
  const { error } = await getSupabaseAdmin().from(TABLE).update({ status, published_at }).eq("id", id);
  if (error) throw new Error(`[BLOG_DB_ERR] setStatus: ${error.message}`);
}

// ── Categories (marketer-managed) ────────────────────────────────────────────
export async function listCategories(): Promise<string[]> {
  const { data } = await getSupabaseAdmin().from("blog_categories").select("name").order("sort_order");
  return (data ?? []).map((r: { name: string }) => r.name);
}

export async function addCategory(name: string): Promise<void> {
  const n = name.trim();
  if (!n) return;
  const { error } = await getSupabaseAdmin().from("blog_categories").upsert({ name: n }, { onConflict: "name" });
  if (error) throw new Error(`[BLOG_DB_ERR] addCategory: ${error.message}`);
}

export async function removeCategory(name: string): Promise<void> {
  const { error } = await getSupabaseAdmin().from("blog_categories").delete().eq("name", name);
  if (error) throw new Error(`[BLOG_DB_ERR] removeCategory: ${error.message}`);
}
