import type { Metadata } from "next";
import localFont from "next/font/local";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./global-components/navbar";

// Local Fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Google Font
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Story Book",
  description: "Story book generates stories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
