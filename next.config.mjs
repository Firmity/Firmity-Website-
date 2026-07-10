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
    ];
  },
  // Allow loading the dev server from other devices on your LAN (e.g. testing on a
  // phone). Add each device's IP here. Dev-only; ignored in production.
  allowedDevOrigins: ["192.168.29.252"],
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
