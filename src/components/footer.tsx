"use client"
// ^ Added 2026-09-04 — Footer now has its own newsletter-signup state
// (useState/fetch for /api/newsletter), which requires a Client Component
// boundary. Safe regardless of which page renders Footer (server or client
// parent) since Client Components can be nested inside either.

// import Link from "next/link"
// import Image from "next/image"

// export function Footer() {
//   return (
//     <footer className="bg-foreground text-background py-12 mt-20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//           {/* Brand */}
//           <div className="flex flex-col gap-2">
//              <Link href="/" className="flex items-center gap-2">
           
//             <Image src="/firmity.png" alt="Firmity Logo" width={100} height={80} className="object-contain" />
//             {/* <span className="font-bold text-lg text-foreground">Firmity</span> */}
          
//           </Link>
//             <p className="text-sm opacity-80">Complete Facility Management Software Suite</p>
//           </div>

//           {/* Product */}
//           <div className="flex flex-col gap-2">
//             <h4 className="font-semibold">Product</h4>
//             <Link href="/features" className="text-sm hover:underline opacity-80">
//               Features
//             </Link>
//             {/* <Link href="/pricing" className="text-sm hover:underline opacity-80">
//               Pricing
//             </Link> */}
//             <Link href="/resources" className="text-sm hover:underline opacity-80">
//               Resources
//             </Link>
//           </div>

//           {/* Company */}
//           <div className="flex flex-col gap-2">
//             <h4 className="font-semibold">Company</h4>
//             {/* <Link href="/about" className="text-sm hover:underline opacity-80">
//               About Us
//             </Link> */}
//             <Link href="/contact" className="text-sm hover:underline opacity-80">
//               Contact
//             </Link>
//             <Link href="/login" className="text-sm hover:underline opacity-80">
//               Login
//             </Link>
//           </div>

//           {/* Contact */}
//           <div className="flex flex-col gap-2">
//             <h4 className="font-semibold">Get Started</h4>
//             <p className="text-sm opacity-80">2 Weeks Free Trial</p>
//             <Link href="/contact" className="text-sm font-semibold hover:underline text-accent">
//               Book Demo
//             </Link>
//           </div>
//         </div>

//         <div className="border-t border-background/20 pt-8 text-center text-sm opacity-80">
//           <p>Firmity is a registered software of UFIRM Technologies (P) Limited - Proudly Made in India</p>
//           <p className="mt-2">Productivity • Longevity • Sustainability</p>
//         </div>
//       </div>
//     </footer>
//   )
// }
























import Link from "next/link"
import Image from "next/image"
import { useState, useRef, type FormEvent } from "react"
import { Linkedin, Instagram, Youtube, Mail, MapPin, Loader2, CheckCircle2, AlertCircle } from "lucide-react"

// ─── Footer — rebuilt 2026-09-04 to match Planon's own site footer layout ─────
// (planonsoftware.com/us, screenshot supplied by request: "make the footer
// exactly like planon footer"). Structure copied: a 5-column link grid
// (Solutions / Industries / Company / Portals / Contact Us with newsletter +
// social), then a standalone "Request a Demo" prompt with an outlined pill
// button below the grid. Column CONTENT is Firmity's own — Planon's actual
// columns (IWMS/CAFM/BIM/etc.) don't map onto Firmity's product surface, so
// each column was repopulated with the real pages this site has rather than
// copying Planon's own link labels verbatim.
// Brand/logo row kept above the grid (not present in the supplied
// screenshot's crop) — removing Firmity's own logo from its footer would be
// a regression the request wasn't asking for; only the link-grid/newsletter/
// social/CTA STRUCTURE below it was copied from Planon.

// Minimal inline X (formerly Twitter) mark — same icon used in
// KeepInTouchSection (src/components/home-sections.tsx) for the real X
// logo, since lucide-react's own Twitter/X export has shifted across
// versions. Duplicated here rather than imported so this file doesn't
// depend on that component's internals.
function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-7.5 8.6L23.3 22H16.9l-5-6.6L6.1 22H3l8-9.1L2.9 2h6.6l4.5 6L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />
    </svg>
  )
}

// Same 8 modules as MODULES_LIST (src/components/home-sections.tsx) —
// duplicated here (not imported) since that array isn't exported and this
// footer only needs title+slug, not the full description/icon shape. Keep
// slugs AND titles in sync with that array if modules are ever renamed/
// reordered. Titles updated 2026-09-05 to match MODULES_LIST's ERP-suffixed
// rename exactly (was a shorter, independently-worded set here — per
// request: "you did not update the Payroll Automation ERP etc etc in the
// footer... make sure you update it"). Every slug now also resolves to a
// real section on /features (payroll-management and facility-expense-
// management were anchor-less before this batch — see that page's FEATURES
// array) and to a real facility ERP keyword variant for SEO, not just CMMS.
const SOLUTIONS = [
  { title: "Facility Task Automation", slug: "preventive-maintenance" },
  { title: "Assets & Spares Automation", slug: "asset-management" },
  { title: "Complaint & Helpdesk Automation", slug: "complaint-management" },
  { title: "Inventory & Vendor Automation ERP", slug: "inventory-management" },
  { title: "Visitor Management Automation", slug: "visitor-management" },
  { title: "Employee Management Automation", slug: "staff-attendance" },
  { title: "Payroll Automation ERP", slug: "payroll-management" },
  { title: "Facility Expense Automation ERP", slug: "facility-expense-management" },
]

