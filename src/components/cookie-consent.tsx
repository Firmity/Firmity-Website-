"use client"

// ─── Cookie consent bar ──────────────────────────────────────────────────────
// Docked flush to the bottom of the viewport, edge to edge, on mobile and
// desktop (never a modal — no overlay, the page behind stays scrollable). It
// reuses the footer's look: white, hairline top border, same content rail,
// same type sizes and 4px button corners. Two choices only, with equal
// visual weight: Accept / Reject. "More details" expands the same bar into the
// three tabs: Consent, Details, About.
//
// Why a bar and not a pop-up: the visitor can keep reading while deciding,
// and a pre-chosen or visually dominant button is not valid consent under the
// DPDP Act, 2023 — both buttons are therefore the same size and weight.
//
// State lives in the first-party cookie handled by @/src/lib/cookie-consent;
// this component only renders and writes through that module.

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

import {
  CONSENT_EVENT,
  OPEN_SETTINGS_EVENT,
  clearNonEssentialCookies,
  logConsent,
  openCookieSettings,
  readConsent,
  saveConsent,
  type ConsentDecision,
  type ConsentRecord,
} from "@/src/lib/cookie-consent"

// Operational / authenticated / QR-only routes: no banner (no marketing
// scripts run there without consent either — see consent-gated-scripts.tsx).
const EXCLUDED_PREFIXES = [
  "/admin",
  "/login",
  "/staff-login",
  "/profile",
  "/settings",
  "/my-surveys",
  "/surveys",
  "/survey",
  "/blog-admin",
  "/r",
  "/diwali-reception",
]

type TabId = "consent" | "details" | "about"
const TABS: ReadonlyArray<{ id: TabId; label: string }> = [
  { id: "consent", label: "Consent" },
  { id: "details", label: "Details" },
  { id: "about", label: "About" },
]

const BTN_BASE =
  "min-h-[40px] w-full sm:w-auto sm:min-w-[120px] px-6 rounded-[4px] text-[12px] font-semibold border transition-colors " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#63b3ed] focus-visible:ring-offset-2"
const BTN_ACCEPT = `${BTN_BASE} bg-[#114dac] border-[#114dac] text-white hover:bg-[#0e3e8a] hover:border-[#0e3e8a]`
const BTN_REJECT = `${BTN_BASE} bg-white border-[#114dac] text-[#114dac] hover:bg-[#eef3f9]`

// ─── Public: link that re-opens the bar ──────────────────────────────────────

/** Inline link used on the policy pages to change or withdraw consent. */
export function CookieSettingsLink({
  children = "Cookie settings",
  className = "text-[#2b6cb0] hover:underline cursor-pointer",
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      {children}
    </button>
  )
}

// ─── Banner ──────────────────────────────────────────────────────────────────

