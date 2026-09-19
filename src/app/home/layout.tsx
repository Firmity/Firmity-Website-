import type { Metadata } from "next"
import type { ReactNode } from "react"

// Staff (surveyor) dashboard — not a public marketing page.
export const metadata: Metadata = {
  title: "Surveyor Home",
  robots: { index: false, follow: false },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
