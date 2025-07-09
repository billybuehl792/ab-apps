import { Link, useLocation } from "@tanstack/react-router";
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  type PaperProps,
} from "@mui/material";
import { Groups, Home } from "@mui/icons-material";
import useAuth from "@/hooks/useAuth";

const NavigationFooter = (props: PaperProps) => {
  /** Values */

  const { pathname } = useLocation();
  const { user } = useAuth();

  const actions: ListItem[] = [
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
      selected: pathname.startsWith("/app/clients"),
      icon: <Groups />,
    },
    {
      id: "account",
      label: "Account",
      to: "/app/account",
      selected: pathname.startsWith("/app/account"),
      icon: (
        <Avatar
          src={user?.photoURL || ""}
          sx={{ width: 20, height: 20, fontSize: ".75rem" }}
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
      <BottomNavigation value={value} sx={{ height: "100%" }}>
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
