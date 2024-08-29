import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/redux/features/authApiSlice";

export default function useRegister() {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });

  const { username, email, password, re_password } = formData;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    register({ username, email, password, re_password })
      .unwrap()
      .then(() => {
        toast.success("Please check your email to activate your account");
        router.push("/auth/login");
      })
      .catch(() => {
        toast.success("Registration failed!");
      });
  };
  return {
    username,
    email,
    password,
    re_password,
    isLoading,
    onChange,
    onSubmit,
  };
}
