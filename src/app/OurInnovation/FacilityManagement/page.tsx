"use client";

import { useState } from "react";
import StylishFeaturesBenefits from "@/components/FacilityManagement/StylishFeaturesBenefits";
import MindBlowingStylishPricingSection from "@/components/FacilityManagement/MindBlowingStylishPricingSection";
import HeroSection from "@/components/FacilityManagement/HeroSection";
import ClientCarousel from "@/components/ClientCarousel";
import Navbar from "@/components/navbar";
import VideoPopup from "@/components/VideoPopup";
import BrochureModal from "@/components/BrochureModal";

export default function FacilityManagement() {
  const [showVideo, setShowVideo] = useState(false);
  const [showBrochure, setShowBrochure] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* --- Navbar --- */}
      {/* <Navbar /> */}

      {/* --- HERO SECTION --- */}
      <HeroSection
        onWatchDemo={() => setShowVideo(true)}
        onBrochureDownload={() => setShowBrochure(true)}
      />

      {/* --- MAIN CONTENT --- */}

      {/* --- FEATURES & BENEFITS --- */}
      <div id="features-section">
        <StylishFeaturesBenefits />
      </div>

      {/* --- PRICING SECTION --- */}
      <div id="pricing-section">
        <MindBlowingStylishPricingSection />
      </div>

      {/* --- CLIENT CAROUSEL --- */}
      <ClientCarousel />

      {showVideo && (
        <VideoPopup
          videoUrl="https://admin.urest.in:8097/video/Firmity_video_v05.mp4"
          onClose={() => setShowVideo(false)}
        />
      )}

      {showBrochure && (
        <BrochureModal
          show={showBrochure}
          onClose={() => setShowBrochure(false)}
        />
      )}
    </div>
  );
}
