"use client";
// Step 1 of the on-site flow: the surveyor shares their GPS location. Once recorded,
// onLocated() fires and the Facility Details page becomes visible. The SURVEY CODE is
// entered separately, on the Facility Details page (see SurveyCodeCard), so the surveyor
// can read the client's contact info and call them for the code before starting.

import { useState } from "react";
import { AlertTriangle, Loader2, MapPin, ShieldCheck } from "lucide-react";
import { recordVisit } from "@/src/lib/survey-api";

export default function SurveyGate({
  surveyId,
  facilityName,
  onLocated,
}: {
  surveyId: string;
  facilityName?: string | null;
  onLocated: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function shareLocation() {
    setErr(null);
    if (!("geolocation" in navigator)) {
      setErr("This device does not support location.");
      return;
    }
    setBusy(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          await recordVisit(surveyId, {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          });
          onLocated();
        } catch (e) {
          setErr("Could not save your location: " + (e as Error).message);
        } finally {
          setBusy(false);
        }
      },
      (geoErr) => {
        setBusy(false);
        setErr(
          geoErr.code === geoErr.PERMISSION_DENIED
            ? "Location permission denied — please allow location to continue."
            : "Could not get your location. Move to an open area and try again.",
        );
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-slate-700" />
          <h2 className="text-lg font-bold text-slate-900">
            Confirm you're on-site{facilityName ? ` · ${facilityName}` : ""}
          </h2>
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
            <MapPin className="h-7 w-7 text-blue-600" />
          </div>
          <p className="text-sm text-slate-600">
            Share your current location to open this survey. It's stored for verification only and
            never appears in the report. You'll enter the survey code on the next screen.
          </p>
          <button
            onClick={shareLocation}
            disabled={busy}
            className="mt-1 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
            Share my location
          </button>
        </div>

        {err && (
          <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-sm text-red-600">
            <AlertTriangle className="h-4 w-4 shrink-0" /> {err}
          </p>
        )}
      </div>
    </div>
  );
}
