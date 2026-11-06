// Wording shared by every notice: rights, complaint and withdrawal contacts.
// Text follows the Policy Pack's one-page notice sheet (FDP-10).
import Link from "next/link"
import { DPO_EMAIL } from "@/src/lib/dpdp-constants"

const link = "text-[#2b6cb0] underline underline-offset-2"

export function DpoLink() {
  return <a href={`mailto:${DPO_EMAIL}`} className={link}>{DPO_EMAIL}</a>
}

export function WithdrawText({ emailUnsubscribe = true }: { emailUnsubscribe?: boolean }) {
  return (
    <p>
      Withdrawing consent stops follow-up. Use the{" "}
      <Link href="/unsubscribe" className={link}>Withdraw consent</Link> form
      {emailUnsubscribe ? ", click Unsubscribe in any marketing email," : ""} or write to <DpoLink />. We stop within
      48 hours.
    </p>
  )
}

export function RightsText() {
  return (
    <p>
      You may ask to see, correct or delete your data, or name a nominee, through the{" "}
      <Link href="/data-rights" className={link}>Your Data Rights</Link> form or <DpoLink />. We reply within 30 days.
    </p>
  )
}

export function ComplainText() {
  return (
    <p>
      Write to Sanjeev Kumar, DPO / Grievance Officer, <DpoLink />. If you are not satisfied, you may complain to the
      Data Protection Board of India.
    </p>
  )
}

export function LanguageNote() {
  return (
    <p className="text-[12px] text-[#718096] font-light mt-8">
      Any other language listed in the Eighth Schedule to the Constitution is available on request: write to <DpoLink />.
    </p>
  )
}
