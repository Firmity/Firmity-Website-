// Survey status chip. In-progress / Report-pending get animated dots.

const MAP: Record<string, { label: string; cls: string; anim: boolean }> = {
  submitted: { label: "Survey pending", cls: "bg-slate-100 text-slate-600", anim: false },
  in_progress: { label: "In progress", cls: "bg-amber-100 text-amber-700", anim: true },
  ready: { label: "Report pending", cls: "bg-blue-100 text-blue-700", anim: true },
  reported: { label: "Completed", cls: "bg-green-100 text-green-700", anim: false },
  completed: { label: "Completed", cls: "bg-green-100 text-green-700", anim: false },
};

export default function StatusBadge({ status }: { status: string }) {
  const s = MAP[status] ?? MAP.submitted;
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${s.cls}`}>
      {s.label}
      {s.anim && (
        <span className="ml-0.5 inline-flex">
          <span className="animate-bounce [animation-delay:0ms]">.</span>
          <span className="animate-bounce [animation-delay:150ms]">.</span>
          <span className="animate-bounce [animation-delay:300ms]">.</span>
        </span>
      )}
    </span>
  );
}
