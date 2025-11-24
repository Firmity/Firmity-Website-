"use client"

import type React from "react"
import { useState } from "react"
import { Download, Loader2, CheckCircle, AlertCircle } from "lucide-react"

export function BrochureDownloadForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/brochure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSuccess(true)
        setFormData({ name: "", email: "", phone: "", city: "" })

        const link = document.createElement("a")
        link.href = "/firmity-brochure.pdf"
        link.download = "Firmity-CMMS-Brochure.pdf"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        setTimeout(() => setSuccess(false), 5000)
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
    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 max-w-lg border border-primary/20">
      <div className="flex items-center gap-3 mb-2">
        <Download size={24} className="text-primary" />
        <h3 className="text-2xl font-bold text-foreground">Download Brochure</h3>
      </div>
      <p className="text-foreground/70 mb-6">Get the complete Firmity overview and features guide</p>

      {success ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle size={24} className="text-emerald-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-emerald-900">Download Started!</p>
              <p className="text-sm text-emerald-700">Check your downloads folder</p>
            </div>
          </div>
          <p className="text-sm text-emerald-800">We've also sent details to your email.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
          <input
            type="email"
            name="email"
            placeholder="Work Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
              <AlertCircle size={18} className="text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-all font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Download size={20} />
                Download Brochure
              </>
            )}
          </button>
          <p className="text-xs text-foreground/60 text-center">We respect your privacy. No spam guaranteed.</p>
        </form>
      )}
    </div>
  )
}
