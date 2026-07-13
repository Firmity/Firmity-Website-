import type { ReactNode } from "react"
import { buildPageMetadata } from "@/src/lib/seo-store"
import { PageJsonLd } from "@/src/components/seo-json-ld"

// /home mirrors the landing page. Point its canonical at "/" so Google treats
// them as one URL (avoids duplicate-content splitting).
export const revalidate = 60

export async function generateMetadata() {
  const m = await buildPageMetadata("/")
  // absolute = skip the "%s | Firmity" template (home title already starts with Firmity)
  return { ...m, title: { absolute: m.title as string } }
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageJsonLd path="/" />
      {children}
    </>
  )
}
