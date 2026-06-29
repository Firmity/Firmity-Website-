"use client"

// ─── Resources Page ───────────────────────────────────────────────────────────
// Trimmed redesign: placeholder blog articles removed (links went nowhere).
// Kept: quick resources, FAQ (interactive accordion), support block, CTA.
// Design language matches the rest of the site: dark navy hero, serif display
// type, #2b6cb0/#63b3ed accents, DM Sans (no mono), 12/20px radius scale.

import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Reveal } from "@/src/components/reveal"
import Link from "next/link"
import { useState, type FC } from "react"
import {
  ArrowRight,
  BookOpen,
  PlayCircle,
  Code2,
  HelpCircle,
  GraduationCap,
  BarChart3,
  ChevronDown,
  Headset,
  Mail,
  type LucideProps,
} from "lucide-react"

// ─── Data ─────────────────────────────────────────────────────────────────────

const RESOURCES: { Icon: FC<LucideProps>; title: string; desc: string; link: string }[] = [
  { Icon: BookOpen,      title: "Getting Started Guide", desc: "Step-by-step guide to set up and configure Firmity for your organization.", link: "/contact" },
  { Icon: PlayCircle,    title: "Video Tutorials",       desc: "Watch short video guides for key features and common tasks.",               link: "/contact" },
  { Icon: Code2,         title: "API Documentation",     desc: "Technical documentation for developers building integrations.",             link: "/contact" },
  { Icon: HelpCircle,    title: "FAQ & Troubleshooting", desc: "Find quick answers to common questions and resolve issues.",                link: "#faq" },
  { Icon: GraduationCap, title: "Training Programs",     desc: "Comprehensive training materials for your team and staff.",                 link: "/contact" },
  { Icon: BarChart3,     title: "Case Studies",          desc: "See how organizations have successfully implemented Firmity.",              link: "/contact" },
]

const FAQS: { question: string; answer: string }[] = [
  { question: "How do I get started with Firmity?",                    answer: "Fill out our demo request form and our team will reach out within 24 hours. We'll set up your account, import your data, and provide comprehensive training to your team." },
  { question: "Is there a learning curve for my team?",                answer: "Firmity is designed to be user-friendly with an intuitive interface. We provide unlimited training and our support team is available to help your team adapt smoothly." },
  { question: "Can I integrate Firmity with my existing systems?",     answer: "Yes, Firmity supports integrations with various systems. Contact our team to discuss your specific integration requirements." },
  { question: "What kind of data can I import?",                       answer: "We can help import your facility records, asset lists, maintenance history, staff data, and more. Our team provides bulk data entry support twice yearly." },
  { question: "Is my data secure in the cloud?",                       answer: "Yes, we use enterprise-grade security with encrypted connections, role-based access controls, and regular security audits to protect your data." },
  { question: "Is there a minimum contract period?",                   answer: "No long-term commitment required. Firmity runs on a monthly subscription with no auto-charges and no hidden fees. Cancel anytime." },
]

// ─── FAQ accordion item — controlled, animated height ─────────────────────────

