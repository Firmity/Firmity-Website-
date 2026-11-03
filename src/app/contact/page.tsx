// Contact page — a server component; only the form (components/contact/
// contact-form.tsx) ships as client JS. Metadata + JSON-LD live in layout.tsx.
//
// Layout: title + one-line promise, then a #f7f7f7 band holding the form card and
// an aside. DOM order is form first, so on a phone the form is right under the
// title instead of below a long info panel. From lg up they sit side by side.
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

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="bg-white">
        <section className="mx-auto max-w-7xl px-6 pb-8 pt-10 sm:px-10 lg:px-16 lg:pb-10 lg:pt-14">
          <h1 className="mb-4 font-serif text-[clamp(1.9rem,4vw,2.8rem)] font-light leading-tight tracking-tight text-[#114dac]">
            Book a demo or talk to our team
          </h1>
          <p className="max-w-2xl text-[15px] font-light leading-relaxed text-[#4a5568] sm:text-base">
            Tell us about your facility and we&apos;ll set up a personalised demo of Firmity, the cloud-based CMMS,
            CAFM and ERP platform for facility management in India. We reply within 24 hours.
          </p>
        </section>

        <section className="bg-[#f7f7f7] py-8 sm:py-10 lg:py-14">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:px-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14 lg:px-16">
            <ContactForm />

            <aside className="flex flex-col gap-10 lg:pt-2">
              <div>
                <h2 className="mb-5 font-serif text-[1.35rem] font-light text-[#114dac]">What happens next</h2>
                <ol className="relative">
                  <span aria-hidden="true" className="absolute bottom-3 left-[13px] top-3 w-px bg-[#cbd5e0]" />
                  {NEXT_STEPS.map((step, i) => (
                    <li key={step} className="relative flex items-center gap-4 py-2.5">
                      <span
                        aria-hidden="true"
                        className="relative z-10 flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-full border border-[#cbd5e0] bg-white text-[12px] font-semibold text-[#114dac]"
                      >
                        {i + 1}
                      </span>
                      <span className="text-[15px] font-light text-[#2d3748]">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h2 className="mb-4 font-serif text-[1.35rem] font-light text-[#114dac]">Reach us directly</h2>
                <dl className="space-y-4 text-[15px]">
                  <div>
                    <dt className="text-[13px] font-medium text-[#718096]">Email</dt>
                    <dd>
                      <a href="mailto:sales@firmity.in" className="font-medium text-[#2b6cb0] hover:underline">
                        sales@firmity.in
                      </a>
                      <span className="block text-[13px] font-light text-[#718096]">We reply within 24 hours</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[13px] font-medium text-[#718096]">Phone</dt>
                    <dd className="font-light text-[#2d3748]">
                      Available on request
                      <span className="block text-[13px] text-[#718096]">Mon–Sat, 9am–6pm IST</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[13px] font-medium text-[#718096]">Office</dt>
                    <dd className="font-light text-[#2d3748]">
                      Noida, Sector 63
                      <span className="block text-[13px] text-[#718096]">UFIRM Technologies (P) Ltd, India</span>
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
