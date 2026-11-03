// Single source of truth for the /resources/video-tutorials page.
// To add a tutorial, append ONE entry to VIDEO_TUTORIALS — the page, the
// VideoObject structured data and the sitemap's video entries all read from here.
//
// uploadDate / duration are copied from the video's own YouTube page (never
// guessed): VideoObject requires an upload date, and a wrong one is worse than
// none. Get them from the watch page's itemprop="uploadDate" / "duration".
import { canonical, SITE } from "./seo"

export interface VideoTutorial {
  /** YouTube video id (the `v=` value). */
  id: string
  title: string
  /** Plain-text summary shown on the page and in the schema. Keep it true to the video. */
  description: string
  /** ISO 8601, as published on YouTube. */
  uploadDate: string
  /** ISO 8601 duration, e.g. PT45S. */
  duration: string
  durationSeconds: number
}

export const VIDEO_TUTORIALS: readonly VideoTutorial[] = [
  {
    id: "Z5Bq7XGhf5M",
    title: "Facility Manager Dashboard Login video",
    description:
      "How to access the Facility Manager Dashboard, go through the login process and get started with the Firmity facility management system.",
    uploadDate: "2026-10-29T23:07:33-07:00",
    duration: "PT45S",
    durationSeconds: 45,
  },
]

export const videoThumbnail = (id: string): string => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
export const videoWatchUrl = (id: string): string => `https://www.youtube.com/watch?v=${id}`
export const videoEmbedUrl = (id: string): string => `https://www.youtube.com/embed/${id}`

/** Most recent upload date on the page — used as the page's lastModified. */
export function latestVideoDate(videos: readonly VideoTutorial[] = VIDEO_TUTORIALS): Date | undefined {
  const times = videos.map((v) => Date.parse(v.uploadDate)).filter((t) => !Number.isNaN(t))
  return times.length ? new Date(Math.max(...times)) : undefined
}

/** schema.org graph: one VideoObject per tutorial, tied to the site's Organization by @id. */
export function videoTutorialsJsonLd(videos: readonly VideoTutorial[] = VIDEO_TUTORIALS) {
  const pageUrl = canonical("/resources/video-tutorials")
  return {
    "@context": "https://schema.org",
    "@graph": videos.map((v) => ({
      "@type": "VideoObject",
      "@id": `${pageUrl}#video-${v.id}`,
      name: v.title,
      description: v.description,
      thumbnailUrl: [videoThumbnail(v.id)],
      uploadDate: v.uploadDate,
      duration: v.duration,
      contentUrl: videoWatchUrl(v.id),
      embedUrl: videoEmbedUrl(v.id),
      inLanguage: "en",
      isFamilyFriendly: true,
      publisher: { "@id": `${SITE.url}/#organization` },
      mainEntityOfPage: pageUrl,
    })),
  }
}
