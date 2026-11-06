"use client"

// Notice + optional marketing checkbox shown directly above every lead form's
// Submit button. DPDP s.5 notice at the point of collection; s.6 consent for
// marketing is a SEPARATE, unticked box that never blocks the enquiry.
import Link from "next/link"
import { useId } from "react"

/**
 * One line under a newsletter sign-up. Signing up IS the consent, so no checkbox:
 * the line says so, and links to the notice, the withdrawal form and the policy.
 */
export function NewsletterNotice({ tone = "light" }: { tone?: "light" | "dark" }) {
  const text = tone === "dark" ? "text-white/80" : "text-[#718096]"
  const link = tone === "dark" ? "text-white underline underline-offset-2" : "text-[#2b6cb0] underline underline-offset-2"
  return (
    <p className={`text-[10.5px] leading-[1.6] font-light ${text}`}>
      By signing up you agree to receive Firmity&apos;s newsletter by email. You can withdraw at any time.{" "}
      <Link href="/unsubscribe" className={link}>Withdraw consent</Link>
      {" · "}
      <Link href="/notices/newsletter-signup" className={link}>Privacy Notice</Link>
      {" · "}
      <Link href="/privacy" className={link}>Privacy Policy</Link>
    </p>
  )
}

interface ConsentNoticeProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

export function ConsentNotice({ checked, onChange }: ConsentNoticeProps) {
  const id = useId()
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex items-start gap-2 cursor-pointer text-[11.5px] leading-[1.5] text-[#4a5568] font-light">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-[3px] h-3.5 w-3.5 flex-shrink-0 cursor-pointer accent-[#114dac]"
        />
        <span>
          I agree to receive product updates, offers and event invitations from Firmity by email, SMS, WhatsApp and
          phone. <span className="text-[#718096]">(Optional. You can withdraw at any time.)</span>
        </span>
      </label>
      <p className="text-[10.5px] leading-[1.6] text-[#718096] font-light">
        We use your details only to reply to your request.{" "}
        <Link href="/notices/website-and-demo-enquiries" className="text-[#2b6cb0] underline underline-offset-2">Privacy Notice</Link>
        {" · "}
        <Link href="/privacy" className="text-[#2b6cb0] underline underline-offset-2">Privacy Policy</Link>
        {" · "}
        <Link href="/data-rights" className="text-[#2b6cb0] underline underline-offset-2">Your Data Rights</Link>
        {" · "}
        <Link href="/unsubscribe" className="text-[#2b6cb0] underline underline-offset-2">Withdraw consent</Link>
      </p>
    </div>
  )
}
