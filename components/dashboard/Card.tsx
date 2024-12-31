import Link from "next/link";
import { toast } from "sonner";
import { AccountType } from "@/lib/exports";
import { MoreVertical, Trash2, Settings } from "lucide-react";
import { useWebSocketContext } from "@/hooks/WebSocketContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Props {
  accounts: AccountType[];
}

export default function Card({ accounts }: Props) {
  const { sendJsonMessage } = useWebSocketContext();

  const handleDelete = async (id: string) => {
    sendJsonMessage({
      event: "delete_account",
      id,
    });
    toast.success("account deleted successfully");
    console.log("Deleting account with ID:", id);
  };
  return (
    <>
      {accounts.map((account, i) => (
        <CardContent key={i}>
          <section className="flex justify-between gap-2">
            {account.name}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-dark h-4 w-4 p-0 flex justify-center items-center">
                  <span className="sr-only">Open menu</span>
                  <MoreVertical className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[50px] min-w-[50px] p-2"
                style={{ maxWidth: '50px' }}
              >
                <DropdownMenuItem className="text-gray-600 dark:text-white cursor-pointer">
                  <Link href={`/dashboard/edit/${account.id}`} key={i}>
                    <Settings className="mr-2" />
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600 cursor-pointer hover:bg-red-100"
                  onClick={() => handleDelete(account.id)}
                >
                  <Trash2 className="mr-2" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </section>

          <section className="flex justify-between gap-1">
            <p className="text-sm text-gray-500">{account.description}</p>
            <p className="text-lg font-semibold">{account.amount}</p>
          </section>
        </CardContent >
      ))
      }
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
