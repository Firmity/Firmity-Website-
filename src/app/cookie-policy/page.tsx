// ─── Cookie Policy Page ───────────────────────────────────────────────────────
// Companion to the Privacy Policy (src/app/privacy/page.tsx) and must stay
// consistent with it. Rules for editing this page:
//   • Only mention services, providers and practices that the Privacy Policy
//     mentions. Cookie names/vendors are NOT listed here; the Policy promises a
//     current cookie list on request (clause 9) instead.
//   • Clause numbers cited ("clause 3 of the Privacy Policy") must match the
//     Privacy Policy's numbering.
//   • Keep CONSENT_POLICY_VERSION in src/lib/cookie-consent.ts in step when a
//     change needs fresh consent.
// Last Updated: 10-06-2026
// Design language: same as /privacy and /terms.

import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Reveal } from "@/src/components/reveal"
import { CookieSettingsLink } from "@/src/components/cookie-consent"
import Link from "next/link"
import { Cookie, Mail } from "lucide-react"

interface CookieRow {
  category: string
  purpose: string
  setBy: string
  duration: string
  consent: string
}

const COOKIE_ROWS: CookieRow[] = [
  {
    category: "Essential",
    purpose: "Keep the website working and remember your choices, such as your cookie choice, display settings and whether a pop-up has been shown.",
    setBy: "Firmity (first party)",
    duration: "Up to 12 months, until you clear it, or until you close the browser tab",
    consent: "Not needed",
  },
  {
    category: "Analytics",
    purpose: "Understand how visitors reach and use the website, such as pages viewed, device type and traffic source, so that we can improve it.",
    setBy: "Firmity and service providers acting for us",
    duration: "As fixed by each cookie; stated in the cookie list (clause 9)",
    consent: "Your consent",
  },
  {
    category: "Marketing",
    purpose: "Measure which campaigns and channels bring visitors to Firmity and how well our communications perform.",
    setBy: "Firmity and service providers acting for us",
    duration: "As fixed by each cookie; stated in the cookie list (clause 9)",
    consent: "Your consent",
  },
]

