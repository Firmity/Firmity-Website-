// End-of-post "More on <category>" cards (2026-09-23), per request: "3
// category-wise blog cards at the end of each blog... follow the same
// style for cards as we have on the homepage for the blogs." That's
// HomeBlogSection's card in src/app/home-client.tsx — this duplicates its
// JSX/classes verbatim rather than importing/sharing a component with that
// file, since home-client.tsx is explicitly off-limits ("homepage is
// perfect... will not change it at all"). Same approach already used for
// BlogFaqSection mirroring the homepage FAQ accordion.
//
// Renders nothing when there are no other posts in the same category (see
// blog.ts's listRelatedByCategory, which also returns [] outright when the
// post has no category at all).
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { BlogCardData } from "@/src/lib/blog";

export function RelatedPostsSection({ category, posts }: { category: string; posts: BlogCardData[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-[#eef3f9]">
      <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-light text-[#114dac] leading-tight tracking-tight mb-5">
        More on {category}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col bg-white rounded-[4px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_30px_rgba(43,108,176,0.14)] transition-shadow overflow-hidden"
          >
            <div className="bg-[#114dac] px-4 py-4 flex-shrink-0">
              <span className="text-[12px] font-semibold text-white tracking-wide">{post.category || "Guide"}</span>
            </div>

            {/* Cover image or placeholder — identical to HomeBlogSection's. */}
            <div className="relative h-[170px] bg-[#eef3f9] overflow-hidden flex-shrink-0">
              {post.cover ? (
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="opacity-20">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#2b6cb0" strokeWidth="1.5" />
                    <polyline points="14 2 14 8 20 8" stroke="#2b6cb0" strokeWidth="1.5" />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex flex-col flex-1 p-5">
              <p className="font-serif text-[15px] font-normal text-[#2b6cb0] leading-snug mb-2 line-clamp-2 group-hover:text-[#0e3e8a] transition-colors">
                {post.title}
              </p>
              {post.description && (
                <p className="text-[12.5px] font-light text-[#000000] leading-relaxed mb-4 line-clamp-3">{post.description}</p>
              )}
              <div className="mt-auto flex items-end justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-[#2b6cb0] text-[12px] font-semibold group-hover:gap-2.5 transition-all flex-shrink-0">
                  Read more <ArrowRight size={12} />
                </span>
                {(post.date || post.readTime) && (
                  <span className="text-[10.5px] text-[#000000] font-light text-right">
                    {post.date}
                    {post.date && post.readTime ? " · " : ""}
                    {post.readTime}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
