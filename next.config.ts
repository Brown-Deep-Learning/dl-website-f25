// next.config.ts

const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: isProd ? "/dl-website-f25" : "",
  basePath: isProd ? "/dl-website-f25" : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,

  output: "export",
};

export default nextConfig;
