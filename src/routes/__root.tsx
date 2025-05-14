import { type ContextType } from "react";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { type QueryClient } from "@tanstack/react-query";

import AuthContext from "@/context/AuthContext";

interface RouterContext {
  auth: ContextType<typeof AuthContext>;
  queryClient: QueryClient;
  crumb?: string;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RouteComponent,
  errorComponent: () => "Something went wrong",
});

function RouteComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
