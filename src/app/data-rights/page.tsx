import { LegalPageShell } from "@/src/components/legal-page-shell"
import { DataRightsForm } from "@/src/components/data-rights-form"
import { DPO_EMAIL } from "@/src/lib/dpdp-constants"

export default function DataRightsPage() {
  return (
    <LegalPageShell
      kicker="Privacy"
      title="Your Data Rights"
      intro={
        <>
          Use this form to ask for access to your data, correction, erasure, to nominate someone to act for you, or to
          make a complaint. You can also write to{" "}
          <a href={`mailto:${DPO_EMAIL}`} className="underline underline-offset-2 text-white">{DPO_EMAIL}</a>. We
          acknowledge within 7 days and respond within 30 days.
        </>
      }
    >
      <DataRightsForm />
      <p className="text-[11.5px] text-[#718096] font-light leading-[1.7] mt-6">
        You can also write to <a href={`mailto:${DPO_EMAIL}`} className="text-[#2b6cb0] underline underline-offset-2">{DPO_EMAIL}</a>.
        We acknowledge within 7 days and reply within 30 days.
      </p>
      <p className="text-[11.5px] text-[#718096] font-light leading-[1.7] mt-3">
        If your data is in Firmity because your employer or another organisation uses it, that organisation decides
        what happens to it. Send your request to them. If you send it to us, we will pass it on.
      </p>
    </LegalPageShell>
  )
}
