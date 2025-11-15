"use client";
import React, { useEffect, useRef, useState } from "react";

interface VideoPopupProps {
  videoUrl: string;
  onClose: () => void;
}

export default function VideoPopup({ videoUrl, onClose }: VideoPopupProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Show popup with fade-in
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Auto-play video (muted)
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playbackRate = 1.5;   // 👈 your 1.5x speed right here
      video
        .play()
        .then(() => console.log("Video playing"))
        .catch((err) => console.log("Autoplay blocked:", err));
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300); // match transition duration
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-[9999] bg-black/70 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-transparent rounded-2xl overflow-hidden w-[90%] max-w-4xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close video"
          className="absolute top-3 right-3 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center font-bold hover:bg-gray-200 transition-shadow shadow z-[10001]"
        >
          ✕
        </button>

        <video
          ref={videoRef}
          src={videoUrl}
          controls
          autoPlay
          playsInline
          muted
          className="w-full h-[min(70vh,600px)] block rounded-2xl"
        />
      </div>
    </div>
  );
}
