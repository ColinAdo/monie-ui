"use client";

import { Nav } from "@/components/ui/nav";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useWindowWidth } from "@react-hook/window-size";
import { useGetTransactionsQuery } from "@/redux/features/accountSlice";
import {
  Archive,
  ArchiveX,
  LayoutDashboard,
  Trash2,
  UserRound,
  ChevronRight,
  BadgePlus,
  Brain,
  BadgeDollarSign,
  DiamondPlus
} from "lucide-react";

export default function Sidebar() {
  const { data: transactions } = useGetTransactionsQuery();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobilewidth, setMobileWidth] = useState(false);
  const onlyWidth = useWindowWidth();

  useEffect(() => {
    // Update mobilewidth state when window width changes
    setMobileWidth(onlyWidth < 768);
  }, [onlyWidth]);

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[80px] border-r px-3 pt-20 pb-10">
      {!mobilewidth && (
        <div className="absolute top-7">
          <Button
            onClick={toggleSidebar}
            className="bg-white text-black hover:bg-slate-300"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobilewidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            icon: LayoutDashboard,
            variant: "default",
            href: "/dashboard",
          },
          {
            title: "Transaction",
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
            title: "Users",
            label: "9",
            icon: UserRound,
            variant: "ghost",
            href: "/users",
          },
          {
            title: "Junk",
            label: "23",
            icon: ArchiveX,
            variant: "ghost",
            href: "#",
          },
          {
            title: "Trash",
            label: "",
            icon: Trash2,
            variant: "ghost",
            href: "#",
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
            href: "#",
          },
        ]}
      />
    </div>
  );
}
