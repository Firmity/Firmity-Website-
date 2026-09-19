"use client"

import { useEffect, useState } from "react"

// Single continuous marquee (2026-09-04, per request — was two separate rows
// scrolling in opposite directions; Planon's own client-logo strip on
// planonsoftware.com/us is one row, so the two Firmity rows were merged into
// one combined list). `animate-scroll-left` (src/app/globals.css, @layer
// utilities, translateX(-33.333%) over 80s) already assumes a 3x-duplicated
// track — kept the [...allClients, ...allClients, ...allClients] pattern
// from the old two-row version so the math still lines up.

const allClients = [
  { name: "Park Hyatt", logo: "/clients/Park-hyatt.webp", width: 480, height: 142 },
  { name: "ITC Hotels", logo: "/clients/ITC_Hotels.webp", width: 400, height: 240 },
  { name: "Sobha", logo: "/clients/Sobha.webp", width: 154, height: 189 },
  { name: "Sharda University", logo: "/clients/Sharda-university.webp", width: 315, height: 115 },
  { name: "Indian Navy", logo: "/clients/indian-navy.webp", width: 189, height: 240 },
  { name: "Marriott", logo: "/clients/Marriott.webp", width: 427, height: 240 },
  { name: "Sharda Hospital", logo: "/clients/sharda-hospital.webp", width: 357, height: 118 },
  { name: "LT", logo: "/clients/LT.webp", width: 240, height: 240 },
  { name: "Big Basket", logo: "/clients/BigBasket.webp", width: 480, height: 114 },
  { name: "Kailash Hospital", logo: "/clients/Kailash.webp", width: 274, height: 240 },
  { name: "Commure", logo: "/clients/Commure.webp", width: 480, height: 113 },
  { name: "Modern Automotive", logo: "/clients/Modern-Automotive.webp", width: 191, height: 100 },
  { name: "Cinntra", logo: "/clients/cinntra.webp", width: 480, height: 200 },
  { name: "JM Florence", logo: "/clients/JMFlorence.webp", width: 160, height: 51 },
  { name: "Donaldson", logo: "/clients/Donaldson.webp", width: 480, height: 113 },
  { name: "Signode", logo: "/clients/Signode.webp", width: 435, height: 100 },
  { name: "SelaQui", logo: "/clients/selaqui.webp", width: 70, height: 70 },
  { name: "Vicon", logo: "/clients/Vicon.webp", width: 300, height: 90 },
  { name: "DPSG", logo: "/clients/dpsg.webp", width: 227, height: 240 },
  { name: "SafeExpress", logo: "/clients/SafeExpress.webp", width: 480, height: 180 },
  { name: "Schaeffler", logo: "/clients/Schaeffler.webp", width: 480, height: 60 },
  { name: "Exotica", logo: "/clients/Exotica.webp", width: 153, height: 58 },
  { name: "CK Birla Hospital", logo: "/clients/Ck-Birla-Hospital.webp", width: 480, height: 64 },
  { name: "ACE", logo: "/clients/ace.webp", width: 480, height: 183 },
  { name: "iSprout", logo: "/clients/iSprout.webp", width: 480, height: 150 },
  { name: "RG", logo: "/clients/RG.webp", width: 165, height: 76 },
]

const LOOP_COPIES = 3

export function ClientsCarousel() {
  // The server HTML (what crawlers and no-JS users get) contains the client
  // list exactly ONCE. The extra copies the marquee needs to loop seamlessly
  // are only added after mount, and are hidden from assistive tech and
  // search engines (aria-hidden + empty alt). The marquee itself only starts
  // once all copies exist, so its -33.333% loop math stays correct.
  const [copies, setCopies] = useState(1)
  useEffect(() => setCopies(LOOP_COPIES), [])

  return (
    <div className="overflow-hidden">
      <div className={`flex gap-8 ${copies === LOOP_COPIES ? "animate-scroll-left" : ""}`}>
        {Array.from({ length: copies }).flatMap((_, copy) =>
          allClients.map((client) => {
            const isClone = copy > 0
            return (
              <div
                key={`${copy}-${client.name}`}
                aria-hidden={isClone || undefined}
                className="flex-shrink-0 w-48 h-28 bg-white rounded-[4px] border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 flex items-center justify-center group cursor-pointer"
              >
                <div className="relative w-full h-full flex items-center justify-center p-4">
                  <img
                    src={client.logo || "/placeholder.svg"}
                    alt={isClone ? "" : client.name}
                    width={client.width}
                    height={client.height}
                    loading="lazy"
                    decoding="async"
                    className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
