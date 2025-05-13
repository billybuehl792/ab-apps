import { type ComponentProps } from "react";
import { useLocation } from "@tanstack/react-router";
import {
  Construction,
  Groups,
  Home,
  Person,
  PersonAdd,
} from "@mui/icons-material";

import useAuth from "@/hooks/auth/useAuth";
import NestedList from "@/components/lists/NestedList";

const NavigationList = (props: Partial<ComponentProps<typeof NestedList>>) => {
  /** Values */

  const { user } = useAuth();
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
      expanded: ["/app/clients/create"].includes(pathname),
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
      id: "profile",
      label: "Profile",
      to: "/app/profile",
      render: Boolean(user),
      selected: pathname === "/app/profile",
      icon: <Person />,
    },
  ];

  return <NestedList items={navigationItems} {...props} />;
};

export default NavigationList;
