import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Playfair_Display, DM_Mono } from "next/font/google"
import "./globals.css"
import Script from "next/script"
import { ScrollToTop } from "@/src/components/scroll-to-top"
import { JsonLd } from "@/src/components/json-ld"
import { MarketingWidgets } from "@/src/components/marketing-widgets"
import { Analytics } from "@vercel/analytics/next"
import { CookieConsent } from "@/src/components/cookie-consent"
import { ConsentGatedScripts } from "@/src/components/consent-gated-scripts"
import { SITE, buildMetadata, organizationJsonLd, websiteJsonLd } from "@/src/lib/seo"
import { getSiteSeo } from "@/src/lib/seo-store"

const dmSans = DM_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-playfair",
  display: "swap",
})

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
})

// Home ("/") metadata + site-wide defaults. `metadataBase` makes every relative
// canonical/OG URL absolute. `title.template` gives child pages "<Page> | Firmity"
// while the home page keeps its own absolute title (title.default). Child pages
// override description/canonical/OG via their own `buildMetadata(path)` export.
const { title: homeTitle, ...homeRest } = buildMetadata("/")
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  ...homeRest,
  title: {
    default: homeTitle as string,
    template: `%s | ${SITE.name}`,
  },
  icons: {
    icon: [{ url: "/firmity.png" }],
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Organization structured data, editable in the Marketing Studio (SEO tab).
  const site = await getSiteSeo()
  const org: Record<string, unknown> = { ...organizationJsonLd() }
  if (site.org_name) org.name = site.org_name
  if (site.org_logo_url) org.logo = site.org_logo_url
  if (site.social_links && site.social_links.length) org.sameAs = site.social_links
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
      </head>
      <body className="font-sans antialiased bg-white text-[#1a202c]">
        {/* Site-wide structured data for rich results / knowledge panel */}
        <JsonLd data={org} />
        <JsonLd data={websiteJsonLd()} />
        <ScrollToTop />
        {children}
        {/* WhatsApp CTA + survey popup — self-gate to marketing pages only */}
        <MarketingWidgets />
        {/* Cookieless visit counter: counts every visitor, sets no cookie */}
        <Analytics />
        {/* Tag manager loads ONLY after the visitor accepts cookies (Privacy Policy clause 5.1) */}
        <ConsentGatedScripts />
        <CookieConsent />
      </body>
    </html>
  )
}