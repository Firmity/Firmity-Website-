"use client";

import Image from "next/image";
import { Login } from "./Login";

export default function Navbar() {
  return (
    <nav
      className="
        absolute top-0 left-0 right-0 z-[30]
        flex items-center justify-between
        px-4 md:px-8 py-4
        bg-transparent
      "
    >
      {/* LEFT: LOGO */}
      <div
        className="
          bg-white 
          px-3 py-2 
          rounded-md 
          shadow-md 
          border border-gray-200
        "
      >
        <Image
          src="/FacilityManagement/firmity.png"
          width={120}
          height={40}
          alt="Firmity Logo"
          className="object-contain md:w-[150px]"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4 md:gap-8">
        {/* LOGIN DROPDOWN – mobile fixed */}
        <div className="relative">
          <Login />
        </div>

        {/* BOOK DEMO BUTTON */}
        <button
          onClick={() => {
            document.getElementById("pricing-section")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
          className="
    bg-[#4A86C5]
    text-white font-semibold
    px-4 py-2 md:px-6 md:py-2.5
    rounded-full
    hover:bg-[#3A6FA6]
    transition
    text-sm md:text-base
  "
        >
          Book Demo
        </button>
      </div>
    </nav>
  );
}
