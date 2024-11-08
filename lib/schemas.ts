import * as z from "zod";

export const registerSchema = z.object({
  username: z.string().min(1, {
    message: "username is required",
  }),
  email: z
    .string()
    .min(1, {
      message: "email is required",
    })
    .email({
      message: "Enter a valid email address",
    }),
  password: z.string().min(1, {
    message: "password is required",
  }),
  confirmPassword: z.string().min(1, {
    message: "confirm password is required",
  }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "email is required",
    })
    .email({
      message: "Enter a valid email address",
    }),
  password: z.string().min(1, {
    message: "password is required",
  }),
});
