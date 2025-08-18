import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { Box, Container, Stack } from "@mui/material";
import NavigationBreadcrumbs from "@/containers/lists/NavigationBreadcrumbs";
import CreateClientLink from "@/containers/links/CreateClientLink";
import PageHeader from "@/components/layout/PageHeader";

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
        <PageHeader
          title={<NavigationBreadcrumbs />}
          {...(location.pathname === "/app/clients" && {
            endContent: <CreateClientLink />,
          })}
        />
      </Container>
      <Box overflow="auto">
        <Container maxWidth="md" disableGutters>
          <Outlet />
        </Container>
      </Box>
    </Stack>
  );
}
