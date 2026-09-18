import { redirect } from "next/navigation"

// This page moved to /facility-task-automation (2026-09-12, renamed to
// "Facility Task Automation"). The primary redirect is the 301 in
// next.config.mjs (`redirects()`), which Next.js checks before filesystem
// routes — this component is a safety net in case that config isn't picked
// up for some reason (e.g. a stale build). Kept instead of deleted so old
// bookmarks/inbound links never 404.
export default function PreventiveMaintenanceRedirect() {
  redirect("/facility-task-automation")
}
