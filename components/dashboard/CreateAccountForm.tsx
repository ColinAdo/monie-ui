"use client";

import { toast } from "sonner";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { accountSchema } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
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

export default function CreateAccountForm() {
  const { sendJsonMessage } = useWebSocketContext();
  const router = useRouter();

  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      description: "",
      amount: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof accountSchema>) => {
    sendJsonMessage({
      event: "account_message",
      data,
    });
    toast.success("Account created successfully");
    router.push("/dashboard");
  };

  return (
    <Card>
      <CardContent className="space-y-2">
        <Form {...form}>
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

            <Button className="w-full dark:text-black font-bold dark:bg-white">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
