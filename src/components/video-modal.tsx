"use client"

import { X } from "lucide-react"
import { useEffect, useRef } from "react"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  title?: string
}

export function VideoModal({ isOpen, onClose, videoUrl, title = "Firmity CMMS" }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.playbackRate = 1.5
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="w-full md:w-1/2 relative max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors z-10"
          aria-label="Close video"
        >
          <X size={32} />
        </button>

        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
          {videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") ? (
            <iframe
              ref={videoRef as any}
              width="100%"
              height="100%"
              src={videoUrl.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/") + "?autoplay=1"}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <video ref={videoRef} width="100%" height="100%" controls autoPlay className="w-full h-full object-cover">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </div>
  )
}
