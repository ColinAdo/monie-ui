"use client";

import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import { useState } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import {
  useGetIncomeAnalyticsQuery,
  useGetTransactionsQuery,
} from "@/redux/features/accountSlice";
import { Spinner } from "@/components/common";

export default function IncomeLineChart() {
  const { data: transactions } = useGetTransactionsQuery();
  const [year, setYear] = useState(new Date().getFullYear());
  const { data: incomes } = useGetIncomeAnalyticsQuery(year) || {};
  const data = incomes?.data || [];

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
  };

  if (!incomes) {
    return <Spinner sm />;
  }

  if (data.length === 0) {
    return <p>No data available for the selected year: {year}</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md font-semibold">
          Income analytics
        </CardTitle>
        <CardDescription>
          Line Chart showing your monthly income in {year}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {transactions?.length === 0 ? (
          <span className="text-gray-500 text-sm">
            You have not transactions yet, you will see line chart here...
          </span>
        ) : (
          <>
            <div>
              <button
                disabled={year <= 2035}
                onClick={() => handleYearChange(year - 1)}
                className={year <= 2035 ? "disable" : ""}
              >
                <ChevronsLeft
                  className={`h-4 w-4 ${
                    year <= 2035
                      ? "text-gray-400"
                      : "text-black dark:text-white"
                  }`}
                />
              </button>

              <span className="p-2 font-bold">{year}</span>
              <button
                disabled={year === 2025}
                onClick={() => handleYearChange(year + 1)}
                className={year === 2025 ? "disable" : ""}
              >
                <ChevronsRight
                  className={`h-4 w-4 ${
                    year === 2025
                      ? "text-gray-400"
                      : "text-black dark:text-white"
                  }`}
                />
              </button>
            </div>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart width={1100} height={300} data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    content={({ payload }) => {
                      if (payload && payload.length > 0) {
                        const { name, amount } = payload[0].payload;
                        return (
                          <div
                            style={{
                              backgroundColor: "white dark:black",
                              padding: "5px",
                              border: "1px solid #22c55e",
                            }}
                          >
                            <p className="text-green-500">{name}</p>
                            <p className="text-green-500">{`Amount: ${amount}`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line type="monotone" dataKey="amount" stroke="#22c55e" />
                  <CartesianGrid stroke="#86efac" strokeDasharray="3 3" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
