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
  useGetIncomeAnalyticsQuery,
  useGetTransactionsQuery,
} from "@/redux/features/accountSlice";
import { Spinner } from "@/components/common";
import { useState } from "react";

const COLORS = [
  "#22c55e",
  "#10b981",
  "#059669",
  "#047857",
  "#065f46",
  "#064e3b",
  "#d97706",
  "#f59e0b",
  "#eab308",
];

export default function IncomePieChart() {
  const { data: transactions } = useGetTransactionsQuery();
  const [year, setYear] = useState(new Date().getFullYear());
  const { data: incomes } = useGetIncomeAnalyticsQuery(year) || {};
  const rawData = incomes?.data || [];

  const pieData = rawData.map((item: any) => ({
    name: item.name,
    value: item.amount,
  }));

  if (!incomes) {
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
          Income distribution
        </CardTitle>
        <CardDescription>
          Pie Chart showing income by month for {year}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {transactions?.length === 0 ? (
          <span className="text-gray-500 text-sm">
            You have no transactions yet, you'll see a pie chart here...
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
                            backgroundColor: "white darK:bg-zinc-800",
                            padding: "5px",
                            border: "1px solid #22c55e",
                          }}
                        >
                          <p className="text-green-500">{name}</p>
                          <p className="text-green-500">{`Amount: ${value}`}</p>
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
