// Public: serves the homepage's editable JSON-LD (page_seo path '/'). Lets the
// client-rendered home page inject DB-managed structured data.
import { NextResponse } from "next/server";
import { getPageSeo } from "@/src/lib/seo-store";

export const revalidate = 60;

export async function GET() {
  const row = await getPageSeo("/");
  return NextResponse.json({ jsonLd: row?.json_ld ?? null });
}
