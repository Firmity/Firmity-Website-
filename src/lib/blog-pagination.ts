// Pure pagination helpers for the /blog index. No I/O, no server-only imports,
// so they are unit-testable and safe to import from client components.
//
// URL scheme (path-based, not ?page=): /blog is page 1, /blog/page/2 is page 2.
// Query-string pagination would force the route dynamic (no ISR/CDN caching);
// path segments stay statically cacheable and are cleanly crawlable.

/** Posts per page, including the featured hero on page 1. */
export const BLOG_PAGE_SIZE = 6;

export interface PageSlice<T> {
  items: T[];
  page: number;
  totalPages: number;
  totalItems: number;
}

export function totalPagesFor(totalItems: number, perPage: number = BLOG_PAGE_SIZE): number {
  if (!Number.isFinite(totalItems) || totalItems <= 0) return 1;
  return Math.max(1, Math.ceil(totalItems / perPage));
}

/** Parses a route segment into a page number. Returns null unless it is a
 * canonical positive integer — rejects "0", "02", "2.5", "1e3", "-1", "abc",
 * so each page has exactly one URL. */
export function parsePageParam(raw: string | undefined): number | null {
  if (!raw || !/^[1-9]\d{0,5}$/.test(raw)) return null;
  return Number(raw);
}

/** Slices `items` for a 1-based page. Out-of-range pages clamp to the nearest
 * valid page; callers that want a 404 should compare against `totalPages`
 * *before* trusting the clamped `page`. */
export function sliceForPage<T>(items: readonly T[], page: number, perPage: number = BLOG_PAGE_SIZE): PageSlice<T> {
  const totalPages = totalPagesFor(items.length, perPage);
  const requested = Number.isFinite(page) ? Math.floor(page) : 1;
  const safePage = Math.min(Math.max(1, requested), totalPages);
  const start = (safePage - 1) * perPage;
  return { items: items.slice(start, start + perPage), page: safePage, totalPages, totalItems: items.length };
}

/** Canonical URL path for a page. Page 1 is /blog (never /blog/page/1). */
export function pageHref(page: number): string {
  return page <= 1 ? "/blog" : `/blog/page/${page}`;
}

/** Page numbers to render; `null` marks an ellipsis. Always shows the first
 * page, the last page, and the current page ±1, and never hides a single
 * page behind an ellipsis. */
export function pageWindow(page: number, totalPages: number): Array<number | null> {
  const keep = new Set<number>([1, totalPages, page - 1, page, page + 1]);
  const sorted = [...keep].filter((n) => n >= 1 && n <= totalPages).sort((a, b) => a - b);
  const out: Array<number | null> = [];
  let prev = 0;
  for (const n of sorted) {
    if (prev) {
      if (n - prev === 2) out.push(prev + 1);
      else if (n - prev > 2) out.push(null);
    }
    out.push(n);
    prev = n;
  }
  return out;
}
