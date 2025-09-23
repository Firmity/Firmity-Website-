"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Login } from "@/components/Login";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center -mt-16 overflow-visible bg-black/5">
      
      {/* Login section (top-right) */}
      <div className="absolute top-12 right-7 z-50">
        <Login />
      </div>

      {/* Background Image */}
      <Image
        src="/FacilityManagement/finally.jpg"
        alt="Facility Management Background"
        fill
        className="object-cover z-0"
        priority
      />

      {/* Soft Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#bfc98c]/45 to-[#2c3e50]/85 z-10" />

      {/* Glass Hero Card */}
      <div className="relative z-20 flex flex-col items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="backdrop-blur-xl bg-white/25 border border-white/20 shadow-lg rounded-3xl px-10 pt-20 pb-5 mx-4 w-full max-w-2xl flex flex-col items-center text-center"
          style={{ boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)" }}
        >
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-light leading-tight mb-8 drop-shadow-md tracking-widest uppercase mt-16 md:mt-20">
            <span className="block mb-2">THE COMPLETE</span>
            <span className="block mb-2 bg-gradient-to-r from-[#bcc94a] via-[#e3e9a4] to-[#aabf52] bg-clip-text text-transparent font-extrabold">
              FACILITY MANAGEMENT
            </span>
            <span className="block text-[#f3f4e9] text-4xl sm:text-5xl md:text-5xl font-extrabold tracking-wide drop-shadow-lg mb-9">
              SOFTWARE SUITE
            </span>
          </h1>

          <div className="text-[#e6efbc] font-semibold max-w-[380px] sm:max-w-[520px] leading-relaxed space-y-5 mb-1 text-lg sm:text-xl tracking-wider">
            <p className="uppercase tracking-widest drop-shadow-sm border-b border-[#bcc94a]/40 pb-2">
              DIGITAL FACILITY RECORDS
            </p>
            <p className="uppercase tracking-wider drop-shadow-sm border-b border-[#bcc94a]/40 pb-2">
              PPM &bull; EVENT &bull; TASK MANAGER &amp; ALERTS
            </p>
            <p className="uppercase tracking-widest drop-shadow-sm">
              ASSET &bull; INVENTORY &bull; STAFF &bull; VISITOR MANAGEMENT
            </p>
          </div>
        </motion.div>
      </div>

      {/* Firmity Logo Box at bottom right corner */}
      {/* Firmity Logo Box moved to top left */}
<motion.div
  initial={{ opacity: 0, y: -40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.2, delay: 1.2 }}
  className="
    absolute top-15 left-0 z-40
    bg-white/30 backdrop-blur-md
    rounded-tr-3xl
    rounded-br-3xl
    px-8 py-6
    shadow-lg
    flex flex-col items-center
    max-w-[320px]
    border border-[#c4d37d]/60
  "
>
  <Image
    src="/FacilityManagement/firmity.png"
    alt="FIRMITY Logo"
    width={180}
    height={48}
    priority
    className="mb-2 object-contain"
  />
</motion.div>

    </section>
  );
}
