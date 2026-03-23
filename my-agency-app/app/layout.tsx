import type { Metadata } from "next";
import { Outfit, Geist } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "WebMind — AI Automation Agency",
  description: "WebMind builds AI-powered automation systems that capture leads, qualify them in seconds, and keep your team closing — not chasing.",
};

import { Navbar } from "@/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} ${geist.variable} font-sans antialiased overflow-x-hidden`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
