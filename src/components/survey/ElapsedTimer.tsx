"use client";
// Live "time on this survey" for the surveyor. Counts from first_answer_at (the
// server-set timer start) and re-renders every 30s. Renders nothing until the
// first answer is recorded.

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

function fmt(sec: number): string {
  if (sec < 60) return "just started";
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export default function ElapsedTimer({ startIso, endIso }: { startIso?: string | null; endIso?: string | null }) {
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!startIso || endIso) return; // stop ticking once the survey is reported/ended
    const t = setInterval(() => setTick((n) => n + 1), 30000); // re-render every 30s
    return () => clearInterval(t);
  }, [startIso, endIso]);

  if (!startIso) return null;
  const end = endIso ? new Date(endIso).getTime() : Date.now();
  const sec = Math.max(0, (end - new Date(startIso).getTime()) / 1000);
  return (
    <span className="inline-flex items-center gap-1 text-xs text-slate-500" title={endIso ? "Total time on this survey (frozen at report generation)" : "Time since your first answer on this survey"}>
      <Clock className="h-3.5 w-3.5" /> {fmt(sec)} on this survey
    </span>
  );
}
