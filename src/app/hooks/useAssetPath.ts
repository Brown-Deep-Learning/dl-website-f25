"use client";

export function useAssetPath() {
  const isProd = process.env.NODE_ENV === "production";
  const basePath = isProd ? "/dl-website-f25" : "";
  
  return (path: string) => `${basePath}${path}`;
}