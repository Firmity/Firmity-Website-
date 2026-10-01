import type { ReactNode } from "react"
import { buildPageMetadata } from "@/src/lib/seo-store"
import { PageJsonLd } from "@/src/components/seo-json-ld"
import { JsonLd } from "@/src/components/json-ld"
import { serviceJsonLd } from "@/src/lib/seo"

export const revalidate = 60

export async function generateMetadata() {
  return buildPageMetadata("/visitor-management-software")
}

// Same layout.tsx pattern as cafm-software/layout.tsx (2026-09-24 audit
// pattern) — built 2026-09-30 for the new /visitor-management-software pillar page.
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageJsonLd path="/visitor-management-software" />
      <JsonLd
        data={serviceJsonLd(
          "Visitor Management Software",
          "Firmity visitor management software manages check-ins, approvals, visitor records, and access for offices.",
          "/visitor-management-software",
        )}
      />
      {children}
    </>
  )
}
