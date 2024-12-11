"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useWebSocket from "react-use-websocket";
import { useEffect, useState, useRef, ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { accountSchema } from "@/lib/schemas";
import { Spinner } from "@/components/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { useAppSelector } from "@/redux/hooks";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function CreateAccountForm() {
  const router = useRouter();
  const { isLoading } = useAppSelector((state) => state.auth);
  const WS_URL = `${process.env.NEXT_PUBLIC_WS_HOST}/api/v1/accounts/`;

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      share: false,
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    console.log("Connection state changed", readyState);
  }, [readyState]);

  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      description: "",
      amount: "",
    },
  });

  const onSubmit = (data: z.infer<typeof accountSchema>) => {
    sendJsonMessage(data);
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

            <Button
              className="w-full dark:text-black font-bold dark:bg-white"
              disabled={isLoading}
            >
              {isLoading ? <Spinner sm /> : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
