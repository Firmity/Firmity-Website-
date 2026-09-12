"use client"

import Link from "next/link"
import { useState, useRef, useCallback, type FormEvent, type MouseEvent } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X, ChevronDown, ArrowRight, Search, User } from "lucide-react"
import Image from "next/image"
import { Breadcrumbs } from "@/src/components/breadcrumbs"
import { useHashScroll, scrollToHash } from "@/src/hooks/use-hash-scroll"
import { useHideOnScroll } from "@/src/hooks/use-hide-on-scroll"

// Keep in sync with the `h-16`/`top-16` values below AND globals.css's
// `scroll-padding-top: 64px` AND home-sections.tsx's ExploreSection
// `scroll-mt-16` — all four must agree on the navbar's real height.
const NAV_HEIGHT = 64

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
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Runs sitewide (Navigation is rendered on every page) — resolves any
  // "/#id" URL once its target mounts. See use-hash-scroll.ts for why the
  // native browser hash-jump isn't enough on its own.
  useHashScroll()

  // Hidden while the mobile menu is open would strand that menu's overlay
  // below a gap — see use-hide-on-scroll.ts.
  const navHidden = useHideOnScroll(NAV_HEIGHT, isOpen)

  // Submits to /search?q=... — src/app/search/page.tsx (2026-09-04), backed
  // by GET /api/search (src/app/api/search/route.ts), which searches marketing
  // pages + published blog posts. Was UI-only parity with the Planon reference
  // nav before that; now a working search.
  const submitSearch = (e: FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    router.push(`/search?q=${encodeURIComponent(q)}`)
    setSearchOpen(false)
    setQuery("")
  }

  const openIndustries = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setIndustriesOpen(true)
  }, [])

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setIndustriesOpen(false), 180)
  }, [])

  // "Contact" removed from this list (2026-09-04) — it now duplicates the
  // CTA button below, which was renamed from "Book Demo" to "Contact" to
  // match the Planon reference nav. If you want a plain-text "Contact" link
  // back in the main nav alongside the button, re-add it here.
  // "Our Solutions" (2026-09-05) — jumps to the homepage's ExploreSection
  // (id="explore-solutions", src/components/home-sections.tsx).
  const navItems = [
    { label: "Features", href: "/features" },
    { label: "Our Solutions", href: "/#explore-solutions" },
    { label: "Resources", href: "/resources" },
    { label: "Blog", href: "/blog" },
  ]

  // Handles "/#id" nav items specifically (currently just "Our Solutions").
  // Already on the target page ("/")?  Skip the Link's own navigation
  // entirely and scroll directly — no full page reload, no flash. On any
  // OTHER page, let the Link navigate normally; useHashScroll (mounted
  // above, sitewide) picks the hash up once "/" has rendered.
  const handleHashNavClick = (e: MouseEvent, href: string) => {
    const hash = href.slice(href.indexOf("#"))
    if (pathname === "/") {
      e.preventDefault()
      scrollToHash(hash)
      history.replaceState(null, "", href)
    }
  }

  return (
    <>
    {/* `relative` is required so the absolute-positioned dropdown is contained by this sticky bar.
        position/top toggle (not a `transform`) is the exact technique Planon's
        own header uses (measured live off planonsoftware.com: a sticky
        60px `<header>` that toggles `top: 0` ↔ `top: -60px` with
        `transition: top .2s ease-in-out` on scroll direction) — `sticky`
        recomputes every scroll frame, so animating `top` slides the bar
        fully out of the flow on scroll-down and back on scroll-up, instead
        of the continuously-pinned bar this used to be. */}
    <nav
      className="sticky z-50 bg-white border-b border-[#e8edf4] shadow-[0_1px_4px_rgba(17,29,53,0.06)] relative transition-[top] duration-200 ease-in-out"
      style={{ top: navHidden ? `-${NAV_HEIGHT}px` : "0px" }}
    >
      {/* Padding scale matches the footer's container (px-6 sm:px-10 lg:px-16) —
          not HERO_PX (px-6 sm:px-10 lg:px-14) — so the logo's left edge and the
          Contact button's right edge line up with the footer content below,
          per request. Kept in sync with the Industries dropdown panel below. */}
      {/* Nav row height reverted h-24 (96px) → h-16 (64px), logo 120×96 → 100×80
          (2026-09-05, per request: "our navbar is larger than planon... make
          our navbar... the exact size as planon"). Measured Planon's actual
          header live (planonsoftware.com): 60px total. h-16 (64px) is the
          closest round Tailwind step to that AND is what globals.css's
          `scroll-padding-top: 64px` already assumed all along — the earlier
          h-24 bump had silently drifted out of sync with that value. Font
          sizes bumped a notch in the same pass (14px→15px links, 13.5px→14.5px
          CTA) per "increase the font sizes in the navbar" — a smaller bar
          with bigger type reads as intentional/compact rather than cramped.
          `top-24`/`top-16` occurrences elsewhere in this file (mobile menu
          offset) and the sticky offset in breadcrumbs.tsx must stay in sync
          with this h-16 — see NAV_HEIGHT above. */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
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
                className="flex items-center gap-1 text-[15px] font-medium text-[#2d3748] hover:text-[#2b6cb0] transition-colors cursor-pointer"
                aria-expanded={industriesOpen}
                aria-haspopup="true"
              >
                Industries
                <ChevronDown
                  size={14}
                  className={`mt-0.5 transition-transform duration-200 text-[#718096] ${industriesOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {navItems.map((item) => {
              const isHashLink = item.href.includes("#")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={isHashLink ? (e) => handleHashNavClick(e, item.href) : undefined}
                  className="text-[15px] font-medium text-[#2d3748] hover:text-[#2b6cb0] transition-colors"
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* CTA buttons — search icon / login icon / Contact button, matching the
              Planon reference nav (search box, globe, account icon, Contact button). */}
          <div className="hidden md:flex items-center gap-3">
            {searchOpen ? (
              <form onSubmit={submitSearch} className="flex items-center">
                <input
                  autoFocus
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onBlur={() => { if (!query) setSearchOpen(false) }}
                  placeholder="Search…"
                  className="w-40 text-[13px] px-3 py-1.5 rounded-full border border-[#e2e8f0] bg-[#f8fafc] text-[#2d3748] placeholder:text-[#a0aec0] focus:outline-none focus:border-[#2b6cb0] focus:bg-white transition-all"
                />
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="cursor-pointer text-[#718096] hover:text-[#2b6cb0] transition-colors p-1"
              >
                <Search size={17} />
              </button>
            )}

            <Link
              href="/login"
              aria-label="Login"
              title="Login"
              className="text-[#718096] hover:text-[#2b6cb0] transition-colors p-1"
            >
              <User size={17} />
            </Link>

            <Link
              href="/contact"
              className="bg-[#114dac] hover:bg-[#1a2744] text-white text-[14.5px] font-medium px-5 py-2 rounded-[4px] transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="cursor-pointer md:hidden text-[#2d3748] p-1"
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
          {/* Search */}
          <form onSubmit={submitSearch} className="flex items-center gap-2 pb-4 mb-3 border-b border-[#e8edf4]">
            <Search size={16} className="text-[#a0aec0] flex-shrink-0" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="flex-1 text-[14px] py-1.5 text-[#2d3748] placeholder:text-[#a0aec0] focus:outline-none"
            />
          </form>

          {/* Industries accordion */}
          <div>
            <button
              onClick={() => setIndustriesMobileOpen(!industriesMobileOpen)}
              className="cursor-pointer flex items-center justify-between w-full text-[15px] font-medium text-[#2d3748] hover:text-[#2b6cb0] transition-colors py-3 text-left"
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

          {navItems.map((item) => {
            const isHashLink = item.href.includes("#")
            return (
              <Link
                key={item.href}
                href={item.href}
                className="block text-[16px] font-medium text-[#2d3748] hover:text-[#2b6cb0] transition-colors py-3"
                onClick={(e) => {
                  if (isHashLink) handleHashNavClick(e, item.href)
                  setIsOpen(false)
                }}
              >
                {item.label}
              </Link>
            )
          })}

          <div className="flex flex-col gap-3 pt-5 mt-2 border-t border-[#e8edf4]">
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-[14px] font-medium text-[#2d3748] hover:text-[#2b6cb0] transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              <User size={15} />
              Login
            </Link>
            <Link
              href="/contact"
              className="text-center bg-[#114dac] hover:bg-[#1a2744] text-white text-[14px] font-medium px-5 py-3 rounded-[4px] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
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

          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10">
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
                    <span className="text-[14px] font-semibold text-[#114dac] group-hover:text-[#1a4a8a] transition-colors">
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
    {/* Sticky itself now (2026-09-04, was non-sticky — reversed per request
        "breadcrumbs bar should also be sticky like the navbar"), stacked
        directly under this <nav>'s bottom border via `sticky top-16` inside
        breadcrumbs.tsx — see that file for the offset/z-index rationale.
        Renders nothing on "/" (see breadcrumbs.tsx). */}
    <Breadcrumbs />
    </>
  )
}