function FaqItem({ question, answer, open, onToggle }: { question: string; answer: string; open: boolean; onToggle: () => void }) {
  return (
    <div
      className={`rounded-[20px] border transition-all duration-300 overflow-hidden ${
        open ? "border-[#2b6cb0]/50 bg-white shadow-[0_8px_28px_rgba(17,29,53,0.08)]" : "border-[#cbd5e0] bg-white hover:border-[#2b6cb0]/40"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b6cb0] rounded-[20px]"
      >
        <span className="text-[13.5px] font-semibold text-[#1a202c]">{question}</span>
        <span
          className={`w-8 h-8 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            open ? "border-[#2b6cb0] bg-[#2b6cb0] text-white rotate-180" : "border-[#cbd5e0] text-[#2b6cb0]"
          }`}
        >
          <ChevronDown size={15} />
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-[13px] font-light text-[#4a5568] leading-[1.85]">{answer}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ResourcesPage() {
  const [openFaq, setOpenFaq] = useState<number>(0)

  return (
    <>
      <Navigation />
      <main className="bg-white">
        {/* ── HERO — dark navy ── */}
        <section className="bg-[#111d35] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 56px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 56px)" }}
            aria-hidden="true"
          />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-16">
            <Reveal>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-px bg-[#2b6cb0]" />
                <span className="text-[#63b3ed] text-[10px] font-semibold tracking-[0.2em] uppercase">Resources</span>
              </div>
              <h1 className="font-serif text-[clamp(1.8rem,4vw,2.6rem)] font-light text-[#f0f4f8] leading-tight tracking-tight max-w-3xl">
                Everything you need to{" "}
                <em className="not-italic text-[#63b3ed] italic">succeed with Firmity.</em>
              </h1>
              <p className="text-[13.5px] font-light text-white/[0.45] leading-[1.85] max-w-2xl mt-3">
                Guides, tutorials, training, and answers — for facility teams getting started
                and teams going deeper.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── QUICK RESOURCES — distinct rounded cards ── */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 -mt-6 relative z-10 pb-14 lg:pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {RESOURCES.map(({ Icon, title, desc, link }, i) => (
              <Reveal key={title} delay={(i % 3) * 100}>
                <Link
                  href={link}
                  className="group block h-full bg-white rounded-[20px] border border-[#cbd5e0] shadow-[0_4px_20px_rgba(17,29,53,0.06)] hover:shadow-[0_14px_36px_rgba(17,29,53,0.13)] hover:-translate-y-1 hover:border-[#2b6cb0]/50 transition-all duration-300 p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b6cb0]"
                >
                  <div className="w-[42px] h-[42px] rounded-xl border border-[rgba(43,108,176,0.25)] group-hover:border-[#2b6cb0] group-hover:bg-[#2b6cb0] flex items-center justify-center mb-4 text-[#2b6cb0] group-hover:text-white transition-all duration-300">
                    <Icon size={17} strokeWidth={1.5} />
                  </div>
                  <div className="text-[13px] font-semibold text-[#1a202c] mb-1.5 group-hover:text-[#2b6cb0] transition-colors">{title}</div>
                  <p className="text-[12.5px] font-light text-[#718096] leading-[1.7] mb-4">{desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-[#2b6cb0] group-hover:gap-3 transition-all">
                    Learn more <ArrowRight size={12} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── FAQ — interactive accordion ── */}
        <section id="faq" className="bg-[#eef3f9] border-y border-[#dbe5f0] py-14 lg:py-20 scroll-mt-24">
          <div className="max-w-3xl mx-auto px-6 sm:px-10">
            <Reveal>
              <div className="flex items-center gap-3 mb-2 justify-center">
                <div className="w-6 h-px bg-[#2b6cb0]" />
                <span className="text-[#2b6cb0] text-[10px] font-semibold tracking-[0.2em] uppercase">FAQ</span>
                <div className="w-6 h-px bg-[#2b6cb0]" />
              </div>
              <h2 className="font-serif text-[clamp(1.4rem,2.5vw,1.75rem)] font-light text-[#1a202c] tracking-tight text-center mb-8">
                Frequently asked questions
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="space-y-3">
                {FAQS.map((faq, i) => (
                  <FaqItem
                    key={faq.question}
                    question={faq.question}
                    answer={faq.answer}
                    open={openFaq === i}
                    onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── SUPPORT — dark rounded panel ── */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 lg:py-20">
          <Reveal>
            <div className="bg-[#1a2744] rounded-[20px] relative overflow-hidden p-8 sm:p-12">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#2b6cb0]" />
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Headset size={16} className="text-[#63b3ed]" strokeWidth={1.5} />
                    <span className="text-[#63b3ed] text-[10px] font-semibold tracking-[0.2em] uppercase">Need more help?</span>
                  </div>
                  <h2 className="font-serif text-[clamp(1.3rem,2.4vw,1.7rem)] font-light text-[#f0f4f8] tracking-tight mb-2">
                    Our support team is one message away
                  </h2>
                  <p className="text-[13px] font-light text-white/[0.5] leading-[1.8] max-w-xl">
                    Available Monday–Saturday, 9am–6pm IST — for setup questions, training requests,
                    or anything in between.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-2 bg-[#2b6cb0] hover:bg-[#2563a8] text-white text-[12.5px] font-semibold px-6 py-3 rounded-xl transition-all hover:shadow-[0_8px_24px_rgba(43,108,176,0.4)]"
                  >
                    Contact Support
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <a
                    href="mailto:info@ufirm.in"
                    className="inline-flex items-center justify-center gap-2 text-white/65 hover:text-white text-[12.5px] font-light px-6 py-3 rounded-xl border border-white/[0.18] hover:border-white/[0.45] transition-all"
                  >
                    <Mail size={13} /> Email Us
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── CTA ── */}
        <section className="bg-[#111d35] border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 text-center">
            <Reveal>
              <h2 className="font-serif text-[clamp(1.4rem,2.8vw,1.9rem)] font-light text-[#f0f4f8] tracking-tight mb-2">
                Start learning & growing <em className="not-italic text-[#63b3ed]">with Firmity</em>
              </h2>
              <p className="text-[13px] font-light text-white/[0.45] mb-6">
                Access all resources and documentation — book a demo to get started.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-[#2b6cb0] hover:bg-[#2563a8] text-white text-[12.5px] font-semibold px-7 py-3 rounded-xl transition-all hover:shadow-[0_8px_24px_rgba(43,108,176,0.4)]"
              >
                Book a Demo
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
