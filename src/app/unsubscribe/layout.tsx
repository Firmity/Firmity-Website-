import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Withdraw consent | Firmity",
  description: "Withdraw your consent to receive marketing from Firmity.",
  alternates: { canonical: "/unsubscribe" },
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
