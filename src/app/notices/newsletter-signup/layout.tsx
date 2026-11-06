import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy notice: newsletter sign-up | Firmity",
  description: "What Firmity collects when you sign up for the newsletter, why, and how to withdraw consent, use your rights or complain.",
  alternates: { canonical: "/notices/newsletter-signup" },
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
