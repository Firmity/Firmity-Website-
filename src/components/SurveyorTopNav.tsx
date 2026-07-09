"use client";
// Desktop top navigation for surveyor pages (hidden on phones, which use BottomNav).
// Sticky bar with brand wordmark + tab links; the active tab gets a filled accent.
// Render this at the TOP of each surveyor page so it sits above the content.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SURVEYOR_TABS } from "@/src/lib/surveyor-nav";

export default function SurveyorTopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 hidden border-b border-slate-200 bg-white/95 backdrop-blur md:block">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link href="/home" className="text-lg font-bold tracking-tight text-slate-900">
          Firmity
        </Link>
        <nav className="flex items-center gap-1">
          {SURVEYOR_TABS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                  active ? "bg-brand" : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
