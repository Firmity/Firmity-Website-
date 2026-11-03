"use client"

// Click-to-load YouTube embed ("lite embed").
//
// Why: a plain <iframe src="youtube.com/embed/..."> downloads the whole YouTube
// player (hundreds of KB of JavaScript) the moment the page loads, even if the
// visitor never plays the video — that hurts LCP/TBT, which is part of SXO. This
// shows the poster image instead and only loads the player on click. It also
// uses youtube-nocookie.com, so nothing is set on the visitor until they press
// play (consistent with the site's consent banner).
//
// The poster is a real <img> with a lazy attribute; the watch URL is present in
// the page (see the sibling link and the VideoObject JSON-LD) so crawlers don't
// depend on this component running.
import { useState } from "react"
import { Play } from "lucide-react"
import { videoThumbnail } from "@/src/lib/video-tutorials"

export function VideoEmbed({ id, title }: { id: string; title: string }) {
  const [active, setActive] = useState(false)

  if (active) {
    return (
      <iframe
        className="h-full w-full border-0"
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={`Play video: ${title}`}
      className="group relative block h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#114dac] focus-visible:ring-offset-2"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={videoThumbnail(id)}
        alt=""
        width={480}
        height={360}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#114dac] text-white transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
          <Play size={26} aria-hidden="true" className="ml-1 fill-current" />
        </span>
      </span>
    </button>
  )
}
