import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.flyonui.com",
        pathname: "/fy-assets/**",
      },
      {
        protocol: "https",
        hostname: "framerusercontent.com",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/cosmos/chain-registry/**",
      },
      {
        protocol: "https",
        hostname: "paxinet.io",
        pathname: "/resources/img/**",
      },
    ],
  },
};

export default nextConfig;
