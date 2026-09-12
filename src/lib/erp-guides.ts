// ─── ERP / CMMS Guide Library ──────────────────────────────────────────────
// Added 2026-09-08, for the /features page's "resource cards" section (cards
// styled like HomeBlogSection's blog cards, each opening a full guide at
// /resources/guide/[slug] — see src/app/resources/guide/[slug]/page.tsx).
//
// Content is original writing for this site — never reproduced verbatim from
// any external source. It's grounded in research pulled from (via WebFetch/
// WebSearch, 2026-09-08, per request to "use [these] to populate content"):
//   - sap.com/resources/what-is-cloud-erp, /resources/erp-benefits,
//     /products/erp/what-is-erp/erp-upgrade-replacing-legacy-system.html,
//     /resources/erp-implementation-best-practices (fetched directly)
//   - en.wikipedia.org/wiki/Enterprise_resource_planning,
//     techtarget.com's two-tier ERP definition, softwareconnect.com's
//     7-criteria ERP evaluation checklist (sap.com/resources/what-is-erp,
//     /products/erp/what-is-erp/two-tier-erp.html and
//     /resources/how-to-evaluate-erp-software all returned 403s to a direct
//     fetch — these three substitutes cover the same ground)
//   - verosoftdesign.com/modules/cmms-maintenance-software (their TAG CMMS
//     product page) for the What-is-CMMS guide and the CMMS↔ERP relationship
// Every fact pulled from that research was re-written in Firmity's own words
// and reorganized around Firmity's own module set — no sentence here is
// copied from a source.
//
// bodyHtml is static, author-controlled markup (never user input) rendered
// with dangerouslySetInnerHTML + BLOG_PROSE (src/lib/blog-prose.ts) — same
// safe-to-inject reasoning as post.content_html in blog/[slug]/page.tsx,
// except this content never touches a database or a form submission.

export interface ErpGuide {
  slug: string
  title: string
  /** Card excerpt — 1-2 sentences, shown on the /features grid card. */
  description: string
  /** Rendered with BLOG_PROSE; h2/p/ul only. */
  bodyHtml: string
}

