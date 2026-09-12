import type { ReactNode } from "react"
import { buildPageMetadata } from "@/src/lib/seo-store"
import { PageJsonLd } from "@/src/components/seo-json-ld"
import { JsonLd } from "@/src/components/json-ld"
import { serviceJsonLd } from "@/src/lib/seo"

export const revalidate = 60

export async function generateMetadata() {
  return buildPageMetadata("/facility-records")
}

// This module page previously had no metadata or structured data at all
// (2026-09-05 audit — the other 7 of 8 marketing-facing feature pages already
// followed the /contact layout.tsx pattern; this was the one left behind).
// serviceJsonLd() already existed in src/lib/seo.ts but was never actually
// called anywhere in the codebase — this is the Service page it was built for.
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageJsonLd path="/facility-records" />
      <JsonLd
        data={serviceJsonLd(
          "Cloud-Based Facility Records",
          "Keep every facility record, register and compliance document in one place with Firmity — audit-ready logbooks, certificates and SOPs at your fingertips.",
          "/facility-records",
        )}
      />
      {children}
    </>
  )
}
