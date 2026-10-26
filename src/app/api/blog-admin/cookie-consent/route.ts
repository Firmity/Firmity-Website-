import { NextResponse } from "next/server"
import { isBlogAuthed } from "@/src/lib/blog-guard"
import { fetchConsents, summarise, toCsv } from "@/src/lib/cookie-consent-store"

// GET /api/blog-admin/cookie-consent — Marketing Studio session required.
//   ?days=30            → JSON summary (acceptance rate, daily series, devices,
//                         accepted-by referrer / UTM source / campaign, top pages)
//   ?days=90&format=csv → raw event export (no IP hash) for spreadsheets / BI
// Read-only; never exposes the visitor's IP hash.

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  if (!(await isBlogAuthed())) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })

  const url = new URL(req.url)
  const daysRaw = Number(url.searchParams.get("days") ?? "30")
  const days = Number.isFinite(daysRaw) ? Math.min(Math.max(Math.floor(daysRaw), 1), 365) : 30
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

  try {
    const rows = await fetchConsents(since)
    if (url.searchParams.get("format") === "csv") {
      return new NextResponse(toCsv(rows), {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="cookie-consents-${days}d.csv"`,
          "Cache-Control": "no-store",
        },
      })
    }
    return NextResponse.json({ success: true, summary: summarise(rows, days) }, { headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    console.error("[CONSENT_DB_ERR]", (error as Error).message)
    return NextResponse.json({ success: false, error: "Could not load consent data" }, { status: 500 })
  }
}
