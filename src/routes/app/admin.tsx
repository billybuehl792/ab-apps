import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Container, Divider, Stack } from "@mui/material";
import NavigationBreadcrumbs from "@/containers/lists/NavigationBreadcrumbs";
import { authUtils } from "@/store/utils/auth";
import { AuthRole } from "@/store/enums/auth";
import ErrorCard from "@/components/cards/ErrorCard";

export const Route = createFileRoute("/app/admin")({
  loader: () => ({ crumb: "Admin" }),
  beforeLoad: ({ context }) => {
    if (
      !authUtils.authGuard(context.auth, {
        permissions: { role: AuthRole.ADMIN },
      })
    )
      throw Error("Only admins can access this page");
  },
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorCard error={error} />,
});

function RouteComponent() {
  return (
    <Stack width="100%" height="100%">
      <Container maxWidth="md" disableGutters>
        <Stack spacing={2} p={2} pb={0}>
          <NavigationBreadcrumbs />
          <Divider />
        </Stack>
      </Container>
      <Stack overflow="auto">
        <Container maxWidth="md" disableGutters>
          <Outlet />
        </Container>
      </Stack>
    </Stack>
  );
}
