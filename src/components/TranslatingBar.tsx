"use client";
// Small floating indicator shown while background translation is in flight.
// Driven by the i18n store's `pending` flag; renders nothing when idle.

import { Loader2 } from "lucide-react";
import { usePending } from "@/src/lib/i18n";

export default function TranslatingBar() {
  const pending = usePending();
  if (!pending) return null;
  return (
    <div className="fixed left-1/2 top-3 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full bg-slate-900/90 px-4 py-2 text-xs font-medium text-white shadow-lg backdrop-blur">
      <Loader2 className="h-3.5 w-3.5 animate-spin" />
      Translating…
    </div>
  );
}
