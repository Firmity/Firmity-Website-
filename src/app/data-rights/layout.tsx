import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Your Data Rights | Firmity",
  description:
    "Ask Firmity for access, correction or erasure of your personal data, nominate someone to act for you, or make a complaint.",
  alternates: { canonical: "/data-rights" },
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
