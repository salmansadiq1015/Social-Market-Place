"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/authContext";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { Tooltip } from "react-tooltip";
import { metadata } from "./metadata";
import { useEffect } from "react";
import { ThemeProvider } from "./utils/ThemeProvides";

const inter = Inter({ subsets: ["latin"] });

export function ClientViewport() {
  useEffect(() => {
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0"
      );
    }
  }, []);
  return null;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="author" content={metadata.author} />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="robots" content={metadata.robots} />
        <link rel="canonical" href={metadata.canonical} />

        {/* Open Graph Metadata */}
        <meta property="og:type" content={metadata.og.type} />
        <meta property="og:title" content={metadata.og.title} />
        <meta property="og:description" content={metadata.og.description} />
        <meta property="og:url" content={metadata.og.url} />
        <meta property="og:image" content={metadata.og.image} />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:site" content={metadata.twitter.site} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta
          name="twitter:description"
          content={metadata.twitter.description}
        />
        <meta name="twitter:image" content={metadata.twitter.image} />

        {/* Favicon */}
        <link rel="icon" href="/rb_616.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/rb_616.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <title>{metadata.title}</title>
      </head>
      <body className={`${inter.className}`}>
        <AuthProvider>
          <SessionProvider>
            <ThemeProvider>
              <main className="dark:bg-gray-950 bg-white w-full min-h-screen overflow-x-hidden  dark:text-white text-black">
                {children}
              </main>
              <Toaster />
              {/* <SocketHandler /> */}
              <Tooltip
                id="my-tooltip"
                place="bottom"
                effect="solid"
                className="!bg-gradient-to-r !from-red-500 !via-red-500 !to-yellow-500 !text-white z-[9999] !text-[11px] !py-1 !px-2"
              />
            </ThemeProvider>
          </SessionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
