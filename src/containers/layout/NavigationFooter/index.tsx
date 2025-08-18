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
      icon: <Home />,
      selected: location.pathname === "/app",
      link: { to: "/app" },
    },
    {
      id: "clients",
      label: "Clients",
      selected: location.pathname.startsWith("/app/clients"),
      icon: <Groups />,
      link: { to: "/app/clients" },
    },
    {
      id: "profile",
      label: "Profile",
      icon: (
        <Avatar
          src={auth.user?.photoURL || ""}
          sx={{ width: 20, height: 20, fontSize: ".75rem" }}
        />
      ),
      selected: location.pathname.startsWith("/app/profile"),
      link: { to: "/app/profile" },
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
            {...(!!action.link && { LinkComponent: Link, ...action.link })}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default NavigationFooter;
