import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  IconButton,
  AppBar as MUIAppBar,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  type AppBarProps as MUIAppBarProps,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

import useAuth from "@/hooks/auth/useAuth";
import { APP_TITLE, APP_BAR_HEIGHT } from "@/constants/layout";
import UserIconButton from "@/containers/buttons/UserIconButton";
import SignInLinkButton from "@/containers/buttons/SignInLinkButton";
import NavigationDrawer from "@/containers/modals/NavigationDrawer";

const AppBar = (props: MUIAppBarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  /** Values */

  const auth = useAuth();

  const location = useLocation();

  const isDesktop = useMediaQuery(({ breakpoints }) => breakpoints.up("sm"));
  const isMobile = !isDesktop;

  /** Effects */

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <MUIAppBar
      {...props}
      sx={{
        height: APP_BAR_HEIGHT,
        zIndex: ({ zIndex }) => zIndex.drawer,
      }}
    >
      <Toolbar>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            {isMobile && (
              <IconButton
                color="inherit"
                onClick={() => {
                  setMenuOpen(!menuOpen);
                }}
              >
                <Menu />
              </IconButton>
            )}
            <Typography
              component={Link}
              to="/"
              variant="h6"
              noWrap
              style={{
                color: "inherit",
                fontFamily: "monospace",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              {APP_TITLE}
            </Typography>
          </Stack>

          {auth.user ? <UserIconButton /> : <SignInLinkButton />}
        </Stack>
      </Toolbar>

      {/* Modals */}
      {isMobile && (
        <NavigationDrawer
          open={menuOpen}
          onClose={() => {
            setMenuOpen(false);
          }}
        />
      )}
    </MUIAppBar>
  );
};

export default AppBar;
