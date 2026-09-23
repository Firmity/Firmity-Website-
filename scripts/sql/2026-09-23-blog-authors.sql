-- Firmity blog: reusable author profiles + editable "Last updated" stamp.
-- Run once in the Supabase SQL editor (Project -> SQL Editor -> New query).
-- Idempotent — safe to re-run if something fails partway through.
--
-- Companion code: src/lib/blog-authors.ts, src/lib/blog.ts (author_id /
-- content_updated_at on BlogPost), src/app/api/blog-admin/authors/route.ts,
-- and the new "Author" section in blog-admin/editor/editor-client.tsx.

-- 1. Author profiles (name, avatar, bio, LinkedIn) — entered once in
--    /blog-admin, reused across every post attributed to that person,
--    instead of retyping bio/avatar/LinkedIn on every post by the same
--    person.
create table if not exists blog_authors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  avatar_url text,
  bio text,
  linkedin_url text,
  created_at timestamptz not null default now()
);

-- 2. Posts can point at an author profile. Nullable + ON DELETE SET NULL:
--    deleting an author profile never deletes or breaks their old posts —
--    it just drops the new end-of-post bio card on those posts until
--    they're re-attributed to someone. The existing plain-text
--    `blog_posts.author` column is untouched by any of this and keeps
--    driving the byline/JSON-LD exactly as it does today.
alter table blog_posts
  add column if not exists author_id uuid references blog_authors(id) on delete set null;

-- 3. Marketer-editable "Last updated" stamp shown at the end of the
--    article, alongside the publish date. Deliberately a NEW column,
--    separate from `updated_at` (that one is DB housekeeping the admin
--    dashboard sorts by) — so backdating/forward-dating this for
--    editorial reasons can never reshuffle the post list in /blog-admin.
alter table blog_posts
  add column if not exists content_updated_at timestamptz;

-- NOTE on Row Level Security: every read/write of blog_authors and
-- blog_posts from the app goes through the Supabase service-role key
-- (src/lib/supabase-admin.ts), which bypasses RLS entirely — same as
-- blog_categories already does. If you have RLS turned on for this
-- project and want it enabled on blog_authors too for defense in depth,
-- mirror whatever policy (or lack of one) you used for blog_categories;
-- nothing here requires an anon-facing policy since the public blog pages
-- read through server code, never directly from the browser.
