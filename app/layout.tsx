import type { Metadata } from "next";
import { IBM_Plex_Sans, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://localhost:3000";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Richard Pu",
  description:
    "Richard Pu is a Computer Engineering student at the University of Waterloo, working across embedded hardware, low-level software, and full-stack interactive design. Selected projects, background, and contact.",
  icons: {
    icon: "/icon",
  },
  openGraph: {
    title: "Richard Pu",
    description:
      "Computer Engineering student at the University of Waterloo building embedded systems, software, and interactive design projects.",
    url: "/",
    siteName: "Richard Pu",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Richard Pu portfolio preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Richard Pu",
    description:
      "Computer Engineering student at the University of Waterloo building embedded systems, software, and interactive design projects.",
    images: ["/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSans.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}