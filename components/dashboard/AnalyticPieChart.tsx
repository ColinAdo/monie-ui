"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useGetAccountAnalyticsQuery } from "@/redux/features/accountSlice";

export default function AnalyticPieChart() {
  const { data } = useGetAccountAnalyticsQuery();

  if (!data) {
    return
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Account analytics</CardTitle>
          <CardDescription>
            Pie Chart showing analytic for your accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="value"
                  data={data}
                  fill="gray"
                  label={({ name, value }) => `${name}: ${value}`}
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
