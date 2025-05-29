// "use client";

// import { useSocialAuth } from "@/hooks";
// import { Spinner } from "@/components/common";
// import { useSocialAuthenticateMutation } from "@/redux/features/authApiSlice";

// export default function Page() {
//   const [googleAuthenticate] = useSocialAuthenticateMutation();
//   useSocialAuth(googleAuthenticate, "google-oauth2");
//   return (
//     <div className="flex justify-center items-center my-8">
//       <Spinner lg />
//     </div>
//   );
// }

"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { Suspense } from "react";
import { useSocialAuth } from "@/hooks";
import { Spinner } from "@/components/common";
import { useSocialAuthenticateMutation } from "@/redux/features/authApiSlice";

function GoogleAuthPage() {
  const [googleAuthenticate] = useSocialAuthenticateMutation();
  useSocialAuth(googleAuthenticate, "google-oauth2");

  return (
    <div className="flex justify-center items-center my-8">
      <Spinner lg />
    </div>
  );
}

export default function PageWrapper() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
      <GoogleAuthPage />
    </Suspense>
  );
}

