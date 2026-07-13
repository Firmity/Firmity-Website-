import type { ReactNode } from "react"
import { buildMetadata } from "@/src/lib/seo"

export const metadata = buildMetadata("/features")

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
