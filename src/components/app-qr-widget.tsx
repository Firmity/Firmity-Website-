import Link from "next/link"

// Floating "Scan to get the app" QR widget (2026-09-18/19, per request —
// "add this scan to get the app qr... exactly like the card i had shown in
// the image [x.com's own widget]... same dimensions and colors and
// roundness"). Card styling below was copied from x.com's live "Scan to get
// the app" widget's actual computed CSS (inspected directly, not guessed):
// bg #fff, border 1px rgba(0,0,0,.15), border-radius ~22px, shadow
// 0 4px 20px rgba(0,0,0,.08), 16px padding, 8px gap between the title and
// the QR, title text 13px/regular/rgba(0,0,0,.6)/centered. Change the QR's
// on-screen size by editing the `h-28 w-28` classes on the <img> below (28 =
// 112px, Tailwind's 4px scale — e.g. h-32 w-32 = 128px, or an arbitrary
// h-[140px] w-[140px]). The underlying PNG (public/images/app-qr-code.png)
// is generated at 336px (3x) so it stays crisp up to that display size
// without regenerating; past ~150-160px displayed, bump `width` in
// scripts/generate-app-qr.js and rerun `npm run generate:app-qr` too, or it
// starts to look soft. X's own widget is a plain <button> that does nothing
// on click; ours stays a <Link> since a clickable fallback for desktop
// users (no phone handy) is strictly more useful and nothing asked for it
// to be inert.
//
// The rest — rail wrapper, opacity-60-at-rest/opacity-100-on-hover-or-focus,
// hover-scale — is unchanged from the original pill-button version and
// matches WhatsAppButton (whatsapp-button.tsx), per the earlier explicit
// request that this widget behave "exactly like the existing ones".
//
// Stacking: WhatsApp sits at bottom-5 (20px, 48px tall → top edge ~68px).
// This card sits at bottom-20 (80px) — the same slot the "Free AI Survey"
// sticky thumbnail used to occupy before it was hidden (see the
// SHOW_STICKY_THUMBNAIL flag in survey-popup.tsx) — leaving the same ~12px
// gap above WhatsApp that was already tuned there: enough to read as two
// separate things, not so much it looks like dead space.
//
// Links to /get-app (src/app/get-app/route.ts), NOT straight to a store —
// that route reads the scanning device's User-Agent server-side and sends
// iPhone/iPad to NEXT_PUBLIC_APP_STORE_URL and Android to
// NEXT_PUBLIC_PLAY_STORE_URL (2026-09-19, per request: "send apple scanners
// to apple store and android scanners to playstore" — a single static QR
// can't branch by device on its own, so the branching happens server-side
// instead, one hop after the scan). See that route's file-header comment
// for the .env vars it reads and for the QR image encoding this same
// /get-app URL (scripts/generate-app-qr.js).
export function AppQrWidget() {
  return (
    <div className="fixed inset-x-0 bottom-20 z-40 pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex justify-end">
        <Link
          href="/get-app"
          aria-label="Scan the QR code to get the Firmity app"
          // opacity-60 at rest, full opacity on hover/keyboard-focus — same
          // treatment as WhatsAppButton and the (now-hidden) Free AI Survey
          // thumbnail. Card visuals (bg/border/radius/shadow/padding/gap)
          // match x.com's widget — see file-header comment.
          className="cursor-pointer pointer-events-auto flex flex-col items-center gap-2 bg-white border border-black/[0.15] rounded-[22px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-4 opacity-60 hover:opacity-100 focus-visible:opacity-100 transition-all duration-200 hover:scale-[1.05] hover:shadow-[0_8px_28px_rgba(0,0,0,0.14)]"
        >
          <span className="text-[13px] font-normal text-black/60 text-center leading-[1.25] max-w-[19em]">
            Scan to get the app
          </span>
          <img src="/images/app-qr-code.png" alt="" className="h-28 w-28 flex-shrink-0" />
        </Link>
      </div>
    </div>
  )
}
