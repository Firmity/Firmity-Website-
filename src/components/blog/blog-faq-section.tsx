"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { JsonLd } from "@/src/components/json-ld"
import { faqJsonLd } from "@/src/lib/seo"
import type { BlogFaq } from "@/src/lib/blog"

// FAQ block for individual blog posts (2026-09-23, per request: "add faq
// questions... same html trick for faqs on blogs that the faqs on the
// homepage are using"). Copies home-client.tsx's FaqSection accordion
// mechanics verbatim: toggling with the native `hidden` boolean attribute,
// NOT conditional JSX rendering. Every answer is present in the
// server-rendered HTML for crawlers at all times — collapsing only hides
// it visually via `hidden` — unlike module-page-template.tsx's FAQ
// accordion, which unmounts the answer (`{isOpen && <div>...}`) and is
// genuinely invisible to a crawler that doesn't execute the click.
// blog/[slug]/page.tsx stays a Server Component (it exports `metadata`),
// so the open/close state needed its own small "use client" component
// rather than living inline in that file.
//
// blog/[slug]/page.tsx passes `post.faqs` straight through and this
// renders nothing (not even the section wrapper) when it's empty, per
// request: "if no faqs have been added then the blog page will not show
// any faqs." Also emits the FAQPage JSON-LD via faqJsonLd (lib/seo.ts) —
// see that function's comment for what it does and doesn't buy you in
// 2026's search landscape.
//
// `title` (2026-09-23) — editable per-post in the studio (Form.faq_title /
// post.faq_title, blog.ts) so a marketer can write "FAQs: Preventive
// Maintenance" instead of the generic default; blank/omitted falls back
// to the literal "FAQs" below.
export function BlogFaqSection({ faqs, title }: { faqs: BlogFaq[]; title?: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  if (faqs.length === 0) return null

  return (
    <section className="mt-12 pt-8 border-t border-[#eef3f9]">
      <JsonLd data={faqJsonLd(faqs)} />
      <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-light text-[#114dac] leading-tight tracking-tight mb-5">
        {title || "FAQs"}
      </h2>
      <div>
        {faqs.map((item, i) => {
          const isOpen = openIdx === i
          return (
            <div key={i} style={{ borderTop: "1px solid #e2e8f0" }}>
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="cursor-pointer w-full flex items-center gap-4 py-4 text-left group"
                aria-expanded={isOpen}
              >
                <ChevronDown
                  size={17}
                  className="flex-shrink-0 transition-transform duration-200"
                  style={{ color: "#2b6cb0", transform: isOpen ? "rotate(180deg)" : "rotate(-90deg)" }}
                />
                <span className="text-[14px] font-medium text-[#114dac] group-hover:text-[#2b6cb0] transition-colors leading-snug">
                  {item.q}
                </span>
              </button>
              {/* Always in the DOM (hidden, not unmounted) — see file
                  header comment — so the answer text is in the
                  server-rendered HTML for crawlers; visually identical. */}
              <div hidden={!isOpen} className="pb-5 pl-[33px] pr-2">
                <p className="text-[13px] leading-[1.75] text-[#000000]">{item.a}</p>
              </div>
            </div>
          )
        })}
        <div style={{ borderTop: "1px solid #e2e8f0" }} />
      </div>
    </section>
  )
}
