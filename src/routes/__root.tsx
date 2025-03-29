import { type ContextType } from "react";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { type QueryClient } from "@tanstack/react-query";
import { AuthContext } from "@/context/AuthContext";
import { Box } from "@mui/material";
import DesktopAppBar from "@/containers/layout/DesktopAppBar";
import DesktopSidePanel from "@/containers/layout/DesktopSidePanel";
import { DESKTOP_APP_BAR_HEIGHT } from "@/constants/layout";

interface RouterContext {
  auth: ContextType<typeof AuthContext>;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Box display="flex">
        <DesktopAppBar style={{ height: DESKTOP_APP_BAR_HEIGHT }} />
        <DesktopSidePanel />
        <Box
          component="main"
          style={{ marginTop: DESKTOP_APP_BAR_HEIGHT, flexGrow: 1 }}
        >
          <Outlet />
        </Box>
      </Box>

      <TanStackRouterDevtools />
    </>
  ),
});
