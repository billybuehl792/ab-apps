import { type FC } from "react";
import { Link } from "@tanstack/react-router";
import {
  AppBar,
  Container,
  Stack,
  Toolbar,
  Typography,
  type AppBarProps,
} from "@mui/material";

const Navbar: FC<AppBarProps> = () => {
  /** Values */

  const navLinks = [
    { id: "clients", name: "Clients", path: "/clients" },
    { id: "calculator", name: "Calculator", path: "/calculator" },
  ];

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
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
          <Stack direction="row" spacing={2}>
            {navLinks.map((link) => (
              <Typography
                key={link.id}
                component={Link}
                to={link.path}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: 300,
                }}
              >
                {link.name}
              </Typography>
            ))}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
