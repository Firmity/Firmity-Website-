"use client";
// Contextual bars that appear under the toolbar when the cursor is on an
// image (alt text) or inside a table (row / column / cell controls).

import type { RefObject } from "react";
import type { Editor } from "@tiptap/react";
import { PaintBucket } from "lucide-react";
import { BarButton, ColorMenu, Divider } from "./ui";
import { HIGHLIGHT_COLORS } from "./palette";

export function ImageAltBar({ editor: E, inputRef }: { editor: Editor; inputRef: RefObject<HTMLInputElement | null> }) {
  const alt = (E.getAttributes("image").alt as string | null | undefined) ?? "";
  return (
    <div className="flex items-center gap-2 border-b border-[#eef3f9] bg-[#f8fafc] px-3 py-2">
      <label htmlFor="blog-img-alt" className="shrink-0 text-[11px] font-semibold uppercase tracking-wide text-[#718096]">
        Alt text
      </label>
      <input
        id="blog-img-alt"
        ref={inputRef}
        value={alt}
        onChange={(e) => E.chain().updateAttributes("image", { alt: e.target.value || null }).run()}
        placeholder="Describe this image for search engines and screen readers"
        className="w-full rounded-lg border border-[#cbd5e0] bg-white px-3 py-1.5 text-[13px] focus:border-[#2b6cb0] focus:outline-none"
      />
    </div>
  );
}

export function TableBar({ editor: E }: { editor: Editor }) {
  const run = (fn: (c: ReturnType<Editor["chain"]>) => ReturnType<Editor["chain"]>) => fn(E.chain().focus()).run();
  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-[#eef3f9] bg-[#f8fafc] px-2 py-1.5">
      <span className="mr-1 text-[11px] font-semibold uppercase tracking-wide text-[#718096]">Table</span>
      <BarButton title="Add row above" onClick={() => run((c) => c.addRowBefore())}>+ Row above</BarButton>
      <BarButton title="Add row below" onClick={() => run((c) => c.addRowAfter())}>+ Row below</BarButton>
      <BarButton title="Add column to the left" onClick={() => run((c) => c.addColumnBefore())}>+ Col left</BarButton>
      <BarButton title="Add column to the right" onClick={() => run((c) => c.addColumnAfter())}>+ Col right</BarButton>
      <Divider />
      <BarButton title="Toggle header row" onClick={() => run((c) => c.toggleHeaderRow())}>Header row</BarButton>
      <BarButton title="Toggle header column" onClick={() => run((c) => c.toggleHeaderColumn())}>Header col</BarButton>
      <BarButton title="Merge selected cells (drag across cells first)" disabled={!E.can().mergeCells()} onClick={() => run((c) => c.mergeCells())}>Merge</BarButton>
      <BarButton title="Split merged cell" disabled={!E.can().splitCell()} onClick={() => run((c) => c.splitCell())}>Split</BarButton>
      <ColorMenu
        title="Cell background (drag across cells to shade several)"
        icon={<PaintBucket size={15} />}
        swatches={HIGHLIGHT_COLORS}
        onPick={(c) => run((chain) => chain.setCellAttribute("backgroundColor", c))}
      />
      <Divider />
      <BarButton title="Delete row" danger onClick={() => run((c) => c.deleteRow())}>Delete row</BarButton>
      <BarButton title="Delete column" danger onClick={() => run((c) => c.deleteColumn())}>Delete col</BarButton>
      <BarButton title="Delete table" danger onClick={() => run((c) => c.deleteTable())}>Delete table</BarButton>
    </div>
  );
}
