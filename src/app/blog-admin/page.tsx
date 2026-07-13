// Server gate → Marketing Studio (Blog tab). No middleware dependency.
import { redirect } from "next/navigation";
import { isBlogAuthed } from "@/src/lib/blog-guard";
import { StudioShell } from "@/src/components/studio/studio-shell";
import { DashboardClient } from "./dashboard-client";

export const dynamic = "force-dynamic";

export default async function BlogAdminHome() {
  if (!(await isBlogAuthed())) redirect("/blog-admin/login");
  return (
    <StudioShell>
      <DashboardClient />
    </StudioShell>
  );
}
