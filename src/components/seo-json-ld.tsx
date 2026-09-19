// Renders the per-page JSON-LD saved in the SEO tab (page_seo.json_ld), if any.
// When nothing is saved, falls back to a plain page-type entity for pages that
// have a natural schema.org type (About, Contact, Resources hub, Blog).
// Server component — safe to drop into any route layout.
import { getPageSeo } from "@/src/lib/seo-store";
import { JsonLd } from "@/src/components/json-ld";
import { PAGE_SEO, SITE, canonical } from "@/src/lib/seo";

const DEFAULT_PAGE_TYPES: Record<string, string> = {
  "/about": "AboutPage",
  "/contact": "ContactPage",
  "/resources": "CollectionPage",
  "/blog": "Blog",
};

export async function PageJsonLd({ path }: { path: string }) {
  const row = await getPageSeo(path);
  if (row?.json_ld) return <JsonLd data={row.json_ld as Record<string, unknown>} />;

  const type = DEFAULT_PAGE_TYPES[path];
  const seo = PAGE_SEO[path];
  if (!type || !seo) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": type,
        name: seo.title,
        description: seo.description,
        url: canonical(path),
        isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
      }}
    />
  );
}
