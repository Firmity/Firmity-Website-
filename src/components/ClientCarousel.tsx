"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const topClients = [
    { src: "/logos/Park-hyatt.webp", alt: "Park Hyatt" },
    { src: "/logos/ITC_Hotels.webp", alt: "ITC Hotels" },
    { src: "/logos/Sobha.webp", alt: "Sobha" },
    { src: "/logos/Sharda-university.webp", alt: "Sharda University" },
    { src: "/logos/indian-navy.webp", alt: "Indian Navy" },
    { src: "/logos/Marriott.webp", alt: "Marriott" },
    { src: "/logos/sharda-hospital.webp", alt: "Sharda Hospital" },
    { src: "/logos/LT.webp", alt: "LT" },
    { src: "/logos/BigBasket.webp", alt: "Big Basket" },
    { src: "/logos/Kailash.webp", alt: "Kailash hospital" },
    { src: "/logos/Commure.webp", alt: "Commure" },
    { src: "/logos/Modern-Automotive.webp", alt: "Modern Automotive" },
    { src: "/logos/cinntra.webp", alt: "Cinntra" },
];

const bottomClients = [
    { src: "/logos/JMFlorence.webp", alt: "JM Florence" },
    { src: "/logos/Donaldson.webp", alt: "Donaldson" },
    { src: "/logos/Signode.webp", alt: "Signode" },
    { src: "/logos/selaqui.webp", alt: "SelaQui" },
    { src: "/logos/Vicon.webp", alt: "Vicon" },
    { src: "/logos/dpsg.webp", alt: "DPSG" },
    { src: "/logos/SafeExpress.webp", alt: "SafeExpress" },
    { src: "/logos/Schaeffler.webp", alt: "Schaeffler" },
    { src: "/logos/Exotica.webp", alt: "Exotica" },
    { src: "/logos/Ck-Birla-Hospital.webp", alt: "CK Birla Hospital" },
    { src: "/logos/ace.webp", alt: "ace" },
    { src: "/logos/iSprout.webp", alt: "iSprout" },
    { src: "/logos/RG.webp", alt: "RG" },
];

export default function ClientCarousel() {
    return (
        <section className="relative w-full py-10 sm:py-16 bg-gray-50">
            <div className="text-center mb-8 sm:mb-10 px-4">
                <h2 className="text-xl sm:text-2xl font-semibold ">
                    <span className="text-2xl sm:text-3xl font-bold text-black">Trusted By 250+ clients across India</span>
                </h2>
            </div>
            <div className="relative overflow-hidden">
                <div className="pointer-events-none absolute left-0 top-0 h-full w-17 sm:w-28 bg-gradient-to-r from-gray-50 to-transparent z-10" />
                <div className="pointer-events-none absolute right-0 top-0 h-full w-17 sm:w-28 bg-gradient-to-l from-gray-50 to-transparent z-10" />
                <InfiniteMovingCards
                    items={topClients}
                    direction="right"
                    speed="slow"
                    pauseOnHover={true}
                />
                <InfiniteMovingCards
                    items={bottomClients}
                    direction="left"
                    speed="slow"
                    pauseOnHover={true}
                />
            </div>
        </section>
    );
}