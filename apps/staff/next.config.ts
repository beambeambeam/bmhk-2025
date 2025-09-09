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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, nosnippet, noarchive, notranslate, noimageindex",
          },
        ],
      },
    ]
  },
}

export default nextConfig
