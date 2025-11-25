// import { Navigation } from "@/src/components/navigation"
// import { Footer } from "@/src/components/footer"
// import { Cloud, Clock, Calendar, AlertCircle, Package, Users, Zap } from "lucide-react"

// export default function FeaturesPage() {
//   const features = [
//     {
//       icon: Cloud,
//       title: "Cloud-Based Facility Records",
//       description:
//         "Access and update all your facility documents anytime, anywhere—securely stored in the cloud. Real-time synchronization across all devices ensures everyone has the latest information.",
//       benefits: ["24/7 access", "Secure storage", "Real-time sync"],
//     },
//     {
//       icon: Clock,
//       title: "Planned Preventive Maintenance",
//       description:
//         "Auto-schedule and track maintenance tasks to avoid last-minute breakdowns. Extend asset lifespan and reduce downtime with intelligent scheduling.",
//       benefits: ["Auto-scheduling", "Downtime reduction", "Asset longevity"],
//     },
//     {
//       icon: Calendar,
//       title: "Event Organizer & Booking",
//       description:
//         "Digitally manage club/conference room bookings and community events with ease and transparency. Eliminate scheduling conflicts with intuitive calendar management.",
//       benefits: ["Room bookings", "Event management", "Transparency"],
//     },
//     {
//       icon: AlertCircle,
//       title: "Complaint Management System",
//       description:
//         "Scan, log, and track complaints in real time with QR-based reporting. Ensure every issue is captured and resolved promptly.",
//       benefits: ["QR-based entry", "Real-time tracking", "Issue resolution"],
//     },
//     {
//       icon: Package,
//       title: "Asset Management & Alerts",
//       description:
//         "Monitor assets and get timely alerts for maintenance and service due dates. Never miss critical maintenance windows again.",
//       benefits: ["Real-time monitoring", "Smart alerts", "Service tracking"],
//     },
//     {
//       icon: Zap,
//       title: "Inventory Purchase & Stock",
//       description:
//         "Generate POs, track purchases, and maintain real-time stock records—paperless and efficient. Streamline procurement and reduce waste.",
//       benefits: ["PO generation", "Stock tracking", "Paperless ops"],
//     },
//     {
//       icon: Users,
//       title: "Facility Staff Attendance & Leave",
//       description:
//         "Digitally track staff attendance and approve leaves with one-click transparency. Simplify HR operations and ensure full visibility.",
//       benefits: ["Digital tracking", "Leave approval", "Transparency"],
//     },
//     {
//       icon: AlertCircle,
//       title: "Visitor Management & Records",
//       description:
//         "Log, monitor, and retrieve visitor records digitally for enhanced security and reporting. Maintain comprehensive audit trails for compliance.",
//       benefits: ["Digital logging", "Security", "Compliance"],
//     },
//   ]

//   return (
//     <>
//       <Navigation />
//       <main>
//         {/* Hero */}
//         <section className="bg-gradient-to-br from-primary/5 to-background py-16 md:py-24">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <h1 className="text-4xl md:text-5xl font-bold text-foreground text-center text-balance mb-6">
//               Comprehensive Management Modules
//             </h1>
//             <p className="text-lg text-foreground/80 text-center max-w-2xl mx-auto">
//               Everything you need to manage facilities, assets, staff, and compliance in one integrated platform.
//             </p>
//           </div>
//         </section>

//         {/* Features Grid */}
//         <section className="py-16 md:py-20 bg-background">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {features.map((feature, index) => {
//                 const Icon = feature.icon
//                 return (
//                   <div
//                     key={index}
//                     className="bg-card border border-border rounded-lg p-8 space-y-6 hover:shadow-lg transition-shadow"
//                   >
//                     <div className="flex items-start gap-4">
//                       <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
//                         <Icon size={28} className="text-primary" />
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="text-2xl font-bold text-foreground mb-2">{feature.title}</h3>
//                         <p className="text-foreground/80 leading-relaxed">{feature.description}</p>
//                       </div>
//                     </div>
//                     <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
//                       {feature.benefits.map((benefit, idx) => (
//                         <span
//                           key={idx}
//                           className="inline-block bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
//                         >
//                           {benefit}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </section>

