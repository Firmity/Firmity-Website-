// Smart "get the app" redirector (2026-09-19, per request — "send apple
// scanners to apple store and android scanners to playstore like its right
// now sending everyone to playstore"). A single static QR code can only
// encode one fixed URL, so it can't itself branch by device — the QR
// (public/images/app-qr-code.png, see scripts/generate-app-qr.js) and the
// floating widget's link (src/components/app-qr-widget.tsx) both point HERE
// instead of at a store link directly. This route reads the request's own
// User-Agent and 302-redirects to the right destination:
//   iPhone/iPad/iPod  -> NEXT_PUBLIC_APP_STORE_URL
//   Android            -> NEXT_PUBLIC_PLAY_STORE_URL
//   anything else       -> NEXT_PUBLIC_APP_DOWNLOAD_URL (desktop/unknown UA)
//
// Consequence: once the real store links exist, they only need to go into
// .env (see the block below) — the QR does NOT need regenerating again,
// since it already just points at /get-app. Regenerating it is only needed
// if the domain itself ever changes.
//
// Known limitation: iPadOS 13+ Safari reports a desktop-Mac User-Agent by
// default (no touch/iPad signal in the UA string itself), so an iPad in
// that default mode falls through to the ANDROID_RE miss and lands on the
// desktop/unknown fallback, not the App Store. There's no fully reliable
// server-side fix for that without User-Agent Client Hints (`Sec-CH-UA-*`
// headers), which iOS Safari doesn't send — flagging it rather than hiding
// it, since it's the standard limitation of any UA-sniffing app-download
// redirector, not a bug in this implementation.
//
// .env additions this route reads (add these — .env can't be written by
// remote tools, see the chat for why):
//   NEXT_PUBLIC_APP_STORE_URL=https://apps.apple.com/app/id...
//   NEXT_PUBLIC_PLAY_STORE_URL=https://play.google.com/store/apps/details?id=...
// NEXT_PUBLIC_APP_DOWNLOAD_URL already exists (whatsapp-cta era placeholder,
// see app-qr-widget.tsx's history) and now serves only as the fallback for
// visitors who are neither iOS nor Android.

import { NextResponse, type NextRequest } from "next/server"

const IOS_RE = /iPhone|iPad|iPod/i
const ANDROID_RE = /Android/i

const FALLBACK_URL = process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL || "https://www.firmity.in"

// Validate env-supplied URLs before ever redirecting to them (2026-09-18,
// after a report of a broken redirect — DevTools showed a failed request to
// "itms-appss://apps.apple.com/app/id=com.firmity.cmms", a hand-typed .env
// value with a typo'd scheme (itms-appss, not itms-apps) AND the wrong
// format for that scheme (needs a numeric App Store id, not a bundle id like
// com.firmity.cmms) — Safari can't resolve it, so the "scan" flow just
// broke). Rather than trust .env content blindly (external input — same
// validate-before-use principle as any other untrusted input), only accept
// a value that parses as an absolute http(s) URL; anything else — a typo, a
// non-URL placeholder, an unsupported custom scheme like itms-apps: — falls
// back to FALLBACK_URL (the site itself) instead of sending someone's phone
// into a dead link. Once this rejects a value, fix the .env line directly:
// the correct Apple format is a plain https://apps.apple.com/app/idNNNNNNN
// link (Apple resolves that straight to the App Store app on an iPhone) —
// NOT an itms-apps:// URI, which needs the numeric id too and buys nothing
// extra here.
function safeStoreUrl(value: string | undefined): string {
  if (!value) return FALLBACK_URL
  try {
    const parsed = new URL(value)
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return FALLBACK_URL
    return value
  } catch {
    return FALLBACK_URL
  }
}

const APP_STORE_URL = safeStoreUrl(process.env.NEXT_PUBLIC_APP_STORE_URL)
const PLAY_STORE_URL = safeStoreUrl(process.env.NEXT_PUBLIC_PLAY_STORE_URL)

export async function GET(request: NextRequest) {
  const ua = request.headers.get("user-agent") || ""

  const destination = IOS_RE.test(ua) ? APP_STORE_URL : ANDROID_RE.test(ua) ? PLAY_STORE_URL : FALLBACK_URL

  // 302 (not 301): this must never be cached as permanent — the target
  // depends on a header (User-Agent) and on env vars that will change once
  // real store links are added. Vary + no-store keep any CDN/browser cache
  // from serving one visitor's redirect to the next visitor on a different
  // platform.
  const response = NextResponse.redirect(destination, 302)
  response.headers.set("Vary", "User-Agent")
  response.headers.set("Cache-Control", "no-store")
  return response
}
