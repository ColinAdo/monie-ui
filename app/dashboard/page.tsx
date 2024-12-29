"use client";

import Link from "next/link";
import Card from "@/components/dashboard/Card";
import { CardContent } from "@/components/dashboard/Card";
import { useWebSocketContext } from "@/hooks/WebSocketContext";
import { useGetAccountsQuery, useGetTransactionsQuery } from "@/redux/features/accountSlice";
import { PageTitle, Chart, AnalyticChart } from "@/components/dashboard";
import SalesCard from "@/components/dashboard/SalesCard";
import { useEffect } from "react";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";

export default function Page() {
  const { lastJsonMessage } = useWebSocketContext();
  const { data: accounts, refetch } = useGetAccountsQuery();
  const { data: transactions } = useGetTransactionsQuery();
  const { data: user } = useRetrieveUserQuery();

  useEffect(() => {
    console.log("Updated realtimeMessages:", lastJsonMessage);
    refetch();
  }, [lastJsonMessage]);

  if (!accounts || !transactions || !user) {
    return;
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {accounts.map((account, i) => (
          <Link href={`/dashboard/edit/${account.id}`} key={i}>
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
              You have made about {transactions.length} {transactions.length === 1 ? "transaction" : "transactions"} this month
            </p>
            {transactions.map((d, i) => (
              <SalesCard
                key={i}
                accountName={d.account_name}
                description={d.description}
                amount={d.amount}
                transactionType={d.transaction_type}
                username={user.username}
                date={d.created_date}
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
