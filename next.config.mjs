// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//   },
//   // Friendly redirect for the common typo: /survey (singular) -> the real dashboard.
//   // Runs before middleware, so login lands on /surveys correctly.
//   async redirects() {
//     return [
//       { source: "/survey", destination: "/surveys", permanent: false },
//     ];
//   },
//   // Allow loading the dev server from other devices on your LAN (e.g. testing on a
//   // phone). Add each device's IP here. Dev-only; ignored in production.
//   allowedDevOrigins: ["192.168.29.252"],
// }

// export default nextConfig













import createMDX from "@next/mdx"

/** @type {import('next').NextConfig} */
const nextConfig = {
  // .mdx files are now valid page/layout files (needed for app/blog/*/page.mdx)
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Friendly redirect for the common typo: /survey (singular) -> the real dashboard.
  // Runs before middleware, so login lands on /surveys correctly.
  async redirects() {
    return [
      { source: "/survey", destination: "/surveys", permanent: false },
      // /preventive-maintenance renamed to /facility-task-automation
      // (2026-09-12) — permanent 301 so bookmarks/inbound links/search
      // rankings carry over to the new URL. A redirect() safety net also
      // lives at src/app/preventive-maintenance/page.tsx.
      { source: "/preventive-maintenance", destination: "/facility-task-automation", permanent: true },
    ];
  },
  // Allow loading the dev server from other devices on your LAN (e.g. testing on a
  // phone). Use the HOST only (no protocol/port). Dev-only; ignored in production.
  allowedDevOrigins: ["192.168.1.62"],
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