// Filled Planon-blue circles + white icon — same treatment as
// KeepInTouchSection's social row (2026-09-04 pass), for consistency
// across the two social-link placements on the site.
const SOCIALS = [
  { Icon: Instagram, href: "https://www.instagram.com/_firmity_?igsi=dGt2d2hjOW4wbnJo", label: "Instagram" },
  { Icon: Linkedin,  href: "https://www.linkedin.com/showcase/firmity-software-real-estate/", label: "LinkedIn" },
  { Icon: Youtube,   href: "https://www.youtube.com/@Firmity", label: "YouTube" },
  { Icon: XIcon,     href: "https://x.com/firmityglobal", label: "X" },
  // Facebook intentionally omitted — same reasoning as KeepInTouchSection:
  // user said "i think is connected" with no URL confirmed, so no link is
  // fabricated. Add once confirmed.
]

const colHeading = "text-[15px] font-semibold text-[#114dac] mb-1"
const colLink = "text-[13.5px] text-[#1a4a8a] hover:text-[#114dac] hover:underline font-light transition-colors"

const NEWSLETTER_MIN_SUBMIT_MS = 1500

export function Footer() {
  // Newsletter signup state — wired to /api/newsletter (2026-09-04, per
  // request: "make sure that the Subscribe to our newsletter and Keep in
  // touch sign up cta are both connected to firmity9@gmail.com like the
  // rest"). Same honeypot + min-submit-time pattern as KeepInTouchSection's
  // own newsletter form (src/components/home-sections.tsx) — duplicated
  // rather than shared since the two forms have different visual treatments.
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("") // honeypot — must stay empty
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const mountedAt = useRef(Date.now())

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (website.trim().length > 0 || Date.now() - mountedAt.current < NEWSLETTER_MIN_SUBMIT_MS) {
      return
    }
    setSubmitting(true)
    setError("")
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer", website }),
      })
      if (!res.ok) throw new Error("Failed to sign up")
      setSubmitted(true)
      setEmail("")
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <footer className="bg-white border-t border-[#dbe5f0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-8">

        {/* Brand row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
          <Link href="/" className="inline-flex items-start">
            <Image
              src="/firmity.png"
              alt="Firmity Logo"
              width={110}
              height={36}
              className="object-contain"
            />
          </Link>
          <p className="text-[12.5px] text-[#1a4a8a] font-light">
            Complete Facility Management Software Suite
          </p>
        </div>

        {/* Main grid — 5 columns on desktop, matching Planon's own footer layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-7 mb-8">

          {/* Our Solutions */}
          <div className="flex flex-col gap-2">
            <h4 className={colHeading}>Our Solutions</h4>
            <Link href="/features" className={colLink}>Features Overview</Link>
            {SOLUTIONS.map(({ title, slug }) => (
              <Link key={slug} href={`/features#${slug}`} className={colLink}>
                {title}
              </Link>
            ))}
          </div>

          {/* Industries (Planon's "Topics" analog) — Resources moved OUT
              2026-09-04, now lives in Company below (per request: "remove
              resources from industries"). */}
          <div className="flex flex-col gap-2">
            <h4 className={colHeading}>Industries</h4>
            <Link href="/industries/manufacturing" className={colLink}>Manufacturing</Link>
            <Link href="/industries/educational" className={colLink}>Educational</Link>
            <Link href="/industries/residential" className={colLink}>Residential</Link>
          </div>

          {/* Company — Privacy Policy/Terms & Conditions live in the bottom
              legal bar (see below), matching Planon's own footer layout.
              Contact Us swapped out for Blog/Resources/Case Studies
              2026-09-04, per request: "Company Contact Us Blog... replace
              it with Blog Resources Case Studies". Case Studies deep-links
              to /blog pre-filtered to the "Case Study" category (see
              blog-index.tsx's own URL-param handling) — depends on at
              least one published post actually having that category set;
              see the CustomersSaySection caveat elsewhere re: the DB
              category field for /blog/spreadsheets-to-cmms. */}
          <div className="flex flex-col gap-2">
            <h4 className={colHeading}>Company</h4>
            <Link href="/blog" className={colLink}>Blog</Link>
            <Link href="/resources" className={colLink}>Resources</Link>
            <Link href={`/blog?category=${encodeURIComponent("Case Study")}`} className={colLink}>Case Studies</Link>
          </div>

          {/* Portals */}
          <div className="flex flex-col gap-2">
            <h4 className={colHeading}>Portals</h4>
            <Link href="/login" className={colLink}>Customer Login</Link>
            <Link href="/staff-login" className={colLink}>Survey Login</Link>
            <Link href="/blog-admin/login" className={colLink}>Marketing Studio</Link>
          </div>

          {/* Contact Us — wider info block, matches Planon's own rightmost column */}
          <div className="col-span-2 sm:col-span-1 flex flex-col gap-2">
            <h4 className={colHeading}>Contact Us</h4>
            {/* mailto: link (2026-09-04, per request: "when someone clicks
                on demo@firmity.in in the footer, it should open their
                email") — was a plain non-interactive <span>. */}
            <a href="mailto:demo@firmity.in" className="flex items-start gap-2 hover:underline">
              <Mail size={14} className="text-[#114dac] flex-shrink-0 mt-0.5" />
              <span className="text-[13px] text-[#1a4a8a] font-light">demo@firmity.in</span>
            </a>
            <div className="flex items-start gap-2">
              <MapPin size={14} className="text-[#114dac] flex-shrink-0 mt-0.5" />
              <span className="text-[13px] text-[#1a4a8a] font-light">UFIRM Technologies (P) Ltd, India</span>
            </div>
            <Link href="/contact" className={`${colLink} mt-1`}>&gt; Get in touch</Link>

            {/* Newsletter — wired to /api/newsletter 2026-09-04 (see
                handleNewsletterSubmit above); was UI-only before. */}
            <p className="text-[11px] font-semibold text-[#114dac] uppercase tracking-[0.1em] mt-2">
              Subscribe to our newsletter
            </p>
            {submitted ? (
              <div className="flex items-center gap-1.5 text-[12.5px] text-emerald-700 font-medium">
                <CheckCircle2 size={14} className="flex-shrink-0" />
                Thanks for signing up!
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                {/* Honeypot — hidden off-screen, same pattern as brochure-download-form.tsx */}
                <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="footer-website">Website</label>
                  <input
                    id="footer-website"
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your e-mail"
                  className="flex-1 min-w-0 text-[12.5px] px-3 py-2 rounded-[4px] border border-[#cbd5e0] bg-white text-[#114dac] placeholder:text-[#000000] focus:outline-none focus:border-[#114dac] focus:ring-1 focus:ring-[#114dac] transition-colors"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="cursor-pointer flex-shrink-0 bg-[#114dac] hover:bg-[#0e3e8a] text-white text-[12px] font-semibold px-3.5 py-2 rounded-[4px] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {submitting ? <Loader2 size={14} className="animate-spin" /> : "Sign up"}
                </button>
              </form>
            )}
            {error && (
              <div className="flex items-center gap-1.5 text-[11.5px] text-red-600">
                <AlertCircle size={12} className="flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Follow us — filled blue circles, matches KeepInTouchSection's social row */}
            <p className="text-[11px] font-semibold text-[#114dac] uppercase tracking-[0.1em] mt-2">
              Follow Us
            </p>
            <div className="flex items-center gap-2.5">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="cursor-pointer w-9 h-9 rounded-full bg-[#114dac] hover:bg-[#0e3e8a] flex items-center justify-center text-white transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Request a Demo — standalone prompt below the grid, matching
            Planon's own footer (large heading + outlined pill CTA). */}
        <div className="border-t border-[#dbe5f0] pt-6 mb-6">
          <h3 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-light text-[#114dac] tracking-tight mb-3">
            Request a Demo
          </h3>
          <Link
            href="/contact"
            className="cursor-pointer inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-[#114dac] text-[#114dac] text-[13px] font-semibold hover:bg-[#114dac] hover:text-white transition-colors"
          >
            Schedule today
          </Link>
        </div>

        {/* Bottom rule + legal — merged into ONE row 2026-09-04 (was legal
            text/copyright stacked above a separate link row) per request:
            put the registered-software + copyright line "in the same line
            as [Privacy Policy][Terms & Conditions][Sitemap][Contact]".
            Legal text + copyright combined into a single <p> (was two)
            since they're reading as one continuous line now, not two
            independently-centered blocks. Sitemap points at /sitemap.xml,
            Next.js's auto-generated route (src/app/sitemap.ts) rather than
            an HTML page — same convention most sites use for this link. */}
        <div className="border-t border-[#dbe5f0] pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-[#2b6cb0]/70 font-light text-center sm:text-left">
            Firmity is a registered software of UFIRM Technologies (P) Limited © {new Date().getFullYear()} | Proudly Made in India
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2 flex-shrink-0">
            <Link href="/privacy" className="text-[12px] text-[#114dac] hover:underline font-light">Privacy Policy</Link>
            <Link href="/terms" className="text-[12px] text-[#114dac] hover:underline font-light">Terms &amp; Conditions</Link>
            <Link href="/sitemap.xml" className="text-[12px] text-[#114dac] hover:underline font-light">Sitemap</Link>
            <Link href="/contact" className="text-[12px] text-[#114dac] hover:underline font-light">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}