import Card, { CardProps } from "@/components/dashboard/Card";
import { CardContent } from "@/components/dashboard/Card";
import { PageTitle, Chart, AnalyticChart } from "@/components/dashboard";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import SalesCard, { SalesProps } from "@/components/dashboard/SalesCard";
import Link from "next/link";

const CardData: CardProps[] = [
  {
    lebal: "Sales",
    icon: CreditCard,
    amount: "+246,340.00",
    description: "Sales for the whole month",
  },
  {
    lebal: "Users",
    icon: Users,
    amount: "+24,000.00",
    description: "Users signed up this month",
  },
  {
    lebal: "Activity",
    icon: Activity,
    amount: "-10,000.00",
    description: "Website engagement ",
  },
  {
    lebal: "Total Revenue",
    icon: DollarSign,
    amount: "+350,000.00",
    description: "Revenue of the whole month",
  },
];

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
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Dasboard" />
      <section className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4 transition-all">
        {CardData.map((d, i) => (
          <Link href="/dashboard/edit/e">
            <Card
              key={i}
              amount={d.amount}
              icon={d.icon}
              lebal={d.lebal}
              description={d.description}
            />
          </Link>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 transition-all">
        <AnalyticChart />

        <CardContent>
          <section>
            <p className="font-semibold">Sales</p>
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
