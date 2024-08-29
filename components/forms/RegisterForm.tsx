"use client";

import { useRegister } from "@/hooks";
import { Form } from "@/components/forms";

export default function RegisterForm() {
  const {
    username,
    email,
    password,
    re_password,
    isLoading,
    onChange,
    onSubmit,
  } = useRegister();

  const config = [
    {
      labelText: "Username",
      labelId: "username",
      type: "text",
      value: username,
      required: true,
    },
    {
      labelText: "Email",
      labelId: "email",
      type: "email",
      value: email,
      required: true,
    },
    {
      labelText: "Password",
      labelId: "password",
      type: "password",
      value: password,
      required: true,
    },
    {
      labelText: "Confirm password",
      labelId: "re_password",
      type: "password",
      value: re_password,
      required: true,
    },
  ];
  return (
    <Form
      config={config}
      btnText="Sign up"
      isLoading={isLoading}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}
