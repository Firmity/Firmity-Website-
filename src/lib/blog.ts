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
  author: string | null;
  /** FK into blog_authors — set when the post is attributed to a reusable author profile (2026-09-23). Nullable: older posts, or ones where the marketer only typed a name, have this null and just show `author` as plain text. */
  author_id: string | null;
  read_time: string | null;
  meta_description: string | null;
  status: "draft" | "published";
  published_at: string | null;
  /** Marketer-editable "Last updated" stamp shown at the end of the article (2026-09-23) — deliberately separate from `updated_at` below, which is DB housekeeping (drives the admin dashboard's sort) and shouldn't be perturbed by a backdated/forward-dated editorial override. */
  content_updated_at: string | null;
  /** Optional FAQ block shown at the end of the article + emitted as FAQPage JSON-LD (2026-09-23). Empty array when none were added — the section simply doesn't render. */
  faqs: BlogFaq[];
  /** Editable FAQ section heading (2026-09-23) — e.g. "FAQs: Preventive Maintenance". Null/blank falls back to the literal "FAQs" (see BlogFaqSection). */
  faq_title: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogFaq {
  q: string;
  a: string;
}

export interface BlogPostInput {
  id?: string;
  slug?: string;
  title: string;
  subtitle?: string;
  cover_image_url?: string | null;
  content_html: string;
  category?: string;
  author?: string;
  author_id?: string | null;
  read_time?: string;
  meta_description?: string;
  status: "draft" | "published";
  /** Optional publish date (YYYY-MM-DD or ISO). When set, overrides the auto stamp. */
  published_at?: string | null;
  /** Optional "last updated" date (YYYY-MM-DD or ISO) shown on the article. Defaults to now when omitted — see content_updated_at on BlogPost. */
  content_updated_at?: string | null;
  /** Optional FAQ list — empty/blank q or a pairs are dropped on save (see upsertPost). */
  faqs?: BlogFaq[];
  /** Optional FAQ section heading override — blank/omitted keeps the "FAQs" default. */
  faq_title?: string | null;
}

/** Card shape shared by the /blog index, /blog/category/[slug], and the
 * end-of-post "More on <category>" section (2026-09-23) — the same fields
 * blog/page.tsx was already hand-mapping before this existed, now
 * centralised so every read site formats dates/fallbacks identically. */
export interface BlogCardData {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  cover: string | null;
}

/** "Jan 2026" — the card `date` field above. */
export function monthYear(iso: string | null): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch {
    return "";
  }
}

function toCardData(p: BlogPost): BlogCardData {
  return {
    slug: p.slug,
    title: p.title,
    description: p.subtitle || p.meta_description || "",
    category: p.category || "Article",
    readTime: p.read_time || "",
    date: monthYear(p.published_at),
    cover: p.cover_image_url,
  };
}

/** Same slug rule as post slugs (lowercase, dashes) — reused so a category
 * name like "CAFM" or "Case Study" gets a stable, readable URL segment
 * ("cafm", "case-study") without a separate column to store one in. */
export function categorySlug(category: string): string {
  return slugify(category);
}

const TABLE = "blog_posts";

/** Normalize a "YYYY-MM-DD"/ISO string to a full ISO timestamp; null if invalid/empty. */
function toIsoOrNull(v: string | null | undefined): string | null {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d.toISOString();
}

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

/** First ~155 chars of plain text — used to auto-fill an SEO meta description. */
export function excerptFromHtml(html: string): string {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return "";
  return text.length <= 155 ? text : text.slice(0, 152).replace(/\s+\S*$/, "") + "…";
}

export interface BlogTocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Injects an `id` into every <h2>/<h3> in already-sanitized post HTML and
 * returns both the modified HTML and the matching table-of-contents list
 * (2026-09-23) — replaces the old "More from the blog" sidebar with
 * in-page section links (see blog-post-shell.tsx), per request: "instead
 * of showing other blogs, we will show section titles from the opened
 * blog itself and when any title is clicked... scroll to that section."
 *
 * A single regex pass is safe here (not a real HTML parser) because
 * sanitizeContent's allowedTags guarantee headings only ever contain
 * inline children (strong/em/a/etc, never a nested h2/h3) and never carry
 * attributes of their own — the Tiptap toolbar only emits bare
 * <h2>/<h3>text</h2>. */
