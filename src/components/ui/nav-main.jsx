import React from "react";
import { useLocation } from "react-router-dom";
import {
  SidebarMenu,
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutGrid,
  Package,
  ShoppingCart,
  Users,
  Truck,
  BarChart,
  Settings,
} from "lucide-react";
import SidebarNavItem from "./sidebarNavItem";

const menuItems = [
  { title: "Inicio", href: "/home", icon: LayoutGrid, disabled: true },
  { title: "Inventario", href: "/inventory", icon: Package, disabled: true },
  { title: "Ventas", href: "/sales", icon: ShoppingCart, disabled: true },
  { title: "Clientes", href: "/customers", icon: Users, disabled: true },
  { title: "Proveedores", href: "/proveedores", icon: Truck },
  { title: "Reportes", href: "/reports", icon: BarChart, disabled: true },
  { title: "Ajustes", href: "/settings", icon: Settings, disabled: true },
];

export function NavMain() {
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const pathname = location.pathname;
  const defaultActive = "/home";
  const activePath =
    menuItems.find((item) => pathname.startsWith(item.href))?.href ||
    defaultActive;

  return (
    <SidebarMenu className={isCollapsed ? "items-center" : ""}>
      <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
      {menuItems.map((item) => (
        <SidebarNavItem
          key={item.href}
          title={item.title}
          href={item.href}
          icon={item.icon}
          isActive={activePath === item.href}
          disabled={item.disabled}
        />
      ))}
    </SidebarMenu>
  );
}

export default NavMain;
