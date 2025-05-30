import ContinueWithSocialAuth from "@/utils/continue-with-social-auth";

export const continueWithGoogle = () =>
  ContinueWithSocialAuth("google-oauth2", "google");
export const continueWithGithub = () =>
  ContinueWithSocialAuth("github", "github");
