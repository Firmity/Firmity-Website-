"use client"

// ─── ModuleVignette — stylised micro-UI per module ───────────────────────────
// Shared between the homepage module showcase and the features page.
// Echoes the hero dashboard aesthetic: dark panel, mono type, status dots.
// Pure presentational markup — no data fetching, no side effects.
//
// Supported ids (must match /features anchor ids):
// facility-records | preventive-maintenance | complaint-management |
// asset-management | inventory-management | staff-attendance | visitor-management

import { FileText, Bell, CheckCircle2, QrCode } from "lucide-react"

export function ModuleVignette({ id }: { id: string }) {
  const frame = "bg-[#111d35] border border-white/[0.08] rounded-[20px] p-4 sm:p-5 h-full flex flex-col gap-2.5"
  const label = "text-[8.5px] text-white/[0.35] uppercase tracking-[0.16em]"
  const row = "flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2"
  // Site convention: DM Sans everywhere — no mono typeface.
  const mono = "font-sans font-medium text-[9.5px] tracking-[0.02em]"

  switch (id) {
    case "facility-records":
      return (
        <div className={frame}>
          <div className={label}>Document Registry</div>
          {[
            { name: "AMC_Contract_HVAC.pdf",   meta: "synced · 2m ago" },
            { name: "Fire_NOC_BlockA.pdf",      meta: "synced · 1h ago" },
            { name: "Vendor_SLA_Elevators.pdf", meta: "synced · 3h ago" },
          ].map(({ name, meta }) => (
            <div key={name} className={row}>
              <FileText size={11} className="text-[#63b3ed] flex-shrink-0" strokeWidth={1.5} />
              <span className={`${mono} text-white/[0.6] flex-1 truncate`}>{name}</span>
              <span className="w-[5px] h-[5px] rounded-full bg-[#68d391] flex-shrink-0" />
              <span className={`${mono} text-white/[0.3] hidden sm:inline`}>{meta}</span>
            </div>
          ))}
          <div className={`${mono} text-[#63b3ed]/60 mt-auto`}>● All devices in sync</div>
        </div>
      )
    case "preventive-maintenance":
      return (
        <div className={frame}>
          <div className={label}>PPM Calendar — June</div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 28 }, (_, i) => {
              const scheduled = [2, 6, 9, 13, 16, 20, 23, 27].includes(i)
              const done = [2, 6, 9].includes(i)
              return (
                <div
                  key={i}
                  className={`aspect-square flex items-center justify-center text-[7px] font-sans font-medium rounded-[4px] border ${
                    done
                      ? "bg-[#2b6cb0]/40 border-[#2b6cb0]/50 text-white/70"
                      : scheduled
                        ? "bg-[#2b6cb0]/15 border-[#2b6cb0]/30 text-[#63b3ed]"
                        : "bg-white/[0.02] border-white/[0.05] text-white/[0.2]"
                  }`}
                >
                  {i + 1}
                </div>
              )
            })}
          </div>
          <div className={`${mono} text-white/[0.45] mt-auto flex items-center gap-2`}>
            <Bell size={10} className="text-[#fbd38d]" /> Next PPM: HVAC Unit B2 — in 3 days
          </div>
        </div>
      )
    case "complaint-management":
      return (
        <div className={frame}>
          <div className={label}>Ticket #FM-2841 — Water leakage, L4</div>
          <div className="flex items-center justify-between gap-1 px-1 py-2">
            {["Raised", "Assigned", "In Progress", "Resolved"].map((step, i) => (
              <div key={step} className="flex items-center gap-1 flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center ${
                      i < 3 ? "bg-[#2b6cb0]/30 border-[#63b3ed]/60" : "border-white/[0.15]"
                    }`}
                  >
                    {i < 3 && <CheckCircle2 size={9} className="text-[#63b3ed]" />}
                  </div>
                  <span className={`${mono} ${i < 3 ? "text-white/[0.55]" : "text-white/[0.25]"} whitespace-nowrap`}>{step}</span>
                </div>
                {i < 3 && <div className={`flex-1 h-px mb-4 ${i < 2 ? "bg-[#63b3ed]/40" : "bg-white/[0.1]"}`} />}
              </div>
            ))}
          </div>
          <div className={row}>
            <QrCode size={11} className="text-[#63b3ed] flex-shrink-0" strokeWidth={1.5} />
            <span className={`${mono} text-white/[0.5]`}>Raised via QR scan — Gate lobby, 09:42</span>
          </div>
          <div className={`${mono} text-[#68d391]/70 mt-auto`}>SLA on track · 2h 18m remaining</div>
        </div>
      )
    case "asset-management":
      return (
        <div className={frame}>
          <div className={label}>Asset Alerts</div>
          {[
            { dot: "#fbd38d", text: "AMC expiry — Chiller #2", when: "7 days" },
            { dot: "#90cdf4", text: "Warranty — Lift A", when: "30 days" },
            { dot: "#feb2b2", text: "Service due — DG Set 1", when: "2 days" },
          ].map(({ dot, text, when }) => (
            <div key={text} className={row}>
              <span className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: dot }} />
              <span className={`${mono} text-white/[0.6] flex-1`}>{text}</span>
              <span className={`${mono} text-white/[0.35]`}>{when}</span>
            </div>
          ))}
          <div className="mt-auto">
            <div className={`${label} mb-1.5`}>Fleet health</div>
            <div className="h-[5px] rounded-full bg-white/[0.06] overflow-hidden">
              <div className="h-full rounded-full w-[86%] bg-gradient-to-r from-[#2b6cb0] to-[#63b3ed]" />
            </div>
            <div className={`${mono} text-[#63b3ed]/70 mt-1`}>86% — 142 of 165 assets nominal</div>
          </div>
        </div>
      )
    case "inventory-management":
      return (
        <div className={frame}>
          <div className={label}>Stock Levels</div>
          {[
            { item: "AHU Filters", pct: 72, state: "ok" },
            { item: "LED Panels", pct: 38, state: "low" },
            { item: "Pump Seals", pct: 12, state: "reorder" },
          ].map(({ item, pct, state }) => (
            <div key={item}>
              <div className="flex justify-between mb-1">
                <span className={`${mono} text-white/[0.55]`}>{item}</span>
                <span className={`${mono} ${state === "reorder" ? "text-[#feb2b2]" : state === "low" ? "text-[#fbd38d]" : "text-white/[0.35]"}`}>
                  {state === "reorder" ? "PO auto-raised" : `${pct}%`}
                </span>
              </div>
              <div className="h-[4px] rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, background: state === "reorder" ? "#fc8181" : state === "low" ? "#f6ad55" : "#2b6cb0" }}
                />
              </div>
            </div>
          ))}
          <div className={`${mono} text-[#63b3ed]/60 mt-auto flex items-center gap-1.5`}>
            <FileText size={10} /> PO-0492 sent to vendor — awaiting approval
          </div>
        </div>
      )
    case "staff-attendance":
      return (
        <div className={frame}>
          <div className={label}>Shift Roster — Today</div>
          <div className="grid grid-cols-10 gap-1">
            {Array.from({ length: 30 }, (_, i) => {
              const absent = [4, 17, 23].includes(i)
              const leave = [9, 26].includes(i)
              return (
                <div
                  key={i}
                  title={absent ? "Absent" : leave ? "On leave" : "Present"}
                  className="aspect-square rounded-full"
                  style={{ background: absent ? "rgba(252,129,129,0.55)" : leave ? "rgba(246,173,85,0.55)" : "rgba(104,211,145,0.45)" }}
                />
              )
            })}
          </div>
          <div className="flex gap-3 flex-wrap">
            {[
              { c: "rgba(104,211,145,0.8)", t: "25 present" },
              { c: "rgba(246,173,85,0.8)", t: "2 on leave" },
              { c: "rgba(252,129,129,0.8)", t: "3 absent" },
            ].map(({ c, t }) => (
              <span key={t} className={`${mono} text-white/[0.45] flex items-center gap-1.5`}>
                <span className="w-[5px] h-[5px] rounded-full" style={{ background: c }} /> {t}
              </span>
            ))}
          </div>
          <div className={`${mono} text-[#63b3ed]/60 mt-auto`}>1 leave request pending approval</div>
        </div>
      )
    case "visitor-management":
      return (
        <div className={frame}>
          <div className={label}>Gate Log — Live</div>
          {[
            { time: "10:42", name: "Courier — BlueDart", status: "Checked in · Gate 2", in: true },
            { time: "10:15", name: "Vendor — AquaPure Services", status: "Checked in · Gate 1", in: true },
            { time: "09:58", name: "Guest — Mrs. R. Sharma", status: "Checked out", in: false },
          ].map(({ time, name, status, in: isIn }) => (
            <div key={name} className={row}>
              <span className={`${mono} text-white/[0.35] flex-shrink-0`}>{time}</span>
              <span className={`${mono} text-white/[0.6] flex-1 truncate`}>{name}</span>
              <span className={`${mono} flex items-center gap-1 flex-shrink-0 ${isIn ? "text-[#68d391]/80" : "text-white/[0.3]"}`}>
                <span className={`w-[5px] h-[5px] rounded-full ${isIn ? "bg-[#68d391]" : "bg-white/[0.2]"}`} />
                {status}
              </span>
            </div>
          ))}
          <div className={`${mono} text-[#63b3ed]/60 mt-auto`}>24 visitors today · full audit trail retained</div>
        </div>
      )
    default:
      return null
  }
}
