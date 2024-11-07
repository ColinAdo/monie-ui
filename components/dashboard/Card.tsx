import { LucideIcon } from "lucide-react";

export type CardProps = {
  lebal: string;
  amount: string;
  icon: LucideIcon;
  description: string;
};

export default function Card(props: CardProps) {
  return (
    <CardContent>
      <section className="flex justify-between gap-2">
        {props.lebal}
        <props.icon className="h-4 w-4 text-gray-500" />
      </section>
      <section className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">{props.amount}</h2>
        <p className="text-sm text-gray-500">{props.description}</p>
      </section>
    </CardContent>
  );
}

export function CardContent(props: React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className="flex flex-col gap-3 rounded-xl border p-5 shadow"
    />
  );
}
