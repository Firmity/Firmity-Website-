import type { ReactNode } from "react"
import { buildPageMetadata } from "@/src/lib/seo-store"
import { PageJsonLd } from "@/src/components/seo-json-ld"
import { JsonLd } from "@/src/components/json-ld"
import { serviceJsonLd } from "@/src/lib/seo"

export const revalidate = 60

export async function generateMetadata() {
  return buildPageMetadata("/payroll-management")
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageJsonLd path="/payroll-management" />
      <JsonLd
        data={serviceJsonLd(
          "Payroll Automation ERP",
          "Run multi-tier payroll with 1-click execution, automated statutory deductions (PF/ESI/PT/TDS), maker-checker approval, and bank file generation with Firmity.",
          "/payroll-management",
        )}
      />
      {children}
    </>
  )
}
