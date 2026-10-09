"use client";
// Medium-style WYSIWYG editor (Tiptap). Emits sanitized-on-save HTML via onChange.
// The editor pieces live in ./editor/*; this file wires them together and owns
// the image upload / link / YouTube actions.
//
// Anything new the editor can produce must be allowed in
// lib/blog.ts::sanitizeContent, or it is stripped when the post is saved.

import { useCallback, useMemo, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { DragHandle } from "@tiptap/extension-drag-handle-react";
import { GripVertical } from "lucide-react";
import { BLOG_PROSE } from "@/src/lib/blog-prose";
import { buildExtensions } from "./editor/extensions";
import { buildSlashItems, createSlashCommand, type SlashHandlers } from "./editor/slash-command";
import { SlashMenu } from "./editor/slash-menu";
import { Toolbar } from "./editor/toolbar";
import { BubbleToolbar } from "./editor/bubble-toolbar";
import { ImageAltBar, TableBar } from "./editor/context-bars";

// Editor-only affordances layered on top of BLOG_PROSE: flag images with no
// alt text, highlight the selected image, show table cell selection, and
// style the collapsible-section node view (which isn't a real <details> while
// editing).
const EDITOR_ONLY =
  "[&_img:not([alt])]:outline-2 [&_img:not([alt])]:outline-dashed [&_img:not([alt])]:outline-amber-500 " +
  "[&_img[alt='']]:outline-2 [&_img[alt='']]:outline-dashed [&_img[alt='']]:outline-amber-500 " +
  "[&_img.ProseMirror-selectednode]:outline-2 [&_img.ProseMirror-selectednode]:outline-solid [&_img.ProseMirror-selectednode]:outline-[#2b6cb0] " +
  "[&_.selectedCell]:bg-[#dbeafe] [&_th]:min-w-[80px] [&_td]:min-w-[80px] " +
  "[&_[data-type=details]]:flex [&_[data-type=details]]:gap-2 [&_[data-type=details]]:border [&_[data-type=details]]:border-[#e2e8f0] [&_[data-type=details]]:rounded-xl [&_[data-type=details]]:p-3 [&_[data-type=details]]:my-4 " +
  "[&_[data-type=details]>button]:mt-0.5 [&_[data-type=details]>button]:h-5 [&_[data-type=details]>button]:w-5 [&_[data-type=details]>button]:shrink-0 [&_[data-type=details]>button]:cursor-pointer " +
  "[&_[data-type=details]>button::before]:content-['▸'] [&_[data-type=details].is-open>button::before]:content-['▾'] " +
  "[&_[data-type=details]>div]:min-w-0 [&_[data-type=details]>div]:flex-1";

/** Natural size of an uploaded image, so the saved <img> carries width/height
 * and the page doesn't jump (CLS) while it loads. null if it can't be read. */
function measureImage(src: string): Promise<{ width: number; height: number } | null> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

export function RichEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const altRef = useRef<HTMLInputElement | null>(null);
  const slashHandlers = useRef<SlashHandlers | null>(null);
  // Slash-menu items call back into actions that need the editor instance,
  // which doesn't exist yet when the extensions are built — hence the ref.
  const actionsRef = useRef({ pickImage: () => {}, insertYoutube: () => {} });

  const extensions = useMemo(
    () =>
      buildExtensions([
        createSlashCommand(
          buildSlashItems({
            pickImage: () => actionsRef.current.pickImage(),
            insertYoutube: () => actionsRef.current.insertYoutube(),
          }),
          slashHandlers,
        ),
      ]),
    [],
  );

  const editor = useEditor({
    extensions,
    content: value || "",
    immediatelyRender: false, // prevents SSR hydration mismatch in Next.js
    // Tiptap v3 doesn't re-render on selection changes by default; the toolbar
    // active states and the contextual image/table bars depend on it.
    shouldRerenderOnTransaction: true,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: { class: `${BLOG_PROSE} min-h-[420px] focus:outline-none ${EDITOR_ONLY}` },
    },
  });

  const uploadImage = useCallback(
    async (file: File) => {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/blog-admin/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!(res.ok && data.url) || !editor) {
        alert(data.error || "Image upload failed");
        return;
      }
      const size = await measureImage(data.url);
      editor.chain().focus().setImage({ src: data.url, ...size }).run();
      // Select the freshly inserted image so the alt-text bar opens on it.
      let pos = -1;
      editor.state.doc.descendants((node, p) => {
        if (pos < 0 && node.type.name === "image" && node.attrs.src === data.url) {
          pos = p;
          return false;
        }
        return true;
      });
      if (pos >= 0) {
        editor.chain().setNodeSelection(pos).run();
        setTimeout(() => altRef.current?.focus(), 50);
      }
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

  const pickImage = useCallback(() => fileRef.current?.click(), []);

  const insertYoutube = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("YouTube video URL");
    if (!url?.trim()) return;
    if (!editor.chain().focus().setYoutubeVideo({ src: url.trim() }).run()) {
      alert("That doesn't look like a valid YouTube link.");
    }
  }, [editor]);

  actionsRef.current = { pickImage, insertYoutube };

  if (!editor) return <div className="h-[480px] rounded-xl border border-[#dbe5f0] bg-white" />;

  const counts = editor.storage.characterCount;
  return (
    <div className="rounded-xl border border-[#dbe5f0] bg-white">
      <Toolbar editor={editor} actions={{ setLink, pickImage, insertYoutube }} />
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
      {editor.isActive("image") && <ImageAltBar editor={editor} inputRef={altRef} />}
      {editor.isActive("table") && <TableBar editor={editor} />}
      <BubbleToolbar editor={editor} onLink={setLink} />
      <DragHandle editor={editor}>
        <span title="Drag to move this block" className="flex cursor-grab items-center rounded p-0.5 text-[#a0aec0] hover:bg-[#f1f5f9] hover:text-[#4a5568]">
          <GripVertical size={16} />
        </span>
      </DragHandle>
      <EditorContent editor={editor} className="pl-10 pr-5 py-4" />
      <SlashMenu handlers={slashHandlers} />
      <div className="flex justify-end gap-3 border-t border-[#eef3f9] px-4 py-1.5 text-[11.5px] text-[#a0aec0]">
        <span>{counts.words()} words</span>
        <span>{counts.characters()} characters</span>
      </div>
    </div>
  );
}
