// Contact page — a server component; only the form (components/contact/
// contact-form.tsx) ships as client JS. Metadata + JSON-LD live in layout.tsx.
//
// Idea: the demo the visitor is asking for is Firmity's own dashboard, so the
// first screen shows it (a real product picture, not a stock photo) beside a
// large headline. Below, the form sits on a #f7f7f7 band next to what happens
// after they send it.
//
// Phone order: title → form → product picture → steps → channels. The picture
// is rendered twice (hidden/shown by breakpoint) so the form is never pushed
// below the fold by an image; both copies are the same cached file.
//
// House rules applied (design-taste-frontend): no hairlines or outlined boxes
// (tone steps instead), five type sizes, body copy in full ink at 16px,
// entrances are CSS-only transform/opacity and disabled for reduced motion.
// The H1 is deliberately NOT animated — it is the LCP candidate.
import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { ContactForm } from "@/src/components/contact/contact-form"

// A real sequence, so numbering is meaningful here.
const NEXT_STEPS = [
  "We confirm within 24 hours",
  "30-minute personalised demo",
  "Q&A with facility experts",
  "Guided setup and data onboarding",
  "Dedicated onboarding support",
]

const RISE = "motion-safe:animate-[rise_.55s_cubic-bezier(.22,1,.36,1)_both]"
const delay = (ms: number) => ({ animationDelay: `${ms}ms` })

const PICTURE_ALT = "Firmity dashboard on a laptop, with the mobile app login beside it"

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="bg-white">
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-10 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-16">
          <div>
            <h1 className="font-serif text-[clamp(2.25rem,4.6vw,4.25rem)] font-light leading-[1.05] tracking-[-0.02em] text-[#114dac]">
              Book a demo or talk to our team
            </h1>
            <p className={`mt-6 max-w-xl text-lg leading-relaxed text-[#1a202c] ${RISE}`} style={delay(80)}>
              Tell us about your facility and we&apos;ll set up a personalised demo of Firmity, the cloud-based CMMS,
              CAFM and ERP platform for facility management in India. We reply within 24 hours.
            </p>
            {/* Phones go straight to the form, which sits right below; the button is for
                large screens where the form starts further down. */}
            <a
              href="#request"
              className={`mt-8 hidden min-h-12 items-center rounded-[4px] bg-[#114dac] px-7 text-base font-semibold text-white transition-colors hover:bg-[#0e3e8a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b6cb0] focus-visible:ring-offset-2 active:translate-y-px lg:inline-flex ${RISE}`}
              style={delay(160)}
            >
              Request a demo
            </a>
          </div>

          {/* Desktop copy: eager + high priority, it is the biggest thing on screen. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/heroImage.webp"
            alt={PICTURE_ALT}
            width={1536}
            height={1048}
            fetchPriority="high"
            decoding="async"
            className={`hidden h-auto w-full lg:block ${RISE}`}
            style={delay(120)}
          />
        </section>

        <section className="bg-[#f7f7f7] py-10 sm:py-12 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 lg:px-16">
            <ContactForm />

            <aside className="flex flex-col gap-10 lg:pt-2">
              {/* Phone copy of the product picture (same cached file as above). */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/heroImage.webp"
                alt={PICTURE_ALT}
                width={1536}
                height={1048}
                loading="lazy"
                decoding="async"
                className="h-auto w-full lg:hidden"
              />

              <div>
                <h2 className="mb-5 font-serif text-[1.75rem] font-light leading-tight text-[#114dac]">What happens next</h2>
                <ol className="space-y-3">
                  {NEXT_STEPS.map((step, i) => (
                    <li key={step} className={`flex items-center gap-4 ${RISE}`} style={delay(200 + i * 70)}>
                      <span
                        aria-hidden="true"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#114dac] text-sm font-semibold text-white"
                      >
                        {i + 1}
                      </span>
                      <span className="text-base text-[#1a202c]">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className={RISE} style={delay(560)}>
                <h2 className="mb-4 font-serif text-[1.75rem] font-light leading-tight text-[#114dac]">Reach us directly</h2>
                <dl className="space-y-4 text-base text-[#1a202c]">
                  <div>
                    <dt className="text-sm text-[#4a5568]">Email</dt>
                    <dd>
                      <a href="mailto:sales@firmity.in" className="font-medium text-[#114dac] hover:underline">
                        sales@firmity.in
                      </a>
                      <span className="block text-sm text-[#4a5568]">We reply within 24 hours</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-[#4a5568]">Phone</dt>
                    <dd>
                      Available on request
                      <span className="block text-sm text-[#4a5568]">Mon–Sat, 9am–6pm IST</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-[#4a5568]">Office</dt>
                    <dd>
                      Noida, Sector 63
                      <span className="block text-sm text-[#4a5568]">UFIRM Technologies (P) Ltd, India</span>
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
