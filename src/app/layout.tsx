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
      <head>
        {/* Apply saved theme before paint to avoid a flash of the default palette */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{var t=localStorage.getItem('firmity_theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}`}
        </Script>
        {/* Google Tag Manager */}
        <Script id="gtm-base" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T27H73H4');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body className="font-sans antialiased bg-white text-[#1a202c]">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T27H73H4"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ScrollToTop />
        {children}
        <Analytics />
      </body>
    </html>
  )
}