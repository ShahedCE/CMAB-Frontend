import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // 🔥 MUST for server deploy

  images: {
    unoptimized: true, // ok
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.cmabdhaka.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;