"use client"

import { usePathname } from "next/navigation"
import { WhatsAppButton } from "@/src/components/whatsapp-button"

// Widgets that belong on public/marketing pages only — never on authenticated
// or operational screens (admin, survey-taking, staff, blog-admin), which have
// their own FABs/bottom nav and shouldn't be cluttered with lead-gen CTAs.
//
// NOTE: <SurveyPopup /> is NOT rendered here — src/app/page.tsx (the actual
// homepage) already mounts it directly, home-page-only, by original design.
// Adding it here too would double-mount it on "/". It stays positioned at
// bottom-24 (see survey-popup.tsx) purely so it doesn't overlap the WhatsApp
// button below it when both happen to be on screen together.
//
// Mounted once in the root layout (src/app/layout.tsx) rather than repeated
// across every marketing page.tsx/layout.tsx. To add a new operational route,
// add its prefix here — don't scatter pathname checks elsewhere.
const EXCLUDED_PREFIXES = [
  "/admin",
  "/login",
  "/staff-login",
  "/staff-attendance",
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

  return <WhatsAppButton />
}
