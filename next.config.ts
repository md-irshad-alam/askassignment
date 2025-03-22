import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Disables TypeScript errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignores ESLint errors during build
  },
};

export default nextConfig;
