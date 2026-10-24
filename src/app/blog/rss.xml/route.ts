// RSS 2.0 feed of published blog posts → /blog/rss.xml
import { listPublished } from "@/src/lib/blog";
import { SITE } from "@/src/lib/seo";

export const revalidate = 300;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// RSS 2.0 has no "modified" element, so the updated date goes in as Atom's
// <atom:updated> (namespace already declared below). pubDate stays omitted.
const modified = (p: { content_updated_at: string | null; updated_at: string }) => {
  const iso = p.content_updated_at || p.updated_at;
  return iso ? new Date(iso).toISOString() : "";
};

export async function GET() {
  const posts = await listPublished();
  const items = posts
    .map(
      (p) => `<item>
      <title>${esc(p.title)}</title>
      <link>${SITE.url}/blog/${p.slug}</link>
      <guid>${SITE.url}/blog/${p.slug}</guid>
      ${modified(p) ? `<atom:updated>${modified(p)}</atom:updated>` : ""}
      ${p.author ? `<dc:creator>${esc(p.author)}</dc:creator>` : ""}
      <description>${esc(p.subtitle || p.meta_description || "")}</description>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Firmity Blog</title>
    <link>${SITE.url}/blog</link>
    <atom:link href="${SITE.url}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Facility management insights, guides and case studies from Firmity.</description>
    <language>en</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
