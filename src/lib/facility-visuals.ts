// Shared visual language for survey cards (admin + surveyor).
//
// Card colour is driven ONLY by survey status (not a per-facility hash) so the
// board reads at a glance and never sprouts endless colour variations (#5).
// Font colours follow the Firmity brand (deep green headings, muted green body,
// amber for "attention"). A facility-type -> icon map aids scannability (#2).

import {
  Building2,
  Hospital,
  Stethoscope,
  FlaskConical,
  Factory,
  Store,
  School,
  Hotel,
  Landmark,
  type LucideIcon,
} from "lucide-react";

export type StatusVisual = {
  /** card background + border */
  card: string;
  /** icon chip background */
  chip: string;
  /** icon colour */
  icon: string;
  /** heading text (brand) */
  title: string;
  /** secondary text */
  sub: string;
};

// One calm hue per status. Titles use Firmity's deep green for a consistent,
// on-brand look regardless of the card tint.
const STATUS_VISUALS: Record<string, StatusVisual> = {
  submitted: {
    card: "bg-slate-50 border-slate-200",
    chip: "bg-slate-200/70",
    icon: "text-slate-500",
    title: "text-slate-800",
    sub: "text-slate-500",
  },
  in_progress: {
    card: "bg-amber-50 border-amber-200",
    chip: "bg-amber-100",
    icon: "text-amber-600",
    title: "text-emerald-950",
    sub: "text-amber-700",
  },
  ready: {
    card: "bg-sky-50 border-sky-200",
    chip: "bg-sky-100",
    icon: "text-sky-600",
    title: "text-emerald-950",
    sub: "text-sky-700",
  },
  reported: {
    card: "bg-emerald-50 border-emerald-200",
    chip: "bg-emerald-100",
    icon: "text-emerald-600",
    title: "text-emerald-950",
    sub: "text-emerald-700",
  },
  completed: {
    card: "bg-emerald-50 border-emerald-200",
    chip: "bg-emerald-100",
    icon: "text-emerald-600",
    title: "text-emerald-950",
    sub: "text-emerald-700",
  },
};

export function statusVisual(status: string): StatusVisual {
  return STATUS_VISUALS[status] ?? STATUS_VISUALS.submitted;
}

const TYPE_ICONS: { match: RegExp; icon: LucideIcon }[] = [
  { match: /hospital/i, icon: Hospital },
  { match: /clinic|medical|health|nursing|diagnostic/i, icon: Stethoscope },
  { match: /lab|pharma|research/i, icon: FlaskConical },
  { match: /factory|plant|industrial|manufactur|warehouse/i, icon: Factory },
  { match: /retail|store|mall|shop/i, icon: Store },
  { match: /school|college|university|campus|education/i, icon: School },
  { match: /hotel|hospitality|resort/i, icon: Hotel },
  { match: /government|municipal|bank|institution/i, icon: Landmark },
];

/** Best-guess icon for a facility type string; falls back to a generic building. */
export function facilityIcon(type?: string | null): LucideIcon {
  if (!type) return Building2;
  return TYPE_ICONS.find((t) => t.match.test(type))?.icon ?? Building2;
}
