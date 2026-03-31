import type { Metadata } from "next";
import "./globals.css";
import { SiteLayout } from "@/components/layout/site-layout";

export const metadata: Metadata = {
  title: "CMAB",
  description: "Christian Medical Association Bangladesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}