import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { Container, Divider, Stack } from "@mui/material";
import NavigationBreadcrumbs from "@/containers/lists/NavigationBreadcrumbs";
import CreateClientLink from "@/containers/links/CreateClientLink";

export const Route = createFileRoute("/app/clients")({
  loader: () => ({ crumb: "Clients" }),
  component: RouteComponent,
});

function RouteComponent() {
  /** Values */

  const location = useLocation();

  return (
    <Stack width="100%" height="100%">
      <Container maxWidth="md" disableGutters>
        <Stack spacing={2} p={2} pb={0}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <NavigationBreadcrumbs />
            {location.pathname === "/app/clients" && <CreateClientLink />}
          </Stack>
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
