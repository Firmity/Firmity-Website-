import type { ReactNode } from "react"
import { noindexMetadata } from "@/src/lib/seo"

export const metadata = noindexMetadata("Settings")

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
