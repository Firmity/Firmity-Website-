import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import {
  User,
  Clock,
  MapPin,
  Camera,
  Wrench,
  Database,
  Smartphone,
  CheckCircle,
  Shield,
  Lock,
  Eye,
  Users,
  Server,
  Mail,
} from "lucide-react"
import Link from "next/link"

const infoSections = [
  {
    icon: User,
    title: "Account Information",
    items: ["Name & Email Address", "Phone Number", "Employee ID", "Organization Information", "User Role"],
  },
  {
    icon: Clock,
    title: "Attendance Information",
    items: [
      "Check-in & Check-out Records",
      "Attendance History",
      "Leave Requests & Status",
      "Work Schedule Information",
    ],
  },
  {
    icon: MapPin,
    title: "Location Information",
    items: [
      "Precise device location for attendance verification",
      "Workforce management",
      "Task assignment verification",
      "Operational reporting",
    ],
  },
  {
    icon: Camera,
    title: "Photos & Media",
    items: [
      "Maintenance task photos",
      "Work order documentation",
      "Complaint resolution images",
      "Asset & inspection photos",
    ],
  },
  {
    icon: Wrench,
    title: "Maintenance & Complaint Data",
    items: [
      "Task assignments & work orders",
      "Complaint information",
      "Maintenance logs & completion status",
      "Comments, notes & service history",
    ],
  },
  {
    icon: Database,
    title: "Asset Information",
    items: [
      "Asset records & locations",
      "Equipment details",
      "Maintenance schedules",
      "Inspection records & history",
    ],
  },
  {
    icon: Smartphone,
    title: "Device & Technical Information",
    items: [
      "Device type & OS version",
      "Application version",
      "Device identifiers & IP address",
      "Error logs & diagnostic information",
    ],
  },
]

const userRights = [
  { icon: Eye, text: "Access their personal information" },
  { icon: CheckCircle, text: "Request correction of inaccurate information" },
  { icon: Shield, text: "Request deletion of information where permitted" },
  { icon: Users, text: "Object to certain processing activities" },
]

const usagePurposes = [
  "Provide and maintain App functionality",
  "Authenticate users securely",
  "Manage employee attendance and leave requests",
  "Verify attendance location",
  "Process and track maintenance tasks and complaints",
  "Manage and track asset information",
  "Improve system performance",
  "Troubleshoot technical issues",
  "Ensure security and prevent unauthorized access",
  "Generate operational reports for organizations",
]

