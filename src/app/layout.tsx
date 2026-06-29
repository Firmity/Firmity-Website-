import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Playfair_Display, DM_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Script from "next/script"
import { ScrollToTop } from "@/src/components/scroll-to-top"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-serif",
  display: "swap",
})

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Firmity CMMS — Complete Facility Management Software",
  description: "Firmity is a smart, integrated facility management software built to simplify operations, enhance visibility, and empower teams with real-time control over maintenance, assets, workforce, and compliance.",
  icons: {
    icon: [{ url: "/firmity.png" }],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Firmity CMMS — Complete Facility Management Software",
    description: "Smart, integrated CMMS platform. Centralised records, automated PPM, complaint management, and workforce control.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfairDisplay.variable} ${dmMono.variable}`}
    >
      <body className="font-sans antialiased bg-white text-[#1a202c]">
        <ScrollToTop />
        {children}
        <Analytics />
      </body>
    </html>
  )
}