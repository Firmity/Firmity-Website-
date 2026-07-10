import type { MDXComponents } from "mdx/types"

// Global styling for all .mdx page content — keeps every blog post visually
// consistent with the rest of the site (serif headings, DM Sans body, navy/blue
// accents) without repeating Tailwind classes in each post file.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1
        className="font-serif text-[clamp(1.6rem,3.6vw,2.3rem)] font-light text-[#1a202c] leading-tight tracking-tight mt-2 mb-5"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="font-serif text-[clamp(1.2rem,2.4vw,1.5rem)] font-light text-[#1a202c] leading-snug tracking-tight mt-10 mb-3"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="text-[15px] font-semibold text-[#1a202c] mt-7 mb-2"
        {...props}
      />
    ),
    p: (props) => (
      <p
        className="text-[14px] font-light text-[#4a5568] leading-[1.85] mb-4"
        {...props}
      />
    ),
    ul: (props) => (
      <ul
        className="list-disc pl-5 space-y-2 text-[14px] font-light text-[#4a5568] leading-[1.8] mb-5"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="list-decimal pl-5 space-y-2 text-[14px] font-light text-[#4a5568] leading-[1.8] mb-5"
        {...props}
      />
    ),
    li: (props) => <li className="pl-1" {...props} />,
    strong: (props) => (
      <strong className="font-semibold text-[#1a202c]" {...props} />
    ),
    a: (props) => (
      <a
        className="text-[#2b6cb0] font-medium hover:text-[#2563a8] underline underline-offset-2"
        {...props}
      />
    ),
    hr: (props) => <hr className="border-[#e2e8f0] my-10" {...props} />,
    ...components,
  }
}