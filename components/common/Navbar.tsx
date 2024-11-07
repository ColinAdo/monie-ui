"use client";

import Link from "next/link";
import { CreativeCommons } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggler } from "@/components/common";
import { useAppDispatch } from "@/redux/hooks";
import { useLogoutMutation } from "@/redux/features/authApiSlice";
import { logout as setLogout } from "@/redux/features/authSlice";

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
        <CreativeCommons />
      </Link>

      <div className="flex item-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
              <AvatarFallback className="text-black">CA</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="#">Blog</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ThemeToggler />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button onClick={handleLogout}>Logout</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
