// "use client"

// import { Navigation } from "@/src/components/navigation"
// import { Footer } from "@/src/components/footer"
// import { BrochureDownloadForm } from "@/src/components/brochure-download-form"
// import { SurveyPopup } from "@/src/components/survey-popup"
// import { ClientsCarousel } from "@/src/components/clients-carousel"
// import Link from "next/link"
// import Image from "next/image"
// import { CheckCircle, ArrowRight, Play } from "lucide-react"
// import { useState, useEffect } from "react"

// export default function Home() {
//   const [videoOpen, setVideoOpen] = useState(false)

//   useEffect(() => {
//     setVideoOpen(true)
//   }, [])

//   const videoUrl = process.env.NEXT_PUBLIC_VIDEO_URL || '';

//   const benefits = [
//     {
//       title: "Centralized records enable faster decision-making",
//       icon: "📊",
//     },
//     {
//       title: "Automated task alerts ensure nothing is missed",
//       icon: "🔔",
//     },
//     {
//       title: "Integrated modules boost team coordination and speed",
//       icon: "⚡",
//     },
//   ]

//   const pillars = [
//     {
//       title: "Productivity",
//       description:
//         "Scheduled PPM extends asset life. Digital logs support better upkeep planning. Smart tracking reduces wear and tear.",
//       icon: "🚀",
//     },
//     {
//       title: "Longevity",
//       description:
//         "Planned preventive maintenance increases equipment lifespan. Real-time monitoring enables proactive interventions.",
//       icon: "⏱️",
//     },
//     {
//       title: "Sustainability",
//       description:
//         "Efficient resource use cuts waste. Paperless operations promote eco-friendliness. Smart access control lowers energy use.",
//       icon: "🌱",
//     },
//   ]

//   return (
//     <>
//       <Navigation />
//       <main>
//         {/* Hero Section */}
//         <section className="bg-gradient-to-br from-primary/5 to-background py-16 md:py-24">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//               <div className="space-y-6">
//                 <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
//                   Powered by Technology
//                 </div>
//                 <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
//                   The Complete Facility Management Software Suite
//                 </h1>
//                 <p className="text-lg text-foreground/80">
//                   Firmity is a smart, integrated facility management software built to simplify operations, enhance
//                   visibility, and empower teams with real-time control over maintenance, assets, workforce, and
//                   compliance—digitally and efficiently.
//                 </p>
//                 <div className="flex gap-4">
//                   <Link
//                     href="/contact"
//                     className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center gap-2"
//                   >
//                     Book Tech Demo <ArrowRight size={20} />
//                   </Link>
//                   {/* <Link
//                     href="/pricing"
//                     className="border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary/10 transition-colors font-semibold"
//                   >
//                     Try Free for 2 Weeks
//                   </Link> */}
//                 </div>
//               </div>
// <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 flex items-center justify-center min-h-80">
//                 <Image
//                   src="/Home_page.png"
//                   alt="Firmity Dashboard - Cloud-Based Facility Management"
//                   width={800}
//                   height={800}
//                   className="w-full h-full object-cover rounded-lg"
//                   priority
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Problem Statement */}
//         <section className="py-16 md:py-20 bg-background">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//             <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">
//               Real Challenges, Real Solutions
//             </h2>
//             <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 space-y-4">
//               <p className="text-lg text-foreground/90">
//                 Imagine missing an AMC renewal, overlooking a water tank cleaning schedule, or losing track of vendor
//                 payments—these are everyday challenges Firmity solves.
//               </p>
//               <p className="text-lg text-foreground/90">Experience how technology can simplify facility management.</p>
//             </div>
//           </div>
//         </section>

