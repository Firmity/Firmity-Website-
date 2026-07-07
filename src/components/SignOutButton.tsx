"use client";

import { LogOut } from "lucide-react";
import { getSupabaseBrowser } from "@/src/lib/supabase-browser";

export default function SignOutButton() {
  async function signOut() {
    await getSupabaseBrowser().auth.signOut();
    window.location.href = "/staff-login";
  }
  return (
    <button
      type="button"
      onClick={signOut}
      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100"
    >
      <LogOut className="h-4 w-4" /> Sign out
    </button>
  );
}
