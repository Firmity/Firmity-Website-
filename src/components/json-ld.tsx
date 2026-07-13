// Renders a JSON-LD structured-data block. Works in server or client components.
// Usage: <JsonLd data={organizationJsonLd()} />
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here (no user HTML); this is the standard
      // Next.js pattern for structured data.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
