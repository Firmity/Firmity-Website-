import type { ReactNode } from "react"
import { buildPageMetadata } from "@/src/lib/seo-store"
import { PageJsonLd } from "@/src/components/seo-json-ld"
import { JsonLd } from "@/src/components/json-ld"
import { videoTutorialsJsonLd } from "@/src/lib/video-tutorials"

// Metadata + structured data for /resources/video-tutorials. The page had none:
// it inherited the site-wide default title and emitted no schema at all.
export const revalidate = 86400

export async function generateMetadata() {
  return buildPageMetadata("/resources/video-tutorials")
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageJsonLd path="/resources/video-tutorials" />
      <JsonLd data={videoTutorialsJsonLd()} />
      {children}
    </>
  )
}
