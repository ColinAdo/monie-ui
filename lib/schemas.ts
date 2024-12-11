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
  re_password: z.string().min(1, {
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

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "email is required",
    })
    .email({
      message: "Enter a valid email address",
    }),
});

export const resetPasswordConfirmSchema = z.object({
  new_password: z.string().min(1, {
    message: "new password is required",
  }),
  re_new_password: z.string().min(1, {
    message: "confirm new password is required",
  }),
});

export const accountSchema = z.object({
  name: z.string().min(1, "Account name is required."),
  description: z.string().optional(),
  amount: z.string().min(1, "Account amount is required."),
});
