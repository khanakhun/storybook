import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
const shantellSans = localFont({
  src: [
    { path: "./fonts/ShantellSans-Regular.ttf", weight: "400" },
    { path: "./fonts/ShantellSans-Bold.ttf", weight: "700" },
    { path: "./fonts/ShantellSans-Italic.ttf", weight: "400", style: "italic" },
    { path: "./fonts/ShantellSans-BoldItalic.ttf", weight: "700", style: "italic" },
    { path: "./fonts/ShantellSans-Light.ttf", weight: "300" },
    { path: "./fonts/ShantellSans-SemiBold.ttf", weight: "600" },
    { path: "./fonts/ShantellSans-Medium.ttf", weight: "500" },
    { path: "./fonts/ShantellSans-ExtraBold.ttf", weight: "800" },
  ],
  variable: "--font-shantell-sans",
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
      <body suppressHydrationWarning className={`${shantellSans.variable}  antialiased`}>
        {children}
      </body>
    </html>
  );
}
