import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Reveal } from "@/src/components/reveal"
import {
  Package, ShoppingCart, Bell, BarChart2, CheckCircle, ArrowRight,
  TrendingDown, Zap, FileText, RefreshCw, AlertTriangle, Layers
} from "lucide-react"
import Link from "next/link"

function DashboardMockup() {
  const items = [
    { name: "HVAC Filter (16x25)",   sku: "INV-0091", qty: 4,  min: 10, status: "Low"      },
    { name: "Lubricant Oil (5L)",    sku: "INV-0047", qty: 0,  min: 5,  status: "Out"       },
    { name: "LED Tube Light (T5)",   sku: "INV-0012", qty: 48, min: 20, status: "OK"        },
    { name: "Fire Exit Sign Lamp",   sku: "INV-0063", qty: 6,  min: 8,  status: "Low"       },
  ]
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-2xl" style={{ background: "#1c100c", border: "1px solid rgba(251,146,60,0.15)" }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ background: "#160c08", borderBottom: "1px solid rgba(251,146,60,0.1)" }}>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#fb923c]" />
          <span className="text-[11px] font-medium text-white/70 tracking-wide">Firmity Inventory · Central Store</span>
        </div>
        <div className="flex gap-1.5">
          <span className="text-[9px] px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(251,146,60,0.15)", color: "#fb923c" }}>Live</span>
          <span className="text-[9px] px-2 py-0.5 rounded-full font-medium text-white/40 bg-white/5">POs</span>
        </div>
      </div>
      <div className="grid grid-cols-3 px-4 py-3" style={{ background: "rgba(251,146,60,0.04)", borderBottom: "1px solid rgba(251,146,60,0.08)" }}>
        {[{ val: "312", sub: "SKUs Tracked" }, { val: "8", sub: "Low Stock Alerts" }, { val: "3", sub: "Pending POs" }].map(function(s) {
          return (
            <div key={s.val} className="text-center">
              <p className="text-[13px] font-bold" style={{ color: "#fb923c" }}>{s.val}</p>
              <p className="text-[8.5px] text-white/35">{s.sub}</p>
            </div>
          )
        })}
      </div>
      <div className="px-4 py-3 space-y-2">
        <span className="text-[9.5px] font-semibold text-white/30 uppercase tracking-widest">Stock Levels</span>
        {items.map(function(it) {
          const pct = Math.min(100, Math.round((it.qty / Math.max(it.min * 2, 1)) * 100))
          const col = it.status === "Out" ? "#f87171" : it.status === "Low" ? "#fb923c" : "#4ade80"
          return (
            <div key={it.sku} className="rounded-lg px-3 py-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(251,146,60,0.08)" }}>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-[10px] font-medium text-white/80 flex-1 truncate">{it.name}</p>
                <span className="text-[8px] px-1.5 py-0.5 rounded font-semibold flex-shrink-0" style={{ background: col + "20", color: col }}>{it.status}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full" style={{ width: pct + "%", background: col }} />
                </div>
                <span className="text-[8.5px] text-white/30 flex-shrink-0">{it.qty} / {it.min * 2} units</span>
              </div>
            </div>
          )
        })}
      </div>
      <div className="px-4 py-2.5" style={{ background: "#160c08", borderTop: "1px solid rgba(251,146,60,0.08)" }}>
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-white/35">Auto PO triggered for 2 items</span>
          <span className="text-[9px] font-semibold" style={{ color: "#fb923c" }}>View POs →</span>
        </div>
      </div>
    </div>
  )
}

