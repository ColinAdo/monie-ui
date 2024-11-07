"use client";

import { useRouter } from "next/navigation";
import { Frown } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <main className="flex h-full flex-col py-52 items-center justify-center gap-2">
      <Frown className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>
        The page you are looking for does not exist. Please check the URL or go
        back.
      </p>
      <button
        onClick={handleGoBack}
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </button>
    </main>
  );
}
