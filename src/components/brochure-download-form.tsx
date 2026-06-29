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
        link.href = "/Pricing_FIRMITY FACILITY SOFTWARE UFIRM TECHNOLOGIES.pdf"
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

  if (success) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <CheckCircle size={20} className="text-emerald-600 flex-shrink-0" />
          <p className="font-semibold text-[13.5px] text-emerald-900">Download started!</p>
        </div>
        <p className="text-[12.5px] text-emerald-700 font-light pl-8">Check your downloads folder. We've also sent details to your email.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[10.5px] font-semibold text-[#4a5568] tracking-wide uppercase">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Rajesh Kumar"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2.5 text-[13px] border border-[#e2e8f0] bg-[#f8fafc] text-[#1a202c] placeholder:text-[#c0ccd8] focus:outline-none focus:border-[#2b6cb0] focus:bg-white transition-all"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10.5px] font-semibold text-[#4a5568] tracking-wide uppercase">Work Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@company.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2.5 text-[13px] border border-[#e2e8f0] bg-[#f8fafc] text-[#1a202c] placeholder:text-[#c0ccd8] focus:outline-none focus:border-[#2b6cb0] focus:bg-white transition-all"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10.5px] font-semibold text-[#4a5568] tracking-wide uppercase">Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2.5 text-[13px] border border-[#e2e8f0] bg-[#f8fafc] text-[#1a202c] placeholder:text-[#c0ccd8] focus:outline-none focus:border-[#2b6cb0] focus:bg-white transition-all"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10.5px] font-semibold text-[#4a5568] tracking-wide uppercase">City</label>
          <input
            type="text"
            name="city"
            placeholder="Mumbai"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full px-3 py-2.5 text-[13px] border border-[#e2e8f0] bg-[#f8fafc] text-[#1a202c] placeholder:text-[#c0ccd8] focus:outline-none focus:border-[#2b6cb0] focus:bg-white transition-all"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
          <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
          <p className="text-[12px] text-red-700">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#111d35] text-white py-3 text-[13px] font-semibold flex items-center justify-center gap-2 hover:bg-[#1a2744] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-1"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Processing…
          </>
        ) : (
          <>
            <Download size={15} />
            Download Brochure
          </>
        )}
      </button>

      <p className="text-[10.5px] text-[#a0aec0] text-center font-light">
        No spam. Instant PDF download.
      </p>
    </form>
  )
}
