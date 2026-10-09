"use client";
// Main formatting toolbar. Pure presentation: every action goes through the
// Tiptap chain API, and the insert actions that need a file picker / prompt
// are handed in from rich-editor.tsx.

import type { Editor } from "@tiptap/react";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code, Subscript, Superscript,
  Heading2, Heading3, List, ListOrdered, ListChecks, Quote, SquareCode, Minus, CornerDownLeft,
  AlignLeft, AlignCenter, AlignRight, AlignJustify, Palette, Highlighter,
  Link as LinkIcon, Image as ImageIcon, Table as TableIcon, Youtube as YoutubeIcon, ChevronsUpDown,
  Undo2, Redo2,
} from "lucide-react";
import { ChoiceSelect, ColorMenu, Divider, ToolbarButton } from "./ui";
import { FONT_FAMILIES, FONT_SIZES, HIGHLIGHT_COLORS, TEXT_COLORS } from "./palette";

export interface InsertActions {
  setLink: () => void;
  pickImage: () => void;
  insertYoutube: () => void;
}

const ICON = 16;

export function Toolbar({ editor: E, actions }: { editor: Editor; actions: InsertActions }) {
  const textStyle = E.getAttributes("textStyle") as { fontFamily?: string; fontSize?: string };
  const aligns = [
    { value: "left", title: "Align left", Icon: AlignLeft },
    { value: "center", title: "Align center", Icon: AlignCenter },
    { value: "right", title: "Align right", Icon: AlignRight },
    { value: "justify", title: "Justify", Icon: AlignJustify },
  ] as const;

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-[#eef3f9] p-2 sticky top-0 bg-white z-10 rounded-t-xl">
      <ToolbarButton title="Bold (Ctrl+B)" active={E.isActive("bold")} onClick={() => E.chain().focus().toggleBold().run()}><Bold size={ICON} /></ToolbarButton>
      <ToolbarButton title="Italic (Ctrl+I)" active={E.isActive("italic")} onClick={() => E.chain().focus().toggleItalic().run()}><Italic size={ICON} /></ToolbarButton>
      <ToolbarButton title="Underline (Ctrl+U)" active={E.isActive("underline")} onClick={() => E.chain().focus().toggleUnderline().run()}><UnderlineIcon size={ICON} /></ToolbarButton>
      <ToolbarButton title="Strikethrough" active={E.isActive("strike")} onClick={() => E.chain().focus().toggleStrike().run()}><Strikethrough size={ICON} /></ToolbarButton>
      <ToolbarButton title="Inline code" active={E.isActive("code")} onClick={() => E.chain().focus().toggleCode().run()}><Code size={ICON} /></ToolbarButton>
      <ToolbarButton title="Subscript" active={E.isActive("subscript")} onClick={() => E.chain().focus().toggleSubscript().run()}><Subscript size={ICON} /></ToolbarButton>
      <ToolbarButton title="Superscript" active={E.isActive("superscript")} onClick={() => E.chain().focus().toggleSuperscript().run()}><Superscript size={ICON} /></ToolbarButton>
      <Divider />
      <ColorMenu
        title="Text colour"
        icon={<Palette size={ICON} />}
        swatches={TEXT_COLORS}
        onPick={(c) => (c ? E.chain().focus().setColor(c).run() : E.chain().focus().unsetColor().run())}
      />
      <ColorMenu
        title="Highlight"
        icon={<Highlighter size={ICON} />}
        swatches={HIGHLIGHT_COLORS}
        active={E.isActive("highlight")}
        onPick={(c) => (c ? E.chain().focus().setHighlight({ color: c }).run() : E.chain().focus().unsetHighlight().run())}
      />
      <ChoiceSelect
        title="Font"
        options={FONT_FAMILIES}
        value={textStyle.fontFamily ?? null}
        onPick={(v) => (v ? E.chain().focus().setFontFamily(v).run() : E.chain().focus().unsetFontFamily().run())}
      />
      <ChoiceSelect
        title="Font size"
        options={FONT_SIZES}
        value={textStyle.fontSize ?? null}
        onPick={(v) => (v ? E.chain().focus().setFontSize(v).run() : E.chain().focus().unsetFontSize().run())}
      />
      <Divider />
      <ToolbarButton title="Heading 2" active={E.isActive("heading", { level: 2 })} onClick={() => E.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={ICON} /></ToolbarButton>
      <ToolbarButton title="Heading 3" active={E.isActive("heading", { level: 3 })} onClick={() => E.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 size={ICON} /></ToolbarButton>
      <ToolbarButton title="Bullet list" active={E.isActive("bulletList")} onClick={() => E.chain().focus().toggleBulletList().run()}><List size={ICON} /></ToolbarButton>
      <ToolbarButton title="Numbered list" active={E.isActive("orderedList")} onClick={() => E.chain().focus().toggleOrderedList().run()}><ListOrdered size={ICON} /></ToolbarButton>
      <ToolbarButton title="Checklist" active={E.isActive("taskList")} onClick={() => E.chain().focus().toggleTaskList().run()}><ListChecks size={ICON} /></ToolbarButton>
      <ToolbarButton title="Quote" active={E.isActive("blockquote")} onClick={() => E.chain().focus().toggleBlockquote().run()}><Quote size={ICON} /></ToolbarButton>
      <ToolbarButton title="Code block" active={E.isActive("codeBlock")} onClick={() => E.chain().focus().toggleCodeBlock().run()}><SquareCode size={ICON} /></ToolbarButton>
      <Divider />
      {aligns.map(({ value, title, Icon }) => (
        <ToolbarButton key={value} title={title} active={E.isActive({ textAlign: value })} onClick={() => E.chain().focus().setTextAlign(value).run()}>
          <Icon size={ICON} />
        </ToolbarButton>
      ))}
      <Divider />
      <ToolbarButton title="Link" active={E.isActive("link")} onClick={actions.setLink}><LinkIcon size={ICON} /></ToolbarButton>
      <ToolbarButton title="Insert image" onClick={actions.pickImage}><ImageIcon size={ICON} /></ToolbarButton>
      <ToolbarButton
        title="Insert table (or paste one from Excel / Google Sheets)"
        active={E.isActive("table")}
        onClick={() => E.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
      ><TableIcon size={ICON} /></ToolbarButton>
      <ToolbarButton title="Embed YouTube video" onClick={actions.insertYoutube}><YoutubeIcon size={ICON} /></ToolbarButton>
      <ToolbarButton title="Collapsible section" active={E.isActive("details")} onClick={() => E.chain().focus().setDetails().run()}><ChevronsUpDown size={ICON} /></ToolbarButton>
      <ToolbarButton title="Divider line" onClick={() => E.chain().focus().setHorizontalRule().run()}><Minus size={ICON} /></ToolbarButton>
      <ToolbarButton title="Line break (Shift+Enter)" onClick={() => E.chain().focus().setHardBreak().run()}><CornerDownLeft size={ICON} /></ToolbarButton>
      <Divider />
      <ToolbarButton title="Undo (Ctrl+Z)" disabled={!E.can().undo()} onClick={() => E.chain().focus().undo().run()}><Undo2 size={ICON} /></ToolbarButton>
      <ToolbarButton title="Redo (Ctrl+Shift+Z)" disabled={!E.can().redo()} onClick={() => E.chain().focus().redo().run()}><Redo2 size={ICON} /></ToolbarButton>
    </div>
  );
}
