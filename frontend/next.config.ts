import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s2.coinmarketcap.com",
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
