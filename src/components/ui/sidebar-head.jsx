"use client";

import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar, // Detectamos si la sidebar está colapsada
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
          {/* Contenedor del ícono con fondo azul marino */}
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

          {/* Ocultamos el texto cuando la sidebar está colapsada */}
          {!isCollapsed && (
            <div
              className={`grid flex-1 text-left text-sm leading-tight transition-all duration-200 ${
                isCollapsed ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <span className="truncate font-medium text-md">ClikerOne</span>
              <span className="truncate text-sm">v0.1</span>
            </div>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default SidebarHead;
