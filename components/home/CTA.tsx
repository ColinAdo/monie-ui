import { ArrowRight, CreditCard, LockKeyhole, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden border border-purple-500 rounded-3xl p-12 text-center shadow-2xl animate-fade-in">
          <div className="relative">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-blcak/20 dark:bg-white/20 p-4 backdrop-blur-sm">
                <Sparkles className="h-8 w-8 text-purple-500" />
              </div>
            </div>

            {/* Heading */}
            <h2 className="mb-4 lg:text-4xl text-3xl font-bold text-black dark:text-gray-300 sm:text-5xl">
              Ready to Transform Your Finances?
            </h2>

            {/* Description */}
            <p className="mb-8 text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of users who have already taken control of their
              spending. Start organizing your expenses like a pro in just 2
              minutes.
            </p>

            {/* CTA Buttons */}
            <div
              className="w-fit mx-auto mt-6 animate-fade-in group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-2 text-sm font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              style={{ animationDelay: "0.4s" }}
            >
              <Link href="/auth/login" className="flex items-center">
                Start Tracking
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-8 text-white/80 sm:ml-[30%] ">
              <p className="text-sm flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <LockKeyhole /> 100% secure
                </span>
                <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <CreditCard /> No credit card required
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
