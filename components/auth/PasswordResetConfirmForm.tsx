"use client";

import * as z from "zod";
import { resetPasswordConfirmSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Props {
  uid: string;
  token: string;
}

export default function PasswordResetConfirmForm({ uid, token }: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof resetPasswordConfirmSchema>>({
    resolver: zodResolver(resetPasswordConfirmSchema),
    defaultValues: {
      new_password: "",
      re_new_password: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof resetPasswordConfirmSchema>) => {
    router.push("/");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request reset password</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    New password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter new password"
                      {...field}
                      className="bg-slate-100 dark:bg-slate-500 text-blak dark:text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="re_new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Confirm new password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter confirm new password"
                      {...field}
                      className="bg-slate-100 dark:bg-slate-500 text-blak dark:text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full dark:text-white dark:bg-slate-800">
              Reset password
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
