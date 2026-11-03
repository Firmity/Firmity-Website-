import type { ReactNode } from "react"
import { buildPageMetadata } from "@/src/lib/seo-store"

export const revalidate = 86400

// Fallback metadata for the blog section. Posts, category pages and /blog/page/N
// override title, description and canonical themselves.
//
// The `Blog` structured data (PageJsonLd path="/blog") used to be rendered here, so
// EVERY nested page — every post, category and paginated page — also declared
// itself to be the Blog index. It now lives only on the index (blog/page.tsx).
export async function generateMetadata() {
  return buildPageMetadata("/blog")
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
