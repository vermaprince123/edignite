import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ngoInfo } from "@/lib/data";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${ngoInfo.name} - Educational and Charitable Trust | Surat, Gujarat`,
  description: `${ngoInfo.name} - Igniting Lives through Education. Achieving Dr. Kalam's Mission 'Educated India'. Providing free education to underprivileged children in Surat, Gujarat.`,
  keywords: [
    "Edignite NGO",
    "Education NGO Surat",
    "Children Education",
    "Free Education",
    "Underprivileged Children",
    "Dr. Kalam Mission",
    "Educated India",
    "NGO Surat Gujarat",
    "Charitable Trust",
    "Non-profit Organization",
  ],
  authors: [{ name: ngoInfo.name }],
  openGraph: {
    title: `${ngoInfo.name} - ${ngoInfo.tagline}`,
    description: ngoInfo.mission,
    type: "website",
    url: ngoInfo.website,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
  themeColor: "#3b82f6",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: ngoInfo.name,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  other: {
    "google-adsense-account": "ca-pub-6239232728067791",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ScrollToTop />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6239232728067791"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

