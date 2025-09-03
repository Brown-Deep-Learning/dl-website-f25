// src/app/layout.tsx
import { Roboto_Mono, Bebas_Neue, Rajdhani } from "next/font/google";
import type { Viewport } from "next";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-bebas-neue",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-rajdhani",
});

import "../styles/globals.css";

// Export viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata = {
  title: "Deep Learning Course",
  description: "Welcome to the Deep Learning Course website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${robotoMono.className} ${bebasNeue.variable} ${rajdhani.variable}`}
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
