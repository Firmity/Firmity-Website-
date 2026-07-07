"use client";
// Top-right profile icon + dropdown: name, email, role, My Awards, Sign out.

import { useEffect, useState } from "react";
import Link from "next/link";
import { Award, LogOut, User } from "lucide-react";
import { getSupabaseBrowser } from "@/src/lib/supabase-browser";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState<{ email?: string; name?: string; role?: string }>({});

  useEffect(() => {
    (async () => {
      const sb = getSupabaseBrowser();
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return;
      const { data: prof } = await sb
        .from("profiles")
        .select("full_name,role,email")
        .eq("id", user.id)
        .single();
      setInfo({ email: user.email ?? prof?.email, name: prof?.full_name, role: prof?.role });
    })();
  }, []);

  async function signOut() {
    await getSupabaseBrowser().auth.signOut();
    window.location.href = "/staff-login";
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Profile"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
      >
        <User className="h-5 w-5" />
      </button>
      {open && (
        <div className="absolute right-0 z-40 mt-1 w-56 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="truncate text-sm font-medium text-slate-800">{info.name || info.email || "Staff"}</p>
            {info.email && <p className="truncate text-xs text-slate-500">{info.email}</p>}
            {info.role && (
              <span className="mt-1 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs capitalize text-slate-600">
                {info.role}
              </span>
            )}
          </div>
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            <Award className="h-4 w-4" /> My Awards
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}
