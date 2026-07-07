"use client";
// Public shared-report page. Anyone with the link can download the report.

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Download, FileText } from "lucide-react";

interface Shared {
  facility_name: string | null;
  pdf_url: string | null;
  docx_url: string | null;
  generated_at: string;
}

export default function SharedReport() {
  const { token } = useParams() as { token: string };
  const [data, setData] = useState<Shared | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/r/${token}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setData)
      .catch(() => setErr("This report link is invalid or has expired."));
  }, [token]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900">
          <FileText className="h-7 w-7 text-white" />
        </div>
        {err ? (
          <p className="text-sm text-red-600">{err}</p>
        ) : !data ? (
          <p className="text-sm text-slate-500">Loading…</p>
        ) : (
          <>
            <h1 className="text-lg font-bold text-slate-900">Facility Health Report</h1>
            <p className="mb-4 text-sm text-slate-500">{data.facility_name || "Facility"}</p>
            <div className="flex flex-col gap-2">
              {data.pdf_url && (
                <a href={data.pdf_url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
                  <Download className="h-4 w-4" /> Download PDF
                </a>
              )}
              {data.docx_url && (
                <a href={data.docx_url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                  <Download className="h-4 w-4" /> Download Word
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
