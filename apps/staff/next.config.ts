import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_STAFFAPP_URL: process.env.NEXT_PUBLIC_STAFFAPP_URL,
  },
}

export default nextConfig
