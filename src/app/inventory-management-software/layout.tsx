import type { ReactNode } from "react"
import { buildPageMetadata } from "@/src/lib/seo-store"
import { PageJsonLd } from "@/src/components/seo-json-ld"
import { JsonLd } from "@/src/components/json-ld"
import { serviceJsonLd } from "@/src/lib/seo"

export const revalidate = 60

export async function generateMetadata() {
  return buildPageMetadata("/inventory-management-software")
}

// Same layout.tsx pattern as cafm-software/layout.tsx (2026-09-24 audit
// pattern) — built 2026-09-30 for the new /inventory-management-software pillar page.
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageJsonLd path="/inventory-management-software" />
      <JsonLd
        data={serviceJsonLd(
          "Inventory Management Software",
          "Firmity inventory management software tracks stock, spare parts, purchases, usage, and inventory records across facility operations.",
          "/inventory-management-software",
        )}
      />
      {children}
    </>
  )
}
