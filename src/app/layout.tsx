import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./providers";
import Navbar from "@components/layout/navbar";
import Container from "@components/layout/container";
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EasyMerge",
  description: "EasyMerge",
  icons: {
    icon: "/icon_t.ico",
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster richColors />
        <Providers>
          <Navbar />
          <div className="min-h-screen bg-gray-100">
            <Container>
              {children}
            </Container>
          </div>
        </Providers>
      </body>
    </html>
  );
}
