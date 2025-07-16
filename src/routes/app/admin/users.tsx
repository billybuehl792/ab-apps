import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/admin/users")({
  component: () => <Outlet />,
  loader: () => ({ crumb: "Users" }),
});
