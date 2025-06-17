"use client";

import Link from "next/link";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { CreativeCommons, TrendingDown, TrendingUp } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { ThemeToggler } from "@/components/common";
import { logout as setLogout } from "@/redux/features/authSlice";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useGetAccountsQuery } from "@/redux/features/accountSlice";
import {
  useLogoutMutation,
  useRetrieveUserQuery,
} from "@/redux/features/authApiSlice";
import {
  Brain,
  LogOut,
  BadgePlus,
  DiamondPlus,
  BadgeDollarSign,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Stateless Function components (sfc)
export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const { data: user } = useRetrieveUserQuery();
  const { data: accounts } = useGetAccountsQuery();

  const handleLogout = () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout());
      });
  };

  if (!accounts) {
    return;
  }
  return (
    <div
      className={`header left-0 sm:left-8 p-2 top-0 z-40 flex justify-between w-full items-center
      "dark:bg-black fixed z-[9999] bg-white ${
        pathname === "/dashboard/create/transaction" ||
        pathname === "/dashboard/create/account"
          ? "!bg-transparent"
          : ""
      } dark:bg-black !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
      "absolute bg-transparent"
     `}
    >
      <Link href="/dashboard">
        <CreativeCommons className="h-10 w-10 dark:text-white" />
      </Link>

      <div className="flex item-center lg:px-14">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar>
              <AvatarFallback className="text-black bg-slate-300 font-bold">
                {user?.username[0]}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ThemeToggler />
            {accounts.length === 8 ? (
              <DropdownMenuItem>
                <Link
                  href="/dashboard/create/account"
                  className="flex justify-between"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.error("You can only create 8 accounts");
                  }}
                >
                  <BadgePlus className="h-[1.2rem] w-[1.2rem]" />
                  <span className="ml-2">Create</span>
                </Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem>
                <Link
                  href="/dashboard/create/account"
                  className="flex justify-between"
                >
                  <BadgePlus className="h-[1.2rem] w-[1.2rem]" />
                  <span className="ml-2">Create</span>
                </Link>
              </DropdownMenuItem>
            )}
            {accounts.length === 0 ? (
              <DropdownMenuItem>
                <Link
                  href="/dashboard/create/transaction"
                  className="flex justify-between"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.error(
                      "You have to create account first, before you transact"
                    );
                  }}
                >
                  <DiamondPlus className="h-[1.2rem] w-[1.2rem]" />
                  <span className="ml-2">Transact</span>
                </Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem>
                <Link
                  href="/dashboard/create/transaction"
                  className="flex justify-between"
                >
                  <DiamondPlus className="h-[1.2rem] w-[1.2rem]" />
                  <span className="ml-2">Transact</span>
                </Link>
                {/* You have to create account first, before you transact */}
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Link
                href="/dashboard/transactions"
                className="flex justify-between"
              >
                <BadgeDollarSign className="h-[1.2rem] w-[1.2rem]" />
                <span className="ml-2">Transation</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/dashboard/incomes" className="flex justify-between">
                <TrendingUp className="h-[1.2rem] w-[1.2rem]" />
                <span className="ml-2">Icomes</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/dashboard/expenses" className="flex justify-between">
                <TrendingDown className="h-[1.2rem] w-[1.2rem]" />
                <span className="ml-2">Expenses</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/dashboard/chat" className="flex justify-between">
                <Brain className="h-[1.2rem] w-[1.2rem]" />
                <span className="ml-2">Aski AI</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="h-[1.2rem] w-[1.2rem]" />
              <button onClick={handleLogout}>Logout</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
