import { type FC } from "react";
import { Link } from "@tanstack/react-router";
import {
  AppBar,
  Container,
  Stack,
  Toolbar,
  Typography,
  type AppBarProps,
  Link as MuiLink,
} from "@mui/material";

const Navbar: FC<AppBarProps> = (props) => {
  /** Values */

  const navLinks = [
    { id: "clients", name: "Clients", path: "/clients" },
    {
      id: "estimateCalculator",
      name: "Estimate Calculator",
      path: "/estimate-calculator",
    },
    {
      id: "login",
      name: "Login",
      path: "/login",
    },
    {
      id: "playground",
      name: "Playground",
      path: "/playground",
    },
  ];

  return (
    <AppBar position="static" {...props}>
      <Container>
        <Toolbar component={Stack} direction="row" spacing={2} disableGutters>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            AB Apps
          </Typography>
          {navLinks.map((link) => (
            <MuiLink
              key={link.id}
              component={Link}
              to={link.path}
              variant="body2"
              underline="none"
              color="inherit"
              noWrap
              inactiveProps={{ style: { opacity: 0.5 } }}
            >
              {link.name}
            </MuiLink>
          ))}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
