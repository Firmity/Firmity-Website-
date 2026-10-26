"use client"
// TEMPORARY — Diwali reception RSVP card. Delete with the rest of this folder
// (and src/app/api/diwali-rsvp/) after the event.
//
// Mobile-first: guests arrive by scanning a QR code, almost all on a phone.
// Everything is sized to fit one screen without scrolling (a phone, or a
// landscape desktop where the card becomes two columns). 16px inputs (iOS
// Safari zooms the page on anything smaller) and 50px+ tap targets. The only
// motion: one gentle rise-in, soft fireworks drifting in the page background,
// and the Lottie diya row on the thank-you. All of it stops under
// prefers-reduced-motion.

import { useEffect, useRef, useState, type FormEvent } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import styles from "./diwali.module.css"

// Client-only: the player touches canvas/DOM. Same pattern as LoadingScreen.
const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact),
  { ssr: false },
)

const LAMP_SRC = encodeURI("/animations/Diya Loader (Lamp).lottie")
const FIREWORKS_SRC = "/animations/fireworks.lottie"

type Rsvp = "attending" | "not_attending"

const PHONE_RE = /^\+?\d{7,15}$/

const INPUT_CLASS =
  "h-[50px] w-full rounded-[14px] border border-[#e3d5b5] bg-white px-4 text-[16px] text-[#2b1a14] " +
  "placeholder:text-[#a8998a] outline-none transition-[border-color,box-shadow] duration-200 " +
  "focus:border-[#b8892f] focus:shadow-[0_0_0_3px_rgba(184,137,47,0.22)]"

const LABEL_CLASS = "mb-1.5 block text-[13px] font-medium tracking-[0.01em] text-[#5d4d3f]"

// Hidden on short screens (small phones, landscape phones) so the form always fits.
const HIDE_WHEN_SHORT = "[@media(max-height:700px)]:hidden"

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(query.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])
  return reduced
}

function RsvpOption({
  value, label, checked, onSelect,
}: {
  value: Rsvp; label: string; checked: boolean; onSelect: (v: Rsvp) => void
}) {
  return (
    <label
      className={
        "flex h-[50px] cursor-pointer items-center gap-2 rounded-[14px] border px-2.5 text-[14.5px] font-medium sm:gap-2.5 sm:px-4 sm:text-[15px] " +
        "transition-[background-color,border-color,box-shadow] duration-200 " +
        "has-[:focus-visible]:shadow-[0_0_0_3px_rgba(184,137,47,0.35)] " +
        (checked
          ? "border-[#7a1f2b] bg-[#fbeee0] text-[#4a1019]"
          : "border-[#e3d5b5] bg-white text-[#4a3b30] hover:border-[#cdb98a]")
      }
    >
      <input
        type="radio"
        name="rsvp"
        value={value}
        checked={checked}
        onChange={() => onSelect(value)}
        className="peer sr-only"
      />
      {/* Radio mark drawn with CSS only (no SVG/icon). */}
      <span
        aria-hidden="true"
        className="h-[18px] w-[18px] shrink-0 rounded-full border-2 border-[#cdb98a] transition-colors duration-200 peer-checked:border-[#7a1f2b] peer-checked:bg-[radial-gradient(circle,#7a1f2b_0_42%,transparent_46%)]"
      />
      {label}
    </label>
  )
}

