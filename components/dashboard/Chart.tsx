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

export default function Chart() {
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
            Bar Chart showing analytic for your monthly transaction
          </CardDescription>
        </CardHeader>
        <CardContent>
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
