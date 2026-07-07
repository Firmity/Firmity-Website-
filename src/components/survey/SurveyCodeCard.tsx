"use client";
// Step 2 of the on-site flow: shown at the top of the Facility Details page after the
// surveyor has verified their location. The surveyor reads the client's contact details
// (below, on the same page), calls the client for the code, enters it here, and the rest
// of the survey unlocks on success.

import { useState } from "react";
import { AlertTriangle, KeyRound, Loader2, Phone } from "lucide-react";
import { verifyCode } from "@/src/lib/survey-api";

export default function SurveyCodeCard({
  surveyId,
  onVerified,
}: {
  surveyId: string;
  onVerified: () => void;
}) {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit() {
    setErr(null);
    const c = code.trim();
    if (!c) {
      setErr("Enter the code the client gave you.");
      return;
    }
    setBusy(true);
    try {
      const { ok } = await verifyCode(surveyId, c);
      if (ok) onVerified();
      else setErr("That code isn't correct — check with the client on-site.");
    } catch (e) {
      setErr("Verification failed: " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
          <KeyRound className="h-5 w-5 text-amber-600" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900">Enter the survey code to start</p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-600">
            <Phone className="h-3 w-3" /> Call the client using the contact details below to get the code.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="e.g. 7K2Q9X"
              maxLength={12}
              autoFocus
              className="w-40 rounded-lg border border-slate-300 px-3 py-2 text-center font-mono text-lg uppercase tracking-widest"
            />
            <button
              onClick={submit}
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
              Verify &amp; start survey
            </button>
          </div>
          {err && (
            <p className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
              <AlertTriangle className="h-4 w-4 shrink-0" /> {err}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
