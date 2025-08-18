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
      icon: <Home />,
      selected: location.pathname === "/app",
      link: { to: "/app" },
    },
    {
      id: "clients",
      render: Boolean(auth.user),
      label: "Clients",
      icon: <Groups />,
      selected: location.pathname.startsWith("/app/clients"),
      link: { to: "/app/clients" },
    },
    {
      id: "estimateCalculator",
      label: "Calculator",
      render: Boolean(auth.user),
      icon: <Construction />,
      selected: location.pathname === "/app/estimate-calculator",
      link: { to: "/app/estimate-calculator" },
    },
    {
      id: "profile",
      render: Boolean(auth.user),
      label: "Profile",
      icon: <Person />,
      selected: location.pathname.startsWith("/app/profile"),
      link: { to: "/app/profile" },
    },
    {
      id: "admin",
      render: authUtils.authGuard(auth, {
        permissions: { role: AuthRole.ADMIN },
      }),
      label: "Admin",
      icon: <AdminPanelSettings />,
      selected: location.pathname.startsWith("/app/admin"),
      link: { to: "/app/admin" },
    },
  ];

  return <NestedList items={navigationItems} {...props} />;
};

export default NavigationList;
