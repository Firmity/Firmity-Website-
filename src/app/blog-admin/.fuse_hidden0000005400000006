import type { ReactNode } from "react"
import { noindexMetadata } from "@/src/lib/seo"

// The CMS is never indexed. Auth is enforced in middleware (redirects to
// /blog-admin/login) and re-checked in every API route.
export const metadata = noindexMetadata("Blog Studio")

export default function BlogAdminLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-[#f8fafc] text-[#1a202c]">{children}</div>
}
