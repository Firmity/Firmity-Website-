// Curated choices for the editor's colour / font controls. Kept short and
// on-brand on purpose: a free-form picker would let posts drift off-brand.
// Every value here must also pass the allowedStyles patterns in
// lib/blog.ts::sanitizeContent, or it is stripped when the post is saved.

export interface Swatch {
  label: string;
  /** null = clear the formatting */
  value: string | null;
}

export const TEXT_COLORS: Swatch[] = [
  { label: "Default", value: null },
  { label: "Navy", value: "#114dac" },
  { label: "Blue", value: "#2b6cb0" },
  { label: "Slate", value: "#4a5568" },
  { label: "Red", value: "#c53030" },
  { label: "Orange", value: "#c05621" },
  { label: "Green", value: "#2f855a" },
  { label: "Purple", value: "#6b46c1" },
];

export const HIGHLIGHT_COLORS: Swatch[] = [
  { label: "None", value: null },
  { label: "Yellow", value: "#fef08a" },
  { label: "Green", value: "#bbf7d0" },
  { label: "Blue", value: "#bfdbfe" },
  { label: "Pink", value: "#fbcfe8" },
  { label: "Orange", value: "#fed7aa" },
  { label: "Grey", value: "#e2e8f0" },
];

export const FONT_FAMILIES: Swatch[] = [
  { label: "Default font", value: null },
  { label: "Serif", value: "Georgia, serif" },
  { label: "Sans-serif", value: "Arial, Helvetica, sans-serif" },
  { label: "Monospace", value: "ui-monospace, Menlo, monospace" },
];

export const FONT_SIZES: Swatch[] = [
  { label: "Default size", value: null },
  { label: "Small", value: "13px" },
  { label: "Large", value: "18px" },
  { label: "X-Large", value: "22px" },
  { label: "XX-Large", value: "28px" },
];
