"use client"

import { useState, useCallback, useMemo } from "react"
import Link from "next/link"
import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import {
  Factory, GraduationCap, Building2, Briefcase, Heart, Hotel, LayoutGrid,
  Shield, Flame, Wind, Zap, Droplets, HardHat, Leaf, Sparkles, CheckCircle,
  Plus, X, ArrowLeft, ArrowRight, Loader2, ChevronLeft, ChevronRight,
  MapPin, type LucideIcon,
} from "lucide-react"

// ─── Data ─────────────────────────────────────────────────────────────────────

const FACILITY_TYPES: { id: string; label: string; Icon: LucideIcon }[] = [
  { id: "manufacturing", label: "Manufacturing Plant", Icon: Factory },
  { id: "educational", label: "Educational Institution", Icon: GraduationCap },
  { id: "residential", label: "Residential Society", Icon: Building2 },
  { id: "commercial", label: "Commercial Office", Icon: Briefcase },
  { id: "healthcare", label: "Healthcare / Hospital", Icon: Heart },
  { id: "hospitality", label: "Hotel", Icon: Hotel },
  { id: "mixed", label: "Mixed Use", Icon: LayoutGrid },
]

const SURVEY_TYPES: { id: string; label: string; Icon: LucideIcon; desc: string }[] = [
  { id: "security",     label: "Security Assessment",       Icon: Shield,    desc: "Guards, CCTV, access control" },
  { id: "fire",         label: "Fire Safety Audit",         Icon: Flame,     desc: "Extinguishers, systems, exits" },
  { id: "hvac",         label: "HVAC & Mechanical",         Icon: Wind,      desc: "Cooling, ventilation, AHUs" },
  { id: "electrical",   label: "Electrical Systems",        Icon: Zap,       desc: "Panels, wiring, DG sets" },
  { id: "plumbing",     label: "Plumbing & Sanitation",     Icon: Droplets,  desc: "Water, drainage, washrooms" },
  { id: "civil",        label: "Civil & Structural",        Icon: HardHat,   desc: "Structure, façade, waterproofing" },
  { id: "horticulture", label: "Horticulture / Landscaping",Icon: Leaf,      desc: "Gardens, plants, grounds" },
  { id: "housekeeping", label: "Housekeeping & Sanitation", Icon: Sparkles,  desc: "Cleanliness, pest control" },
  { id: "green",        label: "Green Building Survey",     Icon: Leaf,        desc: "STP + Rainwater Harvesting + Genset" },
]

const TIME_SLOTS = [
  "9:00 AM – 11:00 AM",
  "11:00 AM – 1:00 PM",
  "2:00 PM – 4:00 PM",
  "4:00 PM – 6:00 PM",
]

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
]

const STEPS = [
  { num: 1, label: "Facility" },
  { num: 2, label: "Scope" },
  { num: 3, label: "Details" },
  { num: 4, label: "Dates" },
  { num: 5, label: "Contact" },
]

// ─── Types ────────────────────────────────────────────────────────────────────

