import type { Metadata } from "next";
import { Syne, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "./styles/animations.css";

// Neo-Brutalist Design Fonts
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "700", "800"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

// Keep Geist for body text compatibility
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Microfrontend Platform - Build Scalable Apps",
    template: "%s - Microfrontend Platform"
  },
  description: "Modern microfrontend platform built with Turborepo, Better-Auth authentication, and Next.js 16. Deploy independently, compose seamlessly.",
  keywords: ["microfrontends", "turborepo", "nextjs", "react", "monorepo", "better-auth", "authentication"],
  authors: [{ name: "Microfrontend Platform" }],
  creator: "Microfrontend Platform",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3024"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Microfrontend Platform - Build Scalable Apps",
    description: "Modern microfrontend platform built with Turborepo, Better-Auth, and Next.js 16",
    siteName: "Microfrontend Platform",
  },
  twitter: {
    card: "summary_large_image",
    title: "Microfrontend Platform - Build Scalable Apps",
    description: "Modern microfrontend platform built with Turborepo, Better-Auth, and Next.js 16",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${ibmPlexMono.variable} ${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
