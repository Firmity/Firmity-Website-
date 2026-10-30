import { Footer } from "@/src/components/footer"
import { Navigation } from "@/src/components/navigation"

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
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <article className="lg:col-span-2">
              <div className="aspect-video overflow-hidden rounded-[4px] border border-[#dbe5f0] bg-[#f7f7f7] shadow-[0_8px_32px_rgba(17,29,53,0.09)]">
                <iframe
                  className="h-full w-full border-0"
                  src="https://www.youtube.com/embed/Z5Bq7XGhf5M?rel=0"
                  title="Facility Manager Dashboard Login video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <h2 className="mt-3 text-[13px] font-semibold text-[#1a202c]">
                Facility Manager Dashboard Login video
              </h2>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
