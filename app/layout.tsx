import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
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
  title: "ScoreUp — Live Football Scores & Sports News",
  description:
    "Track live football scores, follow today's top fixtures, and stay updated with the latest sports news. Real-time updates every 30 seconds.",
  icons: {
    icon: [
      { url: '/icon.png?v=2', type: 'image/png' },
    ],
  },
  keywords: [
    "live football scores",
    "sports news",
    "football fixtures",
    "match results",
    "Premier League",
    "Champions League",
    "La Liga",
    "Serie A",
  ],
  openGraph: {
    title: "ScoreUp — Live Football Scores & Sports News",
    description:
      "Your ultimate sports companion. Real-time scores, fixtures, and news.",
    type: "website",
    siteName: "ScoreUp",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScoreUp — Live Football Scores",
    description: "Real-time football scores and sports news.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
