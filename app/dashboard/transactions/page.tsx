"use client";

import { PageTitle } from "@/components/dashboard";
import { columns } from "@/components/transactions/Columns"
import { DataTable } from "@/components/transactions/data-table"
import { useGetTransactionsQuery } from "@/redux/features/accountSlice";

export default function Page() {
    const { data: transactions } = useGetTransactionsQuery();

    if (!transactions) {
        return
    }
    return (
        <div className="flex flex-col gap-5 w-full">
            <PageTitle title="All Transactions" />
            <DataTable columns={columns} data={transactions} />
        </div>
    )
}