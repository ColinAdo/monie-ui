"use client";

import Link from "next/link";
import { CreativeCommons } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { ThemeToggler } from "@/components/common";
import { LogOut, BadgePlus, UserRound } from "lucide-react";
import { logout as setLogout } from "@/redux/features/authSlice";
import { useLogoutMutation } from "@/redux/features/authApiSlice";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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

  const handleLogout = () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout());
      });
  };
  return (
    <div className="text-black px-5 flex justify-between">
      <Link href="/">
        <CreativeCommons className="dark:text-white" />
      </Link>

      <div className="flex item-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
              <AvatarFallback className="text-black dark:text-white">
                CA
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/" className="flex justify-between">
                <UserRound className="h-[1.2rem] w-[1.2rem]" />
                <span className="ml-2">Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/dashboard/create/account"
                className="flex justify-between"
              >
                <BadgePlus className="h-[1.2rem] w-[1.2rem]" />
                <span className="ml-2">Create</span>
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
