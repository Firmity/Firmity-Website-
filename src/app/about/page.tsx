import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { CheckCircle, Users, Lightbulb, Globe } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously evolve our software to meet the changing needs of modern facility management.",
    },
    {
      icon: Users,
      title: "Customer First",
      description:
        "Your success is our priority. We provide dedicated support and training to ensure you get maximum value.",
    },
    {
      icon: Globe,
      title: "Sustainability",
      description: "We build technology that reduces waste, promotes efficiency, and supports eco-friendly operations.",
    },
  ]

  const milestones = [
    {
      year: "2015",
      title: "Founded",
      description: "UFIRM Technologies established with a vision to digitalize facility management",
    },
    {
      year: "2017",
      title: "First Release",
      description: "Launched initial version of Firmity CMMS software",
    },
    {
      year: "2020",
      title: "Cloud Migration",
      description: "Moved to cloud-based infrastructure for enhanced accessibility",
    },
    {
      year: "2023",
      title: "Enhanced Suite",
      description: "Added Payroll, Advanced Analytics, and Enterprise Features",
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
              About Firmity
            </h1>
            <p className="text-lg text-foreground/80 text-center max-w-2xl mx-auto">
              We're on a mission to simplify facility management through intelligent, integrated software solutions that
              empower teams worldwide.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Story</h2>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  UFIRM Technologies was founded with a simple yet powerful idea: facility management shouldn't be
                  complicated. We saw organizations struggling with scattered systems, missed maintenance schedules, and
                  inefficient processes.
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  That's why we created Firmity—a comprehensive, integrated platform that brings all aspects of facility
                  management into one intelligent system. Today, we're proud to serve organizations across India with
                  software that drives productivity, longevity, and sustainability.
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  Made in India, Firmity represents our commitment to building world-class technology solutions that are
                  accessible, reliable, and truly transformative.
                </p>
              </div>
              <div className="bg-primary/10 rounded-2xl p-8 flex items-center justify-center min-h-80">
                <div className="text-center text-foreground/40 space-y-4">
                  <div className="text-6xl">🏢</div>
                  <p>UFIRM Technologies</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-background rounded-lg p-8 border border-border space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
                <p className="text-foreground/80 leading-relaxed">
                  To empower organizations with intelligent, integrated facility management software that simplifies
                  operations, enhances visibility, and maximizes efficiency across all facility functions.
                </p>
              </div>
              <div className="bg-background rounded-lg p-8 border border-border space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
                <p className="text-foreground/80 leading-relaxed">
                  To be the leading facility management platform that organizations trust to digitalize, optimize, and
                  sustain their operations while reducing environmental impact and operational costs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div
                    key={index}
                    className="bg-card rounded-lg p-8 border border-border space-y-4 text-center hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-center">
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <Icon size={32} className="text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                    <p className="text-foreground/80">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Our Journey</h2>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                      {milestone.year.slice(-2)}
                    </div>
                    {index < milestones.length - 1 && <div className="w-1 h-16 bg-primary/30 mt-2"></div>}
                  </div>
                  <div className="bg-background rounded-lg p-6 border border-border flex-1">
                    <h4 className="text-xl font-bold text-foreground mb-2">{milestone.title}</h4>
                    <p className="text-foreground/80">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Why Organizations Choose Firmity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Comprehensive Solution",
                  description:
                    "One integrated platform for all facility management needs—no need to juggle multiple systems.",
                },
                {
                  title: "Local Expertise",
                  description: "Built in India by a team that understands the unique needs of Indian organizations.",
                },
                {
                  title: "Dedicated Support",
                  description: "Our team is available Mon-Sat from 9am-6pm IST to support your success.",
                },
                {
                  title: "Continuous Innovation",
                  description:
                    "We regularly update and enhance our software based on customer feedback and industry trends.",
                },
                {
                  title: "Scalable Platform",
                  description: "From small teams to large enterprises, Firmity scales with your organization.",
                },
                {
                  title: "Data Security",
                  description: "Your data is secure in our cloud infrastructure with role-based access controls.",
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-4 p-6 bg-primary/5 rounded-lg border border-primary/20">
                  <CheckCircle size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
                    <p className="text-foreground/80 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Three Pillars */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Built on Three Pillars</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background rounded-lg p-8 border border-border text-center space-y-4">
                <div className="text-5xl">🚀</div>
                <h3 className="text-2xl font-bold text-foreground">Productivity</h3>
                <p className="text-foreground/80">
                  Maximize efficiency with automated workflows, smart scheduling, and real-time visibility into all
                  operations.
                </p>
              </div>
              <div className="bg-background rounded-lg p-8 border border-border text-center space-y-4">
                <div className="text-5xl">⏱️</div>
                <h3 className="text-2xl font-bold text-foreground">Longevity</h3>
                <p className="text-foreground/80">
                  Extend asset lifespan with planned preventive maintenance, predictive alerts, and comprehensive
                  tracking.
                </p>
              </div>
              <div className="bg-background rounded-lg p-8 border border-border text-center space-y-4">
                <div className="text-5xl">🌱</div>
                <h3 className="text-2xl font-bold text-foreground">Sustainability</h3>
                <p className="text-foreground/80">
                  Reduce waste, cut energy consumption, and build eco-friendly operations through smart resource
                  management.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Join Leading Organizations?</h2>
            <p className="text-lg opacity-90">Experience how Firmity can transform your facility management</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/contact"
                className="bg-primary-foreground text-primary px-8 py-3 rounded-lg hover:bg-background transition-colors font-semibold"
              >
                Start Free Trial
              </Link>
              <Link
                href="/features"
                className="border-2 border-primary-foreground text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary-foreground/10 transition-colors font-semibold"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
