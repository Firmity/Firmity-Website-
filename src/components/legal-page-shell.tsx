// Shared frame for the small DPDP utility pages (/unsubscribe, /data-rights):
// same navy hero and white body as /privacy, with a narrow form column.
import type { ReactNode } from "react"
import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"

interface LegalPageShellProps {
  kicker: string
  title: string
  intro: ReactNode
  children: ReactNode
  /** Wider column for reading pages (notices); forms keep the narrow default. */
  wide?: boolean
}

export function LegalPageShell({ kicker, title, intro, children, wide = false }: LegalPageShellProps) {
  return (
    <>
      <Navigation />
      <main className="bg-white">
        <section className="bg-[#114dac]">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-14">
            <span className="text-[#63b3ed] text-[10px] font-semibold tracking-[0.2em] uppercase">{kicker}</span>
            <h1 className="font-serif text-[clamp(1.8rem,4vw,2.6rem)] font-light text-[#f0f4f8] leading-tight tracking-tight mt-3">
              {title}
            </h1>
            <p className="text-[13.5px] font-light text-white/75 leading-[1.85] max-w-2xl mt-4">{intro}</p>
          </div>
        </section>
        <section className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-12 lg:py-16">
          <div className={wide ? "max-w-3xl" : "max-w-[560px]"}>{children}</div>
        </section>
      </main>
      <Footer />
    </>
  )
}
