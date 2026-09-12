import type { ReactNode } from "react"
import { buildPageMetadata } from "@/src/lib/seo-store"
import { PageJsonLd } from "@/src/components/seo-json-ld"
import { JsonLd } from "@/src/components/json-ld"
import { serviceJsonLd } from "@/src/lib/seo"

export const revalidate = 60

export async function generateMetadata() {
  return buildPageMetadata("/asset-management")
}

// See facility-records/layout.tsx for why this file exists (2026-09-05 audit).
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageJsonLd path="/asset-management" />
      <JsonLd
        data={serviceJsonLd(
          "Asset Management & Alerts",
          "Track every facility asset — location, condition, service history and depreciation — in one register. Firmity asset management gives full lifecycle visibility.",
          "/asset-management",
        )}
      />
      {children}
    </>
  )
}