// The Lottie is already a row of lit diyas on a 1000×1000 canvas with a lot of
// empty space above and below; "cover" in a short wide box crops to just the row.
function DiyaRow({ animate }: { animate: boolean }) {
  return (
    <div className={`${styles.fade} mx-auto mb-3 h-[96px] w-full max-w-[320px]`} aria-hidden="true">
      <DotLottieReact
        src={LAMP_SRC}
        loop
        autoplay={animate}
        layout={{ fit: "cover", align: [0.5, 0.5] }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}

export function DiwaliCard() {
  const reducedMotion = usePrefersReducedMotion()
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [rsvp, setRsvp] = useState<Rsvp | null>(null)
  const [website, setWebsite] = useState("") // honeypot — real guests never see or fill it
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState<{ firstName: string; rsvp: Rsvp } | null>(null)
  const headingRef = useRef<HTMLHeadingElement | null>(null)

  // Hand focus to the thank-you heading so screen readers announce it.
  useEffect(() => {
    if (done) headingRef.current?.focus({ preventScroll: true })
  }, [done])

  function chooseRsvp(value: Rsvp) {
    setRsvp(value)
    setError("")
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (submitting) return

    const name = fullName.trim()
    const digits = phone.replace(/[\s\-.()]/g, "")
    if (name.length < 2) return setError("Please enter your full name.")
    if (!PHONE_RE.test(digits)) return setError("Please enter a valid phone number, e.g. +91 98765 43210.")
    if (!rsvp) return setError("Please let us know if you can attend.")

    setError("")
    setSubmitting(true)
    try {
      const res = await fetch("/api/diwali-rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: name, phone: phone.trim(), rsvp, website }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.success) {
        setError(data.error || "Something went wrong. Please try again.")
        return
      }
      setDone({ firstName: name.split(/\s+/)[0], rsvp })
    } catch {
      setError("We couldn't reach the server. Please check your connection and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const attending = done?.rsvp === "attending"
  // The page's main heading is the invitation until the guest has replied.
  const Title = done ? "p" : "h1"

  return (
    <main
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 py-4 sm:py-8"
      style={{
        background: "radial-gradient(120% 70% at 50% 0%, #5e1a27 0%, #3a111b 55%, #240a12 100%)",
        paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Soft fireworks behind the card — background only, never over text.
          The animation is portrait: on a phone it fills the screen; on a wide
          desktop, filling it would blow the burst up to giant spikes, so two
          natural-size bursts (one mirrored) sit in the side margins instead. */}
      {!reducedMotion && (
        <div className={`${styles.fade} pointer-events-none absolute inset-0 opacity-40`} aria-hidden="true">
          <div className="absolute inset-0 lg:hidden">
            <DotLottieReact src={FIREWORKS_SRC} loop autoplay layout={{ fit: "cover", align: [0.5, 0.5] }} style={{ width: "100%", height: "100%" }} />
          </div>
          <div className="absolute inset-y-0 left-[-6%] hidden w-[30%] lg:block">
            <DotLottieReact src={FIREWORKS_SRC} loop autoplay layout={{ fit: "contain", align: [0.5, 0.5] }} style={{ width: "100%", height: "100%" }} />
          </div>
          <div className="absolute inset-y-0 right-[-6%] hidden w-[30%] -scale-x-100 lg:block">
            <DotLottieReact src={FIREWORKS_SRC} loop autoplay layout={{ fit: "contain", align: [0.5, 0.5] }} style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
      )}

      <section className="relative z-10 w-full max-w-[420px] rounded-[28px] bg-[#fffbf2] shadow-[0_30px_80px_-24px_rgba(0,0,0,0.6)] lg:max-w-[920px]">
        {/* Gold hairline frame, like the inner border of a printed card. */}
        <div className="pointer-events-none absolute inset-2.5 z-10 rounded-[20px] border border-[#d9c38a]/80" aria-hidden="true" />

        <div className="relative grid lg:grid-cols-2 lg:items-center">
          {/* Invitation — stays put on desktop; hidden on phones once the guest has replied. */}
          <div
            className={`${done ? "max-lg:hidden" : ""} px-6 pb-1 pt-6 text-center sm:px-10 lg:border-r lg:border-[#eadfc4] lg:px-14 lg:py-14`}
          >
            <div
              className={`${styles.rise} relative mx-auto w-[clamp(96px,17dvh,170px)] lg:w-[210px]`}
              style={{ animationDelay: "60ms" }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-[-14%] rounded-full"
                style={{ background: "radial-gradient(circle, rgba(244,173,60,0.22) 0%, rgba(244,173,60,0) 68%)" }}
              />
              <Image
                src="/images/diwali_transparent.png"
                alt="Happy Diwali"
                width={366}
                height={374}
                sizes="(min-width: 1024px) 210px, 170px"
                priority
                className="relative h-auto w-full"
              />
            </div>

            <div className={styles.rise} style={{ animationDelay: "120ms" }}>
              <Title className="mt-1 font-serif text-[26px] font-normal leading-tight text-[#3b0f18] sm:text-[30px] lg:mt-3 lg:text-[34px]">
                Diwali Reception
              </Title>
              <p className={`${HIDE_WHEN_SHORT} mx-auto mt-2 max-w-[320px] text-[15px] leading-relaxed text-[#5d4d3f] lg:mt-4 lg:text-[16px]`}>
                You&apos;re warmly invited to celebrate the festival of lights with us. Please let us know if you can join.
              </p>
            </div>
          </div>

          {/* Reply — the form, then the thank-you in the same spot. */}
          <div className={`px-6 pb-6 ${done ? "pt-9" : "pt-4"} sm:px-10 lg:px-14 lg:py-14`}>
            {done ? (
              <div className={`${styles.fade} text-center`}>
                <DiyaRow animate={!reducedMotion} />
                <h1
                  ref={headingRef}
                  tabIndex={-1}
                  className="font-serif text-[30px] font-normal leading-tight text-[#3b0f18] outline-none"
                >
                  Thank you, {done.firstName}
                </h1>
                <p aria-live="polite" className="mx-auto mt-3 max-w-[320px] text-[16px] leading-relaxed text-[#5d4d3f]">
                  {attending
                    ? "We have your RSVP and look forward to celebrating Diwali with you."
                    : "We'll miss you, and wish you and your family a very happy Diwali."}
                </p>
                <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.32em] text-[#8a6420]">Team Firmity</p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className={`${styles.rise} space-y-3.5 text-left sm:space-y-4`}
                style={{ animationDelay: "180ms" }}
              >
                <div>
                  <label htmlFor="dr-name" className={LABEL_CLASS}>Full name</label>
                  <input
                    id="dr-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    autoCapitalize="words"
                    enterKeyHint="next"
                    maxLength={100}
                    value={fullName}
                    onChange={(e) => { setFullName(e.target.value); setError("") }}
                    placeholder="Your full name"
                    aria-required="true"
                    className={INPUT_CLASS}
                  />
                </div>

                <div>
                  <label htmlFor="dr-phone" className={LABEL_CLASS}>WhatsApp / phone number</label>
                  <input
                    id="dr-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    enterKeyHint="done"
                    maxLength={20}
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setError("") }}
                    placeholder="+91 98765 43210"
                    aria-required="true"
                    className={INPUT_CLASS}
                  />
                </div>

                <fieldset>
                  <legend className={LABEL_CLASS}>Will you be joining us?</legend>
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                    <RsvpOption value="attending" label="Attending" checked={rsvp === "attending"} onSelect={chooseRsvp} />
                    <RsvpOption value="not_attending" label="Not attending" checked={rsvp === "not_attending"} onSelect={chooseRsvp} />
                  </div>
                </fieldset>

                {/* Honeypot: off-screen, skipped by keyboard and screen readers. */}
                <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="dr-website">Website</label>
                  <input id="dr-website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </div>

                {error && (
                  <p role="alert" className="text-[14px] leading-snug text-[#a12626]">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex h-[52px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-[14px] bg-gradient-to-b from-[#8c2535] to-[#6a1927] text-[16px] font-medium tracking-[0.01em] text-[#fff4dc] shadow-[0_8px_20px_-8px_rgba(106,25,39,0.7)] transition-[transform,filter,opacity] duration-150 hover:brightness-110 active:scale-[0.985] disabled:cursor-wait disabled:opacity-75"
                >
                  {submitting && (
                    <span className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-[#fff4dc]/40 border-t-[#fff4dc]" aria-hidden="true" />
                  )}
                  {submitting ? "Sending…" : "Send RSVP"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
