"use client";
import React, { useEffect, useRef } from "react";

interface VideoPopupProps {
  videoUrl: string;
  onClose: () => void;
}

export default function VideoPopup({ videoUrl, onClose }: VideoPopupProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Close on ESC key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Auto-play video when popup opens (muted)
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true; // required for autoplay
      video
        .play()
        .then(() => console.log("Video playing"))
        .catch((err) => console.log("Autoplay blocked:", err));
    }
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[9999]"
      onClick={onClose} // close when clicking outside
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-transparent rounded-2xl overflow-hidden w-[90%] max-w-4xl shadow-2xl"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking video
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
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
          muted // keep muted to allow autoplay
          className="w-full h-[min(70vh,600px)] block rounded-2xl"
        />
      </div>
    </div>
  );
}
