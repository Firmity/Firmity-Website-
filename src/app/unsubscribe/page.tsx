import { LegalPageShell } from "@/src/components/legal-page-shell"
import { WithdrawConsentForm } from "@/src/components/withdraw-consent-form"

export default function UnsubscribePage() {
  return (
    <LegalPageShell
      kicker="Your choice"
      title="Withdraw consent"
      intro="Enter your email address to stop all marketing from Firmity. Withdrawing is as easy as agreeing. We stop within 48 hours."
    >
      <WithdrawConsentForm />
    </LegalPageShell>
  )
}
