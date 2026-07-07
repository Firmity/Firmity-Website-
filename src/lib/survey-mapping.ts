// Maps the website form's option IDs -> the backend's canonical slugs.
// WHY: the form and the survey backend evolved separately, so a few IDs differ
// (hospitality->hotel, mixed->mixed_use, fire->fire_safety, green->green_building).
// Keep this the ONLY place that translation happens, so it can't drift.

const FACILITY_TYPE_MAP: Record<string, string> = {
  manufacturing: "manufacturing",
  educational: "educational",
  residential: "residential",
  commercial: "commercial",
  healthcare: "healthcare",
  hospitality: "hotel",
  mixed: "mixed_use",
};

const DOMAIN_MAP: Record<string, string> = {
  security: "security",
  fire: "fire_safety",
  hvac: "hvac",
  electrical: "electrical",
  plumbing: "plumbing",
  civil: "civil",
  horticulture: "horticulture",
  housekeeping: "housekeeping",
  green: "green_building",
};

/** Website facility id -> backend slug. Falls back to the raw id if unmapped. */
export function mapFacilityType(id: string): string {
  return FACILITY_TYPE_MAP[id] ?? id;
}

/** Website survey-type ids -> backend domain slugs. Drops any unknown id. */
export function mapDomains(ids: string[]): string[] {
  const out = ids.map((i) => DOMAIN_MAP[i]).filter(Boolean) as string[];
  return [...new Set(out)]; // dedupe, keep order
}
