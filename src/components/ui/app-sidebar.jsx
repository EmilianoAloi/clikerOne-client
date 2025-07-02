// src/layout/AppSidebar.jsx
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import SidebarHead from "./sidebar-head";
import NavMain from "./nav-main";
import NavUser from "./nav-user";
import { useAuth } from "@/contexts/AuthContext";

export function AppSidebar(props) {
  const { user, logout } = useAuth();

  // avatar = dos iniciales si hay apellido,
  // o dos primeras letras si solo hay un nombre
  const avatar = user?.nombre
    ? (() => {
        const parts = user.nombre.trim().split(/\s+/);
        if (parts.length === 1) {
          return parts[0].slice(0, 2).toUpperCase();
        }
        return (parts[0][0] + parts[1][0]).toUpperCase();
      })()
    : "U";

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHead />
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          name={user.nombre}
          email={user.rol || "usuario@cliker.com"}
          avatar={avatar}
          onLogout={logout}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
