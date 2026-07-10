"use client"

import type { ReactNode } from "react"
import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"

// Wraps blog post content with the site's Navigation/Footer.
// This file is the client boundary: Navigation/Footer apparently rely on
// client-only React features without declaring their own "use client",
// which previously worked only because blog/page.tsx declares it at the
// top of the whole file. Our MDX post pages must stay Server Components
// (they export `metadata`), so this wrapper isolates the client-only
// pieces instead. MDX content is passed in as children — Next.js supports
// passing Server Component output into a Client Component's children slot.
export function BlogPostShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="bg-white">
        <section className="max-w-3xl mx-auto px-6 sm:px-10 py-16 lg:py-20">
          {children}
        </section>
      </main>
      <Footer />
    </>
  )
}