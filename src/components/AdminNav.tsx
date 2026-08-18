"use client";
// Admin dashboard nav.
// - Desktop (sm+): inline link buttons (Staff & Roles, Question Bank, PDF Editor, Sign out).
// - Mobile (<sm): a single menu icon that opens a dropdown; PDF Editor is desktop-only (#6).
// Closes on outside-click / Escape so it never traps focus on touch devices.

import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FileText, LogOut, User, Users } from "lucide-react";
import { getSupabaseBrowser } from "@/src/lib/supabase-browser";

async function signOut() {
  await getSupabaseBrowser().auth.signOut();
  window.location.href = "/staff-login";
}

const LINK =
  "inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100";
const ITEM = "flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-left text-sm text-slate-700 outline-none data-[highlighted]:bg-slate-100";

export default function AdminNav() {
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

      {/* Mobile: profile avatar + Radix dropdown (portalled, viewport-aware) */}
      <div className="sm:hidden">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button type="button" aria-label="Profile menu" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white active:scale-95">
              <User className="h-5 w-5" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content align="end" sideOffset={6} collisionPadding={8} className="z-50 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
              <div className="border-b border-slate-100 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-400">Admin</div>
              <DropdownMenu.Item asChild>
                <Link href="/admin/users" className={ITEM}><Users className="h-4 w-4" /> Staff &amp; Roles</Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link href="/admin/questions" className={ITEM}><FileText className="h-4 w-4" /> Question Bank</Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item className={`${ITEM} border-t border-slate-100`} onSelect={signOut}>
                <LogOut className="h-4 w-4" /> Sign out
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </>
  );
}
