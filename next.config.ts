// next.config.ts

const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: isProd ? "/" : "",
  basePath: "", // Update if your repository name is different
  // basePath: "/dl-website-s25", // Update if your repository name is different
  images: {
    unoptimized: true,
  },
  trailingSlash: true,

  output: "export",
};

export default nextConfig;
