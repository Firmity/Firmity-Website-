"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "../navbar";

export default function HeroSection({
  onWatchDemo,
  onBrochureDownload,
}: {
  onWatchDemo: () => void;
  onBrochureDownload: () => void;
}) {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <Navbar />
      {/* Background */}
      <Image
        src="/Firmitypic.avif"
        alt="Facility Background"
        fill
        // className="object-cover brightness-[0.55]"
        priority
      />

      {/* Gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-gradient-to-br from-black/40 via-[#2d3a24]/40 to-black/80"
      />

      {/* Glow */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute w-[480px] h-[480px] bg-[#d4ffab]/20 blur-[130px] rounded-full"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-20 text-center px-4"
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-wide leading-tight drop-shadow-2xl">
          The Future of
          <span className="block bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
            Facility Management
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-2xl text-white font-medium tracking-wide max-w-2xl mx-auto leading-relaxed">
          A complete digital ecosystem to manage facility operations, assets,
          staff, visitors, events and more.
        </p>

        {/* CALL TO ACTION BUTTONS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 flex flex-wrap justify-center gap-5"
        >
          {/* Explore */}
          <button
  onClick={() => {
    document.getElementById("features-section")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-full text-white font-semibold shadow-xl"
>
  Explore Platform
</button>

          {/* Watch Demo */}
          <button
            onClick={onWatchDemo}
            className="px-8 py-3 border border-blue-500 text-blue-400 hover:bg-blue-500/10 rounded-full font-semibold transition"
          >
            Watch Demo
          </button>

          {/* Download Brochure */}
          <button
            onClick={onBrochureDownload}
            className="px-8 py-3 bg-white/10 text-white border border-white/20 rounded-full font-semibold hover:bg-white/20 transition"
          >
            📄 Download Brochure
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
