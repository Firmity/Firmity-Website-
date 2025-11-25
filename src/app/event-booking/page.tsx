import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Calendar, Clock, Users, MapPin, CheckCircle, Bell, FileText } from "lucide-react"

export default function EventBookingPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-background py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <Calendar className="text-primary" size={20} />
                <span className="text-sm font-semibold text-primary">Event Organizer & Booking</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                Seamless Event & Room Booking Management
              </h1>
              <p className="text-lg text-foreground/80 text-balance">
                Eliminate scheduling conflicts and streamline facility bookings with intelligent calendar management and
                real-time availability tracking.
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
                Complete Event Management Solution
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                From conference room bookings to community events, manage everything in one place
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Calendar className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Smart Calendar Management</h3>
                <p className="text-foreground/80">
                  Visual calendar interface shows real-time availability for all spaces. Color-coded events make it easy
                  to spot conflicts and manage capacity.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <MapPin className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Multiple Venue Management</h3>
                <p className="text-foreground/80">
                  Manage bookings for conference rooms, clubhouses, sports facilities, auditoriums, and more—all from a
                  single dashboard.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Clock className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Automated Scheduling</h3>
                <p className="text-foreground/80">
                  Set booking rules, time slots, and availability windows. System automatically prevents double bookings
                  and manages time conflicts.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Bell className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Instant Notifications</h3>
                <p className="text-foreground/80">
                  Automatic reminders for upcoming events, booking confirmations, cancellations, and schedule changes
                  keep everyone informed.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Users className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Guest Management</h3>
                <p className="text-foreground/80">
                  Track attendees, manage guest lists, and monitor capacity limits. Send invitations and collect RSVPs
                  digitally.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <FileText className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Approval Workflows</h3>
                <p className="text-foreground/80">
                  Customizable approval processes for booking requests. Set rules for automatic approval or require
                  manager sign-off for specific venues.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Simple Booking Process</h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                From request to confirmation in just a few clicks
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  1
                </div>
                <h4 className="font-bold text-foreground">Check Availability</h4>
                <p className="text-foreground/80 text-sm">
                  View real-time availability for all venues and time slots on the calendar interface.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  2
                </div>
                <h4 className="font-bold text-foreground">Submit Booking</h4>
                <p className="text-foreground/80 text-sm">
                  Fill in event details including date, time, venue, expected attendance, and special requirements.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  3
                </div>
                <h4 className="font-bold text-foreground">Get Approval</h4>
                <p className="text-foreground/80 text-sm">
                  Booking goes through approval workflow. Receive instant notification when approved or if changes
                  needed.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  4
                </div>
                <h4 className="font-bold text-foreground">Manage Event</h4>
                <p className="text-foreground/80 text-sm">
                  Track attendees, send reminders, and make changes as needed. Calendar automatically updates.
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
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Digital Event Management?</h2>
                <p className="text-lg text-foreground/80">
                  Move beyond paper logbooks and email chains. Digital booking systems reduce conflicts by 95% and save
                  up to 10 hours per week on scheduling.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <CheckCircle className="text-primary" size={20} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Eliminate Double Bookings</h4>
                      <p className="text-foreground/80 text-sm">
                        Real-time availability prevents scheduling conflicts automatically
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
                      <h4 className="font-bold text-foreground mb-1">Improve Transparency</h4>
                      <p className="text-foreground/80 text-sm">
                        Everyone can see available slots and upcoming events in real-time
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
                      <h4 className="font-bold text-foreground mb-1">Save Administrative Time</h4>
                      <p className="text-foreground/80 text-sm">
                        Automated workflows reduce manual coordination by up to 80%
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
                      <h4 className="font-bold text-foreground mb-1">Better Space Utilization</h4>
                      <p className="text-foreground/80 text-sm">
                        Analytics show usage patterns to optimize space allocation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Booking Types Supported</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Conference Room Bookings</h4>
                    <p className="text-foreground/80 text-sm">
                      Meeting rooms, boardrooms, training facilities, and collaboration spaces
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Community Event Spaces</h4>
                    <p className="text-foreground/80 text-sm">
                      Clubhouses, party halls, banquet venues, and multipurpose rooms
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Sports & Recreation</h4>
                    <p className="text-foreground/80 text-sm">
                      Swimming pools, tennis courts, gyms, and sports grounds
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Equipment & Resources</h4>
                    <p className="text-foreground/80 text-sm">AV equipment, vehicles, tools, and shared resources</p>
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Advanced Booking Features</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Recurring Events</h4>
                <p className="text-foreground/80 text-sm">
                  Set up weekly, monthly, or custom recurring bookings. System automatically reserves the space for all
                  future dates.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Capacity Management</h4>
                <p className="text-foreground/80 text-sm">
                  Define maximum capacity for each venue and track attendance. Prevent overbooking and ensure safety
                  compliance.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Payment Integration</h4>
                <p className="text-foreground/80 text-sm">
                  Collect booking fees, security deposits, and rental charges. Automated invoicing and payment tracking
                  included.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Setup & Cleanup Time</h4>
                <p className="text-foreground/80 text-sm">
                  Add buffer time before and after events for preparation and cleanup. Prevents back-to-back scheduling
                  issues.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Booking History & Reports</h4>
                <p className="text-foreground/80 text-sm">
                  Complete booking history with usage analytics. Generate reports on utilization, revenue, and popular
                  time slots.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Mobile Access</h4>
                <p className="text-foreground/80 text-sm">
                  Book spaces, check availability, and manage events from any mobile device. Full functionality on the
                  go.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Streamline Your Event Management Today</h2>
            <p className="text-lg opacity-90">
              Join facilities worldwide using digital booking systems to eliminate conflicts and save time
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
