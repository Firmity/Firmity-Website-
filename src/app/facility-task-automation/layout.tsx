import type { ReactNode } from "react"
import { buildPageMetadata } from "@/src/lib/seo-store"
import { PageJsonLd } from "@/src/components/seo-json-ld"
import { JsonLd } from "@/src/components/json-ld"
import { serviceJsonLd } from "@/src/lib/seo"

export const revalidate = 60

export async function generateMetadata() {
  return buildPageMetadata("/facility-task-automation")
}

// Formerly src/app/preventive-maintenance/layout.tsx — moved here 2026-09-12
// when the page was renamed/rebuilt. See src/lib/seo.ts (PAGE_SEO key moved
// to "/facility-task-automation") and src/app/preventive-maintenance/layout.tsx
// (now a noindex redirect stub, kept only as a safety net alongside the
// next.config.mjs 301).
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageJsonLd path="/facility-task-automation" />
      <JsonLd
        data={serviceJsonLd(
          "Facility Task Automation",
          "Automate preventive maintenance schedules, work orders and asset servicing with Firmity — reduce breakdowns and extend equipment life across your facilities.",
          "/facility-task-automation",
        )}
      />
      {children}
    </>
  )
}
