import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Container, Stack } from "@mui/material";
import { AuthRole } from "@/store/enums/auth";
import NavigationBreadcrumbs from "@/containers/lists/NavigationBreadcrumbs";

export const Route = createFileRoute("/app/admin")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    const isAdmin = [AuthRole.ADMIN, AuthRole.SUPER_ADMIN].includes(
      context.auth.permissions?.role ?? AuthRole.STANDARD
    );

    if (!isAdmin) redirect({ to: "/app", replace: true, throw: true });
  },
  loader: () => ({ crumb: "AB Admin" }),
});

function RouteComponent() {
  return (
    <Container maxWidth="lg" disableGutters>
      <Stack spacing={2} p={2}>
        <NavigationBreadcrumbs />
        <Outlet />
      </Stack>
    </Container>
  );
}
