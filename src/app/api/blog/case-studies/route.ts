// Returns every published post tagged "Case Study" (or matching the one
// known pre-tagging slug below), for CustomersSaySection's client-side
// fallback fetch (fires only when SSR's initialCaseStudies prop came back
// empty — see home-client.tsx). Deliberately NOT capped to "latest N" like
// /api/blog/latest — that cap is exactly what caused the 2026-09-24 bug:
// as newer posts got published, this section's only case study aged out of
// the top 4, and the client fell back to a hardcoded stub with no cover
// image. A case study now only disappears from the homepage if it's
// genuinely unpublished, never because something newer pushed it out.
// server-only blog lib is safe here — this is a Route Handler (Node runtime).
import { NextResponse } from "next/server"
import { listPublished } from "@/src/lib/blog"

export const revalidate = 60 // revalidate every 60 s (ISR)

// Keep this in sync with page.tsx's own copy — see that file's comment.
const CASE_STUDY_FALLBACK_SLUG = "spreadsheets-to-cmms"

export interface LatestPost {
  slug: string
  title: string
  description: string
  category: string
  readTime: string
  date: string
  cover: string | null
}

export async function GET() {
  try {
    const posts = await listPublished()
    const caseStudies: LatestPost[] = posts
      .filter((p) => p.category === "Case Study" || p.slug === CASE_STUDY_FALLBACK_SLUG)
      .map((p) => ({
        slug: p.slug,
        title: p.title,
        description: p.subtitle || p.meta_description || "",
        category: p.category || "Case Study",
        readTime: p.read_time || "",
        date: p.published_at
          ? new Date(p.published_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })
          : "",
        cover: p.cover_image_url ?? null,
      }))
    return NextResponse.json(caseStudies)
  } catch (err) {
    console.error("[BLOG_CASE_STUDIES_ERR]", err)
    return NextResponse.json([], { status: 500 })
  }
}
