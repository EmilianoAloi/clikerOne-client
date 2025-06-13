// MainLayout.jsx
import { SuppliersProvider } from "@/contexts/SuppliersContext";

import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import DynamicBreadcrumbs from "@/components/ui/dynamicBreadcrumbs";

const MainLayout = ({ children }) => (
  <SidebarProvider>
    <SuppliersProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <DynamicBreadcrumbs />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SuppliersProvider>
    <Toaster position="top-right" richColors />
  </SidebarProvider>
);

export default MainLayout;
