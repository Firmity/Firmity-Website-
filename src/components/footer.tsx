import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
             <Link href="/" className="flex items-center gap-2">
           
            <Image src="/firmity.png" alt="Firmity Logo" width={100} height={80} className="object-contain" />
            {/* <span className="font-bold text-lg text-foreground">Firmity</span> */}
          
          </Link>
            <p className="text-sm opacity-80">Complete Facility Management Software Suite</p>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold">Product</h4>
            <Link href="/features" className="text-sm hover:underline opacity-80">
              Features
            </Link>
            <Link href="/pricing" className="text-sm hover:underline opacity-80">
              Pricing
            </Link>
            <Link href="/resources" className="text-sm hover:underline opacity-80">
              Resources
            </Link>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold">Company</h4>
            {/* <Link href="/about" className="text-sm hover:underline opacity-80">
              About Us
            </Link> */}
            <Link href="/contact" className="text-sm hover:underline opacity-80">
              Contact
            </Link>
            <Link href="/login" className="text-sm hover:underline opacity-80">
              Login
            </Link>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold">Get Started</h4>
            <p className="text-sm opacity-80">6 Weeks Free Trial</p>
            <Link href="/contact" className="text-sm font-semibold hover:underline text-accent">
              Book Demo
            </Link>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-sm opacity-80">
          <p>Firmity is a registered software of UFIRM Technologies (P) Limited - Proudly Made in India</p>
          <p className="mt-2">Productivity • Longevity • Sustainability</p>
        </div>
      </div>
    </footer>
  )
}
