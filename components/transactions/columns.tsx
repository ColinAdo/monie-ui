"use client"

import { toast } from "sonner";
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Trash2 } from 'lucide-react'
import { useWebSocketContext } from "@/hooks/WebSocketContext";

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TransactionType } from "@/lib/exports"

export const columns: ColumnDef<TransactionType>[] = [
    {
        accessorKey: "account_name",
        header: "Account",
    },
    {
        accessorKey: "transaction_type",
        header: "Transaction Type",
        filterFn: (row, id, value) => {
            return value === "all" ? true : row.getValue(id) === value;
        },
        cell: ({ row }) => {
            const transactionType = row.original.transaction_type;
            const textColorClass = transactionType === "income" ? "text-green-500" :
                transactionType === "expense" ? "text-red-600" : "";

            return <span className={textColorClass}>{transactionType}</span>;
        },
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        accessorKey: "created_date",
        header: "Date",
        cell: ({ row }) => {
            const date = new Date(row.original.created_date);
            const formattedDate = date.toLocaleDateString("en-GB", {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
            });
            return <>{formattedDate}</>;
        },
    },
    {
        header: "Action",
        id: "actions",
        cell: ({ row }) => {
            const timetable = row.original
            const id = timetable.id
            const { sendJsonMessage } = useWebSocketContext();

            const handleDelete = async () => {
                sendJsonMessage({
                    event: "delete_transaction",
                    id,
                });
                toast.success("transaction deleted successfully");
                console.log("Deleting transaction with ID:", id);
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
                            onClick={() => handleDelete()}
                        ><Trash2 /> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]