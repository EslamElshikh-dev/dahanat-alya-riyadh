import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  serverExternalPackages: ["onnxruntime-node"],
  outputFileTracingIncludes: {
    "/api/admin/upload": ["./vendor/background-removal/u2netp.onnx", "./node_modules/onnxruntime-node/bin/napi-v6/linux/x64/*"],
  },
  outputFileTracingExcludes: {
    "/*": ["**/onnxruntime-node/bin/napi-v6/win32/**", "**/onnxruntime-node/bin/napi-v6/darwin/**", "**/onnxruntime-node/bin/napi-v6/linux/arm64/**"],
  },
  images: {
    remotePatterns: [{ protocol:"https", hostname:process.env.ALYA_MEDIA_HOST || "*.public.blob.vercel-storage.com", pathname:"/alya-products/**" }],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

