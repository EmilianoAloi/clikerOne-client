import React from "react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { GalleryVerticalEnd } from "lucide-react";

export function SidebarHead() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className={`flex items-center transition-all ${
            isCollapsed ? "justify-center p-2 m-auto mt-2" : "gap-2 p-4"
          }`}
        >
          <div
            className={`flex items-center justify-center rounded-lg transition-all bg-primary ${
              isCollapsed ? "size-8" : "size-8"
            }`}
          >
            <GalleryVerticalEnd
              className={`transition-all duration-200 text-white ${
                isCollapsed ? "size-5" : "size-5"
              }`}
            />
          </div>
          {!isCollapsed && (
            <div className="grid flex-1 text-left text-sm leading-tight transition-all duration-200">
              <span className="truncate font-medium text-md">ClikerOne</span>
              <span className="truncate text-sm">v0.3</span>
            </div>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default SidebarHead;
