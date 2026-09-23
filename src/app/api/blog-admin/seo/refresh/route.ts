import { NextResponse } from "next/server";
import { isBlogAuthed } from "@/src/lib/blog-guard";
import { refreshPageSeo } from "@/src/lib/seo-store";

export async function POST(req: Request) {
  if (!(await isBlogAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const body = (await req.json().catch(() => ({}))) as { mode?: string };
    const mode = body.mode === "overwrite" ? "overwrite" : "merge";
    const result = await refreshPageSeo(mode);
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    console.error("[SEO_REFRESH_ERR]", e);
    return NextResponse.json({ error: "refresh failed" }, { status: 502 });
  }
}
