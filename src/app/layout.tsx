import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgriPulse AI — Where Intelligence Meets Sustainable Agriculture",
  description:
    "AI-driven sustainable farm-to-market optimization. Empowering farmers with precision crop intelligence, dynamic price forecasting, smart buyer matching, and food-loss reduction.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="min-h-screen bg-[#030c0a] text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