export const ERP_GUIDES: ErpGuide[] = [
  {
    slug: "what-is-erp",
    title: "What is ERP?",
    description:
      "A plain-English breakdown of enterprise resource planning — what it actually automates, where the term came from, and where facility operations fit inside it.",
    bodyHtml: `
      <p>Enterprise Resource Planning (ERP) is the umbrella term for software that runs the core operational and financial processes of a business — finance, procurement, inventory, human resources, and increasingly, facility and asset operations — from one connected system instead of a stack of disconnected tools.</p>
      <h2>Where the term came from</h2>
      <p>ERP grew out of manufacturing software from the 1970s–80s: Material Requirements Planning (MRP) for scheduling production, then Manufacturing Resource Planning (MRP II) for tying that to broader operations. Analysts coined "ERP" in the early 1990s once the same idea — one connected system of record — started spreading well beyond the factory floor into finance, HR, and order processing. Adoption accelerated sharply through the late '90s, partly because many companies used the Y2K deadline as the trigger to finally replace aging systems. By the 2000s, a second wave — sometimes called "ERP II" — pushed ERP from a purely internal, back-office tool into something employees, suppliers, and partners could reach over the web in real time.</p>
      <h2>The core idea: one system of record</h2>
      <p>Before ERP existed as a category, each department kept its own records: finance in one ledger, purchasing in another spreadsheet, maintenance logs on paper in a site office. Reconciling those records at month-end was manual, slow, and error-prone, because no two systems agreed on the same numbers in real time. An ERP platform replaces that patchwork with a shared database. A finance/accounting module is generally considered the one non-negotiable core of any real ERP — everything else (HR, manufacturing, order processing, supply chain, project management, CRM) sits around that shared financial spine.</p>
      <h2>Where facility management fits</h2>
      <p>Facility and property operations have historically sat outside traditional ERP — run instead on spreadsheets, WhatsApp groups, and paper registers. That's changing: modern facility platforms like Firmity now cover the same ground a classic ERP module does (procurement, inventory, payroll, expense approvals) but built around the actual unit of work in a building — a work order, an asset, a visitor, a complaint — rather than a generic accounting transaction.</p>
      <p>That's the shift worth understanding: ERP isn't just a finance system anymore, and it's now a multi-tens-of-billions-of-dollars global software category. It's whatever system holds your organization's single source of truth — and for facility-heavy businesses, that increasingly means a platform built for buildings first.</p>
    `,
  },
  {
    slug: "what-is-cloud-erp",
    title: "What is cloud ERP?",
    description:
      "How cloud ERP differs from the on-premise systems it's replacing, and why the shift has become the default rather than the exception.",
    bodyHtml: `
      <p>Cloud ERP is enterprise resource planning software delivered over the internet as a service, rather than installed on and run from a company's own servers. You log in through a browser or app; the vendor runs the infrastructure, applies the updates, and holds the data — you don't maintain any of that layer yourself.</p>
      <h2>What changes vs. on-premise</h2>
      <p>On-premise ERP means buying hardware, hosting it, and budgeting for your own upgrade and patch cycles — usually with a dedicated IT team attached. Cloud ERP replaces that capital outlay with a subscription: no servers to buy, and — for a mid-sized organization especially — access to security and uptime practices that would be hard to justify building in-house for a single deployment. Some organizations run a hybrid of both, keeping certain systems on-premise while moving others to the cloud.</p>
      <h2>Why the shift keeps accelerating</h2>
      <p>A few concrete advantages explain why the preference for cloud ERP keeps intensifying rather than plateauing:</p>
      <ul>
        <li><strong>Anywhere access</strong> — real-time visibility into cash flow, operations, and profitability from any device, not just a desk in head office.</li>
        <li><strong>Simpler integration</strong> — cloud platforms connect to other cloud tools (accounting, HR, IoT sensors) through APIs, rather than custom point-to-point connectors.</li>
        <li><strong>Continuous improvement</strong> — new functionality, including AI-assisted features, arrives through regular vendor updates instead of a multi-year upgrade project.</li>
        <li><strong>Mobile by default</strong> — cloud ERP is generally built mobile-first, which matters most for field and facility teams who were never going to use a desktop-only system anyway.</li>
        <li><strong>Faster to stand up</strong> — cloud implementations are typically markedly faster to go live than a comparable on-premise rollout.</li>
        <li><strong>Scales without a capital request</strong> — adding users, sites, or modules doesn't require a hardware purchase first.</li>
      </ul>
      <h2>Security isn't the trade-off it used to be</h2>
      <p>It's a common misconception that on-premise is inherently more secure. In practice, a cloud vendor operating at scale typically invests far more in encryption, redundant off-site backups, and round-the-clock security monitoring than a single company's in-house IT team can justify for one deployment — which is part of why data-security incidents have skewed toward on-premise systems, not away from them.</p>
      <h2>Adopting a cloud mindset</h2>
      <p>The bigger shift isn't technical, it's operational: a cloud mindset means designing processes around real-time, always-on data rather than periodic exports and manual reconciliation. As the pace of business keeps accelerating, that mindset — not just the hosting model — is what separates teams that get value from cloud ERP and teams that just moved their old spreadsheets online.</p>
    `,
  },
  {
    slug: "what-is-two-tier-erp",
    title: "What is two-tier ERP?",
    description:
      "Why larger, multi-site organizations often run a corporate ERP at headquarters alongside a lighter, faster system at each site or subsidiary.",
    bodyHtml: `
      <p>Two-tier ERP is a strategy where an organization runs two ERP systems deliberately, at two different levels: a large, often complex "Tier 1" system at corporate headquarters for consolidated finance and core group-wide processes, and a lighter "Tier 2" system at individual subsidiaries, regional offices, or sites for day-to-day local operations.</p>
      <h2>Tier 1 vs. Tier 2</h2>
      <p>Tier 1 systems are the enterprise-grade platforms typically run by large, multinational organizations — high implementation cost and timeline, built for corporate-wide financial consolidation. Tier 2 systems are less complex and less expensive to deploy, sometimes broad-based and sometimes built specifically for one industry, and chosen for how quickly and cheaply they get one site or one division operational.</p>
      <h2>Why not run one system everywhere?</h2>
      <p>A single global rollout of a heavyweight corporate ERP sounds tidy, but it's slow and expensive to extend to every location, and it rarely fits how a local team actually works — a factory floor, a hospital wing, or a residential facility has operational needs a headquarters finance system was never designed around. Two-tier setups show up most often at subsidiaries serving different markets, international divisions with local currency or language needs, newly acquired companies where a full Tier 1 migration isn't cost-justified yet, and sites needing specialized capabilities the corporate system doesn't offer.</p>
      <h2>The one thing to get right: master data</h2>
      <p>The main operational challenge in a two-tier setup is master data management — keeping vendor records, chart-of-accounts codes, and asset IDs consistent between the two systems so nothing gets duplicated or drifts out of sync as data rolls up from Tier 2 to Tier 1.</p>
      <h2>Where this shows up in facility operations</h2>
      <p>This pattern maps directly onto multi-site facility management. A hospital group, a manufacturing chain, or a real estate portfolio with many properties rarely needs every building running identical, heavyweight enterprise software — they need each site operating fast and locally, with clean numbers rolling up to whoever owns the P&L. That's effectively what a facility platform like Firmity does sitting alongside a company's existing corporate ERP: local operational agility at the Tier 2 layer, without displacing the finance system already in place at Tier 1.</p>
    `,
  },
  {
    slug: "erp-benefits",
    title: "Benefits of ERP",
    description:
      "The recurring reasons organizations move to ERP — fewer disconnected systems, faster decisions, and a cleaner audit trail.",
    bodyHtml: `
      <p>The case for ERP usually comes down to a handful of repeating benefits, regardless of industry — because they all stem from the same root cause: replacing disconnected systems with one connected one.</p>
      <h2>A single source of truth</h2>
      <p>When every department reads from the same underlying data, arguments over "whose number is right" mostly disappear. Finance, operations, and management are looking at the same live figures instead of three different exports pulled at three different times.</p>
      <h2>Real-time insight, not month-end reporting</h2>
      <p>Instead of waiting for a weekly or monthly report, decision-makers can see what's happening as it happens — which work orders are overdue, which vendor payment is pending, which site is over budget — and act on it immediately. Modern platforms increasingly layer AI and analytics on top of that live data, turning raw numbers into flagged exceptions and recommendations instead of just dashboards to interpret manually.</p>
      <h2>Simplicity through automation</h2>
      <p>Consolidating separate point-tools into one workflow removes the manual handoffs between them — the re-typing, the exporting-and-re-importing, the "did you see my email" follow-ups. Every one of those handoffs was also a chance for a transcription error; automating the handoff removes the error, not just the effort.</p>
      <h2>Stronger compliance and audit trails</h2>
      <p>Every action inside an ERP is timestamped and attributable to a user, which turns compliance from a scramble before an audit into something the system has already been keeping track of continuously.</p>
      <h2>Mobility and continuous improvement</h2>
      <p>Modern (especially cloud) ERP ships as mobile-first software with new capability arriving through regular updates rather than a disruptive multi-year upgrade cycle — the system gets better under you, not just bigger.</p>
      <h2>Lower total cost over time</h2>
      <p>Consolidating five point-tools into one platform usually costs less in licensing, training, and integration effort than maintaining five separate vendor relationships, and cloud delivery removes the capital cost of scaling to more users or sites.</p>
      <p>None of these benefits are about the software itself being impressive — they're about what stops being necessary once one connected system exists: less reconciling, less re-entering, less guessing which number is current.</p>
    `,
  },
  {
    slug: "replacing-legacy-erp",
    title: "Replacing legacy ERP",
    description:
      "The warning signs a legacy system (or a spreadsheet stand-in) has become the bottleneck, and how to move off it without a disruptive rip-and-replace.",
    bodyHtml: `
      <p>Most organizations don't replace their ERP — or their spreadsheet-based substitute for one — until the pain of keeping it becomes greater than the pain of migrating away from it. Recognizing that point early avoids months of avoidable friction.</p>
      <h2>Signs it's time</h2>
      <p>The usual signals: the system can no longer meet new business requirements or is actively limiting growth; it can't support modern technology, or only does so slowly and expensively; the interface is difficult enough to navigate that it's hurting day-to-day efficiency; performance has degraded — slow response times, data that's hard to retrieve; maintenance and support costs keep climbing while vendor assistance keeps shrinking; and it's getting harder to find staff who still know how to run it.</p>
      <h2>The risk of waiting</h2>
      <p>Legacy systems rarely fail all at once — problems develop gradually and often go unnoticed until they cause a real business disruption. Vendor support tends to shrink over time too, so the fixes that are still possible get more expensive the longer you wait, all while customer and staff expectations keep moving and the old system doesn't.</p>
      <h2>A lower-risk migration path</h2>
      <p>Before assuming replacement is the answer, confirm the current system has every available update and vendor enhancement applied — sometimes that alone closes the gap. If it doesn't, run a real cost comparison: total lifecycle cost over 5–7 years, not just the sticker price of a new system, including data conversion, training, workflow redesign, and implementation support on both sides of the ledger. Cloud/SaaS options generally come out ahead of on-premise on that longer horizon.</p>
      <p>From there, build a clear ROI case (efficiency gains, service improvements, costs avoided), set a realistic timeline with an experienced implementation partner, and treat training and change management as first-class parts of the project — not something to squeeze in during the last two weeks. A phased rollout, module by module or site by site, is what actually keeps this lower-risk in practice: it surfaces problems while they're still small, instead of all at once.</p>
    `,
  },
  {
    slug: "evaluating-erp-software",
    title: "Evaluating ERP software",
    description:
      "A practical checklist for comparing ERP or facility-management platforms beyond a feature list — fit, cost, and adoption risk.",
    bodyHtml: `
      <p>Most ERP evaluations start with a feature checklist and end up picking the platform with the longest list. That's usually the wrong way to compare, because unused features cost just as much to license and maintain as used ones. A more reliable evaluation runs through seven areas.</p>
      <h2>1. Define your actual needs first</h2>
      <p>Before looking at any vendor, assess your current processes, name the specific pain points, and write down the features you genuinely require — not the ones that sound impressive in a demo.</p>
      <h2>2. Research vendors and run real demos</h2>
      <p>Request trials, not just slide decks, and get formal proposals with consistent, comparable cost breakdowns across every vendor you're considering — inconsistent quotes make an apples-to-apples comparison impossible later.</p>
      <h2>3. Compatibility and integration</h2>
      <p>Confirm the system integrates cleanly with what you already run, and that it can scale as the organization grows — a platform that only fits today's headcount is a problem you'll be solving again in two years.</p>
      <h2>4. Customization vs. flexibility</h2>
      <p>Weigh out-of-the-box fit against how much customization your workflow would actually need, and look at the vendor's product roadmap — heavy customization on day one is often a sign the platform isn't the right fit, not a feature.</p>
      <h2>5. Data security and compliance</h2>
      <p>Check encryption standards, disaster-recovery capability, and whatever industry-specific regulatory requirements apply to your business — not just a general security claim on the website.</p>
      <h2>6. Total cost of ownership</h2>
      <p>Calculate costs over roughly five years, not just the first invoice: software, implementation, training, support, and any hardware still involved. A cheaper license with a long, expensive implementation can cost more than a pricier one that's live in weeks.</p>
      <h2>7. Training and support</h2>
      <p>Review what training resources exist and how the vendor actually onboards new customers — adoption, not the software's raw capability, is what determines whether an implementation pays off.</p>
      <p>The single best predictor layered on top of all seven: run a real pilot with real data before signing a multi-year contract. A demo environment with sample data hides exactly the friction points a live pilot exposes.</p>
    `,
  },
  {
    slug: "erp-implementation-best-practices",
    title: "ERP implementation best practices",
    description:
      "What separates ERP rollouts that go smoothly from the ones that stall — before, during, and after go-live.",
    bodyHtml: `
      <p>Most failed ERP implementations don't fail because the software was wrong — they fail because the rollout itself was poorly run. The practices below are what consistently separate the two outcomes.</p>
      <h2>Before go-live</h2>
      <p>Choose an implementation partner with real experience in your industry and references you can actually call. Staff the project properly — team members need real business knowledge and a genuine time commitment, not a token few hours a week bolted onto their existing job. Secure visible executive sponsorship so the project has authority when priorities compete elsewhere in the business. Break the project into concrete tasks across training, customization, integration, and infrastructure, estimate the hours each one honestly needs, and adjust scope or timeline the moment that math doesn't work — not after the deadline has already slipped. Run a "conference room pilot" — testing real processes end-to-end before the full rollout — to catch structural problems while they're still cheap to fix. And start data-quality work early: cleaning up years of inconsistent legacy records is one of the most time-consuming parts of any implementation, and it's the part most often underestimated.</p>
      <h2>During rollout</h2>
      <p>Keep stakeholders updated weekly, including the parts that aren't going well — a surprise at the end is worse than a known issue tracked from week one. Prioritize configuration effort on the highest-value areas first (finance, supply chain, HR, analytics) rather than spreading it evenly, and favor configuring the software to fit your process over customizing it — heavy customization is usually what turns a six-month implementation into an eighteen-month one. Manage scope creep formally: an unreviewed "quick addition" is how timelines quietly double.</p>
      <h2>After go-live</h2>
      <p>Training doesn't stop at launch — plan for new employees to be trained continuously, not just the original rollout cohort. Track the KPIs you set before implementation against your actual post-launch numbers, so "did this work" has a real answer instead of a general impression, and evaluate ROI using both the tangible savings and the harder-to-quantify gains (fewer errors, faster decisions, better compliance posture). Treat go-live as the start of continuous improvement, not the finish line — the highest-value capabilities often get added well after the original rollout, once the team knows the system well enough to ask for them.</p>
    `,
  },
  {
    slug: "what-is-cmms",
    title: "What is CMMS?",
    description:
      "Computerized Maintenance Management System, explained — and how it relates to (and increasingly overlaps with) full ERP.",
    bodyHtml: `
      <p>A CMMS — Computerized Maintenance Management System — is software purpose-built to manage maintenance work: scheduling and tracking work orders, logging asset and equipment history, managing spare-parts inventory, and centralizing everything a maintenance team used to track across paper logs and spreadsheets into one digital system.</p>
      <h2>What a CMMS actually does day to day</h2>
      <ul>
        <li>Equipment records with full history, specs, and sub-assemblies in one place</li>
        <li>Work order creation, dispatch, and calendar-based scheduling</li>
        <li>Date- or usage-triggered preventive maintenance, automated rather than tracked by memory</li>
        <li>Spare-parts and consumables inventory, sized to avoid both shortages and overstock</li>
        <li>QR-code or barcode scanning for fast, accurate asset identification in the field</li>
        <li>Vendor and contractor management alongside in-house technician work</li>
        <li>Cost history and condition analytics per asset, to catch expensive failures before they happen</li>
        <li>Multi-site asset tracking for organizations running more than one location</li>
      </ul>
      <h2>CMMS vs. ERP</h2>
      <p>Where a full ERP spans an entire enterprise — finance, HR, sales, supply chain — a CMMS is deliberately narrower: it's built around the maintenance and asset-operations function specifically. Historically, that meant a facility team ran a dedicated CMMS alongside — but disconnected from — whatever ERP the finance department used, with someone re-keying data between the two.</p>
      <h2>Why the line is blurring</h2>
      <p>That separation is breaking down from both directions. Some CMMS platforms now plug directly into ERP and financial systems via API to remove that manual re-entry, and vendors increasingly frame CMMS as the first stage on a path toward full Enterprise Asset Management (EAM) — the same idea ERP itself went through, just anchored around the asset instead of the transaction. As CMMS platforms add procurement, vendor management, payroll, and expense tracking — the operational functions a facility team actually needs day to day — they start covering the same ground a facility-focused ERP module would, just built around a work order and an asset instead of a generic accounting entry.</p>
      <p>Firmity sits squarely in that overlap: it started as a CMMS for planned maintenance and asset tracking, and has grown ERP-adjacent capabilities on top — inventory and vendor automation, payroll automation, and facility expense automation — without losing the maintenance-first design that made it useful on day one. Whether a team searches for "CMMS" or "facility ERP," they're usually describing the same underlying need: one system that runs the building, not just the books.</p>
    `,
  },
]

export function getGuideBySlug(slug: string): ErpGuide | undefined {
  return ERP_GUIDES.find((g) => g.slug === slug)
}
