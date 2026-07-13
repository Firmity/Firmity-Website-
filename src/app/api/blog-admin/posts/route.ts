import { NextResponse } from "next/server";
import { isBlogAuthed } from "@/src/lib/blog-guard";
import { listAll, upsertPost, type BlogPostInput } from "@/src/lib/blog";

export async function GET() {
  if (!(await isBlogAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    return NextResponse.json({ posts: await listAll() });
  } catch (e) {
    console.error("[BLOG_LIST_ERR]", e);
    return NextResponse.json({ error: "could not load posts" }, { status: 502 });
  }
}

export async function POST(req: Request) {
  if (!(await isBlogAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const body = (await req.json()) as BlogPostInput;
    if (!body?.title?.trim()) return NextResponse.json({ error: "title is required" }, { status: 400 });
    if (body.status !== "draft" && body.status !== "published")
      return NextResponse.json({ error: "invalid status" }, { status: 400 });
    const post = await upsertPost(body);
    return NextResponse.json({ post });
  } catch (e) {
    console.error("[BLOG_SAVE_ERR]", e);
    const msg = e instanceof Error ? e.message : "save failed";
    // Unique-violation on slug -> friendly 409.
    const status = msg.includes("duplicate") || msg.includes("unique") ? 409 : 502;
    return NextResponse.json({ error: status === 409 ? "A post with this slug already exists" : "save failed" }, { status });
  }
}
