"use client";

import {
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
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

import {
  useGetAccountAnalyticsQuery,
  useGetTransactionsQuery,
} from "@/redux/features/accountSlice";
import { Spinner } from "@/components/common";
import { formatAmount } from "@/types/exports";

export default function AccountsChart() {
  const { data: transactions } = useGetTransactionsQuery();
  const { data } = useGetAccountAnalyticsQuery();

  if (!data) {
    <div className="flex justify-center items-center my-20">
      <Spinner sm />
    </div>;
  }

  const colors = [
    "#00C49F",
    "#0088FE",
    "#FFBB28",
    "#FF8042",
    "red",
    "brown",
    "#6b34eb",
    "yellow",
  ];
  const getPath = (x: any, y: any, width: any, height: any) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props: any) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-md font-semibold">
            Accounts analytics
          </CardTitle>
          <CardDescription>
            Pie Chart showing analytic for your accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {transactions?.length === 0 ? (
            <span className="text-gray-500 text-sm">
              You have no account yet, you will see a chart here...
            </span>
          ) : (
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart
                  width={500}
                  height={400}
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" hide={true} />{" "}
                  {/* Ensure dataKey matches */}
                  <YAxis tickFormatter={formatAmount} />
                  <Tooltip
                    content={({ payload }) => {
                      if (payload && payload.length > 0) {
                        const { name, value } = payload[0].payload; // Extract data from the payload
                        return (
                          <div
                            style={{
                              backgroundColor: "white",
                              padding: "5px",
                              border: "1px solid #ccc",
                            }}
                          >
                            <p className="text-black">{name}</p>
                            <p className="text-black">{`Amount: ${value}`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill="#8884d8"
                    shape={<TriangleBar />}
                    label={{ position: "top" }}
                  >
                    {data?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
