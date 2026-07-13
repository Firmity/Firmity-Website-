import { NextResponse } from "next/server";
import { isBlogAuthed } from "@/src/lib/blog-guard";
import { listPageSeo, upsertPageSeo, deletePageSeo, getSiteSeo, type PageSeoRow } from "@/src/lib/seo-store";
import { SEO_ROUTES } from "@/src/lib/seo";

export async function GET() {
  if (!(await isBlogAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ overrides: await listPageSeo(), site: await getSiteSeo() });
}

export async function POST(req: Request) {
  if (!(await isBlogAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const body = (await req.json()) as Partial<PageSeoRow> & { path?: string };
    // Guard: only the fixed route registry may be edited (no new pages).
    if (!body.path || !SEO_ROUTES.some((r) => r.path === body.path)) {
      return NextResponse.json({ error: "unknown or non-editable path" }, { status: 400 });
    }
    await upsertPageSeo({ ...body, path: body.path });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[SEO_SAVE_ERR]", e);
    return NextResponse.json({ error: "save failed" }, { status: 502 });
  }
}

export async function DELETE(req: Request) {
  if (!(await isBlogAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const path = new URL(req.url).searchParams.get("path");
  if (!path) return NextResponse.json({ error: "path required" }, { status: 400 });
  await deletePageSeo(path);
  return NextResponse.json({ ok: true });
}
