// Public article page. Renders sanitized CMS HTML inside the shared BlogPostShell
// so DB posts look identical to the original MDX ones. ISR-refreshed.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { BlogPostShell } from "@/src/components/blog-post-shell";
import { getBySlug } from "@/src/lib/blog";
import { BLOG_SEO_TITLES } from "@/src/lib/blog-seo-titles";
import { BLOG_PROSE } from "@/src/lib/blog-prose";
import { canonical, SITE } from "@/src/lib/seo";
import { JsonLd } from "@/src/components/json-ld";
import { DownloadPdf } from "@/src/components/blog/download-pdf";
import { getSiteSeo } from "@/src/lib/seo-store";
import { Rss, Linkedin, Instagram, Twitter, Facebook, Youtube, Globe, type LucideIcon } from "lucide-react";

function socialIcon(url: string): LucideIcon {
  const u = url.toLowerCase();
  if (u.includes("linkedin")) return Linkedin;
  if (u.includes("instagram")) return Instagram;
  if (u.includes("twitter") || u.includes("x.com")) return Twitter;
  if (u.includes("facebook")) return Facebook;
  if (u.includes("youtube") || u.includes("youtu.be")) return Youtube;
  return Globe;
}

export const revalidate = 60;

function longDate(iso: string | null): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return "";
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBySlug(slug);
  if (!post || post.status !== "published") return { title: "Article", robots: { index: false, follow: true } };
  const url = canonical(`/blog/${slug}`);
  const description = post.meta_description || post.subtitle || undefined;
  const images = post.cover_image_url ? [{ url: post.cover_image_url }] : undefined;
  // Shorter title for search/social when the headline is too long to display
  // (see BLOG_SEO_TITLES); the H1 and BlogPosting headline keep the full title.
  const seoTitle = BLOG_SEO_TITLES[slug] ?? post.title;
  return {
    title: seoTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: seoTitle,
      description,
      url,
      type: "article",
      images,
    },
    // Set explicitly: Next.js only shallow-merges metadata, so without this the
    // post inherits the generic "Blog — ..." twitter title/description from
    // the /blog layout.
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: seoTitle,
      description,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBySlug(slug);
  if (!post || post.status !== "published") notFound();

  const meta = [longDate(post.published_at), post.read_time].filter(Boolean).join(" · ");
  const socials = (await getSiteSeo()).social_links ?? [];

  return (
    <BlogPostShell>
      <style>{`@media print{.no-print{display:none!important}nav,header,footer{display:none!important}}`}</style>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.meta_description || post.subtitle || undefined,
          image: post.cover_image_url || undefined,
          datePublished: post.published_at || undefined,
          dateModified: post.updated_at || undefined,
          author: { "@type": post.author ? "Person" : "Organization", name: post.author || "Firmity" },
          publisher: {
            "@type": "Organization",
            name: "Firmity",
            logo: { "@type": "ImageObject", url: `${SITE.url}/firmity.png` },
          },
          mainEntityOfPage: canonical(`/blog/${slug}`),
        }}
      />
      <DownloadPdf />
      {post.category && (
        <p className="text-[11px] font-semibold text-[#2b6cb0] tracking-[0.16em] uppercase mb-3">{post.category}</p>
      )}
      <h1 className="font-serif text-[clamp(1.9rem,4vw,2.8rem)] font-light text-[#114dac] leading-tight tracking-tight mb-3">
        {post.title}
      </h1>
      {post.subtitle && <p className="text-[16px] text-[#718096] font-light leading-relaxed mb-5">{post.subtitle}</p>}
      {meta && <p className="text-[12px] text-[#a0aec0] font-light mb-4">{meta}</p>}
      <div className="mb-8 space-y-2.5 border-b border-[#eef3f9] pb-6">
        {post.author && (
          <p className="text-[13px] text-[#4a5568]">
            Article written by <span className="font-semibold text-[#114dac]">{post.author}</span>
          </p>
        )}
        <a href="/blog/rss.xml" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#2b6cb0] hover:underline">
          <Rss size={13} /> Firmity Blog RSS
        </a>
        {socials.length > 0 && (
          <div className="flex items-center gap-2 pt-1">
            {socials.map((url, i) => {
              const Ic = socialIcon(url);
              return (
                <a key={i} href={url} target="_blank" rel="noreferrer" aria-label="Social profile"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#114dac] text-white transition-colors hover:bg-[#2b6cb0]">
                  <Ic size={14} />
                </a>
              );
            })}
          </div>
        )}
      </div>
      {post.cover_image_url && (
        <Image
          src={post.cover_image_url}
          alt={post.title}
          width={1200}
          height={750}
          sizes="(min-width: 768px) 720px, 100vw"
          priority
          className="w-full h-auto rounded-2xl mb-9"
        />
      )}
      {/* content_html is sanitized on save (lib/blog.ts::sanitizeContent). */}
      <div className={BLOG_PROSE} dangerouslySetInnerHTML={{ __html: post.content_html }} />
    </BlogPostShell>
  );
}
