import type { ReactNode } from "react"
import { buildPageMetadata } from "@/src/lib/seo-store"
import { PageJsonLd } from "@/src/components/seo-json-ld"
import { JsonLd } from "@/src/components/json-ld"
import { serviceJsonLd } from "@/src/lib/seo"

export const revalidate = 60

export async function generateMetadata() {
  return buildPageMetadata("/inventory-management")
}

// See facility-records/layout.tsx for why this file exists (2026-09-05 audit).
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageJsonLd path="/inventory-management" />
      <JsonLd
        data={serviceJsonLd(
          "Inventory Purchase & Stock",
          "Control facility spares and consumables with Firmity — stock levels, reorder alerts and usage tracking to avoid stockouts and overspending.",
          "/inventory-management",
        )}
      />
      {children}
    </>
  )
}
