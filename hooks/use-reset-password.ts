import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "@/redux/features/authApiSlice";

export default function useResetPassword() {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [email, setEmail] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    resetPassword(email)
      .unwrap()
      .then(() => {
        toast.success("Please check your email to reset your password");
      })
      .catch(() => {
        toast.error("Failed to send email");
      });
  };
  return {
    email,
    isLoading,
    onChange,
    onSubmit,
  };
}
