import Breadcrumbs from "@/containers/lists/Breadcrumbs";
import { Stack } from "@mui/material";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/clients")({
  component: RouteComponent,
  loader: () => ({ crumb: "Clients" }),
});

function RouteComponent() {
  return (
    <Stack spacing={1} p={2}>
      <Breadcrumbs />
      <Outlet />
    </Stack>
  );
}
