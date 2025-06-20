import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monie | Home",
  description: "Monie home page",
};

import { Hero } from "@/components/home";
import { Features } from "@/components/home";
import { CTA } from "@/components/home";

export default function Index() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <CTA />
    </div>
  );
}
