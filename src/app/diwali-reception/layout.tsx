// TEMPORARY page for the Diwali reception RSVP (reached via QR code only).
// Remove this folder and src/app/api/diwali-rsvp/ after the event.
import type { Metadata } from "next"

// Never indexed or followed, and not in the sitemap or linked from anywhere:
// the QR code is the only way in.
export const metadata: Metadata = {
  title: "Diwali Reception RSVP — Firmity",
  robots: { index: false, follow: false, nocache: true },
}

export default function DiwaliReceptionLayout({ children }: { children: React.ReactNode }) {
  return children
}
