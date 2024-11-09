import * as z from "zod";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/redux/features/authApiSlice";

export default function useRegister() {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      re_password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    register(data)
      .unwrap()
      .then(() => {
        toast.success("Please check your email to activate your account");
        router.push("/auth/login");
      })
      .catch((err) => {
        toast.error("Registration failed!");
        console.log("Registration failed!", err);
      });
  };

  return {
    form,
    isLoading,
    onSubmit,
  };
}
