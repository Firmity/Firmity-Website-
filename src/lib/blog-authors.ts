// Reusable author profiles (2026-09-23) — a small marketer-managed roster
// (name, avatar, bio, LinkedIn) picked per post from blog-admin/editor, so
// the same person's bio/avatar/LinkedIn is entered once and reused across
// every post they're attributed to, instead of retyped per post. Keeps the
// same server-only / service-role pattern as blog.ts (blog_authors has no
// anon access either).
import "server-only";
import { getSupabaseAdmin } from "./supabase-admin";

export interface BlogAuthor {
  id: string;
  name: string;
  avatar_url: string | null;
  bio: string | null;
  linkedin_url: string | null;
  created_at: string;
}

export interface BlogAuthorInput {
  id?: string;
  name: string;
  avatar_url?: string | null;
  bio?: string | null;
  linkedin_url?: string | null;
}

const TABLE = "blog_authors";

export async function listAuthors(): Promise<BlogAuthor[]> {
  const { data, error } = await getSupabaseAdmin().from(TABLE).select("*").order("name");
  if (error) {
    console.error("[BLOG_DB_ERR] listAuthors", error);
    return [];
  }
  return (data ?? []) as BlogAuthor[];
}

export async function getAuthorById(id: string): Promise<BlogAuthor | null> {
  const { data } = await getSupabaseAdmin().from(TABLE).select("*").eq("id", id).maybeSingle();
  return (data as BlogAuthor) ?? null;
}

export async function upsertAuthor(input: BlogAuthorInput): Promise<BlogAuthor> {
  const db = getSupabaseAdmin();
  const name = input.name.trim();
  if (!name) throw new Error("[BLOG_DB_ERR] upsertAuthor: name is required");
  const base = {
    name,
    avatar_url: input.avatar_url || null,
    bio: input.bio?.trim() || null,
    linkedin_url: input.linkedin_url?.trim() || null,
  };

  if (input.id) {
    const { data, error } = await db.from(TABLE).update(base).eq("id", input.id).select("*").single();
    if (error) throw new Error(`[BLOG_DB_ERR] updateAuthor: ${error.message}`);
    return data as BlogAuthor;
  }

  const { data, error } = await db.from(TABLE).insert(base).select("*").single();
  if (error) throw new Error(`[BLOG_DB_ERR] insertAuthor: ${error.message}`);
  return data as BlogAuthor;
}

/** Deletes the author profile only — posts previously attributed to them keep
 * their plain-text `author` name (blog_posts.author_id -> null via FK ON
 * DELETE SET NULL, see the migration SQL), they just lose the end-of-post
 * bio card until re-attributed. */
export async function deleteAuthor(id: string): Promise<void> {
  const { error } = await getSupabaseAdmin().from(TABLE).delete().eq("id", id);
  if (error) throw new Error(`[BLOG_DB_ERR] deleteAuthor: ${error.message}`);
}
