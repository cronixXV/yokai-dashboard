import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const interSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yokai Monitoring Dashboard",
  description: "Real-time ghost anomaly tracking in Tokyo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={interSans.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
