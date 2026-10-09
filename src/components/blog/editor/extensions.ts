// The full Tiptap extension list for the blog editor, in one place.
// Everything here must round-trip through lib/blog.ts::sanitizeContent — if
// you add an extension that emits new tags/attributes/styles, allow them there.

import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { TableKit, TableCell, TableHeader } from "@tiptap/extension-table";
import { TextStyle, Color, FontFamily, FontSize } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Youtube from "@tiptap/extension-youtube";
import { Details, DetailsSummary, DetailsContent } from "@tiptap/extension-details";
import { TaskList, TaskItem } from "@tiptap/extension-list";
import { CharacterCount } from "@tiptap/extensions";
import type { Extensions } from "@tiptap/react";

// Table cells with an optional background colour (stored as an inline
// background-color style, which the sanitizer allows for hex/rgb values only).
const cellBackground = {
  backgroundColor: {
    default: null as string | null,
    parseHTML: (el: HTMLElement) => el.style.backgroundColor || null,
    renderHTML: (attrs: { backgroundColor?: string | null }) =>
      attrs.backgroundColor ? { style: `background-color: ${attrs.backgroundColor}` } : {},
  },
};

const ShadedTableCell = TableCell.extend({
  addAttributes() {
    return { ...this.parent?.(), ...cellBackground };
  },
});

const ShadedTableHeader = TableHeader.extend({
  addAttributes() {
    return { ...this.parent?.(), ...cellBackground };
  },
});

export function buildExtensions(extra: Extensions): Extensions {
  return [
    // StarterKit v3 already bundles Link and Underline, plus inline code,
    // code blocks, horizontal rule, hard break (Shift+Enter), the keyboard
    // shortcuts, markdown-style input rules (## , - , > , ``` , ---) and the
    // drop cursor / gap cursor.
    StarterKit.configure({
      heading: { levels: [2, 3] },
      link: { openOnClick: false, autolink: true },
    }),
    Image.configure({ inline: false, allowBase64: false }),
    Placeholder.configure({ placeholder: "Write your article… (type / for blocks)" }),
    // Fixed-width tables only (no drag-resize): resizing writes inline
    // style/colwidth attributes the sanitizer would strip. Pasting a range
    // from Excel / Google Sheets / Word becomes a real table.
    TableKit.configure({ table: { resizable: false }, tableCell: false, tableHeader: false }),
    ShadedTableCell,
    ShadedTableHeader,
    TextStyle,
    Color,
    FontFamily,
    FontSize,
    Highlight.configure({ multicolor: true }),
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    Subscript,
    Superscript,
    TaskList,
    TaskItem.configure({ nested: true }),
    CharacterCount,
    // youtube-nocookie.com: no tracking cookies until the reader presses play.
    Youtube.configure({ nocookie: true, width: 640, height: 360, modestBranding: true }),
    Details.configure({ persist: false }),
    DetailsSummary,
    DetailsContent,
    ...extra,
  ];
}
