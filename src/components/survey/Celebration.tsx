"use client";
// Brief celebratory overlay shown when a section is completed. Award badge +
// bursting sparkle tokens. Auto-dismisses. No emojis — lucide iconography only.

import { useEffect } from "react";
import { Award, Sparkles } from "lucide-react";

const TOKENS = Array.from({ length: 10 });

export default function Celebration({ name, onDone }: { name: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1900);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 animate-in fade-in"
      onClick={onDone}
    >
      <style>{`
        @keyframes celebToken {
          0% { transform: translate(0,0) scale(0.3); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0; }
        }
      `}</style>
      <div className="relative duration-300 animate-in zoom-in">
        {TOKENS.map((_, i) => {
          const angle = (i / TOKENS.length) * Math.PI * 2;
          const dist = 90 + (i % 3) * 22;
          const style = {
            "--tx": `${Math.cos(angle) * dist}px`,
            "--ty": `${Math.sin(angle) * dist}px`,
            animation: "celebToken 900ms ease-out forwards",
            animationDelay: `${(i % 5) * 40}ms`,
          } as React.CSSProperties;
          return (
            <Sparkles
              key={i}
              style={style}
              className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-amber-400"
            />
          );
        })}
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-white px-10 py-7 shadow-xl">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <Award className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-lg font-bold text-slate-900">Section complete</p>
          <p className="text-sm text-slate-500">{name}</p>
        </div>
      </div>
    </div>
  );
}
