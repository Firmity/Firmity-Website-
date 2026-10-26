// ─── Terms & Conditions Page ──────────────────────────────────────────────────
// Content sourced from: june_2026_terms_and_conditions.docx
// Effective Date: 1-03-2026 | Last Updated: 10-06-2026
// Aligned with the 10 June 2026 Privacy Policy (src/app/privacy/page.tsx): these Terms may only
// mention services and practices the Privacy Policy mentions, and must not conflict with it.
// Design language: dark navy hero, serif display, DM Sans body, 12/20px radii.

import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Reveal } from "@/src/components/reveal"
import Link from "next/link"
import { FileText } from "lucide-react"

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main className="bg-white">
        {/* ── HERO ── */}
        <section className="bg-[#114dac] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #2b6cb0 0%, transparent 55%), radial-gradient(circle at 15% 75%, #1a2744 0%, transparent 50%)" }}
            aria-hidden="true"
          />
          <div className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-16">
            <Reveal>
              <div className="flex items-center gap-3 mb-3">
                <FileText size={14} className="text-[#63b3ed]" strokeWidth={1.5} />
                <span className="text-[#63b3ed] text-[10px] font-semibold tracking-[0.2em] uppercase">Legal</span>
              </div>
              <h1 className="font-serif text-[clamp(1.8rem,4vw,2.6rem)] font-light text-[#f0f4f8] leading-tight tracking-tight">
                Terms &amp; Conditions
              </h1>
              <p className="text-[13px] font-light text-white/[0.45] mt-2">
                Effective Date: 1 March 2026 &nbsp;·&nbsp; Last Updated: 10 June 2026
              </p>
              <p className="text-[13.5px] font-light text-white/[0.5] leading-[1.85] max-w-2xl mt-4">
                These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern access to and use of the Firmity platform,
                website, software, and related services (collectively, the
                &ldquo;Platform&rdquo;) operated by{" "}
                <strong className="font-semibold text-white/70">Ufirm Technologies Private Limited</strong>{" "}
                (&ldquo;Firmity&rdquo;, &ldquo;Ufirm&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;).
              </p>
              <p className="text-[13px] font-light text-white/[0.4] leading-[1.8] max-w-2xl mt-3">
                By accessing, registering for, subscribing to, or using the Platform, you acknowledge that you
                have read, understood, and agree to be bound by these Terms.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── CONTENT ── */}
        <article className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-14 lg:py-20">
          <div className="space-y-12">

            {/* 1. Platform Services */}
            <Reveal>
              <TermsSection number="1" heading="Platform Services">
                <p>Firmity is a cloud-based Software-as-a-Service (SaaS) platform that customers use to manage their operations, including data about their employees, visitors, and tenants.</p>
                <p>Firmity may modify, improve, enhance, replace, or discontinue certain features, functionalities, modules, or services from time to time to improve security, performance, compliance, reliability, and user experience.</p>
              </TermsSection>
            </Reveal>

            {/* 2. Eligibility and Authority */}
            <Reveal>
              <TermsSection number="2" heading="Eligibility and Authority">
                <p>You may use the Platform only if you are legally capable of entering into a binding agreement and are authorised to use the Platform. If you are accessing or using the Platform on behalf of a company, organisation, society, institution, or other legal entity, you represent and warrant that you have the authority to bind such entity to these Terms, and references to &ldquo;you&rdquo; shall include both the individual user and the applicable organisation.</p>
              </TermsSection>
            </Reveal>

            {/* 3. User Accounts and Responsibilities */}
            <Reveal>
              <TermsSection number="3" heading="User Accounts and Responsibilities">
                <p>Certain Platform features require user registration and account creation. Users agree to provide accurate, complete, and current information and to promptly update such information when necessary. Users are responsible for maintaining the confidentiality of login credentials and for all activities conducted through their accounts. Users shall immediately notify Firmity of any suspected unauthorised access, misuse, or security breach relating to their accounts.</p>
              </TermsSection>
            </Reveal>

            {/* 4. Subscription and Access Rights */}
            <Reveal>
              <TermsSection number="4" heading="Subscription and Access Rights">
                <p>Subject to compliance with these Terms and payment of applicable fees, Firmity grants customers a limited, non-exclusive, non-transferable, revocable right to access and use the Platform during the applicable subscription term. No ownership rights are transferred under these Terms, and all rights not expressly granted remain reserved by Firmity.</p>
              </TermsSection>
            </Reveal>

            {/* 5. Customer Responsibilities */}
            <Reveal>
              <TermsSection number="5" heading="Customer Responsibilities">
                <p>Customers are responsible for ensuring that their use of the Platform complies with all applicable laws, regulations, contractual obligations, employment requirements, privacy requirements, and industry standards. Customers are solely responsible for obtaining all necessary permissions, notices, authorisations, and consents from employees, contractors, visitors, vendors, residents, tenants, or other individuals whose information may be processed through the Platform. Customers further acknowledge responsibility for the accuracy, legality, quality, integrity, and ownership of all information uploaded to or processed through the Platform.</p>
              </TermsSection>
            </Reveal>

            {/* 6. Acceptable Use */}
            <Reveal>
              <TermsSection number="6" heading="Acceptable Use">
                <p>Users shall not misuse the Platform or attempt to interfere with its operation. Users shall not reverse engineer, decompile, disassemble, copy, modify, reproduce, distribute, resell, sublicense, scrape, or create derivative works from any portion of the Platform. Users shall not introduce malicious software, attempt unauthorised access, circumvent security controls, access data belonging to other customers, or use the Platform for unlawful, fraudulent, harmful, or abusive purposes.</p>
              </TermsSection>
            </Reveal>

            {/* 7. Intellectual Property Rights */}
            <Reveal>
              <TermsSection number="7" heading="Intellectual Property Rights">
                <p>The Platform, including its source code, object code, software architecture, databases, workflows, designs, interfaces, reports, trademarks, logos, documentation, proprietary methodologies, trade secrets, know-how, and all related intellectual property rights, is and shall remain the exclusive property of Ufirm Technologies Private Limited and its licensors. No rights, title, or ownership are transferred to any customer or user except for the limited access rights expressly granted under these Terms.</p>
              </TermsSection>
            </Reveal>

            {/* 8. Customer Data and Ownership */}
            <Reveal>
              <TermsSection number="8" heading="Customer Data and Ownership">
                <p>Customers retain ownership of all operational, administrative, employee, attendance, visitor, and other business data submitted to or generated through their use of the Platform. In respect of such data, Firmity acts as a Data Processor and processes it only on the customer&apos;s documented instructions, as described in the Privacy Policy, for the purpose of providing, maintaining, securing, and supporting the Platform in accordance with applicable agreements and laws.</p>
              </TermsSection>
            </Reveal>

            {/* 9. Attendance and Biometric Features */}
            <Reveal>
              <TermsSection number="9" heading="Attendance and Biometric Features">
                <p>Where enabled by a customer, the Platform may process attendance records, facial recognition attendance information, visitor records, and related workforce management data. Facial recognition attendance is optional for the individual, and biometric data is processed only with the individual&apos;s written consent, as described in the Privacy Policy. Customers acknowledge that they are solely responsible for determining the legality of such processing within their jurisdiction and for obtaining all required notices, permissions, and consents prior to enabling these features. Firmity shall not be responsible for a customer&apos;s failure to comply with applicable employment, labour, privacy, biometric information, or data protection laws.</p>
              </TermsSection>
            </Reveal>

            {/* 10. Third-Party Services and Integrations */}
            <Reveal>
              <TermsSection number="10" heading="Third-Party Services and Integrations">
                <p>The Platform relies upon third-party service providers who process data for Firmity under written contracts, including cloud hosting providers, SMS and email gateways, background-verification and recruitment providers, and IT support providers, as described in the Privacy Policy. Firmity does not control, and shall not be responsible for, the availability or performance of third-party services outside its reasonable control. Use of third-party services may be governed by separate terms and policies established by such providers.</p>
              </TermsSection>
            </Reveal>

            {/* 11. Service Availability */}
            <Reveal>
              <TermsSection number="11" heading="Service Availability">
                <p>Firmity will use commercially reasonable efforts to maintain Platform availability, performance, and reliability. However, the Platform is provided on an &ldquo;as available&rdquo; basis and uninterrupted, error-free, or completely secure operation cannot be guaranteed. Scheduled maintenance, emergency maintenance, software updates, cyber incidents, internet disruptions, infrastructure failures, force majeure events, or circumstances beyond Firmity&apos;s reasonable control may result in temporary interruptions or reduced availability. Unless expressly agreed under a separate written Service Level Agreement, no specific uptime commitment is guaranteed.</p>
              </TermsSection>
            </Reveal>

            {/* 12. Security */}
            <Reveal>
              <TermsSection number="12" heading="Security">
                <p>Firmity takes reasonable security safeguards as described in the Privacy Policy, which may include encryption in transit and at rest, role-based access controls, multi-factor authentication for administrators, activity logging and monitoring, and regular security testing. No system is completely secure, and absolute security against all threats, vulnerabilities, or unauthorised access cannot be guaranteed.</p>
              </TermsSection>
            </Reveal>

            {/* 13. Fees and Payment */}
            <Reveal>
              <TermsSection number="13" heading="Fees and Payment">
                <p>Access to certain Platform services may require payment of subscription fees, implementation fees, support fees, onboarding fees, training fees, or other applicable charges. Customers agree to pay all fees in accordance with the applicable proposal, quotation, order form, invoice, subscription agreement, or other commercial arrangement. Failure to make timely payments may result in suspension, restriction, or termination of Platform access.</p>
              </TermsSection>
            </Reveal>

            {/* 14. Data Export, Account Closure and Deletion */}
            <Reveal>
              <TermsSection number="14" heading="Data Export, Account Closure and Deletion">
                <p>Subject to applicable laws, technical limitations, and verification requirements, customers may request data exports, account closure, or deletion of customer-controlled information processed through the Platform. Firmity keeps personal data only for as long as the purpose needs, or the law requires, as set out in the Privacy Policy, and some records, such as accounting records, security logs, and records needed for legal claims, are kept for longer periods fixed by law.</p>
              </TermsSection>
            </Reveal>

            {/* 15. Disclaimer of Warranties */}
            <Reveal>
              <TermsSection number="15" heading="Disclaimer of Warranties">
                <p>To the fullest extent permitted by applicable law, the Platform is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, whether express, implied, statutory, or otherwise. Firmity expressly disclaims all warranties including merchantability, fitness for a particular purpose, non-infringement, uninterrupted availability, accuracy, reliability, and suitability for any specific use case.</p>
              </TermsSection>
            </Reveal>

            {/* 16. Limitation of Liability */}
            <Reveal>
              <TermsSection number="16" heading="Limitation of Liability">
                <p>Firmity shall not be liable for any indirect, incidental, special, punitive, exemplary, or consequential damages, including loss of profits, revenue, business opportunities, goodwill, data, anticipated savings, or business interruption arising from or relating to the Platform.</p>
              </TermsSection>
            </Reveal>

            {/* 17. Indemnification */}
            <Reveal>
              <TermsSection number="17" heading="Indemnification">
                <p>Customers agree to indemnify, defend, and hold harmless Ufirm Technologies Private Limited, its directors, officers, employees, affiliates, contractors, licensors, and representatives from and against any claims, damages, liabilities, penalties, fines, costs, or expenses arising from customer data, unlawful Platform use, regulatory non-compliance, employment disputes, privacy violations, infringement claims, or breaches of these Terms.</p>
              </TermsSection>
            </Reveal>

            {/* 18. Changes to the Platform and Terms */}
            <Reveal>
              <TermsSection number="18" heading="Changes to the Platform and Terms">
                <p>Firmity reserves the right to modify, update, replace, suspend, discontinue, or enhance the Platform, its features, functionality, integrations, interfaces, and services at any time. Firmity may also revise these Terms periodically. Updated Terms will become effective upon publication on the Platform unless otherwise stated.</p>
              </TermsSection>
            </Reveal>

            {/* 19. Governing Law and Jurisdiction */}
            <Reveal>
              <TermsSection number="19" heading="Governing Law and Jurisdiction">
                <p>These Terms shall be governed by and construed in accordance with the laws of India. Any dispute arising out of or relating to these Terms or the use of the Platform shall be subject to the exclusive jurisdiction of the competent courts located in Uttar Pradesh, India.</p>
              </TermsSection>
            </Reveal>

            {/* 20. Contact Information */}
            <Reveal>
              <TermsSection number="20" heading="Contact Information">
                <div className="bg-[#eef3f9] border border-[#dbe5f0] rounded-[20px] p-6 mt-2 not-prose">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
                    <div>
                      <p className="font-semibold text-[#1a202c] mb-1">Ufirm Technologies Private Limited</p>
                      <p className="text-[#4a5568]">Brand Name: Firmity</p>
                      <p className="text-[#4a5568]">Website: <a href="https://www.firmity.in" className="text-[#2b6cb0] hover:underline">www.firmity.in</a></p>
                      <p className="text-[#4a5568]">Support: <a href="mailto:support@firmity.in" className="text-[#2b6cb0] hover:underline">support@firmity.in</a></p>
                      <p className="text-[#4a5568]">Sales: <a href="mailto:sales@firmity.in" className="text-[#2b6cb0] hover:underline">sales@firmity.in</a>
                      </p>
                      <p className="text-[#4a5568]">M: +91 92173 40884, +91 97970 39690</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1a202c] mb-1">Sanjeev Kumar</p>
                      <p className="text-[#4a5568]">Grievance Officer and DPO</p>
                      <p className="text-[#4a5568]">Ufirm Technologies Private Limited</p>
                      <p className="text-[#4a5568]">Sector-63 H-64 Noida</p>
                      <p className="text-[#4a5568]">Email: <a href="mailto:dpo@firmity.in" className="text-[#2b6cb0] hover:underline">dpo@firmity.in</a></p>
                      <p className="text-[#4a5568]">M: +91 98689 99648</p>
                      <p className="text-[#4a5568]">Hours: Monday to Friday, 10:00 to 18:00 IST</p>
                    </div>
                  </div>
                </div>
              </TermsSection>
            </Reveal>

          </div>
        </article>

        {/* ── RELATED LINKS ── */}
        <section className="bg-[#114dac]">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#63b3ed] uppercase mb-1 sm:mb-0 sm:self-center">Related policies</p>
              <Link href="/privacy" className="text-white/70 hover:text-white text-[13px] font-light transition-colors hover:underline">
                Privacy Policy →
              </Link>
              <Link href="/cookie-policy" className="text-white/70 hover:text-white text-[13px] font-light transition-colors hover:underline">
                Cookie Policy →
              </Link>
              <Link href="/modern-slavery-statement" className="text-white/70 hover:text-white text-[13px] font-light transition-colors hover:underline">
                Modern Slavery Statement →
              </Link>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#2b6cb0] hover:bg-[#2563a8] text-white text-[12.5px] font-semibold px-6 py-2.5 rounded-xl transition-all hover:shadow-[0_8px_24px_rgba(43,108,176,0.4)]"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TermsSection({ number, heading, children }: { number: string; heading: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-start gap-4 mb-4">
        <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#eef3f9] border border-[#dbe5f0] flex items-center justify-center text-[11px] font-semibold text-[#2b6cb0]">
          {number}
        </span>
        <h2 className="font-serif text-[clamp(1.1rem,2vw,1.3rem)] font-light text-[#1a202c] tracking-tight pt-1">
          {heading}
        </h2>
      </div>
      <div className="ml-12 space-y-3 text-[13.5px] font-light text-[#4a5568] leading-[1.85] [&_ul]:space-y-1.5 [&_ul]:list-disc [&_ul]:pl-5 [&_p]:text-[13.5px]">
        {children}
      </div>
    </section>
  )
}
