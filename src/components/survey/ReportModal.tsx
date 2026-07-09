"use client";
// Report flow modal: a lively "generating" animation (not closable), then a result
// card that AUTO-DOWNLOADS the PDF + Word, offers manual re-download, and a native
// "Share" that sends the actual PDF file to the phone's share sheet (WhatsApp, email…).

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Check, Download, FileText, Loader2, Mail, RefreshCw, Share2, Sparkles, X } from "lucide-react";
import type { ReportResult } from "@/src/lib/survey-api";

const DOTS = Array.from({ length: 8 });

/** Force a download of a (possibly cross-origin) URL by fetching it to a blob first. */
async function downloadUrl(url: string, filename: string): Promise<void> {
  const res = await fetch(url);
  const blob = await res.blob();
  const obj = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = obj;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(obj), 4000);
}

export default function ReportModal({
  generating,
  report,
  error,
  onClose,
  onRegenerate,
  recipientEmail,
  facilityName,
}: {
  generating: boolean;
  report: ReportResult | null;
  error: string | null;
  onClose: () => void;
  onRegenerate?: () => void;
  recipientEmail?: string; // prefill for the "email report" field (client contact)
  facilityName?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [shareErr, setShareErr] = useState<string | null>(null);
  const [emailTo, setEmailTo] = useState(recipientEmail ?? "");
  const [emailState, setEmailState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const autoDoneRef = useRef<string | null>(null);

  // Prefill the recipient once the survey's contact loads.
  useEffect(() => {
    if (recipientEmail) setEmailTo((cur) => cur || recipientEmail);
  }, [recipientEmail]);

  async function emailReport() {
    const to = emailTo.trim();
    if (!to) {
      setEmailState("error");
      return;
    }
    setEmailState("sending");
    try {
      const shareUrl = report?.share_token ? `${window.location.origin}/r/${report.share_token}` : undefined;
      const res = await fetch("/api/report-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, facilityName, shareUrl, pdfUrl: report?.pdf_url, docxUrl: report?.docx_url }),
      });
      setEmailState(res.ok ? "sent" : "error");
    } catch {
      setEmailState("error");
    }
  }

  // Auto-download PDF + Word once, as soon as the report is ready.
  useEffect(() => {
    if (!report) return;
    const key = report.pdf_url || report.docx_url || null;
    if (!key || autoDoneRef.current === key) return;
    autoDoneRef.current = key;
    (async () => {
      try {
        if (report.pdf_url) await downloadUrl(report.pdf_url, "Facility-Health-Report.pdf");
        // brief gap so the browser doesn't block the second download
        if (report.docx_url) {
          await new Promise((r) => setTimeout(r, 600));
          await downloadUrl(report.docx_url, "Facility-Health-Report.docx");
        }
      } catch {
        /* manual buttons remain as fallback */
      }
    })();
  }, [report]);

  if (!generating && !report && !error) return null;

  async function share() {
    setShareErr(null);
    const pdf = report?.pdf_url;
    // Preferred: share the actual PDF file via the OS share sheet (mobile).
    if (pdf) {
      try {
        const res = await fetch(pdf);
        const blob = await res.blob();
        const file = new File([blob], "Facility-Health-Report.pdf", { type: "application/pdf" });
        const nav = navigator as Navigator & {
          canShare?: (d: { files: File[] }) => boolean;
          share?: (d: { files?: File[]; title?: string; text?: string; url?: string }) => Promise<void>;
        };
        if (nav.canShare?.({ files: [file] }) && nav.share) {
          await nav.share({ files: [file], title: "Facility Health Report", text: "Facility Health Report" });
          return;
        }
      } catch (e) {
        if ((e as Error)?.name === "AbortError") return; // user dismissed the sheet
        /* fall through to link copy */
      }
    }
    // Fallback: copy the shareable link.
    if (report?.share_token) {
      const url = `${window.location.origin}/r/${report.share_token}`;
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {
        setShareErr("Couldn't share on this device.");
      }
    } else {
      setShareErr("Sharing isn't available on this device.");
    }
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
            <p className="text-[11px] font-medium text-amber-600">Please keep this screen open until it&apos;s done.</p>
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
            <p className="text-xs text-slate-500">Your PDF &amp; Word files are downloading automatically.</p>
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
                <button
                  type="button"
                  onClick={() => downloadUrl(report.pdf_url!, "Facility-Health-Report.pdf")}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
                >
                  <Download className="h-4 w-4" /> PDF
                </button>
              )}
              {report.docx_url && (
                <button
                  type="button"
                  onClick={() => downloadUrl(report.docx_url!, "Facility-Health-Report.docx")}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
                >
                  <Download className="h-4 w-4" /> Word
                </button>
              )}
              <button
                type="button"
                onClick={share}
                className="col-span-2 inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Share2 className="h-4 w-4" />}
                {copied ? "Link copied" : "Share PDF"}
              </button>
            </div>
            {shareErr && <p className="text-xs text-red-600">{shareErr}</p>}

            {/* Email the report link to the client */}
            <div className="mt-1 w-full rounded-lg border border-slate-200 p-2.5">
              <p className="mb-1.5 text-xs font-medium text-slate-500">Email the report</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={emailTo}
                  onChange={(e) => {
                    setEmailTo(e.target.value);
                    setEmailState("idle");
                  }}
                  placeholder="client@email.com"
                  className="min-w-0 flex-1 rounded-lg border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
                <button
                  type="button"
                  onClick={emailReport}
                  disabled={emailState === "sending"}
                  className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
                >
                  {emailState === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                  Send
                </button>
              </div>
              {emailState === "sent" && <p className="mt-1 text-xs text-green-600">Report emailed ✓</p>}
              {emailState === "error" && <p className="mt-1 text-xs text-red-600">Couldn&apos;t send — check the address.</p>}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
