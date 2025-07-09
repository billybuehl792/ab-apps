import { type ContextType } from "react";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { type QueryClient } from "@tanstack/react-query";
import AuthContext from "@/context/AuthContext";
import StatusWrapper from "@/components/layout/StatusWrapper";
import useClients from "@/hooks/useClients";

interface RouterContext {
  queryClient: QueryClient;
  auth: ContextType<typeof AuthContext>;
  clients: ReturnType<typeof useClients>;
  crumb?: string;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <StatusWrapper
      error={error}
      slotProps={{
        errorButton: {
          children: "Reload Page",
          onClick: () => {
            location.reload();
          },
        },
      }}
    />
  ),
});

function RouteComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
