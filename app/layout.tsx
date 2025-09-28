import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/app/_components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
// });

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

// const lato = Lato({
//     variable: "--font-lato",
//     subsets: ["latin"],
//     weight: '400'
// });
// const c = Crimson_Text({
//     variable: "--font-lato",
//     subsets: ["latin"],
//     weight: '400'
// });

export const metadata: Metadata = {
  title: "Aura",
  description: "Decoding Music's DNA", //Listen. Understand. Master.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sourceSans.className} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
