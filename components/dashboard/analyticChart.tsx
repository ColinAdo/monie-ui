"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
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

import data from "@/data/analytics";

export default function AnalyticCard() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Transaction analytics</CardTitle>
          <CardDescription>
            Line Chart showing analytic for post
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart width={1100} height={300} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid type="monotone" stroke="#ccc" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
