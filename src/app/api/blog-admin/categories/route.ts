import { NextResponse } from "next/server";
import { isBlogAuthed } from "@/src/lib/blog-guard";
import { listCategories, addCategory, removeCategory } from "@/src/lib/blog";

export async function GET() {
  if (!(await isBlogAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ categories: await listCategories() });
}

export async function POST(req: Request) {
  if (!(await isBlogAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { name } = (await req.json().catch(() => ({}))) as { name?: string };
  if (!name?.trim()) return NextResponse.json({ error: "name required" }, { status: 400 });
  await addCategory(name);
  return NextResponse.json({ categories: await listCategories() });
}

export async function DELETE(req: Request) {
  if (!(await isBlogAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const name = new URL(req.url).searchParams.get("name");
  if (!name) return NextResponse.json({ error: "name required" }, { status: 400 });
  await removeCategory(name);
  return NextResponse.json({ categories: await listCategories() });
}
