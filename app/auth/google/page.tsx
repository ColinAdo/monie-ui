"use client";

import { useSocialAuth } from "@/hooks";
import { Spinner } from "@/components/common";
import { useSocialAuthenticateMutation } from "@/redux/features/authApiSlice";

export default function Page() {
  const [googleAuthenticate] = useSocialAuthenticateMutation();
  useSocialAuth(googleAuthenticate, "google-oauth2");
  return (
    <div className="flex justify-center items-center my-8">
      <Spinner lg />
    </div>
  );
}
