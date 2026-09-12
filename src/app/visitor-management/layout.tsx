import type { ReactNode } from "react"
import { buildPageMetadata } from "@/src/lib/seo-store"
import { PageJsonLd } from "@/src/components/seo-json-ld"
import { JsonLd } from "@/src/components/json-ld"
import { serviceJsonLd } from "@/src/lib/seo"

export const revalidate = 60

export async function generateMetadata() {
  return buildPageMetadata("/visitor-management")
}

// See facility-records/layout.tsx for why this file exists (2026-09-05 audit).
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageJsonLd path="/visitor-management" />
      <JsonLd
        data={serviceJsonLd(
          "Visitor Management & Records",
          "Digitise gate entry with Firmity's visitor management — pre-approvals, passes and audit logs for secure, seamless visitor access at your facility.",
          "/visitor-management",
        )}
      />
      {children}
    </>
  )
}
