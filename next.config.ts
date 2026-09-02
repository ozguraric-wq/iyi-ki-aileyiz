import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  env: { NEXT_PUBLIC_BASE_PATH: process.env.GITHUB_ACTIONS ? "/iyi-ki-aileyiz" : "" },
  images: { unoptimized: true },
};

export default nextConfig;
