import "@/styles/globals.css";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import Provider from "@/redux/provider";
import { Inter } from "next/font/google";
import { Setup } from "@/components/utils";
import { Footer } from "@/components/common";
import { ThemeProvider } from "@/components/common/ThemeProvider";

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
          <div className="mx-auto max-h-7xl px-2 sm:px-6 lg:px-8 mt-6">
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
            <Toaster position="top-center" richColors />
          </div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
