"use client";
// Floating toolbar that appears over a text selection for the common inline
// formats, so you don't have to travel to the top toolbar.

import { isTextSelection, type Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { Bold, Italic, Underline as UnderlineIcon, Link as LinkIcon, Highlighter, Code } from "lucide-react";
import { Divider, ToolbarButton } from "./ui";

export function BubbleToolbar({ editor: E, onLink }: { editor: Editor; onLink: () => void }) {
  return (
    <BubbleMenu
      editor={E}
      options={{ placement: "top" }}
      shouldShow={({ editor, state }) =>
        editor.isEditable &&
        isTextSelection(state.selection) &&
        !state.selection.empty &&
        !editor.isActive("codeBlock")
      }
      className="flex items-center gap-0.5 rounded-lg border border-[#dbe5f0] bg-white p-1 shadow-lg"
    >
      <ToolbarButton title="Bold" active={E.isActive("bold")} onClick={() => E.chain().focus().toggleBold().run()}><Bold size={15} /></ToolbarButton>
      <ToolbarButton title="Italic" active={E.isActive("italic")} onClick={() => E.chain().focus().toggleItalic().run()}><Italic size={15} /></ToolbarButton>
      <ToolbarButton title="Underline" active={E.isActive("underline")} onClick={() => E.chain().focus().toggleUnderline().run()}><UnderlineIcon size={15} /></ToolbarButton>
      <ToolbarButton title="Inline code" active={E.isActive("code")} onClick={() => E.chain().focus().toggleCode().run()}><Code size={15} /></ToolbarButton>
      <Divider />
      <ToolbarButton title="Highlight" active={E.isActive("highlight")} onClick={() => E.chain().focus().toggleHighlight({ color: "#fef08a" }).run()}><Highlighter size={15} /></ToolbarButton>
      <ToolbarButton title="Link" active={E.isActive("link")} onClick={onLink}><LinkIcon size={15} /></ToolbarButton>
    </BubbleMenu>
  );
}
