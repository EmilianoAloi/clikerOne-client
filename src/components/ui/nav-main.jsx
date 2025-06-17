import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  Home,
  LayoutGrid,
  Boxes,
  Package,
  Truck,
  BarChart,
  ShoppingCart,
  CircleDollarSign,
  User2,
  Users,
  PieChart,
  Settings,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function NavMain({ items }) {
  // const { state } = useSidebar();
  // const isCollapsed = state === "collapsed";
  const icons = {
    Home,
    Boxes,
    CircleDollarSign,
    User2,
    Users,
    PieChart,
    Settings,
  };
  const menuItems = [
    { title: "Inicio", href: "/home", icon: LayoutGrid, disabled: true },
    { title: "Inventario", href: "/inventory", icon: Package, disabled: true },
    { title: "Ventas", href: "/sales", icon: ShoppingCart, disabled: true },
    { title: "Clientes", href: "/customers", icon: Users, disabled: true },
    { title: "Proveedores", href: "/proveedores", icon: Truck },
    { title: "Reportes", href: "/reports", icon: BarChart, disabled: true },
    { title: "Ajustes", href: "/settings", icon: Settings, disabled: true },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
      <nav className="flex flex-col gap-1 px-2">
        {items.map((item) => {
          const Icon = icons[item.icon];
          // const active = pathname === item.url;
          return (
            <Link
              key={item.title}
              to={item.url}
              //   className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
              //   ${active ? "bg-muted text-foreground" : "hover:bg-muted"}
              // `}
            >
              <Icon className="w-5 h-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </SidebarGroup>
  );
}
