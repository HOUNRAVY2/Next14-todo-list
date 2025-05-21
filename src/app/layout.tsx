import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import { getGAID } from "@/util/dev";
import { Inter } from "next/font/google";
import Popup from "@/components/popup";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
export const revalidate = 3600

export const metadata: Metadata = {
  title: "To do list",
  description: "各种有趣、刺激、身体发热的小说",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className= "bg-dark">
        <Popup/>
        {children}</body>
      <GoogleAnalytics gaId={getGAID()} />
    </html>
  );
}
