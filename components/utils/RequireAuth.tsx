"use client";

import { useRouter } from "next/navigation";
import { Spinner } from "@/components/common";
import { useAppSelector } from "@/redux/hooks";

interface Props {
  children: React.ReactNode;
}

export default function RequireAuth({ children }: Props) {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-80">
        <Spinner lg />
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push("/auth/login");
  }
  return <>{children}</>;
}
