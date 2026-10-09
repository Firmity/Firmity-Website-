// What a saved post is allowed to contain. This is the XSS boundary for
// content_html — it must stay in step with what the Tiptap editor can emit
// (src/components/blog/editor/extensions.ts). Anything not listed here is
// stripped on save, so a new editor feature needs an entry here first.

import sanitizeHtml from "sanitize-html";

// Hex or rgb()/rgba() only — no url(), var(), expression() etc.
const COLOR = [
  /^#[0-9a-f]{3,8}$/i,
  /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*[\d.]+\s*)?\)$/i,
];

// Hosts that count as "our own site" for link-rel purposes (www. and any
// subdomain of firmity.in). Keep in step with SITE.url in lib/seo.ts.
const INTERNAL_HOST = /(^|\.)firmity\.in$/i;

/** Relative URLs, #anchors and firmity.in links are internal; everything else
 * (including mailto:/tel:, which carry no ranking value either way) is not. */
export function isInternalHref(href: string): boolean {
  const h = href.trim();
  if (h.startsWith("#") || (h.startsWith("/") && !h.startsWith("//"))) return true;
  try {
    return INTERNAL_HOST.test(new URL(h, "https://www.firmity.in").hostname) && /^(https?:)?\/\//i.test(h);
  } catch {
    return false;
  }
}

/** Internal links: plain followed links in the same tab, so the post passes
 * ranking credit to the page it points at. External links: nofollow, because
 * authors can paste any URL and we shouldn't vouch for it by default. */
function transformAnchor(tagName: string, attribs: sanitizeHtml.Attributes) {
  const next = { ...attribs };
  if (next.href && isInternalHref(next.href)) {
    delete next.rel;
    delete next.target;
  } else {
    next.rel = "noopener noreferrer nofollow";
  }
  return { tagName, attribs: next };
}

export const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p", "br", "hr", "h1", "h2", "h3", "h4",
    "strong", "b", "em", "i", "u", "s", "strike", "sub", "sup", "mark", "span",
    "ul", "ol", "li", "blockquote", "a", "img", "code", "pre", "figure", "figcaption",
    "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption",
    // task-list checkboxes, collapsible sections, YouTube embeds
    "label", "input", "div", "details", "summary", "iframe",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel"],
    img: ["src", "alt", "title", "width", "height", "loading", "decoding"],
    th: ["colspan", "rowspan", "style"],
    td: ["colspan", "rowspan", "style"],
    p: ["style"],
    h2: ["style"],
    h3: ["style"],
    span: ["style"],
    mark: ["data-color", "style"],
    ul: ["data-type"],
    li: ["data-type", "data-checked"],
    div: ["data-type", "data-youtube-video"],
    details: ["open"],
    input: [{ name: "type", multiple: false, values: ["checkbox"] }, "checked", "disabled"],
    iframe: ["src", "width", "height", "allowfullscreen", "title", "loading"],
    code: ["class"],
  },
  allowedStyles: {
    "*": {
      color: COLOR,
      "background-color": COLOR,
      "text-align": [/^(left|right|center|justify)$/],
      "font-size": [/^\d{1,2}(\.\d+)?(px|rem|em)$/],
      "font-family": [/^[\w\s,'"-]{1,80}$/],
    },
  },
  // Only YouTube may be embedded.
  allowedIframeHostnames: ["www.youtube-nocookie.com", "www.youtube.com"],
  // Code-block language hints only (e.g. "language-ts"); no other classes.
  allowedClasses: { code: ["language-*"] },
  allowedSchemes: ["http", "https", "mailto"],
  // Drop leftovers once the unsafe attribute is stripped: an iframe whose src
  // wasn't an allowed YouTube URL, or an <input> that isn't a checkbox.
  exclusiveFilter: (frame) =>
    (frame.tag === "iframe" && !frame.attribs.src) || (frame.tag === "input" && frame.attribs.type !== "checkbox"),
  transformTags: {
    a: transformAnchor,
    // Checklists on the live page are read-only.
    input: sanitizeHtml.simpleTransform("input", { disabled: "disabled" }),
    // Below-the-fold media shouldn't compete with the LCP image for bandwidth.
    iframe: sanitizeHtml.simpleTransform("iframe", { loading: "lazy", title: "YouTube video player" }),
    img: sanitizeHtml.simpleTransform("img", { loading: "lazy", decoding: "async" }),
  },
};
