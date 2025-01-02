"use client";

import Link from "next/link";
import { CreativeCommons } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "sonner";
import { ThemeToggler } from "@/components/common";
import { LogOut, BadgePlus, UserRound, DiamondPlus, BadgeDollarSign } from "lucide-react";
import { logout as setLogout } from "@/redux/features/authSlice";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useGetAccountsQuery } from "@/redux/features/accountSlice";
import {
  useLogoutMutation,
  useRetrieveUserQuery,
} from "@/redux/features/authApiSlice";

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
    return
  }
  return (
    <div className="text-black px-5 flex justify-between">
      <Link href="/">
        <CreativeCommons className="dark:text-white" />
      </Link>

      <div className="flex item-center">
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
            <DropdownMenuItem>
              <Link href="/" className="flex justify-between">
                <UserRound className="h-[1.2rem] w-[1.2rem]" />
                <span className="ml-2">Profile</span>
              </Link>
            </DropdownMenuItem>
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
                    toast.error("You have to create account first, before you transact");
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
            <ThemeToggler />
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
