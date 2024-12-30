"use client";

import Link from "next/link";
import { toast } from "sonner";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
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
  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
      >
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  {link.title === "Create" && accounts?.length === 8 ? (
                    <Link
                      href={link.href}
                      className={cn(
                        buttonVariants({
                          variant: link.href === pathname ? "default" : "ghost",
                          size: "icon",
                        }),
                        "h-9 w-9",
                        link.variant === "default" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        toast.error("You can only create 8 accounts");
                      }}
                    >
                      <link.icon className="h-4 w-4" />
                      <span className="sr-only">{link.title}</span>
                    </Link>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        buttonVariants({
                          variant: link.href === pathname ? "default" : "ghost",
                          size: "icon",
                        }),
                        "h-9 w-9",
                        link.variant === "default" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                      )}
                    >
                      <link.icon className="h-4 w-4" />
                      <span className="sr-only">{link.title}</span>
                    </Link>
                  )}
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <>
                {link.title === "Create" && accounts?.length === 8 ? (
                  <Link
                    key={index}
                    href={link.href}
                    className={cn(
                      buttonVariants({
                        variant: link.href === pathname ? "default" : "ghost",
                        size: "sm",
                      }),
                      link.variant === "default" &&
                      "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                      "justify-start"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      toast.error("You can only create 8 accounts");
                    }}
                  >
                    <link.icon className="mr-2 h-4 w-4" />
                    {link.title}
                    {link.label && (
                      <span
                        className={cn(
                          "ml-auto",
                          link.variant === "default" &&
                          "text-background dark:text-white"
                        )}
                      >
                        {link.label}
                      </span>
                    )}
                  </Link>
                ) : (
                  <Link
                    key={index}
                    href={link.href}
                    className={cn(
                      buttonVariants({
                        variant: link.href === pathname ? "default" : "ghost",
                        size: "sm",
                      }),
                      link.variant === "default" &&
                      "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                      "justify-start"
                    )}
                  >
                    <link.icon className="mr-2 h-4 w-4" />
                    {link.title}
                    {link.label && (
                      <span
                        className={cn(
                          "ml-auto",
                          link.variant === "default" &&
                          "text-background dark:text-white"
                        )}
                      >
                        {link.label}
                      </span>
                    )}
                  </Link>
                )}
              </>
            )
          )}
        </nav>
      </div>
    </TooltipProvider>
  );
}
