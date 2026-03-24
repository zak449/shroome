import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "drinkshroome.com" }],
        destination: "https://www.drinkshroome.com/:path*",
        permanent: true,
      },
      {
        source: "/matcha",
        destination: "/",
        permanent: true,
      },
      {
        source: "/vanilla",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