export default function InventoryManagementPage() {
  const capabilities = [
    { Icon: Package,      title: "Real-Time Stock Tracking",        desc: "Monitor every item across all store locations in real time. Stock levels update automatically on issue, receipt, or adjustment." },
    { Icon: Bell,         title: "Low Stock and Reorder Alerts",    desc: "Set minimum stock thresholds per item. Automated alerts fire when levels drop below par — eliminating emergency procurement runs." },
    { Icon: ShoppingCart, title: "Purchase Order Management",       desc: "Raise, approve, and track purchase orders digitally. Link POs to vendor quotes, GRNs, and invoice history for full procurement visibility." },
    { Icon: RefreshCw,    title: "Auto Replenishment Rules",        desc: "Configure automatic PO triggers when stock hits reorder point. Define preferred vendors, lead times, and order quantities per SKU." },
    { Icon: Layers,       title: "Multi-Store and Multi-Site",      desc: "Manage inventory across multiple stores, buildings, or sites from one dashboard. Transfer stock between locations with an audit trail." },
    { Icon: BarChart2,    title: "Consumption Analytics",           desc: "Track which items are consumed most, identify wastage patterns, and optimise stock levels using historical demand data." },
  ]
  const steps = [
    { num: "01", Icon: Package,     title: "Add Items to Catalogue",  desc: "Create SKUs with category, unit, minimum stock level, and preferred vendor. Upload existing spreadsheet data." },
    { num: "02", Icon: Bell,        title: "Set Reorder Rules",       desc: "Define minimum quantities and auto-PO thresholds. The system watches stock levels continuously." },
    { num: "03", Icon: ShoppingCart,title: "Issue and Receive Stock", desc: "Technicians issue items against work orders. GRNs update stock automatically when deliveries arrive." },
    { num: "04", Icon: BarChart2,   title: "Analyse and Optimise",   desc: "Review consumption patterns, vendor performance, and carrying costs. Right-size your inventory over time." },
  ]
  const categories = [
    { Icon: Zap,         title: "Electrical and MEP Spares",   desc: "Fuses, switches, cables, pipes, fittings, and HVAC consumables — tracked with issue-to-asset linking." },
    { Icon: FileText,    title: "Housekeeping Supplies",        desc: "Cleaning agents, mops, garbage bags, and hygiene products with consumption tracking per floor or zone." },
    { Icon: AlertTriangle,title: "Safety and PPE Stocks",      desc: "Fire extinguisher refill charges, safety helmets, gloves, and emergency supplies tracked with expiry dates." },
    { Icon: TrendingDown, title: "Capital Spare Parts",        desc: "High-value spare parts for critical equipment — motors, pumps, belts — with min-max control to avoid stockouts." },
  ]
  const industries = [
    { title: "Commercial Buildings",     desc: "MEP spares, housekeeping supplies, and common area consumables tracked across multiple floors and blocks." },
    { title: "Manufacturing Plants",     desc: "Production spare parts, raw material inputs, safety consumables, and tooling inventory with usage-based reordering." },
    { title: "Hospitals and Healthcare", desc: "Medical consumables, sterilisation supplies, cleaning agents, and equipment spares with expiry tracking." },
    { title: "Retail and Malls",         desc: "Maintenance supplies, safety stocks, and common area consumables managed across multiple tenant zones." },
    { title: "Hotels and Hospitality",   desc: "Guest amenities, kitchen supplies, maintenance spares, and housekeeping consumables — tracked per department." },
    { title: "Residential Communities",  desc: "Common area maintenance supplies, pool chemicals, generator fuel, and consumables tracked per property." },
  ]
  return (
    <>
      <Navigation />
      <main className="overflow-x-hidden">
        <section style={{ background: "#1c100c" }} className="relative min-h-screen flex items-center">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 20% 50%, rgba(251,146,60,0.07) 0%, transparent 70%)" }} />
          <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-14 py-28 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <Reveal>
                  <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-7" style={{ background: "rgba(251,146,60,0.1)", border: "1px solid rgba(251,146,60,0.2)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fb923c]" />
                    <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: "#fb923c" }}>Module 05 · Inventory Purchase and Stock</span>
                  </div>
                </Reveal>
                <Reveal delay={80}>
                  <h1 className="font-serif font-light leading-[1.1] tracking-tight mb-6" style={{ fontSize: "clamp(2rem,5vw,3.4rem)", color: "#fff7ed" }}>
                    Right stock. Right place.<br /><em className="not-italic" style={{ color: "#fb923c" }}>Right time. Always.</em>
                  </h1>
                </Reveal>
                <Reveal delay={150}>
                  <p className="text-[15px] leading-[1.75] mb-10 max-w-[480px]" style={{ color: "rgba(255,247,237,0.65)" }}>
                    Firmity Inventory eliminates stock-outs, over-ordering, and procurement chaos. Track every item across every store location, automate reorders, and link consumption directly to work orders and assets.
                  </p>
                </Reveal>
                <Reveal delay={200}>
                  <div className="grid grid-cols-3 gap-5 mb-10 max-w-[440px]">
                    {[{ val: "312+", label: "SKUs managed per facility" }, { val: "30%", label: "Reduction in carrying costs" }, { val: "Zero", label: "Stock-outs with auto-reorder" }].map(function(s) {
                      return (
                        <div key={s.val}>
                          <p className="font-serif font-light leading-none mb-1.5" style={{ fontSize: "clamp(1.6rem,3.5vw,2.2rem)", color: "#fb923c" }}>{s.val}</p>
                          <p className="text-[10.5px] leading-snug" style={{ color: "rgba(255,247,237,0.45)" }}>{s.label}</p>
                        </div>
                      )
                    })}
                  </div>
                </Reveal>
                <Reveal delay={250}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[13px] font-semibold" style={{ background: "#fb923c", color: "#1c100c" }}>Book a Demo <ArrowRight size={14} /></Link>
                    <Link href="/features" className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[13px] font-semibold" style={{ background: "rgba(251,146,60,0.08)", color: "#fb923c", border: "1px solid rgba(251,146,60,0.2)" }}>Explore All Features</Link>
                  </div>
                </Reveal>
              </div>
              <Reveal direction="left" delay={180}><DashboardMockup /></Reveal>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center">
            <Reveal>
              <p className="text-[11px] font-semibold tracking-widest uppercase text-[#c2410c] mb-5">What Firmity Inventory delivers</p>
              <h2 className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c] mb-6" style={{ fontSize: "clamp(1.7rem,4vw,2.8rem)" }}>
                Stop running out of stock<br className="hidden sm:block" />mid-maintenance.
              </h2>
              <p className="text-[15px] leading-[1.8] text-[#4a5568] max-w-2xl mx-auto">
                Maintenance teams stall when the right spare part is not available. Firmity Inventory tracks every item, auto-triggers purchase orders, and links consumption to work orders — so your technicians always have what they need to finish the job.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 lg:py-24" style={{ background: "#fff7ed" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <Reveal>
              <div className="mb-12 lg:mb-16">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#c2410c] mb-3">Capabilities</p>
                <h2 className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c]" style={{ fontSize: "clamp(1.5rem,3.5vw,2.4rem)" }}>Everything your stores team needs.</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {capabilities.map(function(cap, i) {
                const Icon = cap.Icon
                return (
                  <Reveal key={cap.title} delay={i * 55}>
                    <div className="rounded-2xl p-6 h-full" style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(251,146,60,0.1)" }}>
                        <Icon size={18} style={{ color: "#c2410c" }} strokeWidth={1.75} />
                      </div>
                      <h3 className="text-[14px] font-semibold text-[#1a202c] mb-2 leading-snug">{cap.title}</h3>
                      <p className="text-[12.5px] leading-[1.75] text-[#718096]">{cap.desc}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        <section style={{ background: "#1c100c" }} className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <Reveal>
              <div className="mb-12 lg:mb-16 text-center">
                <p className="text-[11px] font-semibold tracking-widest uppercase mb-3" style={{ color: "#fb923c" }}>How it works</p>
                <h2 className="font-serif font-light leading-[1.15] tracking-tight" style={{ fontSize: "clamp(1.5rem,3.5vw,2.4rem)", color: "#fff7ed" }}>From catalogue to reorder. Automated.</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
              <div className="hidden lg:block absolute top-[28px] left-[12.5%] right-[12.5%] h-px" style={{ background: "linear-gradient(to right, rgba(251,146,60,0.3), rgba(251,146,60,0.1))" }} />
              {steps.map(function(step, i) {
                const Icon = step.Icon
                return (
                  <Reveal key={step.num} delay={i * 90}>
                    <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5 relative z-10" style={{ background: "#2a1508", border: "1px solid rgba(251,146,60,0.3)" }}>
                        <Icon size={20} style={{ color: "#fb923c" }} strokeWidth={1.5} />
                      </div>
                      <span className="text-[9px] font-bold tracking-widest mb-2" style={{ color: "rgba(251,146,60,0.5)" }}>{step.num}</span>
                      <h4 className="text-[13.5px] font-semibold mb-2" style={{ color: "#fff7ed" }}>{step.title}</h4>
                      <p className="text-[12px] leading-[1.7]" style={{ color: "rgba(255,247,237,0.5)" }}>{step.desc}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <Reveal direction="right">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#c2410c] mb-8">Business impact</p>
                <div className="space-y-8">
                  {[
                    { val: "30%", label: "Reduction in inventory carrying costs", sub: "right-sized stock levels eliminate over-ordering" },
                    { val: "Zero",label: "Work order delays due to stock-outs",  sub: "auto-reorder keeps critical items always available" },
                    { val: "100%",label: "Procurement visibility end-to-end",    sub: "PO-to-GRN-to-payment tracked in one place" },
                    { val: "2x",  label: "Faster GRN and stock reconciliation",  sub: "digital receipts update inventory instantly" },
                  ].map(function(m) {
                    return (
                      <div key={m.val} className="flex gap-5 items-start">
                        <p className="font-serif font-light leading-none flex-shrink-0 w-[100px]" style={{ fontSize: "clamp(1.4rem,2.5vw,1.9rem)", color: "#c2410c" }}>{m.val}</p>
                        <div>
                          <p className="text-[13.5px] font-semibold text-[#1a202c] mb-0.5">{m.label}</p>
                          <p className="text-[12px] text-[#718096] leading-snug">{m.sub}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Reveal>
              <Reveal direction="left" delay={100}>
                <div className="rounded-2xl p-8" style={{ background: "#fff7ed", border: "1px solid #fed7aa" }}>
                  <h3 className="font-serif font-light text-[1.35rem] text-[#1a202c] mb-7 leading-snug">From clipboard to<br />cloud-powered store room.</h3>
                  <div className="space-y-4">
                    {[
                      "Issue items against work orders — consumption tracked automatically",
                      "Raise purchase orders with one click when stock hits reorder point",
                      "Track vendor lead times and rate vendor delivery performance",
                      "Receive GRNs digitally — no paper, no discrepancy risk",
                      "Get expiry alerts for perishable items and safety consumables",
                      "Generate monthly consumption reports for cost allocation by department",
                    ].map(function(b) {
                      return (
                        <div key={b} className="flex gap-3 items-start">
                          <CheckCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color: "#c2410c" }} />
                          <p className="text-[12.5px] leading-[1.65] text-[#2d3748]">{b}</p>
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-8">
                    <Link href="/contact" className="inline-flex items-center gap-2 text-[12.5px] font-semibold hover:gap-3.5 transition-all" style={{ color: "#c2410c" }}>See it in action <ArrowRight size={14} /></Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24" style={{ background: "#fff7ed" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <Reveal>
              <div className="mb-12 text-center">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#c2410c] mb-3">Stock categories</p>
                <h2 className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c]" style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)" }}>One inventory system. Every category.</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {categories.map(function(cat, i) {
                const Icon = cat.Icon
                return (
                  <Reveal key={cat.title} delay={i * 60}>
                    <div className="rounded-2xl p-6 h-full" style={{ background: "#ffffff", border: "1px solid #fed7aa" }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(251,146,60,0.1)" }}>
                        <Icon size={18} style={{ color: "#c2410c" }} strokeWidth={1.75} />
                      </div>
                      <h4 className="text-[13.5px] font-semibold text-[#1a202c] mb-2">{cat.title}</h4>
                      <p className="text-[12px] leading-[1.7] text-[#718096]">{cat.desc}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <Reveal>
              <div className="mb-12">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#c2410c] mb-3">Who uses it</p>
                <h2 className="font-serif font-light leading-[1.15] tracking-tight text-[#1a202c]" style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)" }}>Inventory management for every sector.</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {industries.map(function(ind, i) {
                return (
                  <Reveal key={ind.title} delay={i * 45}>
                    <div className="rounded-xl p-5" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#fb923c]" />
                        <h4 className="text-[13px] font-semibold text-[#1a202c]">{ind.title}</h4>
                      </div>
                      <p className="text-[12px] leading-[1.65] text-[#718096] pl-3.5">{ind.desc}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        <section style={{ background: "#1c100c" }} className="py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(251,146,60,0.06) 0%, transparent 70%)" }} />
          <div className="relative max-w-4xl mx-auto px-6 sm:px-10 text-center">
            <Reveal>
              <h2 className="font-serif font-light leading-[1.15] tracking-tight mb-4" style={{ fontSize: "clamp(1.6rem,4vw,2.6rem)", color: "#fff7ed" }}>Ready to end stock-outs and procurement chaos?</h2>
              <p className="text-[14px] leading-[1.75] mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,247,237,0.6)" }}>Facility teams using Firmity Inventory eliminate unplanned procurement runs, cut carrying costs, and give technicians what they need — every time.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-[13px] font-semibold" style={{ background: "#fb923c", color: "#1c100c" }}>Book a Demo <ArrowRight size={14} /></Link>
                <Link href="/features" className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-[13px] font-semibold" style={{ background: "rgba(251,146,60,0.08)", color: "#fb923c", border: "1px solid rgba(251,146,60,0.2)" }}>Explore All Modules</Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
