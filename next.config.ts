import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "commons.wikimedia.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.visaplace.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "universitysettlement.ca",
        port: "",
        pathname: "/**",
      },

    ],
  },
};

export default nextConfig;
