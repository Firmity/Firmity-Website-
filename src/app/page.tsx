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

async function latestPosts(): Promise<LatestPost[]> {
  try {
    const posts = await listPublished()
    return posts.slice(0, 4).map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.subtitle || p.meta_description || "",
      category: p.category || "Article",
      readTime: p.read_time || "",
      date: p.published_at
        ? new Date(p.published_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })
        : "",
      cover: p.cover_image_url ?? null,
    }))
  } catch (err) {
    console.error("[HOME_LATEST_POSTS_ERR]", err)
    return []
  }
}

export default async function HomePage() {
  // Marketing Studio can override the homepage JSON-LD (page_seo path "/").
  const [row, initialPosts] = await Promise.all([getPageSeo("/"), latestPosts()])
  const custom = row?.json_ld as Record<string, unknown> | null | undefined
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd()} />
      {custom ? <JsonLd data={custom} /> : null}
      <FirmityHome initialPosts={initialPosts} />
    </>
  )
}
