import type { ReactNode } from "react"
import { noindexMetadata } from "@/src/lib/seo"

// Shared report links are private — never index them.
export const metadata = noindexMetadata("Facility Report")

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
