// Protects the internal survey app and enforces roles.
//   - Any signed-in staff: /survey/*, /profile, photo upload.
//   - Admin only: /surveys (all-bookings dashboard) and /admin/*.
// The public booking form (/facility-survey) stays open.

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
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

  const { data: { user } } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;

  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/staff-login";
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }

  const adminOnly =
    path === "/surveys" ||
    path.startsWith("/surveys/") ||
    path.startsWith("/admin") ||
    path.startsWith("/api/admin");
  if (adminOnly) {
    const { data: prof } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    if (prof?.role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/my-surveys"; // surveyors land on their assigned list
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/surveys/:path*",
    "/survey/:path*",
    "/my-surveys/:path*",
    "/api/survey-photo",
    "/api/my-surveys",
    "/api/admin/:path*",
    "/profile/:path*",
    "/admin/:path*",
  ],
};
