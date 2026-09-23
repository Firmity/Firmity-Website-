// Public article page. Renders sanitized CMS HTML inside the shared BlogPostShell
// so DB posts look identical to the original MDX ones. ISR-refreshed.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { BlogPostShell } from "@/src/components/blog-post-shell";
import { BlogFaqSection } from "@/src/components/blog/blog-faq-section";
import { RelatedPostsSection } from "@/src/components/blog/related-posts-section";
import { getBySlug, listRecentForSidebar, listRelatedByCategory, categorySlug } from "@/src/lib/blog";
import { getAuthorById } from "@/src/lib/blog-authors";
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

// "Last updated" only earns a line when it's actually a different DAY from
// the publish date — a freshly published, never-edited post would
// otherwise show the same date twice (once as "Published", once as
// "Updated"), which reads as a bug, not a feature.
function isDifferentDay(a: string | null, b: string | null): boolean {
  return !!a && !!b && a.slice(0, 10) !== b.slice(0, 10);
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
  const [socials, author, sidebarPosts, relatedPosts] = await Promise.all([
    getSiteSeo().then((s) => s.social_links ?? []),
    post.author_id ? getAuthorById(post.author_id) : Promise.resolve(null),
    listRecentForSidebar(slug),
    listRelatedByCategory(post.category, slug, 3),
  ]);
  const showUpdated = isDifferentDay(post.content_updated_at, post.published_at);
  // "Home > Blog > <Category> > <Post>" (2026-09-23) — the URL stays flat
  // (/blog/[slug]), so this can't come from the auto path-segment
  // breadcrumb; see breadcrumbs.tsx's `override` prop. Posts with no
  // category fall back to the plain "Home > Blog > <Post>" auto trail.
  const breadcrumbOverride = post.category
    ? [
        { label: "Blog", href: "/blog" },
        { label: post.category, href: `/blog/category/${categorySlug(post.category)}` },
        { label: post.title, href: `/blog/${slug}` },
      ]
    : undefined;

  return (
    <BlogPostShell sidebarPosts={sidebarPosts} breadcrumbOverride={breadcrumbOverride}>
      <style>{`@media print{.no-print{display:none!important}nav,header,footer{display:none!important}}`}</style>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.meta_description || post.subtitle || undefined,
          image: post.cover_image_url || undefined,
          datePublished: post.published_at || undefined,
          // Prefer the marketer-editable content_updated_at (see lib/blog.ts)
          // over the internal updated_at, which also bumps on housekeeping
          // saves (e.g. re-saving with no text changes) and would otherwise
          // overstate freshness to Google.
          dateModified: post.content_updated_at || post.updated_at || undefined,
          author: {
            "@type": post.author ? "Person" : "Organization",
            name: post.author || "Firmity",
            // Enrich with the reusable author profile's photo + LinkedIn when
            // the post is attributed to one (2026-09-23) — a stronger E-E-A-T
            // signal than a bare name string.
            ...(author?.avatar_url ? { image: author.avatar_url } : {}),
            ...(author?.linkedin_url ? { sameAs: [author.linkedin_url] } : {}),
          },
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

      {/* Renders nothing when post.faqs is empty (see component). */}
      <BlogFaqSection faqs={post.faqs} />

      {/* End-of-post author bio card + "Last updated" stamp (2026-09-23).
          Both go here, after the article body — distinct from the plain
          "Article written by X" byline up top, which is untouched. The
          bio card only renders when the post is attributed to a reusable
          author profile (post.author_id); posts with just a free-text
          author name (no profile picked in the studio) show neither. */}
      {(author || showUpdated) && (
        <div className="mt-10 pt-8 border-t border-[#eef3f9]">
          {author && (
            <div className="flex items-start gap-4">
              {author.avatar_url && (
                <Image
                  src={author.avatar_url}
                  alt={author.name}
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-full object-cover flex-shrink-0"
                />
              )}
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-[#114dac] mb-1">{author.name}</p>
                {author.bio && <p className="text-[13px] text-[#4a5568] leading-relaxed mb-2 max-w-xl">{author.bio}</p>}
                {author.linkedin_url && (
                  <a
                    href={author.linkedin_url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${author.name} on LinkedIn`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#114dac] text-white transition-colors hover:bg-[#2b6cb0]"
                  >
                    <Linkedin size={14} />
                  </a>
                )}
              </div>
            </div>
          )}
          {showUpdated && (
            <p className={`text-[12px] text-[#a0aec0] font-light ${author ? "mt-6" : ""}`}>
              Last updated {longDate(post.content_updated_at)}
            </p>
          )}
        </div>
      )}

      {/* "More on <category>" cards (2026-09-23) — last thing on the page,
          per request: "3 category-wise blog cards at the end of each
          blog." Renders nothing without a category or without other posts
          in it (see the component and listRelatedByCategory). */}
      {post.category && <RelatedPostsSection category={post.category} posts={relatedPosts} />}
    </BlogPostShell>
  );
}
