// Modern Slavery Statement Page
// Written in Firmity's own words, structured to match the Privacy Policy and
// Terms & Conditions pages (dark navy hero, serif display, DM Sans body,
// 12/20px radii, numbered PolicySection style blocks).

import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Reveal } from "@/src/components/reveal"
import Link from "next/link"
import { Mail, ShieldCheck, ChevronDown } from "lucide-react"
import { JsonLd } from "@/src/components/json-ld"
import { faqJsonLd } from "@/src/lib/seo"

// Section ids double as anchor targets for the "On this page" jump list below
// and give Google clean, human readable fragment targets to link to directly
// from search results, instead of leaving every section unaddressable.
const SECTIONS = [
  { id: "our-commitment", number: "1", heading: "Our Commitment" },
  { id: "about-firmity", number: "2", heading: "About Firmity" },
  { id: "our-supply-chains", number: "3", heading: "Our Supply Chains" },
  { id: "recruitment-and-employment", number: "4", heading: "Recruitment and Employment Practices" },
  { id: "due-diligence-and-risk-assessment", number: "5", heading: "Due Diligence and Risk Assessment" },
  { id: "working-with-partners-and-vendors", number: "6", heading: "Working with Partners and Vendors" },
  { id: "raising-a-concern", number: "7", heading: "Raising a Concern" },
  { id: "training-and-awareness", number: "8", heading: "Training and Awareness" },
  { id: "reviewing-this-statement", number: "9", heading: "Reviewing This Statement" },
  { id: "approval-and-contact", number: "10", heading: "Approval and Contact" },
] as const

// Targets the long tail, question shaped searches around this page (Google's
// People Also Ask and AI Overview surfaces) and earns an FAQPage rich result,
// same pattern as /cafm-software's own FAQ block (see faqJsonLd in lib/seo).
const FAQS = [
  {
    q: "Does Firmity have a Modern Slavery Statement?",
    a: "Yes. This page is Firmity's Modern Slavery Statement, published by Ufirm Technologies Private Limited. It sets out our commitment against forced labour, child labour and human trafficking, and the steps we take across hiring, vendor selection and our supply chains.",
  },
  {
    q: "Is Firmity compliant with the UK Modern Slavery Act 2015?",
    a: "Firmity is not required to file a statement under the UK Modern Slavery Act 2015, but we publish this statement voluntarily, in the same spirit as that framework, because many of our customers and partners expect the organisations they work with to be transparent about these risks.",
  },
  {
    q: "How do I report a concern about modern slavery or human trafficking connected to Firmity?",
    a: "Contact our Grievance Officer using the details in the Approval and Contact section of this page. Concerns may be raised in confidence and anyone who reports a concern in good faith will not face retaliation.",
  },
  {
    q: "How often does Firmity review its Modern Slavery Statement?",
    a: "We review this statement at least once a year, and sooner if our business, our supply chains or our understanding of these risks changes in a way that calls for it. Updated versions are published on this page.",
  },
  {
    q: "Who approved Firmity's Modern Slavery Statement?",
    a: "This statement has been reviewed and approved by the leadership of Ufirm Technologies Private Limited, the company behind Firmity.",
  },
]

