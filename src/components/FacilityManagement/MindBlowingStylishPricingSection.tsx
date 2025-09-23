"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCheckSquare } from "react-icons/fa";

type PricingTier = {
  manpowerRange: string;
  price: string;
  freeTrial: string;
};

const pricingTiers: PricingTier[] = [
  { manpowerRange: "1 - 10 manpower", price: "₹300", freeTrial: "6 WEEKS" },
  { manpowerRange: "11 - 50 manpower", price: "₹250", freeTrial: "6 WEEKS" },
  { manpowerRange: "51 - 100 manpower", price: "₹180", freeTrial: "6 WEEKS" },
];

const subscriptionServices = [
  "Complete FIRMITY Facility Management Software Suite.",
  "Unlimited Team Training | Digital Report Download.",
  "Bulk Data Entry Support Twice a Year.",
  "Back-end Customer Care Support (Mon-Sat, 9am–6pm).",
  "Role Based Access and Data Security Management.",
  "All Charges are Exclusive of GST.",
];

const AnimatedCard: React.FC<{ children: React.ReactNode; delay: number }> = ({
  children,
  delay,
}) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  // Remove cursor-pointer from the main card!
  return (
    <div
      className={`transform rounded-xl p-8 bg-white border border-[#9fbc77] shadow-md transition-transform duration-500 ease-in-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        } hover:shadow-2xl`}
    >
      {children}
    </div>
  );
};

export default function MindBlowingStylishPricingSection() {
  return (
    <section
      className="relative overflow-hidden pt-12 pb-10 px-6"
      style={{
        background:
          "radial-gradient(circle at center, #c03030ff, #5c70afff 70%), url('/FacilityManagement/abstract-green.svg') center center / cover no-repeat",
      }}
    >
      {/* Floating shapes */}
      <div className="pointer-events-none absolute top-10 left-5 w-40 h-40 bg-[#a5b35a] rounded-full opacity-30 blur-3xl animate-floatSlow" />
      <div className="pointer-events-none absolute bottom-10 right-10 w-72 h-72 bg-[#72892d] rounded-full opacity-20 blur-2xl animate-floatSlowReverse" />

      {/* Section Title */}
      <h2 className="relative text-5xl font-extrabold text-[#ebc2c2ff] text-center mb-16 drop-shadow-lg">
        FREE TRIAL & PRICING STRUCTURE
      </h2>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {pricingTiers.map(({ manpowerRange, price, freeTrial }, idx) => (
          <AnimatedCard key={idx} delay={idx * 300}>
            <div className="text-2xl font-semibold text-[#557a48] mb-3">
              {manpowerRange}
            </div>
            <div className="text-6xl font-extrabold text-[#04461aff] mb-5 drop-shadow-md relative inline-flex items-baseline">
              {price}
              <span className="ml-2 mt-1 text-base italic font-light text-[#557a48] tracking-wide whitespace-nowrap">
                per person / per month
              </span>
            </div>

            {/* Book Tech Demo Button */}
            <Link href="https://calendly.com/demo-firmity/30min" target="_blank" rel="noopener noreferrer">
              <button className="mb-4 w-full rounded-full bg-[#6eebacff] text-[#3b4f1b] font-bold py-2 px-6 tracking-wide shadow-lg hover:bg-[#1fee87ff] transition-colors duration-300 cursor-pointer">
                Book Tech Demo
              </button>
            </Link>

            {/* Free Trial Badge -- non-button style */}
            <div className="mb-2 text-[#3b4f1b] font-bold tracking-wide">
              {freeTrial} Free Trial
            </div>

            {/* Divider line */}
            <div className="w-full border-b-2 border-green-600 mb-3"></div>

            {/* Services heading */}
            <div className="font-semibold text-sm mb-3 text-[#05910cff] uppercase tracking-wide">
              The following services are included in the subscription cost:
            </div>

            {/* Subscription Services */}
            <div>
              <ul className="space-y-3 text-[#2d3e3e]">
                {subscriptionServices.map((service, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-base select-none"
                  >
                    <FaCheckSquare className="text-[#36be42ff] flex-shrink-0" />
                    <span className="flex-1">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Bottom CTA Box with UFIRM link and Firmity logo */}
      <div
        className="mt-20 px-6 py-5 max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4
    bg-gradient-to-r from-green-300 via-green-100 to-green-200
    rounded-2xl shadow-lg ring-2 ring-green-400 border-t-2 border-green-600
    relative overflow-visible"
      >
        <span className="flex items-center gap-2 font-bold uppercase tracking-widest text-green-800 select-none text-sm md:text-base">
          <svg
            width="26"
            height="26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-hidden="true"

          >
            <circle cx="13" cy="13" r="13" fill="#7bce7e" />
          </svg>
          FOR CUSTOMISED OFFER & TRIAL ASSISTANCE:
        </span>

        <div className="w-36 h-12 relative">
          <Image
            src="/FacilityManagement/firmity.png"
            alt="Firmity Facility Management Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
