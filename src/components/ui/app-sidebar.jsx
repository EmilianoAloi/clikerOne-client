import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/ui/nav-main";
import { NavProjects } from "@/components/ui/nav-projects";
import { NavUser } from "@/components/ui/nav-user";
import { TeamSwitcher } from "@/components/ui/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import SidebarHead from "./sidebar-head";

// This is sample data.
const user = {
  name: "Emiliano Aloi",
  email: "emilianoaloi@cliker.com",
  // avatar: "/avatars/emiliano.jpg", // si tenés
};

const navMain = [
  { title: "Inicio", url: "/inicio", icon: "Home" },
  { title: "Inventario", url: "/inventario", icon: "Boxes" },
  { title: "Ventas", url: "/ventas", icon: "CircleDollarSign" },
  { title: "Clientes", url: "/clientes", icon: "User2" },
  { title: "Proveedores", url: "/proveedores", icon: "Users" },
  { title: "Reportes", url: "/reportes", icon: "PieChart" },
  { title: "Ajustes", url: "/ajustes", icon: "Settings" },
];

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarHead />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
