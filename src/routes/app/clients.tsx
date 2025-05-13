import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { Stack } from "@mui/material";

import NavigationBreadcrumbs from "@/containers/lists/NavigationBreadcrumbs";
import CreateClientLink from "@/containers/links/CreateClientLink";

export const Route = createFileRoute("/app/clients")({
  component: RouteComponent,
  loader: () => ({ crumb: "Clients" }),
});

function RouteComponent() {
  /** Values */

  const { pathname } = useLocation();

  return (
    <Stack spacing={1} p={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <NavigationBreadcrumbs />
        {pathname === "/app/clients" && <CreateClientLink />}
      </Stack>
      <Outlet />
    </Stack>
  );
}
