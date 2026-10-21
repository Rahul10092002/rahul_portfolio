import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Rahul Patidar — Full Stack & AI Engineer",
  description:
    "Full Stack & AI Engineer building RAG applications, AI agents, SaaS platforms, and business automations — from architecture to deployment.",
  metadataBase: new URL("https://rahul-portfolio-five-omega.vercel.app"),
  alternates: {
    canonical: "https://rahul-portfolio-five-omega.vercel.app",
  },
  openGraph: {
    title: "Rahul Patidar — Full Stack & AI Engineer",
    description:
      "Building RAG applications, AI agents, SaaS platforms, and business automations — from architecture to deployment.",
    url: "https://rahul-portfolio-five-omega.vercel.app",
    siteName: "Rahul Patidar Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Patidar — Full Stack & AI Engineer",
    description:
      "Building RAG applications, AI agents, SaaS platforms, and business automations.",
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "theme-color": "#0D0D0D",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
