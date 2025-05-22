import { GoogleAnalytics } from '@next/third-parties/google';
import { getGAID } from "@/util/dev";
import "@/styles/index.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className= "bg-dark">
        {children}</body>
      <GoogleAnalytics gaId={getGAID()} />
    </html>
  );
}
