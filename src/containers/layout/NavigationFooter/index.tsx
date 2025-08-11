import { Link, useLocation } from "@tanstack/react-router";
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  type PaperProps,
} from "@mui/material";
import { Groups, Home } from "@mui/icons-material";
import useAuth from "@/store/hooks/useAuth";

const NavigationFooter = (props: PaperProps) => {
  /** Values */

  const location = useLocation();
  const auth = useAuth();

  const actions: ListItem[] = [
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
      selected: location.pathname.startsWith("/app/clients"),
      icon: <Groups />,
    },
    {
      id: "profile",
      label: "Profile",
      to: "/app/profile",
      selected: location.pathname.startsWith("/app/profile"),
      icon: (
        <Avatar
          src={auth.user?.photoURL || ""}
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
            value={action.id}
            label={action.label}
            icon={action.icon}
            {...(!!action.to && { LinkComponent: Link, href: action.to })}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default NavigationFooter;
