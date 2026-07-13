// Default social share image (1200x630), generated at build/runtime by next/og.
// No binary asset to maintain — edit the JSX below to restyle. Applies site-wide
// unless a route provides its own opengraph-image.
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Firmity — Facility Management & CMMS Software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0d2d5e 0%, #2b6cb0 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 6, opacity: 0.85, textTransform: "uppercase" }}>
          Firmity · AI Facility Intelligence
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1, marginTop: 24, maxWidth: 900 }}>
          Facility Management &amp; CMMS Software
        </div>
        <div style={{ fontSize: 34, marginTop: 28, opacity: 0.9, maxWidth: 900 }}>
          Maintenance · Assets · Workforce · Compliance — one platform for India.
        </div>
        <div style={{ fontSize: 26, marginTop: 40, opacity: 0.75 }}>www.firmity.in</div>
      </div>
    ),
    { ...size },
  );
}
