"use client";

import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  useGetExpensesAnalyticsQuery,
  useGetTransactionsQuery,
} from "@/redux/features/accountSlice";
import { Spinner } from "@/components/common";
import { useState } from "react";

const COLORS = [
  "#10b981",
  "#059669",
  "#22c55e",
  "#047857",
  "#064e3b",
  "#ef4444",
  "#d97706",
  "#065f46",
  "#f59e0b",
  "#eab308",
  "#3b82f6",
  "#8b5cf6",
];

export default function ExpensesPieChart() {
  const { data: transactions } = useGetTransactionsQuery();
  const [year, setYear] = useState(new Date().getFullYear());
  const { data: expenses } = useGetExpensesAnalyticsQuery(year) || {};
  const rawData = expenses?.data || [];

  const pieData = rawData.map((item: any) => ({
    name: item.name,
    value: item.amount,
  }));

  if (!expenses) {
    return (
      <div className="flex justify-center items-center my-20">
        <Spinner sm />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md font-semibold">
          Expenses distribution
        </CardTitle>
        <CardDescription>
          Pie Chart showing expenses by month for {year}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {transactions?.length === 0 ? (
          <span className="text-gray-500 text-sm">
            You have no transactions yet, you&apos;ll see a pie chart here...
          </span>
        ) : (
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ payload }) => {
                    if (payload && payload.length > 0) {
                      const { name, value } = payload[0].payload;
                      return (
                        <div
                          style={{
                            backgroundColor: "white dark:black",
                            padding: "5px",
                            border: "1px solid #efffff",
                          }}
                        >
                          <p>{name}</p>
                          <p>{`Amount: ${value}`}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