//         {/* Core Benefits */}
//         <section className="py-16 md:py-20 bg-background">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Why Choose Firmity</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {benefits.map((benefit, index) => (
//                 <div
//                   key={index}
//                   className="bg-card border border-border rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow"
//                 >
//                   <div className="text-4xl">{benefit.icon}</div>
//                   <h3 className="font-semibold text-foreground text-lg">{benefit.title}</h3>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Three Pillars */}
//         <section className="py-16 md:py-20 bg-primary/5">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Built on Three Pillars</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {pillars.map((pillar, index) => (
//                 <div key={index} className="bg-background rounded-lg p-8 space-y-4 border border-border">
//                   <div className="text-5xl">{pillar.icon}</div>
//                   <h3 className="text-2xl font-bold text-foreground">{pillar.title}</h3>
//                   <p className="text-foreground/80">{pillar.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Features Preview */}
//         <section className="py-16 md:py-20 bg-background">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
//               Comprehensive Management Modules
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {[
//                 "Cloud-based Facility Records",
//                 "Planned Preventive Maintenance",
                
//                 "Complaint Management System",
//                 "Asset Management & Alerts",
//                 "Inventory Purchase & Stock",
//                 "Staff Attendance & Leave",
//                 "Visitor Management & Records",
//               ].map((feature, index) => (
//                 <div
//                   key={index}
//                   className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg border border-primary/20"
//                 >
//                   <CheckCircle size={24} className="text-primary flex-shrink-0 mt-1" />
//                   <span className="text-foreground font-medium">{feature}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Video and Brochure Section */}
//         <section className="py-16 md:py-20 bg-background">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">See Firmity in Action</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
//               {/* Brochure Form - Left side */}
//               <div>
//                 <BrochureDownloadForm />
//               </div>

//               {/* Video and Content - Right side */}
//               <div className="space-y-6">
//                 <div
//                   onClick={() => setVideoOpen(true)}
//                   className="group cursor-pointer bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl overflow-hidden hover:shadow-lg transition-all"
//                 >
//                   <div className="aspect-video flex items-center justify-center">
//                     <div className="text-center space-y-4">
//                       <div className="group-hover:scale-110 transition-transform">
//                         <Play size={80} className="text-primary mx-auto" />
//                       </div>
//                       <p className="text-lg font-semibold text-foreground">Click to Watch Demo Video</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-2xl font-bold text-foreground mb-3">Complete Facility Management Platform</h3>
//                   <p className="text-foreground/80 mb-4">
//                     Watch our comprehensive demo to understand how Firmity streamlines your facility operations with
//                     integrated digital tools.
//                   </p>
//                   <ul className="space-y-2">
//                     <li className="flex items-start gap-3">
//                       <CheckCircle size={20} className="text-primary flex-shrink-0 mt-1" />
//                       <span className="text-foreground">Real-time asset tracking and maintenance</span>
//                     </li>
//                     <li className="flex items-start gap-3">
//                       <CheckCircle size={20} className="text-primary flex-shrink-0 mt-1" />
//                       <span className="text-foreground">Visitor and staff management</span>
//                     </li>
//                     <li className="flex items-start gap-3">
//                       <CheckCircle size={20} className="text-primary flex-shrink-0 mt-1" />
//                       <span className="text-foreground">Digital compliance and reporting</span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Clients Section */}
//         <section className="py-16 md:py-20 bg-background">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-12">
//               <p className="text-primary font-semibold mb-2">TRUSTED BY LEADING COMPANIES</p>
//               <h2 className="text-3xl md:text-4xl font-bold text-foreground">Companies Using Firmity</h2>
//             </div>

//             <ClientsCarousel />

//             <div className="mt-12 text-center">
//               <p className="text-foreground/80 text-lg mb-6">
//                 Join hundreds of facility managers and organizations transforming their operations with Firmity
//               </p>
//               <Link
//                 href="/contact"
//                 className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
//               >
//                 Learn how they use Firmity <ArrowRight size={20} />
//               </Link>
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="py-16 md:py-20 bg-primary text-primary-foreground">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
//             <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your Facility Management?</h2>
//             <p className="text-lg opacity-90">Get 2 weeks free trial with unlimited training and 24/7 support</p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
//               <Link
//                 href="/contact"
//                 className="bg-primary-foreground text-primary px-8 py-3 rounded-lg hover:bg-background transition-colors font-semibold"
//               >
//                 Start Your Free Trial
//               </Link>
//               <Link
//                 href="/features"
//                 className="border-2 border-primary-foreground text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary-foreground/10 transition-colors font-semibold"
//               >
//                 Explore Features
//               </Link>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />

//       <VideoModal
//         isOpen={videoOpen}
//         onClose={() => setVideoOpen(false)}
//         videoUrl={videoUrl}
//         title="Firmity CMMS - Complete Facility Management Software"
//       />
//     </>
//   )
// }
















"use client"

import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { HomeJsonLd } from "@/src/components/home-jsonld"
import { BrochureDownloadForm } from "@/src/components/brochure-download-form"
import { OverviewContactForm } from "@/src/components/overview-contact-form"
import { SurveyPopup } from "@/src/components/survey-popup"
import { ClientsCarousel } from "@/src/components/clients-carousel"
import { HowDidYouHearSection } from "@/src/components/how-did-you-hear-section"
import {
  HeroSection,
  ProblemsSection,
  WhyFirmitySection,
  PillarsSection,
  ModulesSection,
  ExploreSection,
  KeepInTouchSection,
} from "@/src/components/home-sections"
import Link from "next/link"
import { ArrowRight, ChevronDown, Lock, Zap, Download, X } from "lucide-react"
import { useState, useEffect } from "react"
import { buildInlineVideoUrl } from "@/src/lib/video"

// ─── Brochure animated SVG illustration ──────────────────────────────────────
function BrochureIllustration() {
  return (
    <div className="relative w-full flex items-center justify-center" style={{ height: "96px" }}>
      <style>{`
        @keyframes docFly {
          0%   { transform: translate(0,0) rotate(-8deg); opacity:1; }
          60%  { transform: translate(28px,18px) rotate(0deg); opacity:1; }
          80%  { transform: translate(28px,24px) rotate(0deg); opacity:0.6; }
          100% { transform: translate(28px,30px) rotate(0deg); opacity:0; }
        }
        @keyframes inboxPulse {
          0%,100% { transform:scale(1); }
          65%      { transform:scale(1.06); }
        }
        @keyframes checkFade {
          0%,55% { opacity:0; transform:scale(0.6); }
          75%    { opacity:1; transform:scale(1.1); }
          100%   { opacity:1; transform:scale(1); }
        }
        @keyframes dotBounce {
          0%,100% { transform:translateY(0); opacity:0.35; }
          50%     { transform:translateY(-5px); opacity:1; }
        }
        .br-doc   { animation:docFly 2.6s ease-in-out infinite; transform-origin:68px 28px; }
        .br-inbox { animation:inboxPulse 2.6s ease-in-out infinite; transform-origin:120px 68px; }
        .br-check { animation:checkFade 2.6s ease-in-out infinite; transform-origin:155px 40px; }
        .br-d1 { animation:dotBounce 1.2s ease-in-out infinite 0s; }
        .br-d2 { animation:dotBounce 1.2s ease-in-out infinite 0.2s; }
        .br-d3 { animation:dotBounce 1.2s ease-in-out infinite 0.4s; }
      `}</style>
      <svg width="200" height="86" viewBox="0 0 200 86" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Flying document */}
        <g className="br-doc">
          <rect x="52" y="6" width="32" height="40" rx="2" fill="#fff" stroke="#2b6cb0" strokeWidth="1.5"/>
          <line x1="58" y1="15" x2="78" y2="15" stroke="#2b6cb0" strokeWidth="1" opacity="0.5"/>
          <line x1="58" y1="20" x2="78" y2="20" stroke="#2b6cb0" strokeWidth="1" opacity="0.5"/>
          <line x1="58" y1="25" x2="72" y2="25" stroke="#2b6cb0" strokeWidth="1" opacity="0.4"/>
          <line x1="58" y1="30" x2="75" y2="30" stroke="#2b6cb0" strokeWidth="1" opacity="0.35"/>
          <path d="M68 33 L68 40 M65 37 L68 40 L71 37" stroke="#2b6cb0" strokeWidth="1.2" strokeLinecap="round"/>
        </g>
        {/* Inbox */}
        <g className="br-inbox">
          <rect x="90" y="54" width="60" height="24" rx="2" fill="#e8f0fb" stroke="#2b6cb0" strokeWidth="1.5"/>
          <rect x="96" y="61" width="48" height="11" rx="1" fill="#fff" stroke="#2b6cb0" strokeWidth="1" opacity="0.5"/>
          <path d="M96 61 L120 70 L144 61" stroke="#2b6cb0" strokeWidth="1" opacity="0.45"/>
          <text x="104" y="70" fontSize="7" fill="#2b6cb0" opacity="0.55" fontFamily="system-ui">INBOX</text>
        </g>
        {/* Check */}
        <g className="br-check">
          <circle cx="155" cy="40" r="10" fill="#2b6cb0" opacity="0.1"/>
          <path d="M150 40 L153.5 43.5 L161 36" stroke="#2b6cb0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        {/* Dots */}
        <circle className="br-d1" cx="26" cy="48" r="2.5" fill="#2b6cb0" opacity="0.35"/>
        <circle className="br-d2" cx="35" cy="48" r="2.5" fill="#2b6cb0" opacity="0.35"/>
        <circle className="br-d3" cx="44" cy="48" r="2.5" fill="#2b6cb0" opacity="0.35"/>
      </svg>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

// ─── Home Blog Section ────────────────────────────────────────────────────────

interface LatestPost {
  slug: string
  title: string
  description: string
  category: string
  readTime: string
  date: string
  cover: string | null
}

function HomeBlogSection() {
  const [posts, setPosts] = useState<LatestPost[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(function() {
    fetch("/api/blog/latest")
      .then(function(r) { return r.ok ? r.json() : [] })
      .then(function(data: LatestPost[]) {
        setPosts(data)
        setLoaded(true)
      })
      .catch(function() { setLoaded(true) })
  }, [])

  // Don't render the section at all if there are no posts
  if (loaded && posts.length === 0) return null

  // py-14 → py-10 (2026-09-04, inter-section spacing pass). Background
  // changed bg-transparent sm:bg-white/60 → solid bg-[#f7f7f7] (2026-09-04,
  // per explicit request for this section specifically — every other
  // section on the page keeps the translucent-over-page-wash pattern, only
  // this one is a flat gray panel).
  return (
    <section className="bg-[#f7f7f7] py-10">
      {/* max-w-7xl + px-6 sm:px-10 lg:px-16 — was max-w-6xl + a flat px-6 that
          never grew at larger breakpoints, so this section's left edge sat
          noticeably left of the navbar logo / HowDidYouHearSection above it
          on desktop. Matched to the same container scale as the navbar,
          footer, and HowDidYouHearSection so all four line up. */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            {/* "Insights" kicker removed 2026-09-04 per request */}
            <h2 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-[1.15] text-[#114dac] tracking-tight mb-1">
              Browse our latest resources
            </h2>
            <p className="text-[13.5px] font-light leading-[1.8] text-[#000000] max-w-[460px]">
              Practical guides and playbooks from the Firmity team on maintenance, compliance, and running a tighter facility.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[#2b6cb0] text-[12.5px] font-semibold hover:gap-2.5 transition-all flex-shrink-0"
          >
            Explore more blogs <ArrowRight size={13} />
          </Link>
        </div>

        {/* Cards skeleton while loading — sized to match the Planon-card
            dimensions below (3-up grid, taller image) */}
        {!loaded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map(function(i) {
              return (
                <div key={i} className="bg-white rounded-[4px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] h-[460px] animate-pulse" />
              )
            })}
          </div>
        )}

        {/* Cards — sized/proportioned to match planonsoftware.com/us's
            "Browse our latest resources" cards directly (measured off the
            reference screenshot): 3-up grid (was 4), only the 3 latest posts
            shown (`.slice(0, 3)` — was all 4 from the API), solid-color
            category header bar (~52px, was ~40px), taller cover photo
            (h-[230px], was h-[170px] — ~0.62 image-height:card-width ratio
            in the reference), near-square corners (rounded-[4px], was
            rounded-[10px]) and no border ring (Planon's cards read as flat
            white panels with a soft shadow, not an outlined card — the
            hover-only shadow became an always-on subtle one + a stronger
            one on hover). `post.category` drives the header bar again
            (2026-09-04, reverted from a hardcoded "Blog" — turns out at
            least one existing post, "Why Your Facility Team Is Still
            Running on Spreadsheets", IS a case study, so a literal "Blog"
            was wrong; that post's `category` needs to be set to "Case
            Study" in the blog admin — DB-managed, not something this file
            can fix). Fallback (no category set) renamed "Resource" →
            "Guide" per request. */}
        {loaded && posts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(0, 3).map(function(post) {
              return (
                <Link
                  key={post.slug}
                  href={"/blog/" + post.slug}
                  className="group flex flex-col bg-white rounded-[4px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_30px_rgba(43,108,176,0.14)] transition-shadow overflow-hidden"
                >
                  <div className="bg-[#114dac] px-4 py-4 flex-shrink-0">
                    <span className="text-[12px] font-semibold text-white tracking-wide">
                      {post.category || "Guide"}
                    </span>
                  </div>

                  {/* Cover image or placeholder */}
                  <div className="h-[230px] bg-[#eef3f9] overflow-hidden flex-shrink-0">
                    {post.cover
                      ? <img src={post.cover} alt={post.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300" />
                      : <div className="w-full h-full flex items-center justify-center">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="opacity-20">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#2b6cb0" strokeWidth="1.5"/>
                            <polyline points="14 2 14 8 20 8" stroke="#2b6cb0" strokeWidth="1.5"/>
                          </svg>
                        </div>
                    }
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5">
                    {/* Title */}
                    <p className="font-serif text-[15px] font-normal text-[#2b6cb0] leading-snug mb-2 line-clamp-2 group-hover:text-[#0e3e8a] transition-colors">
                      {post.title}
                    </p>
                    {/* Description */}
                    {post.description && (
                      <p className="text-[12.5px] font-light text-[#000000] leading-relaxed mb-4 line-clamp-3">
                        {post.description}
                      </p>
                    )}
                    {/* Read more + meta */}
                    <div className="mt-auto flex items-end justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[#2b6cb0] text-[12px] font-semibold group-hover:gap-2.5 transition-all flex-shrink-0">
                        Read more <ArrowRight size={12} />
                      </span>
                      {(post.date || post.readTime) && (
                        <span className="text-[10.5px] text-[#000000] font-light text-right">
                          {post.date}{post.date && post.readTime ? " · " : ""}{post.readTime}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Customers Say / Case Studies Section ────────────────────────────────────
// Section (2026-09-04), rendered directly above KeepInTouchSection (moved
// there 2026-09-04 per request — was originally rendered after it) — copies
// planonsoftware.com/us's "What our customers say" 3-card layout
// (solid-blue "Case Studies" header bar + photo + blue title + "Explore
// now"). Only ONE known case study exists on this site right now — "Why
// Your Facility Team Is Still Running on Spreadsheets"
// (/blog/spreadsheets-to-cmms) — flagged earlier in this session as needing
// its DB `category` field set to "Case Study" via /blog-admin (not
// file-editable from here). This section can't assume that field is set
// yet, so it fetches the same /api/blog/latest list HomeBlogSection uses
// above and matches EITHER category === "Case Study" OR the known slug,
// falling back to a hardcoded stub for that one post if neither matches
// (e.g. if it ages out of the "latest 4" the API returns). Temporary —
// once the DB category is actually set and there's more than one case
// study, replace this with a real /api/blog/case-studies endpoint that
// queries by category server-side instead of filtering client-side.
const KNOWN_CASE_STUDY_SLUG = "spreadsheets-to-cmms"
const KNOWN_CASE_STUDY_FALLBACK: LatestPost = {
  slug: KNOWN_CASE_STUDY_SLUG,
  title: "Why Your Facility Team Is Still Running on Spreadsheets",
  description: "What spreadsheet-based maintenance tracking is really costing facility teams and how to move to a CMMS without a six-month project.",
  category: "Case Study",
  readTime: "3 min read",
  date: "Jul 2026",
  cover: null,
}

function CustomersSaySection() {
  const [posts, setPosts] = useState<LatestPost[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(function() {
    fetch("/api/blog/latest")
      .then(function(r) { return r.ok ? r.json() : [] })
      .then(function(data: LatestPost[]) {
        setPosts(data)
        setLoaded(true)
      })
      .catch(function() { setLoaded(true) })
  }, [])

  const caseStudies: LatestPost[] = loaded
    ? (function() {
        const matched = posts.filter(function(p) { return p.category === "Case Study" || p.slug === KNOWN_CASE_STUDY_SLUG })
        return matched.length > 0 ? matched : [KNOWN_CASE_STUDY_FALLBACK]
      })()
    : []

  if (loaded && caseStudies.length === 0) return null

  const gridCols = caseStudies.length >= 3
    ? "lg:grid-cols-3"
    : caseStudies.length === 2
      ? "lg:grid-cols-2 max-w-[760px]"
      : "lg:grid-cols-1 max-w-[380px]"

  return (
    <section className="bg-[#f7f7f7] py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <h2 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-[1.15] text-[#114dac] tracking-tight mb-3">
          What our customers say
        </h2>
        {/* Brief description added 2026-09-04 per request */}
        <p className="text-[13.5px] font-light leading-[1.8] text-[#000000] max-w-[460px] mb-10">
          Real results from teams who moved off spreadsheets and onto Firmity.
        </p>

        {!loaded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map(function(i) {
              // bg-white, not bg-[#f7f7f7] — this section's own background is
              // now grey (2026-09-04), so a grey skeleton would be invisible
              // against it. White also matches the loaded cards' own bg.
              return <div key={i} className="bg-white rounded-[4px] h-[340px] animate-pulse" />
            })}
          </div>
        )}

        {loaded && caseStudies.length > 0 && (
          <div className={"grid grid-cols-1 sm:grid-cols-2 gap-6 " + gridCols}>
            {caseStudies.map(function(post) {
              return (
                <Link
                  key={post.slug}
                  href={"/blog/" + post.slug}
                  className="group flex flex-col bg-white border border-[#e2e8f0] rounded-[4px] overflow-hidden hover:shadow-[0_10px_30px_rgba(17,77,172,0.12)] transition-shadow"
                >
                  <div className="bg-[#114dac] px-4 py-3 flex-shrink-0">
                    <span className="text-[12px] font-semibold text-white tracking-wide">Case Studies</span>
                  </div>
                  <div className="h-[180px] bg-[#eef3f9] overflow-hidden flex-shrink-0">
                    {post.cover
                      ? <img src={post.cover} alt={post.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300" />
                      : <div className="w-full h-full bg-gradient-to-br from-[#114dac]/15 to-[#0e3e8a]/25" />
                    }
                  </div>
                  <div className="p-5">
                    <p className="font-serif text-[15px] font-normal text-[#114dac] leading-snug mb-3 line-clamp-2 group-hover:text-[#0e3e8a] transition-colors">
                      {post.title}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[#114dac] text-[12px] font-semibold group-hover:gap-2.5 transition-all">
                      Explore now <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

// ─── FAQ Section ─────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "What is Firmity?",
    a: "Firmity is a cloud-based Computerised Maintenance Management System (CMMS) built for facility and property management teams. It centralises planned preventive maintenance, asset tracking, complaint management, inventory, staff attendance, and visitor management into a single platform.",
  },
  {
    q: "How long does it take to go live?",
    a: "Most clients are fully operational within 1–2 weeks. We handle data migration, system configuration, and user onboarding as part of every deployment — no extra fees.",
  },
  {
    q: "Does Firmity work on mobile?",
    a: "Yes. Firmity is fully responsive web app and available as an Android application and Apple iOS app. Technicians can log tasks, scan QR codes, check in, and update work orders from any smartphone — online or offline.",
  },
  {
    q: "Can Firmity manage multiple sites or buildings?",
    a: "Absolutely. Firmity is built for multi-site operations. Each location has its own asset registry, maintenance schedule, staff roster, and visitor log — all visible from a single management dashboard.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. All data is encrypted at rest and in transit using AES-256 and TLS 1.3. We operate on ISO 27001-aligned infrastructure with daily backups, role-based access control, and 99.9% uptime SLA.",
  },
  {
    q: "What integrations does Firmity support?",
    a: "Firmity integrates with access control systems, IoT sensors, accounting tools, HR payroll platforms, and ERP systems via REST APIs and webhooks. Custom integrations are available on Enterprise plans.",
  },
  {
    q: "How is Firmity priced?",
    a: "Firmity provides clients with access to all of the automation modules and up to 100 users without additional cost.",
  },
]

function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  return (
    // py-8 lg:py-12 → py-6 lg:py-8 (2026-09-04, inter-section spacing pass).
    // Container max-w-3xl mx-auto → max-w-7xl (same scale as every other
    // section) (2026-09-04, per request: "align faq to left... make the
    // stretch from left to right" — the narrow centered column read as
    // off-center relative to sections above/below it that all use the
    // page's normal max-w-7xl/px-* container). Added a brief description
    // under the heading per the same request. cursor-pointer added to the
    // accordion trigger button — Tailwind's button reset (v3.3+) doesn't
    // default to a pointer cursor, so this was a plain arrow cursor before.
    // bg-transparent sm:bg-white/60 → bg-[#f7f7f7] (2026-09-04 follow-up,
    // per request "faq background is grey") — flat gray panel like
    // HomeBlogSection/ExploreSection, not translucent-over-wash.
    <section className="bg-[#f7f7f7] py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <h2 className="font-serif font-light text-[clamp(1.6rem,4vw,2.6rem)] leading-[1.15] text-[#114dac] tracking-tight mb-2">
          FAQ
        </h2>
        <p className="text-[13.5px] font-light leading-[1.8] text-[#000000] max-w-[460px] mb-8">
          Quick answers to what teams evaluating Firmity ask most — deployment, security, pricing, and integrations.
        </p>
        <div>
          {FAQ_ITEMS.map(function(item, i) {
            const isOpen = openIdx === i
            return (
              <div key={i} style={{ borderTop: "1px solid #e2e8f0" }}>
                <button
                  onClick={function() { setOpenIdx(isOpen ? null : i) }}
                  className="cursor-pointer w-full flex items-center gap-4 py-5 text-left group"
                  aria-expanded={isOpen}
                >
                  <ChevronDown
                    size={18}
                    className="flex-shrink-0 transition-transform duration-200"
                    style={{
                      color: "#2b6cb0",
                      transform: isOpen ? "rotate(180deg)" : "rotate(-90deg)",
                    }}
                  />
                  <span className="text-[15px] font-medium text-[#114dac] group-hover:text-[#2b6cb0] transition-colors leading-snug">
                    {item.q}
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-6 pl-[34px] pr-2">
                    <p className="text-[13.5px] leading-[1.8] text-[#000000]">{item.a}</p>
                  </div>
                )}
              </div>
            )
          })}
          <div style={{ borderTop: "1px solid #e2e8f0" }} />
        </div>
      </div>
    </section>
  )
}

export default function FirmityHome() {
  const [inlineVideoPlaying, setInlineVideoPlaying] = useState<boolean>(false)
  const videoUrl = process.env.NEXT_PUBLIC_VIDEO_URL ?? ""
  // Brochure download popup (2026-09-04) — triggered from the "Download
  // Brochure" link in the "Get the complete Firmity overview" section
  // (was "Book a Tech Demo" → /contact; per request: "change... to download
  // brochure which when clicked opens the download brochure form as a
  // popup"). Reuses the original BrochureDownloadForm unchanged — that
  // form's own name/email/phone/city → PDF-download logic still lives in
  // brochure-download-form.tsx.
  const [brochurePopupOpen, setBrochurePopupOpen] = useState<boolean>(false)


  return (
    <>
      <HomeJsonLd />
      {/* Ambient page wash: was a slow-moving beige/cream gradient behind the
          whole page (white sections below are translucent — bg-white/60… —
          so they'd reveal a drifting region of it as you scroll). Swapped to
          flat white 2026-09-04 per request (exact swatch supplied, sampled
          at RGB 255/255/255 — pure white, not an off-white). Solid color has
          no gradient to animate, so the pageWash keyframes/animation were
          dropped along with it rather than left as dead code — if a subtle
          wash is wanted back later, restore the linear-gradient value above
          this comment in git history and reintroduce the animation. */}
      <div
        aria-hidden
        className="page-wash pointer-events-none fixed inset-0 -z-10"
        style={{ background: "#ffffff" }}
      />
      <Navigation />
      <main>

        {/* ── HERO ─────────────────────────────────────────────────────────
            Full slideshow + data panel — implemented in home-sections.tsx
        ── */}
        <HeroSection />

        {/* ── PROBLEM STATEMENT — hero-aligned, live risk board ──
            Implementation lives in src/components/home-sections.tsx.
            HIDDEN 2026-09-04 per request — commented out, not deleted, so
            "Real Challenges, Real Solutions" is a one-line uncomment away
            if it needs to come back. */}
        {/* <ProblemsSection /> */}

        {/* ── CLIENTS ─────────────────────────────────────────────────────
            Sits directly below Problems — social proof before deeper content
        ── */}
        <section className="bg-transparent sm:bg-white/60 pb-10">
          {/* pb-10 added directly on the section 2026-09-04 (batch-4
              follow-up, per "add gap between the marquee and the next
              section consistent with other sections") — the "Learn how
              they use Firmity" div below the carousel used to supply this
              section's bottom space (pb-4 pt-2); once it was removed
              outright, the carousel sat flush against the section boundary
              with zero gap before HomeBlogSection's own pt-10 kicked in
              (40px total instead of the ~80px every other section-to-
              section transition gets). pb-10 here restores that symmetry
              without re-adding horizontal padding to the full-bleed
              carousel — it's on the <section>, not the inner divs.
              pt-10 pb-6 → pt-8 pb-5 (2026-09-04, inter-section spacing pass).
              Kicker/heading/subtext changed from centered to left-aligned
              (2026-09-04, per request — "like Browse our latest
              resources"): text-center/justify-center dropped, and the
              kicker's trailing divider line removed (a line on both sides
              of the label only reads right when centered). A "Learn how
              they use Firmity →" link below the carousel existed briefly
              (added, then right-aligned) before being removed outright the
              same day — see the comment after ClientsCarousel below. */}
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-[#2b6cb0]" />
              <span className="text-[#2b6cb0] text-[10px] font-semibold tracking-[0.2em] uppercase">Trusted by Leading Companies</span>
            </div>
            <h2 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-[1.15] text-[#114dac] tracking-tight mb-1">
              Companies Using Firmity
            </h2>
            <p className="text-[13.5px] font-light leading-[1.8] text-[#000000] mb-6">
              Join hundreds of facility managers transforming their operations
            </p>
          </div>
          <div>
            <ClientsCarousel />
          </div>
          {/* "Learn how they use Firmity →" link removed 2026-09-04 per
              request ("remove learn how they use firmity") — it deep-linked
              to /contact and read as redundant with the CTA elsewhere on the
              page. Section now ends right after the carousel. */}
        </section>

        {/* ── BLOG PREVIEW — 4 latest posts, fetched client-side via /api/blog/latest ──
            Moved here 2026-09-04: directly under "Companies Using Firmity"
            (was below "Help us get to know you better"). Heading renamed
            "More facility management insights" → "Browse our latest
            resources" in the same request — see the HomeBlogSection
            function above for that string. */}
        <HomeBlogSection />

        {/* ── HOW DID YOU HEAR ABOUT US — anonymous attribution pulse-check ──
            Implementation lives in src/components/how-did-you-hear-section.tsx.
            Re-asked again post-submit on /contact — see src/app/contact/page.tsx. */}
        <HowDidYouHearSection />

        {/* ── SEVEN MODULES — commented out 2026-09-04, replaced by
            ExploreSection below (Planon 2-col card-grid layout, per
            request: "comment out our existing explore section and instead
            let us copy planon completely"). Kept here, not deleted, so this
            tab/vignette layout is a one-line uncomment away if it's wanted
            back — see ModulesSection's own "UNUSED" note in
            home-sections.tsx. ── */}
        {/* <ModulesSection /> */}

        {/* ── EXPLORE OUR SOLUTIONS — Planon-style 2-col card grid (2026-09-04) ──
            Implementation lives in src/components/home-sections.tsx.
            Background: light gray (#f7f7f7), per request. ── */}
        <ExploreSection />

        {/* ── CONTACT US FOR A WALKTHROUGH ────────────────────────────────────
            Was "Get the complete Firmity overview", positioned after
            CustomersSaySection/KeepInTouchSection, right before PillarsSection.
            MOVED (2026-09-04) to directly after ExploreSection, per request.
            Section bg flipped from grey→white to sit against ExploreSection's
            grey above it; the form card + video panel (previously white on
            that grey section) are now grey (#f7f7f7) on this white section —
            per request: "move this section after Explore our solutions...
            background will be white and the video and contact form
            background will be grey". Heading/description rewritten in the
            same request: "Get the complete Firmity overview" → "Contact Us
            for a Walkthrough"; description now "Tell us about your
            requirements and we will get back to you for a comprehensive
            software demo." Form (OverviewContactForm), video panel behavior,
            trust chips, and the "Download Brochure" popup CTA are otherwise
            unchanged from the prior rebuild — see git history for that
            rebuild's full rationale.
        ── */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10 lg:py-14">
            <h3 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-[1.15] text-[#114dac] tracking-tight mb-2">
              Contact Us for a Walkthrough
            </h3>
            <p className="text-[13.5px] font-light leading-[1.8] text-[#000000] mb-6 max-w-[460px]">
              Tell us about your requirements and we will get back to you within 24hrs.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 lg:items-stretch">

              {/* Form card — grey now that the section itself is white (was
                  white-on-grey before the section swap above). */}
              <div className="bg-[#f7f7f7] rounded-[4px] border border-[#dbe5f0] shadow-[0_8px_32px_rgba(17,29,53,0.09)] p-5 sm:p-6 max-w-[460px] w-full">
                <OverviewContactForm />
              </div>

              {/* Right — video, grey panel to match the form card (was white
                  before the section swap above). */}
              <div className="relative rounded-[4px] overflow-hidden bg-[#f7f7f7] border border-[#dbe5f0] min-h-[280px] lg:min-h-0 lg:h-full">
                {!inlineVideoPlaying && (
                  <button
                    onClick={() => setInlineVideoPlaying(true)}
                    className="group absolute inset-0 w-full h-full cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b6cb0]"
                    aria-label="Play Firmity demo video inline"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#114dac] group-hover:bg-[#0e3e8a] flex items-center justify-center shadow-[0_8px_24px_rgba(17,77,172,0.28)] transition-all duration-300 group-hover:scale-110">
                      <div className="w-0 h-0 ml-1" style={{ borderTop: "9px solid transparent", borderBottom: "9px solid transparent", borderLeft: "15px solid #fff" }} />
                    </div>
                  </button>
                )}

                {/* Inline iframe — proper autoplay URL for YouTube, Vimeo, direct */}
                {inlineVideoPlaying && videoUrl && (
                  <iframe
                    src={buildInlineVideoUrl(videoUrl)}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="Firmity CMMS Demo"
                  />
                )}

                {inlineVideoPlaying && !videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#f7f7f7]">
                    <div className="text-center">
                      <p className="text-[#4a5568] text-sm mb-2">No video URL configured</p>
                      <p className="text-[#a0aec0] text-xs font-sans">Set NEXT_PUBLIC_VIDEO_URL</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Trust chips — left-aligned, sits under the form column thanks
                to the shared max-w-[460px] + this section's own left inset. */}
            <div className="flex items-center gap-5 mt-4 flex-wrap max-w-[460px]">
              {[
                { Icon: Lock, label: "No spam" },
                { Icon: Zap, label: "24hr response" },
              ].map(function(chip) {
                const ChipIcon = chip.Icon
                return (
                  <span key={chip.label} className="flex items-center gap-1.5 text-[10.5px] font-light text-[#000000]">
                    <ChipIcon size={12} strokeWidth={1.75} className="text-[#000000]" />
                    {chip.label}
                  </span>
                )
              })}
            </div>

            {/* Secondary CTA — opens the brochure-download popup below. */}
            <div className="mt-5 flex items-center gap-2 max-w-[460px]">
              <span className="text-[11px] text-[#000000] font-light">Prefer a quick read first?</span>
              <button
                type="button"
                onClick={() => setBrochurePopupOpen(true)}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-[4px] border border-[#2b6cb0]/30 px-3 py-1 text-[11px] text-[#2b6cb0] font-semibold hover:border-[#2b6cb0] hover:bg-[#2b6cb0]/[0.06] transition-colors"
              >
                <Download size={11} strokeWidth={2} />
                Download Brochure
              </button>
            </div>
          </div>
        </section>

        {/* Brochure-download popup (2026-09-04) — triggered by "Download
            Brochure" above. Same modal pattern as SurveyPopup's own card:
            fixed overlay + centered white panel, backdrop click and the X
            button both close it, inner click stopped from bubbling to the
            backdrop. Reuses BrochureDownloadForm unmodified. */}
        {brochurePopupOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-[3px]"
            onClick={() => setBrochurePopupOpen(false)}
          >
            <div
              className="relative w-full max-w-[440px] bg-white rounded-[4px] p-6 sm:p-7 shadow-[0_32px_80px_rgba(17,29,53,0.28)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setBrochurePopupOpen(false)}
                aria-label="Close"
                className="cursor-pointer absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f7f7f7] hover:bg-[#e8f0fb] flex items-center justify-center transition-colors"
              >
                <X size={15} className="text-[#114dac]" />
              </button>
              <h3 className="font-serif text-[19px] font-light text-[#114dac] mb-1 pr-8">
                Download the Firmity brochure
              </h3>
              <p className="text-[12.5px] text-[#000000] font-light leading-relaxed mb-5">
                Modules, pricing, integrations, and deployment guide — all in one PDF.
              </p>
              <BrochureDownloadForm />
            </div>
          </div>
        )}

        {/* ── WHAT OUR CUSTOMERS SAY — case-study cards (2026-09-04) ──
            MOVED above KeepInTouchSection per request ("move What our
            customers say above keep in touch"). Implementation directly
            above (CustomersSaySection), same file — follows HomeBlogSection's
            fetch pattern since it also needs client-side blog data. See that
            function's own comment for the category-filter caveat. ── */}
        <CustomersSaySection />

        {/* ── KEEP IN TOUCH — newsletter + social links (2026-09-04) ──
            Implementation lives in src/components/home-sections.tsx. Now
            directly after CustomersSaySection (was directly after
            ExploreSection) per request. ── */}
        <KeepInTouchSection />

        {/* ── WHY CHOOSE FIRMITY — hero-aligned animated timeline ──
            HIDDEN 2026-09-04 per request ("hide Built for operational
            clarity for now") — commented out, not deleted, same pattern as
            ProblemsSection/ModulesSection above. Function itself is
            unchanged in src/components/home-sections.tsx, still exported —
            this is a one-line uncomment to bring it back. */}
        {/* <WhyFirmitySection /> */}

        {/* ── THREE PILLARS — static 3-up cards, pillar.png recolored per pillar ──
            Implementation lives in src/components/home-sections.tsx */}
        <PillarsSection />

        {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
        <FaqSection />

        {/* ── CTA ─────────────────────────────────────────────────────────────── */}
        {/* Was a solid dark navy band (bg-[#0d1525], white text) — converted to
            translucent-over-beige-wash like the rest of the page, per request.
            All text/border colors below were re-themed from white-on-dark to
            dark-on-light accordingly; copy and structure are unchanged. */}
        <section className="relative bg-transparent sm:bg-white/60 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden="true">
            <span className="font-serif text-[clamp(40px,10vw,130px)] font-light text-[rgba(43,108,176,0.06)] tracking-[0.12em] whitespace-nowrap select-none">FIRMITY</span>
          </div>
          <div className="h-[3px] bg-gradient-to-r from-transparent via-[#2b6cb0] to-transparent" />
          {/* py-16 sm:py-20 → py-12 sm:py-14 (2026-09-04, inter-section spacing pass) */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-14 text-center">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <div className="w-6 h-px bg-[#2b6cb0]/30" />
              <span className="text-[#2b6cb0] text-[10px] font-semibold tracking-[0.2em] uppercase">Start Today</span>
              <div className="w-6 h-px bg-[#2b6cb0]/30" />
            </div>
            <h2 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light text-[#114dac] tracking-tight leading-[1.15] mb-3">
              Ready to Transform Your<br />Facility Management?
            </h2>
            <p className="text-[13.5px] font-light text-[#000000] mb-7 max-w-[380px] mx-auto">
              Everything you need to bring operations, assets, and compliance into one command centre.
            </p>
            {/* Solid black fill (2026-09-04, explicit request) — was an
                outline button (border-[#cbd5e0], no fill). Deliberately NOT
                swept into the black→blue conversion above: that rule
                retextured existing near-black TEXT to the new Planon blue,
                this button is a fresh, separately-requested black surface.
                Label/href "Explore Features" → "Contact Us" / "/contact"
                (2026-09-04, follow-up request: "Ready to Transform Your
                Facility Management? should have contact us as the cta"). */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-7">
              <Link href="/contact" className="cursor-pointer inline-flex items-center justify-center bg-black hover:bg-[#1a1a1a] text-white px-7 py-3 text-[13px] font-light transition-colors">
                Contact Us
              </Link>
            </div>
            {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 flex-wrap">
              {["No credit card required", "Unlimited training included", "24/7 support from day one"].map((item, i, arr) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#000000]">
                    <span className="text-[#2b6cb0]">✓</span>{item}
                  </div>
                  {i < arr.length - 1 && <div className="w-px h-3 bg-[#dbe5f0] hidden sm:block" />}
                </div>
              ))}
            </div> */}
          </div>
          {/* <div className="border-t border-[#eef3f9] py-3 text-center">
            <p className="text-[10px] text-[#000000] tracking-[0.06em]">
              Firmity is a registered software of UFIRM Technologies (P) Limited · Proudly Made in India
            </p>
          </div> */}
        </section>

      </main>
      <Footer />

      <SurveyPopup />
    </>
  )
}
// EOF
