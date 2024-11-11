import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

import Provider from "@/redux/provider";
import { Footer } from "@/components/common";
import { Setup } from "@/components/utils";
import { Toaster } from "sonner";

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
        <Provider>
          <Setup />
          <div className="mx-auto max-h-7xl px-2 sm:px-6 lg:px-8 my-8">
            {children}
            <Toaster position="top-center" richColors />
          </div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
