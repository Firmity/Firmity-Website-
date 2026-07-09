"use client";
// Admin dashboard nav.
// - Desktop (sm+): inline link buttons (Staff & Roles, Question Bank, PDF Editor, Sign out).
// - Mobile (<sm): a single menu icon that opens a dropdown; PDF Editor is desktop-only (#6).
// Closes on outside-click / Escape so it never traps focus on touch devices.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FileText, LogOut, User, Users } from "lucide-react";
import { getSupabaseBrowser } from "@/src/lib/supabase-browser";

async function signOut() {
  await getSupabaseBrowser().auth.signOut();
  window.location.href = "/staff-login";
}

const LINK =
  "inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100";

export default function AdminNav() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* Desktop: inline buttons */}
      <div className="hidden flex-wrap items-center gap-2 sm:flex">
        <Link href="/admin/users" className={LINK}>Staff &amp; Roles</Link>
        <Link href="/admin/questions" className={LINK}>Question Bank</Link>
        <Link href="/admin/pdf-editor" className={LINK}>PDF Report Editor</Link>
        <button type="button" onClick={signOut} className={LINK}>
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>

      {/* Mobile: profile avatar + dropdown */}
      <div ref={ref} className="relative sm:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Profile menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white active:scale-95"
        >
          <User className="h-5 w-5" />
        </button>
        {open && (
          <div className="absolute right-0 z-40 mt-1 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
            <div className="border-b border-slate-100 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Admin
            </div>
            <Link
              href="/admin/users"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100"
            >
              <Users className="h-4 w-4" /> Staff &amp; Roles
            </Link>
            <Link
              href="/admin/questions"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100"
            >
              <FileText className="h-4 w-4" /> Question Bank
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="flex w-full items-center gap-2 border-t border-slate-100 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-100"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        )}
      </div>
    </>
  );
}
