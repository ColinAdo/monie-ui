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
  IncomePieChart,
  IncomeBarChart,
  IncomeLineChart,
  ExpensesBarChart,
  ExpensesLineChart,
  ExpensesPieChart,
} from "@/components/dashboard";
import {
  useGetAccountsQuery,
  useGetTransactionsQuery,
  useGetAccountAnalyticsQuery,
  useGetExpensesAnalyticsQuery,
  useGetIncomeAnalyticsQuery,
  useGetExpensesTransactionQuery,
} from "@/redux/features/accountSlice";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

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
    useGetExpensesTransactionQuery(year);

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

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
  };

  return (
    <div className="flex flex-col gap-5 w-full mt-12">
      <div className="flex items-center justify-between">
        <PageTitle title="Expenses" />
        <span className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <button
            disabled={year <= 2035}
            onClick={() => handleYearChange(year - 1)}
            className={year <= 2035 ? "opacity-50 cursor-not-allowed" : ""}
          >
            <ChevronsLeft
              className={`h-4 w-4 ${
                year <= 2035 ? "text-gray-400" : "text-black dark:text-white"
              }`}
            />
          </button>

          <span className="font-bold text-2xl">{year}</span>

          <button
            disabled={year === 2025}
            onClick={() => handleYearChange(year + 1)}
            className={year === 2025 ? "opacity-50 cursor-not-allowed" : ""}
          >
            <ChevronsRight
              className={`h-4 w-4 ${
                year === 2025 ? "text-gray-400" : "text-black dark:text-white"
              }`}
            />
          </button>
        </span>
      </div>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 transition-all">
        <CardContent>
          <section>
            <div className="flex justify-between items-center pb-2">
              <CardTitle className="text-md font-semibold">
                Expenses Transactions History
              </CardTitle>
              <span className="text-md font-semibold text-red-600">
                KSH {transactions?.total_income}
              </span>
            </div>

            <CardDescription className="pb-6">
              You have about {transactions.transactions.length}{" "}
              {transactions.transactions.length === 1
                ? "expense transaction"
                : "expenses transactions"}{" "}
              this year
            </CardDescription>

            {transactions.transactions.slice(0, 6).map((d, i) => (
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
            {transactions.transactions.length === 0 ? (
              <span className="text-gray-500 text-sm">
                You have not made transaction yet, you will see them here...
              </span>
            ) : (
              <Link
                className="flex justify-end text-blue-400"
                href="dashboard/transactions"
              >
                {transactions.transactions.length > 6 ? "See all" : ""}
              </Link>
            )}
          </section>
        </CardContent>
        <ExpensesPieChart />
        <ExpensesLineChart />
        <ExpensesBarChart />
      </section>
    </div>
  );
}
