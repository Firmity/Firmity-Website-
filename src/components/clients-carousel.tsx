"use client"

import { useRef } from "react"

interface ClientLogo {
  name: string
  logo: string // URL to logo image
}

const topRowClients: ClientLogo[] = [
  { name: "Park Hyatt", logo: "/clients/Park-hyatt.webp" },
  { name: "ITC Hotels", logo: "/clients/ITC_Hotels.webp" },
  { name: "Sobha", logo: "/clients/Sobha.webp" },
  { name: "Sharda University", logo: "/clients/Sharda-university.webp" },
  { name: "Indian Navy", logo: "/clients/indian-navy.webp" },
  { name: "Marriott", logo: "/clients/Marriott.webp" },
  { name: "Sharda Hospital", logo: "/clients/sharda-hospital.webp" },
  { name: "LT", logo: "/clients/LT.webp" },
  { name: "Big Basket", logo: "/clients/BigBasket.webp" },
  { name: "Kailash Hospital", logo: "/clients/Kailash.webp" },
  { name: "Commure", logo: "/clients/Commure.webp" },
  { name: "Modern Automotive", logo: "/clients/Modern-Automotive.webp" },
  { name: "Cinntra", logo: "/clients/cinntra.webp" },
];

const bottomRowClients: ClientLogo[] = [
  { name: "JM Florence", logo: "/clients/JMFlorence.webp" },
  { name: "Donaldson", logo: "/clients/Donaldson.webp" },
  { name: "Signode", logo: "/clients/Signode.webp" },
  { name: "SelaQui", logo: "/clients/selaqui.webp" },
  { name: "Vicon", logo: "/clients/Vicon.webp" },
  { name: "DPSG", logo: "/clients/dpsg.webp" },
  { name: "SafeExpress", logo: "/clients/SafeExpress.webp" },
  { name: "Schaeffler", logo: "/clients/Schaeffler.webp" },
  { name: "Exotica", logo: "/clients/Exotica.webp" },
  { name: "CK Birla Hospital", logo: "/clients/Ck-Birla-Hospital.webp" },
  { name: "ACE", logo: "/clients/ace.webp" },
  { name: "iSprout", logo: "/clients/iSprout.webp" },
  { name: "RG", logo: "/clients/RG.webp" },
];


export function ClientsCarousel() {
  const topScrollContainerRef = useRef<HTMLDivElement>(null)
  const bottomScrollContainerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="space-y-8">
      {/* Top row - scroll left with actual logo images */}
      <div className="overflow-hidden">
        <div ref={topScrollContainerRef} className="flex gap-8 animate-scroll-left">
          {[...topRowClients, ...topRowClients, ...topRowClients].map((client, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-48 h-28 bg-white rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 flex items-center justify-center group cursor-pointer"
            >
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <img
                  src={client.logo || "/placeholder.svg"}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row - scroll right with different clients */}
      <div className="overflow-hidden">
        <div ref={bottomScrollContainerRef} className="flex gap-8 animate-scroll-right">
          {[...bottomRowClients, ...bottomRowClients, ...bottomRowClients].map((client, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-48 h-28 bg-white rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 flex items-center justify-center group cursor-pointer"
            >
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <img
                  src={client.logo || "/placeholder.svg"}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust stats */}
      {/* <div className="grid grid-cols-3 gap-6 mt-8">
        <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="text-3xl font-bold text-primary">100+</div>
          <p className="text-sm text-foreground/80 mt-1">Active Clients</p>
        </div>
        <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="text-3xl font-bold text-primary">50k+</div>
          <p className="text-sm text-foreground/80 mt-1">Assets Tracked</p>
        </div>
        <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="text-3xl font-bold text-primary">1M+</div>
          <p className="text-sm text-foreground/80 mt-1">Tasks Managed</p>
        </div>
      </div> */}
    </div>
  )
}
