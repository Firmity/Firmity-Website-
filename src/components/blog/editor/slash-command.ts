// "/" block menu: type / on an empty line (or after a space) to insert
// headings, lists, tables, images, videos and so on. This file is the
// ProseMirror side; slash-menu.tsx is the React popup that renders the list.

import { Extension, type Editor, type Range } from "@tiptap/react";
import { PluginKey } from "@tiptap/pm/state";
import Suggestion, { type SuggestionKeyDownProps, type SuggestionProps } from "@tiptap/suggestion";

export interface SlashItem {
  title: string;
  hint: string;
  keywords: string[];
  run: (editor: Editor, range: Range) => void;
}

/** What the React popup registers so the plugin can drive it. */
export interface SlashHandlers {
  onStart: (p: SuggestionProps<SlashItem, SlashItem>) => void;
  onUpdate: (p: SuggestionProps<SlashItem, SlashItem>) => void;
  onExit: () => void;
  onKeyDown: (p: SuggestionKeyDownProps) => boolean;
}

export interface SlashActions {
  pickImage: () => void;
  insertYoutube: () => void;
}

export function buildSlashItems(actions: SlashActions): SlashItem[] {
  const clear = (editor: Editor, range: Range) => editor.chain().focus().deleteRange(range);
  return [
    { title: "Heading 2", hint: "Section heading", keywords: ["h2", "title", "heading"], run: (e, r) => clear(e, r).setNode("heading", { level: 2 }).run() },
    { title: "Heading 3", hint: "Sub-section heading", keywords: ["h3", "subheading", "heading"], run: (e, r) => clear(e, r).setNode("heading", { level: 3 }).run() },
    { title: "Bullet list", hint: "Simple bulleted list", keywords: ["ul", "unordered", "list"], run: (e, r) => clear(e, r).toggleBulletList().run() },
    { title: "Numbered list", hint: "Ordered steps", keywords: ["ol", "ordered", "list"], run: (e, r) => clear(e, r).toggleOrderedList().run() },
    { title: "Checklist", hint: "Task list with checkboxes", keywords: ["todo", "task", "checkbox"], run: (e, r) => clear(e, r).toggleTaskList().run() },
    { title: "Quote", hint: "Pull quote or callout", keywords: ["blockquote", "callout"], run: (e, r) => clear(e, r).toggleBlockquote().run() },
    { title: "Code block", hint: "Preformatted code", keywords: ["code", "snippet", "pre"], run: (e, r) => clear(e, r).toggleCodeBlock().run() },
    { title: "Divider", hint: "Horizontal rule", keywords: ["hr", "line", "separator"], run: (e, r) => clear(e, r).setHorizontalRule().run() },
    { title: "Table", hint: "3 × 3 table with header row", keywords: ["grid", "excel", "spreadsheet"], run: (e, r) => clear(e, r).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
    { title: "Collapsible section", hint: "Expandable summary + content", keywords: ["details", "accordion", "toggle", "faq"], run: (e, r) => clear(e, r).setDetails().run() },
    { title: "Image", hint: "Upload an image", keywords: ["photo", "picture", "upload"], run: (e, r) => { clear(e, r).run(); actions.pickImage(); } },
    { title: "YouTube video", hint: "Embed by URL", keywords: ["video", "embed", "youtube"], run: (e, r) => { clear(e, r).run(); actions.insertYoutube(); } },
  ];
}

export function filterSlashItems(items: SlashItem[], query: string): SlashItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((i) => i.title.toLowerCase().includes(q) || i.keywords.some((k) => k.includes(q)));
}

export function createSlashCommand(items: SlashItem[], handlers: { current: SlashHandlers | null }) {
  return Extension.create({
    name: "slashCommand",
    addProseMirrorPlugins() {
      return [
        Suggestion<SlashItem, SlashItem>({
          editor: this.editor,
          pluginKey: new PluginKey("slashCommand"),
          char: "/",
          // Never trigger inside a code block — "/" is just a character there.
          allow: ({ state, range }) => !state.doc.resolve(range.from).parent.type.spec.code,
          items: ({ query }) => filterSlashItems(items, query),
          command: ({ editor, range, props }) => props.run(editor, range),
          render: () => ({
            onStart: (p) => handlers.current?.onStart(p),
            onUpdate: (p) => handlers.current?.onUpdate(p),
            onExit: () => handlers.current?.onExit(),
            onKeyDown: (p) => handlers.current?.onKeyDown(p) ?? false,
          }),
        }),
      ];
    },
  });
}
