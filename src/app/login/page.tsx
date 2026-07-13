"use client";

import Link from "next/link";
import Image from "next/image";
import { Building2, Users, Shield, MapPin, PenSquare, ArrowRight, type LucideIcon } from "lucide-react";

interface Option {
  title: string;
  description: string;
  Icon: LucideIcon;
  href: string;         // internal route OR external env URL (may be "#")
  external?: boolean;
  featured?: boolean;
}

export default function LoginPage() {
  const options: Option[] = [
    { title: "Client Login", description: "Your facility dashboard — operations, reports and real-time insights.", Icon: Building2, href: process.env.NEXT_PUBLIC_CLIENT_LOGIN_URL || "#", external: true },
    { title: "Employee Login", description: "Tasks, attendance and team collaboration for on-ground staff.", Icon: Users, href: process.env.NEXT_PUBLIC_EMPLOYEE_LOGIN_URL || "#", external: true, featured: true },
    { title: "Facility Manager", description: "Oversee maintenance, assets and compliance across sites.", Icon: Shield, href: process.env.NEXT_PUBLIC_FM_LOGIN_URL || "#", external: true },
    { title: "Surveyor Login", description: "Field surveyors — run on-site facility health surveys.", Icon: MapPin, href: "/staff-login" },
    { title: "Marketing Studio", description: "Manage blog posts and site SEO from the Marketing Studio.", Icon: PenSquare, href: "/blog-admin/login" },
  ];

  function onExternal(e: React.MouseEvent, href: string) {
    if (href === "#") {
      e.preventDefault();
      alert("This login isn't configured yet. Please contact support.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1829] via-[#111d35] to-[#0d1829] px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <Link href="/" className="mb-8 inline-flex items-center gap-2">
            <Image src="/firmity.png" alt="Firmity" width={130} height={40} className="object-contain brightness-0 invert" />
          </Link>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#63b3ed]">Firmity Platform</p>
          <h1 className="font-serif text-[clamp(1.9rem,4vw,2.8rem)] font-light text-white">Welcome back</h1>
          <p className="mt-2 text-[14px] font-light text-white/50">Choose how you'd like to sign in.</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {options.map((o) => {
            const inner = (
              <div
                className={`group flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                  o.featured
                    ? "border-[#2b6cb0] bg-white shadow-[0_18px_48px_rgba(43,108,176,0.25)]"
                    : "border-white/10 bg-white/[0.04] hover:border-[#2b6cb0]/60 hover:bg-white/[0.07]"
                }`}
              >
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${o.featured ? "bg-[#2b6cb0] text-white" : "bg-white/10 text-[#63b3ed] group-hover:bg-[#2b6cb0] group-hover:text-white"} transition-colors`}>
                  <o.Icon size={22} />
                </div>
                <h3 className={`mb-1.5 text-[16px] font-semibold ${o.featured ? "text-[#111d35]" : "text-white"}`}>{o.title}</h3>
                <p className={`mb-6 flex-1 text-[13px] font-light leading-relaxed ${o.featured ? "text-[#718096]" : "text-white/50"}`}>{o.description}</p>
                <span className={`inline-flex items-center gap-1.5 text-[13px] font-semibold ${o.featured ? "text-[#2b6cb0]" : "text-[#63b3ed]"}`}>
                  Sign in <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            );
            return o.external ? (
              <a key={o.title} href={o.href} onClick={(e) => onExternal(e, o.href)} className="block h-full">{inner}</a>
            ) : (
              <Link key={o.title} href={o.href} className="block h-full">{inner}</Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-[13px] text-white/50">
            New to Firmity?{" "}
            <Link href="/contact" className="font-semibold text-[#63b3ed] hover:text-white">Book a demo</Link>
          </p>
          <div className="mt-3 flex items-center justify-center gap-4 text-[12px] text-white/35">
            <Link href="/" className="hover:text-white/70">Back to home</Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-white/70">Contact support</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
