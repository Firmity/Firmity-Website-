// Server gate → Marketing Studio (Blog editor).
import { redirect } from "next/navigation";
import { isBlogAuthed } from "@/src/lib/blog-guard";
import { StudioShell } from "@/src/components/studio/studio-shell";
import { EditorClient } from "./editor-client";

export const dynamic = "force-dynamic";

export default async function BlogEditorRoute() {
  if (!(await isBlogAuthed())) redirect("/blog-admin/login");
  return (
    <StudioShell>
      <EditorClient />
    </StudioShell>
  );
}
