import { Footer } from "@/src/components/footer"
import { Navigation } from "@/src/components/navigation"
import { VideoEmbed } from "@/src/components/video-embed"
import { VIDEO_TUTORIALS, videoWatchUrl } from "@/src/lib/video-tutorials"

// Videos come from src/lib/video-tutorials.ts — add an entry there and it appears
// here, in the VideoObject JSON-LD (layout.tsx) and in the sitemap automatically.
export default function VideoTutorialsPage() {
  return (
    <>
      <Navigation />
      <main className="bg-white">
        <section className="bg-[#114dac]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 lg:py-16">
            <p className="text-[#63b3ed] text-[10px] font-semibold tracking-[0.2em] uppercase mb-3">
              Resources
            </p>
            <h1 className="font-serif text-[clamp(1.8rem,4vw,2.6rem)] font-light text-[#f0f4f8] leading-tight tracking-tight">
              Video Tutorials
            </h1>
            <p className="mt-4 max-w-2xl text-base font-light leading-relaxed text-[#f0f4f8]/85">
              Short walkthroughs of the Firmity CMMS, CAFM and ERP platform, one task at a time.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {VIDEO_TUTORIALS.map((video) => (
              <article key={video.id} className="lg:col-span-2">
                <div className="aspect-video overflow-hidden rounded-[4px] bg-[#f7f7f7]">
                  <VideoEmbed id={video.id} title={video.title} />
                </div>
                <h2 className="mt-3 text-base font-semibold text-[#1a202c]">{video.title}</h2>
                <p className="mt-1 text-[15px] font-light leading-relaxed text-[#1a202c]">{video.description}</p>
                <a
                  href={videoWatchUrl(video.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-medium text-[#114dac] hover:underline"
                >
                  Watch on YouTube
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
