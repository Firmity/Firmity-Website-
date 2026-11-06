"use client"

import type React from "react"
import { useRef, useState } from "react"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { DPO_EMAIL } from "@/src/lib/dpdp-constants"

const MIN_SUBMIT_MS = 1500
const labelClass = "block text-[11px] font-semibold tracking-[0.04em] text-[#114dac] mb-1"
const inputClass =
  "w-full px-3.5 py-2.5 rounded-[4px] text-base sm:text-[13px] border border-[#cbd5e0] bg-white text-[#114dac] font-light focus:outline-none focus:border-[#2b6cb0] focus:ring-1 focus:ring-[#2b6cb0] transition-colors"

export function WithdrawConsentForm() {
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("") // honeypot
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")
  const mountedAt = useRef(Date.now())

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (website.trim() || Date.now() - mountedAt.current < MIN_SUBMIT_MS) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/withdraw-consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      })
      const json = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.")
      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-[4px] p-5 flex gap-3">
        <CheckCircle size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-[13.5px] text-emerald-900">Your consent has been withdrawn.</p>
          <p className="text-[12.5px] text-emerald-800 font-light leading-[1.7] mt-1">
            We will stop all marketing to this address within 48 hours. We may still write to you about a request
            you have made or a service you use.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor="wc-website">Website</label>
        <input id="wc-website" type="text" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor="wc-email" className={labelClass}>Email address*</label>
        <input
          id="wc-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className={inputClass}
        />
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-[4px] p-3 flex items-center gap-2">
          <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
          <p className="text-[12px] text-red-700">{error}</p>
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="cursor-pointer w-full bg-[#114dac] hover:bg-[#0e3e8a] text-white py-3 rounded-[4px] text-[13px] font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? <><Loader2 size={16} className="animate-spin" /> Withdrawing…</> : "Withdraw my consent"}
      </button>
      <p className="text-[11.5px] text-[#718096] font-light leading-[1.7]">
        You can also write to <a href={`mailto:${DPO_EMAIL}`} className="text-[#2b6cb0] underline underline-offset-2">{DPO_EMAIL}</a>.
      </p>
    </form>
  )
}
