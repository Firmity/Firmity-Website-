"use client"

import { usePathname } from "next/navigation"
import { WhatsAppButton } from "@/src/components/whatsapp-button"
import { AppQrWidget } from "@/src/components/app-qr-widget"

// Widgets that belong on public/marketing pages only — never on authenticated
// or operational screens (admin, survey-taking, staff, blog-admin), which have
// their own FABs/bottom nav and shouldn't be cluttered with lead-gen CTAs.
//
// NOTE: <SurveyPopup /> is NOT rendered here — src/app/page.tsx (the actual
// homepage) already mounts it directly, home-page-only, by original design.
// Adding it here too would double-mount it on "/". Its sticky "Free AI
// Survey" thumbnail is hidden as of 2026-09-19 (per request — see the
// SHOW_STICKY_THUMBNAIL flag in survey-popup.tsx), freeing the bottom-20
// slot that AppQrWidget now occupies below.
//
// AppQrWidget (2026-09-18) IS rendered here, unlike SurveyPopup — it has no
// homepage-only content or session-storage state, so it's safe to mount
// site-wide the same way WhatsAppButton is. It sits at bottom-20, clear of
// WhatsApp — see app-qr-widget.tsx's file-header comment for the stacking
// math and why that's the same slot the survey thumbnail used to use.
//
// Mounted once in the root layout (src/app/layout.tsx) rather than repeated
// across every marketing page.tsx/layout.tsx. To add a new operational route,
// add its prefix here — don't scatter pathname checks elsewhere.
const EXCLUDED_PREFIXES = [
  "/admin",
  "/login",
  "/staff-login",
  "/employee-management-automation",
  "/profile",
  "/settings",
  "/my-surveys",
  "/surveys",
  "/survey",
  "/blog-admin",
  "/r",
]

export function MarketingWidgets() {
  const pathname = usePathname() ?? "/"
  const isExcluded = EXCLUDED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))

  if (isExcluded) return null

  return (
    <>
      <WhatsAppButton />
      <AppQrWidget />
    </>
  )
}