export default function CookiePolicyPage() {
  return (
    <>
      <Navigation />
      <main className="bg-white">
        {/* ── HERO ── */}
        <section className="bg-[#114dac] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 60% 40%, #2b6cb0 0%, transparent 55%), radial-gradient(circle at 20% 80%, #1a2744 0%, transparent 50%)" }}
            aria-hidden="true"
          />
          <div className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-16">
            <Reveal>
              <div className="flex items-center gap-3 mb-3">
                <Cookie size={14} className="text-[#63b3ed]" strokeWidth={1.5} />
                <span className="text-[#63b3ed] text-[10px] font-semibold tracking-[0.2em] uppercase">Legal</span>
              </div>
              <h1 className="font-serif text-[clamp(1.8rem,4vw,2.6rem)] font-light text-[#f0f4f8] leading-tight tracking-tight">
                Cookie Policy
              </h1>
              <p className="text-[13px] font-light text-white/[0.45] mt-2">
                Last Updated: 10 June 2026
              </p>
              <p className="text-[13.5px] font-light text-white/[0.5] leading-[1.85] max-w-2xl mt-4">
                This Cookie Policy explains how{" "}
                <strong className="font-semibold text-white/70">Ufirm Technologies Private Limited</strong>,
                which operates the Firmity platform (&ldquo;Firmity&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;),
                uses cookies and similar technologies on the Firmity website. It forms part of, and must be read
                together with, our{" "}
                <Link href="/privacy" className="text-white/80 underline underline-offset-2 hover:text-white">Privacy Policy</Link>.
                It is published under the Digital Personal Data Protection Act, 2023 (the &ldquo;DPDP Act&rdquo;), the
                DPDP Rules, 2025, Section 43A of the Information Technology Act, 2000, and Rule 4 of the SPDI Rules, 2011.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── CONTENT ── */}
        <article className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-14 lg:py-20">
          <div className="space-y-12">

            {/* 1. Our role */}
            <Reveal>
              <PolicySection number="1" heading="Our role">
                <Clause n="1.1">
                  For visitors to this website and prospects, we are the Data Fiduciary: we decide why and how cookies are
                  used on this website. This Policy covers that use.
                </Clause>
                <Clause n="1.2">
                  Where a customer uses Firmity for its own employees, visitors or tenants, the customer is the Data
                  Fiduciary and we act as its Data Processor, as set out in clause 1 of the Privacy Policy. This Policy does
                  not change that.
                </Clause>
              </PolicySection>
            </Reveal>

            {/* 2. What cookies are */}
            <Reveal>
              <PolicySection number="2" heading="What cookies are">
                <Clause n="2.1">
                  Cookies are small text files that a website places on your device when you visit it. They let the website
                  recognise your device, remember your choices and measure how the website is used.
                </Clause>
                <Clause n="2.2">
                  Similar technologies, such as browser local storage and session storage, work in the same way. In this
                  Policy, &ldquo;cookies&rdquo; includes them.
                </Clause>
                <Clause n="2.3">
                  First-party cookies are set by Firmity. Third-party cookies are set by service providers who process data
                  for us under written contracts (see clause 3 of the Privacy Policy).
                </Clause>
              </PolicySection>
            </Reveal>

            {/* 3. Categories of cookies we use */}
            <Reveal>
              <PolicySection number="3" heading="Categories of cookies we use">
                <div className="overflow-x-auto rounded-[20px] border border-[#dbe5f0] not-prose">
                  <table className="w-full min-w-[720px] text-left text-[12.5px] leading-[1.6] border-collapse">
                    <thead>
                      <tr className="bg-[#eef3f9] text-[#1a202c]">
                        <th scope="col" className="px-4 py-3 font-semibold">Category</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Purpose</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Set by</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Duration</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Ground</th>
                      </tr>
                    </thead>
                    <tbody>
                      {COOKIE_ROWS.map((row) => (
                        <tr key={row.category} className="border-t border-[#dbe5f0] align-top text-[#4a5568]">
                          <th scope="row" className="px-4 py-3 font-semibold text-[#1a202c]">{row.category}</th>
                          <td className="px-4 py-3">{row.purpose}</td>
                          <td className="px-4 py-3">{row.setBy}</td>
                          <td className="px-4 py-3">{row.duration}</td>
                          <td className="px-4 py-3">{row.consent}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Clause n="3.1">
                  <strong className="font-semibold text-[#1a202c]">Essential items in use.</strong> A first-party cookie
                  that remembers your cookie choice (up to 12 months); a browser-storage entry that remembers display
                  settings you choose (until you clear it); and session-storage entries that stop pop-ups from reappearing
                  during your visit (until you close the tab).
                </Clause>
                <Clause n="3.2">
                  We do not sell personal data, and we do not use cookies to make solely automated decisions with legal
                  effect on you.
                </Clause>
                <Clause n="3.3">
                  We also count visits to the website in aggregate, using a method that sets no cookies, stores nothing on
                  your device and does not identify you. This counting does not depend on your choice.
                </Clause>
              </PolicySection>
            </Reveal>

            {/* 4. Consent */}
            <Reveal>
              <PolicySection number="4" heading="Consent">
                <Clause n="4.1">
                  Essential cookies keep the website working and do not need consent. Analytics and marketing cookies are
                  used only if you consent through the cookie banner.
                </Clause>
                <Clause n="4.2">
                  Nothing in the analytics or marketing categories that sets a cookie or stores information on your device
                  is used before you accept.
                </Clause>
                <Clause n="4.3">
                  Under Section 6 of the DPDP Act, consent must be free, specific, informed, unconditional and unambiguous,
                  and given by a clear affirmative action. The banner therefore offers two options of equal prominence,
                  Accept and Reject, with nothing pre-selected. Accept enables analytics and marketing cookies together.
                  Reject keeps essential cookies only.
                </Clause>
                <Clause n="4.4">
                  If you reject, the website works as normal, and choosing Reject carries no penalty.
                </Clause>
                <Clause n="4.5">
                  We ask again when this Policy changes in a way that needs fresh consent, and in any case when your choice
                  is 12 months old.
                </Clause>
              </PolicySection>
            </Reveal>

            {/* 5. Record of your choice */}
            <Reveal>
              <PolicySection number="5" heading="Record of your choice">
                <Clause n="5.1">
                  When you choose, we keep a record as proof of consent: a random identifier (also held in your consent
                  cookie), your choice, the date and time, the version of this Policy, the page on which you chose, your
                  device type and browser family, your country where available, and a one-way hash of your IP address (not
                  the IP address itself). If you accept, the record also includes the website or campaign tag that brought
                  you here.
                </Clause>
                <Clause n="5.2">
                  We use this record only to show that consent was given or withdrawn, to secure the website, and to produce
                  aggregate reports on how visitors reach and use the website. We do not combine it with your enquiry
                  details to identify you.
                </Clause>
                <Clause n="5.3">
                  We keep it only for as long as the purpose needs, or the law requires, as set out in clause 7 of the
                  Privacy Policy. We host it in India by default (clause 4 of the Privacy Policy).
                </Clause>
              </PolicySection>
            </Reveal>

            {/* 6. Changing or withdrawing consent */}
            <Reveal>
              <PolicySection number="6" heading="Changing or withdrawing consent">
                <Clause n="6.1">
                  You may change or withdraw your choice at any time using <CookieSettingsLink />, here or on the Privacy
                  Policy page. Withdrawing is as easy as giving consent.
                </Clause>
                <Clause n="6.2">
                  When you withdraw, we stop loading analytics and marketing scripts and remove the analytics and marketing
                  cookies that we can reach on our own domain. Cookies set on other domains may stay until you delete them in
                  your browser. Withdrawal does not affect processing done before you withdrew.
                </Clause>
                <Clause n="6.3">
                  You can also block or delete cookies in your browser settings. Blocking essential cookies may stop parts of
                  the website from working, and if your browser blocks our consent cookie we will ask for your choice on
                  every visit.
                </Clause>
              </PolicySection>
            </Reveal>

            {/* 7. Who sets cookies */}
            <Reveal>
              <PolicySection number="7" heading="Who sets cookies">
                <Clause n="7.1">
                  If you accept, analytics and marketing cookies may be set by service providers who process data for us
                  under written contracts, as described in clause 3 of the Privacy Policy. We keep a current list of the
                  processors we use and will give it to you on request.
                </Clause>
              </PolicySection>
            </Reveal>

            {/* 8. Where data is stored */}
            <Reveal>
              <PolicySection number="8" heading="Where data is stored">
                <Clause n="8.1">
                  We host data in India by default. We transfer personal data outside India only as clause 4 of the Privacy
                  Policy allows.
                </Clause>
              </PolicySection>
            </Reveal>

            {/* 9. Cookie list */}
            <Reveal>
              <PolicySection number="9" heading="Cookie list">
                <Clause n="9.1">
                  We maintain a current list of the cookies and similar technologies in use, with each one&apos;s name,
                  provider, purpose and duration. Write to the Grievance Officer in clause 12 and we will give it to you.
                </Clause>
              </PolicySection>
            </Reveal>

            {/* 10. Your rights and complaints */}
            <Reveal>
              <PolicySection number="10" heading="Your rights and complaints">
                <Clause n="10.1">
                  Your rights under the DPDP Act, how to exercise them, and when we may decline a request are set out in
                  clause 9 of the Privacy Policy. They apply to the personal data described in this Policy.
                </Clause>
                <Clause n="10.2">
                  Send a grievance to the Grievance Officer in clause 12. If it is not resolved within the period stated in
                  the Privacy Policy, or you are not satisfied, you may complain to the Data Protection Board of India, after
                  first using this process (Section 13(3) of the DPDP Act).
                </Clause>
              </PolicySection>
            </Reveal>

            {/* 11. Updates to this Policy */}
            <Reveal>
              <PolicySection number="11" heading="Updates to this Policy">
                <Clause n="11.1">
                  We may update this Policy to reflect changes in our practices or the law. We will post the new version
                  with its date, and where a change needs fresh consent we will ask for it.
                </Clause>
              </PolicySection>
            </Reveal>

            {/* 12. Grievance Officer and Data Protection Officer */}
            <Reveal>
              <PolicySection number="12" heading="Grievance Officer and Data Protection Officer">
                <div className="bg-[#eef3f9] border border-[#dbe5f0] rounded-[20px] p-6 mt-2 not-prose">
                  <div className="text-[13px]">
                    <p className="font-semibold text-[#1a202c] mb-1">Sanjeev Kumar</p>
                    <p className="text-[#4a5568]">Grievance Officer and DPO</p>
                    <p className="text-[#4a5568]">Ufirm Technologies Private Limited</p>
                    <p className="text-[#4a5568]">Sector-63 H-64 Noida</p>
                    <p className="text-[#4a5568]">Email: <a href="mailto:dpo@ufirm.in" className="text-[#2b6cb0] hover:underline">dpo@ufirm.in</a></p>
                    <p className="text-[#4a5568]">M: +91 98689 99648</p>
                    <p className="text-[#4a5568]">Hours: Monday to Friday, 10:00 to 18:00 IST</p>
                  </div>
                </div>
              </PolicySection>
            </Reveal>

            {/* 13. Governing law */}
            <Reveal>
              <PolicySection number="13" heading="Governing law">
                <Clause n="13.1">
                  This Policy is governed by the laws of India. Subject to your rights before the Data Protection Board of
                  India and any other forum the law gives you, the courts at Uttar Pradesh have jurisdiction over disputes
                  about it.
                </Clause>
              </PolicySection>
            </Reveal>

          </div>
        </article>

        {/* ── RELATED LINKS ── */}
        <section className="bg-[#114dac]">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#63b3ed] uppercase mb-1 sm:mb-0 sm:self-center">Related policies</p>
              <Link href="/privacy" className="text-white/70 hover:text-white text-[13px] font-light transition-colors hover:underline">
                Privacy Policy →
              </Link>
              <Link href="/terms" className="text-white/70 hover:text-white text-[13px] font-light transition-colors hover:underline">
                Terms &amp; Conditions →
              </Link>
            </div>
            <a
              href="mailto:dpo@ufirm.in"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-[12.5px] font-light border border-white/[0.18] hover:border-white/[0.45] px-5 py-2.5 rounded-xl transition-all"
            >
              <Mail size={13} /> Contact DPO
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PolicySection({ number, heading, children }: { number: string; heading: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-start gap-4 mb-4">
        <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#eef3f9] border border-[#dbe5f0] flex items-center justify-center text-[11px] font-semibold text-[#2b6cb0]">
          {number}
        </span>
        <h2 className="font-serif text-[clamp(1.1rem,2vw,1.3rem)] font-light text-[#1a202c] tracking-tight pt-1">
          {heading}
        </h2>
      </div>
      <div className="ml-12 space-y-3 text-[13.5px] font-light text-[#4a5568] leading-[1.85] [&_p]:text-[13.5px]">
        {children}
      </div>
    </section>
  )
}

// Numbered sub-clause (e.g. 1.1) with a hanging number.
function Clause({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="flex-shrink-0 w-9 text-[12px] font-semibold text-[#2b6cb0] pt-px">{n}</span>
      <p className="flex-1">{children}</p>
    </div>
  )
}
