"use client";

import { usePathname } from "next/navigation";

export function useAssetPath() {
  const pathname = usePathname();
  
  // Extract base path from the current pathname
  const basePath = pathname.startsWith("/dl-website-f25") ? "/dl-website-f25" : "";
  
  return (path: string) => `${basePath}${path}`;
}