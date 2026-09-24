// Server entry for "/". The interactive homepage lives in home-client.tsx (a
// client component); this wrapper exists so the homepage's structured data is
// in the initial HTML. It used to be fetched with client-side JavaScript,
// which search and AI crawlers that don't execute JS never saw.
import { JsonLd } from "@/src/components/json-ld"
import { getPageSeo } from "@/src/lib/seo-store"
import { SITE } from "@/src/lib/seo"
import { listPublished } from "@/src/lib/blog"
import FirmityHome, { type LatestPost } from "./home-client"

export const revalidate = 60

// Module names as shown on the site. (Not imported from home-sections.tsx: that
// is a client module, and a server component can't read its non-component exports.)
const FEATURE_LIST = [
  "Facility Task Automation",
  "Assets & Spares Automation",
  "Complaint & Helpdesk Automation",
  "Inventory & Vendor Automation ERP",
  "Visitor Management Automation",
  "Employee Management Automation",
  "Payroll Automation ERP",
  "Facility Expense Automation ERP",
]

function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Firmity",
    url: SITE.url,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Facility management software (CMMS and ERP)",
    operatingSystem: "Web, Android, iOS",
    description:
      "Firmity is a cloud-based facility management platform that combines CMMS and ERP workflows: preventive maintenance, assets, complaints, inventory, visitors, attendance, payroll and expenses.",
    featureList: FEATURE_LIST,
    areaServed: { "@type": "Country", name: "India" },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      legalName: SITE.legalName,
      url: SITE.url,
    },
  }
}

// Keep this in sync with api/blog/case-studies/route.ts's own copy — see
// that file's comment for why case studies get their own unbounded query.
const CASE_STUDY_FALLBACK_SLUG = "spreadsheets-to-cmms"

// Single listPublished() call feeding BOTH the "Browse our latest resources"
// section (top 4 only) and "What our customers say" (2026-09-24 fix): that
// second section used to filter the SAME top-4 slice client-side, so its one
// case study silently vanished — replaced by a hardcoded no-cover stub —
// the moment newer posts pushed it past position 4. caseStudyPosts is
// filtered from the FULL published list instead, so it's immune to that.
async function homeBlogData(): Promise<{ initialPosts: LatestPost[]; caseStudyPosts: LatestPost[] }> {
  try {
    const posts = await listPublished()
    const toLatestPost = (p: (typeof posts)[number]): LatestPost => ({
      slug: p.slug,
      title: p.title,
      description: p.subtitle || p.meta_description || "",
      category: p.category || "Article",
      readTime: p.read_time || "",
      date: p.published_at
        ? new Date(p.published_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })
        : "",
      cover: p.cover_image_url ?? null,
    })
    return {
      initialPosts: posts.slice(0, 4).map(toLatestPost),
      caseStudyPosts: posts
        .filter((p) => p.category === "Case Study" || p.slug === CASE_STUDY_FALLBACK_SLUG)
        .map(toLatestPost),
    }
  } catch (err) {
    console.error("[HOME_LATEST_POSTS_ERR]", err)
    return { initialPosts: [], caseStudyPosts: [] }
  }
}

export default async function HomePage() {
  // Marketing Studio can override the homepage JSON-LD (page_seo path "/").
  const [row, { initialPosts, caseStudyPosts }] = await Promise.all([getPageSeo("/"), homeBlogData()])
  const custom = row?.json_ld as Record<string, unknown> | null | undefined
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd()} />
      {custom ? <JsonLd data={custom} /> : null}
      <FirmityHome initialPosts={initialPosts} initialCaseStudies={caseStudyPosts} />
    </>
  )
}
