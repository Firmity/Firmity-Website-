import type { ReactNode } from "react"
import { buildPageMetadata } from "@/src/lib/seo-store"
import { PageJsonLd } from "@/src/components/seo-json-ld"
import { JsonLd } from "@/src/components/json-ld"
import { serviceJsonLd } from "@/src/lib/seo"

export const revalidate = 60

export async function generateMetadata() {
  return buildPageMetadata("/complaint-management")
}

// See facility-records/layout.tsx for why this file exists (2026-09-05 audit).
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageJsonLd path="/complaint-management" />
      <JsonLd
        data={serviceJsonLd(
          "Complaint Management System",
          "Log, route and resolve facility complaints with SLA tracking. Firmity's complaint management keeps residents, tenants and staff informed and issues accountable.",
          "/complaint-management",
        )}
      />
      {children}
    </>
  )
}
