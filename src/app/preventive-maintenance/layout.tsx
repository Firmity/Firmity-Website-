import type { ReactNode } from "react"
import { buildPageMetadata } from "@/src/lib/seo-store"
import { PageJsonLd } from "@/src/components/seo-json-ld"
import { JsonLd } from "@/src/components/json-ld"
import { serviceJsonLd } from "@/src/lib/seo"

export const revalidate = 60

export async function generateMetadata() {
  return buildPageMetadata("/preventive-maintenance")
}

// See facility-records/layout.tsx for why this file exists (2026-09-05 audit).
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageJsonLd path="/preventive-maintenance" />
      <JsonLd
        data={serviceJsonLd(
          "Planned Preventive Maintenance",
          "Automate preventive maintenance schedules, work orders and asset servicing with Firmity — reduce breakdowns and extend equipment life across your facilities.",
          "/preventive-maintenance",
        )}
      />
      {children}
    </>
  )
}
