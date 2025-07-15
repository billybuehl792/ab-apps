import { type ComponentProps } from "react";
import { useLocation } from "@tanstack/react-router";
import {
  AdminPanelSettings,
  Construction,
  Groups,
  Home,
  Person,
  PersonAdd,
} from "@mui/icons-material";
import useAuth from "@/hooks/useAuth";
import NestedList from "@/components/lists/NestedList";
import { AuthRole } from "@/store/enums/auth";

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
      selected: pathname === "/app/clients",
      expanded: pathname === "/app/clients/create",
      icon: <Groups />,
      items: [
        {
          id: "clientsCreate",
          label: "Create Client",
          to: "/app/clients/create",
          render: Boolean(user),
          selected: pathname === "/app/clients/create",
          icon: <PersonAdd />,
        },
      ],
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
      id: "account",
      label: "Account",
      to: "/app/account",
      render: Boolean(user),
      selected: pathname === "/app/account",
      icon: <Person />,
    },
    {
      id: "admin",
      label: "Admin",
      to: "/app/admin",
      render: [AuthRole.ADMIN, AuthRole.SUPER_ADMIN].includes(
        permissions?.role ?? AuthRole.STANDARD
      ),
      selected: pathname === "/app/admin",
      icon: <AdminPanelSettings />,
    },
  ];

  return <NestedList items={navigationItems} {...props} />;
};

export default NavigationList;
