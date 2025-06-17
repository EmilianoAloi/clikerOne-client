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

const user = {
  name: "Emiliano Aloi",
  email: "emilianoaloi@cliker.com",
  avatar: "",
};

export function AppSidebar(props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHead />
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
