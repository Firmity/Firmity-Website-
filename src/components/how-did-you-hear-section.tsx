// ─── Homepage attribution section — sits directly before "Insights" ───────────
// (src/app/page.tsx: between the "Companies Using Firmity" clients section and
// <HomeBlogSection />). Anonymous by design (no name/email) — a low-friction
// one-question pulse-check, not a lead form. Reuses the same styling rhythm as
// its neighbors (translucent panel over the site's fixed beige page-wash
// gradient) and the shared dropdown logic in how-did-you-hear-form.tsx.
//
// Layout: left column (kicker/heading/subtext/form, left-aligned) + right
// column (public/images/illustration.png, mirrored horizontally, ~70% opacity,
// desktop-only — matches the left-text/right-visual rhythm used by the
// Problems section above it). No top border — Insights (the section right
// after this one) already carries one, so the two don't double up.

import { Reveal } from "@/src/components/reveal"
import { HowDidYouHearForm } from "@/src/components/how-did-you-hear-form"

export function HowDidYouHearSection() {
  return (
    <section className="bg-transparent sm:bg-white/60 py-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left — copy + form, left-aligned */}
        <Reveal direction="right">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-px bg-[#2b6cb0]" />
            <span className="text-[#2b6cb0] text-[10px] font-semibold tracking-[0.2em] uppercase">Quick Question</span>
          </div>
          <h2 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-[1.15] text-[#1a202c] tracking-tight mb-2">
            Help us get to know you better
          </h2>
          <p className="text-[13.5px] font-light leading-[1.8] text-[#4a5568] mb-8 max-w-[400px]">
            Could you please share with us how you got to know Firmity?
          </p>

          <div className="max-w-md">
            <HowDidYouHearForm source="homepage" />
          </div>
        </Reveal>

        {/* Right — illustration. Hidden below lg (per spec: hidden on phone).
            Flipped horizontally (scaleX, NOT rotated) to face into the text. */}
        <div className="hidden lg:flex items-center justify-center" aria-hidden="true">
          <Reveal direction="left" delay={120}>
            <img
              src="/images/illustration.png"
              alt=""
              className="w-full max-w-[480px] h-auto opacity-70"
              style={{ transform: "scaleX(-1)" }}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
