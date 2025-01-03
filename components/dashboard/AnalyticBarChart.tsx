"use client";

import {
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Tooltip,
  XAxis,
  Legend,
  YAxis, Bar
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetTransactionAnalyticsQuery } from "@/redux/features/accountSlice";
import { useState } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

export default function Chart() {
  const [year, setYear] = useState(new Date().getFullYear());
  const { data: response } = useGetTransactionAnalyticsQuery(year) || {};
  const data = response?.data || [];

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
  };

  if (!data) {
    return
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Transaction Analytics</CardTitle>
          <CardDescription>
            Bar Chart showing analytics for your monthly transactions in {year}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <button
              disabled={year <= 2024}
              onClick={() => handleYearChange(year - 1)}
              className={year <= 2024 ? "disable" : ""}
            >
              <ChevronsLeft
                className={`h-4 w-4 ${year <= 2024 ? "text-gray-400" : "text-black dark:text-white"}`}
              />
            </button>

            <span className="p-2 font-bold">{year}</span>
            <button
              disabled={year === 2025}
              onClick={() => handleYearChange(year + 1)}
              className={year === 2025 ? "disable" : ""}
            >
              <ChevronsRight
                className={`h-4 w-4 ${year === 2025 ? "text-gray-400" : "text-black dark:text-white"}`}
              />
            </button>
          </div>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart
                width={500}
                height={300}
                data={data}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="gray" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
