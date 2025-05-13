import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  beforeLoad: () => {
    redirect({ to: "/app", throw: true });
  },
});

function RouteComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
