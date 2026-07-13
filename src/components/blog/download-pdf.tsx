"use client";
import { Download } from "lucide-react";

export function DownloadPdf() {
  return (
    <button
      onClick={() => window.print()}
      className="no-print mb-8 inline-flex items-center gap-2 rounded-lg border border-[#dbe5f0] px-4 py-2 text-[13px] font-medium text-[#4a5568] transition-colors hover:bg-[#f8fafc]"
    >
      <Download size={15} /> Download as PDF
    </button>
  );
}
