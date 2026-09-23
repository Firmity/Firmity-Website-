-- Firmity blog: optional end-of-post FAQ list, editable per-post from the
-- marketing studio. Run once in the Supabase SQL editor (Project -> SQL
-- Editor -> New query). Idempotent — safe to re-run.
--
-- Companion code: src/lib/blog.ts (BlogFaq / upsertPost sanitization),
-- src/lib/seo.ts (faqJsonLd), src/components/blog/blog-faq-section.tsx
-- (the crawler-safe accordion, same `hidden`-attribute technique as the
-- homepage FAQ), and the new "FAQs" section in
-- blog-admin/editor/editor-client.tsx.

-- Stored as a JSONB array of {q, a} objects, e.g.
--   [{"q": "Is this free?", "a": "Yes, for the first 14 days."}]
-- Defaults to an empty array — never null — so every read site (the
-- public page, the editor) can treat "no FAQs" as a plain empty list
-- instead of also handling a null case.
alter table blog_posts
  add column if not exists faqs jsonb not null default '[]'::jsonb;

-- NOTE on Row Level Security: same as blog_authors/blog_categories — all
-- reads/writes go through the Supabase service-role key
-- (src/lib/supabase-admin.ts), which bypasses RLS. Nothing here requires
-- an anon-facing policy.
