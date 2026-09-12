// ─── Inline video URL builder ─────────────────────────────────────────────────
// Converts any video URL to an embeddable autoplay URL.
// Handles YouTube (watch?v= and youtu.be), Vimeo, and direct file/embed URLs.
// Extracted from src/app/page.tsx (2026-09-08) so src/app/features/page.tsx's
// cloned "Contact Us for a Walkthrough" section can share the exact same
// video-embed logic instead of duplicating it.
export function buildInlineVideoUrl(url: string): string {
  // YouTube watch URL: https://www.youtube.com/watch?v=VIDEO_ID
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/)
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1`
  }
  // YouTube embed URL already: https://www.youtube.com/embed/VIDEO_ID
  if (url.includes("youtube.com/embed/")) {
    return url.includes("autoplay") ? url : `${url}${url.includes("?") ? "&" : "?"}autoplay=1`
  }
  // Vimeo: https://vimeo.com/VIDEO_ID
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&title=0&byline=0`
  }
  // Vimeo player already: https://player.vimeo.com/video/VIDEO_ID
  if (url.includes("player.vimeo.com")) {
    return url.includes("autoplay") ? url : `${url}${url.includes("?") ? "&" : "?"}autoplay=1`
  }
  // Direct file or custom embed — append autoplay param
  return url.includes("autoplay") ? url : `${url}${url.includes("?") ? "&" : "?"}autoplay=1`
}
