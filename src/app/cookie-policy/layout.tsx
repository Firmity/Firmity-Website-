import type { Metadata } from "next"

// Static metadata (not routed through the Marketing Studio SEO store) so this
// page does not depend on a page_seo row existing.
export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Firmity (Ufirm Technologies Private Limited) uses cookies and similar technologies, how consent works under the DPDP Act, 2023, and how to change or withdraw your choice.",
  alternates: { canonical: "/cookie-policy" },
}

export default function CookiePolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
