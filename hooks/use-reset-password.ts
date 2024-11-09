import * as z from "zod";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "@/redux/features/authApiSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/lib/schemas";

export default function useResetPassword() {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof resetPasswordSchema>) => {
    resetPassword(data.email)
      .unwrap()
      .then(() => {
        toast.success("Please check your email to reset your password");
      })
      .catch(() => {
        toast.error("Failed to send email");
      });
  };

  return {
    form,
    isLoading,
    onSubmit,
  };
}
