// Renders the per-page JSON-LD saved in the SEO tab (page_seo.json_ld), if any.
// Server component — safe to drop into any route layout.
import { getPageSeo } from "@/src/lib/seo-store";
import { JsonLd } from "@/src/components/json-ld";

export async function PageJsonLd({ path }: { path: string }) {
  const row = await getPageSeo(path);
  if (!row?.json_ld) return null;
  return <JsonLd data={row.json_ld as Record<string, unknown>} />;
}
