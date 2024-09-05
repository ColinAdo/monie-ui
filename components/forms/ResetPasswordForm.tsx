"use client";

import { useResetPassword } from "@/hooks";
import { Form } from "@/components/forms";

export default function ResetPasswordForm() {
  const { email, isLoading, onChange, onSubmit } = useResetPassword();

  const config = [
    {
      labelText: "Email Address",
      labelId: "email",
      type: "email",
      value: email,
      required: true,
    },
  ];
  return (
    <Form
      config={config}
      btnText="Request reset password"
      isLoading={isLoading}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}
