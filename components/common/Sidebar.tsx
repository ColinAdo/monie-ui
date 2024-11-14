"use client";

import { Nav } from "@/components/ui/nav";
import { Button } from "@/components/ui/button";
import {
  Archive,
  ArchiveX,
  LayoutDashboard,
  ShoppingCart,
  Trash2,
  UserRound,
  ChevronRight,
  BadgePlus,
  Brain,
  BadgeDollarSign,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useWindowWidth } from "@react-hook/window-size";

export default function Sidebar() {
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
            href: "/",
          },
          {
            title: "Create",
            icon: BadgePlus,
            variant: "ghost",
            href: "/dashboard/create",
          },
          {
            title: "Transaction",
            icon: BadgeDollarSign,
            variant: "ghost",
            href: "/dashboard/create",
          },
          {
            title: "Users",
            label: "9",
            icon: UserRound,
            variant: "ghost",
            href: "/users",
          },
          {
            title: "Order",
            label: "",
            icon: ShoppingCart,
            variant: "ghost",
            href: "/order",
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
