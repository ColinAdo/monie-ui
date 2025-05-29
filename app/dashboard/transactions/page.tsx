"use client";

import { useEffect } from "react";
import { PageTitle } from "@/components/dashboard";
import { columns } from "@/components/transactions/columns"
import { useWebSocketContext } from "@/hooks/WebSocketContext";
import { DataTable } from "@/components/transactions/data-table"
import { useGetTransactionsQuery } from "@/redux/features/accountSlice";

export default function Page() {
    const { lastJsonMessage } = useWebSocketContext();
    const { data: transactions, refetch } = useGetTransactionsQuery();

    useEffect(() => {
        refetch();
    }, [lastJsonMessage, refetch]);

    if (!transactions) {
        return
    }
    return (
        <div className="flex flex-col gap-5 w-full mt-12">
            <PageTitle title="All Transactions" />
            <DataTable columns={columns} data={transactions} />
        </div>
    )
}