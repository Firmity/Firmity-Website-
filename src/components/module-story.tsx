// Editorial layout for the eight module pages. Server component: no client JS
// beyond the shared Navigation/Footer.
//
// Deliberately plain (see src/lib/module-stories/types.ts): one reading column,
// real headings, a numbered list only where the product has a real sequence, a
// real table only for tabular data, FAQ as visible text (and FAQPage JSON-LD),
// and a short "works with" paragraph of inline links. No icon cards, no stat
// tiles, no decorative imagery.
import Link from "next/link"
import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { JsonLd } from "@/src/components/json-ld"
import { faqJsonLd } from "@/src/lib/seo"
import { sectionId, type ModuleStoryContent } from "@/src/lib/module-stories/types"

const body = "text-[17px] leading-[1.75] text-[#1a202c]"

export function ModuleStory({ story }: { story: ModuleStoryContent }) {
  const toc = [...story.sections.map((s) => s.heading), "Questions people ask"]

  return (
    <>
      <Navigation />
      <main className="bg-white">
        {/* A plain wrapper, not <header>: the site banner in Navigation is the page's
            one <header> landmark. */}
        <div className="mx-auto max-w-7xl px-6 pb-10 pt-10 sm:px-10 lg:px-16 lg:pb-14 lg:pt-16">
          <h1 className="max-w-5xl font-serif text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.08] tracking-[-0.02em] text-[#114dac]">
            {story.h1}
          </h1>
          <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-[#1a202c]">
            {story.lede.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center rounded-[4px] bg-[#114dac] px-7 text-base font-semibold text-white transition-colors hover:bg-[#0e3e8a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#114dac] focus-visible:ring-offset-2 active:translate-y-px"
            >
              Book a demo
            </Link>
            <Link href="/features" className="text-base font-medium text-[#114dac] hover:underline">
              See every module
            </Link>
          </div>
        </div>

        {/* Single column below lg must be minmax(0,1fr), not the implicit auto track:
            an auto track grows to the table's min-width and pushes the whole page
            wider than a phone screen. */}
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-10 px-6 pb-16 sm:px-10 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-16 lg:px-16 lg:pb-24">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-3 text-sm font-semibold text-[#1a202c]">On this page</p>
              <ul className="space-y-2.5">
                {toc.map((h) => (
                  <li key={h}>
                    <a
                      href={`#${h === "Questions people ask" ? "questions" : sectionId(h)}`}
                      className="text-[15px] leading-snug text-[#4a5568] hover:text-[#114dac]"
                    >
                      {h}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <article className="min-w-0 max-w-3xl">
            {story.sections.map((s) => (
              <section key={s.heading} id={sectionId(s.heading)} className="scroll-mt-24 [&:not(:first-child)]:mt-14">
                <h2 className="mb-4 font-serif text-[1.75rem] font-light leading-tight text-[#114dac] sm:text-[2rem]">
                  {s.heading}
                </h2>
                <div className={`space-y-4 ${body}`}>
                  {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
                </div>

                {s.steps && (
                  <ol className={`mt-5 list-decimal space-y-3 pl-6 marker:font-semibold marker:text-[#114dac] ${body}`}>
                    {s.steps.map((step) => (
                      <li key={step} className="pl-1">
                        {step}
                      </li>
                    ))}
                  </ol>
                )}

                {s.table && (
                  <div className="mt-6 overflow-x-auto">
                    {s.table.intro && <p className={`mb-3 ${body}`}>{s.table.intro}</p>}
                    <table className="w-full min-w-[420px] text-left text-base">
                      <thead>
                        <tr className="bg-[#eef3f9] text-[#114dac]">
                          {s.table.head.map((h) => (
                            <th key={h} scope="col" className="px-4 py-3 font-semibold">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="text-[#1a202c]">
                        {s.table.rows.map((row) => (
                          <tr key={row.join("|")} className="even:bg-[#f7f7f7]">
                            {row.map((cell, i) => (
                              <td key={`${cell}-${i}`} className={`px-4 py-3 align-top ${i === 0 ? "font-medium" : ""}`}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {s.after && <div className={`mt-5 space-y-4 ${body}`}>{s.after.map((p) => <p key={p}>{p}</p>)}</div>}
              </section>
            ))}

            <section id="questions" className="mt-14 scroll-mt-24">
              <h2 className="mb-6 font-serif text-[1.75rem] font-light leading-tight text-[#114dac] sm:text-[2rem]">
                Questions people ask
              </h2>
              <div className="space-y-7">
                {story.faqs.map((f) => (
                  <div key={f.q}>
                    <h3 className="mb-1.5 text-lg font-semibold text-[#1a202c]">{f.q}</h3>
                    <p className={body}>{f.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-14">
              <h2 className="mb-4 font-serif text-[1.75rem] font-light leading-tight text-[#114dac] sm:text-[2rem]">
                Works alongside
              </h2>
              <p className={body}>
                {story.related.map((r, i) => (
                  <span key={r.href}>
                    <Link href={r.href} className="font-medium text-[#114dac] hover:underline">
                      {r.label}
                    </Link>{" "}
                    {r.why}
                    {i < story.related.length - 1 ? " " : ""}
                  </span>
                ))}
              </p>
              <p className={`mt-8 ${body}`}>
                Want to see this on your own sites?{" "}
                <Link href="/contact" className="font-semibold text-[#114dac] hover:underline">
                  Book a demo
                </Link>{" "}
                and we&apos;ll walk through it with your setup in mind.
              </p>
            </section>
          </article>
        </div>
      </main>
      <JsonLd data={faqJsonLd(story.faqs)} />
      <Footer />
    </>
  )
}