export default function ModernSlaveryStatementPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <Navigation />
      <main className="bg-white">
        {/* HERO */}
        <section className="bg-[#114dac] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 65% 35%, #2b6cb0 0%, transparent 55%), radial-gradient(circle at 20% 80%, #1a2744 0%, transparent 50%)" }}
            aria-hidden="true"
          />
          <div className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-16">
            <Reveal>
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck size={14} className="text-[#63b3ed]" strokeWidth={1.5} />
                <span className="text-[#63b3ed] text-[10px] font-semibold tracking-[0.2em] uppercase">Legal</span>
              </div>
              <h1 className="font-serif text-[clamp(1.8rem,4vw,2.6rem)] font-light text-[#f0f4f8] leading-tight tracking-tight">
                Modern Slavery Statement
              </h1>
              <p className="text-[13px] font-light text-white/[0.45] mt-2">
                Effective Date: 28 September 2026 &nbsp;&middot;&nbsp; Last Updated: 28 September 2026
              </p>
              <p className="text-[13.5px] font-light text-white/[0.5] leading-[1.85] max-w-2xl mt-4">
                This statement is published by{" "}
                <strong className="font-semibold text-white/70">Ufirm Technologies Private Limited</strong>{" "}
                (&ldquo;Firmity&rdquo;, &ldquo;Ufirm&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;)
                and sets out the steps we take to prevent modern slavery and human trafficking in our own
                operations and across the partners and vendors we work with.
              </p>
            </Reveal>
          </div>
        </section>

        {/* CONTENT */}
        <article className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-14 lg:py-20">
          <Reveal>
            <div className="bg-[#eef3f9] border border-[#dbe5f0] rounded-[20px] p-6 mb-12">
              <p className="text-[13px] font-light text-[#4a5568] leading-[1.85]">
                Firmity provides Computerized Maintenance Management System (CMMS), Human Resource Management
                System (HRMS), facility management and related operational software to organisations across
                India and abroad. We publish this statement voluntarily, in the spirit of frameworks such as the
                United Kingdom Modern Slavery Act 2015, because many of our customers and partners expect the
                organisations they work with to be transparent about how they identify and address the risk of
                exploitation.
              </p>
            </div>
          </Reveal>

          {/* On this page — anchors straight into each section below, so a
              reader (or a Google jump-to-section result) can go straight to
              the part they came for instead of scrolling past everything. */}
          <Reveal>
            <nav aria-label="On this page" className="mb-12">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#2b6cb0] uppercase mb-3">On this page</p>
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-[13px] font-light text-[#4a5568] hover:text-[#2b6cb0] hover:underline transition-colors">
                      {s.number}. {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>

          <div className="space-y-12">

            {/* 1. Our Commitment */}
            <Reveal>
              <StatementSection id="our-commitment" number="1" heading="Our Commitment">
                <p>Firmity does not tolerate modern slavery, forced labour, bonded labour, child labour, human trafficking or any practice that denies a person their freedom, dignity or fair treatment. This applies without exception to our own workforce and to everyone we engage to help deliver our services, including employees, contractors, consultants, vendors and business partners.</p>
              </StatementSection>
            </Reveal>

            {/* 2. About Firmity */}
            <Reveal>
              <StatementSection id="about-firmity" number="2" heading="About Firmity">
                <p>Firmity is owned and operated by Ufirm Technologies Private Limited, a company registered in India with its registered office in Delhi. We build and support a cloud software platform used by facility teams to manage maintenance, assets, inventory, visitors, staff attendance, payroll and related operations. Our team is based primarily in India, and our services are delivered remotely to customers in India and other markets.</p>
              </StatementSection>
            </Reveal>

            {/* 3. Our Supply Chains */}
            <Reveal>
              <StatementSection id="our-supply-chains" number="3" heading="Our Supply Chains">
                <p>As a software company, our supply chains are comparatively small and largely made up of cloud infrastructure and hosting providers, software and API vendors, professional service firms, recruitment agencies, marketing partners and office service providers. We do not operate factories, manufacturing sites or physical goods supply chains, which reduces our direct exposure to the sectors most commonly associated with modern slavery. We remain alert to the risk that exploitation can occur anywhere in a supply chain, including within support services such as facility upkeep, security and logistics that our own customers rely on.</p>
              </StatementSection>
            </Reveal>

            {/* 4. Recruitment and Employment Practices */}
            <Reveal>
              <StatementSection id="recruitment-and-employment" number="4" heading="Recruitment and Employment Practices">
                <p>We hire employees directly and verify the identity, age and right to work of every person who joins our team before their employment begins. We do not charge recruitment or placement fees to candidates, and we do not require employees to hand over identity documents, passports or original certificates as a condition of employment. Employment with Firmity is voluntary, compensation is paid directly to each employee, and any employee may resign with reasonable notice as set out in their employment terms.</p>
              </StatementSection>
            </Reveal>

            {/* 5. Due Diligence and Risk Assessment */}
            <Reveal>
              <StatementSection id="due-diligence-and-risk-assessment" number="5" heading="Due Diligence and Risk Assessment">
                <p>Before we engage a new vendor or service provider, we consider factors such as the nature of the work, the location and size of the provider, and whether the relationship involves manual labour, outsourced staffing or subcontracted workforces, which we treat as areas that call for closer attention. Where a relationship presents a higher likelihood of exploitation risk, we look for evidence that the provider follows applicable labour laws and treats its own workers fairly before we proceed.</p>
                <p>We reserve the right to pause or end any vendor relationship where credible concerns about forced labour, unsafe conditions or unlawful treatment of workers are raised and cannot be satisfactorily resolved.</p>
              </StatementSection>
            </Reveal>

            {/* 6. Working with Partners and Vendors */}
            <Reveal>
              <StatementSection id="working-with-partners-and-vendors" number="6" heading="Working with Partners and Vendors">
                <p>We expect every partner, vendor and contractor we work with to comply with the labour laws of the jurisdictions in which they operate and to treat their own employees and workers with dignity and fairness. We encourage our partners to extend the same expectation to their own suppliers, so that respect for basic labour rights carries through the chain of relationships that supports our business.</p>
              </StatementSection>
            </Reveal>

            {/* 7. Raising a Concern */}
            <Reveal>
              <StatementSection id="raising-a-concern" number="7" heading="Raising a Concern">
                <p>Any employee, contractor, customer or partner who becomes aware of, or suspects, conduct that may amount to modern slavery, forced labour or human trafficking connected to our business is encouraged to report it to our Grievance Officer using the contact details below. Concerns may be raised in confidence, and anyone who reports a concern in good faith will not face retaliation of any kind.</p>
              </StatementSection>
            </Reveal>

            {/* 8. Training and Awareness */}
            <Reveal>
              <StatementSection id="training-and-awareness" number="8" heading="Training and Awareness">
                <p>We provide guidance to the people involved in hiring and vendor selection so they understand the signs of exploitation and forced labour and know how to escalate a concern. As our team and vendor base grow, we intend to broaden this awareness across the wider organisation.</p>
              </StatementSection>
            </Reveal>

            {/* 9. Reviewing This Statement */}
            <Reveal>
              <StatementSection id="reviewing-this-statement" number="9" heading="Reviewing This Statement">
                <p>We review this statement at least once a year and update it sooner if our business, our supply chains or our understanding of these risks changes in a way that calls for it. Updated versions will be published on this page.</p>
              </StatementSection>
            </Reveal>

            {/* 10. Approval and Contact */}
            <Reveal>
              <StatementSection id="approval-and-contact" number="10" heading="Approval and Contact">
                <p>This statement has been reviewed and approved by the leadership of Ufirm Technologies Private Limited and reflects the steps we have taken, and continue to take, to prevent modern slavery and human trafficking in our business and supply chains.</p>
                <div className="bg-[#eef3f9] border border-[#dbe5f0] rounded-[20px] p-6 mt-4 not-prose">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
                    <div>
                      <p className="font-semibold text-[#1a202c] mb-1">Ufirm Technologies Private Limited</p>
                      <p className="text-[#4a5568]">Brand Name: Firmity</p>
                      <p className="text-[#4a5568]">Website: <a href="https://www.firmity.in" className="text-[#2b6cb0] hover:underline">www.firmity.in</a></p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1a202c] mb-1">Grievance Officer</p>
                      <p className="text-[#4a5568]">Mr. Sanjeev Kumar</p>
                      <p className="text-[#4a5568]">M: +91 9868999648</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1a202c] mb-1">General Contact</p>
                      <p className="text-[#4a5568]">Support: <a href="mailto:support@firmity.in" className="text-[#2b6cb0] hover:underline">support@firmity.in</a></p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1a202c] mb-1">Registered Office</p>
                      <p className="text-[#4a5568]">A13/S1, Dilshad Garden,<br />Delhi 110095</p>
                    </div>
                  </div>
                </div>
              </StatementSection>
            </Reveal>

          </div>
        </article>

        {/* FAQ — native <details> keeps every answer in the server rendered
            HTML (crawlable, no client JS needed), matching /cafm-software's
            FAQ block. Matching FAQPage JSON-LD is emitted via faqJsonLd(FAQS)
            at the top of this component. */}
        <section id="faq" className="bg-[#f7f7f7] py-10 lg:py-14 scroll-mt-28">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
            <h2 className="font-serif font-light text-[clamp(1.4rem,3.5vw,2rem)] leading-[1.15] text-[#114dac] tracking-tight mb-6">
              Frequently asked questions
            </h2>
            <div>
              {FAQS.map((f) => (
                <details key={f.q} className="group border-t border-[#dbe5f0]">
                  <summary className="cursor-pointer list-none flex items-center gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
                    <ChevronDown
                      size={18}
                      className="flex-shrink-0 text-[#2b6cb0] transition-transform duration-200 -rotate-90 group-open:rotate-0"
                    />
                    <span className="text-[14px] font-medium text-[#114dac] group-hover:text-[#2b6cb0] transition-colors leading-snug">
                      {f.q}
                    </span>
                  </summary>
                  <div className="pb-6 pl-[34px] pr-2">
                    <p className="text-[13.5px] font-light leading-[1.8] text-[#4a5568]">{f.a}</p>
                  </div>
                </details>
              ))}
              <div className="border-t border-[#dbe5f0]" />
            </div>
          </div>
        </section>

        {/* RELATED LINKS */}
        <section className="bg-[#114dac]">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#63b3ed] uppercase mb-1 sm:mb-0 sm:self-center">Related policies</p>
              <Link href="/privacy" className="text-white/70 hover:text-white text-[13px] font-light transition-colors hover:underline">
                Privacy Policy &rarr;
              </Link>
              <Link href="/terms" className="text-white/70 hover:text-white text-[13px] font-light transition-colors hover:underline">
                Terms &amp; Conditions &rarr;
              </Link>
            </div>
            <a
              href="mailto:support@firmity.in"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-[12.5px] font-light border border-white/[0.18] hover:border-white/[0.45] px-5 py-2.5 rounded-xl transition-all"
            >
              <Mail size={13} /> Contact Us
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function StatementSection({ id, number, heading, children }: { id: string; number: string; heading: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
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
