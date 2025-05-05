import { Link, useLocation } from "@tanstack/react-router";
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  type PaperProps,
} from "@mui/material";
import { Groups, Home } from "@mui/icons-material";

import useAuth from "@/hooks/auth/useAuth";

const NavigationFooter = (props: PaperProps) => {
  /** Values */

  const { pathname } = useLocation();
  const { user } = useAuth();

  const actions: ListItem[] = [
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
      selected: pathname.startsWith("/clients"),
      icon: <Groups />,
    },
    {
      id: "profile",
      label: "Profile",
      to: "/profile",
      selected: pathname.startsWith("/profile"),
      icon: (
        <Avatar
          alt={user?.displayName ?? user?.email ?? "user"}
          src={user?.photoURL || ""}
          sx={{ width: 20, height: 20 }}
        />
      ),
    },
  ];

  const value = actions.find((action) => action.selected)?.id;

  return (
    <Paper
      component="footer"
      variant="outlined"
      elevation={0}
      square
      {...props}
    >
      <BottomNavigation value={value}>
        {actions.map((action) => (
          <BottomNavigationAction
            key={action.id}
            component={Link}
            value={action.id}
            to={action.to}
            label={action.label}
            icon={action.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default NavigationFooter;
