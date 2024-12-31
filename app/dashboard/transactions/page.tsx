"use client";

import { useEffect } from "react";
import { PageTitle } from "@/components/dashboard";
import { columns } from "@/components/transactions/columns"
import { DataTable } from "@/components/transactions/data-table"
import { useGetTransactionsQuery } from "@/redux/features/accountSlice";
import { useWebSocketContext } from "@/hooks/WebSocketContext";

export default function Page() {
    const { lastJsonMessage } = useWebSocketContext();
    const { data: transactions, refetch } = useGetTransactionsQuery();

    useEffect(() => {
        refetch();
    }, [lastJsonMessage]);

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