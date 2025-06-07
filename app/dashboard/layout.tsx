"use client";

import { RequireAuth } from "@/components/utils";
import { Navbar, Sidebar } from "@/components/common";
import { WebSocketProvider } from "@/hooks/WebSocketContext";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

import { useWindowWidth } from "@react-hook/window-size";

export default function Layout({ children }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const onlyWidth = useWindowWidth();

  const isMobile = onlyWidth < 768;
  const sidebarWidth = isMobile ? 0 : isCollapsed ? 80 : 240;

  return (
    <RequireAuth>
      <WebSocketProvider>
        <Navbar />
        <div className="flex">
          {!isMobile && (
            <Sidebar
              isCollapsed={isCollapsed}
              toggleCollapse={() => setIsCollapsed(!isCollapsed)}
            />
          )}
          <div
            className="p-5 w-full transition-all duration-300"
            style={{ marginLeft: `${sidebarWidth}px` }}
          >
            {children}
          </div>
        </div>
      </WebSocketProvider>
    </RequireAuth>
  );
}
