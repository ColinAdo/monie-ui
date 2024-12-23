"use client";

import Link from "next/link";
import Card from "@/components/dashboard/Card";
import { CardContent } from "@/components/dashboard/Card";
import { useWebSocketContext } from "@/hooks/WebSocketContext";
import { useGetAccountsQuery } from "@/redux/features/accountSlice";
import { PageTitle, Chart, AnalyticChart } from "@/components/dashboard";
import SalesCard, { SalesProps } from "@/components/dashboard/SalesCard";
import { useEffect, useState } from "react";
import { AccountType } from "@/lib/exports";

const SalesData: SalesProps[] = [
  {
    name: "Annie",
    email: "annie@gmail.com",
    saleAmount: "+567,000.00",
  },
  {
    name: "Maggie",
    email: "maggie@gmail.com",
    saleAmount: "-100,000.00",
  },
  {
    name: "George",
    email: "george@gmail.com",
    saleAmount: "+450,000.00",
  },
  {
    name: "Coco",
    email: "coco@gmail.com",
    saleAmount: "+900,000.00",
  },
  {
    name: "Boo",
    email: "boo@gmail.com",
    saleAmount: "-50,000.00",
  },
  {
    name: "Sasha",
    email: "sasha@gmail.com",
    saleAmount: "+370,000.00",
  },
];

export default function Page() {
  const [realtimeMessages, setRealtimeMessages] = useState<AccountType[]>([]);
  const { lastJsonMessage } = useWebSocketContext();
  const { data: accounts } = useGetAccountsQuery();

  useEffect(() => {
    if (
      lastJsonMessage &&
      typeof lastJsonMessage === "object" &&
      "name" in lastJsonMessage &&
      "description" in lastJsonMessage &&
      "amount" in lastJsonMessage
    ) {
      const account: AccountType = {
        id: "",
        name: lastJsonMessage.name as string,
        description: lastJsonMessage.description as string,
        amount: lastJsonMessage.amount as number,
        created_date: lastJsonMessage.created_date as Date
      };
      setRealtimeMessages([account]);
    }

  }, [lastJsonMessage]);

  useEffect(() => {
    console.log("Updated realtimeMessages:", realtimeMessages);
  }, [realtimeMessages]);

  if (!accounts) {
    return;
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {realtimeMessages.map((account, i) => (
          <Link href={`/dashboard/edit/${account.name}`} key={i}>
            <Card accounts={[account]} />
          </Link>
        ))}
        {accounts.map((account, i) => (
          <Link href={`/dashboard/edit/${account.name}`} key={i}>
            <Card accounts={[account]} />
          </Link>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 transition-all">
        <AnalyticChart />

        <CardContent>
          <section>
            <p className="font-semibold">Transactions</p>
            <p className="text-gray-500 text-sm">
              You have made about 567 sales this month
            </p>
            {SalesData.map((d, i) => (
              <SalesCard
                key={i}
                name={d.name}
                email={d.email}
                saleAmount={d.saleAmount}
              />
            ))}
            <Link className="flex justify-end text-blue-400" href="#">
              See all
            </Link>
          </section>
        </CardContent>
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>
          <Chart />
        </CardContent>

        <AnalyticChart />
      </section>
    </div>
  );
}
