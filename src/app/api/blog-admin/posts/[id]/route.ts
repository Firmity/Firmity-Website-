import { NextResponse } from "next/server";
import { isBlogAuthed } from "@/src/lib/blog-guard";
import { deletePost, getById, setPostStatus } from "@/src/lib/blog";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isBlogAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    const { status } = (await req.json()) as { status?: "draft" | "published" };
    if (status !== "draft" && status !== "published")
      return NextResponse.json({ error: "invalid status" }, { status: 400 });
    await setPostStatus(id, status);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[BLOG_STATUS_ERR]", e);
    return NextResponse.json({ error: "status change failed" }, { status: 502 });
  }
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isBlogAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  const post = await getById(id);
  if (!post) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ post });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isBlogAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    await deletePost(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[BLOG_DELETE_ERR]", e);
    return NextResponse.json({ error: "delete failed" }, { status: 502 });
  }
}
