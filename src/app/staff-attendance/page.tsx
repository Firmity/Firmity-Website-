import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Users, Calendar, CheckCircle, Clock, BarChart, Smartphone, FileText } from "lucide-react"

export default function StaffAttendancePage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-background py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <Users className="text-primary" size={20} />
                <span className="text-sm font-semibold text-primary">Facility Staff Attendance & Leave</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                Digital Attendance Tracking & Leave Management
              </h1>
              <p className="text-lg text-foreground/80 text-balance">
                Streamline HR operations with digital attendance tracking, automated leave approvals, and comprehensive
                workforce analytics. Full transparency in one platform.
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Complete HR Management Solution</h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                From clock-in to payroll reports, manage your entire workforce digitally
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Clock className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Digital Clock-In/Out</h3>
                <p className="text-foreground/80">
                  Staff mark attendance digitally using mobile apps, web portals, or biometric devices. Automatic
                  timestamp recording eliminates manual registers.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Calendar className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Leave Management</h3>
                <p className="text-foreground/80">
                  Staff submit leave requests digitally. Managers approve or reject with one click. Track leave
                  balances, accruals, and history automatically.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <CheckCircle className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Shift Scheduling</h3>
                <p className="text-foreground/80">
                  Create and manage work schedules digitally. Staff can view their shifts, swap shifts with approvals,
                  and receive schedule notifications.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <BarChart className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Attendance Reports</h3>
                <p className="text-foreground/80">
                  Generate comprehensive attendance reports by employee, department, or date range. Export data for
                  payroll processing and analysis.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Smartphone className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Mobile Access</h3>
                <p className="text-foreground/80">
                  Staff and managers access the system from any mobile device. Mark attendance, submit leaves, and
                  approve requests on the go.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <FileText className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Payroll Integration</h3>
                <p className="text-foreground/80">
                  Attendance data feeds directly into payroll systems. Calculate work hours, overtime, and deductions
                  automatically for accurate payroll.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Simple Attendance Workflow</h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                Streamlined processes for both staff and managers
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">For Staff Members</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Clock In</h4>
                      <p className="text-foreground/80 text-sm">
                        Mark attendance using mobile app, web portal, or biometric device when starting shift
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Request Leave</h4>
                      <p className="text-foreground/80 text-sm">
                        Submit leave requests with dates, type, and reason. Check leave balance in real-time
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">View Schedule</h4>
                      <p className="text-foreground/80 text-sm">
                        Access work schedule, shift timings, and upcoming assignments anytime
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        4
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Clock Out</h4>
                      <p className="text-foreground/80 text-sm">
                        Mark attendance when ending shift. System automatically calculates work hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">For Managers</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Monitor Attendance</h4>
                      <p className="text-foreground/80 text-sm">
                        View real-time attendance dashboard showing who is present, absent, or on leave
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Approve Leave</h4>
                      <p className="text-foreground/80 text-sm">
                        Review leave requests and approve or reject with one click. Add comments if needed
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Create Schedules</h4>
                      <p className="text-foreground/80 text-sm">
                        Plan and publish work schedules. System checks for conflicts and adequate coverage
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        4
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Generate Reports</h4>
                      <p className="text-foreground/80 text-sm">
                        Export attendance reports for payroll, analyze patterns, and identify issues
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Transform HR Operations</h2>
                <p className="text-lg text-foreground/80">
                  Digital attendance systems save HR teams 10-15 hours per week on manual tracking, reduce payroll
                  errors by 95%, and improve workforce productivity by 20% through better visibility.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <CheckCircle className="text-primary" size={20} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Eliminate Manual Registers</h4>
                      <p className="text-foreground/80 text-sm">
                        No more paper attendance sheets, manual calculations, or data entry errors
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
                      <h4 className="font-bold text-foreground mb-1">Prevent Time Theft</h4>
                      <p className="text-foreground/80 text-sm">
                        Biometric authentication and GPS tracking prevent buddy punching and false attendance
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
                      <h4 className="font-bold text-foreground mb-1">Streamline Leave Management</h4>
                      <p className="text-foreground/80 text-sm">
                        One-click leave approvals and automatic balance calculations save hours of administrative work
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
                      <h4 className="font-bold text-foreground mb-1">Ensure Compliance</h4>
                      <p className="text-foreground/80 text-sm">
                        Maintain complete audit trails for labor law compliance and government reporting
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Leave Types Supported</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Paid Time Off (PTO)</h4>
                    <p className="text-foreground/80 text-sm">
                      Annual leave, vacation days, and earned leave with accrual tracking
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Sick Leave</h4>
                    <p className="text-foreground/80 text-sm">
                      Medical leave with optional doctor note requirements and balance tracking
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Casual Leave</h4>
                    <p className="text-foreground/80 text-sm">
                      Short-term personal leave for urgent matters with flexible approval rules
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Compensatory Off</h4>
                    <p className="text-foreground/80 text-sm">
                      Comp off for overtime work, weekend shifts, or holiday work
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Special Leave</h4>
                    <p className="text-foreground/80 text-sm">
                      Maternity, paternity, bereavement, and other special circumstance leaves
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Advanced Attendance Features</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Biometric Integration</h4>
                <p className="text-foreground/80 text-sm">
                  Integrate with fingerprint, face recognition, or card-based biometric devices for foolproof attendance
                  tracking.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">GPS Verification</h4>
                <p className="text-foreground/80 text-sm">
                  Enable location-based attendance marking to ensure staff are at designated work sites when clocking
                  in.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Overtime Tracking</h4>
                <p className="text-foreground/80 text-sm">
                  Automatically calculate overtime hours based on configurable rules. Generate overtime reports for
                  payroll.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Late/Early Departure Alerts</h4>
                <p className="text-foreground/80 text-sm">
                  Set grace periods and receive alerts for late arrivals or early departures. Track patterns and take
                  corrective action.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Leave Accrual Rules</h4>
                <p className="text-foreground/80 text-sm">
                  Configure complex leave accrual rules, carry-forward policies, and encashment rules based on company
                  policy.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Shift Management</h4>
                <p className="text-foreground/80 text-sm">
                  Manage multiple shifts, rotations, and split shifts. Staff can view schedules and request shift swaps.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reports */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Comprehensive HR Reports</h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                Data-driven insights for better workforce management
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                <BarChart className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Attendance Summary</h4>
                <p className="text-foreground/80 text-sm">
                  Daily, weekly, or monthly attendance summaries by individual, department, or entire organization.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <BarChart className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Leave Balance Report</h4>
                <p className="text-foreground/80 text-sm">
                  Current leave balances, accruals, leaves taken, and leaves pending for all staff members.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <BarChart className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Absenteeism Analysis</h4>
                <p className="text-foreground/80 text-sm">
                  Identify patterns in absenteeism, frequent offenders, and departments with high absence rates.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <BarChart className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Payroll Export</h4>
                <p className="text-foreground/80 text-sm">
                  Export attendance data in payroll-ready format with work hours, overtime, and deductions.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <BarChart className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Punctuality Report</h4>
                <p className="text-foreground/80 text-sm">
                  Track late arrivals, early departures, and overall punctuality trends across the workforce.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <BarChart className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Compliance Reports</h4>
                <p className="text-foreground/80 text-sm">
                  Generate reports for labor department, statutory compliance, and government audits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Modernize Your HR Operations Today</h2>
            <p className="text-lg opacity-90">
              Join facilities saving 15 hours per week with digital attendance and leave management
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
