import { NextResponse } from "next/server";
import { BLOG_COOKIE, cookieOptions } from "@/src/lib/blog-auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(BLOG_COOKIE, "", { ...cookieOptions, maxAge: 0 });
  return res;
}
