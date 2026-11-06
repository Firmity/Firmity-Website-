"use client"

import type React from "react"
import { useRef, useState } from "react"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import {
  RIGHTS_IDENTIFIER_LABELS,
  RIGHTS_IDENTIFIER_TYPES,
  RIGHTS_REQUEST_TYPES,
  RIGHTS_TYPE_LABELS,
  type RightsIdentifierType,
  type RightsRequestType,
} from "@/src/lib/dpdp-constants"

const MIN_SUBMIT_MS = 1500
const MAX_FILE_BYTES = 2 * 1024 * 1024
const FILE_ACCEPT = ".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
const labelClass = "block text-[11px] font-semibold tracking-[0.04em] text-[#114dac] mb-1"
const inputClass =
  "w-full px-3.5 py-2.5 rounded-[4px] text-base sm:text-[13px] border border-[#cbd5e0] bg-white text-[#114dac] font-light focus:outline-none focus:border-[#2b6cb0] focus:ring-1 focus:ring-[#2b6cb0] transition-colors"
const fileClass = `${inputClass} file:mr-3 file:rounded-[4px] file:border-0 file:bg-[#eef3f9] file:px-3 file:py-1.5 file:text-[12px] file:font-semibold file:text-[#114dac]`

function todayLabel(): string {
  return new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
}

