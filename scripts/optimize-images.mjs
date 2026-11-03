#!/usr/bin/env node
// Image optimizer for the Firmity site. One script, three jobs.
//
//   --public [--check] [--quiet]   Compress oversize PNG/JPG under public/ IN PLACE
//                                  (same filename + format, so no code changes are
//                                  ever needed). Only files that are referenced from
//                                  src/ are touched. Idempotent: a file already under
//                                  budget, or that wouldn't shrink >=15%, is skipped.
//                                  Runs automatically before every build (see the
//                                  "prebuild" npm script). --check reports, never writes.
//   --webp <file...>               Write a WebP twin next to each file (one-off, when a
//                                  page should switch to a modern format).
//   --blog [--apply]               Audit the Supabase "blog-media" bucket. Without
//                                  --apply it only reports. With --apply it re-encodes
//                                  oversize objects at the SAME path (URLs never change)
//                                  after saving the originals to .image-backups/.
//
// New blog uploads are already compressed at upload time
// (src/app/api/blog-admin/upload/route.ts); --blog exists to clean up what was
// uploaded before that and to re-audit on demand.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const args = new Set(process.argv.slice(2));
const QUIET = args.has("--quiet");

// Budgets. Display widths on the site top out around 1100px, so 2000px max covers
// 2x screens for everything except full-bleed heroes, which are still fine at 2000.
const PUBLIC_BUDGET_KB = 300;
const MAX_DIMENSION = 2000;
const BLOG_BUDGET_KB = 200;
const BLOG_MAX_WIDTH = 1600;
const WEBP_QUALITY = 78;
const MIN_SAVING = 0.15;

const log = (...a) => { if (!QUIET) console.log(...a); };
const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

function loadEnv() {
  const file = path.join(ROOT, ".env");
  if (!fs.existsSync(file)) return {};
  return Object.fromEntries(
    fs.readFileSync(file, "utf8").split(/\r?\n/)
      .filter((l) => l && !l.startsWith("#") && l.includes("="))
      .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim().replace(/^["']|["']$/g, "")]),
  );
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

/** All source text, concatenated, to answer "is this public file referenced?". */
function readSources() {
  const exts = new Set([".ts", ".tsx", ".js", ".jsx", ".mdx", ".md", ".css", ".json"]);
  const chunks = [];
  for (const dir of ["src", "app"]) {
    const full = path.join(ROOT, dir);
    if (!fs.existsSync(full)) continue;
    for (const f of walk(full)) if (exts.has(path.extname(f)) && !path.basename(f).startsWith(".fuse_hidden")) chunks.push(fs.readFileSync(f, "utf8"));
  }
  return chunks.join("\n");
}

async function recompress(buf, ext) {
  const base = sharp(buf).rotate().resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: "inside", withoutEnlargement: true });
  if (ext === ".png") return base.png({ palette: true, quality: 80, effort: 8, compressionLevel: 9 }).toBuffer();
  return base.jpeg({ mozjpeg: true, quality: 80 }).toBuffer();
}

async function runPublic() {
  const publicDir = path.join(ROOT, "public");
  if (!fs.existsSync(publicDir)) return 0;
  const sources = readSources();
  const check = args.has("--check");
  let saved = 0, touched = 0, flagged = 0;

  for (const file of walk(publicDir)) {
    const ext = path.extname(file).toLowerCase();
    if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;
    const rel = path.relative(publicDir, file).split(path.sep).join("/");
    const size = fs.statSync(file).size;
    if (size <= PUBLIC_BUDGET_KB * 1024) continue;
    if (!sources.includes(`/${rel}`)) continue; // unreferenced: costs visitors nothing, don't spend build time
    try {
      const before = fs.readFileSync(file);
      const after = await recompress(before, ext);
      if (after.length > before.length * (1 - MIN_SAVING)) continue; // not worth it / already optimal
      flagged++;
      if (check) { log(`would shrink /${rel}: ${kb(before.length)} -> ${kb(after.length)}`); continue; }
      fs.writeFileSync(file, after);
      saved += before.length - after.length; touched++;
      log(`optimized /${rel}: ${kb(before.length)} -> ${kb(after.length)}`);
    } catch (err) {
      console.warn(`[IMG_WARN] could not optimize /${rel}: ${err.message}`);
    }
  }
  log(check ? `${flagged} file(s) over budget.` : `public/: ${touched} file(s) optimized, ${kb(saved)} saved.`);
  return check ? flagged : 0;
}

async function runWebp() {
  const files = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  for (const f of files) {
    const abs = path.resolve(ROOT, f);
    const out = abs.replace(/\.(png|jpe?g)$/i, ".webp");
    const buf = await sharp(fs.readFileSync(abs)).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80, effort: 6 }).toBuffer();
    fs.writeFileSync(out, buf);
    console.log(`${path.relative(ROOT, abs)} (${kb(fs.statSync(abs).size)}) -> ${path.relative(ROOT, out)} (${kb(buf.length)})`);
  }
}

