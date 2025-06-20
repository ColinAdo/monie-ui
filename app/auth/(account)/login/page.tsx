import { CreativeCommons } from "lucide-react";
import AuthTabs from "@/components/auth/AuthTabs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-0">
        <div className="mb-0 flex justify-center space-x-4">
          <Image src="/assets/logo.png" width={100} height={100} alt="Log" />
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <AuthTabs />
      </div>
    </div>
  );
}
