import { NextResponse } from "next/server";
import { isBlogAuthed } from "@/src/lib/blog-guard";
import { listAuthors, upsertAuthor, deleteAuthor, type BlogAuthorInput } from "@/src/lib/blog-authors";

export async function GET() {
  if (!(await isBlogAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ authors: await listAuthors() });
}

export async function POST(req: Request) {
  if (!(await isBlogAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const body = (await req.json()) as BlogAuthorInput;
    if (!body?.name?.trim()) return NextResponse.json({ error: "name is required" }, { status: 400 });
    const author = await upsertAuthor(body);
    return NextResponse.json({ author, authors: await listAuthors() });
  } catch (e) {
    console.error("[BLOG_AUTHOR_SAVE_ERR]", e);
    return NextResponse.json({ error: "save failed" }, { status: 502 });
  }
}

export async function DELETE(req: Request) {
  if (!(await isBlogAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  try {
    await deleteAuthor(id);
    return NextResponse.json({ authors: await listAuthors() });
  } catch (e) {
    console.error("[BLOG_AUTHOR_DELETE_ERR]", e);
    return NextResponse.json({ error: "delete failed" }, { status: 502 });
  }
}
