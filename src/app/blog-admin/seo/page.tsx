// Server gate → Marketing Studio (SEO Optimisation tab).
import { redirect } from "next/navigation";
import { isBlogAuthed } from "@/src/lib/blog-guard";
import { StudioShell } from "@/src/components/studio/studio-shell";
import { SeoManager } from "@/src/components/studio/seo-manager";

export const dynamic = "force-dynamic";

export default async function SeoAdminPage() {
  if (!(await isBlogAuthed())) redirect("/blog-admin/login");
  return (
    <StudioShell>
      <SeoManager />
    </StudioShell>
  );
}
