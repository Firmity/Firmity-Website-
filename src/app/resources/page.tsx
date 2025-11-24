import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { ArrowRight, FileText, BookOpen } from "lucide-react"
import Link from "next/link"

export default function ResourcesPage() {
  const articles = [
    {
      id: 1,
      title: "The Complete Guide to Preventive Maintenance",
      description:
        "Learn how planned preventive maintenance can extend asset lifespan, reduce breakdowns, and save costs.",
      category: "Guide",
      icon: BookOpen,
      readTime: "8 min read",
    },
    {
      id: 2,
      title: "Digitalizing Facility Management: Best Practices",
      description: "Discover proven strategies for transitioning from manual to digital facility management systems.",
      category: "Best Practices",
      icon: FileText,
      readTime: "6 min read",
    },
    {
      id: 3,
      title: "Reducing Operational Costs Through Smart Asset Tracking",
      description: "Explore how real-time asset monitoring and alerts help organizations cut waste and improve ROI.",
      category: "Case Study",
      icon: BookOpen,
      readTime: "7 min read",
    },
    {
      id: 4,
      title: "Building an Efficient Maintenance Schedule",
      description:
        "Learn the key factors for creating maintenance schedules that minimize downtime and maximize productivity.",
      category: "Guide",
      icon: FileText,
      readTime: "5 min read",
    },
    {
      id: 5,
      title: "Data Security in Cloud-Based Facility Management",
      description: "Understand how Firmity protects your facility data with enterprise-grade security measures.",
      category: "Security",
      icon: BookOpen,
      readTime: "4 min read",
    },
    {
      id: 6,
      title: "Maximizing ROI with Integrated Facility Management",
      description: "Discover how integrated platforms deliver better results than disconnected systems.",
      category: "ROI",
      icon: FileText,
      readTime: "6 min read",
    },
  ]

  const resources = [
    {
      title: "Getting Started Guide",
      description: "Step-by-step guide to set up and configure Firmity for your organization.",
      icon: "📖",
      link: "#",
    },
    {
      title: "Video Tutorials",
      description: "Watch short video guides for key features and common tasks.",
      icon: "🎥",
      link: "#",
    },
    {
      title: "API Documentation",
      description: "Technical documentation for developers building integrations.",
      icon: "⚙️",
      link: "#",
    },
    {
      title: "FAQ & Troubleshooting",
      description: "Find quick answers to common questions and resolve issues.",
      icon: "❓",
      link: "#",
    },
    {
      title: "Training Programs",
      description: "Comprehensive training materials for your team and staff.",
      icon: "👨‍🏫",
      link: "#",
    },
    {
      title: "Case Studies",
      description: "See how organizations have successfully implemented Firmity.",
      icon: "📊",
      link: "#",
    },
  ]

  const faqs = [
    {
      question: "How do I get started with Firmity?",
      answer:
        "You can start with a free 6-week trial by filling out our demo request form. We'll set up your account, import your data, and provide comprehensive training to your team.",
    },
    {
      question: "Is there a learning curve for my team?",
      answer:
        "Firmity is designed to be user-friendly with an intuitive interface. We provide unlimited training and our support team is available to help your team adapt smoothly.",
    },
    {
      question: "Can I integrate Firmity with my existing systems?",
      answer:
        "Yes, Firmity supports integrations with various systems. Contact our team to discuss your specific integration requirements.",
    },
    {
      question: "What kind of data can I import?",
      answer:
        "We can help import your facility records, asset lists, maintenance history, staff data, and more. Our team provides bulk data entry support twice yearly.",
    },
    {
      question: "Is my data secure in the cloud?",
      answer:
        "Yes, we use enterprise-grade security with encrypted connections, role-based access controls, and regular security audits to protect your data.",
    },
    {
      question: "What happens after my free trial ends?",
      answer:
        "After your trial, you can choose to subscribe to a plan that fits your needs, or you can stop using the software. No auto-charges or hidden fees.",
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
              Resources & Knowledge Base
            </h1>
            <p className="text-lg text-foreground/80 text-center max-w-2xl mx-auto">
              Everything you need to succeed with Firmity. Guides, tutorials, case studies, and best practices.
            </p>
          </div>
        </section>

        {/* Quick Resources */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Essential Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.link}
                  className="bg-card rounded-lg p-8 border border-border hover:shadow-lg transition-shadow space-y-4 group cursor-pointer"
                >
                  <div className="text-4xl">{resource.icon}</div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-foreground/80">{resource.description}</p>
                  <div className="flex items-center text-primary font-semibold pt-2">
                    Learn More <ArrowRight size={18} className="ml-2" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Articles */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => {
                const Icon = article.icon
                return (
                  <article
                    key={article.id}
                    className="bg-background rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow group cursor-pointer"
                  >
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {article.category}
                        </span>
                        <span className="text-xs text-foreground/60">{article.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-foreground/80 text-sm line-clamp-2">{article.description}</p>
                      <div className="flex items-center text-primary font-semibold text-sm pt-2">
                        Read Article <ArrowRight size={16} className="ml-2" />
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-card border border-border rounded-lg p-6 cursor-pointer hover:border-primary transition-colors"
                >
                  <summary className="flex items-center justify-between font-semibold text-foreground text-lg">
                    {faq.question}
                    <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-foreground/80 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-background rounded-lg border border-border p-8 md:p-12 space-y-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Need More Help?</h2>
              <p className="text-lg text-foreground/80">
                Our customer support team is available Monday-Saturday, 9am-6pm IST to assist you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  href="/contact"
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-secondary transition-colors font-semibold"
                >
                  Contact Support
                </Link>
                <a
                  href="mailto:info@ufirm.in"
                  className="border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary/10 transition-colors font-semibold"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Start Learning & Growing with Firmity</h2>
            <p className="text-lg opacity-90">Access all resources and documentation with your free trial</p>
            <Link
              href="/pricing"
              className="inline-block bg-primary-foreground text-primary px-8 py-3 rounded-lg hover:bg-background transition-colors font-semibold"
            >
              Start Free Trial
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
