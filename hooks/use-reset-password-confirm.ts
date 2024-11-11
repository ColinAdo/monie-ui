import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordConfirmSchema } from "@/lib/schemas";
import { useResetPasswordConfirmMutation } from "@/redux/features/authApiSlice";

export default function useResetPasswordConfirm(uid: string, token: string) {
  const router = useRouter();

  const [resetPasswordConfirm, { isLoading }] =
    useResetPasswordConfirmMutation();

  const form = useForm<z.infer<typeof resetPasswordConfirmSchema>>({
    resolver: zodResolver(resetPasswordConfirmSchema),
    defaultValues: {
      new_password: "",
      re_new_password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof resetPasswordConfirmSchema>) => {
    resetPasswordConfirm({ ...data, uid, token })
      .unwrap()
      .then(() => {
        toast.success("Password reset successful");
        router.push("/auth/login");
      })
      .catch(() => {
        toast.error("Password reset failed");
      });
  };

  return {
    form,
    isLoading,
    onSubmit,
  };
}
