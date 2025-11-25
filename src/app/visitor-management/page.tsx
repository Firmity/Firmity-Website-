import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Shield, Camera, QrCode, Clock, FileText, Search, Bell, Smartphone } from "lucide-react"

export default function VisitorManagementPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-background py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <Shield className="text-primary" size={20} />
                <span className="text-sm font-semibold text-primary">Visitor Management & Records</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                Enhanced Security Through Digital Visitor Tracking
              </h1>
              <p className="text-lg text-foreground/80 text-balance">
                Log, monitor, and manage all visitors digitally with photo capture, access control, and comprehensive
                audit trails for compliance and security.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a
                  href="/contact"
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold cursor-pointer"
                >
                  Start Free Trial
                </a>
                <a
                  href="/pricing"
                  className="border-2 border-border text-foreground px-8 py-3 rounded-lg hover:bg-muted transition-colors font-semibold cursor-pointer"
                >
                  View Pricing
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Complete Visitor Management System
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                From check-in to check-out, maintain complete records of everyone entering your premises
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Camera className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Photo Capture & ID Verification</h3>
                <p className="text-foreground/80">
                  Capture visitor photos, scan ID cards, and verify identity digitally. Maintain visual records for
                  security and compliance purposes.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <QrCode className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Digital Pass Generation</h3>
                <p className="text-foreground/80">
                  Generate digital visitor passes with QR codes. Visitors can show passes on mobile devices for
                  touchless check-in and check-out.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Clock className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Real-Time Tracking</h3>
                <p className="text-foreground/80">
                  Monitor who is currently on-site in real-time. Know exactly who entered, when, and whether they've
                  checked out yet.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Bell className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Host Notifications</h3>
                <p className="text-foreground/80">
                  Automatically notify hosts when their visitors arrive. Hosts can pre-approve visitors or grant access
                  remotely.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Search className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Searchable Database</h3>
                <p className="text-foreground/80">
                  Maintain comprehensive visitor history with powerful search and filtering. Retrieve visitor records
                  instantly for audits or investigations.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <FileText className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Compliance Reports</h3>
                <p className="text-foreground/80">
                  Generate detailed visitor reports for security audits, compliance requirements, and incident
                  investigations with complete audit trails.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Streamlined Visitor Check-In Process
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                A secure, efficient workflow that enhances both security and visitor experience
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  1
                </div>
                <h4 className="font-bold text-foreground">Pre-Registration</h4>
                <p className="text-foreground/80 text-sm">
                  Optional: Hosts can pre-register expected visitors with details, reducing check-in time.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  2
                </div>
                <h4 className="font-bold text-foreground">Visitor Arrives</h4>
                <p className="text-foreground/80 text-sm">
                  Security captures visitor details, photo, ID scan, and purpose of visit at reception.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  3
                </div>
                <h4 className="font-bold text-foreground">Host Approval</h4>
                <p className="text-foreground/80 text-sm">
                  System notifies host. Host approves visitor entry via mobile app or web portal.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  4
                </div>
                <h4 className="font-bold text-foreground">Issue Pass</h4>
                <p className="text-foreground/80 text-sm">
                  Generate digital or physical visitor pass with QR code for the approved duration.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  5
                </div>
                <h4 className="font-bold text-foreground">Check-Out</h4>
                <p className="text-foreground/80 text-sm">
                  Visitor scans pass or checks out at reception. System records exit time automatically.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Digital Visitor Management?</h2>
                <p className="text-lg text-foreground/80">
                  Digital visitor systems improve security by 85%, reduce check-in time by 70%, and provide complete
                  audit trails that paper logbooks simply cannot match.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Shield className="text-primary" size={20} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Enhanced Security</h4>
                      <p className="text-foreground/80 text-sm">
                        Photo verification, ID scanning, and host approval prevent unauthorized access
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Shield className="text-primary" size={20} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Complete Audit Trail</h4>
                      <p className="text-foreground/80 text-sm">
                        Every visitor entry and exit is timestamped and documented for compliance
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Shield className="text-primary" size={20} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Faster Check-In</h4>
                      <p className="text-foreground/80 text-sm">
                        Pre-registration and digital forms reduce check-in time from 5 minutes to under 30 seconds
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Shield className="text-primary" size={20} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Emergency Readiness</h4>
                      <p className="text-foreground/80 text-sm">
                        Know exactly who is on-site during emergencies for evacuation and accountability
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Visitor Types Managed</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Business Visitors</h4>
                    <p className="text-foreground/80 text-sm">
                      Clients, vendors, consultants, and business partners visiting for meetings
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Contractors & Vendors</h4>
                    <p className="text-foreground/80 text-sm">
                      Maintenance staff, delivery personnel, and service providers requiring site access
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Guests & Invitees</h4>
                    <p className="text-foreground/80 text-sm">
                      Personal guests, family members, and social visitors in residential facilities
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Job Applicants</h4>
                    <p className="text-foreground/80 text-sm">
                      Interview candidates and prospective employees visiting for recruitment
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">VIP Visitors</h4>
                    <p className="text-foreground/80 text-sm">
                      High-profile guests requiring special access protocols and privacy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Breakdown */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Advanced Visitor Management Features
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Watchlist & Blacklist</h4>
                <p className="text-foreground/80 text-sm">
                  Maintain watchlists of unwanted visitors. System alerts security if blacklisted individuals attempt to
                  check in.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Visitor Pre-Registration</h4>
                <p className="text-foreground/80 text-sm">
                  Hosts can pre-register expected visitors with meeting details. Walk-in check-in becomes instant with
                  pre-approval.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Multi-Location Support</h4>
                <p className="text-foreground/80 text-sm">
                  Manage visitor access across multiple buildings, campuses, or locations from a single centralized
                  system.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Access Control Integration</h4>
                <p className="text-foreground/80 text-sm">
                  Integrate with door access systems, turnstiles, and electronic gates for automated visitor access
                  control.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">NDA & Document Signing</h4>
                <p className="text-foreground/80 text-sm">
                  Require visitors to sign NDAs, safety waivers, or other documents digitally before granting access.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Recurring Visitor Passes</h4>
                <p className="text-foreground/80 text-sm">
                  Issue long-term passes for regular visitors, contractors, or vendors with scheduled validity periods.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Perfect For Every Facility Type</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                <Smartphone className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Corporate Offices</h4>
                <p className="text-foreground/80 text-sm">
                  Manage business visitors, clients, and job candidates with professional check-in experience and
                  security protocols.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <Smartphone className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Residential Communities</h4>
                <p className="text-foreground/80 text-sm">
                  Track guest entries, delivery personnel, and service providers to enhance resident security and
                  privacy.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <Smartphone className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Educational Institutions</h4>
                <p className="text-foreground/80 text-sm">
                  Control campus access for parents, vendors, and visitors while ensuring student safety and compliance.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <Smartphone className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Healthcare Facilities</h4>
                <p className="text-foreground/80 text-sm">
                  Manage patient visitors, vendors, and medical representatives while maintaining HIPAA compliance and
                  security.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <Smartphone className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Manufacturing Plants</h4>
                <p className="text-foreground/80 text-sm">
                  Track contractors, auditors, and visitors with safety induction requirements and restricted area
                  access.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <Smartphone className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Government Buildings</h4>
                <p className="text-foreground/80 text-sm">
                  Implement high-security protocols with thorough screening, photo verification, and comprehensive audit
                  trails.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reports */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Comprehensive Visitor Reports</h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                Detailed analytics and reports for security, compliance, and facility management
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-background rounded-lg p-6 border border-border">
                <FileText className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Daily Visitor Log</h4>
                <p className="text-foreground/80 text-sm">
                  Complete list of all visitors with check-in/out times, host details, and purpose of visit.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border">
                <FileText className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">On-Site Visitors Report</h4>
                <p className="text-foreground/80 text-sm">
                  Real-time list of visitors currently on premises for emergency evacuations and security monitoring.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border">
                <FileText className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Visitor History</h4>
                <p className="text-foreground/80 text-sm">
                  Search and retrieve historical visitor records by name, date, host, or purpose for investigations.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border">
                <FileText className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Frequent Visitor Analysis</h4>
                <p className="text-foreground/80 text-sm">
                  Identify frequent visitors and consider issuing long-term passes for improved efficiency.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border">
                <FileText className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Compliance Reports</h4>
                <p className="text-foreground/80 text-sm">
                  Generate audit-ready reports with photos, timestamps, and digital signatures for regulatory
                  compliance.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border">
                <FileText className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Host Activity Report</h4>
                <p className="text-foreground/80 text-sm">
                  Track which employees are hosting the most visitors and analyze visitor patterns by department.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Upgrade Your Facility Security Today</h2>
            <p className="text-lg opacity-90">
              Join organizations improving security by 85% with digital visitor management systems
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="/contact"
                className="bg-primary-foreground text-primary px-8 py-3 rounded-lg hover:bg-background transition-colors font-semibold cursor-pointer"
              >
                Get Started Free
              </a>
              <a
                href="/features"
                className="border-2 border-primary-foreground text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary-foreground/10 transition-colors font-semibold cursor-pointer"
              >
                Explore More Features
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
