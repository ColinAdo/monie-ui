"use client";

import * as z from "zod";
import { resetPasswordSchema } from "@/lib/schemas";
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

export default function PasswordResetForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof resetPasswordSchema>) => {
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Email"
                      {...field}
                      className="bg-slate-100 dark:bg-slate-500 text-blak dark:text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full dark:text-white dark:bg-slate-800">
              Request reset password
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
