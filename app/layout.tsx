import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

import { Navbar, Footer } from "@/components/common";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monie",
  description: "Monie is an app to manage your finances",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
