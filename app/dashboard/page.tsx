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
  IncomeBarChart,
  IncomeLineChart,
  ExpensesBarChart,
  ExpensesLineChart,
} from "@/components/dashboard";
import {
  useGetAccountsQuery,
  useGetTransactionsQuery,
  useGetAccountAnalyticsQuery,
  useGetExpensesAnalyticsQuery,
  useGetIncomeAnalyticsQuery,
} from "@/redux/features/accountSlice";
import { CardTitle, CardDescription } from "@/components/ui/card";

export default function Page() {
  const [year, setYear] = useState(new Date().getFullYear());

  const { data: user } = useRetrieveUserQuery();
  const { lastJsonMessage } = useWebSocketContext();
  const { data: accounts, refetch } = useGetAccountsQuery();
  const { refetch: refetchIncomes } = useGetIncomeAnalyticsQuery(year);
  const { refetch: refetchAccountAnalytics } = useGetAccountAnalyticsQuery();
  const { refetch: refetchExpensesAnalytics } =
    useGetExpensesAnalyticsQuery(year);
  const { data: transactions, refetch: refetchTransactions } =
    useGetTransactionsQuery();

  useEffect(() => {
    refetch();
    refetchIncomes();
    refetchTransactions();
    refetchAccountAnalytics();
    refetchExpensesAnalytics();
  }, [
    lastJsonMessage,
    refetch,
    refetchIncomes,
    refetchTransactions,
    refetchAccountAnalytics,
    refetchExpensesAnalytics,
  ]);

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
            <CardTitle className="text-md font-semibold pb-2">
              Transactions History
            </CardTitle>
            <CardDescription className="pb-6">
              You have made about {transactions.length}{" "}
              {transactions.length === 1 ? "transaction" : "transactions"} this
              month
            </CardDescription>

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
              <span className="text-gray-500 text-sm">
                You have not made transaction yet, you will see them here...
              </span>
            ) : (
              <Link
                className="flex justify-end text-blue-400"
                href="dashboard/transactions"
              >
                {transactions.length > 6 ? "See all" : ""}
              </Link>
            )}
          </section>
        </CardContent>
        <ExpensesLineChart />
        <ExpensesBarChart />
        <AccountsChart />
        <IncomeLineChart />
        <IncomeBarChart />
      </section>
    </div>
  );
}
