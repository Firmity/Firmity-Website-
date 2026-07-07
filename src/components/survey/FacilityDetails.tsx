"use client";
// Facility Details page.
//   ADMIN (showMap=true): two-column — a sticky on-site MAP (surveyor's GPS check-in)
//     on the left, glass detail panels on the right.
//   SURVEYOR (showMap=false): NO map (it's an admin verification tool) — just the glass
//     detail panels, so they can read the client's contact and call for the survey code.

import { useEffect, useState } from "react";
import { Building2, Clock, ExternalLink, Mail, MapPin, Phone, User } from "lucide-react";
import type { Domain, Survey } from "@/src/lib/survey-api";
import { getSupabaseBrowser } from "@/src/lib/supabase-browser";

interface Props {
  survey: Survey;
  domainMeta: Record<string, Domain>;
  showMap?: boolean; // admins only — the map verifies where the surveyor checked in
}

interface Visit {
  surveyor_name: string | null;
  lat: number;
  lng: number;
  captured_at: string;
}

function initials(name?: string | null): string {
  if (!name) return "S";
  return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("") || "S";
}

function Field({ icon, label, value }: { icon?: React.ReactNode; label: string; value?: string | null }) {
  return (
    <div className="flex items-start justify-between gap-3 py-2">
      <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500">
        {icon} {label}
      </span>
      <span className="max-w-[62%] text-right text-sm font-medium text-slate-800">{value || "—"}</span>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/60 bg-white/55 p-4 shadow-md ring-1 ring-black/5 backdrop-blur-xl">
      <p className="mb-1 text-[13px] font-semibold text-slate-900">{title}</p>
      <div className="divide-y divide-slate-200/60">{children}</div>
    </div>
  );
}

export default function FacilityDetails({ survey, domainMeta, showMap = false }: Props) {
  const c = (survey.contact ?? {}) as Record<string, string>;
  const contactName = [c.first_name, c.last_name].filter(Boolean).join(" ");
  const area = survey.total_area != null ? `${survey.total_area} ${survey.area_unit ?? ""}`.trim() : "—";
  const buildings = (survey.blocks ?? []).map((b) => b.name).filter(Boolean).join(", ");
  const scopeList = (survey.domain_slugs ?? []).map((d) => domainMeta[d]?.name ?? d);

  // Latest on-site check-in — fetched for admins only (surveyors never see the map).
  const [visit, setVisit] = useState<Visit | null>(null);
  useEffect(() => {
    if (!showMap) return;
    (async () => {
      try {
        const sb = getSupabaseBrowser();
        const { data } = await sb
          .from("survey_visits")
          .select("surveyor_name,lat,lng,captured_at")
          .eq("survey_id", survey.id)
          .order("captured_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        if (data) setVisit(data as Visit);
      } catch { /* ignore */ }
    })();
  }, [survey.id, showMap]);

  const mapSrc = visit
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${visit.lng - 0.008}%2C${visit.lat - 0.006}%2C${visit.lng + 0.008}%2C${visit.lat + 0.006}&layer=mapnik&marker=${visit.lat}%2C${visit.lng}`
    : null;

  const facilityPanel = (
    <Panel title="Facility">
      <Field icon={<Building2 className="h-3 w-3" />} label="Name" value={survey.facility_name} />
      <Field label="Type" value={survey.facility_type} />
      <Field label="Total area" value={area} />
      <Field label="Buildings / blocks" value={buildings} />
      <Field icon={<MapPin className="h-3 w-3" />} label="Address" value={survey.facility_address} />
    </Panel>
  );
  const contactPanel = (
    <Panel title="Client contact">
      <Field icon={<User className="h-3 w-3" />} label="Person" value={contactName} />
      <Field label="Designation" value={c.designation} />
      <Field icon={<Phone className="h-3 w-3" />} label="Phone" value={c.phone} />
      <Field icon={<Mail className="h-3 w-3" />} label="Email" value={c.email} />
      <Field label="Alternate" value={c.alternate_phone} />
    </Panel>
  );
  const scopePanel = (
    <Panel title="Scope of survey">
      {scopeList.length ? (
        <div className="flex flex-wrap gap-1.5 pt-2">
          {scopeList.map((d) => (
            <span key={d} className="rounded-full border border-slate-200 bg-white/70 px-2.5 py-1 text-xs font-medium text-slate-700">
              {d}
            </span>
          ))}
        </div>
      ) : (
        <p className="py-2 text-sm text-slate-400">—</p>
      )}
    </Panel>
  );

  return (
    <section className="mb-8">
      <div className="rounded-3xl border border-white/50 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-4 sm:p-5">
        {showMap ? (
          // ---- ADMIN: sticky map + detail panels ----
          <div className="grid gap-5 lg:grid-cols-12">
            <div className="self-start lg:col-span-7 lg:sticky lg:top-4">
              <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/50 shadow-lg ring-1 ring-black/5 backdrop-blur-xl">
                <div className="flex items-center justify-between px-4 py-2.5">
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-800">
                    <MapPin className="h-4 w-4 text-green-600" /> On-site location
                  </span>
                  {visit && (
                    <a
                      href={`https://www.google.com/maps?q=${visit.lat},${visit.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-medium text-white hover:bg-slate-800"
                    >
                      Open in Maps <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
                {mapSrc ? (
                  <iframe title="On-site location" src={mapSrc} loading="lazy" className="h-[420px] w-full border-0" />
                ) : (
                  <div className="flex h-[420px] w-full flex-col items-center justify-center gap-2 bg-slate-100/70 text-slate-400">
                    <MapPin className="h-8 w-8" />
                    <p className="text-sm">No on-site check-in recorded yet</p>
                  </div>
                )}
                {visit && (
                  <div className="flex items-center gap-3 border-t border-white/60 bg-white/60 px-4 py-3 backdrop-blur-xl">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                      {initials(visit.surveyor_name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-800">{visit.surveyor_name || "Surveyor"}</p>
                      <p className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="h-3 w-3" /> Checked in {new Date(visit.captured_at).toLocaleString()}
                      </p>
                    </div>
                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">Verified on-site</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-5">
              {facilityPanel}
              {contactPanel}
              {scopePanel}
            </div>
          </div>
        ) : (
          // ---- SURVEYOR: details only (no map) ----
          <div className="grid gap-4 sm:grid-cols-2">
            {facilityPanel}
            {contactPanel}
            <div className="sm:col-span-2">{scopePanel}</div>
          </div>
        )}
      </div>
    </section>
  );
}
