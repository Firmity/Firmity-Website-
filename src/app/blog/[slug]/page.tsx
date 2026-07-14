// Public article page. Renders sanitized CMS HTML inside the shared BlogPostShell
// so DB posts look identical to the original MDX ones. ISR-refreshed.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostShell } from "@/src/components/blog-post-shell";
import { getBySlug } from "@/src/lib/blog";
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
  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description,
      url,
      type: "article",
      images: post.cover_image_url ? [{ url: post.cover_image_url }] : undefined,
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
      <h1 className="font-serif text-[clamp(1.9rem,4vw,2.8rem)] font-light text-[#111d35] leading-tight tracking-tight mb-3">
        {post.title}
      </h1>
      {post.subtitle && <p className="text-[16px] text-[#718096] font-light leading-relaxed mb-5">{post.subtitle}</p>}
      {meta && <p className="text-[12px] text-[#a0aec0] font-light mb-4">{meta}</p>}
      <div className="mb-8 space-y-2.5 border-b border-[#eef3f9] pb-6">
        {post.author && (
          <p className="text-[13px] text-[#4a5568]">
            Article written by <span className="font-semibold text-[#111d35]">{post.author}</span>
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
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#111d35] text-white transition-colors hover:bg-[#2b6cb0]">
                  <Ic size={14} />
                </a>
              );
            })}
          </div>
        )}
      </div>
      {post.cover_image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.cover_image_url} alt={post.title} className="w-full rounded-2xl mb-9" />
      )}
      {/* content_html is sanitized on save (lib/blog.ts::sanitizeContent). */}
      <div className={BLOG_PROSE} dangerouslySetInnerHTML={{ __html: post.content_html }} />
    </BlogPostShell>
  );
}
