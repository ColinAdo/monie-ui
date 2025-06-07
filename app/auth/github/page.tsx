// "use client";

// import { useSocialAuth } from "@/hooks";
// import { Spinner } from "@/components/common";
// import { useSocialAuthenticateMutation } from "@/redux/features/authApiSlice";

// export default function Page() {
//   const [githubAuthenticate] = useSocialAuthenticateMutation();
//   useSocialAuth(githubAuthenticate, "github");
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

function GitHubAuthPage() {
  const [githubAuthenticate] = useSocialAuthenticateMutation();
  useSocialAuth(githubAuthenticate, "github");

  return (
    <div className="flex justify-center items-center my-80">
      <Spinner lg />
    </div>
  );
}

export default function PageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      }
    >
      <GitHubAuthPage />
    </Suspense>
  );
}
