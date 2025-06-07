"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Card from "@/components/dashboard/Card";
import { CardContent } from "@/components/dashboard/Card";
import { useWebSocketContext } from "@/hooks/WebSocketContext";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import TransactionsCard from "@/components/dashboard/TransactionsCard";
import {
  PageTitle,
  AccountsChart,
  ExpensesBarChart,
  ExpensesLineChart,
} from "@/components/dashboard";
import {
  useGetAccountsQuery,
  useGetTransactionsQuery,
  useGetAccountAnalyticsQuery,
  useGetExpensesAnalyticsQuery
} from "@/redux/features/accountSlice";

export default function Page() {
  const [year, setYear] = useState(new Date().getFullYear());

  const { data: user } = useRetrieveUserQuery();
  const { lastJsonMessage } = useWebSocketContext();
  const { data: accounts, refetch } = useGetAccountsQuery();
  const { refetch: refetchAccountAnalytics } = useGetAccountAnalyticsQuery();
  const { refetch: refetchExpensesAnalytics } = useGetExpensesAnalyticsQuery(year);
  const { data: transactions, refetch: refetchTransactions } = useGetTransactionsQuery();

  useEffect(() => {
    console.log("Updated realtimeMessages:", lastJsonMessage);
    refetch();
    refetchTransactions();
    refetchAccountAnalytics();
    refetchExpensesAnalytics();
  }, [lastJsonMessage, refetch, refetchTransactions, refetchAccountAnalytics, refetchExpensesAnalytics]);

  if (!accounts || !transactions || !user) {
    return;
  }

  return (
    <div className="flex flex-col gap-5 w-full mt-12">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {accounts.map((account, i) => (
          <Card key={i} accounts={[account]} />
        ))}
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 transition-all">
        
        <CardContent>
          <section>
            <p className="text-md font-semibold">Transactions History</p>
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
        <ExpensesLineChart />
        <ExpensesBarChart />
        <AccountsChart />

      </section>
    </div>
  );
}
