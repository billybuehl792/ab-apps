import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Box, Container, Stack } from "@mui/material";
import NavigationBreadcrumbs from "@/containers/lists/NavigationBreadcrumbs";
import PageHeader from "@/components/layout/PageHeader";
import ErrorCard from "@/components/cards/ErrorCard";
import { AuthRole } from "@/store/enums/auth";
import { authUtils } from "@/store/utils/auth";

export const Route = createFileRoute("/app/admin")({
  beforeLoad: ({ context }) => {
    const isAdmin = authUtils.authGuard(context.auth, {
      permissions: { role: AuthRole.ADMIN },
    });
    if (!isAdmin) throw Error("Only admins can access this page");
  },
  loader: () => ({ crumb: "Admin" }),
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <Box p={2}>
      <ErrorCard error={error} />
    </Box>
  ),
});

function RouteComponent() {
  return (
    <Stack width="100%" height="100%">
      <Container maxWidth="md" disableGutters>
        <PageHeader title={<NavigationBreadcrumbs />} />
      </Container>
      <Box overflow="auto">
        <Container maxWidth="md" disableGutters>
          <Box p={2}>
            <Outlet />
          </Box>
        </Container>
      </Box>
    </Stack>
  );
}
