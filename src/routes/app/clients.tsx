import {
  createFileRoute,
  Outlet,
  useLocation,
  useMatches,
} from "@tanstack/react-router";
import { Box, Container } from "@mui/material";
import NavigationBreadcrumbs from "@/containers/lists/NavigationBreadcrumbs";
import CreateClientLink from "@/containers/links/CreateClientLink";
import PageHeader from "@/components/layout/PageHeader";
import ClientMenuIconButton from "@/containers/buttons/ClientMenuIconButton";

export const Route = createFileRoute("/app/clients")({
  loader: () => ({ crumb: "Clients" }),
  component: RouteComponent,
});

function RouteComponent() {
  /** Values */

  const location = useLocation();
  const matches = useMatches();

  const clientId = matches.find((match) => match.routeId === "/app/clients/$id")
    ?.params.id;

  return (
    <>
      <PageHeader
        title={<NavigationBreadcrumbs />}
        {...(location.pathname === "/app/clients" && {
          endContent: <CreateClientLink />,
        })}
        {...(!!clientId && {
          endContent: <ClientMenuIconButton client={clientId} />,
        })}
      />
      <Container maxWidth="md" disableGutters>
        <Box p={2}>
          <Outlet />
        </Box>
      </Container>
    </>
  );
}
