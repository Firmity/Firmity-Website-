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

export function Footer() {
  return (
    <footer className="bg-[#0d1525] text-white border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14">

        {/* Main grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 flex flex-col gap-4">
            <Link href="/" className="inline-flex items-start">
              <Image
                src="/firmity.png"
                alt="Firmity Logo"
                width={110}
                height={36}
                className="object-contain brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-[12.5px] text-white/[0.45] font-light leading-relaxed max-w-[220px]">
              Complete Facility Management Software Suite
            </p>
            {/* Pillar tagline */}
            <div className="flex items-center gap-2 mt-1">
              {["Productivity", "Longevity", "Sustainability"].map((tag, i, arr) => (
                <span key={tag} className="flex items-center gap-2">
                  <span className="text-[10px] text-white/[0.3] font-light tracking-wide">{tag}</span>
                  {i < arr.length - 1 && <span className="text-white/[0.15] text-[10px]">·</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[11px] font-semibold text-white/[0.55] tracking-[0.18em] uppercase mb-1">
              Product
            </h4>
            <Link href="/features" className="text-[13px] text-white/[0.45] hover:text-white font-light transition-colors">
              Features
            </Link>
            <Link href="/resources" className="text-[13px] text-white/[0.45] hover:text-white font-light transition-colors">
              Resources
            </Link>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[11px] font-semibold text-white/[0.55] tracking-[0.18em] uppercase mb-1">
              Company
            </h4>
            <Link href="/contact" className="text-[13px] text-white/[0.45] hover:text-white font-light transition-colors">
              Contact
            </Link>
            <Link href="/blog" className="text-[13px] text-white/[0.45] hover:text-white font-light transition-colors">
              Blog
            </Link>
            <Link href="/login" className="text-[13px] text-white/[0.45] hover:text-white font-light transition-colors">
              Login
            </Link>
          </div>

          {/* Get Started */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[11px] font-semibold text-white/[0.55] tracking-[0.18em] uppercase mb-1">
              Get Started
            </h4>
            <p className="text-[13px] text-white/[0.45] font-light">2 Weeks Free Trial</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-[13px] text-[#63b3ed] font-semibold hover:text-[#4299e1] transition-colors"
            >
              Book Demo →
            </Link>
          </div>
        </div>

        {/* Bottom rule + legal */}
        <div className="border-t border-white/[0.07] pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/[0.22] font-light text-center sm:text-left">
            Firmity is a registered software of UFIRM Technologies (P) Limited — Proudly Made in India
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-[11px] text-white/[0.3] hover:text-white/[0.6] font-light transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/[0.12] text-[10px]">·</span>
            <Link href="/terms" className="text-[11px] text-white/[0.3] hover:text-white/[0.6] font-light transition-colors">
              Terms &amp; Conditions
            </Link>
            <span className="text-white/[0.12] text-[10px]">·</span>
            <p className="text-[11px] text-white/[0.18] font-light">
              © {new Date().getFullYear()} UFIRM Technologies (P) Limited
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}