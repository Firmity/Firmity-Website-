import type { ReactNode } from "react"
import { buildPageMetadata } from "@/src/lib/seo-store"
import { PageJsonLd } from "@/src/components/seo-json-ld"

// /home mirrors the landing page. Point its canonical at "/" so Google treats
// them as one URL (avoids duplicate-content splitting).
export const revalidate = 60

export async function generateMetadata() {
  return buildPageMetadata("/")
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageJsonLd path="/" />
      {children}
    </>
  )
}
