import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Container, Divider, Stack } from "@mui/material";
import NavigationBreadcrumbs from "@/containers/lists/NavigationBreadcrumbs";

export const Route = createFileRoute("/app/admin")({
  component: RouteComponent,
  loader: () => ({ crumb: "Admin" }),
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
