"use client";
// React popup for the "/" block menu (see slash-command.ts).

import { useEffect, useRef, useState } from "react";
import type { SuggestionProps } from "@tiptap/suggestion";
import type { SlashHandlers, SlashItem } from "./slash-command";

interface MenuState {
  items: SlashItem[];
  index: number;
  top: number;
  left: number;
  select: (item: SlashItem) => void;
}

export function SlashMenu({ handlers }: { handlers: { current: SlashHandlers | null } }) {
  const [state, setState] = useState<MenuState | null>(null);
  // Mirror of `state` for the key handler, which outlives any single render.
  const live = useRef<MenuState | null>(null);
  live.current = state;

  useEffect(() => {
    const place = (p: SuggestionProps<SlashItem, SlashItem>, index: number): MenuState | null => {
      const rect = p.clientRect?.();
      if (!rect || p.items.length === 0) return null;
      return {
        items: p.items,
        index,
        top: rect.bottom + 6,
        left: rect.left,
        select: (item) => p.command(item),
      };
    };
    handlers.current = {
      onStart: (p) => setState(place(p, 0)),
      onUpdate: (p) => setState(place(p, 0)),
      onExit: () => setState(null),
      onKeyDown: ({ event }) => {
        const s = live.current;
        if (!s) return false;
        if (event.key === "ArrowDown") {
          setState({ ...s, index: (s.index + 1) % s.items.length });
          return true;
        }
        if (event.key === "ArrowUp") {
          setState({ ...s, index: (s.index - 1 + s.items.length) % s.items.length });
          return true;
        }
        if (event.key === "Enter") {
          s.select(s.items[s.index]);
          return true;
        }
        return false;
      },
    };
    return () => {
      handlers.current = null;
    };
  }, [handlers]);

  if (!state) return null;
  return (
    <div
      role="listbox"
      aria-label="Insert block"
      style={{ position: "fixed", top: state.top, left: state.left }}
      className="z-50 max-h-72 w-64 overflow-y-auto rounded-xl border border-[#dbe5f0] bg-white p-1 shadow-lg"
    >
      {state.items.map((item, i) => (
        <button
          key={item.title}
          type="button"
          role="option"
          aria-selected={i === state.index}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => state.select(item)}
          onMouseEnter={() => setState({ ...state, index: i })}
          className={`flex w-full flex-col rounded-lg px-3 py-1.5 text-left ${i === state.index ? "bg-[#eef3f9]" : ""}`}
        >
          <span className="text-[13px] font-medium text-[#1a202c]">{item.title}</span>
          <span className="text-[11.5px] text-[#718096]">{item.hint}</span>
        </button>
      ))}
    </div>
  );
}
