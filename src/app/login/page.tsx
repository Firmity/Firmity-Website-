"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// 8×8 dot patterns — '1' = lit dot forming the glyph.
const GLYPHS: Record<string, string[]> = {
  building: ["00111100", "00111100", "01111110", "01011010", "01011010", "01111110", "01011010", "01111110"],
  people:   ["00011000", "00111100", "00111100", "00011000", "00111100", "01111110", "01111110", "01100110"],
  shield:   ["00111100", "01111110", "01111110", "01111110", "01111110", "00111100", "00111100", "00011000"],
};

// Muted multicolour gradient reused for the dots + the rotating outline.
const GRADIENT = "linear-gradient(125deg,#a9c2f5,#c3b3f2,#f3b6ce,#f7d3ad)";
const CONIC = "conic-gradient(from 0deg,#a9c2f5,#c3b3f2,#f3b6ce,#f7d3ad,#a9c2f5)";

function DotGlyph({ glyph }: { glyph: string }) {
  const cells = GLYPHS[glyph].join("").split("");
  return (
    <div
      className="mx-auto grid w-fit grid-cols-8 gap-[6px] rounded-2xl p-3 transition-[background] duration-500"
      style={{ backgroundImage: "none" }}
      data-grad={GRADIENT}
    >
      {cells.map((c, i) => (
        <span
          key={i}
          className={`h-[9px] w-[9px] rounded-full transition-colors duration-500 ${
            c === "1" ? "bg-[#b9ccf2] group-hover:bg-transparent" : "bg-[#edf1f7]"
          }`}
        />
      ))}
    </div>
  );
}

interface Tile {
  title: string;
  sub: string;
  glyph: string;
  href: string;
  external?: boolean;
}

export default function LoginPage() {
  const tiles: Tile[] = [
    { title: "Client Login", sub: "Your facility dashboard", glyph: "building", href: process.env.NEXT_PUBLIC_CLIENT_LOGIN_URL || "#", external: true },
    { title: "Employee Login", sub: "Tasks, attendance & team", glyph: "people", href: process.env.NEXT_PUBLIC_EMPLOYEE_LOGIN_URL || "#", external: true },
    { title: "Facility Manager", sub: "Maintenance & compliance", glyph: "shield", href: process.env.NEXT_PUBLIC_FM_LOGIN_URL || "#", external: true },
  ];

  function onExternal(e: React.MouseEvent, href: string) {
    if (href === "#") {
      e.preventDefault();
      alert("This login isn't configured yet. Please contact support.");
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f9fc] px-5 py-16 sm:px-6">
      {/* soft ambient blobs — keeps the light bg from feeling flat */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#a9c2f5]/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-[#f3b6ce]/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#f7d3ad]/25 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <Link href="/" className="mb-7 inline-block">
            <Image src="/firmity.png" alt="Firmity" width={128} height={40} className="mx-auto object-contain" />
          </Link>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8aa0d8]">Firmity Platform</p>
          <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-light text-[#111d35]">Welcome back</h1>
          <p className="mt-2 text-[14px] font-light text-[#7c8aa5]">Choose how you'd like to sign in.</p>
        </div>

        {/* 3 client-facing tiles */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {tiles.map((t) => {
            const inner = (
              <div className="group relative block h-full">
                {/* rotating gradient outline on hover */}
                <div
                  className="absolute -inset-[2px] rounded-[26px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: CONIC, animation: "spin 6s linear infinite" }}
                />
                {/* card — the DotGlyph grid reveals GRADIENT on hover via a sibling overlay */}
                <div className="relative flex h-full flex-col items-center rounded-3xl border border-[#eef2f8] bg-white px-6 py-9 text-center shadow-[0_10px_40px_rgba(17,29,53,0.05)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_22px_54px_rgba(17,29,53,0.10)]">
                  <div className="relative">
                    {/* gradient revealed through the lit (transparent-on-hover) dots */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ background: GRADIENT }}
                    />
                    <div className="relative">
                      <DotGlyph glyph={t.glyph} />
                    </div>
                  </div>
                  <p className="mt-5 text-[16px] font-semibold text-[#111d35]">{t.title}</p>
                  <p className="mt-1 text-[12.5px] font-light text-[#94a3b8]">{t.sub}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#5b7bd6] opacity-70 transition-all group-hover:gap-2.5 group-hover:opacity-100">
                    Sign in <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            );
            return t.external ? (
              <a key={t.title} href={t.href} onClick={(e) => onExternal(e, t.href)} className="block h-full">{inner}</a>
            ) : (
              <Link key={t.title} href={t.href} className="block h-full">{inner}</Link>
            );
          })}
        </div>

        {/* internal logins as quiet links */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px]">
          <Link href="/staff-login" className="font-medium text-[#5b7bd6] hover:text-[#111d35]">Surveyor login →</Link>
          <Link href="/blog-admin/login" className="font-medium text-[#5b7bd6] hover:text-[#111d35]">Marketing Studio →</Link>
        </div>

        <div className="mt-12 border-t border-[#e7ecf4] pt-8 text-center">
          <p className="text-[13px] text-[#7c8aa5]">
            New to Firmity? <Link href="/contact" className="font-semibold text-[#5b7bd6] hover:text-[#111d35]">Book a demo</Link>
          </p>
          <div className="mt-3 flex items-center justify-center gap-4 text-[12px] text-[#a3b0c6]">
            <Link href="/" className="hover:text-[#5b7bd6]">Back to home</Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-[#5b7bd6]">Contact support</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
