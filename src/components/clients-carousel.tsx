"use client"

// Single continuous marquee (2026-09-04, per request — was two separate rows
// scrolling in opposite directions; Planon's own client-logo strip on
// planonsoftware.com/us is one row, so the two Firmity rows were merged into
// one combined list). `animate-scroll-left` (src/app/globals.css, @layer
// utilities, translateX(-33.333%) over 80s) already assumes a 3x-duplicated
// track — kept the [...allClients, ...allClients, ...allClients] pattern
// from the old two-row version so the math still lines up.

const allClients = [
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
]

export function ClientsCarousel() {
  return (
    <div className="overflow-hidden">
      <div className="flex gap-8 animate-scroll-left">
        {[...allClients, ...allClients, ...allClients].map((client, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-48 h-28 bg-white rounded-[4px] border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 flex items-center justify-center group cursor-pointer"
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
  )
}
