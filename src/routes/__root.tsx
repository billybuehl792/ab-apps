import { type ContextType } from "react";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { type QueryClient } from "@tanstack/react-query";
import AuthContext from "@/store/context/AuthContext";
import StatusWrapper from "@/components/layout/StatusWrapper";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  auth: ContextType<typeof AuthContext>;
  crumb?: string;
}>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
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
