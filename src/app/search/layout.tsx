import type { ReactNode } from "react"
import { buildPageMetadata } from "@/src/lib/seo-store"
import { PageJsonLd } from "@/src/components/seo-json-ld"

export const revalidate = 60

export async function generateMetadata() {
  // Internal search results are thin, near-infinite pages: keep them out of the index.
  return { ...(await buildPageMetadata("/search")), robots: { index: false, follow: true } }
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageJsonLd path="/search" />
      {children}
    </>
  )
}
