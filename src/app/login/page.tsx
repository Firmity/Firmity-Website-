"use client"

import { useState } from "react"
import Link from "next/link"
import { Building2, Users, Shield, ArrowRight } from "lucide-react"

export default function LoginPage() {
  const [redirecting, setRedirecting] = useState(false)

  const clientLoginURL = process.env.NEXT_PUBLIC_CLIENT_LOGIN_URL || "#"
  const employeeLoginURL = process.env.NEXT_PUBLIC_EMPLOYEE_LOGIN_URL || "#"
  const fmLoginURL = process.env.NEXT_PUBLIC_FM_LOGIN_URL || "#"

  const handleRedirect = (url: string) => {
    if (url === "#") {
      alert("Login URL not configured. Please contact support.")
      return
    }
    setRedirecting(true)
    window.location.href = url
  }

  const roles = [
    {
      id: "client",
      title: "Client Login",
      description: "Access your facility dashboard and manage operations with real-time insights",
      icon: Building2,
      url: clientLoginURL,
      bgColor: "bg-white",
      borderColor: "border-blue-200",
      textColor: "text-gray-900",
      accentColor: "text-blue-600",
      buttonColor: "bg-blue-600 text-white hover:bg-blue-700",
    },
    {
      id: "employee",
      title: "Employee Login",
      description: "Track your tasks, attendance, and collaborate with your team seamlessly",
      icon: Users,
      url: employeeLoginURL,
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      borderColor: "border-blue-300",
      textColor: "text-gray-900",
      accentColor: "text-blue-700",
      buttonColor: "bg-blue-700 text-white hover:bg-blue-800",
      highlight: true,
    },
    {
      id: "fm",
      title: "Facility Manager Login",
      description: "Oversee all facility operations, maintenance, and compliance in one place",
      icon: Shield,
      url: fmLoginURL,
      bgColor: "bg-white",
      borderColor: "border-blue-200",
      textColor: "text-gray-900",
      accentColor: "text-blue-600",
      buttonColor: "bg-blue-600 text-white hover:bg-blue-700",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <Link href="/" className="inline-flex items-center gap-2 mb-10 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="font-bold text-3xl text-gray-900">Firmity</span>
          </Link>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 text-balance">Welcome Back</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select your role to access the Firmity CMMS platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
          {roles.map((role) => {
            const Icon = role.icon
            return (
              <div
                key={role.id}
                className={`relative rounded-2xl border-2 transition-all duration-300 overflow-hidden group ${
                  role.highlight
                    ? `${role.borderColor} shadow-2xl md:scale-105`
                    : `${role.borderColor} shadow-lg hover:shadow-xl hover:border-blue-300`
                }`}
              >
                {/* Background */}
                <div className={`${role.bgColor} p-8 h-full flex flex-col min-h-96`}>
                  {/* Recommended Badge */}
                  {role.highlight && (
                    <div className="flex justify-end mb-4">
                      <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        Recommended
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="mb-8">
                    <div
                      className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        role.highlight
                          ? "bg-blue-600 text-white"
                          : "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                      }`}
                    >
                      <Icon size={32} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 mb-8">
                    <h3 className={`text-2xl font-bold mb-3 ${role.textColor}`}>{role.title}</h3>
                    <p
                      className={`text-base leading-relaxed ${role.textColor === "text-gray-900" ? "text-gray-600" : "text-gray-700"}`}
                    >
                      {role.description}
                    </p>
                  </div>

                  {/* Login Button */}
                  <button
                    onClick={() => handleRedirect(role.url)}
                    disabled={redirecting}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 group/btn ${
                      role.buttonColor
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Login Now
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center border-t border-gray-200 pt-10">
          <p className="text-gray-600 mb-4">
            New to Firmity?{" "}
            <Link href="/contact" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              Request a Free Trial
            </Link>
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700 transition-colors">
              Back to Home
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-gray-700 transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
