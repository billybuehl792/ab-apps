import { type ContextType } from "react";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { type QueryClient } from "@tanstack/react-query";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Box, Paper, useMediaQuery } from "@mui/material";

import AuthContext from "@/context/AuthContext";
import AppBar from "@/containers/layout/AppBar";
import NavigationFooter from "@/containers/layout/NavigationFooter";
import NavigationList from "@/containers/lists/NavigationList";
import {
  APP_BAR_HEIGHT,
  APP_FOOTER_HEIGHT,
  APP_SIDE_PANEL_WIDTH,
} from "@/constants/layout";

interface RouterContext {
  auth: ContextType<typeof AuthContext>;
  queryClient: QueryClient;
  crumb?: string;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RouteComponent,
});

function RouteComponent() {
  /** Values */

  const isDesktop = useMediaQuery(({ breakpoints }) => breakpoints.up("sm"));

  return (
    <>
      <Box
        component="main"
        sx={{
          position: "absolute",
          top: APP_BAR_HEIGHT,
          right: 0,
          bottom: isDesktop ? 0 : APP_FOOTER_HEIGHT,
          left: isDesktop ? APP_SIDE_PANEL_WIDTH : 0,
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
      {isDesktop && (
        <Paper
          component="nav"
          variant="outlined"
          square
          sx={{
            position: "fixed",
            left: 0,
            top: APP_BAR_HEIGHT,
            bottom: 0,
            width: APP_SIDE_PANEL_WIDTH,
            overflowY: "auto",
            zIndex: ({ zIndex }) => zIndex.drawer,
          }}
        >
          <NavigationList />
        </Paper>
      )}
      <AppBar sx={{ height: APP_BAR_HEIGHT }} />
      {!isDesktop && (
        <NavigationFooter
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: APP_FOOTER_HEIGHT,
            zIndex: ({ zIndex }) => zIndex.appBar,
          }}
        />
      )}

      <TanStackRouterDevtools />
    </>
  );
}
