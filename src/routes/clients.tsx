import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Stack } from "@mui/material";

import Breadcrumbs from "@/containers/lists/Breadcrumbs";

export const Route = createFileRoute("/clients")({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.user)
      throw redirect({ to: "/sign-in", search: { redirect: location.href } });
    else if (!context.auth.user.emailVerified)
      throw redirect({
        to: "/email-verify",
        search: { redirect: location.href },
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
