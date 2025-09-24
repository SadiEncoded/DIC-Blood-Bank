import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DIC Blood Bank",
  description: "A community-driven blood bank management system for DIC",
  keywords: [
    "DIC",
    "Blood Bank",
    "Donors",
    "Blood Donation",
    "Chandpur",
    "Daffodil",
    "Daffodil Family",
    "DIU",
    "Mahmudul Hasan Sadi"
  ],
  authors: [{ name: "Mahmudul Hasan Sadi" }],
  themeColor: "#00234B",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable} antialiased
          bg-gray-50 text-gray-800 selection:bg-red-600 selection:text-white
        `}
      >
        {/* Global Toaster */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 5000,
            style: {
              background: "#1E293B",
              color: "#F1F5F9",
              borderRadius: "0.5rem",
              padding: "1rem 1.25rem",
              fontWeight: 500,
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            },
            success: {
              duration: 3000,
              iconTheme: { primary: "#22C55E", secondary: "#fff" },
            },
            error: {
              duration: 4000,
              iconTheme: { primary: "#EF4444", secondary: "#fff" },
            },
          }}
        />

        <main className="min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
