import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //! authentica fotos de terceros como google
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
