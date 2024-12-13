import { AccountType } from "@/lib/exports";

interface Props {
  accounts: AccountType[];
}

export default function Card({ accounts }: Props) {
  return (
    <>
      {accounts.map((account, i) => (
        <CardContent key={i}>
          <section className="flex justify-between gap-2">
            {account.name}
            {account.created_date && (
              <p className="text-sm text-gray-500">
                {new Date(account.created_date).toLocaleDateString()}
              </p>
            )}
          </section>
          <section className="flex justify-between gap-1">
            <p className="text-sm text-gray-500">{account.description}</p>
            <p className="text-lg font-semibold">{account.amount}</p>
          </section>
        </CardContent>
      ))}
    </>
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
