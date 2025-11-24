"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    // { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Resources", href: "/resources" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
           
            <Image src="/firmity.png" alt="Firmity Logo" width={100} height={80} className="object-contain" />
            {/* <span className="font-bold text-lg text-foreground">Firmity</span> */}
          
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-foreground hover:text-primary transition-colors">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Login and Demo Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-foreground hover:text-primary transition-colors font-medium">
              Login
            </Link>
            <Link
              href="/contact"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-secondary transition-colors font-medium"
            >
              Book Demo
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-3 border-t border-border">
              <Link
                href="/login"
                className="text-center text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/contact"
                className="text-center bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-secondary transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Book Demo
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
