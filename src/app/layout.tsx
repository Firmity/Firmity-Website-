import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Playfair_Display, DM_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Script from "next/script"
import { ScrollToTop } from "@/src/components/scroll-to-top"
import { JsonLd } from "@/src/components/json-ld"
import { SITE, buildMetadata, organizationJsonLd, websiteJsonLd } from "@/src/lib/seo"
import { getSiteSeo } from "@/src/lib/seo-store"

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
        {/* Site-wide structured data for rich results / knowledge panel */}
        <JsonLd data={org} />
        <JsonLd data={websiteJsonLd()} />
        <ScrollToTop />
        {children}
        <Analytics />
      </body>
    </html>
  )
}