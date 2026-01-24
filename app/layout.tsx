import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ngoInfo } from "@/lib/data";
import { Analytics } from "@vercel/analytics/next";

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
        </ThemeProvider>
      </body>
    </html>
  );
}

