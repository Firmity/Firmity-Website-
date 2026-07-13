"use client";
// Medium-style WYSIWYG editor (Tiptap). Emits sanitized-on-save HTML via onChange.
// Requires: @tiptap/react @tiptap/starter-kit @tiptap/extension-underline
//           @tiptap/extension-link @tiptap/extension-image @tiptap/extension-placeholder

import { useCallback, useRef } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Heading2, Heading3,
  List, ListOrdered, Quote, Link as LinkIcon, Image as ImageIcon, Undo2, Redo2,
} from "lucide-react";
import { BLOG_PROSE } from "@/src/lib/blog-prose";

function ToolbarButton({
  onClick, active, title, children,
}: {
  onClick: () => void; active?: boolean; title: string; children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`h-8 w-8 flex items-center justify-center rounded-md transition-colors ${
        active ? "bg-[#eef3f9] text-[#2b6cb0]" : "text-[#4a5568] hover:bg-[#f1f5f9]"
      }`}
    >
      {children}
    </button>
  );
}

export function RichEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      Link.configure({ openOnClick: false, autolink: true }),
      Image.configure({ inline: false, allowBase64: false }),
      Placeholder.configure({ placeholder: "Write your article…" }),
    ],
    content: value || "",
    immediatelyRender: false, // prevents SSR hydration mismatch in Next.js
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: { class: `${BLOG_PROSE} min-h-[420px] focus:outline-none` },
    },
  });

  const uploadImage = useCallback(
    async (file: File) => {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/blog-admin/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) editor?.chain().focus().setImage({ src: data.url }).run();
      else alert(data.error || "Image upload failed");
    },
    [editor],
  );

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", prev || "https://");
    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  }, [editor]);

  if (!editor) return <div className="h-[480px] rounded-xl border border-[#dbe5f0] bg-white" />;

  const E = editor as Editor;
  return (
    <div className="rounded-xl border border-[#dbe5f0] bg-white">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-[#eef3f9] p-2 sticky top-0 bg-white z-10 rounded-t-xl">
        <ToolbarButton title="Bold" active={E.isActive("bold")} onClick={() => E.chain().focus().toggleBold().run()}><Bold size={16} /></ToolbarButton>
        <ToolbarButton title="Italic" active={E.isActive("italic")} onClick={() => E.chain().focus().toggleItalic().run()}><Italic size={16} /></ToolbarButton>
        <ToolbarButton title="Underline" active={E.isActive("underline")} onClick={() => E.chain().focus().toggleUnderline().run()}><UnderlineIcon size={16} /></ToolbarButton>
        <ToolbarButton title="Strikethrough" active={E.isActive("strike")} onClick={() => E.chain().focus().toggleStrike().run()}><Strikethrough size={16} /></ToolbarButton>
        <span className="mx-1 h-5 w-px bg-[#e2e8f0]" />
        <ToolbarButton title="Heading 2" active={E.isActive("heading", { level: 2 })} onClick={() => E.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={16} /></ToolbarButton>
        <ToolbarButton title="Heading 3" active={E.isActive("heading", { level: 3 })} onClick={() => E.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 size={16} /></ToolbarButton>
        <ToolbarButton title="Bullet list" active={E.isActive("bulletList")} onClick={() => E.chain().focus().toggleBulletList().run()}><List size={16} /></ToolbarButton>
        <ToolbarButton title="Numbered list" active={E.isActive("orderedList")} onClick={() => E.chain().focus().toggleOrderedList().run()}><ListOrdered size={16} /></ToolbarButton>
        <ToolbarButton title="Quote" active={E.isActive("blockquote")} onClick={() => E.chain().focus().toggleBlockquote().run()}><Quote size={16} /></ToolbarButton>
        <span className="mx-1 h-5 w-px bg-[#e2e8f0]" />
        <ToolbarButton title="Link" active={E.isActive("link")} onClick={setLink}><LinkIcon size={16} /></ToolbarButton>
        <ToolbarButton title="Insert image" onClick={() => fileRef.current?.click()}><ImageIcon size={16} /></ToolbarButton>
        <span className="mx-1 h-5 w-px bg-[#e2e8f0]" />
        <ToolbarButton title="Undo" onClick={() => E.chain().focus().undo().run()}><Undo2 size={16} /></ToolbarButton>
        <ToolbarButton title="Redo" onClick={() => E.chain().focus().redo().run()}><Redo2 size={16} /></ToolbarButton>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) uploadImage(f);
            e.target.value = "";
          }}
        />
      </div>
      <EditorContent editor={editor} className="px-5 py-4" />
    </div>
  );
}
