"use client";
// Report flow modal: a lively "generating" animation, then a result card with
// PDF / Word / Both downloads and a shareable link.

import { useState } from "react";
import { AlertTriangle, Check, Download, FileText, Loader2, RefreshCw, Share2, Sparkles, X } from "lucide-react";
import type { ReportResult } from "@/src/lib/survey-api";

const DOTS = Array.from({ length: 8 });

export default function ReportModal({
  generating,
  report,
  error,
  onClose,
  onRegenerate,
}: {
  generating: boolean;
  report: ReportResult | null;
  error: string | null;
  onClose: () => void;
  onRegenerate?: () => void;
}) {
  const [copied, setCopied] = useState(false);
  if (!generating && !report && !error) return null;

  function share() {
    if (!report?.share_token) return;
    const url = `${window.location.origin}/r/${report.share_token}`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <style>{`@keyframes orbitPulse{0%{transform:translate(0,0) scale(.4);opacity:1}100%{transform:translate(var(--tx),var(--ty)) scale(1);opacity:0}}`}</style>
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        {!generating && (
          <button type="button" onClick={onClose} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        )}

        {generating ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="relative">
              {DOTS.map((_, i) => {
                const a = (i / DOTS.length) * Math.PI * 2;
                const style = {
                  "--tx": `${Math.cos(a) * 70}px`,
                  "--ty": `${Math.sin(a) * 70}px`,
                  animation: "orbitPulse 1100ms ease-out infinite",
                  animationDelay: `${(i % 4) * 90}ms`,
                } as React.CSSProperties;
                return (
                  <Sparkles key={i} style={style} className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-amber-400" />
                );
              })}
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-900">
                <FileText className="h-8 w-8 animate-pulse text-white" />
              </div>
            </div>
            <p className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <Loader2 className="h-4 w-4 animate-spin" /> Assembling your report…
            </p>
            <p className="text-xs text-slate-500">Reading answers · summarising with AI · rendering</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-2 py-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <p className="font-semibold text-slate-900">Report failed</p>
            <p className="text-sm text-slate-600">{error}</p>
          </div>
        ) : report ? (
          <div className="flex flex-col items-center gap-3 py-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <FileText className="h-7 w-7 text-green-600" />
            </div>
            <p className="text-lg font-bold text-slate-900">Report ready</p>
            {report.ai_generated === false && (
              <div className="w-full rounded-lg border border-amber-200 bg-amber-50 p-3 text-left">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-amber-800">
                  <AlertTriangle className="h-4 w-4" /> AI summary was unavailable
                </p>
                <p className="mt-1 text-xs text-amber-700">
                  This report was built from the survey data (scores, findings, photos) without the AI narrative.
                  You can regenerate it once AI access is restored.
                </p>
                {onRegenerate && (
                  <button
                    type="button"
                    onClick={onRegenerate}
                    className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-700"
                  >
                    <RefreshCw className="h-3.5 w-3.5" /> Regenerate with AI
                  </button>
                )}
              </div>
            )}
            <div className="mt-1 grid w-full grid-cols-2 gap-2">
              {report.pdf_url && (
                <a href={report.pdf_url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800">
                  <Download className="h-4 w-4" /> PDF
                </a>
              )}
              {report.docx_url && (
                <a href={report.docx_url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800">
                  <Download className="h-4 w-4" /> Word
                </a>
              )}
              {report.pdf_url && report.docx_url && (
                <a
                  href={report.pdf_url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => report.docx_url && window.open(report.docx_url, "_blank")}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  <Download className="h-4 w-4" /> Both
                </a>
              )}
              <button
                type="button"
                onClick={share}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Share2 className="h-4 w-4" />}
                {copied ? "Copied" : "Share"}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
