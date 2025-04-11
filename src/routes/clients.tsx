import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Stack } from "@mui/material";

import Breadcrumbs from "@/containers/lists/Breadcrumbs";

export const Route = createFileRoute("/clients")({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.user)
      redirect({
        to: "/sign-in",
        search: { redirect: location.href },
        throw: true,
      });
    else if (!context.auth.user.emailVerified)
      redirect({
        to: "/email-verify",
        search: { redirect: location.href },
        throw: true,
      });
  },
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
