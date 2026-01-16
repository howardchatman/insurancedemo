export const revalidate = 0;

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LeadGatePopup from "@/components/LeadGatePopup";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chatman Insurance | AI-Powered Insurance Solutions",
  description: "Transform your insurance experience with Chatman Inc's AI solutions. Get instant quotes, file claims 24/7, and enjoy personalized coverage with our AI-powered platform.",
  keywords: "insurance AI, AI insurance assistant, auto insurance, home insurance, life insurance, business insurance, AIVA, Chatman Inc",
  openGraph: {
    title: "Chatman Insurance | AI-Powered Insurance Solutions",
    description: "Comprehensive insurance coverage with cutting-edge AI technology",
    url: "https://insurancedemo.chatmaninc.com",
    siteName: "Chatman Insurance",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <LeadGatePopup delaySeconds={5} />
      </body>
    </html>
  );
}
