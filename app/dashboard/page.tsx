"use client";

import Link from "next/link";
import Card from "@/components/dashboard/Card";
import { CardContent } from "@/components/dashboard/Card";
import { useWebSocketContext } from "@/hooks/WebSocketContext";
import { useGetAccountsQuery, useGetTransactionsQuery } from "@/redux/features/accountSlice";
import { PageTitle, Chart, AnalyticChart } from "@/components/dashboard";
import TransactionsCard from "@/components/dashboard/TransactionsCard";
import { useEffect } from "react";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";

export default function Page() {
  const { lastJsonMessage } = useWebSocketContext();
  const { data: accounts, refetch } = useGetAccountsQuery();
  const { data: transactions, refetch: refetchTransactions } = useGetTransactionsQuery();
  const { data: user } = useRetrieveUserQuery();

  useEffect(() => {
    console.log("Updated realtimeMessages:", lastJsonMessage);
    refetch();
    refetchTransactions();
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
            {transactions.slice(0, 6).map((d, i) => (
              <TransactionsCard
                key={i}
                accountName={d.account_name}
                description={d.description}
                amount={d.amount}
                transactionType={d.transaction_type}
                username={user.username}
                create_at={d.created_date}
              />
            ))}
            {transactions.length === 0 ? (
              <span className="flex justify-center font-semibold text-gray-400">
                You have not made transaction yet
              </span>
            ) : (
              <Link className="flex justify-end text-blue-400" href="dashboard/transactions">
                {transactions.length > 6 ? "See all" : ""}
              </Link>
            )}
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
