import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { AccountType } from "@/lib/exports";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { editAccountSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { useWebSocketContext } from "@/hooks/WebSocketContext";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Props {
  account: AccountType;
}

export default function CreateAccountForm({ account }: Props) {
  const { sendJsonMessage } = useWebSocketContext();
  const router = useRouter();

  const form = useForm<z.infer<typeof editAccountSchema>>({
    resolver: zodResolver(editAccountSchema),
    defaultValues: {
      // id: account.id,
      name: account.name || "",
      description: account.description || "",
      amount: account?.amount !== undefined ? String(account.amount) : "",
    },
  });


  const onSubmit = async (data: z.infer<typeof editAccountSchema>) => {
    console.log("Form submitted:", data);
    sendJsonMessage({
      event: "update_account",
      data,
    });
    toast.success("Account updates successfully");
    router.push("/dashboard");
  };

  return (
    <>
      {/* <CardContent className="space-y-2"> */}
      <Form {...form}>
        <input type="hidden" value={account.id} {...form.register("id")} />
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                  Account name
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter account name"
                    {...field}
                    className=" dark:bg-zinc-950 text-blak dark:text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Account description
                  </FormLabel>
                </div>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter account description"
                    {...field}
                    className="dark:bg-zinc-950  text-blak dark:text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Account Amount
                  </FormLabel>
                </div>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter account amount"
                    {...field}
                    className="dark:bg-zinc-950  text-blak dark:text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full dark:text-black font-bold dark:bg-white">
            Submit
          </Button>
        </form>
      </Form>
      {/* </CardContent> */}
    </>
  );
}
