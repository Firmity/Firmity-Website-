import type { ReactNode } from "react"
import { buildPageMetadata } from "@/src/lib/seo-store"
import { PageJsonLd } from "@/src/components/seo-json-ld"
import { JsonLd } from "@/src/components/json-ld"
import { serviceJsonLd } from "@/src/lib/seo"

export const revalidate = 60

export async function generateMetadata() {
  return buildPageMetadata("/cmms-software")
}

// Same layout.tsx pattern as cafm-software/layout.tsx (2026-09-24 audit
// pattern) — built 2026-09-30 for the new /cmms-software pillar page.
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageJsonLd path="/cmms-software" />
      <JsonLd
        data={serviceJsonLd(
          "CMMS Software",
          "Firmity CMMS software manages work orders, preventive maintenance, assets, and inventory from one cloud platform.",
          "/cmms-software",
        )}
      />
      {children}
    </>
  )
}
