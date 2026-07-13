// import Link from "next/link"
// import Image from "next/image"

// export function Footer() {
//   return (
//     <footer className="bg-foreground text-background py-12 mt-20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//           {/* Brand */}
//           <div className="flex flex-col gap-3">
//              <Link href="/" className="flex items-center gap-2">
           
//             <Image src="/firmity.png" alt="Firmity Logo" width={100} height={80} className="object-contain" />
//             {/* <span className="font-bold text-lg text-foreground">Firmity</span> */}
          
//           </Link>
//             <p className="text-sm opacity-80">Complete Facility Management Software Suite</p>
//           </div>

//           {/* Product */}
//           <div className="flex flex-col gap-3">
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
//           <div className="flex flex-col gap-3">
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
//           <div className="flex flex-col gap-3">
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
import { Linkedin, Instagram, Twitter, Facebook, Youtube } from "lucide-react"

const SOCIALS = [
  { Icon: Linkedin,  href: "#", label: "LinkedIn" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Twitter,   href: "#", label: "X / Twitter" },
  { Icon: Facebook,  href: "#", label: "Facebook" },
  { Icon: Youtube,   href: "#", label: "YouTube" },
]

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#dbe5f0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14">

        {/* Main grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1 flex flex-col gap-4">
            <Link href="/" className="inline-flex items-start">
              <Image
                src="/firmity.png"
                alt="Firmity Logo"
                width={110}
                height={36}
                className="object-contain"
              />
            </Link>
            <p className="text-[12.5px] text-[#1a4a8a] font-light leading-relaxed max-w-[220px]">
              Complete Facility Management Software Suite
            </p>
            {/* Pillar tagline */}
            <div className="flex items-center gap-2">
              {["Productivity", "Longevity", "Sustainability"].map((tag, i, arr) => (
                <span key={tag} className="flex items-center gap-2">
                  <span className="text-[10px] text-[#2b6cb0]/50 font-light tracking-wide">{tag}</span>
                  {i < arr.length - 1 && <span className="text-[#2b6cb0]/30 text-[10px]">·</span>}
                </span>
              ))}
            </div>
            {/* Contact Us button */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center w-fit px-5 py-2 rounded-lg bg-[#2b6cb0] text-white text-[12.5px] font-semibold hover:bg-[#1a56a0] transition-colors mt-1"
            >
              Contact Us
            </Link>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {SOCIALS.map(({ Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-7 h-7 rounded-lg border border-[#dbe5f0] flex items-center justify-center text-[#1a4a8a] hover:text-[#0d2d5e] hover:border-[#2b6cb0]/60 transition-colors"
                >
                  <Icon size={13} />
                </Link>
              ))}
            </div>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[11px] font-semibold text-[#111d35] tracking-[0.18em] uppercase mb-1">
              Product
            </h4>
            <Link href="/features" className="text-[13px] text-[#1a4a8a] hover:text-[#0d2d5e] font-light transition-colors">
              Features
            </Link>
            <Link href="/resources" className="text-[13px] text-[#1a4a8a] hover:text-[#0d2d5e] font-light transition-colors">
              Resources
            </Link>
          </div>

          {/* Industries */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[11px] font-semibold text-[#111d35] tracking-[0.18em] uppercase mb-1">
              Industries
            </h4>
            <Link href="/industries/manufacturing" className="text-[13px] text-[#1a4a8a] hover:text-[#0d2d5e] font-light transition-colors">
              Manufacturing
            </Link>
            <Link href="/industries/educational" className="text-[13px] text-[#1a4a8a] hover:text-[#0d2d5e] font-light transition-colors">
              Educational
            </Link>
            <Link href="/industries/residential" className="text-[13px] text-[#1a4a8a] hover:text-[#0d2d5e] font-light transition-colors">
              Residential
            </Link>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[11px] font-semibold text-[#111d35] tracking-[0.18em] uppercase mb-1">
              Company
            </h4>
            <Link href="/contact" className="text-[13px] text-[#1a4a8a] hover:text-[#0d2d5e] font-light transition-colors">
              Contact
            </Link>
            <Link href="/blog" className="text-[13px] text-[#1a4a8a] hover:text-[#0d2d5e] font-light transition-colors">
              Blog
            </Link>
            <Link href="/login" className="text-[13px] text-[#1a4a8a] hover:text-[#0d2d5e] font-light transition-colors">
              Login
            </Link>
            <Link href="/staff-login" className="text-[13px] text-[#1a4a8a] hover:text-[#0d2d5e] font-light transition-colors">
              Survey Login
            </Link>
          </div>
        </div>

        {/* Bottom rule + legal */}
        <div className="border-t border-[#dbe5f0] pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-[#2b6cb0]/70 font-light text-center sm:text-left">
            Firmity is a registered software of UFIRM Technologies (P) Limited — Proudly Made in India
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-[11px] text-[#1a4a8a] hover:text-[#0d2d5e] font-light transition-colors">
              Privacy Policy
            </Link>
            <span className="text-[#2b6cb0]/20 text-[10px]">·</span>
            <Link href="/terms" className="text-[11px] text-[#1a4a8a] hover:text-[#0d2d5e] font-light transition-colors">
              Terms &amp; Conditions
            </Link>
            <span className="text-[#2b6cb0]/20 text-[10px]">·</span>
            <p className="text-[11px] text-[#2b6cb0]/60 font-light">
              © {new Date().getFullYear()} UFIRM Technologies (P) Limited
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}