import { type ComponentProps } from "react";
import { useLocation } from "@tanstack/react-router";
import { Construction, Groups, Home, PersonAdd } from "@mui/icons-material";

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
      to: "/",
      selected: pathname === "/",
      icon: <Home />,
    },
    {
      id: "clients",
      label: "Clients",
      to: "/clients",
      render: Boolean(user),
      disabled: !user?.emailVerified,
      selected: pathname === "/clients",
      expanded: ["/clients/create"].includes(pathname),
      icon: <Groups />,
      items: [
        {
          id: "clientsCreate",
          label: "Create Client",
          to: "/clients/create",
          render: Boolean(user),
          disabled: !user?.emailVerified,
          selected: pathname === "/clients/create",
          icon: <PersonAdd />,
        },
      ],
    },
    {
      id: "estimateCalculator",
      label: "Calculator",
      to: "/estimate-calculator",
      render: Boolean(user),
      disabled: !user?.emailVerified,
      selected: pathname === "/estimate-calculator",
      icon: <Construction />,
    },
  ];

  return <NestedList items={navigationItems} {...props} />;
};

export default NavigationList;
