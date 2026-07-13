import { NextResponse } from "next/server";
import { isBlogAuthed } from "@/src/lib/blog-guard";
import { updateSiteSeo, type SiteSeo } from "@/src/lib/seo-store";

export async function PUT(req: Request) {
  if (!(await isBlogAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const body = (await req.json()) as Partial<SiteSeo>;
    await updateSiteSeo(body);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[SEO_SITE_ERR]", e);
    return NextResponse.json({ error: "save failed" }, { status: 502 });
  }
}
