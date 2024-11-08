"use client";

import SocialButton from "@/components/auth/SocialButton";
import Image from "next/image";
import { continueWithGoogle, continueWithGithub } from "@/utils";

export default function SocialButtons() {
  return (
    <div className="flex justify-between items-center gap-2 mt-5">
      <SocialButton provider="google" onClick={continueWithGoogle}>
        <Image
          alt="google"
          src="/assets/google.jpeg"
          width={50}
          height={50}
          className="mx-auto h-7 w-7 rounded-full"
        />
      </SocialButton>
      <SocialButton provider="github" onClick={continueWithGithub}>
        <Image
          alt="github"
          src="/assets/github.jpeg"
          width={50}
          height={50}
          className="mx-auto h-6 w-6 rounded-full"
        />
      </SocialButton>
    </div>
  );
}
