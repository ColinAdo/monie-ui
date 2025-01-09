import { Timestamp } from "@/components/dashboard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Props {
  create_at: Date;
  amount: number;
  username: string;
  accountName: string;
  description: string;
  transactionType: string
}

export default function TransactionsCard(props: Props) {
  return (
    <div className="flex flex-wrap justify-between gap-3">
      <section className="flex justify-between gap-3 p-2">
        <Avatar>
          <AvatarFallback className="text-black bg-slate-300 font-bold">
            {props.username[0]}
          </AvatarFallback>
        </Avatar>
        <div className="text-sm">
          <p>{props.accountName}</p>
          <div className="hidden sm:block text-ellipsis overflow-hidden whitespace-nowrap w-[120px] sm:w-auto text-gray-500">
            <p>{props.description}</p>
          </div>
        </div>
      </section>
      <div className="flex flex-col items-center">
        <span>{props.amount}</span>
        <span className="hidden sm:block text-ellipsis overflow-hidden whitespace-nowrap w-[120px] sm:w-auto text-gray-500">
          <Timestamp createdAt={props.create_at} />
        </span>
      </div>
    </div>
  );
}
