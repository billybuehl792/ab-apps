import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    redirect({ to: "/app", throw: true });
  },
  component: () => <Outlet />,
});
