"use client";
// Admin-only "New survey" — spin up a survey without waiting for a client website
// booking, and optionally assign a surveyor. Calls POST /surveys/admin (role-gated
// server-side); on success routes straight into the survey.

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, X } from "lucide-react";
import { adminCreateSurvey, getDomains, type AdminSurveyBody } from "@/src/lib/survey-api";
import type { Staff } from "@/src/components/SurveysBoard";

// Facility-level categories live in their own sections, not a chosen scope.
const FACILITY_ONLY = new Set(["general", "client_pain_areas", "urest_suggestion"]);

// Mirror the backend FacilityType + SELECTABLE_DOMAINS (models.py) so we never
// send a value the API would 422 on.
const FACILITY_TYPES = ["manufacturing", "educational", "residential", "commercial", "healthcare", "hotel", "mixed_use"] as const;
const FT_LABELS: Record<string, string> = {
  manufacturing: "Manufacturing", educational: "Educational", residential: "Residential",
  commercial: "Commercial", healthcare: "Healthcare", hotel: "Hotel", mixed_use: "Mixed-use",
};
export default function AdminCreateSurvey({ staff }: { staff: Staff[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  // Scope options come live from the question bank (data-driven categories).
  const [scopeOptions, setScopeOptions] = useState<{ slug: string; label: string }[]>([]);
  useEffect(() => {
    if (!open || scopeOptions.length) return;
    getDomains()
      .then((ds) => setScopeOptions(
        ds.filter((d) => !FACILITY_ONLY.has(d.slug) && d.is_active !== false)
          .map((d) => ({ slug: d.slug, label: d.name }))
      ))
      .catch(() => {});
  }, [open, scopeOptions.length]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [facilityType, setFacilityType] = useState<string>("commercial");
  const [address, setAddress] = useState("");
  const [buildings, setBuildings] = useState("");        // comma-separated
  const [domains, setDomains] = useState<Set<string>>(new Set());
  const [assignedTo, setAssignedTo] = useState("");

  const toggleDomain = (slug: string) =>
    setDomains((p) => { const n = new Set(p); n.has(slug) ? n.delete(slug) : n.add(slug); return n; });

  const reset = () => {
    setName(""); setFacilityType("commercial"); setAddress(""); setBuildings("");
    setDomains(new Set()); setAssignedTo(""); setErr(null);
  };

  async function submit() {
    if (domains.size === 0) { setErr("Select at least one scope of survey."); return; }
    setBusy(true);
    setErr(null);
    const blocks = buildings.split(",").map((b) => b.trim()).filter(Boolean).map((n) => ({ name: n }));
    const body: AdminSurveyBody = {
      facility_type: facilityType,
      domain_slugs: [...domains],
      facility_name: name.trim() || null,
      facility_address: address.trim() || null,
      blocks,
      assigned_to: assignedTo || null,
      contact: null,
    };
    try {
      const survey = await adminCreateSurvey(body);
      setOpen(false); reset();
      router.push(`/survey/${survey.id}`);
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        <Plus className="h-4 w-4" /> New survey
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4" onClick={() => !busy && setOpen(false)}>
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setOpen(false)} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600">
              <X className="h-5 w-5" />
            </button>
            <h2 className="mb-4 text-lg font-bold text-slate-900">New survey</h2>

            {err && <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{err}</p>}

            <div className="flex flex-col gap-3">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-500">Facility name</span>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Prestige Tech Park"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              </label>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-slate-500">Facility type</span>
                  <select value={facilityType} onChange={(e) => setFacilityType(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                    {FACILITY_TYPES.map((t) => <option key={t} value={t}>{FT_LABELS[t]}</option>)}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-slate-500">Assign surveyor (optional)</span>
                  <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                    <option value="">Unassigned</option>
                    {staff.map((st) => <option key={st.id} value={st.id}>{st.full_name || st.email}</option>)}
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-500">Address (optional)</span>
                <input value={address} onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-500">Buildings (comma-separated)</span>
                <input value={buildings} onChange={(e) => setBuildings(e.target.value)} placeholder="Tower A, Tower B"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                <span className="mt-1 block text-[11px] text-slate-400">Leave blank for a single default building. Areas can be added on-site.</span>
              </label>

              <div>
                <span className="mb-1 block text-xs font-semibold text-slate-500">Scope of survey</span>
                <div className="flex flex-wrap gap-1.5">
                  {scopeOptions.length === 0 && <span className="text-xs text-slate-400">Loading categories…</span>}
                  {scopeOptions.map((d) => {
                    const on = domains.has(d.slug);
                    return (
                      <button key={d.slug} type="button" onClick={() => toggleDomain(d.slug)}
                        className={`rounded-full border px-2.5 py-1 text-xs transition ${on ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 text-slate-600 hover:bg-slate-100"}`}>
                        {d.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setOpen(false)} disabled={busy}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                Cancel
              </button>
              <button type="button" onClick={submit} disabled={busy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Create &amp; open
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
