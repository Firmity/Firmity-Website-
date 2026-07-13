// Server-only guard for blog-admin API routes + server components.
import "server-only";
import { cookies } from "next/headers";
import { BLOG_COOKIE, verifySession } from "./blog-auth";

export async function isBlogAuthed(): Promise<boolean> {
  const token = (await cookies()).get(BLOG_COOKIE)?.value;
  return (await verifySession(token)) !== null;
}
