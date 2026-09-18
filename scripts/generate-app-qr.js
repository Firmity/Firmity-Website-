// Regenerates public/images/app-qr-code.png for the floating "Scan to get
// the app" widget (src/components/app-qr-widget.tsx).
//
// As of 2026-09-19 this QR encodes the site's own /get-app smart redirector
// (src/app/get-app/route.ts), NOT a store link directly — that route reads
// the scanning device's User-Agent and sends iPhone/iPad to the App Store
// and Android to Google Play server-side (see that file for why: a single
// static QR can't branch by device on its own). Practical effect: once the
// real App Store / Google Play links exist, they go into .env
// (NEXT_PUBLIC_APP_STORE_URL / NEXT_PUBLIC_PLAY_STORE_URL) — you do NOT
// need to rerun this script for that anymore. Only rerun it if
// NEXT_PUBLIC_SITE_URL / the production domain itself ever changes.
//
// Usage:
//   npm run generate:app-qr                    (recomputes from the domain
//     below — the normal case)
//   npm run generate:app-qr -- <url>            (encode something else —
//     e.g. a staging domain, or to preview what a direct store link would
//     look like — this does NOT change what /get-app redirects to, only
//     what this one PNG encodes)
//
// Requires the `qrcode` package (added as a devDependency alongside this
// script) — run `npm install` first if it's missing.
//
// Deliberately PLAIN squares, not the rounded-dot/rounded-eye style X uses
// on its own "Scan to get the app" widget (2026-09-19 attempt, reverted):
// hand-rolling that style as inline SVG and rasterizing it decoded
// unreliably below ~200px in testing (pyzbar, both cairosvg and rsvg-convert
// as the renderer) — it passed at some sizes and silently failed at others,
// including this widget's actual ~112px display size, with no obvious
// single cause (module-adjacency antialiasing seams were the leading
// suspect). A QR that sometimes doesn't scan is worse than a plain one that
// always does, so this stays a standard square-module PNG — proven
// 100%-scannable at every size from 96px to 512px — and only the CARD
// around it (app-qr-widget.tsx) is styled to match the reference.

const path = require("path")
const fs = require("fs")

let QRCode
try {
  QRCode = require("qrcode")
} catch (err) {
  console.error(
    "[generate-app-qr] Missing dependency 'qrcode'. Run `npm install` first (it's in devDependencies)."
  )
  process.exit(1)
}

// Same site origin used everywhere else (src/lib/seo.ts's canonical() base)
// — kept as a literal here rather than importing seo.ts, since that file is
// TypeScript and this is a plain Node script run outside the Next.js build.
const SITE_ORIGIN = "https://www.firmity.in"
const url = process.argv[2] || `${SITE_ORIGIN}/get-app`
// Width/height Tailwind classes on the <img> in app-qr-widget.tsx control
// the DISPLAYED size (currently h-28 w-28 = 112px); this `width` controls
// the source PNG's native resolution. Keep it comfortably above the
// displayed size (currently 3x) so the image stays crisp — if you size the
// widget up past ~150-160px, bump this too and rerun the script.
const outPath = path.join(__dirname, "..", "public", "images", "app-qr-code.png")

QRCode.toFile(
  outPath,
  url,
  {
    type: "png",
    width: 336,
    margin: 4, // standard quiet-zone width — smaller margins hurt scan reliability
    color: { dark: "#000000", light: "#ffffff" },
    errorCorrectionLevel: "M",
  },
  (err) => {
    if (err) {
      console.error("[generate-app-qr] Failed to write QR:", err)
      process.exit(1)
    }
    console.log(`[generate-app-qr] Wrote ${outPath} encoding "${url}"`)
  }
)
