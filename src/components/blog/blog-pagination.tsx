// Crawlable pagination for the /blog index. Real <a href> links (next/link) so
// every page is discoverable without JavaScript. Server-renderable: no state.
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { pageHref, pageWindow } from "@/src/lib/blog-pagination";

const BASE = "inline-flex h-9 min-w-9 items-center justify-center rounded-[4px] border px-3 text-[12.5px] transition-colors";
const IDLE = "border-[#cbd5e0] bg-white text-[#4a5568] hover:border-[#2b6cb0] hover:text-[#2b6cb0]";
const CURRENT = "border-[#114dac] bg-[#114dac] font-semibold text-white";
const DISABLED = "pointer-events-none border-[#e2e8f0] bg-white text-[#cbd5e0]";

export function BlogPagination({ page, totalPages }: { page: number; totalPages: number }) {
  if (totalPages <= 1) return null;
  const prev = page > 1 ? page - 1 : null;
  const next = page < totalPages ? page + 1 : null;

  return (
    <nav aria-label="Blog pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2">
      {prev ? (
        <Link href={pageHref(prev)} rel="prev" aria-label="Previous page" className={`${BASE} ${IDLE} gap-1`}>
          <ChevronLeft size={14} aria-hidden="true" /> Prev
        </Link>
      ) : (
        <span aria-hidden="true" className={`${BASE} ${DISABLED} gap-1`}>
          <ChevronLeft size={14} /> Prev
        </span>
      )}

      {pageWindow(page, totalPages).map((n, i) =>
        n === null ? (
          <span key={`gap-${i}`} aria-hidden="true" className="px-1 text-[#a0aec0]">
            …
          </span>
        ) : n === page ? (
          <span key={n} aria-current="page" aria-label={`Page ${n}, current page`} className={`${BASE} ${CURRENT}`}>
            {n}
          </span>
        ) : (
          <Link key={n} href={pageHref(n)} aria-label={`Page ${n}`} className={`${BASE} ${IDLE}`}>
            {n}
          </Link>
        ),
      )}

      {next ? (
        <Link href={pageHref(next)} rel="next" aria-label="Next page" className={`${BASE} ${IDLE} gap-1`}>
          Next <ChevronRight size={14} aria-hidden="true" />
        </Link>
      ) : (
        <span aria-hidden="true" className={`${BASE} ${DISABLED} gap-1`}>
          Next <ChevronRight size={14} />
        </span>
      )}
    </nav>
  );
}
