"use client";

import Link from "next/link";
import { CardContent } from "@/components/dashboard/Card";
import Card from "@/components/dashboard/Card";
import { PageTitle, Chart, AnalyticChart } from "@/components/dashboard";
import SalesCard, { SalesProps } from "@/components/dashboard/SalesCard";
import { useGetAccountsQuery } from "@/redux/features/accountSlice";
import { useWebSocketContext } from "@/hooks/WebSocketContext";

const SalesData: SalesProps[] = [
  {
    name: "Annie",
    email: "annie@gmail.com",
    saleAmount: "+567,000.00",
  },
  {
    name: "Maggie",
    email: "maggie@gmail.com",
    saleAmount: "-100,000.00",
  },
  {
    name: "George",
    email: "george@gmail.com",
    saleAmount: "+450,000.00",
  },
  {
    name: "Coco",
    email: "coco@gmail.com",
    saleAmount: "+900,000.00",
  },
  {
    name: "Boo",
    email: "boo@gmail.com",
    saleAmount: "-50,000.00",
  },
  {
    name: "Sasha",
    email: "sasha@gmail.com",
    saleAmount: "+370,000.00",
  },
];

export default function Page() {
  const {lastJsonMessage} = useWebSocketContext();
  console.log("lastJsonMessage :", lastJsonMessage);
  const { data: accounts } = useGetAccountsQuery();

  if (!accounts) {
    return;
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {accounts.map((account, i) => (
          <Link href={`/dashboard/edit/${account.name}`} key={i}>
            <Card accounts={[account]} />
          </Link>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 transition-all">
        <AnalyticChart />

        <CardContent>
          <section>
            <p className="font-semibold">Transactions</p>
            <p className="text-gray-500 text-sm">
              You have made about 567 sales this month
            </p>
            {SalesData.map((d, i) => (
              <SalesCard
                key={i}
                name={d.name}
                email={d.email}
                saleAmount={d.saleAmount}
              />
            ))}
            <Link className="flex justify-end text-blue-400" href="#">
              See all
            </Link>
          </section>
        </CardContent>
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>
          <Chart />
        </CardContent>

        <AnalyticChart />
      </section>
    </div>
  );
}
