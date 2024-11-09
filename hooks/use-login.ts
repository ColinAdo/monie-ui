import * as z from "zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setAuth } from "@/redux/features/authSlice";
import { useLoginMutation } from "@/redux/features/authApiSlice";
import { loginSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function useLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    login(data)
      .unwrap()
      .then(() => {
        dispatch(setAuth());
        toast.success("Login successfully");
        router.push("/dashboard");
      })
      .catch((err) => {
        toast.error("Wrong email or password!");
        console.log("Wrong email or password!", err);
      });
  };

  return {
    isLoading,
    form,
    onSubmit,
  };
}
