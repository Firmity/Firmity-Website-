import type { ReactNode } from "react"
import { buildPageMetadata } from "@/src/lib/seo-store"
import { PageJsonLd } from "@/src/components/seo-json-ld"
import { JsonLd } from "@/src/components/json-ld"
import { serviceJsonLd } from "@/src/lib/seo"

export const revalidate = 60

export async function generateMetadata() {
  return buildPageMetadata("/employee-management-automation")
}

// See facility-records/layout.tsx for why this file exists (2026-09-05 audit).
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageJsonLd path="/employee-management-automation" />
      <JsonLd
        data={serviceJsonLd(
          "Facility Staff Attendance & Leave",
          "Manage facility staff attendance, shifts and deployment with Firmity — real-time headcount, roster control and workforce accountability across sites.",
          "/employee-management-automation",
        )}
      />
      {children}
    </>
  )
}