const sharingParties = [
  {
    icon: Users,
    title: "Your Organization",
    description:
      "The organization that provides access to the App, including authorized administrators and supervisors.",
  },
  {
    icon: Server,
    title: "Service Providers",
    description:
      "Trusted providers supporting cloud hosting, data storage, analytics, authentication, and security.",
  },
  {
    icon: Shield,
    title: "Legal Authorities",
    description: "Only when required by applicable laws, regulations, or valid legal processes.",
  },
]

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section
          className="relative py-20 md:py-28 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0d1a35 0%, #1a3a6b 50%, #0d1a35 100%)" }}
        >
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(43,108,176,0.06) 0, rgba(43,108,176,0.06) 1px, transparent 0, transparent 60px), repeating-linear-gradient(0deg, rgba(43,108,176,0.06) 0, rgba(43,108,176,0.06) 1px, transparent 0, transparent 60px)",
            }}
          />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ background: "rgba(43,108,176,0.25)", color: "#90cdf4", border: "1px solid rgba(43,108,176,0.4)" }}
            >
              <Lock size={12} />
              Legal Document
            </div>
            <h1
              className="text-4xl md:text-6xl font-serif mb-4"
              style={{ color: "#ffffff", fontWeight: 400, lineHeight: 1.15 }}
            >
              Privacy Policy
            </h1>
            <p className="text-base md:text-lg mb-8" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 300 }}>
              How Firmity collects, uses, stores, and protects your information
            </p>
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Clock size={14} />
              Last Updated: June 10, 2026
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-14 md:py-18 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary/5 rounded-lg border border-primary/20 p-8 md:p-10">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                  <Shield size={24} className="text-primary" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-foreground">Introduction</h2>
                  <p className="text-foreground/75 leading-relaxed">
                    Firmity ("we", "our", or "us") provides a Computerized Maintenance Management System (CMMS) mobile
                    application designed to help organizations manage maintenance operations, assets, employee attendance,
                    work orders, complaints, and related activities.
                  </p>
                  <p className="text-foreground/75 leading-relaxed">
                    This Privacy Policy explains how we collect, use, store, and protect information when you use the
                    Firmity mobile application. By using the App, you agree to the collection and use of information as
                    described in this Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Information We Collect */}
        <section className="py-14 md:py-20" style={{ background: "#f7fafd" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-primary mb-3">Data Collection</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Information We Collect</h2>
              <p className="text-foreground/60 max-w-2xl mx-auto">
                We collect only the information necessary to provide and improve our facility management services.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {infoSections.map((section, index) => {
                const Icon = section.icon
                return (
                  <div
                    key={index}
                    className="bg-background rounded-lg border border-border p-6 space-y-4 hover:shadow-md hover:border-primary/30 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2.5 rounded-lg group-hover:bg-primary/15 transition-colors">
                        <Icon size={18} className="text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground text-sm">{section.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-foreground/65">
                          <span className="w-1 h-1 rounded-full bg-primary/50 mt-1.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* How We Use Information */}
        <section className="py-14 md:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-primary mb-3">Data Usage</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How We Use Information</h2>
              <p className="text-foreground/60 max-w-2xl mx-auto">
                We use collected information solely to operate, maintain, and improve the Firmity platform.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {usagePurposes.map((purpose, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/15">
                  <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground/80">{purpose}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Data Sharing */}
        <section className="py-14 md:py-20" style={{ background: "#f7fafd" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-primary mb-3">Transparency</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Data Sharing & Disclosure</h2>
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <CheckCircle size={14} />
                We do not sell personal information
              </div>
              <p className="text-foreground/60 max-w-2xl mx-auto">
                Information may be shared only with the following parties, strictly for operational purposes.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sharingParties.map((party, index) => {
                const Icon = party.icon
                return (
                  <div
                    key={index}
                    className="bg-background rounded-lg border border-border p-8 text-center space-y-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-center">
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <Icon size={28} className="text-primary" />
                      </div>
                    </div>
                    <h3 className="font-bold text-foreground">{party.title}</h3>
                    <p className="text-sm text-foreground/65 leading-relaxed">{party.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Data Storage & Security */}
        <section className="py-14 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-primary mb-3">Protection</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Data Storage & Security</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 p-8 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-primary/10 p-2.5 rounded-lg">
                    <Lock size={20} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Security Measures</h3>
                </div>
                <p className="text-foreground/75 leading-relaxed text-sm">
                  We implement appropriate technical and organizational measures to protect data against unauthorized
                  access, disclosure, alteration, or destruction.
                </p>
                <p className="text-foreground/65 leading-relaxed text-sm">
                  While we strive to use commercially acceptable means to protect information, no method of electronic
                  storage or transmission over the Internet is 100% secure.
                </p>
              </div>

              <div className="space-y-4 p-8 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-primary/10 p-2.5 rounded-lg">
                    <Database size={20} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Data Retention</h3>
                </div>
                <p className="text-foreground/75 leading-relaxed text-sm">
                  Information is retained for as long as necessary to provide services, maintain business and operational
                  records, meet legal obligations, resolve disputes, and enforce agreements.
                </p>
                <p className="text-foreground/65 leading-relaxed text-sm">
                  Organizations using Firmity may determine specific retention periods for their employees' data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* User Rights */}
        <section className="py-14 md:py-20" style={{ background: "#f7fafd" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-primary mb-3">Your Control</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">User Rights</h2>
              <p className="text-foreground/60 max-w-2xl mx-auto">
                Depending on applicable laws, users may have the following rights regarding their personal information.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {userRights.map((right, index) => {
                const Icon = right.icon
                return (
                  <div key={index} className="flex items-center gap-4 p-6 bg-background rounded-lg border border-border hover:shadow-md hover:border-primary/30 transition-all">
                    <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <p className="font-medium text-foreground">{right.text}</p>
                  </div>
                )
              })}
            </div>
            <p className="mt-8 text-center text-sm text-foreground/55">
              Requests should be directed to the organization administering the App or to{" "}
              <Link href="mailto:firmitycmms@firmity.in" className="text-primary hover:underline font-medium">
                Firmity support
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Additional Sections */}
        <section className="py-14 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Children's Privacy */}
              <div className="p-8 bg-primary/5 rounded-lg border border-primary/20 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2.5 rounded-lg">
                    <Shield size={20} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground">Children's Privacy</h3>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Firmity is intended solely for use by authorized employees, supervisors, contractors, and business
                  personnel. The App is not directed to children under 13 years of age.
                </p>
              </div>

              {/* Third-Party Services */}
              <div className="p-8 bg-primary/5 rounded-lg border border-primary/20 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2.5 rounded-lg">
                    <Server size={20} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground">Third-Party Services</h3>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  The App may use third-party services for cloud hosting, data storage, authentication, analytics, push
                  notifications, and error monitoring. These providers process information per their own privacy policies.
                </p>
              </div>

              {/* Policy Updates */}
              <div className="p-8 bg-primary/5 rounded-lg border border-primary/20 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2.5 rounded-lg">
                    <Clock size={20} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground">Policy Updates</h3>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  We may update this Privacy Policy periodically. Updated versions will be published within the App or
                  on our website with a revised effective date.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section
          className="py-16 md:py-20"
          style={{ background: "linear-gradient(135deg, #0d1a35 0%, #1a3a6b 50%, #0d1a35 100%)" }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 p-4 rounded-full">
                <Mail size={32} className="text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Questions About This Policy?</h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
              If you have any questions about this Privacy Policy, please reach out to our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="mailto:firmitycmms@firmity.in"
                className="bg-white text-[#1a3a6b] px-8 py-3 rounded-lg hover:bg-white/90 transition-colors font-semibold"
              >
                firmitycmms@firmity.in
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white/30 text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors font-semibold"
              >
                Contact Us
              </Link>
            </div>
            <p className="mt-10 text-white/30 text-sm">
              By using Firmity, you acknowledge that you have read and understood this Privacy Policy and consent to the
              collection and use of information as described herein.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
