#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// One-time migration: import the 4 existing app/blog/<slug>/page.mdx articles
// into the blog_posts table so they show on /blog and become editable in the CMS.
// After it succeeds, delete the 4 .mdx folders (see the printed instructions) so
// /blog/[slug] serves them from the DB — one source of truth.
//
// Requires env: SUPABASE_URL, SUPABASE_SERVICE_KEY
// Requires deps: npm i -D marked            (@supabase/supabase-js already present)
//
// Run:  node scripts/migrate-blog-mdx.mjs
// ─────────────────────────────────────────────────────────────────────────────

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, "..", "src", "app", "blog");

// slug -> presentation metadata (matches the earlier /blog index).
const META = {
  "spreadsheets-to-cmms":            { category: "Guide",          daysAgo: 2 },
  "predictive-maintenance-ai":       { category: "Best Practices", daysAgo: 6 },
  "mobile-first-technician-adoption":{ category: "Case Study",     daysAgo: 20 },
  "cloud-vs-onprem-multisite":       { category: "Guide",          daysAgo: 26 },
};

const ALLOWED = {
  allowedTags: ["p","br","hr","h1","h2","h3","h4","strong","b","em","i","u","s","ul","ol","li","blockquote","a","img","code","pre"],
  allowedAttributes: { a: ["href","target","rel"], img: ["src","alt","title"] },
  allowedSchemes: ["http","https","mailto"],
};

function parseMdx(raw) {
  const titleMatch = raw.match(/title:\s*["'`]([^"'`]+)["'`]/);
  const descMatch = raw.match(/description:\s*\n?\s*["'`]([^"'`]+)["'`]/);
  const title = (titleMatch?.[1] || "Untitled").replace(/\s*\|\s*Firmity\s*$/, "").trim();
  const subtitle = (descMatch?.[1] || "").trim();

  // Body = between the BlogPostShell tags, minus the leading "# H1" (it's the title).
  let body = raw;
  const open = raw.indexOf("<BlogPostShell>");
  const close = raw.lastIndexOf("</BlogPostShell>");
  if (open !== -1 && close !== -1) body = raw.slice(open + "<BlogPostShell>".length, close);
  body = body.replace(/^\s*#\s+.*$/m, "").trim(); // drop the duplicate H1

  const html = sanitizeHtml(marked.parse(body, { async: false }), ALLOWED);
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  const read_time = `${Math.max(1, Math.round(words / 200))} min read`;
  return { title, subtitle, html, read_time };
}

async function main() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) {
    console.error("[CONFIG_ERR] SUPABASE_URL / SUPABASE_SERVICE_KEY must be set.");
    process.exit(1);
  }
  const db = createClient(url, key, { auth: { persistSession: false } });

  for (const [slug, m] of Object.entries(META)) {
    const file = path.join(BLOG_DIR, slug, "page.mdx");
    let raw;
    try {
      raw = await readFile(file, "utf-8");
    } catch {
      console.warn(`! skip ${slug} — ${file} not found`);
      continue;
    }
    const { title, subtitle, html, read_time } = parseMdx(raw);
    const published_at = new Date(Date.now() - m.daysAgo * 86400000).toISOString();

    const { error } = await db
      .from("blog_posts")
      .upsert(
        { slug, title, subtitle, content_html: html, category: m.category, read_time, status: "published", published_at },
        { onConflict: "slug" },
      );
    if (error) console.error(`✗ ${slug}: ${error.message}`);
    else console.log(`✓ migrated ${slug} — "${title}" (${read_time})`);
  }

  console.log("\nDone. Next: delete the 4 MDX folders so /blog/[slug] serves from the DB:");
  console.log("  rm -r src/app/blog/spreadsheets-to-cmms src/app/blog/predictive-maintenance-ai \\");
  console.log("        src/app/blog/mobile-first-technician-adoption src/app/blog/cloud-vs-onprem-multisite");
}

main().catch((e) => {
  console.error("[MIGRATE_ERR]", e);
  process.exit(1);
});