async function listAll(sb, bucket, prefix = "") {
  const out = [];
  const { data, error } = await sb.storage.from(bucket).list(prefix, { limit: 1000 });
  if (error) throw error;
  for (const it of data ?? []) {
    const p = prefix ? `${prefix}/${it.name}` : it.name;
    if (it.id === null) out.push(...(await listAll(sb, bucket, p)));
    else out.push({ path: p, size: it.metadata?.size ?? 0, mime: it.metadata?.mimetype ?? "" });
  }
  return out;
}

async function runBlog() {
  const { createClient } = await import("@supabase/supabase-js");
  const env = { ...loadEnv(), ...process.env };
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_KEY) throw new Error("SUPABASE_URL / SUPABASE_SERVICE_KEY missing");
  const sb = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY, { auth: { persistSession: false } });
  const BUCKET = "blog-media";
  const apply = args.has("--apply");

  const objects = await listAll(sb, BUCKET);
  const total = objects.reduce((a, o) => a + o.size, 0);
  const over = objects.filter((o) => o.size > BLOG_BUDGET_KB * 1024 && /image\/(png|jpe?g|webp)/.test(o.mime));
  console.log(`${objects.length} objects, ${(total / 1048576).toFixed(1)} MB total; ${over.length} over ${BLOG_BUDGET_KB} KB.`);
  // Two cases:
  //  - .webp objects: re-encoded IN PLACE (same path, so no URL changes).
  //  - PNG/JPG objects: a NEW sibling .webp is uploaded and every reference in
  //    blog_posts / blog_authors is rewritten to it. The old object is left
  //    untouched, so pages cached with the old URL keep working.
  const publicUrl = (p) => sb.storage.from(BUCKET).getPublicUrl(p).data.publicUrl;
  const rewrites = []; // { from: oldUrl, to: newUrl }
  let before = 0, after = 0, changed = 0;

  // Only optimize what a visitor can actually load: objects referenced by a post
  // or author. Orphans (old uploads nothing points to) cost visitors nothing.
  const { data: refPosts } = await sb.from("blog_posts").select("cover_image_url,content_html");
  const { data: refAuthors } = await sb.from("blog_authors").select("avatar_url");
  const haystack = [
    ...(refPosts ?? []).flatMap((p) => [p.cover_image_url, p.content_html]),
    ...(refAuthors ?? []).map((a) => a.avatar_url),
  ].filter(Boolean).join("\n");
  const orphans = [];

  for (const o of over) {
    if (!haystack.includes(publicUrl(o.path))) { orphans.push(o); continue; }
    const inPlace = o.path.endsWith(".webp");
    const target = inPlace ? o.path : o.path.replace(/\.(png|jpe?g)$/i, ".webp");
    const { data, error } = await sb.storage.from(BUCKET).download(o.path);
    if (error) { console.warn(`[IMG_WARN] download ${o.path}: ${error.message}`); continue; }
    const src = Buffer.from(await data.arrayBuffer());
    const out = await sharp(src).rotate().resize({ width: BLOG_MAX_WIDTH, withoutEnlargement: true }).webp({ quality: WEBP_QUALITY, effort: 6 }).toBuffer();
    if (out.length > src.length * (1 - MIN_SAVING)) { console.log(`skip   ${o.path} (${kb(src.length)}; no meaningful saving)`); continue; }
    before += src.length; after += out.length; changed++;
    console.log(`${apply ? "write " : "would "} ${o.path}${inPlace ? "" : ` -> ${target}`}: ${kb(src.length)} -> ${kb(out.length)}`);
    if (!inPlace) rewrites.push({ from: publicUrl(o.path), to: publicUrl(target) });
    if (!apply) continue;
    const backup = path.join(ROOT, ".image-backups", BUCKET, o.path);
    fs.mkdirSync(path.dirname(backup), { recursive: true });
    fs.writeFileSync(backup, src); // original first, write second
    const { error: upErr } = await sb.storage.from(BUCKET).upload(target, out, { contentType: "image/webp", cacheControl: "31536000", upsert: inPlace });
    if (upErr) { console.warn(`[IMG_WARN] upload ${target}: ${upErr.message}`); rewrites.pop(); }
  }

  // Rewrite references (only for objects whose new copy was actually uploaded).
  if (rewrites.length) {
    const swap = (s) => (typeof s === "string" ? rewrites.reduce((acc, r) => acc.split(r.from).join(r.to), s) : s);
    const { data: posts, error: pErr } = await sb.from("blog_posts").select("id,slug,cover_image_url,content_html");
    if (pErr) throw pErr;
    let rows = 0;
    for (const p of posts ?? []) {
      const next = { cover_image_url: swap(p.cover_image_url), content_html: swap(p.content_html) };
      if (next.cover_image_url === p.cover_image_url && next.content_html === p.content_html) continue;
      rows++;
      console.log(`${apply ? "update" : "would update"} blog_posts: ${p.slug}`);
      if (apply) {
        const { error } = await sb.from("blog_posts").update(next).eq("id", p.id);
        if (error) console.warn(`[IMG_WARN] update ${p.slug}: ${error.message}`);
      }
    }
    const { data: authors } = await sb.from("blog_authors").select("id,name,avatar_url");
    for (const a of authors ?? []) {
      const next = swap(a.avatar_url);
      if (next === a.avatar_url) continue;
      rows++;
      console.log(`${apply ? "update" : "would update"} blog_authors: ${a.name}`);
      if (apply) await sb.from("blog_authors").update({ avatar_url: next }).eq("id", a.id);
    }
    console.log(`${rows} database row(s) reference the converted images.`);
  }

  if (orphans.length) {
    const orphanBytes = orphans.reduce((a, o) => a + o.size, 0);
    console.log(`Skipped ${orphans.length} unreferenced oversize object(s) (${(orphanBytes / 1048576).toFixed(1)} MB in storage, never served): safe to delete from the dashboard if you want the space back.`);
  }
  console.log(`${apply ? "Optimized" : "Could optimize"} ${changed} object(s): ${kb(before)} -> ${kb(after)} (saves ${kb(before - after)}).`);
  if (!apply && changed) console.log("Re-run with --apply to write (originals are backed up to .image-backups/).");
  if (apply && rewrites.length) console.log("Deploy (or save any post) so cached pages pick up the new image URLs.");
}

(async () => {
  try {
    if (args.has("--public")) process.exitCode = (await runPublic()) && args.has("--check") ? 1 : 0;
    else if (args.has("--webp")) await runWebp();
    else if (args.has("--blog")) await runBlog();
    else console.log("Usage: --public [--check] [--quiet] | --webp <files> | --blog [--apply]");
  } catch (err) {
    console.error(`[IMG_ERR] ${err.message}`);
    // The build must never fail because an optional optimization did.
    process.exitCode = args.has("--public") ? 0 : 1;
  }
})();
