import { type ContextType } from "react";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AuthContext } from "@/context/AuthContext";
import Navbar from "@/containers/layout/Navbar";
import { Box } from "@mui/material";

interface RouterContext {
  auth: ContextType<typeof AuthContext>;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Navbar />
      <Box p={2}>
        <Outlet />
      </Box>
      <TanStackRouterDevtools />
    </>
  ),
});