export function DataRightsForm() {
  const [requestType, setRequestType] = useState<RightsRequestType>("access")
  const [identifierType, setIdentifierType] = useState<RightsIdentifierType>("registered_email")
  const [identifier, setIdentifier] = useState("")
  const [fullName, setFullName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [details, setDetails] = useState("")
  const [nomineeName, setNomineeName] = useState("")
  const [nomineeRelationship, setNomineeRelationship] = useState("")
  const [nomineeEmail, setNomineeEmail] = useState("")
  const [nomineePhone, setNomineePhone] = useState("")
  const [signedName, setSignedName] = useState("")
  const [website, setWebsite] = useState("") // honeypot
  const [loading, setLoading] = useState(false)
  const [reference, setReference] = useState<string | null>(null)
  const [error, setError] = useState("")
  const mountedAt = useRef(Date.now())
  const attachmentRef = useRef<HTMLInputElement>(null)
  const nomineeIdRef = useRef<HTMLInputElement>(null)
  const isNomination = requestType === "nomination"

  const tooBig = (input: HTMLInputElement | null) => {
    const f = input?.files?.[0]
    return !!f && f.size > MAX_FILE_BYTES
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (website.trim() || Date.now() - mountedAt.current < MIN_SUBMIT_MS) return
    if (tooBig(attachmentRef.current) || (isNomination && tooBig(nomineeIdRef.current))) {
      setError("Each file must be 2 MB or smaller (PDF, JPG or PNG).")
      return
    }
    setLoading(true)
    setError("")
    try {
      const body = new FormData()
      body.set("requestType", requestType)
      body.set("identifierType", identifierType)
      body.set("identifier", identifier)
      body.set("fullName", fullName)
      body.set("contactEmail", contactEmail)
      body.set("details", details)
      body.set("website", website)
      const attachment = attachmentRef.current?.files?.[0]
      if (attachment) body.set("attachment", attachment)
      if (isNomination) {
        body.set("nomineeName", nomineeName)
        body.set("nomineeRelationship", nomineeRelationship)
        body.set("nomineeEmail", nomineeEmail)
        body.set("nomineePhone", nomineePhone)
        body.set("signedName", signedName)
        const nomineeId = nomineeIdRef.current?.files?.[0]
        if (nomineeId) body.set("nomineeId", nomineeId)
      }
      const res = await fetch("/api/data-rights", { method: "POST", body })
      const json = (await res.json().catch(() => ({}))) as { error?: string; reference?: string }
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.")
      setReference(json.reference ?? "received")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (reference) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-[4px] p-5 flex gap-3">
        <CheckCircle size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-[13.5px] text-emerald-900">Your request has been received.</p>
          <p className="text-[12.5px] text-emerald-800 font-light leading-[1.7] mt-1">
            Reference: <strong className="font-semibold">{reference}</strong>. We will acknowledge within 7 days, may
            ask you to confirm your identity by replying to your email, and will respond within 30 days.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor="dr-website">Website</label>
        <input id="dr-website" type="text" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="dr-type" className={labelClass}>What would you like to do?*</label>
        <select id="dr-type" value={requestType} onChange={(e) => setRequestType(e.target.value as RightsRequestType)} className={inputClass}>
          {RIGHTS_REQUEST_TYPES.map((t) => (
            <option key={t} value={t}>{RIGHTS_TYPE_LABELS[t]}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="dr-name" className={labelClass}>Full name*</label>
          <input id="dr-name" type="text" required maxLength={200} value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label htmlFor="dr-email" className={labelClass}>Email we can reply to*</label>
          <input id="dr-email" type="email" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="dr-idtype" className={labelClass}>How do you deal with us?*</label>
          <select id="dr-idtype" value={identifierType} onChange={(e) => setIdentifierType(e.target.value as RightsIdentifierType)} className={inputClass}>
            {RIGHTS_IDENTIFIER_TYPES.map((t) => (
              <option key={t} value={t}>{RIGHTS_IDENTIFIER_LABELS[t]}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="dr-id" className={labelClass}>{RIGHTS_IDENTIFIER_LABELS[identifierType]}*</label>
          <input id="dr-id" type="text" required maxLength={200} value={identifier} onChange={(e) => setIdentifier(e.target.value)} className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="dr-details" className={labelClass}>Describe your request</label>
        <textarea
          id="dr-details"
          rows={4}
          maxLength={3000}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Tell us what you need."
          className={`${inputClass} resize-none`}
        />
      </div>

      <div>
        <label htmlFor="dr-file" className={labelClass}>Supporting file (optional)</label>
        <input id="dr-file" ref={attachmentRef} type="file" accept={FILE_ACCEPT} className={fileClass} />
        <p className="text-[11px] text-[#718096] font-light mt-1">PDF, JPG or PNG, up to 2 MB.</p>
      </div>

      {isNomination && (
        <fieldset className="flex flex-col gap-4 rounded-[4px] border border-[#dbe5f0] bg-[#f8fafc] p-4">
          <legend className="px-1 text-[12px] font-semibold text-[#114dac]">Your nominee</legend>
          <p className="text-[12px] text-[#4a5568] font-light leading-[1.7]">
            A nominee can use your data rights only if you have died or cannot act. We check the nominee&apos;s identity
            before acting.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dr-nname" className={labelClass}>Nominee&apos;s name*</label>
              <input id="dr-nname" type="text" required maxLength={200} value={nomineeName} onChange={(e) => setNomineeName(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor="dr-nrel" className={labelClass}>Relationship to you*</label>
              <input id="dr-nrel" type="text" required maxLength={100} value={nomineeRelationship} onChange={(e) => setNomineeRelationship(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor="dr-nemail" className={labelClass}>Nominee&apos;s email*</label>
              <input id="dr-nemail" type="email" required value={nomineeEmail} onChange={(e) => setNomineeEmail(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor="dr-nphone" className={labelClass}>Nominee&apos;s phone*</label>
              <input id="dr-nphone" type="tel" required maxLength={30} value={nomineePhone} onChange={(e) => setNomineePhone(e.target.value)} placeholder="+91 98765 43210" className={inputClass} />
            </div>
          </div>
          <div>
            <label htmlFor="dr-nid" className={labelClass}>Nominee&apos;s ID document*</label>
            <input id="dr-nid" ref={nomineeIdRef} type="file" required accept={FILE_ACCEPT} className={fileClass} />
            <p className="text-[11px] text-[#718096] font-light mt-1">PDF, JPG or PNG, up to 2 MB.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dr-sign" className={labelClass}>Your signature (type your full name)*</label>
              <input id="dr-sign" type="text" required maxLength={200} value={signedName} onChange={(e) => setSignedName(e.target.value)} className={inputClass} />
            </div>
            <div>
              <span className={labelClass}>Date</span>
              <p className="px-3.5 py-2.5 text-[13px] text-[#114dac] font-light">{todayLabel()}</p>
            </div>
          </div>
        </fieldset>
      )}

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
        {loading ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : "Submit request"}
      </button>
    </form>
  )
}
