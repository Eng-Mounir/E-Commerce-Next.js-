import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/categories",
        destination: "/categories/men",
        permanent: true,
      },
    ];
  },
  reactCompiler: true,
};

export default nextConfig;
