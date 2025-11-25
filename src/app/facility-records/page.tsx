import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Cloud, FileText, Search, Shield, Clock, Users, Database, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function FacilityRecordsPage() {
  const keyFeatures = [
    {
      icon: Cloud,
      title: "Cloud Storage",
      description:
        "Securely store all facility documents in the cloud with automatic backups and 99.9% uptime guarantee.",
    },
    {
      icon: FileText,
      title: "Digital Documentation",
      description: "Convert paper records to digital format with OCR technology and intelligent document management.",
    },
    {
      icon: Search,
      title: "Instant Search",
      description: "Find any document in seconds with powerful search filters and intelligent categorization.",
    },
    {
      icon: Shield,
      title: "Secure Access Control",
      description: "Role-based permissions ensure only authorized personnel can access sensitive facility records.",
    },
    {
      icon: Clock,
      title: "Version History",
      description: "Track every change with complete audit trails and restore previous versions when needed.",
    },
    {
      icon: Users,
      title: "Collaborative Editing",
      description: "Multiple team members can access and update records simultaneously with real-time sync.",
    },
  ]

  const recordTypes = [
    {
      category: "Asset Records",
      items: ["Equipment specifications", "Purchase documentation", "Warranty certificates", "Service history"],
      icon: "🏢",
    },
    {
      category: "Maintenance Records",
      items: ["PPM schedules", "Work orders", "Inspection reports", "Compliance certificates"],
      icon: "🔧",
    },
    {
      category: "Compliance Documents",
      items: ["Safety certificates", "Insurance policies", "Audit reports", "Regulatory approvals"],
      icon: "📋",
    },
    {
      category: "Vendor Information",
      items: ["Contract agreements", "AMC documents", "Vendor credentials", "Payment records"],
      icon: "🤝",
    },
    {
      category: "Staff Records",
      items: ["Employee files", "Training certificates", "Attendance logs", "Leave records"],
      icon: "👥",
    },
    {
      category: "Visitor Logs",
      items: ["Entry records", "Security clearances", "Meeting logs", "Access history"],
      icon: "🚪",
    },
  ]

  const benefits = [
    "Eliminate physical file storage and reduce office clutter",
    "Access documents from anywhere, anytime on any device",
    "Reduce document retrieval time from hours to seconds",
    "Ensure compliance with digital audit trails",
    "Prevent document loss with automatic cloud backups",
    "Save costs on printing, storage, and manual filing",
    "Improve team collaboration with shared access",
    "Enhance security with encryption and access controls",
  ]

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-background py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                  Digital Transformation
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                  Cloud-Based Facility Records Management
                </h1>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  Transform your facility documentation with secure cloud storage, instant access, and intelligent
                  organization. Say goodbye to paper clutter and hello to digital efficiency.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/contact"
                    className="cursor-pointer bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center gap-2"
                  >
                    Book Tech Demo <ArrowRight size={20} />
                  </Link>
                  <Link
                    href="/pricing"
                    className="cursor-pointer border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary/10 transition-colors font-semibold"
                  >
                    Try Free for 6 Weeks
                  </Link>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 flex items-center justify-center min-h-96">
                <div className="w-full h-full flex items-center justify-center">
                  <Database size={200} className="text-primary opacity-20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Powerful Features for Modern Facility Management
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {keyFeatures.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow"
                  >
                    <div className="bg-primary/10 p-3 rounded-lg w-fit">
                      <Icon size={28} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                    <p className="text-foreground/80 leading-relaxed">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Record Types */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Manage Every Type of Facility Record
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recordTypes.map((record, index) => (
                <div key={index} className="bg-background border border-border rounded-lg p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{record.icon}</div>
                    <h3 className="text-xl font-bold text-foreground">{record.category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {record.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle size={18} className="text-primary flex-shrink-0 mt-1" />
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              How Cloud-Based Records Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h4 className="font-bold text-foreground">Upload Documents</h4>
                <p className="text-foreground/80 text-sm">
                  Drag and drop files or scan physical documents directly into the system
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h4 className="font-bold text-foreground">Auto-Categorize</h4>
                <p className="text-foreground/80 text-sm">
                  AI-powered system automatically organizes and tags your documents
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h4 className="font-bold text-foreground">Secure Storage</h4>
                <p className="text-foreground/80 text-sm">
                  Files are encrypted and stored in secure cloud servers with backups
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">4</span>
                </div>
                <h4 className="font-bold text-foreground">Instant Access</h4>
                <p className="text-foreground/80 text-sm">
                  Search, view, and share documents from anywhere on any device
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Benefits of Digital Record Management
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 bg-background p-4 rounded-lg border border-border">
                  <CheckCircle size={20} className="text-primary flex-shrink-0 mt-1" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Perfect For Every Facility Type
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card border border-border rounded-lg p-6 space-y-3">
                <div className="text-4xl">🏢</div>
                <h4 className="font-bold text-foreground">Corporate Offices</h4>
                <p className="text-foreground/80 text-sm">
                  Manage building permits, lease agreements, safety inspections, and maintenance schedules across
                  multiple locations.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-3">
                <div className="text-4xl">🏥</div>
                <h4 className="font-bold text-foreground">Healthcare Facilities</h4>
                <p className="text-foreground/80 text-sm">
                  Store medical equipment records, compliance certificates, staff credentials, and maintenance logs
                  securely.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-3">
                <div className="text-4xl">🏫</div>
                <h4 className="font-bold text-foreground">Educational Institutions</h4>
                <p className="text-foreground/80 text-sm">
                  Organize campus facility records, lab equipment documentation, safety certifications, and vendor
                  contracts.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-3">
                <div className="text-4xl">🏭</div>
                <h4 className="font-bold text-foreground">Manufacturing Plants</h4>
                <p className="text-foreground/80 text-sm">
                  Track machinery documentation, preventive maintenance records, safety compliance, and quality
                  certifications.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-3">
                <div className="text-4xl">🏨</div>
                <h4 className="font-bold text-foreground">Hospitality</h4>
                <p className="text-foreground/80 text-sm">
                  Manage property records, guest service logs, equipment maintenance, and staff training documents
                  digitally.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-3">
                <div className="text-4xl">🏘️</div>
                <h4 className="font-bold text-foreground">Residential Communities</h4>
                <p className="text-foreground/80 text-sm">
                  Store society documents, resident records, maintenance schedules, and vendor agreements in one secure
                  location.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">
              Enterprise-Grade Security
            </h2>
            <div className="bg-background rounded-xl p-8 border border-border space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Shield size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-foreground mb-1">256-bit Encryption</h4>
                    <p className="text-foreground/80 text-sm">All data encrypted in transit and at rest</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Role-Based Access</h4>
                    <p className="text-foreground/80 text-sm">Granular permissions for different user roles</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Audit Trails</h4>
                    <p className="text-foreground/80 text-sm">Complete history of all document access and changes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Automatic Backups</h4>
                    <p className="text-foreground/80 text-sm">Daily backups with 30-day retention policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Go Paperless with Cloud-Based Records</h2>
            <p className="text-lg opacity-90">
              Start your digital transformation today with 6 weeks free trial and unlimited training
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/contact"
                className="cursor-pointer bg-primary-foreground text-primary px-8 py-3 rounded-lg hover:bg-background transition-colors font-semibold"
              >
                Schedule a Demo
              </Link>
              <Link
                href="/features"
                className="cursor-pointer border-2 border-primary-foreground text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary-foreground/10 transition-colors font-semibold"
              >
                Explore All Features
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
