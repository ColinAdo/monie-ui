"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Trash2, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { useWebSocketContext } from "@/hooks/WebSocketContext";
import { TransactionType } from "@/types/exports";

type Props = {
  transaction: TransactionType;
};

export function DeleteTransactionCell({ transaction }: Props) {
  const { sendJsonMessage } = useWebSocketContext();

  const handleDelete = () => {
    sendJsonMessage({
      event: "delete_transaction",
      id: transaction.id,
    });
    toast.success("Transaction deleted successfully");
    console.log("Deleting transaction with ID:", transaction.id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 cursor-pointer hover:bg-red-100"
          onClick={handleDelete}
        >
          <Trash2 /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
