import type { ReactNode } from "react"
import { buildPageMetadata } from "@/src/lib/seo-store"
import { PageJsonLd } from "@/src/components/seo-json-ld"
import { JsonLd } from "@/src/components/json-ld"
import { serviceJsonLd } from "@/src/lib/seo"

export const revalidate = 60

export async function generateMetadata() {
  return buildPageMetadata("/cafm-software")
}

// See facility-records/layout.tsx (now removed) / assets-spares-automation/layout.tsx
// for why this file exists (2026-09-05 audit pattern, reused here 2026-09-24
// for the new /cafm-software page).
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageJsonLd path="/cafm-software" />
      <JsonLd
        data={serviceJsonLd(
          "CAFM Software",
          "CAFM software (computer aided facility management) from Firmity brings maintenance, assets, compliance, and space management into one cloud platform.",
          "/cafm-software",
        )}
      />
      {children}
    </>
  )
}
