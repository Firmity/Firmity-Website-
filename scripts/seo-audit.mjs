#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// SEO audit — fetches every public route and reports the <title>, meta
// description, canonical, OG tags and robots directive for each, then flags
// problems (duplicate titles/descriptions, missing canonical/OG, over-long
// titles). This is the "before/after" view: run it against the OLD build to see
// every page sharing one title, then against the NEW build to see them unique.
//
// Usage:
//   node scripts/seo-audit.mjs                 # audits http://localhost:3000
//   node scripts/seo-audit.mjs https://www.firmity.in
//
// Requires Node 18+ (global fetch). No dependencies.
// ─────────────────────────────────────────────────────────────────────────────

const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");

// Public routes that SHOULD be indexed + unique. Keep in sync with sitemap.ts.
const PUBLIC_ROUTES = [
  "/", "/about", "/features", "/pricing", "/resources", "/blog", "/contact",
  "/facility-survey", "/facility-survey/book",
  "/preventive-maintenance", "/complaint-management", "/asset-management",
  "/inventory-management", "/staff-attendance", "/visitor-management", "/facility-records",
  "/industries/manufacturing", "/industries/educational", "/industries/residential",
  "/privacy", "/terms",
];

// Routes that SHOULD be noindex (private/app).
const PRIVATE_ROUTES = ["/login", "/staff-login", "/surveys", "/profile", "/settings"];

const pick = (html, re) => {
  const m = html.match(re);
  return m ? m[1].trim() : null;
};

function parse(html) {
  return {
    title: pick(html, /<title[^>]*>([^<]*)<\/title>/i),
    description: pick(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i),
    canonical: pick(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i),
    ogTitle: pick(html, /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i),
    ogImage: pick(html, /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["']/i),
    robots: pick(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i),
  };
}

async function fetchMeta(path) {
  try {
    // redirect: "manual" so a route that 3xx-redirects (e.g. /pricing -> /) is
    // reported as a redirect instead of being scored with the target's metadata
    // (which would look like a false "duplicate").
    const res = await fetch(BASE + path, { redirect: "manual" });
    if (res.status >= 300 && res.status < 400) {
      return { path, status: res.status, redirect: res.headers.get("location") || "(unknown)" };
    }
    const html = await res.text();
    return { path, status: res.status, ...parse(html) };
  } catch (e) {
    return { path, status: 0, error: String(e) };
  }
}

function line(s = "") { process.stdout.write(s + "\n"); }

const bad = (msg) => `\x1b[31m✗ ${msg}\x1b[0m`;
const ok = (msg) => `\x1b[32m✓ ${msg}\x1b[0m`;
const warn = (msg) => `\x1b[33m! ${msg}\x1b[0m`;

(async () => {
  line(`\nSEO audit → ${BASE}\n${"=".repeat(60)}`);

  const pub = [];
  for (const r of PUBLIC_ROUTES) pub.push(await fetchMeta(r));

  // Per-page detail
  for (const p of pub) {
    line(`\n${p.path}   [${p.status}]`);
    if (p.error) { line(bad(p.error)); continue; }
    if (p.redirect) { line(warn(`redirects → ${p.redirect} (excluded from checks)`)); continue; }
    line(`  title      : ${p.title ?? bad("MISSING")}`);
    line(`  description: ${p.description ? p.description.slice(0, 80) + (p.description.length > 80 ? "…" : "") : bad("MISSING")}`);
    line(`  canonical  : ${p.canonical ?? bad("MISSING")}`);
    line(`  og:title   : ${p.ogTitle ?? warn("missing")}`);
    line(`  og:image   : ${p.ogImage ?? warn("missing")}`);
    if (p.title && p.title.length > 60) line(`  ${warn(`title ${p.title.length} chars (>60 may truncate in SERPs)`)}`);
    if (p.description && (p.description.length < 70 || p.description.length > 165))
      line(`  ${warn(`description ${p.description.length} chars (aim 70–165)`)}`);
  }

  // ── Duplicate detection (the original bug) ──────────────────────────────────
  line(`\n${"=".repeat(60)}\nDUPLICATE CHECK (the bug we fixed)\n${"-".repeat(60)}`);
  const dup = (field) => {
    const seen = new Map();
    for (const p of pub) {
      if (!p[field]) continue;
      const k = p[field].toLowerCase();
      seen.set(k, [...(seen.get(k) || []), p.path]);
    }
    const clashes = [...seen.entries()].filter(([, paths]) => paths.length > 1);
    if (!clashes.length) { line(ok(`all ${field}s are unique`)); return 0; }
    for (const [val, paths] of clashes) line(bad(`${field} shared by ${paths.join(", ")} → "${val.slice(0, 50)}…"`));
    return clashes.length;
  };
  let problems = 0;
  problems += dup("title");
  problems += dup("description");

  // Missing canonical/OG
  const missingCanon = pub.filter((p) => p.status === 200 && !p.canonical).map((p) => p.path);
  if (missingCanon.length) { line(bad(`missing canonical: ${missingCanon.join(", ")}`)); problems += missingCanon.length; }
  else line(ok("every public page has a canonical"));

  // ── Private pages must be noindex ───────────────────────────────────────────
  line(`\n${"-".repeat(60)}\nNOINDEX CHECK (private/app routes)\n${"-".repeat(60)}`);
  for (const r of PRIVATE_ROUTES) {
    const p = await fetchMeta(r);
    const robots = (p.robots || "").toLowerCase();
    // "none" is Google's synonym for "noindex, nofollow" — treat it as valid.
    const isNoindex = robots.includes("noindex") || robots.includes("none");
    line(isNoindex ? ok(`${r} is noindex`) : warn(`${r} robots="${p.robots ?? "(none set)"}" (expected noindex)`));
  }

  line(`\n${"=".repeat(60)}`);
  line(problems ? bad(`${problems} SEO problem(s) found`) : ok("No duplicate/missing-meta problems 🎉"));
  line("");
  process.exit(problems ? 1 : 0);
})();
