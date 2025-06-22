import Link from "next/link";

export default function Footer() {
  return (
    <footer className="h-16">
      <div className="h-full px-2">
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-gray-500 text-xs">
            &copy; 2025 Monie • All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">inbox@mail.colinadore.tech</p>
          <footer className="text-center text-sm mt-5 mb-5 text-gray-500">
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>{" "}
            •{" "}
            <Link href="/terms-of-service" className="hover:underline">
              Terms of Service
            </Link>
          </footer>
        </div>
      </div>
    </footer>
  );
}
