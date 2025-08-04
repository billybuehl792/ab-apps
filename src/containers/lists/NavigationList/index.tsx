import { type ComponentProps } from "react";
import { useLocation } from "@tanstack/react-router";
import {
  AdminPanelSettings,
  Construction,
  Groups,
  Home,
  Person,
} from "@mui/icons-material";
import useAuth from "@/hooks/useAuth";
import NestedList from "@/components/lists/NestedList";
import { AuthRole } from "@/store/enums/auth";
import { AuthRoleLevel } from "@/store/constants/auth";

const NavigationList = (props: Partial<ComponentProps<typeof NestedList>>) => {
  /** Values */

  const { user, permissions } = useAuth();
  const { pathname } = useLocation();

  const navigationItems: ListItem[] = [
    {
      id: "home",
      label: "Dashboard",
      to: "/app",
      selected: pathname === "/app",
      icon: <Home />,
    },
    {
      id: "clients",
      label: "Clients",
      to: "/app/clients",
      render: Boolean(user),
      selected: pathname.startsWith("/app/clients"),
      icon: <Groups />,
    },
    {
      id: "estimateCalculator",
      label: "Calculator",
      to: "/app/estimate-calculator",
      render: Boolean(user),
      selected: pathname === "/app/estimate-calculator",
      icon: <Construction />,
    },
    {
      id: "profile",
      label: "Profile",
      to: "/app/profile",
      render: Boolean(user),
      selected: pathname.startsWith("/app/profile"),
      icon: <Person />,
    },
    {
      id: "admin",
      label: "Admin",
      to: "/app/admin",
      render: AuthRoleLevel[permissions.role] >= AuthRoleLevel[AuthRole.ADMIN],
      selected: pathname.startsWith("/app/admin"),
      icon: <AdminPanelSettings />,
    },
  ];

  return <NestedList items={navigationItems} {...props} />;
};

export default NavigationList;
