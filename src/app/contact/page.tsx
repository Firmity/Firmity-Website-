"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    manpower: "",
    message: "",
    requestType: "demo",
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          companyName: "",
          manpower: "",
          message: "",
          requestType: "demo",
        })
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        throw new Error("Failed to submit form")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 to-background py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-center text-balance mb-6">
              Let's Get Started
            </h1>
            <p className="text-lg text-foreground/80 text-center max-w-2xl mx-auto">
              Schedule a personalized demo or get in touch with our team. We're here to help you transform your facility
              management.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Email */}
              <div className="flex flex-col items-center text-center space-y-4 p-6 bg-card rounded-lg border border-border">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <Mail size={32} className="text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-lg">Email Us</h3>
                <a href="mailto:info@ufirm.in" className="text-primary hover:underline">
                  info@ufirm.in
                </a>
                <p className="text-sm text-foreground/80">We'll respond within 24 hours</p>
              </div>

              {/* Phone */}
              <div className="flex flex-col items-center text-center space-y-4 p-6 bg-card rounded-lg border border-border">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <Phone size={32} className="text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-lg">Call Us</h3>
                <p className="text-primary font-semibold">Available on Request</p>
                <p className="text-sm text-foreground/80">Mon-Sat, 9am-6pm IST</p>
              </div>

              {/* Location */}
              <div className="flex flex-col items-center text-center space-y-4 p-6 bg-card rounded-lg border border-border">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <MapPin size={32} className="text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-lg">Location</h3>
                <p className="text-foreground/80 text-sm">UFIRM Technologies (P) Limited</p>
                <p className="text-sm text-foreground/80">Proudly Made in India</p>
              </div>
            </div>

            {/* Form Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Request a Demo or Trial</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Team Size</label>
                    <select
                      name="manpower"
                      value={formData.manpower}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select team size</option>
                      <option value="1-10">1-10 people</option>
                      <option value="11-50">11-50 people</option>
                      <option value="51-100">51-100 people</option>
                      <option value="100+">100+ people</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Request Type</label>
                    <select
                      name="requestType"
                      value={formData.requestType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="demo">Schedule a Demo</option>
                      <option value="trial">Start Free Trial</option>
                      <option value="question">Ask a Question</option>
                      <option value="custom">Custom Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Tell us about your facility management needs..."
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                      <AlertCircle size={18} className="text-red-600 flex-shrink-0" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Request
                      </>
                    )}
                  </button>
                </form>

                {submitted && (
                  <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2">
                    <CheckCircle size={20} className="text-emerald-600 flex-shrink-0" />
                    <p className="text-emerald-700 font-semibold">Thank you! We'll be in touch within 24 hours.</p>
                  </div>
                )}
              </div>

              {/* Benefits */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">Why Schedule a Demo?</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Personalized Walkthrough</h4>
                        <p className="text-foreground/80 text-sm">See how Firmity works with your specific use cases</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Expert Guidance</h4>
                        <p className="text-foreground/80 text-sm">
                          Get recommendations from our facility management experts
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Immediate Setup</h4>
                        <p className="text-foreground/80 text-sm">Start your free trial immediately after the demo</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">No Obligation</h4>
                        <p className="text-foreground/80 text-sm">
                          Explore the software risk-free with our 6-week trial
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 space-y-3">
                  <h4 className="font-bold text-foreground">What to Expect</h4>
                  <ul className="space-y-2 text-foreground/80 text-sm">
                    <li>- 30-minute personalized demo call</li>
                    <li>- Feature walkthrough tailored to your needs</li>
                    <li>- Q&A with our facility experts</li>
                    <li>- Instant trial account activation</li>
                    <li>- Dedicated onboarding support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your Facility Operations?</h2>
            <p className="text-lg opacity-90">Get started with a free 6-week trial today</p>
            <p className="text-sm opacity-80">No credit card required. Full access to all features.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
