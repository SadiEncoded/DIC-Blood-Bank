// ============================================
// 📁 app/layout.tsx
// ============================================

import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import React from "react";
import './globals.css';

import { anekBangla, hind } from "@/config";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300","400","500","600","700","800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400","500","600","700","800"],
});

export const metadata: Metadata = {
  title: {
    default: "DIC Blood Bank | রক্ত হোক সুরক্ষিত, নিরাপদ ও সহজলভ্য!",
    template: "%s | DIC Blood Bank",
  },
  description: "DIC Blood Bank—একটি শিক্ষার্থী-নেতৃত্বাধীন, মানবিক ও প্রযুক্তিনির্ভর সামাজিক উদ্যোগ, যার লক্ষ্য চাঁদপুর জেলার সকল নাগরিকদের জন্য একটি নির্ভরযোগ্য ও নিরাপদ দ্রুত রক্তদাতা নেটওয়ার্ক গড়ে তোলা।",
  keywords: ["DIC Blood Bank","Daffodil International College","Phoenix'24","Blood Donation Chandpur","Student Initiative","রক্তদান"],
  authors: [{ name: "Mahmudul Hasan Sadi", url: "https://github.com/SadiEncoded" }],
  creator: "Daffodil International College Blood Bank",
  publisher: "Daffodil International College",
  metadataBase: new URL("https://dic-blood-bank.vercel.app"),
  openGraph: {
    title: "DIC Blood Bank | রক্ত হোক সুরক্ষিত, নিরাপদ ও সহজলভ্য!",
    description: "মানবজীবনের সংকটময় মুহূর্তে রক্তের প্রাপ্যতা নিশ্চিত করতে একটি সংগঠিত প্লাটফর্ম।",
    url: "https://dic-blood-bank.vercel.app",
    siteName: "DIC Blood Bank",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "DIC Blood Bank" }],
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DIC Blood Bank | রক্ত হোক সুরক্ষিত, নিরাপদ ও সহজলভ্য!",
    description: "চাঁদপুর জেলার নির্ভরযোগ্য, নিরাপদ এবং দ্রুত রক্তদাতা নেটওয়ার্ক।",
    images: ["/og-image.png"],
    creator: "Mahmudul Hasan Sadi",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16" },
      { url: "/favicon/android-chrome-192x192.png", sizes: "192x192" },
      { url: "/favicon/android-chrome-512x512.png", sizes: "512x512" }
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
  applicationName: "DIC Blood Bank",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "DIC Blood Bank" },
  formatDetection: { telephone: true, email: true, address: true },
  category: "Healthcare",
  alternates: { canonical: "https://dic-blood-bank.vercel.app" },
  themeColor: "#e11d48",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth selection:bg-primary selection:text-primary-foreground">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Daffodil International College Blood Bank",
              url: "https://dic-blood-bank.vercel.app",
              logo: "https://dic-blood-bank.vercel.app/logo.png",
            }),
          }}
        />
      </head>

      <body 
        suppressHydrationWarning
        className={`${inter.variable} ${poppins.variable} ${hind.variable} ${anekBangla.variable} font-sans antialiased bg-background text-foreground transition-colors duration-300`}
      >
        <Providers>
          {/* Accessibility Skip Link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary/50"
          >
            Skip to main content
          </a>

          {children}
        </Providers>
      </body>
    </html>
  );
}
