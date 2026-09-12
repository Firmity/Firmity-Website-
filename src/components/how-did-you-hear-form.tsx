"use client"

// ─── "How did you hear about Firmity?" — shared capture widget ────────────────
// Used in four places (per product spec):
//   1. Standalone homepage section, before the Insights/blog block
//      (see how-did-you-hear-section.tsx) — anonymous, no identity fields.
//   2. Re-asked inline inside the /contact success card after a lead submits
//      the main contact form (see src/app/contact/page.tsx).
//   3. Re-asked inline after the homepage's embedded contact form succeeds
//      (see overview-contact-form.tsx) — added 2026-09-04 for parity with #2,
//      per request confirming this form should ask it too.
//   4. Re-asked inline after a brochure download succeeds
//      (see brochure-download-form.tsx) — added the same day, same reason.
//
// All POST to the same /api/how-heard route; `source` tags which one fired so
// the email to the team (RECEIVER_EMAIL, same inbox the contact form uses)
// is traceable — see that route's SOURCE_LABELS map, which must stay in sync
// with this union. Dropdown is a raw @radix-ui/react-select build (not the
// components/ui/select.tsx wrapper — that file imports "@/lib/utils", which
// doesn't resolve in this src/-rooted project; safer not to depend on it).

import { useState } from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, Loader2, CheckCircle2, AlertCircle } from "lucide-react"

const OTHER_VALUE = "Other (please specify)"

const PRIMARY_SOURCES = [
  "Online research",
  "Online Advertisement",
  "Social Media",
  "Email",
  "Event",
  "Referral from a Firmity customer",
]

// One consolidated option instead of separate ChatGPT/Claude/Gemini/Grok rows
// — the examples in brackets cover the intent without a growing option list
// every time a new model ships.
const AI_ASSISTANT_VALUE = "AI Assistant (ChatGPT, Gemini, etc.)"

interface HowDidYouHearFormProps {
  /** Tags the email to the team so replies are traceable to where the answer came from. */
  source: "homepage" | "contact-form" | "overview-form" | "brochure-form"
}

function OptionItem({ value }: { value: string }) {
  return (
    <SelectPrimitive.Item
      value={value}
      className="relative flex items-center gap-2 pl-7 pr-3 py-2 rounded-lg text-[13px] text-[#114dac] font-light leading-snug cursor-pointer select-none outline-none data-[highlighted]:bg-[#ebf3fc] data-[highlighted]:text-[#2b6cb0] data-[state=checked]:font-medium data-[state=checked]:text-[#2b6cb0]"
    >
      <span className="absolute left-2 flex items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check size={13} />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{value}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

export function HowDidYouHearForm({ source }: HowDidYouHearFormProps) {
  const [howHeard, setHowHeard] = useState("")
  const [detail, setDetail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const isOther = howHeard === OTHER_VALUE
  const canSubmit = howHeard.length > 0 && (!isOther || detail.trim().length > 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit || submitting) return
    setSubmitting(true)
    setError("")
    try {
      const res = await fetch("/api/how-heard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source, howHeard, detail: isOther ? detail.trim() : undefined }),
      })
      if (!res.ok) throw new Error("Failed to submit")
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-2 text-[13px] text-[#2b6cb0] font-medium">
        <CheckCircle2 size={16} className="flex-shrink-0" />
        Thanks — that helps us a lot.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label className="block text-[11px] font-semibold tracking-[0.04em] text-[#114dac] mb-1.5">
        How did you hear about Firmity?
      </label>

      <SelectPrimitive.Root value={howHeard} onValueChange={setHowHeard}>
        <SelectPrimitive.Trigger
          aria-label="How did you hear about Firmity?"
          className="cursor-pointer w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-[4px] border border-[#cbd5e0] bg-white text-[13px] text-[#114dac] font-light focus:outline-none focus:border-[#2b6cb0] focus:ring-1 focus:ring-[#2b6cb0] transition-colors data-[placeholder]:text-[#000000]"
        >
          <SelectPrimitive.Value placeholder="Select..." />
          <SelectPrimitive.Icon>
            <ChevronDown size={15} className="text-[#000000] flex-shrink-0" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={6}
            className="z-50 overflow-hidden rounded-[4px] border border-[#e2e8f0] bg-white shadow-[0_12px_32px_rgba(17,29,53,0.14)] w-[var(--radix-select-trigger-width)]"
          >
            <SelectPrimitive.Viewport className="p-1.5 max-h-[300px]">
              {PRIMARY_SOURCES.map((v) => (
                <OptionItem key={v} value={v} />
              ))}
              <SelectPrimitive.Separator className="h-px bg-[#eef3f9] my-1.5 mx-1" />
              <OptionItem value={AI_ASSISTANT_VALUE} />
              <SelectPrimitive.Separator className="h-px bg-[#eef3f9] my-1.5 mx-1" />
              <OptionItem value={OTHER_VALUE} />
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {isOther && (
        <div className="animate-fade-up mt-4">
          <label className="flex items-center gap-1 text-[11px] font-semibold tracking-[0.04em] text-[#114dac] mb-1.5">
            I learned about Firmity <span className="text-[#2b6cb0]">*</span>
          </label>
          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            required
            rows={3}
            className="w-full px-3.5 py-2.5 rounded-[4px] border border-[#cbd5e0] bg-white text-[13px] text-[#114dac] font-light placeholder:text-[#000000] focus:outline-none focus:border-[#2b6cb0] focus:ring-1 focus:ring-[#2b6cb0] transition-colors resize-none"
            placeholder="Please tell us how you learned about Firmity"
          />
        </div>
      )}

      {error && (
        <div className="mt-3 bg-[#fff5f5] border border-[#feb2b2] rounded-xl p-3 flex items-center gap-2">
          <AlertCircle size={15} className="text-[#c53030] flex-shrink-0" />
          <p className="text-[12px] text-[#c53030]">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!canSubmit || submitting}
        className="cursor-pointer mt-4 w-full sm:w-auto sm:px-8 bg-[#114dac] hover:bg-[#0e3e8a] text-white px-6 py-3 rounded-[4px] text-[12.5px] font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-[0_8px_24px_rgba(17,29,53,0.2)] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <Loader2 size={15} className="animate-spin" /> Submitting...
          </>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  )
}
