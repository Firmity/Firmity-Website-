import type { ReactNode } from "react"
import { buildPageMetadata } from "@/src/lib/seo-store"
import { PageJsonLd } from "@/src/components/seo-json-ld"
import { JsonLd } from "@/src/components/json-ld"
import { serviceJsonLd } from "@/src/lib/seo"

export const revalidate = 60

export async function generateMetadata() {
  return buildPageMetadata("/facility-expense-automation-erp")
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageJsonLd path="/facility-expense-automation-erp" />
      <JsonLd
        data={serviceJsonLd(
          "Facility Expense Automation ERP",
          "Control facility spend with policy-driven budget caps, category-wise tracking, maker-checker approvals, and audit-ready journals auto-posted to your ledger with Firmity.",
          "/facility-expense-automation-erp",
        )}
      />
      {children}
    </>
  )
}
