'use client';

import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTransactionSchema } from "@/lib/schemas";
import { useWebSocketContext } from "@/hooks/WebSocketContext";
import { useGetAccountsQuery } from "@/redux/features/accountSlice";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

export default function CreateTransactionForm() {
  const { data: accounts } = useGetAccountsQuery();
  const { sendJsonMessage } = useWebSocketContext();
  const router = useRouter();

  const form = useForm<z.infer<typeof createTransactionSchema>>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      accountName: "",
      transactionType: "",
      description: "",
      amount: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof createTransactionSchema>) => {
    sendJsonMessage({
      event: "create_transaction",
      data,
    });
    toast.success("transaction created successfully");
    router.push("/dashboard");
    console.log("Submitted data :", data)
  };

  if (!accounts) {
    return
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="accountName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                  Account name
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger id="type" className="w-[480px]">
                      <SelectValue placeholder="select account name" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((account, i) => (
                        <SelectItem key={i} value={account.name}>
                          {account.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="transactionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                  Transaction Type
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger id="type" className="w-[480px]">
                      <SelectValue placeholder="select transaction type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
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
                    className="dark:bg-zinc-950  text-black dark:text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"
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
                    Amount
                  </FormLabel>
                </div>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter account amount"
                    {...field}
                    className="dark:bg-zinc-950  text-black dark:text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"
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
    </>
  );
}
