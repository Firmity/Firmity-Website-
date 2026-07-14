// Returns the 4 most-recently-published posts for the homepage blog preview.
// server-only blog lib is safe here — this is a Route Handler (Node runtime).
import { NextResponse } from "next/server"
import { listPublished } from "@/src/lib/blog"

export const revalidate = 60 // revalidate every 60 s (ISR)

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
    const latest: LatestPost[] = posts.slice(0, 4).map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.subtitle || p.meta_description || "",
      category: p.category || "Article",
      readTime: p.read_time || "",
      date: p.published_at
        ? new Date(p.published_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })
        : "",
      cover: p.cover_image_url ?? null,
    }))
    return NextResponse.json(latest)
  } catch (err) {
    console.error("[BLOG_LATEST_ERR]", err)
    return NextResponse.json([], { status: 500 })
  }
}
