import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { type QueryClient } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import StatusWrapper from "@/components/layout/StatusWrapper";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  auth: ReturnType<typeof useAuth>;
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
