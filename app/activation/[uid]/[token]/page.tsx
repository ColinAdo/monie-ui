"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useActivationMutation } from "@/redux/features/authApiSlice";
import { Spinner } from "@/components/common";

interface Props {
  params: {
    uid: string;
    token: string;
  };
}

export default function Page({ params }: Props) {
  const router = useRouter();
  const [activation] = useActivationMutation();

  useEffect(() => {
    let isMounted = true;
    const { uid, token } = params;

    activation({ uid, token })
      .unwrap()
      .then(() => {
        if (isMounted) {
          toast.success("Account activated successfully");
        }
      })
      .catch(() => {
        if (isMounted) {
          toast.error("Failed to activate account, contact support!");
        }
      })
      .finally(() => {
        router.push("/auth/login");
      });

    return () => {
      isMounted = false;
    };
  }, [activation, params, router]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 dark:text-white text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Activiating your account...
          <span className="flex justify-center mt-4">
            <Spinner lg />
          </span>
        </h2>
      </div>
    </div>
  );
}
