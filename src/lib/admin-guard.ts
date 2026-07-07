// Server-side admin gate for /api/admin/* routes. Verifies the caller's session
// cookie AND their profile role before any service-key operation runs.
// Returns the admin's user id, or null if the caller is not an authenticated admin.

import { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function getAdminId(req: NextRequest): Promise<string | null> {
  const auth = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => req.cookies.getAll(), setAll: () => {} } }
  );
  const {
    data: { user },
  } = await auth.auth.getUser();
  if (!user) return null;

  const { data: prof } = await auth.from("profiles").select("role").eq("id", user.id).single();
  return prof?.role === "admin" ? user.id : null;
}
