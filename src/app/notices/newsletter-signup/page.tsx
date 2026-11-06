import Link from "next/link"
import { LegalPageShell } from "@/src/components/legal-page-shell"
import { NoticeSections, NoticeVersionLine, type NoticeSectionData } from "@/src/components/privacy-notice"
import { ComplainText, LanguageNote, RightsText, WithdrawText } from "@/src/components/notice-common"

const SECTIONS: NoticeSectionData[] = [
  {
    heading: "Exact data we collect",
    body: (
      <>
        <p>Email address.</p>
        <p>
          To keep proof of your choice we also record the form you used, the date and time, the notice version, a
          one-way hash of your IP address and your device type (mobile, tablet or desktop). We do not keep your IP
          address itself.
        </p>
      </>
    ),
  },
  { heading: "Why we collect it", body: <p>To send product news and updates.</p> },
  { heading: "How to withdraw consent", body: <WithdrawText /> },
  { heading: "How to use your rights", body: <RightsText /> },
  { heading: "How to complain", body: <ComplainText /> },
]

export default function NewsletterNoticePage() {
  return (
    <LegalPageShell
      wide
      kicker="Privacy notice"
      title="Newsletter sign-up"
      intro={
        <>
          What we collect when you sign up for the Firmity newsletter, and your choices. See also our{" "}
          <Link href="/privacy" className="underline underline-offset-2 text-white">Privacy Policy</Link>.
        </>
      }
    >
      <NoticeVersionLine />
      <NoticeSections sections={SECTIONS} />
      <LanguageNote />
    </LegalPageShell>
  )
}
