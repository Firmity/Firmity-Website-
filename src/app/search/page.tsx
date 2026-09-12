"use client";
// Site search results page (2026-09-04) — backs the navbar search box
// (src/components/navigation.tsx), which submits to /search?q=... . Layout is
// modeled on planonsoftware.com/us's own search-results page (search box up
// top pre-filled with the query, a "N results found" count, a plain list of
// title/url/description rows) but keeps Firmity's own type + color system
// (font-serif headings in #114dac, rounded-[4px] controls) rather than
// Planon's — per request: "copy this... of course keep our fonts."
//
// Reads ?q= via window.location.search in an effect rather than next/navigation's
// useSearchParams() — same deliberate choice as blog-index.tsx: that hook
// requires a Suspense boundary around any Client Component using it, and this
// page (like blog-index.tsx) doesn't have one set up.
//
// Data comes from GET /api/search?q=... (src/app/api/search/route.ts), which
// merges a static marketing-page index with published blog posts.

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { Navigation } from "@/src/components/navigation";
import { Footer } from "@/src/components/footer";
import { Search as SearchIcon } from "lucide-react";

// Mirrors the shape returned by GET /api/search (src/app/api/search/route.ts).
// Defined locally rather than imported from that route file — it imports
// "server-only" (via src/lib/blog.ts), which must never end up in a client
// bundle, even behind a type-only import that a bundler might not elide.
interface SearchResult {
  title: string;
  url: string;
  description: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Pick up ?q= on first load (direct link, refresh, or the navbar's submit).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q") ?? "";
    setQuery(q);
    setInputValue(q);
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setSearched(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data: SearchResult[]) => {
        if (cancelled) return;
        setResults(data);
      })
      .catch(() => {
        if (!cancelled) setResults([]);
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
          setSearched(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [query]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = inputValue.trim();
    // Client-side URL update only — this page is already a Client Component,
    // so there's no server round-trip needed to reflect the new query in the
    // address bar (keeps refresh/back-forward/sharing links working).
    const next = q ? `/search?q=${encodeURIComponent(q)}` : "/search";
    window.history.pushState({}, "", next);
    setQuery(q);
  };

  return (
    <>
      <Navigation />
      <main className="bg-white min-h-[60vh]">
        <section className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px bg-[#2b6cb0]" />
            <span className="text-[#2b6cb0] text-[10px] font-semibold tracking-[0.2em] uppercase">Search</span>
          </div>
          <h1 className="font-serif text-[clamp(1.6rem,4vw,2.4rem)] font-light text-[#114dac] tracking-tight mb-7">
            Search results
          </h1>

          <form onSubmit={submit} className="flex items-center gap-2 mb-8">
            <div className="relative flex-1">
              <SearchIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a0aec0] pointer-events-none" />
              <input
                type="search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search Firmity…"
                className="w-full pl-10 pr-4 py-3 rounded-[4px] border border-[#cbd5e0] bg-white text-[14px] text-[#1a202c] placeholder:text-[#a0aec0] focus:outline-none focus:border-[#2b6cb0] focus:ring-1 focus:ring-[#2b6cb0] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="cursor-pointer flex-shrink-0 bg-[#114dac] hover:bg-[#0e3e8a] text-white px-5 py-3 rounded-[4px] text-[13px] font-semibold transition-colors"
            >
              Search
            </button>
          </form>

          {query && (
            <p className="text-[12.5px] text-[#718096] font-light mb-6">
              {loading
                ? "Searching…"
                : `${results.length} result${results.length === 1 ? "" : "s"} found for "${query}"`}
            </p>
          )}

          {searched && !loading && results.length === 0 && (
            <p className="text-[13.5px] text-[#4a5568] font-light py-8">
              No results found. Try a different search term.
            </p>
          )}

          {!query && (
            <p className="text-[13.5px] text-[#4a5568] font-light py-8">
              Enter a search term above to find pages, features, and articles.
            </p>
          )}

          <div className="flex flex-col divide-y divide-[#eef3f9]">
            {results.map((r) => (
              <Link key={r.url} href={r.url} className="group py-5 block">
                <p className="text-[15px] font-semibold text-[#2b6cb0] group-hover:text-[#114dac] transition-colors mb-1">
                  {r.title}
                </p>
                <p className="text-[11.5px] text-[#a0aec0] font-light mb-1.5">firmity.in{r.url}</p>
                {r.description && (
                  <p className="text-[13px] text-[#4a5568] font-light leading-[1.7]">{r.description}</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
