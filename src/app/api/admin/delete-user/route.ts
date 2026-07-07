// Admin-only: delete a staff user from Supabase Auth (and their profile row).
// Guards against an admin deleting their own account.

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/src/lib/supabase-admin";
import { getAdminId } from "@/src/lib/admin-guard";

export async function POST(req: NextRequest) {
  const adminId = await getAdminId(req);
  if (!adminId) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const { user_id } = await req.json().catch(() => ({}));
  if (!user_id) return NextResponse.json({ error: "user_id required" }, { status: 400 });
  if (user_id === adminId) {
    return NextResponse.json({ error: "you cannot delete your own account" }, { status: 400 });
  }

  const db = getSupabaseAdmin();
  const { error } = await db.auth.admin.deleteUser(user_id);
  if (error) {
    console.error("[DELETE_USER_ERR]", error);
    return NextResponse.json({ error: error.message }, { status: 502 });
  }
  // Remove the profile explicitly in case the FK isn't ON DELETE CASCADE.
  await db.from("profiles").delete().eq("id", user_id);
  return NextResponse.json({ ok: true });
}
