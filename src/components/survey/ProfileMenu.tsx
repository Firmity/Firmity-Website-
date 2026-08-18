"use client";
// Top-right profile icon + dropdown: name, email, role, My Awards, Sign out.
// Uses Radix DropdownMenu: the content is PORTALLED to <body> with collision- and
// visualViewport-aware positioning, so it never mis-positions inside the sticky
// header on mobile (the manual `absolute` version did, on phones).

import { useEffect, useState } from "react";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Activity, Award, LogOut, Save, User } from "lucide-react";
import { getSupabaseBrowser } from "@/src/lib/supabase-browser";

const ITEM = "flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-left text-sm text-slate-700 outline-none data-[highlighted]:bg-slate-100";

// onSave/onHealth are survey-scoped actions surfaced here on MOBILE (they stay as
// inline header buttons on desktop). The items carry sm:hidden so they never
// duplicate the desktop buttons.
export default function ProfileMenu({ onSave, onHealth }: { onSave?: () => void; onHealth?: () => void } = {}) {
  const [info, setInfo] = useState<{ email?: string; name?: string; role?: string }>({});

  useEffect(() => {
    (async () => {
      const sb = getSupabaseBrowser();
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return;
      const { data: prof } = await sb.from("profiles").select("full_name,role,email").eq("id", user.id).single();
      setInfo({ email: user.email ?? prof?.email, name: prof?.full_name, role: prof?.role });
    })();
  }, []);

  async function signOut() {
    await getSupabaseBrowser().auth.signOut();
    window.location.href = "/staff-login";
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button type="button" aria-label="Profile" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200">
          <User className="h-5 w-5" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={6}
          collisionPadding={8}
          className="z-50 w-56 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg"
        >
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="truncate text-sm font-medium text-slate-800">{info.name || info.email || "Staff"}</p>
            {info.email && <p className="truncate text-xs text-slate-500">{info.email}</p>}
            {info.role && (
              <span className="mt-1 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs capitalize text-slate-600">{info.role}</span>
            )}
          </div>
          {onSave && (
            <DropdownMenu.Item className={`${ITEM} sm:hidden`} onSelect={onSave}>
              <Save className="h-4 w-4" /> Save progress
            </DropdownMenu.Item>
          )}
          {onHealth && (
            <DropdownMenu.Item className={`${ITEM} sm:hidden`} onSelect={onHealth}>
              <Activity className="h-4 w-4" /> Health score
            </DropdownMenu.Item>
          )}
          <DropdownMenu.Item asChild>
            <Link href="/profile" className={ITEM}><Award className="h-4 w-4" /> My Awards</Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={ITEM} onSelect={signOut}>
            <LogOut className="h-4 w-4" /> Sign out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
