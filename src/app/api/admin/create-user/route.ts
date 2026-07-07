// Admin-only: create a staff user (Supabase Auth) and set their role.
// The handle_new_user trigger seeds the profiles row; we then set role/name.

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/src/lib/supabase-admin";
import { getAdminId } from "@/src/lib/admin-guard";

export async function POST(req: NextRequest) {
  if (!(await getAdminId(req))) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");
  const fullName = String(body.full_name ?? "").trim();
  const role = body.role === "admin" ? "admin" : "surveyor";

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "valid email required" }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "password must be at least 8 characters" }, { status: 400 });
  }

  const db = getSupabaseAdmin();
  const { data, error } = await db.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // staff accounts are pre-verified by the admin
    user_metadata: { full_name: fullName },
  });
  if (error) {
    console.error("[CREATE_USER_ERR]", error);
    return NextResponse.json({ error: error.message }, { status: 502 });
  }

  const uid = data.user?.id;
  if (uid) {
    await db.from("profiles").update({ role, full_name: fullName, email }).eq("id", uid);
  }
  return NextResponse.json({ ok: true, id: uid });
}
