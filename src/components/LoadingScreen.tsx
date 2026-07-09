"use client";
// LoadingScreen — a friendly loading state for the survey app.
//
// A CSS "fluid orb" sits behind a dotLottie player. The player is loaded with
// next/dynamic (ssr:false) so it only runs in the browser and its named export
// is resolved correctly by the bundler. It plays your asset from `src`
// (default /animations/loading.lottie); if the file is missing the orb shows
// through. Requires `@lottiefiles/dotlottie-react` (already in package.json —
// run `npm install` once).

import dynamic from "next/dynamic";

// ssr:false -> never rendered on the server; loading:()=>null -> orb shows meanwhile.
const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact),
  { ssr: false, loading: () => null }
);

export type LoadingScreenProps = {
  label?: string;
  /** Path to a .lottie or .json under /public. Defaults to /animations/loading.lottie */
  src?: string;
  /** Fullscreen overlay (default) vs. inline block that fills its parent. */
  fullscreen?: boolean;
};

export default function LoadingScreen({
  label = "Loading…",
  src = "/animations/loading.lottie",
  fullscreen = true,
}: LoadingScreenProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={
        fullscreen
          ? "fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-white via-emerald-50/40 to-sky-50/40 backdrop-blur-sm"
          : "flex min-h-[40vh] w-full items-center justify-center"
      }
    >
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        <div className="loading-fade-in relative h-40 w-40">
          {/* CSS fluid orb — fallback behind the Lottie */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="orb-wrap">
              <span className="orb-ring" />
              <span className="orb-ring delay" />
              <span className="orb-core" />
            </div>
          </div>
          {/* Lottie on top */}
          <div className="absolute inset-0">
            <DotLottieReact src={src} autoplay loop style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
        <p className="text-sm font-medium text-slate-600">{label}</p>
      </div>
    </div>
  );
}
