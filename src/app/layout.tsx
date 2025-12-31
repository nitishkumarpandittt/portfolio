import type { Metadata } from "next";
import "./globals.css";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/components/google-analytics";

import { Readex_Pro } from "next/font/google";
import { StructuredData } from "@/components/structured-data";

const readexPro = Readex_Pro({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nitishh.in'),
  title: {
    template: "%s | Nitish - Software Engineer",
    default: "Nitish - Software Engineer",
  },
  description: "Full-stack developer specializing in React, Next.js, Node.js, TypeScript, and modern web technologies. Creating scalable, accessible digital experiences. Based in Panchkula, Haryana.",
  keywords: [
    "Nitish Software Engineer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer",
    "Software Engineer",
    "Nitish Kumar Pandit",
    "Portfolio",
    "Panchkula Developer",
    "Haryana Developer",
    "India Developer",
    "MERN Stack",
    "TailwindCSS",
    "MongoDB",
    "Express.js",
    "AWS",
    "Docker",
  ],
  authors: [{ name: "Nitish Kumar Pandit", url: "https://nitishh.in" }],
  creator: "Nitish Kumar Pandit",
  publisher: "Nitish Kumar Pandit",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nitishh.in",
    siteName: "Nitish Kumar Pandit - Portfolio",
    title: "Nitish - Software Engineer",
    description: "Full-stack developer specializing in React, Next.js, Node.js, and modern web technologies. View my projects and get in touch.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nitish Kumar Pandit - Full Stack Developer",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification=c_vZEVyOl-hKwcrhZQ1EG8g3XVkPs7ZjcG6LPE3_RYM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={`${readexPro.className} antialiased`}>
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_ID!} />
        <NuqsAdapter>
          <ThemeProvider attribute="class">
            <Toaster />
            {children}
          </ThemeProvider>
        </NuqsAdapter>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}