interface Building { id: string; name: string }
interface Slot     { date: string; time: string }
interface ContactFull {
  firstName: string; lastName: string; designation: string
  email: string; phone: string; altPhone: string
  facilityName: string; facilityAddress: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Field({ label, name, type = "text", value, onChange, placeholder, required }: {
  label: string; name: string; type?: string; value: string
  onChange: (v: string) => void; placeholder?: string; required?: boolean
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] mb-1 tracking-wide uppercase">
        {label}{required && <span className="text-[#2b6cb0] ml-0.5">*</span>}
      </label>
      <input
        type={type} name={name} value={value} placeholder={placeholder} required={required}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-text w-full px-3 py-2 rounded-xl border border-[#dbe5f0] bg-white text-[13px] text-[#1a202c] placeholder:text-[#a0aec0] focus:outline-none focus:ring-2 focus:ring-[#2b6cb0]/30 focus:border-[#2b6cb0] transition-all"
      />
    </div>
  )
}

// ─── Calendar ─────────────────────────────────────────────────────────────────

function Calendar({ slots, onAddSlot, onRemoveSlot }: {
  slots: Slot[]
  onAddSlot: (s: Slot) => void
  onRemoveSlot: (date: string) => void
}) {
  const today    = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d }, [])
  const tomorrow = useMemo(() => { const d = new Date(today); d.setDate(d.getDate()+1); return d }, [today])

  const [viewYear,  setViewYear]  = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [pending,   setPending]   = useState<string | null>(null)

  const prevMonth = () => setViewMonth(m => { if (m === 0) { setViewYear(y => y-1); return 11 } return m-1 })
  const nextMonth = () => setViewMonth(m => { if (m === 11) { setViewYear(y => y+1); return 0 } return m+1 })

  const cells = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1)
    const total = new Date(viewYear, viewMonth+1, 0).getDate()
    const offset = (first.getDay() + 6) % 7   // Mon=0 … Sun=6
    const arr: (number|null)[] = Array(offset).fill(null)
    for (let d = 1; d <= total; d++) arr.push(d)
    return arr
  }, [viewYear, viewMonth])

  const fmt = (d: number) =>
    `${viewYear}-${String(viewMonth+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`

  const disabled = (d: number) => {
    const dt = new Date(viewYear, viewMonth, d); dt.setHours(0,0,0,0)
    return dt < tomorrow || dt.getDay() === 0
  }

  const selectedDates = slots.map(s => s.date)

  const handleDay = (d: number) => {
    if (disabled(d)) return
    const ds = fmt(d)
    if (selectedDates.includes(ds)) { onRemoveSlot(ds); if (pending === ds) setPending(null); return }
    if (slots.length < 2) setPending(ds)
  }

  const confirmTime = (time: string) => {
    if (!pending) return
    onAddSlot({ date: pending, time })
    setPending(null)
  }

  const label = (ds: string) =>
    new Date(ds + "T00:00:00").toLocaleDateString("en-IN", { weekday:"short", day:"numeric", month:"short" })

  return (
    <div>
      {/* ── 2-slot tracker ─── */}
      <div className="flex gap-2 mb-3">
        {[0, 1].map(i => {
          const slot = slots[i]
          return (
            <div key={i} className={`flex-1 flex items-center gap-2 px-2.5 py-2 rounded-xl border transition-all ${
              slot ? "bg-[#111d35] border-[#111d35]" : "border-dashed border-[#b0c4d8] bg-[#f4f8fb]"
            }`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-bold ${
                slot ? "bg-white text-[#111d35]" : "border-2 border-[#b0c4d8] text-[#8ba5be]"
              }`}>{i + 1}</div>
              {slot ? (
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-white leading-none truncate">{label(slot.date)}</p>
                  <p className="text-[9.5px] text-white/60 leading-none mt-0.5 truncate">{slot.time}</p>
                </div>
              ) : (
                <p className="text-[11px] text-[#7a9ab8] flex-1 leading-tight">
                  {i === 0 ? "Slot 1 — click a date" : "Slot 2 — click a date"}
                </p>
              )}
              {slot && (
                <button type="button" onClick={() => onRemoveSlot(slot.date)}
                  className="cursor-pointer flex-shrink-0 w-4 h-4 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors">
                  <X size={9} className="text-white/70" />
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Dynamic instruction */}
      {!pending && slots.length < 2 && (
        <p className="text-[11.5px] font-semibold text-[#2b6cb0] text-center mb-2.5">
          {slots.length === 0
            ? "↓ Click any working day to select Slot 1"
            : "↓ Click another date to select Slot 2"}
        </p>
      )}

      {/* Month nav */}
      <div className="flex items-center justify-between mb-2">
        <button type="button" onClick={prevMonth} className="cursor-pointer p-1 hover:bg-[#eef3f9] rounded-lg transition-colors">
          <ChevronLeft size={15} className="text-[#4a5568]" />
        </button>
        <span className="text-[13px] font-semibold text-[#111d35]">{MONTH_NAMES[viewMonth]} {viewYear}</span>
        <button type="button" onClick={nextMonth} className="cursor-pointer p-1 hover:bg-[#eef3f9] rounded-lg transition-colors">
          <ChevronRight size={15} className="text-[#4a5568]" />
        </button>
      </div>

      {/* Headers */}
      <div className="grid grid-cols-7 mb-1">
        {["M","T","W","T","F","S","S"].map((h, i) => (
          <div key={i} className={`text-center text-[10px] font-bold py-0.5 ${i===6?"text-[#c8d4e0]":"text-[#4a5568]"}`}>{h}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={`e${i}`} />
          const ds = fmt(day)
          const dis = disabled(day)
          const sun = new Date(viewYear, viewMonth, day).getDay() === 0
          const isToday = new Date(viewYear, viewMonth, day).getTime() === today.getTime()
          const sel = selectedDates.includes(ds)
          const pend = pending === ds
          return (
            <button
              key={day} type="button" onClick={() => handleDay(day)} disabled={dis}
              className={[
                "aspect-square flex items-center justify-center text-[12px] rounded-lg transition-all font-medium",
                dis || sun ? "text-[#c4d2de] cursor-not-allowed" : "cursor-pointer",
                sel  ? "bg-[#111d35] text-white font-bold" : "",
                pend ? "bg-[#dceeff] text-[#1a56a0] font-bold ring-2 ring-[#2b6cb0] ring-offset-1" : "",
                !dis && !sel && !pend && !sun ? "text-[#1a2744] hover:bg-[#eef3f9]" : "",
                isToday && !sel && !pend ? "ring-2 ring-[#2b6cb0] ring-offset-1 font-bold" : "",
              ].filter(Boolean).join(" ")}
            >{day}</button>
          )
        })}
      </div>

      {/* Time picker — dark + prominent */}
      {pending && (
        <div className="mt-3 bg-[#111d35] rounded-xl p-3.5">
          <div className="flex items-center gap-1.5 mb-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#63b3ed] flex-shrink-0" />
            <p className="text-[10.5px] font-semibold text-white/70 uppercase tracking-wide">
              Choose time for {label(pending)} · Slot {slots.length + 1} of 2 (IST)
            </p>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {TIME_SLOTS.map(t => (
              <button key={t} type="button" onClick={() => confirmTime(t)}
                className="cursor-pointer px-2.5 py-2 text-[11.5px] font-medium text-white bg-white/10 border border-white/20 rounded-lg hover:bg-white hover:text-[#111d35] transition-all">
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {slots.length === 2 && (
        <p className="text-[11.5px] font-semibold text-emerald-600 text-center mt-2.5">✓ Both slots selected — you&apos;re all set!</p>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FacilitySurveyPage() {
  const [step, setStep]           = useState(1)
  const [direction, setDirection] = useState<"forward" | "back">("forward")

  // Step 1
  const [facilityType, setFacilityType] = useState("")
  // Step 2
  const [surveyTypes, setSurveyTypes] = useState<string[]>([])
  // Step 3
  const [facilityArea, setFacilityArea]     = useState("")
  const [facilityAreaUnit, setFacilityAreaUnit] = useState<"sqft"|"acres">("sqft")
  const [buildings, setBuildings]           = useState<Building[]>([])
  const [buildingInput, setBuildingInput]   = useState("")
  // Step 4
  const [preferredSlots, setPreferredSlots] = useState<Slot[]>([])
  // Step 5
  const [contact, setContact] = useState<ContactFull>({
    firstName:"", lastName:"", designation:"", email:"", phone:"",
    altPhone:"", facilityName:"", facilityAddress:"",
  })
  const [gpsLoading, setGpsLoading] = useState(false)
  const [mapCoords,  setMapCoords]  = useState<{lat:number; lon:number}|null>(null)

  // Submit
  const [submitting, setSubmitting] = useState(false)
  const [submitted,  setSubmitted]  = useState(false)
  const [bookingId,  setBookingId]  = useState("")
  const [error, setError] = useState("")

  // ── Handlers ────────────────────────────────────────────────────────────────

  const toggleSurvey = useCallback((id: string) => {
    setSurveyTypes(prev =>
      id === "all"
        ? prev.length === SURVEY_TYPES.length ? [] : SURVEY_TYPES.map(s => s.id)
        : prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }, [])

  const addBuilding = useCallback(() => {
    const name = buildingInput.trim(); if (!name) return
    setBuildings(prev => [...prev, { id:`b_${Date.now()}`, name }])
    setBuildingInput("")
  }, [buildingInput])

  const addSlot    = useCallback((s: Slot) => setPreferredSlots(prev => prev.length < 2 ? [...prev, s] : prev), [])
  const removeSlot = useCallback((date: string) => setPreferredSlots(prev => prev.filter(s => s.date !== date)), [])

  const handleGps = useCallback(async () => {
    if (!navigator.geolocation) { setError("GPS not available in your browser."); return }
    setGpsLoading(true); setError("")
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude: lat, longitude: lon } }) => {
        try {
          const r = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
            { headers: { "Accept-Language": "en" } }
          )
          const d = await r.json()
          setContact(c => ({ ...c, facilityAddress: d.display_name || "" }))
          setMapCoords({ lat, lon })
        } catch {
          setError("Could not fetch address. Please enter it manually.")
        } finally { setGpsLoading(false) }
      },
      () => { setError("Location denied. Please enter address manually."); setGpsLoading(false) }
    )
  }, [])

  const goNext = useCallback(() => {
    setError("")
    if (step === 1 && !facilityType)     { setError("Please select a facility type."); return }
    if (step === 2 && !surveyTypes.length){ setError("Please select at least one survey type."); return }
    if (step === 3 && !facilityArea)     { setError("Please enter the total facility area."); return }
    if (step === 4 && !preferredSlots.length){ setError("Please select at least one preferred date."); return }
    setDirection("forward"); setStep(s => s + 1)
  }, [step, facilityType, surveyTypes, facilityArea, preferredSlots])

  const goBack = useCallback(() => { setError(""); setDirection("back"); setStep(s => s - 1) }, [])

  const handleSubmit = useCallback(async () => {
    setError("")
    if (!contact.firstName || !contact.lastName || !contact.email || !contact.phone) {
      setError("Please fill in first name, last name, email, and phone."); return
    }
    setSubmitting(true)
    try {
      const res = await fetch("/api/facility-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ facilityType, surveyTypes, facilityArea, facilityAreaUnit, buildings, preferredSlots, contact }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Submission failed")
      setBookingId(data.bookingId)
      setSubmitted(true)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally { setSubmitting(false) }
  }, [facilityType, surveyTypes, facilityArea, facilityAreaUnit, buildings, preferredSlots, contact])

  // ── Success ──────────────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-6 py-16">
          <div className="max-w-sm w-full text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={28} className="text-emerald-600" />
            </div>
            <div className="inline-block bg-[#eef3f9] border border-[#dbe5f0] px-5 py-2.5 rounded-xl mb-4">
              <p className="text-[10px] font-semibold text-[#4a5568] uppercase tracking-widest mb-0.5">Booking ID</p>
              <p className="text-[18px] font-bold text-[#111d35] font-mono tracking-widest">{bookingId}</p>
            </div>
            <h1 className="font-serif text-[1.7rem] font-light text-[#111d35] mb-2">Survey Booked!</h1>
            <p className="text-[13px] text-[#718096] font-light leading-relaxed mb-1.5">
              Our team will connect within 24 hours to confirm your
              <strong className="text-[#2b6cb0] font-semibold"> Free AI Facility Health Survey</strong>.
            </p>
            <p className="text-[11.5px] text-[#a0aec0] mb-7">
              Acknowledgement sent to <strong className="text-[#4a5568]">{contact.email}</strong>
            </p>
            <Link href="/"
              className="cursor-pointer inline-flex items-center justify-center gap-2 bg-[#111d35] text-white px-6 py-2.5 rounded-xl text-[13px] font-medium hover:bg-[#1a2744] transition-colors">
              <ArrowLeft size={13} /> Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // ── Wizard ───────────────────────────────────────────────────────────────────

  return (
    <>
      <Navigation />
      <main>
        {/* Hero — compact */}
        <section className="bg-[#111d35] py-6 px-6 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{ backgroundImage:`radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize:"40px 40px" }} />
          <div className="max-w-lg mx-auto text-center relative">
            <h1 className="font-serif text-[1.55rem] font-light text-white leading-tight mb-1">
              Free AI Facility <span className="italic text-[#63b3ed]">Health Survey</span>
            </h1>
            <p className="text-[12px] text-white/50 font-light">100% free · No obligation · Team responds within 24 hrs</p>
          </div>
        </section>

        <style>{`
          @keyframes stepFwd { from { opacity:0; transform:translateX(20px) } to { opacity:1; transform:translateX(0) } }
          @keyframes stepBck { from { opacity:0; transform:translateX(-20px) } to { opacity:1; transform:translateX(0) } }
          .step-fwd { animation: stepFwd 0.23s cubic-bezier(0.22,1,0.36,1) both }
          .step-bck { animation: stepBck 0.23s cubic-bezier(0.22,1,0.36,1) both }
        `}</style>
        <div className="bg-[#f8fafc] border-t border-[#eef3f9]">
          <div className="max-w-lg mx-auto px-4 sm:px-5 py-5">

            {/* Step bar */}
            <div className="flex items-center mb-4">
              {STEPS.map(({ num, label }, i) => (
                <div key={num} className="flex items-center flex-1">
                  <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                      step > num ? "bg-[#111d35] text-white" : step === num ? "bg-[#2b6cb0] text-white" : "bg-[#eef3f9] text-[#a0aec0]"
                    }`}>
                      {step > num ? <CheckCircle size={11} /> : num}
                    </div>
                    <span className={`text-[9.5px] font-medium hidden sm:block whitespace-nowrap ${
                      step === num ? "text-[#2b6cb0]" : step > num ? "text-[#4a5568]" : "text-[#c0ccd8]"
                    }`}>{label}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-1.5 mb-3 sm:mb-0 rounded-full transition-colors ${step > num ? "bg-[#111d35]" : "bg-[#dbe5f0]"}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Card */}
            <div key={step} className={`bg-white rounded-[18px] border border-[#dbe5f0] shadow-[0_4px_20px_rgba(17,29,53,0.05)] p-5 ${direction === "forward" ? "step-fwd" : "step-bck"}`}>

              {/* ── Step 1 ── */}
              {step === 1 && (
                <div>
                  <h2 className="text-[14.5px] font-semibold text-[#111d35] mb-0.5">What type of facility?</h2>
                  <p className="text-[11.5px] text-[#718096] mb-3">Select the option that best describes your property.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {FACILITY_TYPES.map(({ id, label, Icon }) => {
                      const sel = facilityType === id
                      return (
                        <button key={id} type="button" onClick={() => setFacilityType(id)}
                          className={`cursor-pointer flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all ${
                            sel ? "border-[#2b6cb0] bg-[#eef3f9]" : "border-[#dbe5f0] bg-white text-[#4a5568] hover:border-[#b2c9e0] hover:bg-[#f8fafc]"
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${sel?"bg-[#2b6cb0]":"bg-[#eef3f9]"}`}>
                            <Icon size={12} className={sel?"text-white":"text-[#2b6cb0]"} />
                          </div>
                          <span className={`text-[12.5px] font-medium ${sel?"text-[#111d35]":""}`}>{label}</span>
                          {sel && <CheckCircle size={12} className="text-[#2b6cb0] ml-auto flex-shrink-0" />}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* ── Step 2 ── */}
              {step === 2 && (
                <div>
                  <h2 className="text-[14.5px] font-semibold text-[#111d35] mb-0.5">What would you like surveyed?</h2>
                  <p className="text-[11.5px] text-[#718096] mb-3">Select all that apply.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-2">
                    {SURVEY_TYPES.map(({ id, label, Icon, desc }) => {
                      const sel = surveyTypes.includes(id)
                      return (
                        <button key={id} type="button" onClick={() => toggleSurvey(id)}
                          className={`cursor-pointer flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all ${
                            sel ? "border-[#2b6cb0] bg-[#eef3f9]" : "border-[#dbe5f0] bg-white hover:border-[#b2c9e0] hover:bg-[#f8fafc]"
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${sel?"bg-[#2b6cb0]":"bg-[#eef3f9]"}`}>
                            <Icon size={12} className={sel?"text-white":"text-[#2b6cb0]"} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-[12px] font-medium leading-tight ${sel?"text-[#111d35]":"text-[#2d3748]"}`}>{label}</p>
                            <p className="text-[10.5px] text-[#4a5568]">{desc}</p>
                          </div>
                          <div className={`w-3.5 h-3.5 rounded border flex-shrink-0 flex items-center justify-center ${sel?"bg-[#2b6cb0] border-[#2b6cb0]":"border-[#cbd5e0]"}`}>
                            {sel && <CheckCircle size={9} className="text-white" />}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                  {/* Select all — bottom */}
                  <button type="button" onClick={() => toggleSurvey("all")}
                    className={`cursor-pointer w-full flex items-center justify-center px-3 py-2.5 rounded-xl border transition-all ${
                      surveyTypes.length === SURVEY_TYPES.length
                        ? "border-[#111d35] bg-[#111d35] text-white"
                        : "border-[#dbe5f0] bg-white text-[#4a5568] hover:bg-[#f8fafc]"
                    }`}
                  >
                    <span className="text-[12.5px] font-semibold">
                      {surveyTypes.length === SURVEY_TYPES.length ? "✓ All Selected — Deselect All" : "Select All Domains"}
                    </span>
                  </button>
                </div>
              )}

              {/* ── Step 3 ── */}
              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-[14.5px] font-semibold text-[#111d35] mb-0.5">Facility details</h2>
                    <p className="text-[11.5px] text-[#718096]">Tell us about the size and layout of your facility.</p>
                  </div>
                  {/* Area */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#4a5568] mb-1 tracking-wide uppercase">
                      Total Facility Area <span className="text-[#2b6cb0]">*</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number" value={facilityArea} onChange={e => setFacilityArea(e.target.value)}
                        placeholder="e.g. 25000"
                        className="cursor-text flex-1 px-3 py-2 rounded-xl border border-[#dbe5f0] bg-white text-[13px] placeholder:text-[#a0aec0] focus:outline-none focus:ring-2 focus:ring-[#2b6cb0]/30 focus:border-[#2b6cb0] transition-all"
                      />
                      <select
                        value={facilityAreaUnit} onChange={e => setFacilityAreaUnit(e.target.value as "sqft"|"acres")}
                        className="cursor-pointer px-3 py-2 rounded-xl border border-[#dbe5f0] bg-white text-[13px] text-[#1a202c] focus:outline-none focus:ring-2 focus:ring-[#2b6cb0]/30 focus:border-[#2b6cb0] transition-all"
                      >
                        <option value="sqft">sq ft</option>
                        <option value="acres">acres</option>
                      </select>
                    </div>
                  </div>
                  {/* Buildings */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#4a5568] mb-1 tracking-wide uppercase">
                      Buildings / Towers / Blocks
                    </label>
                    <p className="text-[11px] text-[#718096] mb-2">Add each block or building to be surveyed (optional).</p>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text" value={buildingInput} onChange={e => setBuildingInput(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addBuilding())}
                        placeholder="e.g. Tower A, Block 1, Main Wing"
                        className="cursor-text flex-1 px-3 py-2 rounded-xl border border-[#dbe5f0] bg-white text-[13px] placeholder:text-[#a0aec0] focus:outline-none focus:ring-2 focus:ring-[#2b6cb0]/30 focus:border-[#2b6cb0] transition-all"
                      />
                      <button type="button" onClick={addBuilding} disabled={!buildingInput.trim()}
                        className="cursor-pointer flex items-center gap-1 px-3 py-2 bg-[#111d35] hover:bg-[#1a2744] disabled:opacity-40 text-white rounded-xl text-[12px] font-medium transition-colors flex-shrink-0">
                        <Plus size={12} /> Add
                      </button>
                    </div>
                    {buildings.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {buildings.map(b => (
                          <div key={b.id} className="cursor-default flex items-center gap-1.5 px-2.5 py-1 bg-[#eef3f9] border border-[#dbe5f0] rounded-lg">
                            <span className="text-[11.5px] font-medium text-[#111d35]">{b.name}</span>
                            <button type="button" onClick={() => setBuildings(p => p.filter(x => x.id !== b.id))}
                              className="cursor-pointer w-3.5 h-3.5 rounded-full hover:bg-[#cbd5e0] flex items-center justify-center transition-colors">
                              <X size={9} className="text-[#718096]" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-[#a0aec0] italic">None added — you can skip this.</p>
                    )}
                  </div>
                </div>
              )}

              {/* ── Step 4 ── */}
              {step === 4 && (
                <div>
                  <h2 className="text-[14.5px] font-semibold text-[#111d35] mb-0.5">Preferred survey dates</h2>
                  <p className="text-[11.5px] text-[#4a5568] font-medium mb-3">
                    Select <span className="text-[#111d35] font-bold">2 preferred dates</span> + time windows (Mon–Sat, IST).
                    Our team will confirm one with you.
                  </p>
                  <Calendar slots={preferredSlots} onAddSlot={addSlot} onRemoveSlot={removeSlot} />
                </div>
              )}

              {/* ── Step 5 ── */}
              {step === 5 && (
                <div>
                  <h2 className="text-[14.5px] font-semibold text-[#111d35] mb-0.5">Your contact details</h2>
                  <p className="text-[11.5px] text-[#718096] mb-3">We'll use this to confirm and schedule your survey.</p>
                  <div className="space-y-2.5">
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="First Name" name="firstName" value={contact.firstName} onChange={v => setContact(c=>({...c,firstName:v}))} placeholder="Rahul" required />
                      <Field label="Last Name"  name="lastName"  value={contact.lastName}  onChange={v => setContact(c=>({...c,lastName:v}))}  placeholder="Sharma" required />
                    </div>
                    <Field label="Designation" name="designation" value={contact.designation} onChange={v => setContact(c=>({...c,designation:v}))} placeholder="Facility Manager" />
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Email ID"     name="email" type="email" value={contact.email} onChange={v => setContact(c=>({...c,email:v}))} placeholder="rahul@company.com" required />
                      <Field label="Phone Number" name="phone" type="tel"   value={contact.phone} onChange={v => setContact(c=>({...c,phone:v}))} placeholder="+91 98765 43210" required />
                    </div>
                    <Field label="Alternate Number" name="altPhone" type="tel" value={contact.altPhone} onChange={v => setContact(c=>({...c,altPhone:v}))} placeholder="+91 98765 00000" />
                    <Field label="Facility Name" name="facilityName" value={contact.facilityName} onChange={v => setContact(c=>({...c,facilityName:v}))} placeholder="Greenwood Heights" />
                    {/* Address + GPS */}
                    <div>
                      <label className="block text-[11px] font-semibold text-[#4a5568] mb-1 tracking-wide uppercase">Facility Address</label>
                      <textarea
                        value={contact.facilityAddress}
                        onChange={e => setContact(c=>({...c,facilityAddress:e.target.value}))}
                        placeholder="Enter full address..."
                        rows={2}
                        className="cursor-text w-full px-3 py-2 rounded-xl border border-[#dbe5f0] bg-white text-[13px] placeholder:text-[#a0aec0] focus:outline-none focus:ring-2 focus:ring-[#2b6cb0]/30 focus:border-[#2b6cb0] transition-all resize-none"
                      />
                      <button type="button" onClick={handleGps} disabled={gpsLoading}
                        className="cursor-pointer mt-1.5 flex items-center gap-1.5 text-[11.5px] font-medium text-[#2b6cb0] hover:text-[#1a56a0] transition-colors disabled:opacity-50">
                        {gpsLoading ? <Loader2 size={12} className="animate-spin" /> : <MapPin size={12} />}
                        {gpsLoading ? "Getting location…" : "Use my current location"}
                      </button>
                    </div>
                    {/* OSM Map */}
                    {mapCoords && (
                      <iframe
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapCoords.lon-0.005},${mapCoords.lat-0.005},${mapCoords.lon+0.005},${mapCoords.lat+0.005}&layer=mapnik&marker=${mapCoords.lat},${mapCoords.lon}`}
                        className="w-full h-[140px] rounded-xl border border-[#dbe5f0]"
                        title="Facility Location"
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="mt-3 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5 text-[12px] text-red-700">{error}</div>
              )}
            </div>

            {/* Nav buttons */}
            <div className="flex gap-2.5 mt-3.5">
              {step > 1 && (
                <button type="button" onClick={goBack}
                  className="cursor-pointer flex items-center justify-center gap-1.5 border border-[#dbe5f0] text-[#4a5568] px-4 py-2.5 rounded-xl text-[12.5px] font-medium hover:bg-[#f0f4f8] transition-colors">
                  <ArrowLeft size={13} /> Back
                </button>
              )}
              {step < 5 ? (
                <button type="button" onClick={goNext}
                  className="cursor-pointer flex-1 flex items-center justify-center gap-1.5 bg-[#111d35] hover:bg-[#1a2744] text-white py-2.5 rounded-xl text-[13px] font-semibold transition-colors shadow-[0_4px_12px_rgba(17,29,53,0.15)]">
                  Next <ArrowRight size={13} />
                </button>
              ) : (
                <button type="button" onClick={handleSubmit} disabled={submitting}
                  className="cursor-pointer flex-1 flex items-center justify-center gap-1.5 bg-[#111d35] hover:bg-[#1a2744] disabled:opacity-60 text-white py-2.5 rounded-xl text-[13px] font-semibold transition-colors shadow-[0_4px_12px_rgba(17,29,53,0.15)]">
                  {submitting ? <><Loader2 size={13} className="animate-spin" /> Submitting…</> : "Submit Survey Request"}
                </button>
              )}
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
