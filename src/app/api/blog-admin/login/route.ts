import { NextResponse } from "next/server";
import { checkCredentials, signSession, BLOG_COOKIE, cookieOptions } from "@/src/lib/blog-auth";

export async function POST(req: Request) {
  try {
    const { username, password } = (await req.json().catch(() => ({}))) as {
      username?: string;
      password?: string;
    };
    if (!checkCredentials(username ?? "", password ?? "")) {
      return NextResponse.json({ ok: false, error: "Invalid username or password" }, { status: 401 });
    }
    const token = await signSession(username ?? "editor");
    const res = NextResponse.json({ ok: true });
    res.cookies.set(BLOG_COOKIE, token, cookieOptions);
    return res;
  } catch (e) {
    console.error("[BLOG_LOGIN_ERR]", e);
    return NextResponse.json({ ok: false, error: "Login failed" }, { status: 500 });
  }
}
