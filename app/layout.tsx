import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  title: "Richard Pu - Portfolio",
  description: "Welcome to the digital portfolio of Richard Pu, a passionate computer engineer and creative technologist. Explore a curated collection of projects that showcase expertise in full-stack development, game design, and innovative hardware solutions. From dynamic web applications to interactive games, each project reflects a commitment to craftsmanship and a drive to push the boundaries of technology. Dive in to discover the journey, skills, and vision that define Richard's approach to building impactful digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
