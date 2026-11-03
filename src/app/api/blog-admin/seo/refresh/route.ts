import { NextResponse } from "next/server";
import { isBlogAuthed } from "@/src/lib/blog-guard";
import { refreshPageSeo } from "@/src/lib/seo-store";
import { revalidateSeo } from "@/src/lib/revalidate";

export async function POST(req: Request) {
  if (!(await isBlogAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const body = (await req.json().catch(() => ({}))) as { mode?: string };
    const mode = body.mode === "overwrite" ? "overwrite" : "merge";
    const result = await refreshPageSeo(mode);
    // Only purge when something actually changed — a no-op refresh must not
    // trigger a sitewide regeneration (each regeneration is a metered ISR write).
    if (result.updated.length > 0 || result.removedOrphans.length > 0) revalidateSeo();
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    console.error("[SEO_REFRESH_ERR]", e);
    return NextResponse.json({ error: "refresh failed" }, { status: 502 });
  }
}
