"use client";
// Mobile-first dialog: bottom sheet on phones (<640px), centered modal on
// tablet/desktop. Escape / backdrop / device-back all cancel. Autofocuses the
// first field. Destructive buttons are styled distinctly and placed by callers so
// they never sit in the thumb-default (bottom-right) dismiss position.

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  title: string;
  onClose: () => void;         // treated as Cancel
  children?: ReactNode;
  footer?: ReactNode;
}

export default function ModalSheet({ open, title, onClose, children, footer }: Props) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  // Keep onClose in a ref so the setup effect below does NOT depend on its
  // identity. onClose is typically an inline function (new every parent render);
  // if the effect depended on it, it would re-run on every keystroke and steal
  // focus back to the ✕ button — dismissing the mobile keyboard after each letter.
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onCloseRef.current(); };
    window.addEventListener("keydown", onKey);
    // Device back button (mobile) closes the sheet instead of leaving the page.
    window.history.pushState({ modalSheet: true }, "");
    const onPop = () => onCloseRef.current();
    window.addEventListener("popstate", onPop);
    // Focus the first actual FIELD (not the header ✕ button) once, on open.
    panelRef.current?.querySelector<HTMLElement>("input,textarea,select")?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", onPop);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 sm:items-center" onClick={onClose}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-t-2xl bg-white p-5 shadow-xl animate-[modalSheetUp_0.18s_ease-out]
                   pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:rounded-2xl sm:pb-5 sm:animate-none"
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
        {footer && <div className="mt-5 flex items-center justify-end gap-2">{footer}</div>}
      </div>
      <style>{`@keyframes modalSheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
    </div>
  );
}
