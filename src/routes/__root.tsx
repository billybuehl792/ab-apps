import { type ContextType } from "react";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Stack } from "@mui/material";
import { AuthContext } from "@/context/AuthContext";

interface RouterContext {
  auth: ContextType<typeof AuthContext>;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Stack direction="row" spacing={2}>
        <Link to="/" className="[&.active]:font-bold">
          Dashboard
        </Link>
        <Link to="/clients" className="[&.active]:font-bold">
          Clients
        </Link>
        <Link to="/calculator" className="[&.active]:font-bold">
          Calculator
        </Link>
        <Link to="/login" className="[&.active]:font-bold">
          Login
        </Link>
      </Stack>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
