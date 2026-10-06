import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    remotePatterns: [{ protocol:"https", hostname:process.env.ALYA_MEDIA_HOST || "*.public.blob.vercel-storage.com", pathname:"/alya-products/**" }],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

