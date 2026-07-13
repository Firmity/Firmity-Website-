"use client";
// Injects the homepage's DB-managed JSON-LD (editable in the SEO tab). The home
// page is a client component, so it fetches the structured data at runtime.
import { useEffect, useState } from "react";

export function HomeJsonLd() {
  const [json, setJson] = useState<string | null>(null);
  useEffect(() => {
    fetch("/api/seo/home-jsonld")
      .then((r) => r.json())
      .then((d) => d.jsonLd && setJson(JSON.stringify(d.jsonLd)))
      .catch(() => {});
  }, []);
  if (!json) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
