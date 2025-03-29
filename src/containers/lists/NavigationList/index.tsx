import { type ComponentProps, type FC } from "react";
import { useLocation } from "@tanstack/react-router";
import { Construction, Groups, Home, PersonAdd } from "@mui/icons-material";
import NestedList from "@/components/lists/NestedList";
import { useAuth } from "@/context/AuthContext";

const NavigationList: FC<Partial<ComponentProps<typeof NestedList>>> = (
  props
) => {
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
      selected: pathname === "/clients",
      expanded: pathname.startsWith("/clients"),
      icon: <Groups />,
      items: [
        {
          id: "clientsCreate",
          label: "Create Client",
          to: "/clients/create",
          render: Boolean(user),
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
      selected: pathname === "/estimate-calculator",
      icon: <Construction />,
    },
  ];

  return <NestedList items={navigationItems} {...props} />;
};

export default NavigationList;
