import { type ContextType } from "react";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Stack } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

interface RouterContext {
  auth: ContextType<typeof AuthContext>;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Stack direction="row" spacing={2}>
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/posts" className="[&.active]:font-bold">
          Posts
        </Link>
        <Link to="/private" className="[&.active]:font-bold">
          Private
        </Link>
      </Stack>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