export function CookieConsent() {
  const pathname = usePathname() ?? "/"
  const [mounted, setMounted] = useState(false)
  const [consent, setConsent] = useState<ConsentRecord | null>(null)
  const [reopened, setReopened] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [tab, setTab] = useState<TabId>("consent")
  const [shown, setShown] = useState(false)
  const barRef = useRef<HTMLDivElement | null>(null)

  const excluded = EXCLUDED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))
  const visible = mounted && !excluded && (consent === null || reopened)

  // Read the stored choice only on the client (avoids SSR/hydration mismatch).
  useEffect(() => {
    setConsent(readConsent())
    setMounted(true)
    const onChange = (e: Event) => setConsent((e as CustomEvent<ConsentRecord>).detail ?? readConsent())
    const onOpen = () => {
      setReopened(true)
      setExpanded(true)
      setTab("consent")
    }
    window.addEventListener(CONSENT_EVENT, onChange)
    window.addEventListener(OPEN_SETTINGS_EVENT, onOpen)
    return () => {
      window.removeEventListener(CONSENT_EVENT, onChange)
      window.removeEventListener(OPEN_SETTINGS_EVENT, onOpen)
    }
  }, [])

  // Slide-in after mount; no motion for users who prefer reduced motion (CSS).
  useEffect(() => {
    if (!visible) {
      setShown(false)
      return
    }
    const id = window.requestAnimationFrame(() => setShown(true))
    return () => window.cancelAnimationFrame(id)
  }, [visible])

  // While the bar is up, pad the page by its height so nothing (footer links,
  // form buttons) sits permanently underneath it.
  useEffect(() => {
    if (!visible || !barRef.current) return
    const el = barRef.current
    const body = document.body
    const previous = body.style.paddingBottom
    const apply = () => {
      body.style.paddingBottom = `${Math.ceil(el.getBoundingClientRect().height)}px`
    }
    apply()
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(apply) : null
    ro?.observe(el)
    return () => {
      ro?.disconnect()
      body.style.paddingBottom = previous
    }
  }, [visible])

  const decide = useCallback((decision: ConsentDecision) => {
    const previous = readConsent()
    const rec = saveConsent(decision)
    logConsent(rec, previous ? "changed" : "given")
    // Withdrawal: drop analytics/marketing cookies already on this device.
    if (decision === "rejected" && previous?.d === "accepted") clearNonEssentialCookies()
    setConsent(rec)
    setReopened(false)
    setExpanded(false)
    setTab("consent")
  }, [])

  const onTabKey = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return
    e.preventDefault()
    const next = (index + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length
    setTab(TABS[next].id)
    document.getElementById(`cc-tab-${TABS[next].id}`)?.focus()
  }

  if (!visible) return null

  const actions = (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:gap-5 shrink-0">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="inline-flex items-center justify-center gap-1.5 text-[12px] font-light text-[#114dac] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#63b3ed] rounded-[4px] py-1"
      >
        {expanded ? "Hide details" : "More details"}
        {expanded ? <ChevronDown size={14} aria-hidden="true" /> : <ChevronUp size={14} aria-hidden="true" />}
      </button>
      <div className="grid grid-cols-2 gap-3 sm:flex">
        <button type="button" onClick={() => decide("rejected")} className={BTN_REJECT}>
          Reject
        </button>
        <button type="button" onClick={() => decide("accepted")} className={BTN_ACCEPT}>
          Accept
        </button>
      </div>
    </div>
  )

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[70] pointer-events-none transition-transform duration-500 ease-out motion-reduce:transition-none ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div
        ref={barRef}
        role="region"
        aria-label="Cookie consent"
        className="pointer-events-auto w-full bg-white border-t border-[#dbe5f0] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-4">
          {expanded ? (
            <>
              <div role="tablist" aria-label="Cookie information" className="flex border-b border-[#dbe5f0]">
                {TABS.map((t, i) => {
                  const active = tab === t.id
                  return (
                    <button
                      key={t.id}
                      id={`cc-tab-${t.id}`}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      aria-controls={`cc-panel-${t.id}`}
                      tabIndex={active ? 0 : -1}
                      onClick={() => setTab(t.id)}
                      onKeyDown={(e) => onTabKey(e, i)}
                      className={`relative flex-1 py-2.5 text-[12px] font-semibold transition-colors focus:outline-none focus-visible:bg-[#eef3f9] ${
                        active ? "text-[#114dac]" : "text-[#4a5568] hover:text-[#114dac]"
                      }`}
                    >
                      {t.label}
                      {active && <span className="absolute inset-x-0 bottom-[-1px] h-[2px] bg-[#114dac]" aria-hidden="true" />}
                    </button>
                  )
                })}
              </div>
              <div
                id={`cc-panel-${tab}`}
                role="tabpanel"
                aria-labelledby={`cc-tab-${tab}`}
                tabIndex={0}
                className="max-h-[40vh] sm:max-h-[320px] overflow-y-auto py-4 pr-1 text-[12px] font-light text-[#4a5568] leading-[1.8] focus:outline-none"
              >
                {tab === "consent" && <ConsentPanel current={consent} />}
                {tab === "details" && <DetailsPanel current={consent} />}
                {tab === "about" && <AboutPanel />}
              </div>
              <div className="border-t border-[#dbe5f0] pt-4 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                {actions}
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-[#1a202c]">This website uses cookies</p>
                <p className="mt-0.5 text-[12px] font-light text-[#4a5568] leading-[1.7]">
                  Essential cookies keep the website working. We use analytics and marketing cookies only if you accept.
                  If you reject, the website works as normal with essential cookies only.
                </p>
              </div>
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Tab panels ──────────────────────────────────────────────────────────────

function formatWhen(ts: number): string {
  try {
    return new Date(ts).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
  } catch {
    return ""
  }
}

function CurrentChoice({ current }: { current: ConsentRecord | null }) {
  if (!current) return null
  return (
    <p className="mb-3 rounded-[4px] bg-[#eef3f9] border border-[#dbe5f0] px-3 py-2 text-[12px] text-[#1a202c]">
      Your current choice: <strong className="font-semibold">{current.d === "accepted" ? "Accepted" : "Rejected"}</strong>
      {current.ts ? ` on ${formatWhen(current.ts)}` : ""}. Choose again below to change it.
    </p>
  )
}

function ConsentPanel({ current }: { current: ConsentRecord | null }) {
  return (
    <div className="space-y-3">
      <CurrentChoice current={current} />
      <p className="text-[13px] font-semibold text-[#1a202c]">This website uses cookies</p>
      <p>
        Essential cookies keep this website working and do not need your consent. We use analytics and marketing
        cookies only if you accept. If you reject, only essential cookies are used and the website works as normal.
      </p>
      <p>
        Accepting enables both analytics and marketing cookies. You can change or withdraw your choice at any time
        using Cookie settings on our Privacy Policy and Cookie Policy pages.
      </p>
      <PolicyLinks />
    </div>
  )
}

interface CategoryInfo {
  key: "essential" | "analytics" | "marketing"
  title: string
  badge: string
  body: string
  items?: ReadonlyArray<string>
}

const CATEGORIES: ReadonlyArray<CategoryInfo> = [
  {
    key: "essential",
    title: "Essential",
    badge: "Always active",
    body: "Needed for the website to work. These do not need consent and cannot be switched off.",
    items: [
      "firmity_consent: remembers your cookie choice. First-party cookie, up to 12 months.",
      "firmity_theme: remembers display settings you choose. Browser storage, until you clear it.",
      "Session notices: keep pop-ups from reappearing during your visit. Session storage, until you close the tab.",
    ],
  },
  {
    key: "analytics",
    title: "Analytics",
    badge: "Only if you accept",
    body: "Help us understand how visitors reach and use this website, such as pages viewed, device type and traffic source, so we can improve it. Reports are aggregated. Names and lifetimes are in the cookie list we provide on request.",
  },
  {
    key: "marketing",
    title: "Marketing",
    badge: "Only if you accept",
    body: "Help us measure which campaigns and channels bring visitors to Firmity and how well our communications perform. Names and lifetimes are in the cookie list we provide on request.",
  },
]

function DetailsPanel({ current }: { current: ConsentRecord | null }) {
  return (
    <div className="space-y-3">
      <CurrentChoice current={current} />
      {CATEGORIES.map((c) => {
        const status = c.key === "essential" || !current ? null : current.d === "accepted" ? "Allowed" : "Not allowed"
        return (
          <section key={c.key} className="rounded-[4px] border border-[#dbe5f0] p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-[12.5px] font-semibold text-[#1a202c]">{c.title}</h3>
              <span className="flex items-center gap-2">
                <span className="rounded-[4px] bg-[#eef3f9] px-2 py-0.5 text-[11px] font-semibold text-[#114dac]">{c.badge}</span>
                {status && <span className="text-[11px] font-semibold text-[#4a5568]">{status}</span>}
              </span>
            </div>
            <p className="mt-1.5">{c.body}</p>
            {c.items && (
              <ul className="mt-2 list-disc pl-5 space-y-1">
                {c.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        )
      })}
    </div>
  )
}

function AboutPanel() {
  return (
    <div className="space-y-3">
      <p>
        Cookies are small text files that a website stores on your device. Similar technologies, such as browser local
        storage and session storage, work in the same way and are covered by this notice.
      </p>
      <p>
        Ufirm Technologies Private Limited, which operates the Firmity platform, is the Data Fiduciary for this website
        and acts under the Digital Personal Data Protection Act, 2023 and the DPDP Rules, 2025. Our Privacy Policy
        explains how we handle personal data.
      </p>
      <p>
        When you choose, we keep a record of your choice as proof of consent: a random identifier, your choice, the date
        and time, the policy version, the page, and basic technical data such as device type. If you accept, this also
        includes the website or campaign that brought you here.
      </p>
      <p>
        You may withdraw consent at any time through Cookie settings, as easily as you gave it. For a grievance, write to
        Sanjeev Kumar, Grievance Officer and DPO, at{" "}
        <a href="mailto:dpo@ufirm.in" className="text-[#2b6cb0] hover:underline">
          dpo@ufirm.in
        </a>
        . If it is not resolved, you may complain to the Data Protection Board of India.
      </p>
      <PolicyLinks />
    </div>
  )
}

function PolicyLinks() {
  return (
    <p className="flex flex-wrap gap-x-5 gap-y-1 text-[12px]">
      <Link href="/cookie-policy" className="text-[#114dac] hover:underline">
        Cookie Policy
      </Link>
      <Link href="/privacy" className="text-[#114dac] hover:underline">
        Privacy Policy
      </Link>
    </p>
  )
}
