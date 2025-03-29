import { type ContextType } from "react";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { type QueryClient } from "@tanstack/react-query";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Box, useMediaQuery } from "@mui/material";
import { AuthContext } from "@/context/AuthContext";
import AppBar from "@/containers/layout/AppBar";
import NavigationPanel from "@/containers/layout/NavigationPanel";
import { APP_BAR_HEIGHT } from "@/constants/layout";

interface RouterContext {
  auth: ContextType<typeof AuthContext>;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RouteComponent,
});

function RouteComponent() {
  /** Values */

  const isDesktop = useMediaQuery(({ breakpoints }) => breakpoints.up("sm"));

  return (
    <>
      <Box display="flex" flexDirection={isDesktop ? "row" : "column"}>
        {isDesktop && <NavigationPanel />}
        <Box
          component="main"
          style={{
            marginTop: APP_BAR_HEIGHT,
            flexGrow: 1,
          }}
        >
          <Outlet />
        </Box>
      </Box>
      <AppBar />

      <TanStackRouterDevtools />
    </>
  );
}
