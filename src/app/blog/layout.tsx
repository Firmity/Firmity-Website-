import type { ReactNode } from "react"
import { buildMetadata } from "@/src/lib/seo"

export const metadata = buildMetadata("/blog")

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