export function extractToc(html: string): { html: string; toc: BlogTocItem[] } {
  const toc: BlogTocItem[] = [];
  const seen = new Map<string, number>();
  const out = html.replace(/<(h[23])(\s[^>]*)?>([\s\S]*?)<\/\1>/gi, (match, tag: string, attrs: string | undefined, inner: string) => {
    const text = inner
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&quot;/gi, '"')
      .replace(/&#0?39;/gi, "'")
      .replace(/\s+/g, " ")
      .trim();
    if (!text) return match; // an empty heading has nothing to link to or label a TOC row with

    let id = slugify(text);
    const priorCount = seen.get(id) ?? 0;
    seen.set(id, priorCount + 1);
    if (priorCount > 0) id = `${id}-${priorCount + 1}`; // de-dupe two headings with the same text

    toc.push({ id, text, level: tag.toLowerCase() === "h3" ? 3 : 2 });
    return `<${tag} id="${id}"${attrs ?? ""}>${inner}</${tag}>`;
  });
  return { html: out, toc };
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
    author: input.author?.trim() || null,
    author_id: input.author_id || null,
    read_time: input.read_time?.trim() || estimateReadTime(content_html),
    // Auto-generate an SEO description from the article body when none is given.
    meta_description: input.meta_description?.trim() || excerptFromHtml(content_html) || null,
    status: input.status,
    // Trim and drop any row where the question or answer was left blank —
    // the studio lets you add a row and not finish it; a half-filled FAQ
    // would otherwise ship broken structured data (a Question with an
    // empty acceptedAnswer.text, or vice versa).
    faqs: Array.isArray(input.faqs)
      ? input.faqs
          .map((f) => ({ q: (f.q ?? "").trim(), a: (f.a ?? "").trim() }))
          .filter((f) => f.q && f.a)
      : [],
    faq_title: input.faq_title?.trim() || null,
  };

  // A user-chosen date always wins; otherwise fall back to the auto stamp.
  const chosen = toIsoOrNull(input.published_at);
  // "Last updated" is a plain editable field, not sticky like published_at
  // above — the studio always sends a value (defaulting the form to today
  // for a post that's never had one), so this only falls back to "now" for
  // callers that omit it entirely (e.g. a future non-studio caller).
  const content_updated_at = toIsoOrNull(input.content_updated_at) ?? new Date().toISOString();

  if (input.id) {
    // On update: stamp published_at the first time it goes live.
    const existing = await getById(input.id);
    const published_at =
      chosen ??
      (input.status === "published" ? existing?.published_at ?? new Date().toISOString() : existing?.published_at ?? null);
    const { data, error } = await db
      .from(TABLE)
      .update({ ...base, published_at, content_updated_at })
      .eq("id", input.id)
      .select("*")
      .single();
    if (error) throw new Error(`[BLOG_DB_ERR] update: ${error.message}`);
    return data as BlogPost;
  }

  const published_at = chosen ?? (input.status === "published" ? new Date().toISOString() : null);
  const { data, error } = await db
    .from(TABLE)
    .insert({ ...base, published_at, content_updated_at })
    .select("*")
    .single();
  if (error) throw new Error(`[BLOG_DB_ERR] insert: ${error.message}`);
  return data as BlogPost;
}

/** All published posts in one category, newest first — backs
 * /blog/category/[slug]/page.tsx. `category` must be the exact stored
 * label (case-sensitive) — resolve it via listCategories() first, not the
 * URL slug directly (categorySlug() is one-way). */
export async function listPublishedByCategory(category: string): Promise<BlogCardData[]> {
  const { data, error } = await getSupabaseAdmin()
    .from(TABLE)
    .select("*")
    .eq("status", "published")
    .eq("category", category)
    .order("published_at", { ascending: false });
  if (error) {
    console.error("[BLOG_DB_ERR] listPublishedByCategory", error);
    return [];
  }
  return ((data ?? []) as BlogPost[]).map(toCardData);
}

/** Up to `limit` OTHER published posts sharing a category — feeds the
 * end-of-post "More on <category>" section (2026-09-23,
 * components/blog/related-posts-section.tsx). Returns [] when the post has
 * no category — "related by category" is meaningless without one, and an
 * empty array already renders nothing (see that component). */
export async function listRelatedByCategory(
  category: string | null,
  excludeSlug: string,
  limit = 3,
): Promise<BlogCardData[]> {
  if (!category) return [];
  const { data, error } = await getSupabaseAdmin()
    .from(TABLE)
    .select("*")
    .eq("status", "published")
    .eq("category", category)
    .neq("slug", excludeSlug)
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("[BLOG_DB_ERR] listRelatedByCategory", error);
    return [];
  }
  return ((data ?? []) as BlogPost[]).map(toCardData);
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
