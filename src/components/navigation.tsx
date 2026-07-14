"use client"

import Link from "next/link"
import { useState, useRef, useCallback } from "react"
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react"
import Image from "next/image"

const industryItems = [
  {
    label: "Manufacturing",
    href: "/industries/manufacturing",
    accent: "#2b6cb0",
    subItems: [
      { label: "PPM Scheduling", href: "/preventive-maintenance" },
      { label: "Asset Tracking", href: "/asset-management" },
      { label: "Breakdown Management", href: "/complaint-management" },
      { label: "Compliance Records", href: "/facility-records" },
    ],
  },
  {
    label: "Educational",
    href: "/industries/educational",
    accent: "#d97706",
    subItems: [
      { label: "Campus Help Desk", href: "/complaint-management" },
      { label: "Hostel & Block Records", href: "/facility-records" },
      { label: "Visitor Management", href: "/visitor-management" },
      { label: "Staff Attendance", href: "/staff-attendance" },
    ],
  },
  {
    label: "Residential",
    href: "/industries/residential",
    accent: "#276749",
    subItems: [
      { label: "Gate & Visitor Logs", href: "/visitor-management" },
      { label: "Resident Complaints", href: "/complaint-management" },
      { label: "Common Area PPM", href: "/preventive-maintenance" },
      { label: "Society Records", href: "/facility-records" },
    ],
  },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [industriesOpen, setIndustriesOpen] = useState(false)
  const [industriesMobileOpen, setIndustriesMobileOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openIndustries = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setIndustriesOpen(true)
  }, [])

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setIndustriesOpen(false), 180)
  }, [])

  const navItems = [
    { label: "Features", href: "/features" },
    { label: "Contact", href: "/contact" },
    { label: "Resources", href: "/resources" },
    { label: "Blog", href: "/blog" },
  ]

  return (
    // `relative` is required so the absolute-positioned dropdown is contained by this sticky bar
    <nav className="sticky top-0 z-50 bg-white border-b border-[#e8edf4] shadow-[0_1px_4px_rgba(17,29,53,0.06)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/firmity.png" alt="Firmity Logo" width={100} height={80} className="object-contain" />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">

            {/* Industries trigger — hover managed via state+timeout, not CSS group */}
            <div
              className="flex items-center h-16"
              onMouseEnter={openIndustries}
              onMouseLeave={scheduleClose}
            >
              <button
                className="flex items-center gap-1 text-[14px] font-medium text-[#2d3748] hover:text-[#2b6cb0] transition-colors cursor-pointer"
                aria-expanded={industriesOpen}
                aria-haspopup="true"
              >
                Industries
                <ChevronDown
                  size={13}
                  className={`mt-0.5 transition-transform duration-200 text-[#718096] ${industriesOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[14px] font-medium text-[#2d3748] hover:text-[#2b6cb0] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-[14px] font-medium text-[#2d3748] hover:text-[#2b6cb0] transition-colors"
            >
              Login
            </Link>
            <Link
              href="/contact"
              className="bg-[#111d35] hover:bg-[#1a2744] text-white text-[13.5px] font-medium px-5 py-2 rounded-xl transition-colors"
            >
              Book Demo
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#2d3748] p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* Mobile menu — full-screen overlay, sits outside the max-w container */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-white z-[60] overflow-y-auto px-6 py-5 space-y-1 border-t border-[#e8edf4]">
          {/* Industries accordion */}
          <div>
            <button
              onClick={() => setIndustriesMobileOpen(!industriesMobileOpen)}
              className="flex items-center justify-between w-full text-[15px] font-medium text-[#2d3748] hover:text-[#2b6cb0] transition-colors py-3 text-left"
            >
              <span>Industries</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 text-[#718096] ${industriesMobileOpen ? "rotate-180" : ""}`}
              />
            </button>
            {industriesMobileOpen && (
              <div className="pl-5 pb-2 space-y-1">
                {industryItems.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="block text-[14px] text-[#4a5568] hover:text-[#1a4a8a] transition-colors py-2.5"
                    onClick={() => { setIsOpen(false); setIndustriesMobileOpen(false) }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-[15px] font-medium text-[#2d3748] hover:text-[#2b6cb0] transition-colors py-3"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div className="flex flex-col gap-3 pt-5 mt-2 border-t border-[#e8edf4]">
            <Link
              href="/login"
              className="text-center text-[14px] font-medium text-[#2d3748] hover:text-[#2b6cb0] transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/contact"
              className="text-center bg-[#111d35] hover:bg-[#1a2744] text-white text-[14px] font-medium px-5 py-3 rounded-xl transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Book Demo
            </Link>
          </div>
        </div>
      )}

      {/* ── Full-width Industries Dropdown ─────────────────────────────────────
          Positioned absolute relative to the sticky nav bar.
          onMouseEnter/Leave mirrors the trigger so moving cursor into the
          panel clears the close timer — no disappearing on hover. */}
      <div
        className={`absolute left-0 right-0 top-full z-40 transition-all duration-200 origin-top
          ${industriesOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none"
          }`}
        onMouseEnter={openIndustries}
        onMouseLeave={scheduleClose}
        aria-hidden={!industriesOpen}
      >
        <div className="bg-white border-b border-[#dbe5f0] shadow-[0_16px_48px_rgba(17,29,53,0.11)]">
          {/* Top accent line */}
                <div className="h-[2px] bg-gradient-to-r from-[#2b6cb0] via-[#63b3ed] to-transparent" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-3 gap-0">
              {industryItems.map(({ label, href, accent, subItems }, colIdx) => (
                <div
                  key={href}
                  className={`px-10 first:pl-0 last:pr-0 ${colIdx < industryItems.length - 1 ? "border-r border-[#e8edf4]" : ""}`}
                >
                  {/* Column header — links to industry page */}
                  <Link
                    href={href}
                    className="group flex items-center gap-2 mb-5 pb-4 border-b border-[#e8edf4]"
                    style={{ paddingLeft: "10px", borderLeft: `3px solid ${accent}` }}
                    onClick={() => setIndustriesOpen(false)}
                  >
                    <span className="text-[14px] font-semibold text-[#111d35] group-hover:text-[#1a4a8a] transition-colors">
                      {label}
                    </span>
                    <ArrowRight size={12} className="text-[#1a4a8a] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                  {/* Sub-items */}
                  <div className="space-y-2.5 pl-[13px]">
                    {subItems.map(({ label: subLabel, href: subHref }) => (
                      <Link
                        key={subHref}
                        href={subHref}
                        className="block text-[12.5px] font-light text-[#4a5568] hover:text-[#1a4a8a] transition-colors py-0.5"
                        onClick={() => setIndustriesOpen(false)}
                      >
                        {subLabel}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-7 pt-5 border-t border-[#eef3f9] flex items-center justify-between">
              <p className="text-[12px] text-[#a0aec0] font-light">
                Firmity adapts to your industry&apos;s unique facility management challenges — get started quickly.
              </p>
              <Link
                href="/contact"
                className="text-[12px] font-semibold text-[#2b6cb0] hover:text-[#1a4f8a] transition-colors flex items-center gap-1"
                onClick={() => setIndustriesOpen(false)}
              >
                Talk to an expert <ArrowRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
