import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => <Outlet />,
  beforeLoad: () => {
    redirect({ to: "/app", throw: true });
  },
});
