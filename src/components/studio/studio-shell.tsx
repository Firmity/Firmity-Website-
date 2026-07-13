"use client";
// Marketing Studio chrome: left sidebar (Blog + SEO Optimisation) + sign out.
// Wraps every authenticated studio page. Login page does NOT use this.

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FileText, Search, LogOut } from "lucide-react";

export function StudioShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const nav = [
    { href: "/blog-admin", label: "Blog", Icon: FileText, active: pathname === "/blog-admin" || pathname.startsWith("/blog-admin/editor") },
    { href: "/blog-admin/seo", label: "SEO Optimisation", Icon: Search, active: pathname.startsWith("/blog-admin/seo") },
  ];

  async function logout() {
    await fetch("/api/blog-admin/logout", { method: "POST" });
    router.push("/blog-admin/login");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-56 shrink-0 flex-col border-r border-[#e2e8f0] bg-white">
        <div className="border-b border-[#eef3f9] px-5 py-5">
          <p className="text-[15px] font-bold text-[#111d35]">Marketing Studio</p>
          <p className="text-[11px] text-[#a0aec0]">Firmity</p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map(({ href, label, Icon, active }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
                active ? "bg-[#eef3f9] text-[#2b6cb0]" : "text-[#4a5568] hover:bg-[#f8fafc]"
              }`}
            >
              <Icon size={16} /> {label}
            </Link>
          ))}
        </nav>
        <button
          onClick={logout}
          className="m-3 flex items-center gap-2 rounded-lg border border-[#e2e8f0] px-3 py-2 text-[13px] text-[#4a5568] hover:bg-[#f8fafc]"
        >
          <LogOut size={14} /> Sign out
        </button>
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
