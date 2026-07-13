import type { ReactNode } from "react"
import { buildPageMetadata } from "@/src/lib/seo-store"
import { PageJsonLd } from "@/src/components/seo-json-ld"

export const revalidate = 60

export async function generateMetadata() {
  return buildPageMetadata("/visitor-management")
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageJsonLd path="/visitor-management" />
      {children}
    </>
  )
}
