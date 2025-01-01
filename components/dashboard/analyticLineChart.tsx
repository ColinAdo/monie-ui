"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useGetTransactionAnalyticsQuery } from "@/redux/features/accountSlice";

export default function AnalyticCard() {
  const { data } = useGetTransactionAnalyticsQuery();

  if (!data) {
    return
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Transaction analytics</CardTitle>
          <CardDescription>
            Line Chart showing analytic for your monthly transaction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart width={1100} height={300} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                <CartesianGrid type="monotone" stroke="#ccc" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
