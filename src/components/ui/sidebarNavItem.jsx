import { useNavigate } from "react-router-dom";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
const SidebarNavItem = ({ title, href, icon: Icon, disabled, isActive }) => {
  const navigate = useNavigate();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={`flex items-center transition-all duration-0 cursor-pointer ${
          isCollapsed ? "justify-center p-2" : "gap-3 px-4 py-5 w-full"
        } ${
          isActive
            ? `bg-black text-white font-semibold max-w-[100%] py-5  hover:bg-black hover:text-white ${
                !isCollapsed ? "rounded-none" : ""
              }`
            : "text-gray-600 hover:bg-gray-200"
        }`}
      >
        <button
          onClick={() => !disabled && navigate(href)}
          disabled={disabled}
          className="flex items-center gap-3 w-full text-left"
        >
          <div
            className={`flex items-center justify-center transition-all ${
              isCollapsed ? "size-5" : "size-6"
            }`}
          >
            {Icon && <Icon className="transition-all size-5" />}
          </div>
          {!isCollapsed && (
            <span className="truncate transition-opacity duration-200">
              {title}
            </span>
          )}
        </button>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
export default SidebarNavItem;
