import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Clock, Calendar, CheckCircle, AlertTriangle, Wrench, TrendingUp, Shield, Smartphone } from "lucide-react"

export default function PreventiveMaintenancePage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-background py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <Clock className="text-primary" size={20} />
                <span className="text-sm font-semibold text-primary">Planned Preventive Maintenance</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                Prevent Breakdowns Before They Happen
              </h1>
              <p className="text-lg text-foreground/80 text-balance">
                Automate maintenance schedules, extend asset lifespan, and eliminate costly emergency repairs with
                intelligent preventive maintenance planning.
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Smart Maintenance Automation</h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                Let technology handle the scheduling while you focus on keeping your facilities running smoothly.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Calendar className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Auto-Scheduling</h3>
                <p className="text-foreground/80">
                  Automatically generate maintenance schedules based on asset type, usage patterns, and manufacturer
                  recommendations. Never miss a service date.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <AlertTriangle className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Smart Alerts</h3>
                <p className="text-foreground/80">
                  Receive timely notifications before maintenance is due. Get alerts via email, SMS, or in-app
                  notifications to stay ahead of schedules.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <CheckCircle className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Task Tracking</h3>
                <p className="text-foreground/80">
                  Monitor work order status in real-time. Track who completed what, when, and see detailed maintenance
                  history for every asset.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Wrench className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Work Order Management</h3>
                <p className="text-foreground/80">
                  Create, assign, and manage work orders digitally. Include photos, checklists, and detailed
                  instructions for every maintenance task.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <TrendingUp className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Performance Analytics</h3>
                <p className="text-foreground/80">
                  Track maintenance costs, downtime reduction, and asset performance. Make data-driven decisions to
                  optimize your maintenance strategy.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Smartphone className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Mobile Access</h3>
                <p className="text-foreground/80">
                  Technicians can access work orders, update task status, and upload photos directly from their mobile
                  devices in the field.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How Preventive Maintenance Works</h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                A simple, automated process that keeps your assets in peak condition
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  1
                </div>
                <h4 className="font-bold text-foreground">Set Up Assets</h4>
                <p className="text-foreground/80 text-sm">
                  Register your equipment and define maintenance intervals based on time, usage, or conditions.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  2
                </div>
                <h4 className="font-bold text-foreground">Auto-Generate Schedule</h4>
                <p className="text-foreground/80 text-sm">
                  System automatically creates maintenance schedules and generates work orders at optimal times.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  3
                </div>
                <h4 className="font-bold text-foreground">Receive Alerts</h4>
                <p className="text-foreground/80 text-sm">
                  Get notified before maintenance is due. Assign tasks to technicians with all necessary details.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  4
                </div>
                <h4 className="font-bold text-foreground">Track & Analyze</h4>
                <p className="text-foreground/80 text-sm">
                  Monitor completion, track costs, and analyze performance to continuously improve your maintenance
                  program.
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
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Transform Reactive to Proactive Maintenance
                </h2>
                <p className="text-lg text-foreground/80">
                  Stop fighting fires and start preventing them. Preventive maintenance reduces emergency repairs by up
                  to 70% and extends asset lifespan by 20-40%.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <CheckCircle className="text-primary" size={20} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Reduce Emergency Repairs</h4>
                      <p className="text-foreground/80 text-sm">
                        Catch issues early before they become costly emergencies
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
                      <h4 className="font-bold text-foreground mb-1">Extend Asset Lifespan</h4>
                      <p className="text-foreground/80 text-sm">
                        Regular maintenance can extend equipment life by 20-40%
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
                      <h4 className="font-bold text-foreground mb-1">Lower Maintenance Costs</h4>
                      <p className="text-foreground/80 text-sm">
                        Preventive maintenance costs 3-5x less than reactive repairs
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
                      <h4 className="font-bold text-foreground mb-1">Minimize Downtime</h4>
                      <p className="text-foreground/80 text-sm">
                        Schedule maintenance during off-peak hours to avoid disruptions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Maintenance Types Supported</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Time-Based Maintenance</h4>
                    <p className="text-foreground/80 text-sm">
                      Schedule tasks at regular intervals (daily, weekly, monthly, yearly)
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Usage-Based Maintenance</h4>
                    <p className="text-foreground/80 text-sm">
                      Trigger maintenance based on operating hours or usage meters
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Condition-Based Maintenance</h4>
                    <p className="text-foreground/80 text-sm">
                      Monitor asset conditions and trigger maintenance when thresholds are met
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Predictive Maintenance</h4>
                    <p className="text-foreground/80 text-sm">
                      Use historical data to predict and prevent potential failures
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Preventive Maintenance for Every Facility
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-background rounded-lg p-6 border border-border">
                <Shield className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Commercial Buildings</h4>
                <p className="text-foreground/80 text-sm">
                  HVAC systems, elevators, fire safety equipment, generators, and building automation systems
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border">
                <Shield className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Manufacturing Plants</h4>
                <p className="text-foreground/80 text-sm">
                  Production machinery, conveyor systems, quality control equipment, and safety systems
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border">
                <Shield className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Hospitals & Healthcare</h4>
                <p className="text-foreground/80 text-sm">
                  Medical equipment, sterilization systems, emergency power, and life support systems
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border">
                <Shield className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Educational Institutions</h4>
                <p className="text-foreground/80 text-sm">
                  Classroom equipment, lab instruments, sports facilities, and campus infrastructure
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border">
                <Shield className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Hotels & Hospitality</h4>
                <p className="text-foreground/80 text-sm">
                  Guest room systems, kitchen equipment, pool maintenance, and property infrastructure
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border">
                <Shield className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Residential Communities</h4>
                <p className="text-foreground/80 text-sm">
                  Common area equipment, swimming pools, elevators, and community facilities
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Start Preventing Breakdowns Today</h2>
            <p className="text-lg opacity-90">
              Join hundreds of facilities reducing maintenance costs and extending asset lifespan
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
