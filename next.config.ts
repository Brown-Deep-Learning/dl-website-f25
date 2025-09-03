// next.config.ts

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  output: "export",
  optimizeFonts: false, // Disable font optimization to prevent size differences
};

export default nextConfig;
