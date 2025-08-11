import { type ComponentProps } from "react";
import { useLocation } from "@tanstack/react-router";
import {
  AdminPanelSettings,
  Construction,
  Groups,
  Home,
  Person,
} from "@mui/icons-material";
import useAuth from "@/store/hooks/useAuth";
import NestedList from "@/components/lists/NestedList";
import { AuthRole } from "@/store/enums/auth";
import { authUtils } from "@/store/utils/auth";

const NavigationList = (props: Partial<ComponentProps<typeof NestedList>>) => {
  /** Values */

  const auth = useAuth();
  const location = useLocation();

  const navigationItems: ListItem[] = [
    {
      id: "home",
      label: "Dashboard",
      to: "/app",
      selected: location.pathname === "/app",
      icon: <Home />,
    },
    {
      id: "clients",
      label: "Clients",
      to: "/app/clients",
      render: Boolean(auth.user),
      selected: location.pathname.startsWith("/app/clients"),
      icon: <Groups />,
    },
    {
      id: "estimateCalculator",
      label: "Calculator",
      to: "/app/estimate-calculator",
      render: Boolean(auth.user),
      selected: location.pathname === "/app/estimate-calculator",
      icon: <Construction />,
    },
    {
      id: "profile",
      label: "Profile",
      to: "/app/profile",
      render: Boolean(auth.user),
      selected: location.pathname.startsWith("/app/profile"),
      icon: <Person />,
    },
    {
      id: "admin",
      label: "Admin",
      to: "/app/admin",
      render: authUtils.authGuard(auth, {
        permissions: { role: AuthRole.ADMIN },
      }),
      selected: location.pathname.startsWith("/app/admin"),
      icon: <AdminPanelSettings />,
    },
  ];

  return <NestedList items={navigationItems} {...props} />;
};

export default NavigationList;
