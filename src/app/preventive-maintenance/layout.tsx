import type { ReactNode } from "react"
import { noindexMetadata } from "@/src/lib/seo"

// Page moved to /facility-task-automation (2026-09-12) — see the redirect()
// call in this route's page.tsx and the 301 in next.config.mjs. This layout
// now only supplies noindex metadata (no JSON-LD — the content and its
// structured data live at the new URL) as a second safety net so this old
// path is never indexed as a separate/duplicate page if it's ever crawled
// before the redirect takes effect.
export function generateMetadata() {
  return noindexMetadata("Redirecting to Facility Task Automation…")
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
