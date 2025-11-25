import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Package, Bell, Barcode, TrendingUp, Calendar, Shield, FileText } from "lucide-react"

export default function AssetManagementPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-background py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <Package className="text-primary" size={20} />
                <span className="text-sm font-semibold text-primary">Asset Management & Alerts</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                Track Every Asset, Never Miss a Maintenance Date
              </h1>
              <p className="text-lg text-foreground/80 text-balance">
                Comprehensive asset tracking with intelligent alerts ensures optimal performance, extends lifespan, and
                prevents costly breakdowns.
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
                Complete Asset Lifecycle Management
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                From acquisition to disposal, track every asset with real-time monitoring and smart alerts
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Barcode className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Digital Asset Registry</h3>
                <p className="text-foreground/80">
                  Maintain a complete digital database of all assets with photos, specifications, purchase details,
                  warranties, and maintenance history.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Bell className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Smart Alert System</h3>
                <p className="text-foreground/80">
                  Automated notifications for maintenance due dates, warranty expirations, insurance renewals, and
                  compliance deadlines.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Calendar className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Maintenance Scheduling</h3>
                <p className="text-foreground/80">
                  Schedule preventive maintenance, calibrations, inspections, and servicing based on time intervals or
                  usage thresholds.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <TrendingUp className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Performance Tracking</h3>
                <p className="text-foreground/80">
                  Monitor asset performance, downtime, repair costs, and utilization rates to optimize your asset
                  portfolio and budgets.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <FileText className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Document Management</h3>
                <p className="text-foreground/80">
                  Store all asset-related documents including manuals, warranties, certificates, compliance reports, and
                  service records in one place.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Shield className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Compliance Tracking</h3>
                <p className="text-foreground/80">
                  Never miss regulatory inspections, safety certifications, or compliance requirements with automated
                  compliance calendars.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Asset Management Workflow</h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                A streamlined process from asset registration to lifecycle tracking
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  1
                </div>
                <h4 className="font-bold text-foreground">Register Asset</h4>
                <p className="text-foreground/80 text-sm">
                  Add asset details, photos, purchase info, warranty dates, and assign unique IDs or QR codes.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  2
                </div>
                <h4 className="font-bold text-foreground">Set Alert Rules</h4>
                <p className="text-foreground/80 text-sm">
                  Define maintenance schedules, set reminders for inspections, and configure alert thresholds.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  3
                </div>
                <h4 className="font-bold text-foreground">Monitor & Track</h4>
                <p className="text-foreground/80 text-sm">
                  System continuously monitors asset status and sends alerts when maintenance or action is needed.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  4
                </div>
                <h4 className="font-bold text-foreground">Analyze & Optimize</h4>
                <p className="text-foreground/80 text-sm">
                  Review performance reports, identify underperforming assets, and optimize maintenance strategies.
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
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Digital Asset Management?</h2>
                <p className="text-lg text-foreground/80">
                  Organizations using digital asset management reduce asset downtime by 40%, extend equipment life by
                  25%, and save 15-20% on maintenance costs through proactive monitoring.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Package className="text-primary" size={20} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Complete Asset Visibility</h4>
                      <p className="text-foreground/80 text-sm">
                        Know exactly what assets you have, where they are, and their current condition at all times
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Bell className="text-primary" size={20} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Never Miss Critical Dates</h4>
                      <p className="text-foreground/80 text-sm">
                        Automated alerts ensure you never miss maintenance windows, warranty expirations, or compliance
                        deadlines
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <TrendingUp className="text-primary" size={20} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Optimize Asset ROI</h4>
                      <p className="text-foreground/80 text-sm">
                        Data-driven insights help you maximize asset utilization and make informed replacement decisions
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
                      <h4 className="font-bold text-foreground mb-1">Ensure Compliance</h4>
                      <p className="text-foreground/80 text-sm">
                        Stay audit-ready with complete documentation and compliance tracking for all assets
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Asset Types Supported</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Equipment & Machinery</h4>
                    <p className="text-foreground/80 text-sm">
                      HVAC systems, generators, elevators, production equipment, and industrial machinery
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">IT & Electronics</h4>
                    <p className="text-foreground/80 text-sm">
                      Computers, servers, networking equipment, security systems, and AV equipment
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Vehicles & Fleet</h4>
                    <p className="text-foreground/80 text-sm">
                      Company vehicles, maintenance trucks, forklifts, and mobile equipment
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Furniture & Fixtures</h4>
                    <p className="text-foreground/80 text-sm">
                      Office furniture, fixtures, appliances, and movable property
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Safety & Medical</h4>
                    <p className="text-foreground/80 text-sm">
                      Fire extinguishers, safety equipment, medical devices, and emergency systems
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Alert Types */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Comprehensive Alert System</h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                Stay ahead with intelligent notifications for every critical asset event
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <Bell className="text-primary" size={28} />
                <h4 className="font-bold text-foreground">Maintenance Due Alerts</h4>
                <p className="text-foreground/80 text-sm">
                  Get notified days or weeks before scheduled maintenance to plan resources and avoid rushed work.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <Bell className="text-primary" size={28} />
                <h4 className="font-bold text-foreground">Warranty Expiration</h4>
                <p className="text-foreground/80 text-sm">
                  Receive alerts before warranties expire so you can claim repairs or consider extended coverage.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <Bell className="text-primary" size={28} />
                <h4 className="font-bold text-foreground">Compliance Deadlines</h4>
                <p className="text-foreground/80 text-sm">
                  Never miss safety inspections, certifications, or regulatory compliance requirements.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <Bell className="text-primary" size={28} />
                <h4 className="font-bold text-foreground">Insurance Renewals</h4>
                <p className="text-foreground/80 text-sm">
                  Track insurance policy renewal dates to ensure continuous coverage without lapses.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <Bell className="text-primary" size={28} />
                <h4 className="font-bold text-foreground">Usage Thresholds</h4>
                <p className="text-foreground/80 text-sm">
                  Monitor operating hours, cycles, or mileage and trigger maintenance when thresholds are reached.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <Bell className="text-primary" size={28} />
                <h4 className="font-bold text-foreground">End of Life Alerts</h4>
                <p className="text-foreground/80 text-sm">
                  Get advance notice when assets approach end of useful life to plan replacements and budget
                  accordingly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Breakdown */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Advanced Asset Features</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">QR Code Asset Tagging</h4>
                <p className="text-foreground/80 text-sm">
                  Generate and print QR codes for each asset. Scan codes to instantly access complete asset information,
                  history, and documentation.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Depreciation Tracking</h4>
                <p className="text-foreground/80 text-sm">
                  Automatically calculate asset depreciation using multiple methods. Generate depreciation reports for
                  accounting and tax purposes.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Vendor Management</h4>
                <p className="text-foreground/80 text-sm">
                  Link assets to vendors and service providers. Track vendor performance, contracts, and service
                  history.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Asset Transfers</h4>
                <p className="text-foreground/80 text-sm">
                  Track asset movements between locations, departments, or custodians with complete audit trails and
                  digital signatures.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Cost Analysis</h4>
                <p className="text-foreground/80 text-sm">
                  Track total cost of ownership including purchase price, maintenance, repairs, and operating costs for
                  each asset.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Custom Fields & Categories</h4>
                <p className="text-foreground/80 text-sm">
                  Add custom fields and create asset categories tailored to your organization's specific tracking needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Start Managing Assets Smarter Today</h2>
            <p className="text-lg opacity-90">
              Join organizations reducing downtime by 40% and maintenance costs by 20% with digital asset management
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
