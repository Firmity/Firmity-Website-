// "use client"

// import { Navigation } from "@/src/components/navigation"
// import { Footer } from "@/src/components/footer"
// import { BrochureDownloadForm } from "@/src/components/brochure-download-form"
// import { VideoModal } from "@/src/components/video-modal"
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
import { BrochureDownloadForm } from "@/src/components/brochure-download-form"
import { VideoModal } from "@/src/components/video-modal"
import { ClientsCarousel } from "@/src/components/clients-carousel"
import {
  ProblemsSection,
  WhyFirmitySection,
  PillarsSection,
  ModulesSection,
} from "@/src/components/home-sections"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"

// ─── Counter hook — fires once when panel enters viewport ─────────────────────
function useCountUp(target: number, duration: number = 2000, suffix: string = "") {
  const [display, setDisplay] = useState<string>(`0${suffix}`)

  const start = (started: boolean) => {
    if (!started) return
    const t0 = Date.now()
    const tick = () => {
      const p = Math.min((Date.now() - t0) / duration, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setDisplay(`${Math.round(e * target)}${suffix}`)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  return { display, start }
}

function useBarUp(target: number, total: number, duration: number = 1800) {
  const [width, setWidth] = useState<number>(0)
  const [count, setCount] = useState<number>(0)

  const start = (started: boolean) => {
    if (!started) return
    const t0 = Date.now()
    const tick = () => {
      const p = Math.min((Date.now() - t0) / duration, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setWidth(Math.round(e * (target / total) * 100))
      setCount(Math.round(e * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  return { width, count, start }
}

// ─── Inline video URL builder ─────────────────────────────────────────────────
// Converts any video URL to an embeddable autoplay URL.
// Handles YouTube (watch?v= and youtu.be), Vimeo, and direct file/embed URLs.
function buildInlineVideoUrl(url: string): string {
  // YouTube watch URL: https://www.youtube.com/watch?v=VIDEO_ID
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/)
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1`
  }
  // YouTube embed URL already: https://www.youtube.com/embed/VIDEO_ID
  if (url.includes("youtube.com/embed/")) {
    return url.includes("autoplay") ? url : `${url}${url.includes("?") ? "&" : "?"}autoplay=1`
  }
  // Vimeo: https://vimeo.com/VIDEO_ID
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&title=0&byline=0`
  }
  // Vimeo player already: https://player.vimeo.com/video/VIDEO_ID
  if (url.includes("player.vimeo.com")) {
    return url.includes("autoplay") ? url : `${url}${url.includes("?") ? "&" : "?"}autoplay=1`
  }
  // Direct file or custom embed — append autoplay param
  return url.includes("autoplay") ? url : `${url}${url.includes("?") ? "&" : "?"}autoplay=1`
}

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
export default function FirmityHome() {
  const [videoOpen, setVideoOpen] = useState<boolean>(false)
  const [inlineVideoPlaying, setInlineVideoPlaying] = useState<boolean>(false)

  // Popup fires on first load only
  useEffect(() => { setVideoOpen(true) }, [])
  const videoUrl = process.env.NEXT_PUBLIC_VIDEO_URL ?? ""

  // Counter hooks
  const c1 = useCountUp(247, 2000)
  const c2 = useCountUp(14, 1400)
  const c3 = useCountUp(8, 1200)
  const c4 = useCountUp(94, 1800, "%")
  const bar = useBarUp(32, 40, 1800)

  // Single observer on hero right panel — fires all counters at once
  const panelRef = useRef<HTMLDivElement | null>(null)
  const firedRef = useRef<boolean>(false)

  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true
          c1.start(true)
          c2.start(true)
          c3.start(true)
          c4.start(true)
          bar.start(true)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Navigation />
      <main>

        {/* ── HERO ──────────────────────────────────────────────────────────
            Mobile: stacked (copy top, data panel bottom)
            Desktop: 50/50 split
        ── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[100svh] lg:min-h-[88vh]">

          {/* Left — dark navy copy */}
          <div className="bg-[#1a2744] px-6 sm:px-10 lg:px-14 py-20 lg:py-0 flex flex-col justify-center order-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-[#2b6cb0] flex-shrink-0" />
              <span className="text-[#63b3ed] text-[10px] font-semibold tracking-[0.2em] uppercase">
                Powered by Technology
              </span>
            </div>
            <h1 className="font-serif text-[clamp(1.75rem,5vw,3rem)] font-light leading-[1.1] tracking-tight text-[#f0f4f8] mb-4">
              The Complete<br />
              <em className="not-italic text-[#63b3ed]">Facility Management</em><br />
              Software Suite
            </h1>
            <p className="text-[13.5px] font-light leading-[1.8] text-white/50 mb-7 max-w-[380px]">
              Firmity is a smart, integrated facility management software built to simplify operations,
              enhance visibility, and empower teams with real-time control over maintenance, assets,
              workforce, and compliance.
            </p>
            <div className="flex flex-row flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-[#2b6cb0] hover:bg-[#2563a8] text-white text-[13px] font-semibold px-5 py-3 rounded-xl transition-colors duration-200 whitespace-nowrap"
              >
                Book Tech Demo
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center text-white/60 hover:text-white text-[13px] font-light px-5 py-3 rounded-xl border border-white/[0.18] hover:border-white/[0.4] transition-all duration-200 whitespace-nowrap"
              >
                Explore Features
              </Link>
            </div>
          </div>

          {/* Right — data panel with building photo background */}
          <div
            ref={panelRef}
            className="relative order-2 min-h-[360px] lg:min-h-0"
          >
            {/* Office building photo */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85&fit=crop&crop=top')" }}
              aria-hidden="true"
            />
            {/* Dark overlay so data cards read clearly */}
            <div className="absolute inset-0 bg-[#111d35]/85" aria-hidden="true" />

            {/* Data cards */}
            <div className="relative z-10 p-4 sm:p-6 lg:p-7 flex flex-col gap-2.5 h-full">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-white/[0.06] border border-white/[0.1] rounded-xl p-3 sm:p-3.5 backdrop-blur-sm">
                  <div className="text-[8.5px] text-white/[0.38] uppercase tracking-[0.14em] mb-1.5">Assets Tracked</div>
                  <div className="font-sans text-[20px] sm:text-[22px] font-light text-[#63b3ed] leading-none">{c1.display}</div>
                  <div className="text-[8px] text-[rgba(104,211,145,0.85)] mt-1">● All active</div>
                </div>
                <div className="bg-white/[0.06] border border-white/[0.1] rounded-xl p-3 sm:p-3.5 backdrop-blur-sm">
                  <div className="text-[8.5px] text-white/[0.38] uppercase tracking-[0.14em] mb-1.5">PPM Due</div>
                  <div className="font-sans text-[20px] sm:text-[22px] font-light text-[#fc8181] leading-none">{c2.display}</div>
                  <div className="text-[8px] text-[rgba(252,129,129,0.75)] mt-1">● This week</div>
                </div>
              </div>

              <div className="bg-white/[0.06] border border-white/[0.1] rounded-xl p-3 sm:p-3.5 backdrop-blur-sm">
                <div className="text-[8.5px] text-white/[0.38] uppercase tracking-[0.14em] mb-2">Staff Attendance Today</div>
                <div className="bg-white/[0.08] h-[2px] w-full rounded-full">
                  <div
                    className="h-[2px] rounded-full bg-[#2b6cb0] transition-all duration-[1800ms]"
                    style={{ width: `${bar.width}%` }}
                  />
                </div>
                <div className="text-[8.5px] text-white/[0.3] mt-1.5">{bar.count} of 40 staff present</div>
              </div>

              <div className="bg-white/[0.06] border border-white/[0.1] rounded-xl p-3 sm:p-3.5 backdrop-blur-sm grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[8.5px] text-white/[0.38] uppercase tracking-[0.14em] mb-1.5">Open Tickets</div>
                  <div className="font-sans text-[20px] sm:text-[22px] font-light text-[#fbd38d] leading-none">{c3.display}</div>
                  <div className="text-[8px] text-[rgba(251,211,141,0.7)] mt-1">● Awaiting action</div>
                </div>
                <div>
                  <div className="text-[8.5px] text-white/[0.38] uppercase tracking-[0.14em] mb-1.5">Compliance</div>
                  <div className="font-sans text-[20px] sm:text-[22px] font-light text-[#63b3ed] leading-none">{c4.display}</div>
                  <div className="text-[8px] text-[rgba(99,179,237,0.65)] mt-1">● On track</div>
                </div>
              </div>

              <div className="bg-white/[0.06] border border-white/[0.1] rounded-xl p-3 sm:p-3.5 backdrop-blur-sm flex-1">
                <div className="text-[8.5px] text-white/[0.38] uppercase tracking-[0.14em] mb-2">Recent Activity</div>
                <div className="divide-y divide-white/[0.05]">
                  {[
                    { color: "#68d391", text: "PPM — HVAC Unit B2 completed" },
                    { color: "#fbd38d", text: "AMC renewal due in 7 days — Block A" },
                    { color: "#90cdf4", text: "Visitor: Mr. Muhammad Ali checked in — Gate 2" },
                  ].map(({ color, text }, i) => (
                    <div key={i} className="flex items-center gap-2 py-[5px]">
                      <div className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: color }} />
                      <span className="text-[9px] sm:text-[9.5px] text-white/[0.45] font-light">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROBLEM STATEMENT — hero-aligned, live risk board ──
            Implementation lives in src/components/home-sections.tsx */}
        <ProblemsSection />

        {/* ── WHY CHOOSE FIRMITY — hero-aligned animated timeline ──
            Implementation lives in src/components/home-sections.tsx */}
        <WhyFirmitySection />

        {/* ── THREE PILLARS — hero-aligned interactive tilt cards ──
            Implementation lives in src/components/home-sections.tsx */}
        <PillarsSection />

        {/* ── SIX MODULES — hero-aligned product showcase (selector + preview) ──
            Implementation lives in src/components/home-sections.tsx.
            Each module deep-links to /features#<slug>. */}
        <ModulesSection />

        {/* ── SEE FIRMITY IN ACTION ─────────────────────────────────────
            Video plays INLINE on click (not popup).
            Popup only fires on first page load via useEffect.
            Form on white background, same height as modules section.

            SIZE CONTROLS:
            - Video panel height: min-h-[280px] on mobile, lg:min-h-[440px] on desktop
            - Illustration height: style={{ height: "80px" }} in BrochureIllustration
            - Form top/bottom padding: py-4 on the form content div
            - Form heading size: text-[1.1rem]
        ── */}
        <section className="bg-white border-t border-[#e2e8f0]">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]">

            {/* Left — video panel (inline player) */}
            <div className="relative bg-[#0a0f1a] min-h-[280px] lg:min-h-[440px] overflow-hidden">
              {!inlineVideoPlaying && (
                <button
                  onClick={() => setInlineVideoPlaying(true)}
                  className="group absolute inset-0 w-full h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b6cb0]"
                  aria-label="Play Firmity demo video inline"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0d1a33] via-[#1e3a5f]/40 to-[#0d1525]" />
                  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 50px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 50px)" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full border border-[rgba(99,179,237,0.35)] flex items-center justify-center text-[#63b3ed] group-hover:border-[#4299e1] group-hover:bg-[rgba(43,108,176,0.15)] transition-all duration-300 group-hover:scale-110">
                      <div className="w-0 h-0 ml-1" style={{ borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderLeft: "14px solid #63b3ed" }} />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 bg-gradient-to-t from-[rgba(10,15,26,0.95)] to-transparent">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-4 h-px bg-[#2b6cb0]" />
                      <span className="text-[#63b3ed] text-[9px] font-semibold tracking-[0.2em] uppercase">See Firmity in Action</span>
                    </div>
                    <div className="font-serif text-[18px] font-light text-[#f0f4f8] leading-snug mb-1">Watch the complete platform walkthrough</div>
                    <div className="text-[10px] text-white/[0.35] font-light hidden sm:block">Maintenance · Assets · Attendance · Visitors · Compliance</div>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 rounded-lg px-2 py-1 font-sans font-medium text-[9px] text-white/[0.45]">6:24</div>
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
                <div className="absolute inset-0 flex items-center justify-center bg-[#0a0f1a]">
                  <div className="text-center">
                    <p className="text-white/40 text-sm mb-2">No video URL configured</p>
                    <p className="text-white/20 text-xs font-sans">Set NEXT_PUBLIC_VIDEO_URL</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right — white form panel */}
            <div className="bg-white border-t lg:border-t-0 lg:border-l border-[#e2e8f0] flex flex-col">
              <div className="relative bg-[#f0f5fb] border-b border-[#e2e8f0] flex items-center justify-center py-3 overflow-hidden">
                <BrochureIllustration />
                <div className="absolute bottom-2 left-0 right-0 text-center">
                  <p className="text-[9.5px] text-[#2b6cb0]/55 font-medium tracking-[0.12em] uppercase">Instant download · No spam</p>
                </div>
              </div>

              <div className="flex flex-col flex-1 px-5 sm:px-6 py-4">
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-4 h-px bg-[#2b6cb0]" />
                    <span className="text-[#2b6cb0] text-[9.5px] font-semibold tracking-[0.18em] uppercase">Resources</span>
                  </div>
                  <h3 className="font-serif text-[1.1rem] font-light text-[#1a202c] leading-tight">Download Product Brochure</h3>
                  <p className="text-[11.5px] font-light text-[#718096] mt-0.5">Full feature overview and implementation guide.</p>
                </div>
                <BrochureDownloadForm />
                <div className="mt-3 pt-2.5 border-t border-[#e2e8f0] text-center">
                  <span className="text-[11px] text-[#a0aec0] font-light">Prefer a live walkthrough? </span>
                  <Link href="/contact" className="text-[11px] text-[#2b6cb0] font-semibold hover:underline">Book a Tech Demo →</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CLIENTS ─────────────────────────────────────────────────────
            White band removed: section runs directly into CTA
        ── */}
        <section className="bg-white border-t border-[#e2e8f0]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-10 pb-6 text-center">
            <div className="flex items-center gap-3 mb-2 justify-center">
              <div className="w-6 h-px bg-[#2b6cb0]" />
              <span className="text-[#2b6cb0] text-[10px] font-semibold tracking-[0.2em] uppercase">Trusted by Leading Companies</span>
              <div className="w-6 h-px bg-[#2b6cb0]" />
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,2.5vw,1.75rem)] font-light text-[#1a202c] tracking-tight mb-1">
              Companies Using Firmity
            </h2>
            <p className="text-[13px] font-light text-[#a0aec0] mb-6">
              Join hundreds of facility managers transforming their operations
            </p>
          </div>
          {/* ClientsCarousel sits flush — no extra padding below */}
          <div className="border-t border-[#e2e8f0]">
            <ClientsCarousel />
          </div>
          {/* Removed the empty div that was creating the white gap */}
          <div className="pb-5 text-center pt-4">
            <Link href="/contact" className="inline-flex items-center gap-1.5 text-[#2b6cb0] text-[12.5px] font-semibold hover:gap-2.5 transition-all">
              Learn how they use Firmity →
            </Link>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <section className="relative bg-[#0d1525] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden="true">
            <span className="font-serif text-[clamp(40px,10vw,130px)] font-light text-[rgba(43,108,176,0.05)] tracking-[0.12em] whitespace-nowrap select-none">FIRMITY</span>
          </div>
          <div className="h-[3px] bg-gradient-to-r from-transparent via-[#2b6cb0] to-transparent" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 text-center">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <div className="w-6 h-px bg-white/20" />
              <span className="text-[rgba(99,179,237,0.7)] text-[10px] font-semibold tracking-[0.2em] uppercase">Start Today</span>
              <div className="w-6 h-px bg-white/20" />
            </div>
            <h2 className="font-serif text-[clamp(1.6rem,3.5vw,2.4rem)] font-light text-[#f0f4f8] tracking-tight leading-[1.12] mb-3">
              Ready to Transform Your<br />Facility Management?
            </h2>
            <p className="text-[13.5px] font-light text-white/[0.45] mb-7 max-w-[380px] mx-auto">
              Get 2 weeks free trial with unlimited training and 24/7 support
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-7">
              <Link href="/contact" className="group inline-flex items-center justify-center gap-2 bg-white text-[#1a2744] px-7 py-3 text-[13px] font-semibold hover:bg-[#e8f0fb] transition-colors">
                Start Your Free Trial
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/features" className="inline-flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/[0.4] px-7 py-3 text-[13px] font-light transition-all">
                Explore Features
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 flex-wrap">
              {["No credit card required", "Unlimited training included", "24/7 support from day one"].map((item, i, arr) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-white/[0.25]">
                    <span className="text-[rgba(99,179,237,0.5)]">✓</span>{item}
                  </div>
                  {i < arr.length - 1 && <div className="w-px h-3 bg-white/[0.08] hidden sm:block" />}
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-white/[0.05] py-3 text-center">
            <p className="text-[10px] text-white/[0.14] tracking-[0.06em]">
              Firmity is a registered software of UFIRM Technologies (P) Limited · Proudly Made in India
            </p>
          </div>
        </section>

      </main>
      <Footer />

      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoUrl={videoUrl}
        title="Firmity CMMS - Complete Facility Management Software"
      />
    </>
  )
}
// EOF