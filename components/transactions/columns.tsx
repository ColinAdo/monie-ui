"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TransactionType } from "@/types/exports";
import { DeleteTransactionCell } from "@/components/transactions/DeleteTransactionCell";

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
      const textColorClass =
        transactionType === "Income"
          ? "text-green-500"
          : transactionType === "Expense"
          ? "text-red-600"
          : "";

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
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
      return <>{formattedDate}</>;
    },
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => <DeleteTransactionCell transaction={row.original} />,
  },
];
