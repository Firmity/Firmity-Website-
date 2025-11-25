import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { AlertCircle, QrCode, Camera, Clock, CheckCircle, MessageSquare, BarChart, Smartphone } from "lucide-react"

export default function ComplaintManagementPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-background py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <AlertCircle className="text-primary" size={20} />
                <span className="text-sm font-semibold text-primary">Complaint Management System</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                Capture, Track, and Resolve Every Issue
              </h1>
              <p className="text-lg text-foreground/80 text-balance">
                QR-based complaint logging with real-time tracking ensures no issue goes unnoticed. Transform complaint
                management from chaos to clarity.
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Smart Complaint Tracking System</h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                From initial report to final resolution, manage every complaint with transparency and efficiency
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <QrCode className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">QR Code Reporting</h3>
                <p className="text-foreground/80">
                  Place QR codes throughout your facility. Users scan to instantly log complaints with automatic
                  location tagging and timestamps.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Camera className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Photo & Video Evidence</h3>
                <p className="text-foreground/80">
                  Capture issues visually with photo and video attachments. Document problems clearly to expedite
                  resolution and reduce miscommunication.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Clock className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Real-Time Tracking</h3>
                <p className="text-foreground/80">
                  Monitor complaint status in real-time. Both complainants and managers see live updates from submission
                  to resolution.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <MessageSquare className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Two-Way Communication</h3>
                <p className="text-foreground/80">
                  Built-in messaging allows staff to ask clarifying questions and provide updates. Keep complainants
                  informed throughout the process.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <CheckCircle className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Automated Workflows</h3>
                <p className="text-foreground/80">
                  Auto-assign complaints based on category, location, or priority. Set SLA timers and escalation rules
                  for timely resolution.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <BarChart className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Analytics & Reporting</h3>
                <p className="text-foreground/80">
                  Track resolution times, identify recurring issues, and measure team performance. Data-driven insights
                  improve service quality.
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
                Simple Complaint Resolution Process
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                A streamlined workflow that ensures every complaint gets the attention it deserves
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  1
                </div>
                <h4 className="font-bold text-foreground">Scan QR Code</h4>
                <p className="text-foreground/80 text-sm">
                  User scans location-specific QR code to open complaint form with auto-populated location data.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  2
                </div>
                <h4 className="font-bold text-foreground">Log Complaint</h4>
                <p className="text-foreground/80 text-sm">
                  Fill in issue details, category, priority, and attach photos. Submit with a single click.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  3
                </div>
                <h4 className="font-bold text-foreground">Auto-Assign</h4>
                <p className="text-foreground/80 text-sm">
                  System automatically routes complaint to appropriate team member based on category and location.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  4
                </div>
                <h4 className="font-bold text-foreground">Track Progress</h4>
                <p className="text-foreground/80 text-sm">
                  Staff updates status as they work. Complainant receives notifications at each milestone.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  5
                </div>
                <h4 className="font-bold text-foreground">Collect Feedback</h4>
                <p className="text-foreground/80 text-sm">
                  Upon resolution, complainant rates service quality. Feedback helps improve future response.
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
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Transform Complaint Handling</h2>
                <p className="text-lg text-foreground/80">
                  Digital complaint management reduces response times by 60% and increases resolution rates by 80%.
                  Every issue gets logged, tracked, and resolved.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <CheckCircle className="text-primary" size={20} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Zero Complaints Lost</h4>
                      <p className="text-foreground/80 text-sm">
                        Every complaint is digitally captured and tracked until resolution
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <CheckCircle className="text-primary" size={20} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Faster Response Times</h4>
                      <p className="text-foreground/80 text-sm">
                        Automated routing and notifications reduce initial response time by 60%
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <CheckCircle className="text-primary" size={20} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Complete Transparency</h4>
                      <p className="text-foreground/80 text-sm">
                        Real-time visibility into complaint status builds trust and accountability
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <CheckCircle className="text-primary" size={20} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Data-Driven Improvements</h4>
                      <p className="text-foreground/80 text-sm">
                        Identify patterns and recurring issues to prevent future complaints
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Complaint Categories</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Maintenance Issues</h4>
                    <p className="text-foreground/80 text-sm">
                      Plumbing, electrical, HVAC, structural problems, and general repairs
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Cleanliness & Hygiene</h4>
                    <p className="text-foreground/80 text-sm">
                      Common area cleaning, waste management, pest control, and sanitation
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Security Concerns</h4>
                    <p className="text-foreground/80 text-sm">
                      Safety hazards, access control, lighting issues, and security breaches
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Noise & Disturbance</h4>
                    <p className="text-foreground/80 text-sm">
                      Noise complaints, unauthorized activities, and disruption management
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Amenity Issues</h4>
                    <p className="text-foreground/80 text-sm">
                      Pool, gym, parking, elevator, and common facility malfunctions
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Advanced Complaint Features</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Priority & SLA Management</h4>
                <p className="text-foreground/80 text-sm">
                  Set priority levels and service level agreements. System automatically escalates overdue complaints to
                  ensure timely resolution.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Anonymous Reporting</h4>
                <p className="text-foreground/80 text-sm">
                  Allow anonymous complaints for sensitive issues. Protects reporters while still capturing critical
                  feedback.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Multi-Channel Submission</h4>
                <p className="text-foreground/80 text-sm">
                  Accept complaints via QR scan, web portal, mobile app, email, or phone. All channels feed into one
                  unified system.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Recurring Issue Detection</h4>
                <p className="text-foreground/80 text-sm">
                  AI identifies patterns in complaints to flag recurring problems that need permanent solutions rather
                  than temporary fixes.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Satisfaction Surveys</h4>
                <p className="text-foreground/80 text-sm">
                  Automatically send satisfaction surveys after resolution. Measure service quality and identify areas
                  for improvement.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Complete Audit Trail</h4>
                <p className="text-foreground/80 text-sm">
                  Full history of every complaint with timestamps, actions taken, and responsible parties. Perfect for
                  compliance and quality assurance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Perfect For Every Environment</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                <Smartphone className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Residential Communities</h4>
                <p className="text-foreground/80 text-sm">
                  Residents report maintenance issues, noise complaints, and amenity problems with QR codes placed
                  throughout the property.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <Smartphone className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Commercial Buildings</h4>
                <p className="text-foreground/80 text-sm">
                  Tenants and employees log facility issues, service requests, and safety concerns for rapid response
                  from building management.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <Smartphone className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Educational Institutions</h4>
                <p className="text-foreground/80 text-sm">
                  Students and staff report campus issues, classroom problems, and facility concerns to ensure a safe
                  learning environment.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <Smartphone className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Healthcare Facilities</h4>
                <p className="text-foreground/80 text-sm">
                  Staff and patients report equipment issues, cleanliness concerns, and safety hazards for immediate
                  attention and resolution.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <Smartphone className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Hotels & Hospitality</h4>
                <p className="text-foreground/80 text-sm">
                  Guests report room issues and service requests. Staff track and resolve problems to maintain high
                  satisfaction scores.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <Smartphone className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Manufacturing Plants</h4>
                <p className="text-foreground/80 text-sm">
                  Workers report equipment malfunctions, safety hazards, and quality issues to prevent downtime and
                  maintain safety standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Start Resolving Issues Faster Today</h2>
            <p className="text-lg opacity-90">
              Join facilities achieving 80% faster complaint resolution with digital tracking systems
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
