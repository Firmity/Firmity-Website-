import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"
import { Zap, FileText, TrendingDown, BarChart, ShoppingCart, Package2, AlertTriangle } from "lucide-react"

export default function InventoryManagementPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-background py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <Zap className="text-primary" size={20} />
                <span className="text-sm font-semibold text-primary">Inventory Purchase & Stock</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                Paperless Procurement & Real-Time Stock Management
              </h1>
              <p className="text-lg text-foreground/80 text-balance">
                Generate purchase orders, track deliveries, and maintain accurate stock levels—all digitally. Eliminate
                waste and optimize inventory costs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a
                  href="/contact"
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold cursor-pointer"
                >
                  Start Free Trial
                </a>
                <a
                  href="/pricing"
                  className="border-2 border-border text-foreground px-8 py-3 rounded-lg hover:bg-muted transition-colors font-semibold cursor-pointer"
                >
                  View Pricing
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Complete Inventory Control System</h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                From purchase requisition to stock management, digitize your entire procurement workflow
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <FileText className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Digital Purchase Orders</h3>
                <p className="text-foreground/80">
                  Generate, approve, and track POs digitally. Automatic numbering, multi-level approvals, and vendor
                  notifications streamline procurement.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Package2 className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Real-Time Stock Tracking</h3>
                <p className="text-foreground/80">
                  Monitor inventory levels in real-time across multiple locations. See exactly what you have, where it
                  is, and when to reorder.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <AlertTriangle className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Low Stock Alerts</h3>
                <p className="text-foreground/80">
                  Set minimum stock levels and receive automatic alerts when inventory runs low. Never run out of
                  critical supplies unexpectedly.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <ShoppingCart className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Vendor Management</h3>
                <p className="text-foreground/80">
                  Maintain vendor database with contact details, pricing, terms, and performance history. Compare
                  vendors to get the best value.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <BarChart className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Consumption Analytics</h3>
                <p className="text-foreground/80">
                  Track usage patterns, identify fast-moving items, and forecast future needs. Data-driven insights
                  optimize inventory investments.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <TrendingDown className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Cost Optimization</h3>
                <p className="text-foreground/80">
                  Reduce inventory holding costs by 20-30% through accurate demand forecasting and optimal reorder point
                  calculations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Streamlined Procurement Process</h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                From requisition to goods receipt, manage the entire purchase cycle digitally
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  1
                </div>
                <h4 className="font-bold text-foreground">Create Requisition</h4>
                <p className="text-foreground/80 text-sm">
                  Staff submits purchase request with item details, quantities, and justification.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  2
                </div>
                <h4 className="font-bold text-foreground">Approval Workflow</h4>
                <p className="text-foreground/80 text-sm">
                  Request goes through multi-level approval based on amount and category.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  3
                </div>
                <h4 className="font-bold text-foreground">Generate PO</h4>
                <p className="text-foreground/80 text-sm">
                  System creates purchase order and sends it to vendor electronically.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  4
                </div>
                <h4 className="font-bold text-foreground">Receive Goods</h4>
                <p className="text-foreground/80 text-sm">
                  Mark items received, match against PO, and update stock levels automatically.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  5
                </div>
                <h4 className="font-bold text-foreground">Track & Analyze</h4>
                <p className="text-foreground/80 text-sm">
                  Monitor spending, track consumption, and optimize future purchases.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Digital Inventory Management?</h2>
                <p className="text-lg text-foreground/80">
                  Organizations using digital inventory systems reduce procurement costs by 25%, cut inventory waste by
                  40%, and save 15 hours per week on manual paperwork and tracking.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <FileText className="text-primary" size={20} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Eliminate Paper Trails</h4>
                      <p className="text-foreground/80 text-sm">
                        No more paper requisitions, purchase orders, or manual tracking spreadsheets
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Package2 className="text-primary" size={20} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Prevent Stockouts & Overstocking</h4>
                      <p className="text-foreground/80 text-sm">
                        Maintain optimal inventory levels with automated alerts and smart forecasting
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <TrendingDown className="text-primary" size={20} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Reduce Carrying Costs</h4>
                      <p className="text-foreground/80 text-sm">
                        Lower storage costs and free up capital by maintaining lean inventory
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <BarChart className="text-primary" size={20} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Better Budget Control</h4>
                      <p className="text-foreground/80 text-sm">
                        Track spending in real-time and prevent budget overruns with approval workflows
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Inventory Categories</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Maintenance Supplies</h4>
                    <p className="text-foreground/80 text-sm">
                      Tools, spare parts, consumables, cleaning materials, and repair supplies
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Office Supplies</h4>
                    <p className="text-foreground/80 text-sm">
                      Stationery, printer supplies, furniture, and administrative materials
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Safety Equipment</h4>
                    <p className="text-foreground/80 text-sm">
                      PPE, first aid supplies, emergency equipment, and safety gear
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">Janitorial & Cleaning</h4>
                    <p className="text-foreground/80 text-sm">
                      Cleaning chemicals, equipment, waste management supplies
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-foreground">IT & Electronics</h4>
                    <p className="text-foreground/80 text-sm">
                      Computer accessories, cables, networking equipment, and batteries
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Breakdown */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Advanced Inventory Features</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Barcode Scanning</h4>
                <p className="text-foreground/80 text-sm">
                  Generate barcodes for inventory items. Use mobile devices to scan items during receiving, issuing, and
                  stock taking.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Multi-Location Management</h4>
                <p className="text-foreground/80 text-sm">
                  Track inventory across multiple warehouses, facilities, or storage locations. Transfer stock between
                  locations seamlessly.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Automated Reordering</h4>
                <p className="text-foreground/80 text-sm">
                  Set reorder points and maximum stock levels. System can automatically generate POs when inventory
                  drops below thresholds.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Batch & Serial Tracking</h4>
                <p className="text-foreground/80 text-sm">
                  Track items by batch numbers or serial numbers for warranty claims, recalls, and expiration
                  management.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Expiry Date Management</h4>
                <p className="text-foreground/80 text-sm">
                  Monitor items with expiration dates. Get alerts before items expire to prevent waste and ensure
                  compliance.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border space-y-3">
                <h4 className="font-bold text-foreground">Budget Integration</h4>
                <p className="text-foreground/80 text-sm">
                  Link purchase orders to budget codes. Track spending against budgets and prevent overspending in
                  real-time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Analytics */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Powerful Inventory Analytics</h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                Make data-driven decisions with comprehensive reporting and insights
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                <BarChart className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Consumption Reports</h4>
                <p className="text-foreground/80 text-sm">
                  Track usage trends, identify fast-moving items, and forecast future requirements based on historical
                  data.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <BarChart className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Vendor Performance</h4>
                <p className="text-foreground/80 text-sm">
                  Analyze vendor delivery times, pricing trends, quality scores, and reliability to optimize supplier
                  relationships.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <BarChart className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Stock Valuation</h4>
                <p className="text-foreground/80 text-sm">
                  Real-time inventory valuation reports for accounting and financial planning. Track cost of goods and
                  inventory turnover.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <BarChart className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Purchase History</h4>
                <p className="text-foreground/80 text-sm">
                  Complete purchase history with trends, pricing changes, and spending analysis by category, vendor, or
                  department.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <BarChart className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">Waste & Obsolescence</h4>
                <p className="text-foreground/80 text-sm">
                  Identify slow-moving items, expired products, and obsolete stock to minimize write-offs and improve
                  turnover.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <BarChart className="text-primary mb-3" size={32} />
                <h4 className="font-bold text-foreground mb-2">ABC Analysis</h4>
                <p className="text-foreground/80 text-sm">
                  Automatically classify inventory by value and usage to prioritize management attention and optimize
                  stock levels.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Transform Your Procurement Today</h2>
            <p className="text-lg opacity-90">
              Join facilities reducing inventory costs by 25% with digital procurement systems
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="/contact"
                className="bg-primary-foreground text-primary px-8 py-3 rounded-lg hover:bg-background transition-colors font-semibold cursor-pointer"
              >
                Get Started Free
              </a>
              <a
                href="/features"
                className="border-2 border-primary-foreground text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary-foreground/10 transition-colors font-semibold cursor-pointer"
              >
                Explore More Features
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
