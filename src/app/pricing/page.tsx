"use client"

import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Check, XIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function PricingPage() {
  const [selectedTier, setSelectedTier] = useState("Growth")

  const pricingTiers = [
    {
      name: "Startup",
      manpower: "1-10",
      price: 300,
      period: "per person/month",
      trial: "6 WEEKS FREE",
      highlight: false,
      color: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      name: "Growth",
      manpower: "11-50",
      price: 250,
      period: "per person/month",
      trial: "6 WEEKS FREE",
      highlight: true,
      color: "bg-primary/10",
      borderColor: "border-primary",
      badge: "Most Popular",
    },
    {
      name: "Enterprise",
      manpower: "51-100+",
      price: 180,
      period: "per person/month",
      trial: "6 WEEKS FREE",
      highlight: false,
      color: "bg-blue-50",
      borderColor: "border-blue-200",
    },
  ]

  const comparisonFeatures = [
    { category: "Users", icon: "👥", startup: "1-10", growth: "11-50", enterprise: "51-100+" },
    { category: "Monthly Cost Per User", icon: "💰", startup: "₹300", growth: "₹250", enterprise: "₹180" },
    { category: "Free Trial", icon: "🎁", startup: "6 weeks", growth: "6 weeks", enterprise: "6 weeks" },
    {
      category: "Core Features",
      icon: "⭐",
      startup: "All",
      growth: "All",
      enterprise: "All",
      divider: true,
    },
    { category: "Digital Facility Records", startup: true, growth: true, enterprise: true },
    { category: "Planned Preventive Maintenance", startup: true, growth: true, enterprise: true },
    { category: "Asset & Alert Management", startup: true, growth: true, enterprise: true },
    { category: "Visitor Management", startup: true, growth: true, enterprise: true },
    { category: "Staff Attendance & Payroll", startup: true, growth: true, enterprise: true },
    { category: "Event Booking & Organization", startup: true, growth: true, enterprise: true },
    { category: "Complaint Management System", startup: true, growth: true, enterprise: true },
    { category: "Inventory & Stock Tracking", startup: true, growth: true, enterprise: true },
    {
      category: "Support & Training",
      icon: "🤝",
      startup: "",
      growth: "",
      enterprise: "",
      divider: true,
    },
    { category: "Unlimited Team Training", startup: true, growth: true, enterprise: true },
    { category: "Digital Report Downloads", startup: true, growth: true, enterprise: true },
    { category: "Email Support (Mon-Sat)", startup: true, growth: true, enterprise: true },
    { category: "Bulk Data Entry Support", startup: "2x yearly", growth: "2x yearly", enterprise: "Unlimited" },
    { category: "Priority Support", startup: false, growth: true, enterprise: true },
    { category: "Dedicated Account Manager", startup: false, growth: false, enterprise: true },
    { category: "Custom Training Program", startup: false, growth: false, enterprise: true },
    {
      category: "Advanced Features",
      icon: "🚀",
      startup: "",
      growth: "",
      enterprise: "",
      divider: true,
    },
    { category: "Role-Based Access Control", startup: true, growth: true, enterprise: true },
    { category: "Custom Integrations", startup: false, growth: "Optional", enterprise: true },
    { category: "API Access", startup: false, growth: false, enterprise: true },
    { category: "Advanced Analytics & Reports", startup: false, growth: "Basic", enterprise: true },
    { category: "Data Security & Compliance", startup: true, growth: true, enterprise: true },
  ]

  return (
    <>
      <Navigation />
      <main className="bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/8 via-background to-background py-16 md:py-24 border-b border-primary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                Simple, Transparent Pricing
              </h1>
              <p className="text-lg text-foreground/70">
                Choose the perfect plan for your organization. All plans include a 6-week free trial, unlimited
                training, and expert support.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Tiers Cards */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  onClick={() => setSelectedTier(tier.name)}
                  className={`cursor-pointer rounded-2xl p-8 border-2 transition-all transform hover:scale-105 ${
                    selectedTier === tier.name
                      ? `border-primary ${tier.color} shadow-xl`
                      : `border-border hover:border-primary/50 ${tier.color}`
                  }`}
                >
                  <div className="space-y-4">
                    {tier.badge && (
                      <div className="inline-block bg-primary text-primary-foreground text-xs font-bold px-4 py-2 rounded-full">
                        {tier.badge}
                      </div>
                    )}
                    <h3 className="text-2xl font-bold text-foreground">{tier.name}</h3>
                    <p className="text-foreground/70 text-sm">{tier.manpower} employees</p>

                    <div className="space-y-2 py-6 border-y border-border/50">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-primary">₹{tier.price}</span>
                        <span className="text-foreground/70 text-sm">{tier.period}</span>
                      </div>
                      <p className="text-sm font-semibold text-primary">{tier.trial}</p>
                    </div>

                    <Link
                      href="/contact"
                      className={`w-full py-3 rounded-lg font-semibold transition-all text-center block ${
                        selectedTier === tier.name
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "border-2 border-primary text-primary hover:bg-primary/5"
                      }`}
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground text-center mb-12">Detailed Comparison</h2>

              <div className="overflow-x-auto rounded-2xl border border-border shadow-lg">
                <table className="w-full">
                  <thead>
                    <tr className="bg-primary/5 border-b border-border">
                      <th className="px-6 py-5 text-left font-bold text-foreground sticky left-0 bg-primary/5 min-w-56 z-10">
                        Features
                      </th>
                      {pricingTiers.map((tier) => (
                        <th
                          key={tier.name}
                          className={`px-6 py-5 text-center font-bold text-foreground min-w-48 ${
                            selectedTier === tier.name ? `bg-primary/10 border-r-4 border-primary` : "bg-background"
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="text-lg">{tier.name}</div>
                            <div className="text-sm font-normal text-foreground/70">{tier.manpower}</div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((feature, idx) => {
                      const isDivider = "divider" in feature && feature.divider
                      if (isDivider) {
                        return (
                          <tr key={idx} className="bg-primary/3 border-t-2 border-primary/20">
                            <td
                              colSpan={4}
                              className="px-6 py-4 font-bold text-foreground/80 sticky left-0 bg-primary/3"
                            >
                              <span className="text-lg">{feature.icon}</span> {feature.category}
                            </td>
                          </tr>
                        )
                      }

                      return (
                        <tr
                          key={idx}
                          className={`border-b border-border ${idx % 2 === 0 ? "bg-background" : "bg-primary/2"}`}
                        >
                          <td className="px-6 py-4 font-medium text-foreground sticky left-0 bg-inherit z-10">
                            {feature.category}
                          </td>
                          {pricingTiers.map((tier) => {
                            const tierKey = tier.name.toLowerCase() as keyof typeof feature
                            const value = feature[tierKey]
                            return (
                              <td
                                key={tier.name}
                                className={`px-6 py-4 text-center ${
                                  selectedTier === tier.name ? "bg-primary/5 font-medium" : ""
                                }`}
                              >
                                {typeof value === "boolean" ? (
                                  value ? (
                                    <Check size={24} className="text-primary mx-auto font-bold" strokeWidth={3} />
                                  ) : (
                                    <XIcon size={20} className="text-foreground/30 mx-auto" />
                                  )
                                ) : (
                                  <span className="text-foreground font-medium text-sm">{value || "—"}</span>
                                )}
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-primary/5 border-y border-primary/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ready to Get Started?</h2>
              <p className="text-lg text-foreground/70">
                Start your free 6-week trial today. No credit card required. Full access to all features.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-all font-semibold shadow-md hover:shadow-lg"
              >
                Start Free Trial
              </Link>
              <Link
                href="/contact"
                className="border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary/10 transition-all font-semibold"
              >
                Request Custom Quote
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Pricing Questions?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  q: "What's included in the 6-week free trial?",
                  a: "Full access to all Firmity features, unlimited team training, digital reports, bulk data entry support, and 24/7 backend support.",
                },
                {
                  q: "Can I upgrade or downgrade plans?",
                  a: "Yes, you can change plans anytime. Changes take effect in your next billing cycle with prorated adjustments.",
                },
                {
                  q: "Is there a minimum contract?",
                  a: "No. Monthly subscriptions with no long-term commitment. Cancel anytime after your trial period.",
                },
                {
                  q: "Do you offer discounts for annual billing?",
                  a: "Yes! Contact our sales team for custom quotes and annual billing options for larger organizations.",
                },
              ].map((faq, idx) => (
                <div key={idx} className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                  <h4 className="font-bold text-foreground mb-3">{faq.q}</h4>
                  <p className="text-foreground/80 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
