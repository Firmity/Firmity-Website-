// TEMPORARY page for the Diwali reception RSVP (reached via QR code only).
// Remove this folder and src/app/api/diwali-rsvp/ after the event.
import type { Metadata, Viewport } from "next"

// Never indexed or followed, and not in the sitemap or linked from anywhere:
// the QR code is the only way in.
export const metadata: Metadata = {
  title: "Diwali Reception RSVP — Firmity",
  robots: { index: false, follow: false, nocache: true },
  // Legacy hint some Android browsers still read alongside color-scheme.
  other: { "supported-color-schemes": "light" },
}

// The card is a fixed light/burgundy design with hardcoded colours. Without a
// declared colour scheme, Samsung Internet and Chrome Android's "force dark"
// re-colour the page (cream card turns dark). `only light` tells the browser
// this page must never be auto-darkened. Emitted as <meta name="color-scheme">.
export const viewport: Viewport = {
  colorScheme: "only light",
}

// Same declaration as CSS on <html>: some browsers read the computed
// colour-scheme rather than the meta tag. Scoped to this route only — the
// style element unmounts when the guest leaves the page.
export default function DiwaliReceptionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{"html{color-scheme:only light}"}</style>
      {children}
    </>
  )
}
