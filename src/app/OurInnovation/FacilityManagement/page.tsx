"use client";

import StylishFeaturesBenefits from "@/components/FacilityManagement/StylishFeaturesBenefits";
import MindBlowingStylishPricingSection from "@/components/FacilityManagement/MindBlowingStylishPricingSection";
import HeroSection from "@/components/FacilityManagement/HeroSection";
import ClientCarousel from "@/components/ClientCarousel";

export default function FacilityManagement() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Navbar */}
      

      {/* --- HERO SECTION --- */}
      <HeroSection />

      {/* --- MAIN CONTENT --- */}
      

      {/* --- FEATURES & BENEFITS --- */}
      <StylishFeaturesBenefits />

      {/* --- PRICING SECTION --- */}
      <MindBlowingStylishPricingSection />

      {/* --- CLIENT CAROUSEL --- */}
      <ClientCarousel />
    </div>
  );
}
