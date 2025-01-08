"use client";

import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { useGetAccountsQuery } from "@/redux/features/accountSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    href: string;
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  const { data: accounts } = useGetAccountsQuery();
  const pathname = usePathname();

  const handleCreateClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    toast.error("You can only create 8 accounts");
  };

  const handleTransactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    toast.error("You have to create an account first, before you transact");
  };

  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className={cn(
          "group flex flex-col gap-4 py-2",
          isCollapsed && "data-[collapsed=true]:py-2"
        )}
      >
        <nav
          className={cn(
            "grid gap-1 px-2",
            isCollapsed && "group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
          )}
        >
          {links.map((link, index) => {
            const isCreateDisabled = link.title === "Create" && accounts?.length === 8;
            const isTransactDisabled = link.title === "Transact" && accounts?.length === 0;

            const linkContent = (
              <>
                <link.icon className={cn("mr-2 h-4 w-4", isCollapsed && "h-4 w-4")} />
                {!isCollapsed && (
                  <>
                    {link.title}
                    {link.label && (
                      <span
                        className={cn(
                          "ml-auto",
                          link.variant === "default" && "text-background dark:text-white"
                        )}
                      >
                        {link.label}
                      </span>
                    )}
                  </>
                )}
              </>
            );

            return (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      buttonVariants({
                        variant: link.href === pathname ? "default" : "ghost",
                        size: isCollapsed ? "icon" : "sm",
                      }),
                      isCreateDisabled && "h-9 w-9",
                      link.variant === "default" &&
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                      !isCollapsed && "justify-start"
                    )}
                    onClick={
                      isCreateDisabled
                        ? handleCreateClick
                        : isTransactDisabled
                          ? handleTransactClick
                          : undefined
                    }
                  >
                    {linkContent}
                  </Link>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right" className="flex items-center gap-4">
                    {link.title}
                    {link.label && (
                      <span className="ml-auto text-muted-foreground">{link.label}</span>
                    )}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </nav>
      </div>
    </TooltipProvider>
  );
}
