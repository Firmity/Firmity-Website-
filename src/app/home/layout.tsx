import type { ReactNode } from "react"
import { buildMetadata } from "@/src/lib/seo"

// /home mirrors the landing page. Point its canonical at "/" so Google treats
// them as one URL (avoids duplicate-content splitting).
export const metadata = buildMetadata("/")

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
