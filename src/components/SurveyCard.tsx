"use client";
// A single survey as a clean, info-rich, pastel card (#1/#2/#3/#23).
// - Whole card is the click target (#3).
// - Distinct pastel per facility (#1), facility-type icon (#2).
// - Press/hover micro-interactions (#10): lift on hover, shrink on tap.
//
// Reused by the surveyor "My Surveys" list; the admin board reuses the same
// palette/icon helpers for a consistent look.

import Link from "next/link";
import { CalendarDays, ChevronRight } from "lucide-react";
import StatusBadge from "@/src/components/StatusBadge";
import { facilityIcon, statusVisual } from "@/src/lib/facility-visuals";

export type SurveyCardProps = {
  id: string;
  href: string;
  name: string;
  type: string;
  status: string;
  visitLabel: string;
  /** Optional "not yet opened" marker (blue dot). See survey_views (future). */
  unread?: boolean;
};

export default function SurveyCard({ href, name, type, status, visitLabel, unread }: SurveyCardProps) {
  const v = statusVisual(status);
  const Icon = facilityIcon(type);

  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-3 rounded-2xl border p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] motion-reduce:transform-none ${v.card}`}
    >
      {unread && (
        <span
          className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-blue-500 ring-2 ring-white"
          title="Not opened yet"
        />
      )}

      {/* Facility-type icon chip */}
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${v.chip}`}>
        <Icon className={`h-5 w-5 ${v.icon}`} />
      </span>

      {/* Primary info — name + visit only (decluttered) */}
      <div className="min-w-0 flex-1">
        <p className={`truncate font-semibold ${v.title}`}>{name}</p>
        <p className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${v.sub}`}>
          <CalendarDays className="h-3.5 w-3.5" /> {visitLabel}
        </p>
      </div>

      {/* Status + affordance */}
      <div className="ml-2 flex shrink-0 flex-col items-end gap-2">
        <StatusBadge status={status} />
        <ChevronRight className="h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
