import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy notice: website and demo enquiries | Firmity",
  description: "What Firmity collects when you send a demo or contact request, why, and how to withdraw consent, use your rights or complain.",
  alternates: { canonical: "/notices/website-and-demo-enquiries" },
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
