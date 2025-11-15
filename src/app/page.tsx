"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import FacilityManagement from "./OurInnovation/FacilityManagement/page";
import VideoPopup from "../components/VideoPopup";
import BrochureModal from "../components/BrochureModal";

export default function Home() {
  const [showButton, setShowButton] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const [showBrochure, setShowBrochure] = useState(false);

  // Show video popup after 2.5s delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Floating button scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (!aboutRef.current) return;
      const top = aboutRef.current.getBoundingClientRect().top;
      const isHalfVisible = top < window.innerHeight / 2;
      if (isHalfVisible !== showButton) setShowButton(isHalfVisible);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showButton]);

  return (
    <main className="min-h-screen relative">
      <FacilityManagement />

      {/* Floating Links */}
      {showButton && (
        <div className="fixed right-5 z-50 space-y-3 bottom-10 sm:bottom-12">
          <Link
            href="https://calendly.com/bhavesh-singh-ufirm"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 bg-[#146995] text-white rounded-full shadow-lg text-center text-sm sm:text-base font-medium hover:bg-[#125b81] transition"
          >
            Facility Tech Demo 📅
          </Link>
          <Link
            href="https://calendly.com/bhavesh-singh-ufirm"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 bg-[#146995] text-white rounded-full shadow-lg text-center text-sm sm:text-base font-medium hover:bg-[#125b81] transition"
          >
            Facility Health Survey 🛠️
          </Link>
        </div>
      )}

      {/* {showBrochure && (
        <BrochureModal
          show={showBrochure}
          onClose={() => setShowBrochure(false)}
        />
      )} */}

      {/* Video Popup */}
      {showVideo && (
        <VideoPopup
          videoUrl="https://admin.urest.in:8097/video/Firmity_video_v05.mp4"
          onClose={() => setShowVideo(false)}
        />
      )}
    </main>
  );
}
