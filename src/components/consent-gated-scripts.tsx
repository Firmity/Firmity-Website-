"use client"

// ─── Consent gate for the tag manager (analytics / marketing tags) ───────────
// Nothing in this file runs until the visitor presses Accept. This is what
// makes clause 5.1 of the Privacy Policy true ("Analytics and marketing cookies
// are used only if you consent through the cookie banner").
//
//   no choice yet / Reject  → tag manager is never loaded
//   Accept                  → tag manager injected once
//   Reject after Accept     → page reloads once so already-loaded scripts stop
//
// NOT gated here: the cookieless visit counter (<Analytics /> in the root
// layout). It sets no cookie and stores nothing on the device, so it counts
// every visitor regardless of choice. If it is ever changed to use cookies or
// device storage, it MUST move behind this gate.
//
// Pushes a `firmity_consent` event onto the data layer so tags configured in
// the tag manager can key off the visitor's choice.

import { useEffect, useRef } from "react"

import { CONSENT_EVENT, readConsent, type ConsentRecord } from "@/src/lib/cookie-consent"

const TAG_MANAGER_ID = "GTM-T27H73H4"
const TAG_MANAGER_SCRIPT_ID = "gtm-base"

type DataLayerWindow = Window & { dataLayer?: Array<Record<string, unknown>> }

function injectTagManager(): void {
  if (document.getElementById(TAG_MANAGER_SCRIPT_ID)) return
  const w = window as DataLayerWindow
  w.dataLayer = w.dataLayer ?? []
  w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" })
  const s = document.createElement("script")
  s.id = TAG_MANAGER_SCRIPT_ID
  s.async = true
  s.src = `https://www.googletagmanager.com/gtm.js?id=${TAG_MANAGER_ID}`
  document.head.appendChild(s)
}

function pushConsentEvent(rec: ConsentRecord): void {
  const w = window as DataLayerWindow
  w.dataLayer = w.dataLayer ?? []
  w.dataLayer.push({
    event: "firmity_consent",
    consent_decision: rec.d,
    consent_analytics: rec.a,
    consent_marketing: rec.m,
    consent_policy_version: rec.v,
  })
}

export function ConsentGatedScripts() {
  const loadedRef = useRef(false)

  useEffect(() => {
    const apply = (rec: ConsentRecord | null) => {
      const ok = !!rec && (rec.a || rec.m)
      if (ok) {
        if (!loadedRef.current) {
          loadedRef.current = true
          pushConsentEvent(rec as ConsentRecord)
          injectTagManager()
        }
        return
      }
      // Withdrawal after scripts already ran: a reload is the only reliable way to stop them.
      if (loadedRef.current) {
        loadedRef.current = false
        window.setTimeout(() => window.location.reload(), 400)
      }
    }
    apply(readConsent())
    const onChange = (e: Event) => apply((e as CustomEvent<ConsentRecord>).detail ?? readConsent())
    window.addEventListener(CONSENT_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_EVENT, onChange)
  }, [])

  return null
}
