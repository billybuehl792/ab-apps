import {
  createFileRoute,
  Outlet,
  redirect,
  useLocation,
} from "@tanstack/react-router";
import { Stack } from "@mui/material";

import NavigationBreadcrumbs from "@/containers/lists/NavigationBreadcrumbs";
import CreateClientLink from "@/containers/links/CreateClientLink";

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
  /** Values */

  const { pathname } = useLocation();

  return (
    <Stack spacing={1} p={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <NavigationBreadcrumbs />
        {pathname === "/clients" && <CreateClientLink />}
      </Stack>
      <Outlet />
    </Stack>
  );
}
