// Thin status strip shown while offline or while edits are still syncing.
// Green/quiet when everything is delivered; amber when offline; blue when
// online with a backlog draining.

import { CloudOff, RefreshCw } from "lucide-react";

export default function OfflineBanner({
  online,
  pending,
  fromCache,
}: {
  online: boolean;
  pending: number;
  fromCache: boolean;
}) {
  if (online && pending === 0 && !fromCache) return null;

  const offline = !online;
  const tone = offline
    ? "bg-amber-50 text-amber-800 border-amber-200"
    : "bg-blue-50 text-blue-800 border-blue-200";

  return (
    <div className={`mb-4 flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${tone}`}>
      {offline ? <CloudOff className="h-4 w-4" /> : <RefreshCw className="h-4 w-4 animate-spin" />}
      {offline ? (
        <span>
          You&apos;re offline. Edits are saved on this device
          {pending > 0 ? ` (${pending} waiting to sync)` : ""} and will upload when you reconnect.
        </span>
      ) : (
        <span>Syncing {pending} change{pending === 1 ? "" : "s"}…</span>
      )}
    </div>
  );
}
