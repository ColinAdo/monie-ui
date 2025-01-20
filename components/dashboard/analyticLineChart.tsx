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
import { useGetTransactionAnalyticsQuery } from "@/redux/features/accountSlice";

export default function AnalyticCard() {
  const [year, setYear] = useState(new Date().getFullYear());
  const { data: response } = useGetTransactionAnalyticsQuery(year) || {};
  const data = response?.data || [];

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
  };

  if (!response) {
    return <p>Loading transaction analytics...</p>;
  }

  if (data.length === 0) {
    return <p>No data available for the selected year: {year}</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Analytics</CardTitle>
        <CardDescription>
          Line Chart showing analytics for your monthly transactions in {year}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <button
            disabled={year <= 2035}
            onClick={() => handleYearChange(year - 1)}
            className={year <= 2035 ? "disable" : ""}
          >
            <ChevronsLeft
              className={`h-4 w-4 ${year <= 2035 ? "text-gray-400" : "text-black dark:text-white"}`}
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
            <LineChart width={1100} height={300} data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                content={({ payload }) => {
                  if (payload && payload.length > 0) {
                    const { name, amount } = payload[0].payload; // Extract data from the payload
                    return (
                      <div style={{ backgroundColor: "white", padding: "5px", border: "1px solid #ccc" }}>
                        <p className='text-black'>{name}</p>
                        <p className='text-black'>{`Amount: ${amount}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
