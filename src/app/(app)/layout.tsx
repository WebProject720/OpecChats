import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DBconnect from "@/lib/DBconnect";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpecChats || Keep it Screcet",
  description: "Ask anything fearlessly",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  DBconnect();
  return (
    <html lang="en">
        <body className={inter.className}>{children}</body>
    </html>
  );
}
