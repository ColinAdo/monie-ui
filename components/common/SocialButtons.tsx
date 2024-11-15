"use client";

import { SocialButton } from "@/components/common";
import { ImGoogle, ImGithub } from "react-icons/im";
import { continueWithGoogle, continueWithGithub } from "@/utils";

export default function SocialButtons() {
  return (
    <div className="flex justify-between items-center gap-2 mt-5">
      <SocialButton provider="google" onClick={continueWithGoogle}>
        Signin with
        <ImGoogle className="ml-3" />
      </SocialButton>
      <SocialButton provider="github" onClick={continueWithGithub}>
        Signin with
        <ImGithub className="ml-3" />
      </SocialButton>
    </div>
  );
}
