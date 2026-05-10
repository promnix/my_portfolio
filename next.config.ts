import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "*.localhost",
    "*.local",
    "*.home.arpa",
    "192.168.*.*",
    "10.*.*.*",
    "172.*.*.*",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/2p3gvv56/production/**",
      },
    ],
  },
};

export default nextConfig;
