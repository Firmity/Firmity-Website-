"use client"

import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { BrochureDownloadForm } from "@/src/components/brochure-download-form"
import { VideoModal } from "@/src/components/video-modal"
import { ClientsCarousel } from "@/src/components/clients-carousel"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, ArrowRight, Play } from "lucide-react"
import { useState, useEffect } from "react"

export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false)

  useEffect(() => {
    setVideoOpen(true)
  }, [])

  const videoUrl = process.env.NEXT_PUBLIC_VIDEO_URL || "https://www.youtube.com/embed/dQw4w9WgXcQ"

  const benefits = [
    {
      title: "Centralized records enable faster decision-making",
      icon: "📊",
    },
    {
      title: "Automated task alerts ensure nothing is missed",
      icon: "🔔",
    },
    {
      title: "Integrated modules boost team coordination and speed",
      icon: "⚡",
    },
  ]

  const pillars = [
    {
      title: "Productivity",
      description:
        "Scheduled PPM extends asset life. Digital logs support better upkeep planning. Smart tracking reduces wear and tear.",
      icon: "🚀",
    },
    {
      title: "Longevity",
      description:
        "Planned preventive maintenance increases equipment lifespan. Real-time monitoring enables proactive interventions.",
      icon: "⏱️",
    },
    {
      title: "Sustainability",
      description:
        "Efficient resource use cuts waste. Paperless operations promote eco-friendliness. Smart access control lowers energy use.",
      icon: "🌱",
    },
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
                  Powered by Technology
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                  The Complete Facility Management Software Suite
                </h1>
                <p className="text-lg text-foreground/80">
                  Firmity is a smart, integrated facility management software built to simplify operations, enhance
                  visibility, and empower teams with real-time control over maintenance, assets, workforce, and
                  compliance—digitally and efficiently.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/contact"
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center gap-2"
                  >
                    Book Tech Demo <ArrowRight size={20} />
                  </Link>
                  <Link
                    href="/pricing"
                    className="border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary/10 transition-colors font-semibold"
                  >
                    Try Free for 6 Weeks
                  </Link>
                </div>
              </div>
<div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 flex items-center justify-center min-h-80">
                <Image
                  src="/Home_page.png"
                  alt="Firmity Dashboard - Cloud-Based Facility Management"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">
              Real Challenges, Real Solutions
            </h2>
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 space-y-4">
              <p className="text-lg text-foreground/90">
                Imagine missing an AMC renewal, overlooking a water tank cleaning schedule, or losing track of vendor
                payments—these are everyday challenges Firmity solves.
              </p>
              <p className="text-lg text-foreground/90">Experience how technology can simplify facility management.</p>
            </div>
          </div>
        </section>

        {/* Core Benefits */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Why Choose Firmity</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl">{benefit.icon}</div>
                  <h3 className="font-semibold text-foreground text-lg">{benefit.title}</h3>
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
              {pillars.map((pillar, index) => (
                <div key={index} className="bg-background rounded-lg p-8 space-y-4 border border-border">
                  <div className="text-5xl">{pillar.icon}</div>
                  <h3 className="text-2xl font-bold text-foreground">{pillar.title}</h3>
                  <p className="text-foreground/80">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Comprehensive Management Modules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Cloud-based Facility Records",
                "Planned Preventive Maintenance",
                "Event Organizer & Booking",
                "Complaint Management System",
                "Asset Management & Alerts",
                "Inventory Purchase & Stock",
                "Staff Attendance & Leave",
                "Visitor Management & Records",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg border border-primary/20"
                >
                  <CheckCircle size={24} className="text-primary flex-shrink-0 mt-1" />
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video and Brochure Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">See Firmity in Action</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Brochure Form - Left side */}
              <div>
                <BrochureDownloadForm />
              </div>

              {/* Video and Content - Right side */}
              <div className="space-y-6">
                <div
                  onClick={() => setVideoOpen(true)}
                  className="group cursor-pointer bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="aspect-video flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="group-hover:scale-110 transition-transform">
                        <Play size={80} className="text-primary mx-auto" />
                      </div>
                      <p className="text-lg font-semibold text-foreground">Click to Watch Demo Video</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Complete Facility Management Platform</h3>
                  <p className="text-foreground/80 mb-4">
                    Watch our comprehensive demo to understand how Firmity streamlines your facility operations with
                    integrated digital tools.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-primary flex-shrink-0 mt-1" />
                      <span className="text-foreground">Real-time asset tracking and maintenance</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-primary flex-shrink-0 mt-1" />
                      <span className="text-foreground">Visitor and staff management</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-primary flex-shrink-0 mt-1" />
                      <span className="text-foreground">Digital compliance and reporting</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold mb-2">TRUSTED BY LEADING COMPANIES</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Companies Using Firmity</h2>
            </div>

            <ClientsCarousel />

            <div className="mt-12 text-center">
              <p className="text-foreground/80 text-lg mb-6">
                Join hundreds of facility managers and organizations transforming their operations with Firmity
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                Learn how they use Firmity <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your Facility Management?</h2>
            <p className="text-lg opacity-90">Get 6 weeks free trial with unlimited training and 24/7 support</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/contact"
                className="bg-primary-foreground text-primary px-8 py-3 rounded-lg hover:bg-background transition-colors font-semibold"
              >
                Start Your Free Trial
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

      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoUrl={videoUrl}
        title="Firmity CMMS - Complete Facility Management Software"
      />
    </>
  )
}
