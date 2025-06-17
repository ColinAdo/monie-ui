import {
  Target,
  ArrowRight,
  PiggyBank,
  TrendingUp,
  CreditCard,
  ChartColumnBig,
  CircleDollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-20 lg:py-32">
      <div className="absolute" />

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          {/* Icon cluster */}
          <div className="mb-8 flex justify-center space-x-4">
            <div className="rounded-full bg-blue-100 p-3 animate-scale-in">
              <PiggyBank className="h-8 w-8 text-blue-600" />
            </div>
            <div
              className="rounded-full bg-purple-100 p-3 animate-scale-in"
              style={{ animationDelay: "0.1s" }}
            >
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          {/* Main heading */}
          <h1 className="mx-auto max-w-4xl text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl animate-fade-in">
            Take Control of Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Spending
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="mx-auto mt-6 max-w-2xl text-xl text-gray-600 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Create separate accounts for rent, food, transport, and more. Track
            every expense with crystal-clear organization that actually makes
            sense.
          </p>

          {/* CTA Button */}
          <div
            className="w-fit mx-auto mt-6 animate-fade-in group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-2 text-sm font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            style={{ animationDelay: "0.4s" }}
          >
            <Link href="/auth/login" className="flex items-center">
              Start Tracking
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Trust indicators */}
          <div
            className="mt-12 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <p className="text-sm text-gray-500 mb-4">
              Trusted by smart spenders everywhere
            </p>
            <div className="flex justify-center space-x-8 opacity-60">
              <div className="text-2xl font-bold text-gray-400">
                <CreditCard className="w-8 h-8 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-gray-400">
                <ChartColumnBig className="w-8 h-8 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-gray-400">
                <Target className="w-8 h-8 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-gray-400">
                <CircleDollarSign className="w-8 h-8 text-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