//         {/* Additional Modules */}
//         <section className="py-16 md:py-20 bg-primary/5">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
//               Additional Management Capabilities
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="bg-background rounded-lg p-6 border border-border text-center space-y-3">
//                 <div className="text-4xl">👥</div>
//                 <h4 className="font-bold text-foreground">Payroll Management</h4>
//                 <p className="text-foreground/80 text-sm">
//                   Streamlined payroll processing with automated calculations and compliance reporting.
//                 </p>
//               </div>
//               <div className="bg-background rounded-lg p-6 border border-border text-center space-y-3">
//                 <div className="text-4xl">📋</div>
//                 <h4 className="font-bold text-foreground">Attendance Tracking</h4>
//                 <p className="text-foreground/80 text-sm">
//                   Real-time attendance monitoring with digital records and leave management.
//                 </p>
//               </div>
//               <div className="bg-background rounded-lg p-6 border border-border text-center space-y-3">
//                 <div className="text-4xl">🚪</div>
//                 <h4 className="font-bold text-foreground">Visitor Management</h4>
//                 <p className="text-foreground/80 text-sm">
//                   Enhanced security and compliance with comprehensive visitor logging.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Why These Features */}
//         <section className="py-16 md:py-20 bg-background">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//             <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">
//               Why Integrated Features Matter
//             </h2>
//             <div className="space-y-6">
//               <div className="flex gap-6">
//                 <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
//                   <span className="text-2xl">1</span>
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-foreground mb-2">Reduced Operational Complexity</h4>
//                   <p className="text-foreground/80">
//                     One platform handles all your facility management needs—no more juggling multiple systems.
//                   </p>
//                 </div>
//               </div>
//               <div className="flex gap-6">
//                 <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
//                   <span className="text-2xl">2</span>
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-foreground mb-2">Better Data Visibility</h4>
//                   <p className="text-foreground/80">
//                     Centralized records provide comprehensive insights for smarter decision-making.
//                   </p>
//                 </div>
//               </div>
//               <div className="flex gap-6">
//                 <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
//                   <span className="text-2xl">3</span>
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-foreground mb-2">Enhanced Team Collaboration</h4>
//                   <p className="text-foreground/80">
//                     Real-time updates and integrated workflows ensure seamless coordination across departments.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* CTA */}
//         <section className="py-16 md:py-20 bg-primary text-primary-foreground">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
//             <h2 className="text-3xl md:text-4xl font-bold">Experience All Features Risk-Free</h2>
//             <p className="text-lg opacity-90">Try Firmity for 6 weeks with no credit card required</p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
//               <a
//                 href="/contact"
//                 className="bg-primary-foreground text-primary px-8 py-3 rounded-lg hover:bg-background transition-colors font-semibold"
//               >
//                 Start Free Trial
//               </a>
//               <a
//                 href="/pricing"
//                 className="border-2 border-primary-foreground text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary-foreground/10 transition-colors font-semibold"
//               >
//                 View Pricing
//               </a>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   )
// }





