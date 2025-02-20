import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com", // Avatar API
      },
      {
        protocol: "https",
        hostname: "flagcdn.com", // Flag images
      },
      {
        protocol: "https",
        hostname: "countryflagsapi.com", // Another flag API
      },
      {
        protocol: "https",
        hostname: "restcountries.com", // Rest Countries API
      }
    ]
  }
};

export default nextConfig;
