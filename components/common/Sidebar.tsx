"use client";

import { Nav } from "@/components/ui/nav";
import { Button } from "@/components/ui/button";
import { useWindowWidth } from "@react-hook/window-size";
import {
  useGetTransactionsQuery,
  useGetIncomeTransactionQuery,
  useGetExpensesTransactionQuery,
} from "@/redux/features/accountSlice";
import {
  Archive,
  TrendingUp,
  LayoutDashboard,
  Trash2,
  ChevronRight,
  BadgePlus,
  Brain,
  BadgeDollarSign,
  DiamondPlus,
  TrendingDown,
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export default function Sidebar({ isCollapsed, toggleCollapse }: SidebarProps) {
  const { data: transactions } = useGetTransactionsQuery();
  const { data: incomeTransactions } = useGetIncomeTransactionQuery();
  const { data: expensesTransactions } = useGetExpensesTransactionQuery();
  const onlyWidth = useWindowWidth();
  const isMobile = onlyWidth < 768;

  if (isMobile) return null; // Hide completely on mobile

  return (
    <div
      className={`h-screen top-12 dark:bg-zinc-950 left-4 fixed z-20 bg-white border-r pt-20 pb-10 px-3 transition-all duration-300`}
      style={{ width: isCollapsed ? "80px" : "180px" }}
    >
      <div className="absolute top-7">
        <Button
          onClick={toggleCollapse}
          className="bg-white text-black hover:bg-slate-300"
        >
          <ChevronRight
            className={`transform transition-transform duration-300 ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </Button>
      </div>

      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Dashboard",
            icon: LayoutDashboard,
            variant: "default",
            href: "/dashboard",
          },
          {
            title: "Transactions",
            label: `${transactions?.length}`,
            icon: BadgeDollarSign,
            variant: "ghost",
            href: "/dashboard/transactions",
          },
          {
            title: "Create",
            icon: BadgePlus,
            variant: "ghost",
            href: "/dashboard/create/account",
          },
          {
            title: "Transact",
            icon: DiamondPlus,
            variant: "ghost",
            href: "/dashboard/create/transaction",
          },
          {
            title: "Incomes",
            label: `${incomeTransactions?.transactions.length}`,
            icon: TrendingUp,
            variant: "ghost",
            href: "/dashboard/incomes",
          },
          {
            title: "Expenses",
            label: `${expensesTransactions?.transactions.length}`,
            icon: TrendingDown,
            variant: "ghost",
            href: "/dashboard/expenses",
          },

          {
            title: "Archive",
            label: "",
            icon: Archive,
            variant: "ghost",
            href: "#",
          },
          {
            title: "Ask AI",
            label: "",
            icon: Brain,
            variant: "ghost",
            href: "/dashboard/chat",
          },
        ]}
      />
    </div>
  );
}
