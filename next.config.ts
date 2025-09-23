import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true, // This enables CSS inlining via Critters during build
  },
  // You can keep other config options here
};

export default nextConfig;
