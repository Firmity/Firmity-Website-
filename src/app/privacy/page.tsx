// ─── Privacy Policy Page ──────────────────────────────────────────────────────
// Content sourced from: privacypolicy.docx (14-clause Privacy Policy), reproduced verbatim.
// Do not add, remove or reword policy text here. Deliberate differences from the document:
// the Support/Sales details, the Cookie Policy links, the live "Cookie settings" link, the
// effective date (same as Terms), and the two clause cross-references corrected to 12 and 13.
// Last Updated: 10-06-2026
// The previous 19-section policy is kept below as commented-out JSX
// (search "PREVIOUS POLICY"). It is not rendered.
// Design language: dark navy hero, serif display, DM Sans body, 12/20px radii.

import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Reveal } from "@/src/components/reveal"
import { CookieSettingsLink } from "@/src/components/cookie-consent"
import Link from "next/link"
import { Cookie, Mail, Shield } from "lucide-react"

// ─── Section data ─────────────────────────────────────────────────────────────

interface Section {
  id: string
  heading: string
  content: React.ReactNode
}

interface CollectionRow {
  category: string
  examples: string
  source: string
  purpose: string
  ground: string
}

// Clause 2 table. Kept as data so the table markup stays a single loop.
const COLLECTION_ROWS: CollectionRow[] = [
  {
    category: "Website and enquiry data",
    examples: "Name, work email, phone, company, role, messages, cookie identifiers",
    source: "You, your browser",
    purpose: "Reply to you, arrange demos, improve the website",
    ground: "Your voluntary request (Section 7(a)); consent for marketing and non-essential cookies",
  },
  {
    category: "Customer contacts and administrators",
    examples: "Name, work email, phone, role, billing details, support tickets",
    source: "The customer and you",
    purpose: "Contract administration, billing, support, security notices",
    ground: "Your voluntary provision for contract purposes (Section 7(a))",
  },
  {
    category: "Platform security data",
    examples: "IP address, device type, log-in times, audit logs",
    source: "Automatically",
    purpose: "Secure the Platform, detect misuse, meet CERT-In log duties",
    ground:
      "Security duty (Section 8(5)); disclosure to CERT-In and authorities where law requires (Section 7(d)); notice at log-in",
  },
  {
    category: "Job candidates",
    examples: "CV, contact details, education, work history, interview and assessment notes",
    source: "You, referees, verification agencies",
    purpose: "Recruitment and verification",
    ground: "Your consent",
  },
  {
    category: "Employees and contractors",
    examples:
      "Identity and address details, bank and tax details, attendance, appraisal and leave records, emergency contact",
    source: "You, our systems",
    purpose: "Employment, payroll, statutory compliance, security",
    ground: "Employment purposes (Section 7(i)); consent for optional uses",
  },
  {
    category: "Biometric data (staff only, optional)",
    examples: "Encrypted facial Biometric Template",
    source: "You",
    purpose: "Attendance verification",
    ground: "Your written consent",
  },
  {
    category: "Vendors and advisers",
    examples: "Contact and bank details, contract records",
    source: "You",
    purpose: "Procurement and payment",
    ground: "Voluntary provision for contract purposes (Section 7(a))",
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="bg-white">
        {/* ── HERO ── */}
        <section className="bg-[#114dac] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 60% 40%, #2b6cb0 0%, transparent 55%), radial-gradient(circle at 20% 80%, #1a2744 0%, transparent 50%)" }}
            aria-hidden="true"
          />
          <div className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-16">
            <Reveal>
              <div className="flex items-center gap-3 mb-3">
                <Shield size={14} className="text-[#63b3ed]" strokeWidth={1.5} />
                <span className="text-[#63b3ed] text-[10px] font-semibold tracking-[0.2em] uppercase">Legal</span>
              </div>
              <h1 className="font-serif text-[clamp(1.8rem,4vw,2.6rem)] font-light text-[#f0f4f8] leading-tight tracking-tight">
                Privacy Policy
              </h1>
              <p className="text-[13px] font-light text-white/[0.45] mt-2">
                Last Updated: 10 June 2026
              </p>
              <p className="text-[13px] font-light text-white/[0.45] mt-1">
                Document control: Version 1.0 &nbsp;·&nbsp; Effective 1 March 2026.
              </p>
              <p className="text-[13px] font-light text-white/[0.45] mt-1">
                Reviewed: annually, or on change of purpose, vendor or law.
              </p>
              <p className="text-[13.5px] font-light text-white/[0.5] leading-[1.85] max-w-2xl mt-4">
                This Privacy Policy explains how{" "}
                <strong className="font-semibold text-white/70">Ufirm Technologies Private Limited</strong>,
                which operates the Firmity platform (&ldquo;Firmity&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;),
                collects, uses, shares, stores and protects personal data. It is published to meet Section 5 of the
                Digital Personal Data Protection Act, 2023 (the &ldquo;DPDP Act&rdquo;), the DPDP Rules, 2025,
                Section 43A of the Information Technology Act, 2000, and Rule 4 of the SPDI Rules, 2011.
              </p>
              <p className="mt-5">
                <Link
                  href="/cookie-policy"
                  className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-[#63b3ed] hover:text-white transition-colors"
                >
                  <Cookie size={13} strokeWidth={1.6} aria-hidden="true" /> Cookie Policy →
                </Link>
              </p>
              {/* PREVIOUS POLICY — old hero intro (not rendered):
              <p className="text-[13.5px] font-light text-white/[0.5] leading-[1.85] max-w-2xl mt-4">
                Firmity is a Software-as-a-Service (SaaS) platform owned and operated by{" "}
                <strong className="font-semibold text-white/70">Ufirm Technologies Private Limited</strong>{" "}
                (&ldquo;Firmity&rdquo;, &ldquo;Ufirm&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;).
                This Privacy Policy explains how we collect, process, store, use, disclose and protect
                information when customers, employees, contractors, visitors, facility managers, clients
                and other authorised users access or use the Platform.
              </p>
              */}
            </Reveal>
          </div>
        </section>

        {/* ── CONTENT ── */}
        <article className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-14 lg:py-20">
          <div className="space-y-12">

            {/* 1. Our two roles */}
            <Reveal>
              <PolicySection number="1" heading="Our two roles">
                <Clause n="1.1">
                  <strong className="font-semibold text-[#1a202c]">As Data Fiduciary</strong>, we decide why and how we
                  process data about our own staff, job candidates, website visitors, prospects, vendors and the
                  business contacts of our customers. This Policy covers that data.
                </Clause>
                <Clause n="1.2">
                  <strong className="font-semibold text-[#1a202c]">As Data Processor</strong>, we process data on behalf
                  of our customers who use Firmity, such as their employees, visitors and tenants. In that case the
                  customer is the Data Fiduciary and we act only on its documented instructions. If you are one of those
                  individuals, please read your organisation&apos;s privacy notice, and send requests about that data to
                  that organisation (see clause 12).
                </Clause>
              </PolicySection>
            </Reveal>

            {/* 2. What we collect, why, and on what ground */}
            <Reveal>
              <PolicySection number="2" heading="What we collect, why, and on what ground">
                <div className="overflow-x-auto rounded-[20px] border border-[#dbe5f0] not-prose">
                  <table className="w-full min-w-[760px] text-left text-[12.5px] leading-[1.6] border-collapse">
                    <thead>
                      <tr className="bg-[#eef3f9] text-[#1a202c]">
                        <th scope="col" className="px-4 py-3 font-semibold">Category</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Examples</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Source</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Purpose</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Ground</th>
                      </tr>
                    </thead>
                    <tbody>
                      {COLLECTION_ROWS.map((row) => (
                        <tr key={row.category} className="border-t border-[#dbe5f0] align-top text-[#4a5568]">
                          <th scope="row" className="px-4 py-3 font-semibold text-[#1a202c]">{row.category}</th>
                          <td className="px-4 py-3">{row.examples}</td>
                          <td className="px-4 py-3">{row.source}</td>
                          <td className="px-4 py-3">{row.purpose}</td>
                          <td className="px-4 py-3">{row.ground}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Clause n="2.1">
                  <strong className="font-semibold text-[#1a202c]">Sensitive data.</strong> Biometric data is
                  &ldquo;sensitive personal data&rdquo; under the SPDI Rules. We collect it only with your written
                  consent, and we explain it in clause 8.
                </Clause>
                <Clause n="2.2">
                  <strong className="font-semibold text-[#1a202c]">No sale.</strong> We do not sell personal data. We do
                  not use it to make solely automated decisions with legal effect on you.
                </Clause>
              </PolicySection>
            </Reveal>

            {/* 3. Who we share data with */}
            <Reveal>
              <PolicySection number="3" heading="Who we share data with">
                <Clause n="3.1">
                  We share personal data only as needed, with: (a) service providers who process data for us under
                  written contracts, including cloud hosting providers in India regions (such as Amazon Web Services or
                  Google Cloud), SMS and email gateways, payroll, background-verification and recruitment providers, and
                  IT support; (b) professional advisers, auditors and insurers; (c) courts, regulators, CERT-In,
                  law-enforcement and other authorities, when the law requires or permits; (d) a buyer or successor in a
                  merger, acquisition or reorganisation, on the same protections; and (e) our customers, where we process
                  your data for them as their processor.
                </Clause>
                <Clause n="3.2">
                  We keep a current list of the processors we use and will give it to you on request.
                </Clause>
              </PolicySection>
            </Reveal>

            {/* 4. Where your data is stored */}
            <Reveal>
              <PolicySection number="4" heading="Where your data is stored">
                <Clause n="4.1">
                  We host data in India by default. We transfer personal data outside India only to a country that the
                  Central Government has not restricted under Section 16 of the DPDP Act, and only under written terms
                  that protect it.
                </Clause>
              </PolicySection>
            </Reveal>

            {/* 5. Cookies */}
            <Reveal>
              <PolicySection number="5" heading="Cookies">
                <Clause n="5.1">
                  Essential cookies keep the website working and do not need consent. Analytics and marketing cookies are
                  used only if you consent through the cookie banner, and you can change your choice at any time from{" "}
                  <CookieSettingsLink />.
                </Clause>
              </PolicySection>
            </Reveal>

            {/* 6. How we protect data */}
            <Reveal>
              <PolicySection number="6" heading="How we protect data">
                <Clause n="6.1">
                  We take reasonable security safeguards as Section 8(5) of the DPDP Act and Rule 8 of the SPDI Rules
                  require, including encryption in transit (TLS 1.2 or higher) and at rest (AES-256), role-based access
                  with multi-factor authentication for administrators, activity logging and monitoring, regular security
                  testing, vendor due diligence, and staff training.
                </Clause>
                <Clause n="6.2">
                  No system is completely secure, and we cannot guarantee absolute security. If a personal data breach
                  affects you, we will notify the Data Protection Board of India and affected persons in the way the law
                  requires, and cooperate with CERT-In.
                </Clause>
              </PolicySection>
            </Reveal>

            {/* 7. How long we keep data */}
            <Reveal>
              <PolicySection number="7" heading="How long we keep data">
                <Clause n="7.1">
                  We keep personal data only for as long as the purpose needs, or the law requires, as set out in our Data
                  Retention and Disposal Policy. When that period ends, we erase or irreversibly anonymise it. Some
                  records, such as accounting records, security logs and records needed for legal claims, are kept for
                  longer periods fixed by law.
                </Clause>
              </PolicySection>
            </Reveal>

            {/* 8. Biometric data */}
            <Reveal>
              <PolicySection number="8" heading="Biometric data">
                <Clause n="8.1">
                  If you choose facial-recognition attendance, we convert your face into an encrypted mathematical
                  Biometric Template protected with AES-256 and do not store your raw facial image for this purpose. We
                  use the template only to verify your attendance, and delete it within 30 days after you withdraw
                  consent or leave. A manual alternative is always available, and choosing it carries no penalty.
                </Clause>
              </PolicySection>
            </Reveal>

            {/* 9. Your rights */}
            <Reveal>
              <PolicySection number="9" heading="Your rights">
                <Clause n="9.1">
                  Under the DPDP Act, you may ask us for: (a) a summary of your personal data we process, our processing
                  activities, and the identities of those we have shared it with (Section 11); (b) correction, completion
                  and updating of your data (Section 12); (c) erasure of data no longer needed for its purpose, unless the
                  law requires us to keep it (Section 12); (d) redress of a grievance (Section 13); and (e) nomination of
                  another person to exercise your rights if you die or become incapacitated (Section 14). You may also
                  withdraw any consent you gave, at any time.
                </Clause>
                <Clause n="9.2">
                  <strong className="font-semibold text-[#1a202c]">How to ask.</strong> Write to the Grievance Officer in
                  clause 13, stating your name, how you deal with us and what you want. We will acknowledge within 7 days,
                  ask you for information needed to verify your identity, and respond within 30 days, and in any case
                  within the period set by the DPDP Rules, which we will not exceed.
                </Clause>
                <Clause n="9.3">
                  <strong className="font-semibold text-[#1a202c]">When we may decline.</strong> We may decline or limit a
                  request where we cannot reasonably verify your identity or authority; where the data is needed to comply
                  with a law, to establish, exercise or defend legal claims, or to keep a security record; where granting
                  it would disclose another person&apos;s personal data; or where an exemption under Section 17 of the
                  DPDP Act applies. We will tell you the reason and how to complain.
                </Clause>
              </PolicySection>
            </Reveal>

            {/* 10. Your duties */}
            <Reveal>
              <PolicySection number="10" heading="Your duties">
                <Clause n="10.1">
                  Under Section 15 of the DPDP Act you must comply with the law, not impersonate another person, not
                  suppress material information when giving your data, not file a false or frivolous grievance or
                  complaint, and give only verifiably authentic information with a request for correction or erasure. A
                  breach of these duties may attract a penalty from the Data Protection Board of India.
                </Clause>
              </PolicySection>
            </Reveal>

            {/* 11. Updates to this Policy */}
            <Reveal>
              <PolicySection number="11" heading="Updates to this Policy">
                <Clause n="11.1">
                  We may update this Policy to reflect changes in our practices or the law. We will post the new version
                  with its date, and notify you directly of material changes, and where a change needs fresh consent we
                  will ask for it.
                </Clause>
              </PolicySection>
            </Reveal>

            {/* 12. Data we process for customers */}
            <Reveal>
              <PolicySection number="12" heading="Data we process for customers">
                <Clause n="12.1">
                  If your data is in Firmity because a customer uses it (for example, as an employee, visitor or tenant of
                  that customer), we process it only on that customer&apos;s instructions. Send your requests to that
                  customer. If you send them to us, we will pass them to the customer where we can identify it, and will
                  not respond on the merits unless the law requires.
                </Clause>
              </PolicySection>
            </Reveal>

            {/* 13. Grievance Officer and complaints */}
            <Reveal>
              <PolicySection number="13" heading="Grievance Officer and complaints">
                <Clause n="13.1">
                  <strong className="font-semibold text-[#1a202c]">Grievance Officer and Data Protection Officer</strong>
                </Clause>
                <div className="bg-[#eef3f9] border border-[#dbe5f0] rounded-[20px] p-6 mt-2 not-prose">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
                    <div>
                      <p className="font-semibold text-[#1a202c] mb-1">Sanjeev Kumar</p>
                      <p className="text-[#4a5568]">Grievance Officer and DPO</p>
                      <p className="text-[#4a5568]">Ufirm Technologies Private Limited</p>
                      <p className="text-[#4a5568]">Sector-63 H-64 Noida</p>
                      <p className="text-[#4a5568]">Email: <a href="mailto:dpo@firmity.in" className="text-[#2b6cb0] hover:underline">dpo@firmity.in</a></p>
                      <p className="text-[#4a5568]">M: +91 98689 99648</p>
                      <p className="text-[#4a5568]">Hours: Monday to Friday, 10:00 to 18:00 IST</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1a202c] mb-1">Support</p>
                      <p className="text-[#4a5568] mb-1">Support: <a href="mailto:support@firmity.in" className="text-[#2b6cb0] hover:underline">support@firmity.in</a></p>
                      <p className="font-semibold text-[#1a202c] mb-0">Talk to sales</p>
                      <p className="text-[#4a5568]">Sales: <a href="mailto:sales@firmity.in" className="text-[#2b6cb0] hover:underline">sales@firmity.in</a></p>
                      <p className="text-[#4a5568]">M: +91 92173 40884, +91 97970 39690</p>
                    </div>
                  </div>
                </div>
                <Clause n="13.2">
                  If we do not resolve your grievance within the period above, or you are not satisfied, you may complain
                  to the Data Protection Board of India, after first using this process (Section 13(3) of the DPDP Act).
                </Clause>
              </PolicySection>
            </Reveal>

            {/* 14. Governing law */}
            <Reveal>
              <PolicySection number="14" heading="Governing law">
                <Clause n="14.1">
                  This Policy is governed by the laws of India. Subject to your rights before the Data Protection Board of
                  India and any other forum the law gives you, the courts at Uttar Pradesh have jurisdiction over disputes
                  about it.
                </Clause>
              </PolicySection>
            </Reveal>

            {/* PREVIOUS POLICY — preamble and sections 1–19 (including "AI-Powered Features"), not rendered.
               Original preamble card:
          <Reveal>
            <div className="bg-[#eef3f9] border border-[#dbe5f0] rounded-[20px] p-6 mb-12">
              <p className="text-[13px] font-light text-[#4a5568] leading-[1.85]">
                Firmity provides cloud-based Computerized Maintenance Management System (CMMS), Human Resource
                Management System (HRMS), Facility Management, Asset Management, Inventory Management,
                Complaint Management, Payroll Management, Attendance Management, Visitor Management and related
                operational software services through its website, web platform, mobile applications, APIs and
                associated services (collectively referred to as the &ldquo;Platform&rdquo;).
              </p>
            </div>
          </Reveal>

               Original sections:
            [1. Our Role]
            <Reveal>
              <PolicySection number="1" heading="Our Role">
                <p>For most customer data processed through the Platform:</p>
                <ul>
                  <li>The Customer organisation remains the Data Controller and owner of Customer Data.</li>
                  <li>Firmity acts as a Data Processor and processes such information solely for providing Platform services.</li>
                  <li>Customers are responsible for obtaining any necessary notices, permissions or consents from their employees, contractors, visitors or other users.</li>
                </ul>
              </PolicySection>
            </Reveal>

            [2. Information We Collect]
            <Reveal>
              <PolicySection number="2" heading="Information We Collect">
                <SubHeading>A. Account Information</SubHeading>
                <p>We may collect full name, email address, mobile number, company name, department, designation, user role, login credentials.</p>
                <SubHeading>B. Employee Information</SubHeading>
                <p>Depending on customer configuration: employee ID, employment records, attendance records, leave records, shift records, payroll records, salary details, bank account information, emergency contacts, employee documents, employment status information.</p>
                <SubHeading>C. Facility and Operational Information</SubHeading>
                <p>The Platform may process facility details, site information, buildings and locations, asset records, inventory records, vendor records, maintenance records, work orders, complaint records, inspection records, incident reports, budget and expense records.</p>
                <SubHeading>D. Visitor Information</SubHeading>
                <p>Where enabled by the customer: visitor name, contact information, entry and exit records, visit purpose, host details, visitor photographs.</p>
                <SubHeading>E. Attendance and Location Information</SubHeading>
                <p>Where enabled by the customer: check-in and check-out records, attendance logs, geolocation information, geo-fencing validation data, time and date stamps.</p>
                <SubHeading>F. Biometric Information</SubHeading>
                <p>Where enabled by the customer, Firmity may process biometric attendance information including facial recognition templates solely for attendance verification and workforce management purposes.</p>
                <p>Firmity does not sell, market, profile, or commercially exploit biometric information. Biometric information is encrypted and protected using industry-standard security controls.</p>
                <SubHeading>G. Complaint and Communication Data</SubHeading>
                <p>The Platform may process information relating to complaints, service requests, incidents, feedback, and operational communications submitted by users or generated during the resolution process. Such information may include complaint descriptions, photographs and other supporting evidence, internal notes, communication records, status updates, resolution details, feedback, satisfaction ratings, and any related documentation. This information is processed solely for service delivery, quality assurance, reporting, compliance, audit, and continuous improvement purposes.</p>
                <SubHeading>H. Technical Information</SubHeading>
                <p>Firmity automatically collects certain technical, diagnostic, and usage information generated through the use of the Platform. This may include IP addresses, browser and device information, operating system details, network information, application logs, session identifiers, access records, performance metrics, crash reports, and user interaction analytics. Such information is used for system administration, security monitoring, authentication, performance optimisation, product improvement, compliance, and audit purposes.</p>
              </PolicySection>
            </Reveal>

            [3. How We Collect Information]
            <Reveal>
              <PolicySection number="3" heading="How We Collect Information">
                <p>Information processed by Firmity may be obtained directly from users, provided by customer organisations, or generated through the operation of the Platform. We may collect information through user registrations, web and mobile applications, attendance systems, QR code interactions, complaint submissions, asset and facility management activities, APIs, authorised third-party integrations, cookies, analytics technologies, and automated system logs. In certain cases, information may also be imported from external systems or supplied by customers to facilitate service delivery, operational management, reporting, security, compliance, and platform administration.</p>
              </PolicySection>
            </Reveal>

            [4. Purpose of Processing]
            <Reveal>
              <PolicySection number="4" heading="Purpose of Processing">
                <p>Firmity processes information for legitimate business and operational purposes, including providing, maintaining, and improving the Platform and its services. Information may be used to manage maintenance operations, workforce administration, attendance and payroll processing, asset and inventory management, visitor management, complaint resolution, reporting and analytics, user authentication, customer support, workflow automation, system administration, fraud prevention, security monitoring, compliance management, and the fulfilment of contractual and legal obligations. We may also use information to enhance platform performance, develop new features, improve user experience, and ensure the reliability, integrity, and security of the Platform.</p>
              </PolicySection>
            </Reveal>

            [5. Location Data]
            <Reveal>
              <PolicySection number="5" heading="Location Data">
                <p>Where enabled by a customer, Firmity may collect, process, and store location-related information to facilitate attendance validation, geo-fencing enforcement, site presence verification, authorised facility access, workforce management, operational monitoring, and other business workflows supported by the Platform. Location information is collected only in connection with authorised platform functions and only to the extent necessary for providing the relevant services. Such information is processed in accordance with applicable laws, customer instructions, and Firmity&apos;s security and privacy obligations, and is not used for advertising, profiling, or unrelated tracking purposes.</p>
              </PolicySection>
            </Reveal>

            [6. Camera Access]
            <Reveal>
              <PolicySection number="6" heading="Camera Access">
                <p>Where camera access is requested by the Firmity mobile application, users are informed of:</p>
                <ul>
                  <li>Why camera permission is required.</li>
                  <li>That access is user-initiated.</li>
                  <li>That there is no background recording.</li>
                  <li>How captured information is used.</li>
                </ul>
              </PolicySection>
            </Reveal>

            [7. AI-Powered Features]
            <Reveal>
              <PolicySection number="7" heading="AI-Powered Features">
                <p>Firmity may develop, deploy, and enhance artificial intelligence (&ldquo;AI&rdquo;), machine learning, predictive analytics, and automation capabilities within the Platform to improve operational efficiency, user experience, reporting, workflow management, complaint handling, maintenance planning, resource allocation, and business insights. These features may analyse customer-provided and operational data to generate classifications, recommendations, forecasts, trends, alerts, summaries, or other informational outputs.</p>
                <p>AI-generated content is provided on an &ldquo;as-is&rdquo; and advisory basis and may not always be accurate, complete, or suitable for a particular purpose. Such outputs are intended to assist users and must not be relied upon as the sole basis for operational, legal, employment, financial, regulatory, safety-related, or business decisions. Customer organisations and users remain solely responsible for reviewing, verifying, and evaluating all AI-generated outputs before taking any action based upon them.</p>
              </PolicySection>
            </Reveal>

            [8. Cookies and Analytics]
            <Reveal>
              <PolicySection number="8" heading="Cookies and Analytics">
                <p>Firmity uses cookies, web beacons, local storage, and similar technologies to operate, secure, and improve the Platform. These technologies help us maintain user sessions, authenticate users, remember preferences, analyse Platform usage, monitor performance, enhance security, detect fraudulent or unauthorised activity, and improve the overall user experience.</p>
                <p>Some cookies may be essential for the proper functioning of the Platform and cannot be disabled without affecting certain features or services. Users may control or restrict cookies through their browser or device settings; however, doing so may impact the availability or functionality of certain Platform features. Firmity may publish and update a separate Cookie Policy from time to time, which shall form part of and be read together with this Privacy Policy.</p>
              </PolicySection>
            </Reveal>

            [9. Sharing of Information]
            <Reveal>
              <PolicySection number="9" heading="Sharing of Information">
                <p>Firmity may disclose information in connection with a merger, acquisition, corporate restructuring, financing transaction, sale of assets, or similar business transaction, provided that appropriate safeguards are implemented to protect the confidentiality and security of such information and the receiving party agrees to honour the obligations described in this Privacy Policy.</p>
                <p>This Privacy Policy is suitable for:</p>
                <ul>
                  <li>Website Privacy Policy</li>
                  <li>Google Play Store submission</li>
                  <li>Enterprise procurement reviews</li>
                  <li>DPDP Act (India) compliance framework</li>
                  <li>Future SOC 2 readiness initiatives</li>
                </ul>
              </PolicySection>
            </Reveal>

            [10. Data Security]
            <Reveal>
              <PolicySection number="10" heading="Data Security">
                <p>Firmity maintains commercially reasonable technical, administrative, and organisational safeguards designed to protect information against unauthorised access, disclosure, alteration, loss, misuse, or destruction. These safeguards may include encryption of data in transit and at rest, role-based access controls, user authentication mechanisms, password protection measures, activity monitoring, audit logging, network security controls, vulnerability management practices, backup and recovery systems, disaster recovery procedures, and other security measures appropriate to the nature of the information processed.</p>
                <p>Access to information is restricted to authorised personnel and service providers who require such access for legitimate business purposes and are subject to confidentiality obligations. While Firmity continuously reviews and enhances its security practices, no method of electronic transmission, storage, or processing can be guaranteed to be completely secure.</p>
              </PolicySection>
            </Reveal>

            [11. Security Incidents]
            <Reveal>
              <PolicySection number="11" heading="Security Incidents">
                <p>Firmity will notify affected customers of confirmed security incidents involving customer data within a reasonable period after discovery.</p>
              </PolicySection>
            </Reveal>

            [12. Data Retention]
            <Reveal>
              <PolicySection number="12" heading="Data Retention">
                <p>Firmity retains personal, operational, and technical information only for as long as reasonably necessary to fulfil the purposes described in this Privacy Policy, provide Platform services, support customer operations, comply with contractual commitments, satisfy legal and regulatory obligations, maintain security and audit records, prevent fraud, resolve disputes, and protect the rights and legitimate interests of Firmity, its customers, and users.</p>
                <p>Retention periods may vary depending on the nature of the information, customer requirements, applicable laws, and operational needs. Upon the expiration of applicable retention periods, information may be securely archived, anonymised, or permanently deleted in accordance with Firmity&apos;s data governance and retention policies. Notwithstanding any deletion request, Firmity may retain certain information where required by law, regulatory requirements, legal proceedings, audit obligations, security investigations, or legitimate business purposes.</p>
              </PolicySection>
            </Reveal>

            [13. User Rights]
            <Reveal>
              <PolicySection number="13" heading="User Rights">
                <p>Depending on the applicable jurisdiction and nature of the information processed, individuals may have the right to access, review, update, correct, delete, restrict, object to, or request portability of their personal information, as well as withdraw consent where consent forms the legal basis for processing.</p>
                <p>Where Firmity processes information on behalf of a customer organisation, such requests should ordinarily be directed to the relevant customer organisation, which remains responsible for determining how such requests are handled. Firmity may assist customer organisations in responding to such requests where required by law or contractual obligations. Requests submitted directly to Firmity will be reviewed and processed in accordance with applicable laws, customer instructions, legal obligations, security requirements, and Firmity&apos;s operational responsibilities.</p>
              </PolicySection>
            </Reveal>

            [14. Data Export and Deletion]
            <Reveal>
              <PolicySection number="14" heading="Data Export and Deletion">
                <p>Customers may request the export of their customer data, closure of their accounts, or deletion of information processed through the Platform, subject to applicable laws, contractual commitments, technical limitations, and verification requirements. Firmity will use commercially reasonable efforts to facilitate such requests in accordance with its obligations as a service provider and data processor.</p>
                <p>Following account closure, service termination, or deletion requests, certain information may remain temporarily stored in backups, disaster recovery systems, archives, logs, and security records as part of normal business continuity and operational processes. Firmity may also retain information where necessary to comply with applicable legal, regulatory, tax, accounting, audit, security, fraud prevention, contractual, or dispute resolution requirements, or to establish, exercise, or defend legal claims.</p>
              </PolicySection>
            </Reveal>

            [15. Google Play Data Safety]
            <Reveal>
              <PolicySection number="15" heading="Google Play Data Safety Disclosure">
                <p>The Firmity mobile application may collect:</p>
                <ul>
                  <li>User account information</li>
                  <li>Attendance information</li>
                  <li>Operational records</li>
                  <li>Location data</li>
                  <li>Device information</li>
                  <li>Photographs</li>
                  <li>Usage analytics</li>
                </ul>
                <p>Data is used solely to provide Platform services, improve functionality, maintain security and comply with customer requirements. Data is encrypted during transmission and storage. Users may request deletion through their organisation administrator or by contacting Firmity.</p>
              </PolicySection>
            </Reveal>

            [16. Children's Privacy]
            <Reveal>
              <PolicySection number="16" heading="Children's Privacy">
                <p>Firmity is intended for business and organisational use and is not directed toward individuals under eighteen (18) years of age.</p>
              </PolicySection>
            </Reveal>

            [17. International Data Transfers]
            <Reveal>
              <PolicySection number="17" heading="International Data Transfers">
                <p>Firmity primarily stores and processes information within India. However, in connection with cloud hosting, infrastructure services, customer support, disaster recovery, security operations, authorised integrations, or other legitimate business purposes, information may be transferred to, stored in, or processed in jurisdictions outside India.</p>
                <p>Where such cross-border transfers occur, Firmity will implement appropriate contractual, technical, organisational, and security safeguards designed to protect information in accordance with applicable laws, regulatory requirements, industry standards, and this Privacy Policy.</p>
              </PolicySection>
            </Reveal>

            [18. Changes to this Policy]
            <Reveal>
              <PolicySection number="18" heading="Changes to This Policy">
                <p>We may revise this Privacy Policy from time to time. Updated versions will be published on the Firmity website and become effective upon publication unless otherwise stated.</p>
              </PolicySection>
            </Reveal>

            [19. Contact Information]
            <Reveal>
              <PolicySection number="19" heading="Contact Information">
                <div className="bg-[#eef3f9] border border-[#dbe5f0] rounded-[20px] p-6 mt-2 not-prose">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
                    <div>
                      <p className="font-semibold text-[#1a202c] mb-1">Ufirm Technologies Private Limited</p>
                      <p className="text-[#4a5568]">Brand Name: Firmity</p>
                      <p className="text-[#4a5568]">Website: <a href="https://www.firmity.in" className="text-[#2b6cb0] hover:underline">www.firmity.in</a></p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1a202c] mb-1">Support</p>
                      <p className="text-[#4a5568] mb-1">Support: <a href="mailto:support@firmity.in" className="text-[#2b6cb0] hover:underline">support@firmity.in</a></p>
                      <p className="font-semibold text-[#1a202c] mb-0">Talk to sales</p>
                      <p className="text-[#4a5568]">Sales: <a href="mailto:sales@firmity.in" className="text-[#2b6cb0] hover:underline">sales@firmity.in</a>
                      </p>
                      <p className="text-[#4a5568]">M: +91 92173 40884, +91 97970 39690</p>
                      <p className="text-[#4a5568] mt-2 font-semibold">Data Protection Officer</p>
                      <p className="text-[#4a5568]"><a href="mailto:dpo@firmity.in" className="text-[#2b6cb0] hover:underline">dpo@firmity.in</a></p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1a202c] mb-1">Grievance Officer</p>
                      <p className="text-[#4a5568]">Mr. Sanjeev Kumar</p>
                      <p className="text-[#4a5568]">M: +91 9868999648</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1a202c] mb-1">Registered Office</p>
                      <p className="text-[#4a5568]">A-13/ S-1, Dilshad Garden,<br />Delhi – 110095</p>
                    </div>
                  </div>
                </div>
              </PolicySection>
            </Reveal>
            */}

          </div>
        </article>

        {/* ── RELATED LINKS ── */}
        <section className="bg-[#114dac]">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#63b3ed] uppercase mb-1 sm:mb-0 sm:self-center">Related policies</p>
              <Link href="/terms" className="text-white/70 hover:text-white text-[13px] font-light transition-colors hover:underline">
                Terms &amp; Conditions →
              </Link>
              <Link href="/cookie-policy" className="text-white/70 hover:text-white text-[13px] font-light transition-colors hover:underline">
                Cookie Policy →
              </Link>
              <Link href="/modern-slavery-statement" className="text-white/70 hover:text-white text-[13px] font-light transition-colors hover:underline">
                Modern Slavery Statement →
              </Link>
            </div>
            <a
              href="mailto:dpo@firmity.in"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-[12.5px] font-light border border-white/[0.18] hover:border-white/[0.45] px-5 py-2.5 rounded-xl transition-all"
            >
              <Mail size={13} /> Contact DPO
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PolicySection({ number, heading, children }: { number: string; heading: string; children: React.ReactNode }) {
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

// Numbered sub-clause (e.g. 1.1). Hanging number keeps long clauses scannable.
function Clause({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="flex-shrink-0 w-9 text-[12px] font-semibold text-[#2b6cb0] pt-px">{n}</span>
      <p className="flex-1">{children}</p>
    </div>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-semibold text-[#1a202c] text-[13px] mt-4 mb-1">{children}</p>
  )
}
