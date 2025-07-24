import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/admin/companies")({
  component: () => <Outlet />,
  loader: () => ({ crumb: "Companies" }),
});