import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Cloud, Clock, Calendar, AlertCircle, Package, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function FeaturesPage() {
  const features = [
    {
      icon: Cloud,
      title: "Cloud-Based Facility Records",
      description:
        "Access and update all your facility documents anytime, anywhere—securely stored in the cloud. Real-time synchronization across all devices ensures everyone has the latest information.",
      benefits: ["24/7 access", "Secure storage", "Real-time sync"],
      link: "/facility-records",
    },
    {
      icon: Clock,
      title: "Planned Preventive Maintenance",
      description:
        "Auto-schedule and track maintenance tasks to avoid last-minute breakdowns. Extend asset lifespan and reduce downtime with intelligent scheduling.",
      benefits: ["Auto-scheduling", "Downtime reduction", "Asset longevity"],
      link: "/preventive-maintenance",
    },
    {
      icon: Calendar,
      title: "Event Organizer & Booking",
      description:
        "Digitally manage club/conference room bookings and community events with ease and transparency. Eliminate scheduling conflicts with intuitive calendar management.",
      benefits: ["Room bookings", "Event management", "Transparency"],
      link: "/event-booking",
    },
    {
      icon: AlertCircle,
      title: "Complaint Management System",
      description:
        "Scan, log, and track complaints in real time with QR-based reporting. Ensure every issue is captured and resolved promptly.",
      benefits: ["QR-based entry", "Real-time tracking", "Issue resolution"],
      link: "/complaint-management",
    },
    {
      icon: Package,
      title: "Asset Management & Alerts",
      description:
        "Monitor assets and get timely alerts for maintenance and service due dates. Never miss critical maintenance windows again.",
      benefits: ["Real-time monitoring", "Smart alerts", "Service tracking"],
      link: "/asset-management",
    },
    {
      icon: Zap,
      title: "Inventory Purchase & Stock",
      description:
        "Generate POs, track purchases, and maintain real-time stock records—paperless and efficient. Streamline procurement and reduce waste.",
      benefits: ["PO generation", "Stock tracking", "Paperless ops"],
      link: "/inventory-management",
    },
    {
      icon: Users,
      title: "Facility Staff Attendance & Leave",
      description:
        "Digitally track staff attendance and approve leaves with one-click transparency. Simplify HR operations and ensure full visibility.",
      benefits: ["Digital tracking", "Leave approval", "Transparency"],
      link: "/staff-attendance",
    },
    {
      icon: AlertCircle,
      title: "Visitor Management & Records",
      description:
        "Log, monitor, and retrieve visitor records digitally for enhanced security and reporting. Maintain comprehensive audit trails for compliance.",
      benefits: ["Digital logging", "Security", "Compliance"],
      link: "/visitor-management",
    },
  ]

  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 to-background py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-center text-balance mb-6">
              Comprehensive Management Modules
            </h1>
            <p className="text-lg text-foreground/80 text-center max-w-2xl mx-auto">
              Everything you need to manage facilities, assets, staff, and compliance in one integrated platform.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                const CardContent = (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-lg p-8 space-y-6 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                        <Icon size={28} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-foreground mb-2">{feature.title}</h3>
                        <p className="text-foreground/80 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                      {feature.benefits.map((benefit, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                )

                return feature.link ? (
                  <Link key={index} href={feature.link}>
                    {CardContent}
                  </Link>
                ) : (
                  <div key={index}>{CardContent}</div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Additional Modules */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Additional Management Capabilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-background rounded-lg p-6 border border-border text-center space-y-3">
                <div className="text-4xl">👥</div>
                <h4 className="font-bold text-foreground">Payroll Management</h4>
                <p className="text-foreground/80 text-sm">
                  Streamlined payroll processing with automated calculations and compliance reporting.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border text-center space-y-3">
                <div className="text-4xl">📋</div>
                <h4 className="font-bold text-foreground">Attendance Tracking</h4>
                <p className="text-foreground/80 text-sm">
                  Real-time attendance monitoring with digital records and leave management.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border text-center space-y-3">
                <div className="text-4xl">🚪</div>
                <h4 className="font-bold text-foreground">Visitor Management</h4>
                <p className="text-foreground/80 text-sm">
                  Enhanced security and compliance with comprehensive visitor logging.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why These Features */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">
              Why Integrated Features Matter
            </h2>
            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Reduced Operational Complexity</h4>
                  <p className="text-foreground/80">
                    One platform handles all your facility management needs—no more juggling multiple systems.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Better Data Visibility</h4>
                  <p className="text-foreground/80">
                    Centralized records provide comprehensive insights for smarter decision-making.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Enhanced Team Collaboration</h4>
                  <p className="text-foreground/80">
                    Real-time updates and integrated workflows ensure seamless coordination across departments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Experience All Features Risk-Free</h2>
            <p className="text-lg opacity-90">Try Firmity for 6 weeks with no credit card required</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="/contact"
                className="bg-primary-foreground text-primary px-8 py-3 rounded-lg hover:bg-background transition-colors font-semibold"
              >
                Start Free Trial
              </a>
              <a
                href="/pricing"
                className="border-2 border-primary-foreground text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary-foreground/10 transition-colors font-semibold"
              >
                View Pricing
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
