import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/an-app-for-that",
  assetPrefix: "/an-app-for-that",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
