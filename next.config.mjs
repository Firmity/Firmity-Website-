/** @type {import('next').NextConfig} */
const nextConfig = {
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

export default nextConfig
