"use client";
// Mobile bottom navigation for surveyors (#22). Fixed to the viewport bottom on
// phones only (md:hidden) — the desktop uses SurveyorTopNav instead. The active
// tab shows a filled accent (--brand) circle. Safe-area aware.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SURVEYOR_TABS } from "@/src/lib/surveyor-nav";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-md items-stretch justify-around px-2 py-1.5">
        {SURVEYOR_TABS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className="flex flex-1 flex-col items-center gap-0.5 py-1 text-[10px] font-medium text-slate-400 transition active:scale-95"
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full transition ${
                  active ? "bg-brand" : "text-slate-400"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className={active ? "text-slate-900" : ""}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
