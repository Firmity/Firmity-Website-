// Protects the internal survey app.
//  - Unauthenticated requests to any matched route -> redirected to /staff-login.
//  - Admin-only areas (/surveys dashboard, /admin/*) additionally require role=admin;
//    non-admins are bounced to /home. This is defense-in-depth on top of the
//    per-endpoint 403 checks and Supabase RLS.
// The public booking form (/facility-survey) and its API stay open.

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// /surveys (plural, admin dashboard) and /admin/* are admin-only.
// /survey/* (singular, the form) is used by BOTH roles, so it is NOT gated here.
function isAdminPath(pathname: string): boolean {
  return pathname === "/surveys" || pathname.startsWith("/surveys/") || pathname.startsWith("/admin");
}

export async function middleware(request: NextRequest) {
  // NB: /blog-admin is NOT gated here — it uses its own signed-cookie auth,
  // enforced server-side in the blog-admin pages + API routes (see blog-guard.ts).
  const response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refreshes the session and tells us if the user is signed in.
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/staff-login";
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Role gate for admin-only areas.
  if (isAdminPath(request.nextUrl.pathname)) {
    const { data: prof } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    if (prof?.role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/home";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/home/:path*",
    "/my-surveys/:path*",
    "/awards/:path*",
    "/settings/:path*",
    "/profile/:path*",
    "/surveys/:path*",
    "/survey/:path*",
    "/admin/:path*",
    "/api/survey-photo",
  ],
};
